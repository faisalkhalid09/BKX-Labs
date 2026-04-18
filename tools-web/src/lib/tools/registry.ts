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
  {
    slug: "nvidia-blackwell-pue-estimator",
    title: "NVIDIA Blackwell PUE Estimator",
    description:
      "Calculates power usage effectiveness (PUE) for high-density liquid-cooled GPU racks and estimates annual energy costs and facility power draw.",
    valueProposition:
      "Get instant PUE and annual energy cost forecasts for Blackwell deployments without manual infrastructure design.",
    directAnswer: {
      sentence1:
        "This tool calculates Power Usage Effectiveness (PUE) by deriving IT load from GPU count and utilization, then multiplying by a PUE factor (1.9 for air, 1.2 for liquid) to estimate facility-wide power.",
      sentence2:
        "It is authoritative because PUE values are based on industry benchmarks for high-density racks, and the GPU power draw (1.456 kW) is from NVIDIA Blackwell specifications.",
    },
    faqs: [
      {
        question: "What does PUE mean?",
        answer:
          "PUE (Power Usage Effectiveness) is the ratio of total facility power to IT equipment power. A lower PUE means better efficiency.",
      },
      {
        question: "Why is liquid cooling's PUE lower?",
        answer:
          "Liquid cooling is more efficient at removing heat directly from chips, reducing secondary cooling system overhead.",
      },
      {
        question: "Are these annual costs accurate?",
        answer:
          "The estimate assumes $85/MWh electricity cost (US average). Your actual costs depend on local power rates.",
      },
    ],
  },
  {
    slug: "ai-prompt-privacy-auditor",
    title: "AI Prompt Privacy Auditor",
    description:
      "Scans prompts for Personally Identifiable Information (PII) such as emails, phone numbers, API keys, SSNs, and credit cards before sharing with AI services.",
    valueProposition:
      "Instantly identify PII leaks in prompts before sending to ChatGPT, Claude, or other AI services.",
    directAnswer: {
      sentence1:
        "This tool pattern-matches a prompt for PII signals (emails, phone numbers, social security numbers, API keys, credit cards, IP addresses) using regex patterns with confidence weighting.",
      sentence2:
        "It is authoritative because detection patterns are derived from OWASP PII guidelines and common data breach indicators, with each signal flagged with a confidence score.",
    },
    faqs: [
      {
        question: "What if my prompt has legitimate email addresses?",
        answer:
          "The tool flags all detected patterns; you decide if they should be redacted. Always err on the side of caution.",
      },
      {
        question: "Does this check data already in AI training?",
        answer:
          "No. This tool only scans your current prompt before sending it. Historical training data leaks are outside its scope.",
      },
      {
        question: "What's the false-positive rate?",
        answer:
          "Email and IP patterns can have false positives (e.g., config file syntax). Review flagged items manually.",
      },
    ],
  },
  {
    slug: "admt-proportionality-scorer",
    title: "ADMT Proportionality Scorer",
    description:
      "Calculates legal proportionality of AI workplace monitoring under EU ADMT (Automated Decision-Making Technology) regulations and labor law.",
    valueProposition:
      "Score proportionality of worker monitoring in minutes; defensible assessment reduces litigation risk.",
    directAnswer: {
      sentence1:
        "This tool weights five legal factors (necessity, transparency, intrusiveness, safeguards, worker impact) and normalizes them to a 0–100 proportionality score mapped to risk bands (low, medium, high).",
      sentence2:
        "It is authoritative because the scoring rubric aligns with ADMT statutory proportionality tests and EU labor law standards for workplace monitoring.",
    },
    faqs: [
      {
        question: "Is a high score always legal?",
        answer:
          "A high proportionality score suggests defensibility, but does not guarantee legal compliance. Consult a labor lawyer for final decisions.",
      },
      {
        question: "What is 'worker transparency'?",
        answer:
          "Full disclosure of monitoring scope, data use, and retention. High transparency reduces legal risk.",
      },
      {
        question: "When is monitoring 'necessary'?",
        answer:
          "Necessity exists when monitoring addresses legitimate operational needs (e.g., safety, compliance) that cannot be achieved less intrusively.",
      },
    ],
  },
  {
    slug: "nist-fips-203-migration-timeline-planner",
    title: "NIST FIPS 203 Migration Timeline Planner",
    description:
      "Generates a phased post-quantum cryptography (PQC) migration timeline from classical algorithms (RSA/ECC) to NIST-standardized PQC ( ML-KEM, ML-DSA) based on asset count and team capacity.",
    valueProposition:
      "Get a realistic 6-phase migration roadmap (discovery to cutover) in one calculation.",
    directAnswer: {
      sentence1:
        "This tool estimates migration duration by dividing cryptographic assets among team members and scaling by criticality, then distributing effort across six phases (assessment, design, implementation, testing, dual-run, cutover).",
      sentence2:
        "It is authoritative because phase durations are calibrated to industry PQC migration pilots and NIST transition guidance.",
    },
    faqs: [
      {
        question: "Do I need FIPS 203 certification right now?",
        answer:
          "NIST recommends starting PQC assessment now, with full migration by 2030 for systems protecting long-lived data.",
      },
      {
        question: "What if I can't migrate everything in 5 years?",
        answer:
          "Prioritize critical systems (cryptographic keys, certificates) first. Non-critical systems can migrate later.",
      },
      {
        question: "How long does 'dual-run' typically last?",
        answer:
          "Dual-run (running both classical and PQC side-by-side) typically lasts 3–6 months to catch interoperability issues.",
      },
    ],
  },
  {
    slug: "direct-to-chip-liquid-cooling-roi",
    title: "Direct-to-Chip Liquid Cooling ROI Tool",
    description:
      "Compares 5-year total cost of ownership (air vs. liquid cooling) and calculates ROI, annual savings, and break-even timeline for data center deployments.",
    valueProposition:
      "Decide if liquid cooling is financially justified for your racks in one comparison.",
    directAnswer: {
      sentence1:
        "This tool sums annual OpEx (operations and maintenance) for both cooling types over 5 years, adding liquid-cooling capital expenditure to that total, then calculates annual savings and ROI percentage.",
      sentence2:
        "It is authoritative because the model accounts for both CapEx (one-time implementation) and OpEx (recurring costs), standard metrics in data-center infrastructure decisions.",
    },
    faqs: [
      {
        question: "Does liquid cooling always pay for itself?",
        answer:
          "Only if annual savings from lower OpEx exceed the initial investement within the equipment lifetime (5+ years).",
      },
      {
        question: "What costs are included in OpEx?",
        answer:
          "Cooling Power consumption, maintenance labor, fluid replacement, and pump/chiller repairs.",
      },
      {
        question: "Do I need water treatment?",
        answer:
          "Yes, direct-to-chip cooling requires de-ionized water treatment to prevent corrosion. This is part of annual OpEx.",
      },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(
  toolsRegistry.map((tool) => [tool.slug, tool])
);
