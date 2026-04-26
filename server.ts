import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  try {
    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'khandkartokytahmid@gmail.com', // Destination email
        subject: `New Contact Form Submission from ${name}`,
        text: `
You have received a new message from your portfolio website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}

Message:
${message}
        `,
      });
      console.log('Email notification sent successfully');
      res.status(201).json({ message: 'Email sent successfully!' });
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS not set. Skipping email notification.');
      res.status(200).json({ message: 'Saved to Firestore (Skipped Email Notification)' });
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== 'production') {
  createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  }).then(vite => {
    app.use(vite.middlewares);
  });
} else if (!process.env.VERCEL) {
  // Only serve static files if NOT on Vercel
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Only start the server if we are NOT in a serverless environment like Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel serverless functions
export default app;
