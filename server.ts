import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("events.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT,
    company TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    date TEXT,
    location TEXT,
    image TEXT,
    price REAL,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id TEXT PRIMARY KEY,
    userId TEXT,
    eventId TEXT,
    status TEXT,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(eventId) REFERENCES events(id)
  );

  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    exhibitorId TEXT,
    attendeeId TEXT,
    scannedAt TEXT,
    notes TEXT,
    FOREIGN KEY(exhibitorId) REFERENCES users(id),
    FOREIGN KEY(attendeeId) REFERENCES users(id)
  );
`);

// Seed initial data if empty
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare("INSERT INTO users (id, name, email, role, company, avatar) VALUES (?, ?, ?, ?, ?, ?)");
  insertUser.run("1", "John Manager", "manager@example.com", "MANAGER", "EventPro", "https://picsum.photos/seed/manager/100");
  insertUser.run("2", "Alice Attendee", "alice@example.com", "ATTENDEE", "TechCorp", "https://picsum.photos/seed/alice/100");
  insertUser.run("3", "Bob Exhibitor", "bob@example.com", "EXHIBITOR", "GadgetCo", "https://picsum.photos/seed/bob/100");
  insertUser.run("4", "Partner Sam", "sam@example.com", "PARTNER", "RentAll", "https://picsum.photos/seed/sam/100");

  const insertEvent = db.prepare("INSERT INTO events (id, title, description, date, location, image, price, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertEvent.run("e1", "Global Tech Summit 2026", "The biggest tech event of the year.", "2026-05-15", "San Francisco, CA", "https://picsum.photos/seed/tech/800/400", 299, "Technology");
  insertEvent.run("e2", "Design & Innovation Expo", "Exploring the future of design.", "2026-06-20", "London, UK", "https://picsum.photos/seed/design/800/400", 150, "Design");
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/events", (req, res) => {
    const events = db.prepare("SELECT * FROM events").all();
    res.json(events);
  });

  app.get("/api/users/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    res.json(user);
  });

  app.post("/api/login", (req, res) => {
    const { email } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "User not found" });
    }
  });

  app.post("/api/leads", (req, res) => {
    const { exhibitorId, attendeeId, notes } = req.body;
    const id = Math.random().toString(36).substr(2, 9);
    const scannedAt = new Date().toISOString();
    db.prepare("INSERT INTO leads (id, exhibitorId, attendeeId, scannedAt, notes) VALUES (?, ?, ?, ?, ?)")
      .run(id, exhibitorId, attendeeId, scannedAt, notes);
    
    const attendee = db.prepare("SELECT * FROM users WHERE id = ?").get(attendeeId);
    io.to(exhibitorId).emit("new-lead", { id, attendee, scannedAt, notes });
    res.json({ success: true });
  });

  app.get("/api/leads/:exhibitorId", (req, res) => {
    const leads = db.prepare(`
      SELECT l.*, u.name as attendeeName, u.email as attendeeEmail, u.company as attendeeCompany
      FROM leads l
      JOIN users u ON l.attendeeId = u.id
      WHERE l.exhibitorId = ?
    `).all(req.params.exhibitorId);
    res.json(leads);
  });

  // Socket.io logic
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
