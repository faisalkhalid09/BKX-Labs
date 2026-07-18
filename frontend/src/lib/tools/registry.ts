import type { ToolDef } from "@/lib/tools/types";

export const toolsRegistry: ToolDef[] = [
  {
    slug: "post-quantum-cbom-generator",
    title: "Post-Quantum CBOM Generator",
    description:
      "Scan a JSON dependency list for post-quantum cryptography readiness and receive a PQC migration roadmap aligned with NIST timelines.",
    metaDescription:
      "Map cryptographic assets against post-quantum risks and export CycloneDX v1.6 CBOM reports. Flags RSA and ECC assets vulnerable to Harvest Now Decrypt Later attacks under NIS2 and NIST FIPS 203.",
    metaKeywords:
      "post-quantum cryptography, CBOM, CycloneDX, NIS2, NIST FIPS 203, RSA migration, cryptographic bill of materials",
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
      },
      {
        question: "What is a practical hybrid cryptography migration pattern for production systems?",
        answer: "A common pattern is hybrid key establishment and dual-signature validation during transition windows. Teams can run classical and PQC paths in parallel, validate interoperability under production load, then progressively disable classical algorithms by environment and business criticality. This lowers cutover risk while keeping services available."
      },
      {
        question: "How often should a CBOM be regenerated for regulated environments?",
        answer: "Most regulated programs regenerate CBOM artifacts on every material cryptographic change and at least per release cycle. For high-sensitivity systems, daily or CI-triggered generation is recommended so inventory drift and newly flagged dependencies are caught before production deployment."
      },
      {
        question: "How does a CBOM support board-level cyber risk reporting?",
        answer: "A CBOM translates cryptographic exposure into measurable metrics: count of vulnerable assets, critical data shelf-life risk, migration backlog, and time-to-remediation. These indicators can be reported quarterly to leadership alongside compliance milestones, enabling governance teams to track quantum-readiness as an enterprise risk program."
      }
    ],
  },
  {
    slug: "nvidia-blackwell-pue-estimator",
    title: "NVIDIA Blackwell PUE Estimator",
    description:
      "Calculates power usage effectiveness (PUE) for high-density liquid-cooled GPU racks and estimates annual energy costs and facility power draw.",
    metaDescription:
      "Estimate PUE, annual OPEX, and electricity costs for NVIDIA B200 and GB200 Blackwell cluster deployments. Compares air versus liquid cooling at rack scale with CO2 and kWh output.",
    metaKeywords:
      "NVIDIA Blackwell, B200, GB200, PUE, data center efficiency, liquid cooling, AI infrastructure cost",
    valueProposition:
      "Get instant PUE and annual energy cost forecasts for Blackwell deployments without manual infrastructure design.",
    directAnswer: {
      sentence1:
        "This estimator projects Blackwell facility power by calculating IT load from GPU density and utilization, then applying cooling-path efficiency assumptions (air versus direct liquid) to derive realistic PUE-driven power and cost outcomes.",
      sentence2:
        "It is authoritative because it aligns Blackwell-era high-density planning with practical data center constraints, including thermal envelopes, cooling topology thresholds, and rack-level power behavior that materially change capex and opex decisions.",
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
      {
        question: "At what rack density does liquid cooling become operationally necessary?",
        answer: "Air cooling can remain practical at lower rack densities, but once sustained thermal loads rise into high-density accelerator profiles, airflow-only designs face diminishing returns. At that point, direct liquid cooling is typically adopted to maintain thermal headroom and predictable performance under continuous load."
      },
      {
        question: "How should we evaluate Water Usage Effectiveness (WUE) alongside PUE?",
        answer: "PUE measures electrical efficiency, while WUE captures water consumption impacts. Facilities should evaluate both because a low PUE design can still create environmental or regulatory pressure if water intensity is high in drought-sensitive regions."
      },
      {
        question: "What should teams assume for GB200-era rack power limits?",
        answer: "GB200-class deployments require planning for substantially higher rack power than legacy enterprise compute. Teams should validate utility feed, PDUs, busway, breaker strategy, and cooling capacity with conservative headroom instead of sizing to nominal averages."
      },
      {
        question: "Does higher coolant temperature always reduce total facility cost?",
        answer: "Not always. Warmer supply temperatures can improve chiller efficiency in some designs, but reliability, component tolerances, and local climate must be modeled. The optimal operating point is a balance between energy efficiency and operational risk."
      },
      {
        question: "How does partial-load operation affect PUE planning?",
        answer: "Partial load usually worsens effective PUE because fixed overhead systems become a larger share of total power. Capacity planning should include ramp phases and non-peak scenarios rather than assuming full utilization from day one."
      },
      {
        question: "What redundancy model should be considered for liquid loops?",
        answer: "Mission-critical deployments commonly require redundancy across pumps, heat exchangers, and distribution paths. N+1 or better loop resilience improves uptime but raises capex, so redundancy should be tied to SLA requirements and outage tolerance."
      },
      {
        question: "Why does facility design quality matter as much as GPU efficiency?",
        answer: "Efficient silicon cannot offset poor thermal or electrical design. In high-density environments, infrastructure inefficiencies can dominate total cost of ownership, making facility architecture a primary determinant of long-term Blackwell economics."
      }
    ],
  },
  {
    slug: "ai-prompt-privacy-auditor",
    title: "AI Prompt Privacy Auditor",
    description:
      "Scans prompts for Personally Identifiable Information (PII) such as emails, phone numbers, API keys, SSNs, and credit cards before sharing with AI services.",
    metaDescription:
      "Scan AI prompts for PII leakage before sending to LLM providers. Detects SSNs, credit cards, API keys, emails, and IP addresses using client-side regex with GDPR Article 32 risk scoring and CSV export.",
    metaKeywords:
      "PII detection, AI prompt security, GDPR Article 32, LLM data leakage, prompt privacy, API key detection",
    valueProposition:
      "Instantly identify PII leaks in prompts before sending to ChatGPT, Claude, or other AI services.",
    directAnswer: {
      sentence1:
        "This auditor scans prompt text for structured and semi-structured sensitive signals, including identifiers, credentials, and financial markers, before data is sent to external or internal LLM endpoints.",
      sentence2:
        "It is authoritative because it operationalizes OWASP-style detection patterns into pre-submission controls, enabling teams to enforce enterprise AI data policies and reduce accidental disclosure risk at the prompt layer.",
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
      {
        question: "Do LLM providers train on submitted prompts by default?",
        answer: "Training and retention behavior depends on provider, plan tier, and account settings. Enterprise plans may support stricter no-training commitments, but teams must validate contractual terms, telemetry settings, and regional processing controls before assuming prompts are excluded from model improvement workflows."
      },
      {
        question: "What are the main limitations of regex-only PII detection?",
        answer: "Regex performs well for structured patterns but misses contextual sensitivity and semantic variants. It may fail on obfuscated identifiers, multilingual entities, or domain-specific secrets that do not follow predictable formats, so layered detection and policy review are recommended."
      },
      {
        question: "Can this tool detect company secrets that are not classic PII?",
        answer: "Partially. It can flag common key and token formats, but proprietary intellectual property, strategy text, and internal project codenames often require policy-based classification and human review beyond pattern matching."
      },
      {
        question: "How should enterprises enforce prompt privacy at scale?",
        answer: "Mature programs combine pre-prompt scanning, role-based access controls, DLP gateways, approval workflows for high-risk datasets, and immutable audit logging. This creates enforcement at both user and platform layers instead of relying on user caution alone."
      },
      {
        question: "What policy standards should prompt security align with?",
        answer: "Teams often map controls to GDPR data-minimization principles, SOC 2 confidentiality controls, ISO 27001 data handling, and internal acceptable-use policies for AI. The key is explicit classification, allowed-use definitions, and escalation paths for policy violations."
      },
      {
        question: "Does anonymization always make prompts safe for LLM use?",
        answer: "Not always. Poor anonymization can still permit re-identification through context, linkage, or rare attributes. Effective de-identification must be tested against re-identification risk, not just token replacement success."
      },
      {
        question: "Can this scanner be used as a compliance evidence artifact?",
        answer: "Yes, as a control-layer artifact showing preventive checks were applied before prompt submission. For audits, pair scan logs with policy documents, incident response records, and provider governance evidence to demonstrate end-to-end control effectiveness."
      }
    ],
  },
  {
    slug: "admt-proportionality-scorer",
    title: "ADMT Proportionality Scorer",
    description:
      "Calculates legal proportionality of AI workplace monitoring under EU ADMT (Automated Decision-Making Technology) regulations and labor law.",
    metaDescription:
      "Score workplace AI monitoring compliance against the GDPR Article 35 Triple Test. Weights legitimacy, necessity, transparency, oversight, and data minimization against EU AI Act 2026 high-risk classification thresholds.",
    metaKeywords:
      "ADMT compliance, GDPR Article 35, EU AI Act, workplace AI monitoring, proportionality test, DPIA",
    valueProposition:
      "Score proportionality of worker monitoring in minutes; defensible assessment reduces litigation risk.",
    directAnswer: {
      sentence1:
        "This scorer quantifies workplace AI monitoring risk by weighting legal proportionality factors such as necessity, transparency, intrusiveness, safeguards, and employee impact into a defensibility-oriented risk score.",
      sentence2:
        "It is authoritative because the rubric mirrors core European legal tests used in GDPR-era employment contexts, including proportionality analysis for automated decision-making and surveillance-intensive processing.",
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
      {
        question: "How does GDPR Article 22 affect AI-driven workplace decisions?",
        answer: "Article 22 restricts decisions based solely on automated processing when those decisions produce legal or similarly significant effects on individuals. In workplace settings, employers often need meaningful human review, transparency, and challenge mechanisms before high-impact decisions are actioned."
      },
      {
        question: "What is the legal meaning of 'necessity' in surveillance programs?",
        answer: "Necessity requires demonstrating that the monitoring objective cannot be achieved through less intrusive alternatives. If equivalent risk reduction is possible through milder controls, broad surveillance is likely disproportionate and vulnerable to legal challenge."
      },
      {
        question: "Do national workplace surveillance rules override a generic EU scoring model?",
        answer: "National labor frameworks, regulator guidance, and case law can materially change implementation limits even within the EU baseline. The score is a strategic screening layer and should be supplemented with jurisdiction-specific review before deployment."
      },
      {
        question: "Is a DPIA mandatory for employee monitoring AI?",
        answer: "In many cases, yes. If processing is high-risk due to systematic monitoring, sensitive data handling, or significant rights impact, a Data Protection Impact Assessment is generally required before rollout and should include residual risk decisions and mitigation controls."
      },
      {
        question: "How do works councils and employee representatives affect deployment?",
        answer: "In several jurisdictions, consultation or co-determination obligations apply before introducing monitoring technology. Ignoring these governance steps can create legal exposure independent of technical control quality."
      },
      {
        question: "Are biometric or emotion analytics in workplaces treated as high risk?",
        answer: "Yes, these categories are typically considered highly intrusive due to sensitivity and potential discriminatory impact. Deployments require stronger legal basis, stricter safeguards, and often face tighter regulatory scrutiny than standard operational telemetry."
      },
      {
        question: "What evidence improves legal defensibility in proportionality assessments?",
        answer: "Defensibility improves when organizations keep a clear decision log: objective definition, alternatives assessed, data minimization rationale, retention policy, access controls, and documented human oversight. Evidence quality often determines audit and litigation outcomes more than policy language alone."
      }
    ],
  },
  {
    slug: "nist-fips-203-migration-timeline-planner",
    title: "NIST FIPS 203 Migration Timeline Planner",
    description:
      "Generates a phased post-quantum cryptography (PQC) migration timeline from classical algorithms (RSA/ECC) to NIST-standardized PQC ( ML-KEM, ML-DSA) based on asset count and team capacity.",
    metaDescription:
      "Calculate your post-quantum cryptography migration timeline to NIST FIPS 203 ML-KEM and FIPS 204 ML-DSA. Models a six-phase migration path from FTE count and asset risk distribution inputs.",
    metaKeywords:
      "NIST FIPS 203, ML-KEM, post-quantum migration, PQC timeline, cryptography compliance, FIPS 204",
    valueProposition:
      "Get a realistic 6-phase migration roadmap (discovery to cutover) in one calculation.",
    directAnswer: {
      sentence1:
        "This planner estimates post-quantum migration timelines by modeling cryptographic asset volume, team capacity, and criticality weighting across phased execution from discovery through dual-run and production cutover.",
      sentence2:
        "It is authoritative because it reflects NIST-aligned transition sequencing and practical enterprise constraints, including interoperability windows, dependency bottlenecks, and high-value data prioritization under harvest-now risk pressure.",
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
      {
        question: "Why does 'Harvest Now, Decrypt Later' change migration priority?",
        answer: "Because adversaries can collect encrypted traffic today and decrypt it later once quantum capability matures. Systems protecting long-lived confidentiality should be prioritized first, even if current cryptography appears operationally stable."
      },
      {
        question: "How should teams integrate Kyber/ML-KEM into existing TLS stacks?",
        answer: "Most programs begin with hybrid key establishment in controlled environments, then expand to production endpoints after interoperability and performance validation. Integration requires certificate-chain planning, library compatibility testing, and fallback handling for legacy clients."
      },
      {
        question: "What team size is realistic for enterprise PQC migration?",
        answer: "Team size depends on asset footprint and platform diversity. Large estates typically need cross-functional staffing across PKI, platform engineering, application owners, security architecture, and compliance operations rather than a single cryptography specialist track."
      },
      {
        question: "What should be inventoried before timeline commitments are made?",
        answer: "Inventory should include keys, certificates, protocol endpoints, cryptographic libraries, HSM dependencies, third-party SaaS integrations, and embedded systems. Migration plans fail when hidden crypto dependencies are discovered late in the execution cycle."
      },
      {
        question: "Should organizations migrate signatures and key exchange at the same speed?",
        answer: "Not always. Key exchange and signature migration often move on different tracks due to protocol and trust-chain constraints. Many teams sequence changes to reduce outage risk while preserving cryptographic continuity across dependent systems."
      },
      {
        question: "How should vendor and hardware dependencies be reflected in the roadmap?",
        answer: "Critical external dependencies should be treated as schedule gates with explicit lead-time buffers. Vendor library readiness, HSM firmware support, and managed service roadmap alignment frequently become dominant critical-path constraints."
      },
      {
        question: "What milestones indicate a migration plan is execution-ready?",
        answer: "Execution readiness usually requires a validated crypto inventory, approved reference architecture, pilot success in dual-stack mode, rollback-tested change plans, and governance sign-off on residual risks. Without these milestones, timeline estimates are usually optimistic."
      }
    ],
  },
  {
    slug: "direct-to-chip-liquid-cooling-roi",
    title: "Direct-to-Chip Liquid Cooling ROI Tool",
    description:
      "Compares 5-year total cost of ownership (air vs. liquid cooling) and calculates ROI, annual savings, and break-even timeline for data center deployments.",
    metaDescription:
      "Calculate 5-year ROI for direct-to-chip liquid cooling retrofits in AI data centers. Models CapEx, OpEx savings, PUE improvement from 1.5 to 1.15, and break-even timeline versus air cooling.",
    metaKeywords:
      "liquid cooling ROI, data center cooling, PUE calculator, AI data center, direct-to-chip cooling, TCO",
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
    slug: "esg-carbon-footprint-tracker",
    title: "ESG Carbon Footprint Tracker for Devs",
    description:
      "Calculate the CO2 footprint of your cloud deployment and estimate offset costs.",
    metaDescription:
      "Calculate Scope 1, 2, and 3 greenhouse gas emissions for SaaS and tech companies. Maps cloud vCPU hours, travel, and facility energy to TCFD and ISSB disclosure categories.",
    metaKeywords:
      "ESG reporting, Scope 3 emissions, TCFD, ISSB, carbon footprint, SaaS emissions, cloud carbon",
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
    metaDescription:
      "Estimate zero-knowledge proof circuit constraints for Groth16, PLONK, and STARK systems. Outputs prover RAM requirements, browser WASM feasibility, and Ethereum L1 verification gas cost.",
    metaKeywords:
      "zero knowledge proof, ZK-SNARK, Groth16, PLONK, STARK, circuit constraints, Ethereum gas cost",
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
    slug: "crypto-agility-maturity-model",
    title: "Crypto-Agility Maturity Model",
    description:
      "Score organizational capability to swap cryptographic algorithms (e.g., RSA → post-quantum) at scale.",
    metaDescription:
      "Self-assess your organization's cryptographic algorithm migration readiness against NIST SP 800-227. Outputs a Level 1 to 5 maturity score across inventory, abstraction, KMS, testing, and governance dimensions.",
    metaKeywords:
      "crypto agility, NIST SP 800-227, post-quantum readiness, cryptographic maturity model, PQC migration",
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
