'use client';

import { useState } from 'react';
import { seedDatabase } from '@/app/jackal/actions';

export function SeedButton() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          if (!confirm('Overwrite every content row in Supabase with the built-in seed content?'))
            return;
          setBusy(true);
          const res = await seedDatabase();
          setBusy(false);
          setMsg(res.message);
        }}
        className="pill-outline disabled:opacity-50"
      >
        {busy ? 'Seeding…' : 'Load seed content'}
      </button>
      {msg && <p className="text-caption text-muted">{msg}</p>}
    </div>
  );
}
