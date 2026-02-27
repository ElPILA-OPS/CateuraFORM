import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { Resend } from "resend";

const db = new Database("orchestra.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS booking_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_name TEXT,
    contact_name TEXT,
    phone TEXT,
    email TEXT,
    location TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    budget TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Email Helper using Resend
async function sendEmailNotification(data: any) {
  const {
    RESEND_API_KEY,
    NOTIFICATION_EMAIL
  } = process.env;

  const recipient = NOTIFICATION_EMAIL || "chiara@bergonzi.net";

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing. Skipping email notification.");
    return;
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Orchestra Booking <onboarding@resend.dev>", // Note: Resend requires domain verification for custom from addresses
      to: [recipient],
      subject: `New Booking Request: ${data.institution_name}`,
      text: `
        New Performance Request for Recycled Orchestra of Cateura
        
        Institution: ${data.institution_name}
        Contact: ${data.contact_name}
        Phone: ${data.phone}
        Email: ${data.email}
        Location: ${data.location}
        Date: ${data.preferred_date}
        Time: ${data.preferred_time}
        Budget: ${data.budget}
        
        Message:
        ${data.message || "No additional message."}
        
        Submitted at: ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
    } else {
      console.log("Successfully sent email notification via Resend");
    }
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API routes
  app.post("/api/bookings", async (req, res) => {
    const { 
      institution_name, 
      contact_name, 
      phone, 
      email, 
      location, 
      preferred_date, 
      preferred_time, 
      budget, 
      message 
    } = req.body;

    try {
      // 1. Save to local DB
      const stmt = db.prepare(`
        INSERT INTO booking_requests (
          institution_name, contact_name, phone, email, location, preferred_date, preferred_time, budget, message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        institution_name, 
        contact_name, 
        phone, 
        email, 
        location, 
        preferred_date, 
        preferred_time, 
        budget, 
        message
      );
      
      // 2. Send Email Notification (Async, don't block response)
      sendEmailNotification(req.body).catch(err => console.error("Email error:", err));
      
      res.status(201).json({ success: true, message: "Booking request submitted successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, error: "Failed to save booking request" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
