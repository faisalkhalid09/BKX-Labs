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
    toolGuide: {
      sections: [
        {
          heading: "Why Pasting PII Into LLM Prompts Is a GDPR Article 32 Risk",
          body: "GDPR Article 32 requires organisations to implement appropriate technical measures to ensure security of personal data processing. When a developer or analyst pastes a real customer record, support ticket, or internal document into an LLM interface, they are initiating a data transfer to a third-party processor — the LLM provider. Most enterprise LLM API agreements do not guarantee that prompt inputs are excluded from model training data unless a Data Processing Agreement with explicit training opt-out provisions is in place. Even with such agreements, prompt data transits the provider's infrastructure and is processed in their environment. If that data includes names, SSNs, credit card numbers, API keys, or email addresses, the transfer constitutes personal data processing under Article 4(2) GDPR. Failure to prevent unauthorised transmission of personal data to third parties is an Article 32 violation that carries fines up to 2 percent of global annual turnover under Article 83(4). This tool is designed to catch PII before it leaves your browser — not after.",
        },
        {
          heading: "How the Six Detection Patterns Work",
          body: "The auditor runs six deterministic regex patterns against your prompt text, all executing locally in your browser with no network requests. Credit card detection uses a Luhn-adjacent grouping pattern matching 16-digit sequences in common dash, space, and continuous formats, returning 92 percent confidence to account for edge cases where numeric sequences are not financial data. SSN detection uses the full exclusion pattern defined by the US Social Security Administration — excluding 000, 666, and 900-series prefixes and 00 group numbers — achieving 99 percent confidence. API key and secret detection targets strings following common key-value assignment patterns with a minimum 20-character alphanumeric secret, covering AWS access keys, Bearer tokens, and generic API key assignments with 85 percent confidence due to variable formatting conventions. Email addresses are matched against RFC 5322 simplified pattern with 95 percent confidence. US phone numbers are matched across ITU-T E.164 and NANP formats including country code prefix, parenthetical area codes, and dot-separated styles at 88 percent confidence. IP addresses match all four IPv4 octets within valid range bounds (0–255) at 80 percent confidence, accounting for version numbers and port references that may resemble but are not IP addresses.",
        },
        {
          heading: "How the Risk Score Is Calculated",
          body: "The tool assigns each detection category a severity tier based on regulatory exposure and identity theft potential. Critical tier (credit cards, SSNs, API keys) carries a 50-point weight per detection. High tier (email addresses, phone numbers) carries a 25-point weight per detection. Medium tier (IP addresses) carries a 10-point weight per detection. The final risk score is: minimum of 100 and the sum of (critical count × 50) plus (high count × 25) plus (medium count × 10). This formula reaches the maximum score of 100 with two critical detections alone, or one critical plus two high detections. A score below 25 is Low risk — the prompt contains at most one medium-severity detection. Scores of 25 to 49 indicate Medium risk — typically one or more high-severity detections requiring review. Scores of 50 to 74 indicate High risk — at least one critical detection or multiple high-tier items requiring immediate remediation before the prompt is shared. Scores of 75 and above are Critical — multiple high-severity items or any combination that creates compound identity or credential exposure risk.",
        },
      ],
    },
    faqs: [
      {
        question: "Does this tool send my prompt text to any external server?",
        answer:
          "No. All six detection patterns run as JavaScript regex operations inside your browser's local runtime. No network request is made when you click Audit. Your prompt text never leaves your device. This is verifiable by opening your browser's network inspector before running the audit — you will see zero outbound requests triggered by the analysis.",
      },
      {
        question: "What does a Critical risk score mean under GDPR?",
        answer:
          "A Critical score means your prompt contains at least two items classified as high-severity PII — typically combinations of SSNs, credit card numbers, or API credentials. Transmitting this prompt to any external LLM API without a valid Data Processing Agreement in place would constitute unauthorised personal data transfer under GDPR Article 28. If your organisation has a DPA with your LLM provider that includes training opt-out, transmission may be permissible but should still be logged as a data processing activity under Article 30.",
      },
      {
        question: "Why is SSN detection rated at 99% confidence but API key detection at 85%?",
        answer:
          "SSN format is precisely defined by the US Social Security Administration with documented exclusion zones for invalid prefixes and group numbers. The regex implements all exclusions, leaving very little ambiguity. API key format has no universal standard — different providers use different prefix conventions, lengths, and character sets. The 85 percent confidence for API keys reflects cases where a long alphanumeric string follows a key-value assignment pattern but may be a hash, UUID, or non-credential identifier rather than a live credential.",
      },
      {
        question: "What PII does this tool not detect?",
        answer:
          "The tool does not detect: names and surnames (too many false positives with common words), UK National Insurance numbers, EU national ID formats, IBAN or SWIFT codes, passport numbers, or unstructured address data. It also does not perform semantic analysis — it cannot detect PII disguised through substitution or identify a customer by a combination of non-PII attributes. For comprehensive data classification across structured datasets, a dedicated DLP solution with named-entity recognition is more appropriate.",
      },
      {
        question: "How should I use the CSV export for compliance documentation?",
        answer:
          "The CSV export lists each detected item with its type, the matched value, severity tier, and confidence percentage. This file serves as evidence of a pre-transmission PII review. If your organisation maintains an Article 30 Record of Processing Activities, the CSV can be attached as documentation that a manual review step occurred before a specific prompt was submitted to an external processor. Store exports with the date, the LLM provider used, and the outcome (whether the prompt was modified, abandoned, or transmitted with DPA coverage).",
      },
      {
        question: "Does this tool replace a formal Data Protection Impact Assessment?",
        answer:
          "No. A DPIA under GDPR Article 35 is a structured assessment of a processing activity covering necessity, proportionality, risk to data subjects, and mitigation measures. This tool addresses one narrow technical control — detecting PII in a specific text input before transmission. It is a preventive measure, not an assessment of the broader processing activity. If your organisation uses LLMs to process personal data at scale, a DPIA covering that activity is separately required regardless of whether individual prompts are screened.",
      },
      {
        question: "What should I do if I find PII in a prompt I have already submitted?",
        answer:
          "First, check your LLM provider's data retention and training policy. OpenAI, Anthropic, Google, and Azure OpenAI each have different default retention periods and opt-out mechanisms. If the transmission constitutes a personal data breach under GDPR Article 4(12) — meaning it is likely to result in risk to the rights and freedoms of natural persons — your organisation may have a 72-hour notification obligation to your supervisory authority under Article 33. Consult your Data Protection Officer before determining whether notification is required.",
      },
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
    toolGuide: {
      sections: [
        {
          heading: "What ADMT Is and Why It Triggers Heightened GDPR Obligations",
          body: "Automated Decision-Making Technology in the workplace — ADMT — refers to any system that monitors, evaluates, or makes decisions about workers through automated means. This includes productivity monitoring software that scores keystrokes or mouse activity, surveillance systems that track physical location or facial expressions, algorithmic scheduling that determines shift allocation without human review, and performance management tools that feed automated scores into appraisal processes. Under GDPR Article 22, individuals have the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects. For employment decisions — hiring, disciplinary action, termination, promotion — this standard is almost always met. Separately, Article 35 requires a Data Protection Impact Assessment before deploying any processing that is likely to result in high risk to individuals, with the Article 29 Working Party guidance specifically listing systematic monitoring of employees as a presumptive high-risk category requiring DPIA. The EU AI Act 2024, which reached full applicability in August 2026, separately classifies AI systems used for evaluating workers, including monitoring their performance and behaviour, as high-risk AI under Annex III, imposing conformity assessment, technical documentation, and human oversight requirements that operate in parallel with GDPR. Organisations deploying workplace monitoring technology must satisfy both regimes simultaneously.",
        },
        {
          heading: "How the Six Dimensions Map to the GDPR Article 35 Triple Test",
          body: "The GDPR Article 35 DPIA framework and the Article 29 Working Party guidance on DPIA methodology require assessing necessity, proportionality, and risk mitigation for high-risk processing activities. This tool operationalises that assessment through six weighted dimensions. Legitimacy — the lawful basis and legitimate interest assessment — addresses whether the processing has a valid legal foundation under Article 6 and whether that basis is documented. Necessity and alternatives tests whether less intrusive means could achieve the same objective, a core proportionality requirement under Article 25 data minimisation. Transparency addresses Article 13 and 14 obligations to inform workers about the nature, scope, and purpose of monitoring before it begins. Intrusiveness is weighted inversely — high intrusiveness reduces the score — reflecting the principle that processing which penetrates into private spheres requires correspondingly stronger justification. Human oversight addresses Article 22 requirements that consequential automated decisions involve meaningful human review rather than rubber-stamping. Data minimisation assesses whether the system collects only what is strictly necessary for the stated purpose, implementing Article 5(1)(c). The weighting gives highest combined weight to oversight and intrusiveness at 20 percent each, reflecting that these dimensions generate the most enforcement action — the ICO and CNIL have both issued fines specifically for automated systems with insufficient human review and disproportionate data collection scope.",
        },
        {
          heading: "How to Read Critical Gaps Alongside the Overall Score",
          body: "A composite score above 80 indicates Low overall risk, but the tool separately flags three critical conditions that represent compliance failures regardless of the aggregate score: oversight below 3, legitimacy below 4, and intrusiveness above 8. These thresholds are calibrated against DPA enforcement precedent. Oversight below 3 reflects rubber-stamping risk — a scenario where nominally human-reviewed decisions are in practice never reversed, which regulators treat as equivalent to fully automated decision-making under Article 22. Legitimacy below 4 reflects a weak or undocumented legal basis, the single most common basis for GDPR enforcement action. Intrusiveness above 8 flags processing that is disproportionate in scope — for example, continuous biometric monitoring of remote workers or real-time keystroke logging at character level. When any critical gap is triggered, the tool sets the overall risk band to Critical regardless of the aggregate score. This matters because an organisation could score 75 in aggregate — Medium risk — while still having a legitimacy score of 3 due to weak LIA documentation, creating a Critical gap that should be remediated before any data collection begins. Read the critical gaps flags first, then use the overall score for prioritising remediation of non-critical dimensions.",
        },
      ],
    },
    faqs: [
      {
        question: "What is the difference between GDPR Article 22 and Article 35 for ADMT compliance?",
        answer:
          "Article 22 gives individuals a specific right not to be subject to solely automated decisions with significant effects, and requires that where such decisions occur the organisation must implement suitable safeguards including the ability to obtain human intervention, express a point of view, and contest the decision. Article 35 requires a Data Protection Impact Assessment before deploying any high-risk processing activity — including systematic employee monitoring — regardless of whether the decisions are fully automated. An organisation can comply with Article 35 by completing a DPIA that documents and mitigates risks, while separately complying with Article 22 by implementing human review procedures. Both obligations exist in parallel for workplace ADMT deployments.",
      },
      {
        question: "Does the EU AI Act 2024 create obligations on top of GDPR for workplace monitoring AI?",
        answer:
          "Yes. The EU AI Act classifies AI systems used to evaluate or score natural persons in the employment context — including performance monitoring, behaviour tracking, and allocation of tasks — as high-risk AI under Annex III category 4. High-risk AI systems must undergo a conformity assessment, maintain technical documentation under Article 11, implement a quality management system under Article 17, register in the EU database under Article 71, and provide workers with meaningful explanations of how the system affects decisions concerning them under Article 86. These obligations apply to both providers placing such systems on the market and deployers operating them in the workplace. They operate alongside GDPR and do not replace the DPIA requirement.",
      },
      {
        question: "What legitimacy score triggers the critical gap flag and why?",
        answer:
          "A legitimacy score below 4 out of 10 triggers the critical gap. This threshold reflects cases where the legal basis for processing is absent, undocumented, or implausible. Consent is generally not a valid lawful basis for employee monitoring under GDPR because of the inherent power imbalance between employer and employee — consent is not freely given when refusal has employment consequences. Legitimate interest requires a three-part LIA: establishing a genuine interest, demonstrating necessity, and balancing the interest against worker rights. A score below 4 indicates this assessment has not been completed or documented to a standard that would satisfy a regulatory review.",
      },
      {
        question: "What human oversight score is sufficient to avoid the Article 22 rubber-stamping risk?",
        answer:
          "The tool flags oversight below 3 as a critical gap. An oversight score of 5 or above indicates a process where human reviewers demonstrably exercise independent judgment — meaning automated recommendations are regularly modified or reversed based on contextual factors the algorithm does not capture. Regulatory guidance from the ICO and the French CNIL has established that human oversight is not meaningful when reviewers lack the training, time, or authority to override system outputs. A score of 3 or 4 indicates oversight exists formally but may not be substantive, requiring documentation of actual override rates and reviewer training to confirm compliance.",
      },
      {
        question: "Can this tool's output be used as evidence in a GDPR DPIA?",
        answer:
          "The tool output — compliance score, risk band, critical gaps, and recommendations — can serve as structured input to a DPIA process. It is not a completed DPIA. A DPIA under Article 35 must also document the specific processing operations and their purposes, assess the necessity and proportionality of those specific operations, identify the specific risks to data subjects, and document consultation with the Data Protection Officer under Article 35(2). The tool's risk band and critical gap analysis is suitable for inclusion as a supporting document in the DPIA record, alongside the full DPIA narrative.",
      },
      {
        question: "What intrusiveness level represents disproportionate monitoring under GDPR?",
        answer:
          "An intrusiveness score above 8 is flagged as critical. This corresponds to monitoring that captures intimate or continuous data about workers — real-time biometric data, continuous ambient audio recording, keystroke-level input logging, or facial expression analysis. The Article 29 Working Party guidance and the EDPB's subsequent guidance on the use of tracking technologies both indicate that continuous monitoring of workers in their personal environment (including home office monitoring) requires an exceptionally compelling justification that cannot typically be met by productivity management objectives alone.",
      },
      {
        question: "What are the most common ADMT compliance failures that lead to regulatory fines?",
        answer:
          "The three most common enforcement patterns are: first, deploying employee monitoring without a lawful basis or valid legitimate interest assessment — the Swedish DPA fined an employer for using software that tracked which applications employees used without a documented LIA. Second, failing to inform workers about monitoring — multiple national DPAs have fined organisations for deploying tracking software without the Article 13 disclosures required before monitoring began. Third, allowing automated performance scoring to feed consequential employment decisions without meaningful human review — the Amsterdam District Court ruled that Uber's use of algorithmic fraud detection to terminate driver contracts without human review violated Article 22. These three failure modes correspond directly to the legitimacy, transparency, and oversight dimensions this tool assesses.",
      },
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
    toolGuide: {
      sections: [
        {
          heading: "Why Liquid Cooling ROI Requires Modelling Both CapEx and OpEx",
          body: "A common mistake in data centre cooling decisions is comparing only energy bills. Direct-to-chip liquid cooling has a significant upfront capital cost — manifolds, coolant distribution units, cold plates, leak detection, and deionised water treatment — that air cooling does not. Evaluating only the ongoing power savings overstates the return and leads to unrealistic payback expectations. Accurate ROI analysis requires summing the full 5-year cost of each architecture: recurring annual operating expenditure for both systems, plus the one-time capital expenditure for the liquid cooling implementation. This tool calculates that complete picture. It does not assume a fixed CapEx per rack — you enter your actual vendor quote, which accounts for whether you are retrofitting existing racks or building liquid infrastructure into a greenfield deployment.",
        },
        {
          heading: "How the ROI Model Works",
          body: "The tool computes annual cooling OpEx for both architectures using your IT load (kW), the PUE of each system, and your electricity rate. PUE — Power Usage Effectiveness — is the ratio of total facility power to IT load. An air-cooled system with PUE 1.5 consumes 50 percent more power than the IT equipment alone; a liquid-cooled system at PUE 1.15 consumes only 15 percent overhead. The annual cooling power difference between the two systems is: (PUE_air − PUE_liquid) × IT_load_kW × 8,760 hours × cost_per_kWh. That figure is your annual saving. The tool then computes 5-year cumulative OpEx for each architecture and adds your liquid cooling CapEx to the liquid total. Return on investment is expressed as: (5-year air OpEx − 5-year liquid total cost) ÷ CapEx × 100. Break-even is the year in which cumulative liquid savings exceed CapEx.",
        },
        {
          heading: "Worked Example: 10-Rack NVIDIA Blackwell Deployment",
          body: "Consider 10 racks each drawing 60 kW of IT load, totalling 600 kW. At air cooling PUE 1.5, total facility power is 900 kW. At liquid cooling PUE 1.15, total facility power is 690 kW — a 210 kW reduction. At an electricity rate of 0.08 USD per kWh and 8,760 operating hours per year, annual savings are 210 × 8,760 × 0.08 = 147,168 USD. A realistic CapEx for 10 racks including CDU hardware, manifold installation, and water treatment setup is approximately 200,000 USD. Cumulative savings exceed CapEx during month 17, giving a break-even well within the 5-year model window. At this scale the 5-year net saving after CapEx recovery is approximately 536,000 USD. These figures use conservative PUE values — production deployments often achieve PUE closer to 1.10, which improves the break-even further.",
        },
      ],
    },
    faqs: [
      {
        question: "What PUE improvement is realistic for direct-to-chip liquid cooling?",
        answer:
          "Independent measurements from hyperscale operators place direct-to-chip liquid cooling PUE between 1.05 and 1.15, compared to 1.4 to 1.6 for forced-air cooling in high-density GPU environments. The improvement narrows below 1.05 only in full-immersion deployments, which this tool does not model. The 1.15 default in this calculator is a conservative production figure achievable without purpose-built facility modifications.",
      },
      {
        question: "What CapEx should I budget per rack for liquid cooling?",
        answer:
          "Retrofit costs typically range from 15,000 to 40,000 USD per rack depending on manifold complexity, coolant distribution unit capacity, and whether existing floor tiles or overhead cable trays require modification. Greenfield deployments cost less because liquid infrastructure is designed in from the start. Enter your actual vendor quote into the CapEx field — the tool does not apply a fixed per-rack assumption.",
      },
      {
        question: "Does this tool account for water infrastructure costs?",
        answer:
          "The CapEx field captures your total implementation cost, which should include CDU hardware, piping, leak detection sensors, and deionised water treatment setup. Annual water treatment and fluid replacement costs belong in the annual OpEx field. The tool models aggregate CapEx and annual OpEx difference between the two architectures — it does not break these into sub-line items.",
      },
      {
        question: "How does liquid cooling affect GPU thermal throttling losses?",
        answer:
          "Air-cooled high-density GPU racks routinely thermal-throttle under sustained workloads when ambient temperature exceeds ASHRAE A2 class limits. Throttling typically reduces effective compute throughput by 8 to 15 percent. Direct-to-chip cooling maintains junction temperatures within GPU manufacturer specifications at 100 percent sustained utilisation. The productivity recovery from eliminating throttle events is a real financial benefit this tool does not model, meaning the ROI figures shown are conservative.",
      },
      {
        question: "What is the typical break-even period for a 100-rack deployment?",
        answer:
          "At 60 kW per rack, 100 racks is 6 MW of IT load. At a PUE improvement from 1.5 to 1.15 and an electricity rate of 0.08 USD per kWh, the cooling overhead reduction is approximately 2.1 MW, yielding around 1.47 million USD in annual energy savings. Against a CapEx estimate of 3 to 5 million USD for a 100-rack deployment, break-even falls between 24 and 40 months — well within the 5-year window this tool models.",
      },
      {
        question: "How do I account for regional electricity rates accurately?",
        answer:
          "Use your blended rate including all demand charges, transmission fees, and taxes — not just the commodity rate from your utility contract. Rates vary from 0.04 USD per kWh in hydroelectric-heavy regions to over 0.14 USD per kWh in California and parts of Western Europe. A 0.01 USD change in your kWh rate shifts annual savings by approximately 87,600 USD per megawatt of cooling overhead reduced at the scale used in the worked example above.",
      },
      {
        question: "Does liquid cooling require specific water quality standards?",
        answer:
          "ASHRAE TC 9.9 Water Cooling Guidelines define water quality classes W1 through W4 for data centre applications. Direct-to-chip systems targeting GPU cold plates typically require W2 or W3 quality — deionised or reverse osmosis water with resistivity above 1 MΩ·cm and pH between 7 and 9. Failure to maintain this specification accelerates galvanic corrosion in aluminium and copper cold plates. Water treatment costs should be included in your annual OpEx input.",
      },
      {
        question: "What is the difference between rear-door heat exchangers and direct-to-chip cooling?",
        answer:
          "Rear-door heat exchangers mount at the back of an air-cooled rack and capture exhaust heat using chilled water coils. They reduce facility cooling load but do not change how heat is removed at the chip — GPUs still rely on internal heatsink-and-fan airflow. Direct-to-chip cooling pipes chilled fluid to a cold plate seated on the GPU die, removing heat at the source. Rear-door exchangers typically achieve PUE improvements of 0.1 to 0.2 points; direct-to-chip systems achieve 0.3 to 0.5 points from the same baseline.",
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
    toolGuide: {
      sections: [
        {
          heading: "Groth16, PLONK, and STARK: What the Choice Actually Costs You",
          body: "The three proof systems this tool models make fundamentally different trade-offs between setup trust requirements, proof size, constraint overhead, and on-chain verification cost. Groth16 requires a circuit-specific trusted setup ceremony — a multi-party computation that generates a structured reference string tied to your exact circuit. If the circuit changes, the ceremony must be repeated. This constraint produces the smallest proof size on Ethereum (approximately 128 bytes for the verification key components) and the lowest gas cost for on-chain verification. It is the dominant choice for production ZK applications where circuits are stable, including Zcash and most zkEVM implementations. PLONK uses a universal trusted setup — one ceremony covers any circuit that fits within the SRS size parameter, so circuit changes do not require a new ceremony. Proof size is roughly 300 to 400 bytes and constraint overhead is 1.3 times Groth16 for the same logical operations. PLONK is preferred when circuits are in active development or when the cost of organising a per-circuit ceremony is prohibitive. STARK requires no trusted setup at all — security relies entirely on cryptographic hash functions, making it post-quantum resistant. The trade-off is that proof sizes are orders of magnitude larger than Groth16 or PLONK (typically 50 to 200 kilobytes), on-chain verification is significantly more expensive, and the constraint overhead is 2.1 times Groth16. STARKs are used where eliminating trust assumptions outweighs proof size and verification cost concerns, most notably in StarkWare's production deployments.",
        },
        {
          heading: "How Circuit Constraints Translate to Hardware Memory Requirements",
          body: "A circuit constraint is an arithmetic relationship — typically an addition or multiplication gate — that the prover must satisfy during proof generation. The prover works over a finite field, performing polynomial operations across all constraints simultaneously via Fast Fourier Transform. This is why memory requirements scale non-linearly with constraint count rather than linearly. The FFT step requires holding coefficient vectors of size equal to the next power of two above your constraint count, and doing multiple passes over that data. Empirically, Groth16 prover memory peaks at approximately 100 to 200 bytes per constraint for the FFT working set, with a 4 to 8 times multiplier for intermediate polynomial products. At 500,000 constraints this gives roughly 400 megabytes to 800 megabytes — well within the WebAssembly 4 gigabyte address space limit and feasible in most browsers. At 1,500,000 constraints the working set approaches 1.2 to 2.4 gigabytes, which is feasible on desktop but problematic on mobile or in memory-constrained CI environments. Above 2,000,000 constraints — the browser feasibility threshold this tool uses — peak memory reliably exceeds 4 gigabytes, requiring a native prover process or GPU-accelerated proving infrastructure such as RapidSNARK or Bellman running server-side. The STARK multiplier of 2.1 means a circuit with 500,000 logical operations translates to over 1,000,000 effective constraints, pushing hardware requirements into the server-side range earlier.",
        },
        {
          heading: "Worked Example: ZK Age Verification With Hashed Identity Attributes",
          body: "Consider a ZK proof that a user is over 18 without revealing their exact birthdate or national ID. The circuit takes three private inputs — a birthdate integer, a hashed national ID, and a salt — and two public inputs — the minimum age threshold and the current date. Two Poseidon hash operations are performed inside the circuit to commit the private attributes. Using Groth16: constraints equal ((3 private inputs times 15) plus (2 public inputs times 30) plus (2 hash operations times 300)) times 1.0 system factor, totalling 705 constraints. This is well below the 2 million browser feasibility threshold. Peak RAM is negligible — under 10 megabytes. The Ethereum L1 verification gas cost for a Groth16 proof of this size is approximately 220,000 to 250,000 gas, which at 20 gwei and 3,000 USD ETH corresponds to roughly 13 to 15 USD per verification. For a production KYC gate processing thousands of users per day, this on-chain cost makes L1 verification prohibitive — the same circuit on a zkRollup verification layer reduces per-user cost by approximately 1,000 times by amortising the proof across many state transitions, making the approach economically viable at scale.",
        },
      ],
    },
    faqs: [
      {
        question: "What is a circuit constraint and why does the count matter?",
        answer:
          "A constraint is a single arithmetic equation — typically R1CS form: a times b equals c over a prime field — that the prover must satisfy. Every logical operation in your ZK program compiles down to one or more constraints: a field multiplication is roughly one constraint, a comparison operation is 30 to 50 constraints depending on bit width, and a cryptographic hash over a ZK-friendly function like Poseidon is approximately 300 constraints. Constraint count determines prover RAM, proving time, and ultimately whether browser-based proving is feasible without dedicated hardware.",
      },
      {
        question: "Why does STARK have a 2.1 times constraint multiplier compared to Groth16?",
        answer:
          "STARK arithmetisation uses AIR (Algebraic Intermediate Representation) rather than R1CS, which requires expressing computations over execution traces rather than individual gate equations. The trace encoding introduces additional auxiliary columns for boundary constraints, transition constraints, and FRI (Fast Reed-Solomon IOP) proximity checks. These structural overheads mean that a computation requiring 100,000 R1CS constraints in Groth16 requires approximately 210,000 effective trace cells in a STARK, before any FRI repetition parameter overhead. The 2.1 multiplier in this tool is a conservative mid-range figure — actual multipliers vary between 1.8 and 2.5 depending on the specific STARK implementation and circuit structure.",
      },
      {
        question: "What hash function should I use for ZK-friendly operations inside a circuit?",
        answer:
          "Standard cryptographic hash functions like SHA-256 and Keccak are expensive inside ZK circuits because they use bitwise operations that map poorly to prime-field arithmetic. SHA-256 in a Groth16 circuit costs approximately 25,000 constraints per hash. ZK-native hash functions designed for algebraic structures — Poseidon, MiMC, and Rescue — reduce this to 200 to 400 constraints per hash by working natively in the same prime field the proving system uses. This tool uses 300 constraints per hash operation as a mid-range estimate. If your application requires Ethereum Keccak compatibility for on-chain verification, either accept the constraint cost or use a recursive proof to bridge between the native hash and Keccak.",
      },
      {
        question: "What does browser WASM feasibility mean in practice?",
        answer:
          "Browser feasibility means the proof can be generated client-side using a WASM-compiled prover library such as snarkjs without exceeding the WebAssembly linear memory limit of 4 gigabytes. This is significant for user-privacy applications — a browser-based prover means the private inputs never leave the user's device, because the proof is generated locally before any network request is made. Server-side proving requires sending private inputs to the prover server, which reintroduces the trust assumption that ZK proofs are often used to eliminate. If your circuit exceeds the 2 million constraint browser threshold, you must either simplify the circuit, use a recursive composition approach to split proving across smaller sub-circuits, or accept that private inputs will transit to a proving server.",
      },
      {
        question: "How much does Groth16 verification cost on Ethereum mainnet in USD?",
        answer:
          "On-chain Groth16 verification gas cost is largely independent of circuit size — it depends on the verification key size, which is proportional to the number of public inputs. A typical Groth16 verifier with 2 to 4 public inputs costs 200,000 to 300,000 gas. At 20 gwei gas price and ETH at 3,000 USD, that is approximately 12 to 18 USD per verification. At 100 gwei — common during high network load — the cost rises to 60 to 90 USD. This makes direct L1 verification economically viable only for high-value transactions. Layer 2 rollup verification amortises the cost across thousands of proofs by verifying one aggregated batch proof per settlement transaction, reducing effective per-user cost to fractions of a cent.",
      },
      {
        question: "When does the 2,000,000 constraint threshold become a practical problem?",
        answer:
          "Most simple ZK applications — age gates, credential proofs, single-value range proofs — stay well below 100,000 constraints and are comfortably browser-feasible. The 2 million threshold becomes relevant when circuits include: multiple Keccak or SHA-256 hashes for Ethereum compatibility (25,000 constraints each), deep Merkle proof paths (roughly 5,000 constraints per 20-level tree), complex arithmetic over 256-bit integers rather than native field elements, or repeated verification of cryptographic signatures inside the circuit. zkEVM circuits — which must prove every Ethereum opcode execution — are the most constraint-intensive common application, typically requiring tens of millions of constraints per block and GPU cluster infrastructure to prove within block time.",
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
