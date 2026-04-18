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
  {
    slug: "post-quantum-cbom-generator",
    title: "Post-Quantum CBOM Generator",
    description:
      "Scan a JSON dependency list for post-quantum cryptography readiness and receive a PQC migration roadmap aligned with NIST timelines.",
    valueProposition:
      "Identify quantum-vulnerable cryptographic dependencies in seconds; no manual inventory audit required.",
    directAnswer: {
      sentence1:
        "This tool analyzes a component bill-of-materials (CBOM) and classifies each dependency by post-quantum cryptography (PQC) status, matching algorithms against NIST-standardized and migration-ready libraries.",
      sentence2:
        "It is authoritative because it uses verifiable algorithm mapping (RSA/ECC marked as classical, liboqs/Kyber/Dilithium marked as PQC-ready) and derives a readiness percentage from verified library classifications.",
    },
    faqs: [
      {
        question: "What is post-quantum cryptography?",
        answer:
          "PQC refers to cryptographic algorithms believed resistant to attacks by both classical and quantum computers, standardized by NIST in 2022 (e.g., Kyber, Dilithium).",
      },
      {
        question: "What happens if I don't migrate before quantum computers exist?",
        answer:
          "Encrypted data captured today could be decrypted retroactively (harvest-now, decrypt-later attacks), making PQC migration critical for long-lived secrets.",
      },
      {
        question: "When should I start migrating?",
        answer:
          "NIST recommends organizations begin assessing and prioritizing critical systems now, with full migration by 2030.",
      },
    ],
  },
  {
    slug: "saas-soc2-readiness-calculator",
    title: "SaaS SOC 2 Readiness Calculator",
    description:
      "Gap-analysis tool for B2B compliance. Assess your security controls against SOC 2 trust criteria and get a prioritized roadmap with timeline estimates.",
    valueProposition:
      "Calculate SOC 2 readiness percentage and receive a prioritized control implementation plan in one step.",
    directAnswer: {
      sentence1:
        "This calculator assesses SOC 2 compliance readiness by mapping implemented security controls (access, encryption, monitoring, etc.) to required categories (Security, Availability, Confidentiality, Integrity, Privacy).",
      sentence2:
        "It is authoritative because readiness scores are derived from official SOC 2 control mappings and generate timeline estimates based on verified control implementation effort.",
    },
    faqs: [
      {
        question: "What is SOC 2 compliance?",
        answer:
          "SOC 2 is a Trust Services Criteria audit standard (Type I or II) demonstrating that a SaaS company maintains secure systems with documented controls.",
      },
      {
        question: "How long does SOC 2 certification take?",
        answer:
          "Typically 6–12 months from control implementation to audit completion, depending on control maturity and gaps.",
      },
      {
        question: "Do I need all 6 controls to be SOC 2 compliant?",
        answer:
          "No; you implement controls based on your chosen trust categories. Most SaaS firms implement Security + Availability; others add Privacy or Confidentiality.",
      },
    ],
  },
  {
    slug: "cloud-gpu-cost-comparison",
    title: "Cloud-GPU Cost Comparison Tool",
    description:
      "Real-time price comparison across AWS, Azure, Google Cloud, and Lambda for GPUs. Find the cheapest provider for your workload and region.",
    valueProposition:
      "Compare GPU costs across 4 cloud providers instant and identify monthly savings in one lookup.",
    directAnswer: {
      sentence1:
        "This tool compares hourly GPU pricing across AWS, Azure, Google Cloud, and Lambda Lambda for a specified GPU type, region, and usage profile.",
      sentence2:
        "It is authoritative because prices are sourced from each provider's official pricing APIs/tables (updated quarterly) and calculations account for regional variance and utilization hours.",
    },
    faqs: [
      {
        question: "Are these prices current?",
        answer:
          "Benchmark prices are curated from official provider rate cards. For production bids, always verify on each provider's pricing page.",
      },
      {
        question: "Does this account for reserved instances?",
        answer:
          "No; this tool shows on-demand hourly rates. Reserved instances (1–3 year commitments) can reduce costs 20–50%.",
      },
      {
        question: "What about egress or other fees?",
        answer:
          "This tool calculates GPU compute costs only. Data egress, storage, and networking fees are not included.",
      },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(
  toolsRegistry.map((tool) => [tool.slug, tool])
);
