import isEmail from 'validator/lib/isEmail.js';

export function validateDemoRequest(input) {
  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  const company = typeof input?.company === 'string' ? input.company.trim() : '';
  const rawEmail = typeof input?.email === 'string' ? input.email.trim() : '';
  const message = typeof input?.message === 'string' ? input.message.trim() : '';
  const errors = {};

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length > 200 || /[\r\n]/.test(name)) {
    errors.name = 'Please enter a valid name (up to 200 characters).';
  }

  if (!company) {
    errors.company = 'Please enter your company.';
  } else if (company.length > 200 || /[\r\n]/.test(company)) {
    errors.company = 'Please enter a valid company (up to 200 characters).';
  }

  if (!rawEmail) {
    errors.email = 'Please enter your email address.';
  } else if (rawEmail.length > 254 || !isEmail(rawEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length > 10000) {
    errors.message = 'Please keep your message under 10,000 characters.';
  }

  const atIndex = rawEmail.lastIndexOf('@');
  const email = atIndex < 0 ? rawEmail : `${rawEmail.slice(0, atIndex)}@${rawEmail.slice(atIndex + 1).toLowerCase()}`;

  return { values: { name, email, company, message }, errors };
}