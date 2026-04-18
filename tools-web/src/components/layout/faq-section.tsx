import type { FaqItem } from "@/lib/tools/types";

export function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="faq-area" aria-label="Commonly Asked Questions">
      <h3 className="text-sm font-semibold">Commonly Asked Questions</h3>
      <dl className="mt-2 space-y-4 text-sm">
        {faqs.map((item) => (
          <div key={item.question}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
