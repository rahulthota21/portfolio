'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from './Icons';

type State = 'idle' | 'sending' | 'done' | 'error';

export function ContactForm({
  endpoint,
  subject,
  privacyNote,
  cta = 'Send message',
  compact = false,
}: {
  endpoint: string;
  subject: string;
  privacyNote?: string;
  cta?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans never see them.
    if ((data.get('_gotcha') as string)?.length) {
      setState('done');
      return;
    }

    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      setState('error');
      setError('The form endpoint is not configured yet.');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setState('done');
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setState('error');
        setError(body?.errors?.[0]?.message ?? 'Something went wrong. Please email me instead.');
      }
    } catch {
      setState('error');
      setError('Network error. Please email me instead.');
    }
  }

  if (state === 'done') {
    return (
      <div className="card-soft flex items-start gap-sm p-lg md:p-xl">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-canvas">
          <Check width={16} height={16} />
        </span>
        <div>
          <p className="text-title text-ink">Message sent.</p>
          <p className="mt-1 text-body-sm text-muted">
            Thanks for reaching out - I read everything and reply as soon as I can.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-sm" noValidate={false}>
      <input type="hidden" name="_subject" value={subject} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className={compact ? 'flex flex-col gap-sm' : 'grid gap-sm sm:grid-cols-2'}>
        <label className="flex flex-col gap-1.5">
          <span className="text-caption text-muted">Name</span>
          <input required name="name" autoComplete="name" placeholder="Your name" className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-caption text-muted">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="field-input"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-caption text-muted">Message</span>
        <textarea
          required
          name="message"
          rows={compact ? 4 : 5}
          placeholder="What are you working on?"
          className="field-input resize-y"
        />
      </label>

      <div className="mt-xs flex flex-wrap items-center justify-between gap-sm">
        {privacyNote && <p className="max-w-sm text-caption text-faint">{privacyNote}</p>}
        <button type="submit" disabled={state === 'sending'} className="pill-primary group disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : cta}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      {state === 'error' && (
        <p role="alert" className="text-body-sm text-ink">
          {error}
        </p>
      )}
    </form>
  );
}
