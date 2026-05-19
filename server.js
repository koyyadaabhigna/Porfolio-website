/* ──────────────────────────────────────────
   KOYYADA ABHIGNA — PORTFOLIO BACKEND
   server.js · Node.js + Express + MongoDB
   ────────────────────────────────────────── */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// ── Config ──
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors({
  origin: '*', // In production, replace with your actual domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve frontend files
app.use(express.static(path.join(__dirname)));
// ── MongoDB Connection ──
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
mongoose.connect(MONGO_URI, {
  family: 4
})
  .then(() => console.log('✅  MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", contactSchema);
// ── Routes ──

/** Health check */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * POST /contact
 * Body: { name, email, message }
 * Saves the contact form submission to MongoDB.
 */
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields (name, email, message) are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Save to DB
    const contact = new Contact({ name: name.trim(), email: email.trim(), message: message.trim() });
    await contact.save();

    console.log(`📩  New message from ${name} <${email}>`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: contact,
    });
  } catch (err) {
    console.error('POST /contact error:', err.message);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

/**
 * GET /contact
 * Returns all contact messages (newest first).
 * Useful for an admin panel or testing.
 */
app.get('/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    console.error('GET /contact error:', err.message);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found.` });
});

// ── Start server ──
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});
