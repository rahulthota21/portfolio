/** Shown while a route renders - so a click always answers immediately. */
export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center" aria-label="Loading">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulseDot rounded-full bg-ink" />
        <span className="h-2 w-2 animate-pulseDot rounded-full bg-ink [animation-delay:200ms]" />
        <span className="h-2 w-2 animate-pulseDot rounded-full bg-ink [animation-delay:400ms]" />
      </div>
    </div>
  );
}
