'use client';

import Link from 'next/link';
import { useState } from 'react';
import { resetSection, saveSection } from '@/app/jackal/actions';
import { ArrowRight, Check } from '@/components/Icons';
import type { SiteContent } from '@/data/types';
import { FieldEditor } from './FieldEditor';

type Json = Parameters<typeof FieldEditor>[0]['value'];

export function SectionEditor({
  sectionKey,
  initial,
  label,
  live,
}: {
  sectionKey: keyof SiteContent;
  initial: Json;
  label: string;
  live: boolean;
}) {
  const [value, setValue] = useState<Json>(initial);
  const [raw, setRaw] = useState(false);
  const [rawText, setRawText] = useState(() => JSON.stringify(initial, null, 2));
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  function change(next: Json) {
    setValue(next);
    setDirty(true);
    setStatus(null);
  }

  async function save() {
    setBusy(true);
    setStatus(null);
    let payload = value;
    if (raw) {
      try {
        payload = JSON.parse(rawText);
      } catch (e) {
        setBusy(false);
        setStatus({ ok: false, message: 'That JSON is not valid.' });
        return;
      }
    }
    const res = await saveSection(sectionKey, payload);
    setBusy(false);
    setStatus(res);
    if (res.ok) {
      setDirty(false);
      setValue(payload);
      setRawText(JSON.stringify(payload, null, 2));
    }
  }

  async function reset() {
    if (!confirm(`Restore "${label}" to the original seed content?`)) return;
    setBusy(true);
    const res = await resetSection(sectionKey);
    setBusy(false);
    setStatus(res);
    if (res.ok) location.reload();
  }

  return (
    <div className="pb-[120px]">
      <div className="mb-lg flex flex-wrap items-center justify-between gap-sm">
        <div>
          <p className="eyebrow">Editing</p>
          <h1 className="type-h3 mt-1 text-ink">{label}</h1>
        </div>
        <div className="flex items-center gap-xs">
          <button
            type="button"
            onClick={() => {
              if (!raw) setRawText(JSON.stringify(value, null, 2));
              setRaw(!raw);
            }}
            className="rounded-full bg-canvas-soft px-4 py-2 text-body-sm text-ink transition-opacity hover:opacity-70"
          >
            {raw ? 'Form view' : 'JSON view'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-hairline px-4 py-2 text-body-sm text-muted transition-colors hover:text-ink"
          >
            Restore seed
          </button>
        </div>
      </div>

      {!live && (
        <div className="mb-lg rounded-sm border border-hairline bg-canvas-soft p-md text-body-sm text-muted">
          Supabase is not connected, so saving is disabled. Add your keys to
          <code className="mx-1 rounded bg-canvas px-1.5 py-0.5 text-caption">.env.local</code>
          and reload.
        </div>
      )}

      <div className="rounded-md border border-hairline-soft bg-canvas p-lg">
        {raw ? (
          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              setDirty(true);
            }}
            spellCheck={false}
            className="field-input h-[560px] resize-y font-mono text-caption leading-relaxed"
          />
        ) : (
          <FieldEditor label={sectionKey} value={value} onChange={change} path={sectionKey} />
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/95 backdrop-blur lg:left-[264px]">
        <div className="flex items-center justify-between gap-md px-lg py-sm md:px-xl">
          <div className="flex items-center gap-sm text-body-sm">
            {status ? (
              <span className={`inline-flex items-center gap-1.5 ${status.ok ? 'text-ink' : 'text-muted'}`}>
                {status.ok && <Check width={15} height={15} />}
                {status.message}
              </span>
            ) : (
              <span className="text-muted">{dirty ? 'Unsaved changes' : 'Everything saved'}</span>
            )}
          </div>
          <div className="flex items-center gap-xs">
            <Link href="/jackal" className="rounded-full px-4 py-2 text-body-sm text-muted hover:text-ink">
              Back
            </Link>
            <button
              type="button"
              onClick={save}
              disabled={busy || !live}
              className="pill-primary disabled:opacity-50"
            >
              {busy ? 'Saving…' : 'Save & publish'}
              <ArrowRight width={15} height={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
