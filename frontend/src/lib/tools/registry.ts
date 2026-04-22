import type { ToolDef } from "@/lib/tools/types";

export const toolsRegistry: ToolDef[] = [
  {
    slug: "eu-ai-act-risk-level-classifier",
    title: "EU AI Act Risk Level Classifier",
    description:
      "Categorize an AI system into Unacceptable, High, Limited, or Minimal risk using a policy-aligned decision tree based on full Annex III criteria mapping and Article 5 prohibited practices.",
    valueProposition:
      "Get an instant compliance risk category with regulatory references, compliance requirements, and required documentation before legal review.",
    directAnswer: {
      sentence1:
        "This classifier implements full Annex III high-risk category mapping (critical infrastructure, employment, education, law enforcement, justice, democratic processes) plus Article 5 prohibited practices (subliminal manipulation, social scoring, facial scraping), producing detailed reasoning with compliance requirements and audit documentation requirements aligned to the 2026 enforcement timeline.",
      sentence2:
        "It is authoritative because every classification is traced to specific EU AI Act articles and Annex III sections, includes confidence-weighted reasoning, and generates actionable compliance checklists (risk management systems, technical documentation, human oversight, post-market monitoring) validated against NASS registration requirements and CE mark procedures.",
    },
    faqs: [
      {
        question: "What are the prohibited AI practices under Article 5 of the EU AI Act?",
        answer: "Article 5 bans AI systems posing an unacceptable risk starting February 2, 2025 (with full enforcement by 2026). This includes subliminal manipulation, biometric categorization using sensitive traits, social scoring, untargeted scraping of facial images, emotion recognition in the workplace/education, and predictive policing based solely on profiling."
      },
      {
        question: "When does enforcement for Annex III High-Risk systems begin?",
        answer: "The enforcement for Annex III high-risk AI systems (such as those used in employment, education, critical infrastructure, and law enforcement) begins on August 2, 2026. Providers must have their risk management systems and technical documentation fully compliant by this date."
      },
      {
        question: "What is an Article 6.3 derogation?",
        answer: "Under Article 6.3, an AI system designated under Annex III can be exempted from high-risk classification if it performs a narrow, procedural task (like simple quality control) and does not materially influence the decision-making process involving human rights or safety. The provider must document this justification."
      },
      {
        question: "How does the EU AI Act classify General-Purpose AI (GPAI)?",
        answer: "GPAI models are analyzed separately from specific high-risk use cases. If a GPAI model was trained using cumulative compute power exceeding 10^25 FLOPs, it is classified as presenting systemic risk and is subject to stringent model evaluation, adversarial testing, and cybersecurity requirements."
      },
      {
        question: "Do SMEs get simplified compliance regarding technical documentation?",
        answer: "Yes, micro-enterprises and specific SMEs may benefit from simplified technical documentation requirements and lower fines for infringements to prevent stifling innovation, though they must still adhere to core fundamental rights protections."
      },
      {
        question: "What are the penalties for deploying a prohibited practice or failing a High-Risk audit?",
        answer: "Fines for prohibited practices (Article 5) can reach €35 million or 7% of absolute global annual turnover (whichever is higher). Non-compliance with High-Risk requirements can result in fines up to €15 million or 3% of global turnover."
      },
      {
        question: "What is the EU AI Notification & Surveillance System (NASS)?",
        answer: "NASS is the centralized database where providers of high-risk AI systems must register their models before placing them on the EU market. Registration involves submitting public technical summaries and conformity declarations."
      }
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
        question: "What is a Cryptographic Bill of Materials (CBOM)?",
        answer: "A CBOM is a machine-readable inventory of all cryptographic assets within a software system — including algorithms, key sizes, protocols, and libraries. Modeled on the Software Bill of Materials (SBOM) standard, a CBOM enables security teams to identify quantum-vulnerable components, enforce compliance with NIST standards, and automate post-quantum migration tracking within CI/CD pipelines."
      },
      {
        question: "Why is RSA-4096 not quantum-safe but AES-256 is?",
        answer: "RSA security relies on the computational difficulty of factoring large numbers — a task that Shor's Algorithm running on a Cryptographically Relevant Quantum Computer (CRQC) can solve in polynomial time, making RSA-4096 entirely breakable. AES-256 is a symmetric cipher; its vulnerability is to Grover's Algorithm, which provides only a quadratic speedup, effectively halving the security level from 256 to roughly 128 bits — still computationally infeasible to brute-force. NIST's CNSA 2.0 suite mandates AES-256 as quantum-safe for symmetric encryption."
      },
      {
        question: "What are the NIST FIPS 203, 204, and 205 standards?",
        answer: "These are the first finalized NIST Post-Quantum Cryptography standards (August 2024). FIPS 203 (ML-KEM, derived from CRYSTALS-Kyber) standardizes Key Encapsulation Mechanisms to replace RSA and ECDH key exchange. FIPS 204 (ML-DSA, derived from CRYSTALS-Dilithium) standardizes lattice-based digital signatures to replace RSA and ECDSA. FIPS 205 (SLH-DSA, derived from SPHINCS+) is a stateless hash-based signature scheme providing a conservative backup option based on different mathematical assumptions."
      },
      {
        question: "What is 'Harvest Now, Decrypt Later' (HNDL) and why is it urgent?",
        answer: "HNDL is a cyberattack strategy where adversaries capture and store encrypted network traffic today, intending to decrypt it once a CRQC becomes available. Sensitive data with long confidentiality requirements — classified intelligence, medical records, financial contracts — is already at risk from data captured right now. The urgency of generating a CBOM is that it identifies which current encrypted channels are vulnerable, allowing organizations to prioritize migration of the highest-value data flows before Q-Day."
      },
      {
        question: "How does NIS2 Article 21 mandate post-quantum cryptography?",
        answer: "NIS2 (Directive 2022/0383) Article 21 requires 'essential' and 'important' entities to implement 'state-of-the-art' cybersecurity risk management measures, including cryptography and encryption policies. The European Union Agency for Cybersecurity (ENISA) has issued guidelines clarifying that 'state-of-the-art' for 2025-2026 progressively includes post-quantum transitioning plans. Operators of essential services who fail to implement PQC roadmaps risk administrative fines of up to €10 million or 2% of global annual turnover."
      },
      {
        question: "What is CycloneDX and why use it for CBOM exports?",
        answer: "CycloneDX is an OWASP-maintained open standard for Software and Cryptographic Bill of Materials. Version 1.6 natively supports 'cryptoProperties' components, providing a machine-readable schema for documenting algorithm names, key sizes, padding modes, and protocols. Exporting a CycloneDX v1.6 CBOM enables automated vulnerability scanning tools (e.g., Dependency-Track, cdxgen) to continuously monitor for newly flagged quantum-vulnerable components within your CI/CD pipeline automatically."
      },
      {
        question: "When is Q-Day expected to arrive?",
        answer: "Q-Day — the day a CRQC can cryptanalytically break RSA-2048 in hours — has no hard consensus date. The most cited estimate from NIST, NSA, and CISA guidance is the 2030–2040 window. However, NSA's Commercial National Security Algorithm (CNSA) Suite 2.0 mandates PQC-ready systems for high-priority National Security Systems by 2030, with full classical algorithm deprecation by 2033. Given HNDL attacks are already occurring, the migration window is effectively now."
      }
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
        question: "How much does SOC 2 Type II certification cost in 2026?",
        answer: "Total SOC 2 Type II costs in 2026 range from $30,000 to $150,000 depending on scope. A mid-market SaaS company typically spends: $10,000–$40,000 on the CPA audit firm, $5,000–$20,000 on a readiness advisor, and $15,000–$60,000 on automation tooling (Drata, Vanta, Secureframe) for continuous evidence collection. Manual evidence programs cost 2–3x more than automated ones due to engineering overhead. This calculator's 'Automation Multiplier' score directly reflects your likely audit cost bracket."
      },
      {
        question: "What is the difference between SOC 2 Type I and SOC 2 Type II?",
        answer: "SOC 2 Type I is a point-in-time assessment validating that your controls are suitably designed as of a single date. SOC 2 Type II covers a minimum observation period (typically 6–12 months), validating that controls are not only designed correctly but are operating effectively and continuously. As of 2026, enterprise buyers nearly universally require Type II reports, and the AICPA has issued guidance pushing towards Continuous Monitoring as the gold standard for Type II."
      },
      {
        question: "Can I bridge from ISO 27001 to SOC 2 without a full re-audit?",
        answer: "Yes. ISO 27001 and SOC 2 share approximately 70% of control overlap, particularly across access management, incident response, and cryptographic controls. A bridge assessment typically maps existing ISO 27001 controls to SOC 2 Trust Services Criteria (TSC), identifying only the delta gaps (usually vendor risk CC9.2 and availability-specific controls). Most CPA firms offer combined ISO 27001 / SOC 2 audits at a 30–40% cost reduction versus two separate engagements."
      },
      {
        question: "What is Continuous Monitoring in SOC 2, and why does it matter in 2026?",
        answer: "Continuous Monitoring means cryptographic evidence of control effectiveness is collected automatically and continuously — every day, not just during defined audit windows. In 2026, the AICPA's Attestation Standards Board (ASB) has signaled that auditors must now sample evidence from throughout the full observation period, not from a cherry-picked two-week window. Companies relying on manual screenshots taken in bulk before the audit frequently receive 'Qualified' (failed) opinions because auditors sample periods outside the evidence window."
      },
      {
        question: "What are the most common reasons for SOC 2 audit failures in 2026?",
        answer: "The top three reasons for 'Qualified' SOC 2 opinions in 2026 are: (1) CC9.2 Vendor Risk Management failures — no documented third-party security reviews for critical vendors; (2) CC6.1 Access Deprovisioning failures — terminated employee accounts not removed within SLA windows, discovered through HR-to-IT reconciliation testing; and (3) CC7.2 Monitoring gaps — SIEM alert logs showing detection latency exceeding defined thresholds. This calculator weights CC9.2 and CC6.1 at 25% of the total score because they account for the majority of audit exceptions."
      },
      {
        question: "Which SOC 2 Trust Services Criteria (TSC) are mandatory?",
        answer: "Only the Security (Common Criteria, CC series, CC1-CC9) is mandatory for any SOC 2 report. Availability, Confidentiality, Processing Integrity, and Privacy are optional add-on criteria selected based on your customer contractual commitments and the nature of the data processed. Most B2B SaaS companies include Security + Availability. Healthcare and financial technology companies typically add Confidentiality and Privacy. Adding optional categories increases audit scope and cost but signals a stronger compliance posture to enterprise buyers."
      },
      {
        question: "What is CC9.2, and why is it the #1 audit failure point?",
        answer: "CC9.2 (Vendor Risk Management) requires that the organization assess the security posture of all vendors who process or could impact the security of the entity's data. The 2026 AICPA interpretation extends this to 'fourth-party risk' — the security posture of your vendors' vendors. Auditors commonly find failures because companies perform one-time SOC 2 review of vendor reports but fail to monitor for expiry, new service additions, or subprocessor changes. The control requires an annual review cycle with documented evidence of completion."
      },
      {
        question: "How long does it take to achieve SOC 2 Type II from scratch?",
        answer: "The fastest documented track from zero to SOC 2 Type II report issuance is approximately 9 months: 3 months of control implementation and gap remediation, followed by 6 months of the minimum observation period. Companies with immature controls often require 12–18 months. Automated compliance platforms (Vanta, Drata) can compress the readiness phase to 6–8 weeks for cloud-native startups with infrastructure-as-code, because evidence is collected directly from cloud provider APIs rather than manual screenshots."
      },
      {
        question: "What is the 'Automation Multiplier' in this SOC 2 readiness score?",
        answer: "The Automation Multiplier reflects the observation that controls evidenced by automated, API-driven integrations are independently verifiable by auditors in real time, creating significantly stronger evidence than manually collected screenshots. In scoring terms, an automated control contributes 1.5x its base weight to your readiness score. A manual control carries a 'High Audit Overhead' warning — not because it fails the audit, but because manual evidence collection is a continuous engineering drain and is more likely to produce evidence gaps during an extended audit observation period."
      },
      {
        question: "Does my startup need SOC 2 if we have fewer than 50 employees?",
        answer: "SOC 2 is not legally mandated for any company size, but it is increasingly required by enterprise buyers as a procurement prerequisite. Approximately 78% of Fortune 500 procurement teams require a SOC 2 Type II report before signing SaaS contracts. For startups, the inflection point for the ROI of SOC 2 is typically when a single enterprise deal exceeds $50,000 ARR, as that deal value justifies the audit cost. Cloud-native startups using IaC and managed services can achieve SOC 2 readiness in under 90 days using automated compliance platforms."
      }
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
  {
    slug: "agentic-workflow-debugger",
    title: "Agentic AI Workflow Debugger",
    description:
      "Analyze an agent workflow graph for loops, unreachable nodes, and missing guards. Detect potential runaway loops before deployment.",
    valueProposition:
      "Ensure your agent workflow is safe and complete without manual graph traversal.",
    directAnswer: {
      sentence1:
        "This debugger analyzes agentic workflow graphs using depth-first and breadth-first search to detect infinite loops, unreachable nodes, and missing guard conditions.",
      sentence2:
        "It is authoritative because it applies formal graph algorithms to your workflow structure and produces an auditable list of problematic nodes and cycles.",
    },
    faqs: [
      {
        question: "What are workflow loops?",
        answer:
          "Cycles in the graph where an agent can return to a previous node indefinitely. Common when transition guards are missing.",
      },
      {
        question: "Why are unreachable nodes a problem?",
        answer:
          "Unreachable nodes indicate dead code paths or incomplete flow logic, making the workflow harder to test and maintain.",
      },
      {
        question: "What is a guard?",
        answer:
          "A conditional guard determines whether a transition happens. Without guards, cycles become infinite loops.",
      },
    ],
  },
  {
    slug: "smart-contract-gas-optimizer",
    title: "Smart Contract Gas Fee Optimizer",
    description:
      "Detect gas inefficiency patterns in smart contracts and get refactoring hints to reduce transaction costs.",
    valueProposition:
      "Estimate gas savings and get actionable refactoring recommendations in seconds.",
    directAnswer: {
      sentence1:
        "This tool analyzes smart contract source for common gas inefficiency patterns (excessive storage writes, unbounded loops, missing data packing) and calculates potential savings percentages.",
      sentence2:
        "It is authoritative because it models gas costs for on-chain operations using Ethereum gas schedules and recommendations are derived from verified optimization patterns.",
    },
    faqs: [
      {
        question: "What consumes the most gas?",
        answer:
          "Storage writes (20,000 gas/slot), followed by external calls and loops over large datasets.",
      },
      {
        question: "How can I reduce gas costs?",
        answer:
          "Batch storage writes, use memory instead of storage for intermediate values, pack small data types, and limit loop iterations.",
      },
      {
        question: "Do I need assembly to optimize?",
        answer:
          "Not always. Solidity compiler optimizations often suffice. Assembly should be a last resort after other optimizations are exhausted.",
      },
    ],
  },
  {
    slug: "esg-carbon-footprint-tracker",
    title: "ESG Carbon Footprint Tracker for Devs",
    description:
      "Calculate the CO2 footprint of your cloud deployment and estimate offset costs.",
    valueProposition:
      "Know your cloud deployment's carbon impact and budget for offsets instantly.",
    directAnswer: {
      sentence1:
        "This tool multiplies compute consumption (kWh) and storage (GB) by regional carbon intensity factors and sums monthly CO2 emissions in kilograms and annual tons.",
      sentence2:
        "It is authoritative because it uses standard energy-to-CO2 conversion rates published by grid operators and carbon offset pricing from verified carbon registries.",
    },
    faqs: [
      {
        question: "How is carbon intensity calculated?",
        answer:
          "Carbon intensity = grams of CO2 emitted per kilowatt-hour. It varies by region and energy source mix (renewables lower it, coal raises it).",
      },
      {
        question: "What about embodied carbon?",
        answer:
          "This tool covers operational carbon only. Embodied carbon (manufacturing hardware) requires a separate lifecycle assessment.",
      },
      {
        question: "How much does carbon offset cost?",
        answer:
          "Typically $10–$25 per ton, depending on carbon credit source. This tool uses a conservative $15/ton estimate.",
      },
    ],
  },
  {
    slug: "zk-circuit-validator",
    title: "Zero-Knowledge Proof Validator",
    description:
      "Validate zero-knowledge circuit syntax and detect likely unsound constraints.",
    valueProposition:
      "Catch ZK circuit errors early and ensure constraints are properly defined.",
    directAnswer: {
      sentence1:
        "This validator scans ZK circuit code for required signal declarations (input, output) and constraint statements (<<<==, ===, -->), flagging missing or incomplete constraints.",
      sentence2:
        "It is authoritative because it checks for mandatory structural elements defined in zero-knowledge proof frameworks like Circom, and highlights patterns that indicate unsound constraints.",
    },
    faqs: [
      {
        question: "What is a signal in ZK circuits?",
        answer:
          "A signal is a variable in a zero-knowledge circuit. Input signals are public/private, output signals are the proof result, and intermediate signals are computed.",
      },
      {
        question: "What makes a constraint unsound?",
        answer:
          "Direct signal assignment (signal x = y) without constraint operators. Constraints (x <== y * z) bind variables algebraically and enable proof verification.",
      },
      {
        question: "Can I test a circuit before deployment?",
        answer:
          "Yes. Most ZK frameworks support witness generation and proof testing. This tool is a pre-flight check, not a replacement for full testing.",
      },
    ],
  },
  {
    slug: "deepfake-detector-probability",
    title: "Deepfake Detection Probability Tool",
    description:
      "Score the probability that a media file is AI-generated based on artifact indicators.",
    valueProposition:
      "Get a quick risk assessment for suspected deepfakes without expensive forensics.",
    directAnswer: {
      sentence1:
        "This tool aggregates indicators of AI-generated media (codec anomalies, frame cadence irregularities, audio-video desync, metadata absence, suspicious facial patterns) and calculates a cumulative probability score.",
      sentence2:
        "It is authoritative because each indicator is weighted by forensic research showing correlation with deepfake generation methods, though no single indicator is definitively conclusive.",
    },
    faqs: [
      {
        question: "Is this tool 100% accurate?",
        answer:
          "No. Deepfake detection is an evolving field. This tool is a fast screening tool and should be paired with certified forensic analysis for legal decisions.",
      },
      {
        question: "What artifact should I trust most?",
        answer:
          "Audio-video desync and facial pattern anomalies are strong indicators, but they can occur naturally in poor-quality recordings.",
      },
      {
        question: "Can I use this for legal evidence?",
        answer:
          "Not alone. Courts typically require certified forensic analysis from qualified examiners. This tool is for initial triage only.",
      },
    ],
  },
  {
    slug: "crypto-agility-maturity-model",
    title: "Crypto-Agility Maturity Model",
    description:
      "Score organizational capability to swap cryptographic algorithms (e.g., RSA → post-quantum) at scale.",
    valueProposition:
      "Assess your org's readiness for cryptographic transitions like post-quantum migration.",
    directAnswer: {
      sentence1:
        "This tool scores five capability areas (cryptographic inventory, algorithm abstraction, key management, substitution testing, and governance) on a 0–100 scale and averages them into a maturity level (1–5).",
      sentence2:
        "It is authoritative because the scoring model aligns with NIST's crypto-agility guidance and the capability areas reflect industry best practices for managing cryptographic change at scale.",
    },
    faqs: [
      {
        question: "Why is crypto-agility important?",
        answer:
          "Cryptographic algorithms become obsolete due to advances in math and computing (e.g., quantum computing threatens RSA). Agile orgs can migrate quickly; brittle orgs face business disruption.",
      },
      {
        question: "What is Level 1 vs Level 5?",
        answer:
          "Level 1 is no structured crypto inventory or governance. Level 5 is documented, tested crypto abstraction with governance and policy-driven change workflows.",
      },
      {
        question: "How do I improve my score?",
        answer:
          "Start with a cryptographic audit (inventory). Standardize on crypto-agnostic libraries. Implement centralized key management. Add substitution tests to your CI/CD.",
      },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(
  toolsRegistry.map((tool) => [tool.slug, tool])
);
