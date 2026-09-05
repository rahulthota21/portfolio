import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-lg">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="type-h1 mt-sm text-ink">That page does not exist.</h1>
        <p className="mt-md text-body-lg text-muted">
          It may have moved, or it was never here in the first place.
        </p>
        <Link href="/" className="pill-primary mt-lg">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
