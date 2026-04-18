import Link from "next/link";

export default function ToolNotFound() {
  return (
    <section className="tool-card">
      <h1 className="text-xl font-semibold">Tool Not Found</h1>
      <p className="mt-2 text-sm text-[#4f565c]">
        This tool route is unavailable right now. Return to the index and choose another utility.
      </p>
      <Link href="/tools" className="mt-4 inline-flex rounded-lg border border-[#d4d9de] px-3 py-2 text-sm font-semibold">
        Back to Tools
      </Link>
    </section>
  );
}
