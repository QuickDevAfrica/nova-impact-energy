'use client';
import { useState, type FormEvent } from 'react';
import { Button } from './Button';

/**
 * UI-UX Handoff 4.5 / 6.5. `options` comes from contactPage.formOptions in
 * Sanity -- adding a fifth reason is a CMS edit, not a code change.
 * Submits to /api/contact, which fans out to Resend + Airtable server-side.
 */
export function ContactForm({ options }: { options: string[] }) {
  const [reason, setReason] = useState(options[0] ?? '');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      reason,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      form.reset();
      setReason(options[0] ?? '');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please try again, or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <p className="rounded-md bg-offwhite p-6 text-[16px] text-nova-text md:text-[17px]">
        Thanks -- your message is in. We&apos;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-[length:var(--type-label)] font-semibold tracking-[0.3px]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="h-11 w-full rounded-sm border border-border px-3 text-[14px] text-nova-text focus:border-teal focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-[length:var(--type-label)] font-semibold tracking-[0.3px]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-11 w-full rounded-sm border border-border px-3 text-[14px] text-nova-text focus:border-teal focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-[length:var(--type-label)] font-semibold tracking-[0.3px]">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="h-11 w-full rounded-sm border border-border px-3 text-[14px] text-nova-text focus:border-teal focus:outline-none"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-[length:var(--type-label)] font-semibold tracking-[0.3px]">I&apos;m reaching out about</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setReason(opt)}
              className={`rounded-sm border px-4 py-2 text-[13px] ${
                reason === opt ? 'border-teal bg-teal text-white' : 'border-border bg-white text-nova-text'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-1 block text-[length:var(--type-label)] font-semibold tracking-[0.3px]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-sm border border-border p-3 text-[14px] text-nova-text focus:border-teal focus:outline-none"
        />
      </div>

      {status === 'error' && <p className="text-[13px] font-semibold text-error">{errorMsg}</p>}

      <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
}
