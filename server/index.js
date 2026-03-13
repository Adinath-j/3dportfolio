import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 4000

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['POST'],
}))

// ── Simple in-memory rate limiter ─────────────────────────────────────────────
// Allows max 3 emails per IP per 10 minutes — prevents spam without a DB
const rateLimitMap = new Map()

function rateLimit(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const now = Date.now()
  const windowMs = 10 * 60 * 1000   // 10 minutes
  const maxRequests = 3

  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs }

  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + windowMs
  }

  entry.count += 1
  rateLimitMap.set(ip, entry)

  if (entry.count > maxRequests) {
    return res.status(429).json({
      ok: false,
      error: `Too many requests. Please wait ${Math.ceil((entry.resetAt - now) / 60000)} minute(s) before trying again.`,
    })
  }

  next()
}

// ── Nodemailer transporter ────────────────────────────────────────────────────
/*
  Supports any SMTP provider. Common setups:

  ┌─────────────┬────────────────────┬──────┬──────────────────────────────────┐
  │ Provider    │ SMTP_HOST          │ PORT │ Notes                            │
  ├─────────────┼────────────────────┼──────┼──────────────────────────────────┤
  │ Gmail       │ smtp.gmail.com     │ 465  │ Use App Password (not your real  │
  │             │                    │      │ password). Enable 2FA first.     │
  │             │                    │      │ https://myaccount.google.com/    │
  │             │                    │      │ apppasswords                     │
  ├─────────────┼────────────────────┼──────┼──────────────────────────────────┤
  │ Outlook/    │ smtp-mail.         │ 587  │ Use your Outlook password.       │
  │ Hotmail     │ outlook.com        │      │                                  │
  ├─────────────┼────────────────────┼──────┼──────────────────────────────────┤
  │ Yahoo       │ smtp.mail.yahoo.com│ 465  │ Use App Password.                │
  ├─────────────┼────────────────────┼──────┼──────────────────────────────────┤
  │ Custom      │ your host          │ 465  │ Check your hosting control panel.│
  └─────────────┴────────────────────┴──────┴──────────────────────────────────┘
*/
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Verify SMTP connection on startup (shows a clear error if .env is wrong)
transporter.verify((err) => {
  if (err) {
    console.error('❌  SMTP connection failed:', err.message)
    console.error('   Check your .env SMTP_HOST / SMTP_USER / SMTP_PASS values.')
  } else {
    console.log('✅  SMTP ready — emails will be sent from', process.env.SMTP_USER)
  }
})

// ── Validation helpers ────────────────────────────────────────────────────────
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, subject, message }) {
  if (!name?.trim())         return 'Name is required.'
  if (name.trim().length < 2) return 'Name must be at least 2 characters.'
  if (!email?.trim())        return 'Email is required.'
  if (!emailRegex.test(email)) return 'Please provide a valid email address.'
  if (!subject?.trim())      return 'Subject is required.'
  if (subject.trim().length < 3) return 'Subject must be at least 3 characters.'
  if (!message?.trim())      return 'Message is required.'
  if (message.trim().length < 10) return 'Message must be at least 10 characters.'
  if (message.length > 5000) return 'Message is too long (max 5000 characters).'
  return null
}

// ── Route: POST /api/contact ──────────────────────────────────────────────────
app.post('/api/contact', rateLimit, async (req, res) => {
  const { name, email, subject, message } = req.body

  // 1. Validate inputs
  const validationError = validate({ name, email, subject, message })
  if (validationError) {
    return res.status(400).json({ ok: false, error: validationError })
  }

  // 2. Build the emails
  //    - Notification email → goes to YOUR inbox
  //    - Auto-reply         → goes to the sender (optional but professional)
  const notificationMail = {
    from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to:      process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    replyTo: `"${name.trim()}" <${email.trim()}>`,
    subject: `[Portfolio] ${subject.trim()}`,
    text: [
      `New message from your portfolio contact form`,
      `─────────────────────────────────`,
      `Name:    ${name.trim()}`,
      `Email:   ${email.trim()}`,
      `Subject: ${subject.trim()}`,
      `─────────────────────────────────`,
      message.trim(),
    ].join('\n'),
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:24px 32px;">
          <h1 style="margin:0;font-size:20px;color:#fff;">New Portfolio Message</h1>
        </div>
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.1em;width:80px;">Name</td>
              <td style="padding:8px 0;color:#e2e8f0;font-weight:600;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${email.trim()}" style="color:#38bdf8;">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Subject</td>
              <td style="padding:8px 0;color:#e2e8f0;">${subject.trim()}</td>
            </tr>
          </table>
          <div style="background:#060c1a;border-left:3px solid #38bdf8;border-radius:4px;padding:20px 24px;">
            <p style="margin:0;color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${message.trim()}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#475569;">
            Reply directly to this email to respond to ${name.trim()}.
          </p>
        </div>
      </div>
    `,
  }

  const autoReplyMail = {
    from:    `"Adinath" <${process.env.SMTP_USER}>`,
    to:      `"${name.trim()}" <${email.trim()}>`,
    subject: `Re: ${subject.trim()} — Got your message!`,
    text: [
      `Hi ${name.trim()},`,
      ``,
      `Thanks for reaching out! I've received your message and will get back to you within 24 hours.`,
      ``,
      `Here's a copy of what you sent:`,
      `─────────────────────────────────`,
      `Subject: ${subject.trim()}`,
      ``,
      message.trim(),
      `─────────────────────────────────`,
      ``,
      `Cheers,`,
      `Adinath`,
    ].join('\n'),
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:24px 32px;">
          <h1 style="margin:0;font-size:20px;color:#fff;">Got your message!</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#cbd5e1;line-height:1.7;">Hi <strong>${name.trim()}</strong>,</p>
          <p style="color:#cbd5e1;line-height:1.7;">
            Thanks for reaching out! I've received your message and will get back to you within <strong style="color:#38bdf8;">24 hours</strong>.
          </p>
          <div style="background:#060c1a;border-left:3px solid #6366f1;border-radius:4px;padding:20px 24px;margin:24px 0;">
            <p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Your message</p>
            <p style="margin:0;color:#94a3b8;font-size:13px;white-space:pre-wrap;">${message.trim()}</p>
          </div>
          <p style="color:#cbd5e1;line-height:1.7;">Cheers,<br/><strong>Adinath</strong></p>
        </div>
      </div>
    `,
  }

  // 3. Send both emails
  try {
    await transporter.sendMail(notificationMail)

    // Auto-reply is optional — if it fails don't block the main success response
    try {
      await transporter.sendMail(autoReplyMail)
    } catch (autoReplyErr) {
      console.warn('⚠️  Auto-reply failed (non-critical):', autoReplyErr.message)
    }

    console.log(`📨  Email sent — from: ${email.trim()}, subject: "${subject.trim()}"`)
    return res.status(200).json({ ok: true, message: 'Email sent successfully.' })

  } catch (err) {
    console.error('❌  Failed to send email:', err.message)
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email. Please try again or contact me directly.',
    })
  }
})

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ ok: true, timestamp: new Date().toISOString() }))

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`)
})