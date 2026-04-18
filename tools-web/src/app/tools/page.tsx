import type { Metadata } from "next";
import Link from "next/link";
import { toolsRegistry } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Tools Index",
  description:
    "Search and launch utility tools for AI compliance, infrastructure cost, and risk scoring in one visit.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsIndexPage() {
  return (
    <section className="tool-card">
      <h1 className="text-2xl font-semibold">Utility Tool Suite</h1>
      <p className="mt-2 text-sm text-[#4f565c]">
        Search-ready, fast-loading tools designed for technical decisions that need immediate answers.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {toolsRegistry.map((tool) => (
          <article key={tool.slug} className="rounded-xl border border-[#d4d9de] bg-white p-4">
            <h2 className="text-base font-semibold">{tool.title}</h2>
            <p className="mt-2 text-sm text-[#4f565c]">{tool.valueProposition}</p>
            <Link
              href={`/tools/${tool.slug}`}
              className="mt-3 inline-flex rounded-lg border border-[#d4d9de] px-3 py-2 text-sm font-semibold text-[#161a1d]"
            >
              Open Tool
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
