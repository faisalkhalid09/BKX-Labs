import type { ToolDef } from "@/lib/tools/types";

export const toolsRegistry: ToolDef[] = [
  {
    slug: "eu-ai-act-risk-level-classifier",
    title: "EU AI Act Risk Level Classifier",
    description:
      "Categorize an AI system into Unacceptable, High, Limited, or Minimal risk using a policy-aligned decision tree.",
    valueProposition:
      "Get an instant compliance risk category before legal review to reduce policy triage time.",
    directAnswer: {
      sentence1:
        "This classifier calculates an EU AI Act risk level by evaluating prohibited practices, high-risk sector usage, and transparency-triggered deployment contexts.",
      sentence2:
        "It is authoritative because every output is derived from an explicit, auditable ruleset that maps directly to the regulation's risk-tier logic and produces traceable reasons.",
    },
    faqs: [
      {
        question: "Does this tool replace legal advice?",
        answer:
          "No. It is a fast screening tool for engineering and product teams, and should be paired with legal review for production decisions.",
      },
      {
        question: "What makes a system Unacceptable risk?",
        answer:
          "Selections such as manipulative behavior distortion, social scoring, or untargeted facial scraping trigger Unacceptable classification immediately.",
      },
      {
        question: "When is a system usually Limited risk?",
        answer:
          "When no prohibited or high-risk conditions are present but transparency obligations are likely, such as emotion recognition or synthetic media disclosure.",
      },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(
  toolsRegistry.map((tool) => [tool.slug, tool])
);
