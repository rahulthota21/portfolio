'use client';

import { useState } from 'react';
import { uploadMedia } from '@/app/jackal/actions';
import { Check, Upload } from '@/components/Icons';

const FOLDERS = [
  { id: 'posters', label: 'Movie / series posters' },
  { id: 'people', label: 'People (cricket, F1, football, music)' },
  { id: 'designs', label: 'My poster designs' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'diagrams', label: 'Architecture diagrams' },
  { id: 'papers', label: 'Paper PDFs' },
  { id: 'resume', label: 'Resume PDF' },
];

export function MediaUploader() {
  const [folder, setFolder] = useState('posters');
  const [busy, setBusy] = useState(false);
  const [uploads, setUploads] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState('');

  async function handleFiles(files: FileList) {
    setBusy(true);
    setError('');
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await uploadMedia(fd);
      if (res.ok && res.url) {
        setUploads((u) => [{ name: file.name, url: res.url as string }, ...u]);
      } else {
        setError(res.message);
      }
    }
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="rounded-md border border-hairline-soft p-lg">
        <label className="flex flex-col gap-1.5">
          <span className="text-caption text-muted">Folder</span>
          <select
            className="field-input"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          >
            {FOLDERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-lg flex cursor-pointer flex-col items-center justify-center gap-sm rounded-sm border border-dashed border-hairline bg-canvas-soft px-lg py-xxl text-center transition-colors hover:border-ink">
          <Upload width={20} height={20} />
          <span className="text-body text-ink">{busy ? 'Uploading…' : 'Choose files to upload'}</span>
          <span className="text-caption text-muted">
            Images or PDFs, up to 10 MB each. Multiple files allowed.
          </span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>

        {error && <p className="mt-sm text-body-sm text-muted">{error}</p>}
      </div>

      {uploads.length > 0 && (
        <div className="rounded-md border border-hairline-soft p-lg">
          <p className="text-title text-ink">Uploaded this session</p>
          <p className="mt-1 text-body-sm text-muted">
            Copy a URL and paste it into the matching field in any section editor.
          </p>
          <ul className="mt-md flex flex-col gap-xs">
            {uploads.map((u) => (
              <li key={u.url} className="flex items-center gap-sm rounded-sm bg-canvas-soft px-md py-sm">
                <Check width={15} height={15} />
                <span className="min-w-0 flex-1 truncate text-body-sm text-ink">{u.name}</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(u.url)}
                  className="shrink-0 rounded-full bg-canvas px-3 py-1.5 text-caption text-ink transition-opacity hover:opacity-70"
                >
                  Copy URL
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
