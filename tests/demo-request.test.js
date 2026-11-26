import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDemoRequest } from '../src/demoValidation.js';
import { handleDemoRequest } from '../src/worker.js';

const makeRequest = (body) => new Request('https://example.com/api/demo-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

test('rejects empty and malformed fields', async () => {
  const response = await handleDemoRequest(makeRequest({ name: ' ', company: '', email: 'bad email', message: '\n' }), {});
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys((await response.json()).errors).sort(), ['company', 'email', 'message', 'name']);
  assert.ok(validateDemoRequest({ name: 'A', email: 'a@example.com\r\nBcc: other@example.com', message: 'Hi' }).errors.email);
});

test('normalizes email and sends only validated content', async () => {
  let sent;
  const response = await handleDemoRequest(
    makeRequest({ name: '  Marc  ', company: '  Pathwise  ', email: '  Marc@EXAMPLE.COM  ', message: '  Hello  ' }),
    { RESEND_API_KEY: 'test-key', DEMO_FROM_EMAIL: 'test@example.com' },
    async (url, options) => {
      sent = { url, body: JSON.parse(options.body) };
      return new Response(null, { status: 200 });
    },
  );
  assert.equal(response.status, 200);
  assert.equal(sent.body.reply_to, 'Marc@example.com');
  assert.equal(sent.body.subject, 'Demo request');
  assert.equal(sent.body.text, 'Name: Marc\nCompany: Pathwise\nEmail: Marc@example.com\n\nHello');
});

test('reports configuration and delivery failures', async () => {
  const fields = { name: 'Marc', company: 'Pathwise', email: 'marc@example.com', message: 'Hello' };
  assert.equal((await handleDemoRequest(makeRequest(fields), {})).status, 503);
  const response = await handleDemoRequest(makeRequest(fields), { RESEND_API_KEY: 'test', DEMO_FROM_EMAIL: 'test@example.com' }, async () => new Response(null, { status: 500 }));
  assert.equal(response.status, 502);
});