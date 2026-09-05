'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, Lock } from '@/components/Icons';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [needsOtp, setNeedsOtp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(
    params.get('error') === 'not-allowed' ? 'That account is not allowed here.' : '',
  );

  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  /** Turns terse Supabase errors into something actionable. */
  function friendly(message: string) {
    if (/invalid login credentials/i.test(message))
      return 'Invalid email or password. If the user does not exist yet, create it in Supabase → Authentication → Users → Add user (tick "Auto Confirm User").';
    if (/email not confirmed/i.test(message))
      return 'This email is not confirmed. In Supabase → Authentication → Users, confirm the user (or re-create it with "Auto Confirm User" ticked).';
    if (/signups not allowed/i.test(message))
      return 'Sign-ups are disabled. The user must be created from the Supabase dashboard first.';
    return message;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setBusy(false);
      setError('Supabase is not configured yet.');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setBusy(false);
      setError(friendly(signInError.message));
      return;
    }

    // If two-factor is enrolled, Supabase requires an AAL2 challenge.
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aal?.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel) {
      setNeedsOtp(true);
      setBusy(false);
      return;
    }

    router.replace(params.get('next') || '/jackal');
    router.refresh();
  }

  async function verifyOtp(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { data: factors } = await supabase.auth.mfa.listFactors();
    const factor = factors?.totp?.[0];
    if (!factor) {
      setBusy(false);
      setError('No authenticator app is enrolled.');
      return;
    }
    const { data: challenge, error: chErr } = await supabase.auth.mfa.challenge({
      factorId: factor.id,
    });
    if (chErr || !challenge) {
      setBusy(false);
      setError(chErr?.message ?? 'Could not start the 2FA challenge.');
      return;
    }
    const { error: vErr } = await supabase.auth.mfa.verify({
      factorId: factor.id,
      challengeId: challenge.id,
      code: otp,
    });
    setBusy(false);
    if (vErr) {
      setError(vErr.message);
      return;
    }
    router.replace(params.get('next') || '/jackal');
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center px-lg py-section">
      <div className="w-full max-w-[420px]">
        <div className="mb-lg flex items-center gap-sm">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-canvas">
            <Lock width={16} height={16} />
          </span>
          <div>
            <p className="text-title text-ink">Console</p>
            <p className="text-caption text-muted">rahulthota.dev</p>
          </div>
        </div>

        <div className="rounded-md bg-canvas-soft p-lg md:p-xl">
          {!configured ? (
            <div>
              <h1 className="text-h4 text-ink">Supabase not connected</h1>
              <p className="mt-sm text-body-sm text-muted">
                Add your Supabase keys to <code>.env.local</code>, run{' '}
                <code>supabase/schema.sql</code>, create your user, then come back.
              </p>
            </div>
          ) : needsOtp ? (
            <form onSubmit={verifyOtp} className="flex flex-col gap-sm">
              <h1 className="text-h4 text-ink">Two-factor code</h1>
              <p className="text-body-sm text-muted">
                Enter the 6-digit code from your authenticator app.
              </p>
              <input
                className="field-input tracking-[0.4em]"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                required
              />
              <button type="submit" disabled={busy} className="pill-primary mt-xs disabled:opacity-50">
                {busy ? 'Verifying…' : 'Verify'}
                <ArrowRight width={15} height={15} />
              </button>
              {error && <p className="text-body-sm text-muted">{error}</p>}
            </form>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-sm">
              <h1 className="text-h4 text-ink">Sign in</h1>
              <label className="flex flex-col gap-1.5">
                <span className="text-caption text-muted">Email</span>
                <input
                  className="field-input"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-caption text-muted">Password</span>
                <div className="relative">
                  <input
                    className="field-input pr-12"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:text-ink"
                  >
                    {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                  </button>
                </div>
              </label>
              <button type="submit" disabled={busy} className="pill-primary mt-xs disabled:opacity-50">
                {busy ? 'Signing in…' : 'Sign in'}
                <ArrowRight width={15} height={15} />
              </button>
              {error && <p className="text-body-sm text-muted">{error}</p>}
            </form>
          )}
        </div>

        <p className="mt-lg text-center text-caption text-faint">
          This area is private and excluded from search engines.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
