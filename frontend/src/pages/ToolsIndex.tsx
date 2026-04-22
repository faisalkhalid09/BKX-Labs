import { Link } from 'react-router-dom';
import { toolsRegistry } from '@/lib/tools/registry';

export default function ToolsIndex() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] p-6 md:p-8">
      <section className="mx-auto max-w-4xl rounded-lg border border-[#d4d9de] bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-[#161a1d]">Utility Tool Suite</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Search-ready, fast-loading tools designed for technical decisions that need immediate answers.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {toolsRegistry.map((tool) => (
            <article
              key={tool.slug}
              className="rounded-xl border border-[#d4d9de] bg-white p-4 transition-shadow hover:shadow-lg"
            >
              <h2 className="text-base font-semibold text-[#161a1d]">{tool.title}</h2>
              <p className="mt-2 text-sm text-[#4f565c]">{tool.valueProposition}</p>
              <Link
                to={`/tools/${tool.slug}`}
                className="mt-3 inline-block rounded-lg border border-[#d4d9de] px-4 py-2 text-sm font-semibold text-[#161a1d] transition-colors hover:bg-[#f8f8f6]"
              >
                Open Tool
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
