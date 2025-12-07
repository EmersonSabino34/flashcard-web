import fs from "node:fs/promises";
import path from "node:path";

export default async function MVPSpecPage() {
  const filePath = path.join(
    process.cwd(),
    "doc",
    "mvp_simplified_spec.md"
  );
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 pb-28">
      <article className="rounded-3xl bg-white/90 p-8 shadow-card">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">
            MVP Simplified Specification
          </h1>
          <p className="text-sm text-slate-500">
            Copied directly from the Claude design brief for quick reference.
          </p>
        </div>
        <pre className="max-h-[70vh] overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
          {content}
        </pre>
      </article>
    </main>
  );
}
