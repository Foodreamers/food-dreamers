import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: 'Resend is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const company = String(body.company ?? '').trim();
    const projectType = String(body.projectType ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return Response.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Food Dreamers Website <contacto@foodreamers.com>',
      to: ['contacto@foodreamers.com'],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h1 style="margin-bottom: 24px;">New project inquiry</h1>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${
            company ? escapeHtml(company) : 'Not provided'
          }</p>
          <p><strong>Project type:</strong> ${
            projectType ? escapeHtml(projectType) : 'Not provided'
          }</p>

          <hr style="margin: 24px 0;" />

          <h2>Project details</h2>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return Response.json(
        { error: 'The email could not be sent.' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return Response.json(
      { error: 'Unexpected server error.' },
      { status: 500 }
    );
  }
}