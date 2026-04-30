import Link from "next/link";

export const metadata = {
  title: "Offline",
  description: "JTPack offline fallback page.",
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-5 inline-flex rounded-md border border-primary-200 bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-800">
          Offline
        </div>
        <h1 className="font-title text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          JTPack is temporarily offline
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Your connection appears to be unavailable. Reconnect to continue browsing our scrap
          trading and packaging manufacturing solutions.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
        >
          Retry Home
        </Link>
      </section>
    </main>
  );
}
