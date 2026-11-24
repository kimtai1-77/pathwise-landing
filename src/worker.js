import { validateDemoRequest } from './demoValidation.js';

export async function handleDemoRequest(request, env, send = fetch) {
  let input;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { values, errors } = validateDemoRequest(input);
  if (Object.keys(errors).length) {
    return Response.json({ errors }, { status: 400 });
  }

  if (!env.RESEND_API_KEY || !env.DEMO_FROM_EMAIL) {
    return Response.json({ error: 'Demo requests are temporarily unavailable. Please email us directly.' }, { status: 503 });
  }

  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.DEMO_FROM_EMAIL,
        to: ['support@pathwise.systems'],
        reply_to: values.email,
        subject: 'Demo request',
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });

    if (!response.ok) {
      return Response.json({ error: 'Could not send your request. Please try again or email us directly.' }, { status: 502 });
    }
  } catch {
    return Response.json({ error: 'Could not send your request. Please try again or email us directly.' }, { status: 502 });
  }

  return Response.json({ success: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/demo-request') {
      if (request.method !== 'POST') {
        return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
      }
      return handleDemoRequest(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};