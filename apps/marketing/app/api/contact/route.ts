import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Master Build Brief Section 6.2 / UI-UX Handoff 6.2: form submissions go
 * to a real backend endpoint, get emailed via Resend to ask@novaimpactenergy.com,
 * and are logged to Airtable as structured data (including the "reaching out
 * about" selection) for later follow-up/segmentation -- never only living
 * in an inbox.
 */

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' &&
    b.name.trim().length > 0 &&
    typeof b.email === 'string' &&
    b.email.includes('@') &&
    typeof b.reason === 'string' &&
    b.reason.trim().length > 0 &&
    typeof b.message === 'string' &&
    b.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { name, email, phone, reason, message } = body;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'ask@novaimpactenergy.com';

  const results = await Promise.allSettled([sendEmail({ name, email, phone, reason, message }, toEmail), logToAirtable({ name, email, phone, reason, message })]);

  const emailFailed = results[0].status === 'rejected';
  const airtableFailed = results[1].status === 'rejected';

  if (emailFailed) {
    // eslint-disable-next-line no-console
    console.error('Resend send failed:', (results[0] as PromiseRejectedResult).reason);
  }
  if (airtableFailed) {
    // eslint-disable-next-line no-console
    console.error('Airtable log failed:', (results[1] as PromiseRejectedResult).reason);
  }

  // Only fail the request to the visitor if BOTH the email and the lead
  // record failed -- if at least one succeeded, the lead isn't lost.
  if (emailFailed && airtableFailed) {
    return NextResponse.json({ error: 'Could not deliver your message. Please try again shortly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function sendEmail(
  data: ContactPayload,
  toEmail: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    throw new Error('RESEND_API_KEY / RESEND_FROM_EMAIL not configured');
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `New enquiry: ${data.reason} -- ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\nReaching out about: ${data.reason}\n\nMessage:\n${data.message}`,
  });
}

async function logToAirtable(data: ContactPayload) {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';
  if (!token || !baseId) {
    throw new Error('AIRTABLE_API_TOKEN / AIRTABLE_BASE_ID not configured');
  }

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Name: data.name,
        Email: data.email,
        Phone: data.phone || '',
        'Reaching out about': data.reason,
        Message: data.message,
        'Submitted at': new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable API error ${res.status}: ${text}`);
  }
}
