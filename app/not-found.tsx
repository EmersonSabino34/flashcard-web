import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary-50 px-6 text-center">
      <div className="rounded-3xl bg-white/90 p-10 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          The page you are looking for doesn&apos;t exist yet in this MVP.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-primary-600"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
