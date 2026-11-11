import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Handles contact form submission.
 *
 * Setup Resend (rekomendasi):
 *  1. Buat akun di https://resend.com (gratis — 3000 email/bulan)
 *  2. Tambahkan RESEND_API_KEY ke environment variables di Vercel
 *  3. Jalankan: npm install resend
 *  4. Uncomment blok Resend di bawah
 *
 * Tanpa RESEND_API_KEY, endpoint tetap memvalidasi input
 * dan mengembalikan instruksi mailto ke client.
 */

/* Rate limiting sederhana — in-memory (reset saat cold start) */
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 menit
const RATE_LIMIT_MAX       = 3;      // max 3 request per menit per IP

function checkRateLimit(ip) {
  const now    = Date.now();
  const record = rateLimitMap.get(ip) ?? { count: 0, start: now };

  if (now - record.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;

  rateLimitMap.set(ip, { ...record, count: record.count + 1 });
  return true;
}

/* Server-side validation */
function validateFields({ name, email, message }) {
  const errors = {};

  if (!name?.trim() || name.trim().length < 2)
    errors.name = "Nama minimal 2 karakter.";
  if (name?.trim().length > 100)
    errors.name = "Nama maksimal 100 karakter.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.trim() || !emailRegex.test(email.trim()))
    errors.email = "Alamat email tidak valid.";

  if (!message?.trim() || message.trim().length < 10)
    errors.message = "Pesan minimal 10 karakter.";
  if (message?.trim().length > 2000)
    errors.message = "Pesan maksimal 2000 karakter.";

  return errors;
}

/* Honeypot check — bot trap field */
function isSpam(body) {
  return !!body.website; // hidden field — humans leave it empty
}

export async function POST(request) {
  try {
    /* ── IP-based rate limiting ── */
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            ?? request.headers.get("x-real-ip")
            ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Terlalu banyak percobaan. Coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }

    /* ── Parse body ── */
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request tidak valid." },
        { status: 400 }
      );
    }

    /* ── Honeypot spam check ── */
    if (isSpam(body)) {
      // Return 200 to fool bots — don't send email
      return NextResponse.json({ success: true });
    }

    const { name, email, message } = body;

    /* ── Server-side validation ── */
    const errors = validateFields({ name, email, message });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 422 }
      );
    }

    const sanitizedName    = name.trim().slice(0, 100);
    const sanitizedEmail   = email.trim().toLowerCase().slice(0, 254);
    const sanitizedMessage = message.trim().slice(0, 2000);

    /* ── Send email via Resend ── */
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // /* Uncomment setelah `npm install resend`:
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      const { error } = await resend.emails.send({
        from:    "Portfolio Contact <onboarding@resend.dev>",
        to:      [process.env.CONTACT_EMAIL ?? "hello@syahbanialif.com"],
        replyTo: sanitizedEmail,
        subject: `Portfolio Contact dari ${sanitizedName}`,
        html: `
          <h2>Pesan baru dari portfolio</h2>
          <p><strong>Nama:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <hr />
          <p><strong>Pesan:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        console.error("[Contact API] Resend error:", error);
        return NextResponse.json(
          { success: false, error: "Gagal mengirim pesan. Silakan coba lagi." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
      return NextResponse.json({
        success:  true,
        fallback: false,
        message:  "Email terkirim via Resend.",
      });
    }

    /* ── Fallback: return mailto data to client ── */
    return NextResponse.json({
      success:  true,
      fallback: true,
      mailto: {
        subject: encodeURIComponent(`Portfolio Contact dari ${sanitizedName}`),
        body:    encodeURIComponent(
          `Nama: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nPesan:\n${sanitizedMessage}`
        ),
      },
    });

  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
