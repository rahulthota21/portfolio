'use client';

import { useState } from 'react';
import { Down, Plus, Trash, Up, Upload } from '@/components/Icons';
import { uploadMedia } from '@/app/jackal/actions';

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

const LONG_KEYS =
  /^(body|overview|problem|solution|quote|note|excerpt|description|intro|detail|line|privacynote|statusline|headline)$/i;
const MEDIA_KEYS = /(image|pdf|file|photo|avatar|ogimage|arch)/i;

function titleise(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

/** Builds a blank item matching the shape of an existing one. */
function blankLike(sample: Json): Json {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === 'object') {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v as Json);
    return out;
  }
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  return '';
}

function MediaInput({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleFile(file: File) {
    setBusy(true);
    setMsg('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    const res = await uploadMedia(fd);
    setBusy(false);
    if (res.ok && res.url) {
      onChange(res.url);
      setMsg('Uploaded.');
    } else {
      setMsg(res.message);
    }
  }

  return (
    <div className="flex flex-col gap-xs">
      <div className="flex gap-xs">
        <input
          className="field-input"
          value={value ?? ''}
          placeholder="/path or https://…"
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="pill-outline shrink-0 cursor-pointer">
          <Upload width={15} height={15} />
          {busy ? 'Uploading…' : 'Upload'}
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
        </label>
      </div>
      {msg && <p className="text-caption text-muted">{msg}</p>}
      {value && /\.(png|jpe?g|webp|gif|svg)$/i.test(value) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-24 w-auto rounded-sm border border-hairline-soft object-cover" />
      )}
    </div>
  );
}

export function FieldEditor({
  label,
  value,
  onChange,
  path = '',
  depth = 0,
}: {
  label: string;
  value: Json;
  onChange: (next: Json) => void;
  path?: string;
  depth?: number;
}) {
  const key = label;

  // ── boolean ──────────────────────────────────────────────
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center justify-between gap-md rounded-sm bg-canvas-soft px-md py-sm">
        <span className="text-body-sm text-ink">{titleise(key)}</span>
        <button
          type="button"
          onClick={() => onChange(!value)}
          aria-pressed={value}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            value ? 'bg-ink' : 'bg-hairline'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-canvas transition-transform ${
              value ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </label>
    );
  }

  // ── number ───────────────────────────────────────────────
  if (typeof value === 'number') {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-caption text-muted">{titleise(key)}</span>
        <input
          type="number"
          className="field-input"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    );
  }

  // ── string ───────────────────────────────────────────────
  if (typeof value === 'string' || value === null) {
    const str = value ?? '';
    if (MEDIA_KEYS.test(key)) {
      return (
        <label className="flex flex-col gap-1.5">
          <span className="text-caption text-muted">{titleise(key)}</span>
          <MediaInput value={str} onChange={onChange} folder={path.split('.')[0] || 'uploads'} />
        </label>
      );
    }
    const long = LONG_KEYS.test(key) || str.length > 90;
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-caption text-muted">{titleise(key)}</span>
        {long ? (
          <textarea
            className="field-input resize-y"
            rows={Math.min(8, Math.max(3, Math.ceil(str.length / 70)))}
            value={str}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input className="field-input" value={str} onChange={(e) => onChange(e.target.value)} />
        )}
      </label>
    );
  }

  // ── array ────────────────────────────────────────────────
  if (Array.isArray(value)) {
    const arr: Json[] = value;
    const isPrimitiveList = arr.every((v) => typeof v === 'string' || typeof v === 'number');
    const sample: Json = arr.length > 0 ? arr[0] : '';

    const update = (i: number, next: Json) => {
      const copy = [...arr];
      copy[i] = next;
      onChange(copy);
    };
    const remove = (i: number) => onChange(arr.filter((_, j) => j !== i));
    const move = (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return;
      const copy = [...arr];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      onChange(copy);
    };

    return (
      <fieldset className="flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <legend className="text-caption text-muted">
            {titleise(key)} · {arr.length}
          </legend>
          <button
            type="button"
            onClick={() => onChange([...arr, blankLike(sample)])}
            className="inline-flex items-center gap-1 rounded-full bg-canvas-soft px-3 py-1.5 text-caption text-ink transition-opacity hover:opacity-70"
          >
            <Plus width={13} height={13} />
            Add
          </button>
        </div>

        {isPrimitiveList ? (
          <div className="flex flex-col gap-xs">
            {arr.map((v, i) => (
              <div key={i} className="flex gap-xs">
                <input
                  className="field-input"
                  value={String(v)}
                  onChange={(e) => update(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Remove"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-canvas-soft text-ink transition-opacity hover:opacity-70"
                >
                  <Trash width={15} height={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-sm">
            {arr.map((item, i) => {
              const heading =
                (item && typeof item === 'object' && !Array.isArray(item)
                  ? ((item as Record<string, Json>).name ??
                    (item as Record<string, Json>).title ??
                    (item as Record<string, Json>).label ??
                    (item as Record<string, Json>).year)
                  : null) ?? `Item ${i + 1}`;
              return (
                <div key={i} className="rounded-sm border border-hairline-soft p-md">
                  <div className="mb-sm flex items-center justify-between gap-sm">
                    <p className="truncate text-body-sm text-ink">{String(heading)}</p>
                    <div className="flex shrink-0 items-center gap-1">
                      <button type="button" onClick={() => move(i, -1)} aria-label="Move up" className="grid h-8 w-8 place-items-center rounded-full hover:bg-canvas-soft">
                        <Up width={14} height={14} />
                      </button>
                      <button type="button" onClick={() => move(i, 1)} aria-label="Move down" className="grid h-8 w-8 place-items-center rounded-full hover:bg-canvas-soft">
                        <Down width={14} height={14} />
                      </button>
                      <button type="button" onClick={() => remove(i)} aria-label="Remove" className="grid h-8 w-8 place-items-center rounded-full hover:bg-canvas-soft">
                        <Trash width={14} height={14} />
                      </button>
                    </div>
                  </div>
                  <FieldEditor
                    label={`${key}[${i}]`}
                    value={item}
                    onChange={(next) => update(i, next)}
                    path={`${path}.${i}`}
                    depth={depth + 1}
                  />
                </div>
              );
            })}
          </div>
        )}
      </fieldset>
    );
  }

  // ── object ───────────────────────────────────────────────
  const entries = Object.entries(value as Record<string, Json>);
  return (
    <div className={`flex flex-col gap-sm ${depth > 0 ? '' : ''}`}>
      {entries.map(([k, v]) => (
        <FieldEditor
          key={k}
          label={k}
          value={v}
          onChange={(next) => onChange({ ...(value as Record<string, Json>), [k]: next })}
          path={path ? `${path}.${k}` : k}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
