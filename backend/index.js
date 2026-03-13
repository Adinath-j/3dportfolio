import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import * as Brevo from '@getbrevo/brevo'

const app = express()
const PORT = process.env.PORT || 4000

const brevoClient = new Brevo.TransactionalEmailsApi()
brevoClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY

app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))
app.options('*', cors())

const rateLimitMap = new Map()
function rateLimit(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const now = Date.now()
  const windowMs = 10 * 60 * 1000
  const maxRequests = 3
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs }
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + windowMs }
  entry.count += 1
  rateLimitMap.set(ip, entry)
  if (entry.count > maxRequests) {
    return res.status(429).json({ ok: false, error: `Too many requests. Please wait ${Math.ceil((entry.resetAt - now) / 60000)} minute(s).` })
  }
  next()
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function validate({ name, email, subject, message }) {
  if (!name?.trim())              return 'Name is required.'
  if (name.trim().length < 2)     return 'Name must be at least 2 characters.'
  if (!email?.trim())             return 'Email is required.'
  if (!emailRegex.test(email))    return 'Please provide a valid email address.'
  if (!subject?.trim())           return 'Subject is required.'
  if (subject.trim().length < 3)  return 'Subject must be at least 3 characters.'
  if (!message?.trim())           return 'Message is required.'
  if (message.trim().length < 10) return 'Message must be at least 10 characters.'
  if (message.length > 5000)      return 'Message is too long (max 5000 characters).'
  return null
}

app.post('/api/contact', rateLimit, async (req, res) => {
  const { name, email, subject, message } = req.body
  const error = validate({ name, email, subject, message })
  if (error) return res.status(400).json({ ok: false, error })

  const senderEmail = process.env.SENDER_EMAIL
  const receiverEmail = process.env.RECEIVER_EMAIL

  const notificationEmail = new Brevo.SendSmtpEmail()
  notificationEmail.sender = { name: 'Portfolio Contact', email: senderEmail }
  notificationEmail.to = [{ email: receiverEmail }]
  notificationEmail.replyTo = { email: email.trim(), name: name.trim() }
  notificationEmail.subject = `[Portfolio] ${subject.trim()}`
  notificationEmail.htmlContent = `<div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:12px;overflow:hidden;"><div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:24px 32px;"><h1 style="margin:0;font-size:20px;color:#fff;">New Portfolio Message</h1></div><div style="padding:32px;"><p><strong>Name:</strong> ${name.trim()}</p><p><strong>Email:</strong> ${email.trim()}</p><p><strong>Subject:</strong> ${subject.trim()}</p><p><strong>Message:</strong></p><p>${message.trim()}</p><p style="font-size:12px;color:#475569;">Hit Reply to respond directly to ${name.trim()}.</p></div></div>`

  const autoReplyEmail = new Brevo.SendSmtpEmail()
  autoReplyEmail.sender = { name: 'Adinath', email: senderEmail }
  autoReplyEmail.to = [{ email: email.trim(), name: name.trim() }]
  autoReplyEmail.subject = `Re: ${subject.trim()} — Got your message!`
  autoReplyEmail.htmlContent = `<div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:12px;overflow:hidden;"><div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:24px 32px;"><h1 style="margin:0;font-size:20px;color:#fff;">Got your message!</h1></div><div style="padding:32px;"><p>Hi <strong>${name.trim()}</strong>,</p><p>Thanks for reaching out! I'll get back to you within <strong style="color:#38bdf8;">24 hours</strong>.</p><p>Cheers,<br/><strong>Adinath</strong></p></div></div>`

  try {
    await brevoClient.sendTransacEmail(notificationEmail)
    try { await brevoClient.sendTransacEmail(autoReplyEmail) } catch (e) { console.warn('⚠️  Auto-reply failed:', e.message) }
    console.log(`📨  Email from ${email.trim()} — "${subject.trim()}"`)
    return res.status(200).json({ ok: true, message: 'Email sent successfully.' })
  } catch (err) {
    console.error('❌  Send failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Failed to send. Please try again.' })
  }
})

app.get('/api/health', (_, res) => res.json({ ok: true, timestamp: new Date().toISOString() }))
app.listen(PORT, () => console.log(`🚀  Backend running at http://localhost:${PORT}`))