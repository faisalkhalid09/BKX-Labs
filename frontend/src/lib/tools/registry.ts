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
    toolGuide: {
      sections: [
        {
          heading: "What a Cryptographic Bill of Materials Is and Why Regulators Now Require It",
          body: "A Cryptographic Bill of Materials is a structured inventory of every cryptographic algorithm, key, certificate, and protocol in use across a software system or infrastructure stack. The concept extends the Software Bill of Materials — already mandated by US Executive Order 14028 for federal software suppliers — into the cryptographic layer specifically. Where a standard SBOM lists components and their versions, a CBOM goes further by identifying which cryptographic primitives each component relies on, what key sizes and modes are used, and where those algorithms appear in data flows. The need for CBOM has accelerated because of the post-quantum timeline. NIST finalised three post-quantum cryptography standards in August 2024 — FIPS 203 (ML-KEM, lattice-based key encapsulation), FIPS 204 (ML-DSA, lattice-based digital signatures), and FIPS 205 (SLH-DSA, hash-based signatures) — and has set a deprecation target for RSA and elliptic curve algorithms by 2030. The EU NIS2 Directive, which became enforceable in October 2024, requires essential and important entities to implement measures addressing cryptographic risks as part of their information security management obligations. A CBOM is the foundational document for demonstrating that an organisation knows where vulnerable algorithms exist before it can credibly claim to be managing the migration risk.",
        },
        {
          heading: "How the Tool Classifies Each Algorithm Against NIST FIPS 203, 204, and 205",
          body: "The tool processes your component list and maps each identified cryptographic algorithm to one of four classification tiers. Quantum-Safe algorithms are those standardised or approved by NIST for post-quantum use: ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205), and AES-256 in symmetric contexts, which retains its security margin against quantum attacks due to Grover's algorithm only halving effective key size. Quantum-Vulnerable algorithms are those whose security relies on the integer factorisation or discrete logarithm problems that Shor's algorithm solves in polynomial time on a cryptographically relevant quantum computer: RSA at all key sizes, ECDH, ECDSA, and finite-field Diffie-Hellman. These are classified as requiring migration before the 2030 deprecation target. Hybrid algorithms — combinations of a classical and a post-quantum primitive in the same operation — are classified as Transitional, providing quantum resistance while maintaining backwards compatibility during the migration window. Unknown or unrecognised algorithm strings are flagged for manual review rather than assigned a classification, because misclassifying an algorithm is more dangerous than leaving it flagged. The output follows the CycloneDX v1.6 CBOM schema, which is the OASIS standard format for cryptographic inventory exchange and is accepted by compliance frameworks including FedRAMP and the US National Cybersecurity Strategy implementation guidance.",
        },
        {
          heading: "The Harvest Now, Decrypt Later Threat and Why Migration Cannot Wait Until Quantum Computers Arrive",
          body: "Harvest Now, Decrypt Later is an active threat strategy in which adversaries intercept and store encrypted network traffic today with the intention of decrypting it retrospectively once a cryptographically relevant quantum computer becomes available. This makes the post-quantum migration timeline a present-day risk rather than a future one. Data encrypted today with RSA-2048 or ECDH will remain ciphertext until a sufficiently powerful quantum computer exists — estimates for cryptographically relevant quantum computers range from 2030 to 2040 from NIST, NSC, and UK NCSC threat assessments. But for data with a long confidentiality requirement — medical records with multi-decade retention, intellectual property, national security communications, long-term financial contracts — the data must be protected with quantum-resistant algorithms now, because by the time a quantum computer exists it will be too late to re-encrypt already-harvested ciphertext. The intelligence community has assessed that nation-state adversaries are already conducting Harvest Now, Decrypt Later collection against high-value targets. NIST's timeline recommendation is that organisations with data sensitivity horizons beyond 2030 should begin migration to FIPS 203 key encapsulation immediately for data in transit. A CBOM is the prerequisite — you cannot prioritise migration of the highest-risk data flows without first knowing which of your systems use RSA or ECDH for data with long confidentiality requirements.",
        },
      ],
    },
    faqs: [
      {
        question: "What is the difference between ML-KEM, ML-DSA, and SLH-DSA?",
        answer:
          "ML-KEM (FIPS 203) is a key encapsulation mechanism — it establishes a shared secret between two parties and replaces RSA and ECDH in key exchange and TLS handshake contexts. ML-DSA (FIPS 204) is a digital signature algorithm — it replaces ECDSA and RSA signatures for authentication, code signing, and certificate issuance. SLH-DSA (FIPS 205) is a stateless hash-based signature scheme — it provides a conservative signature alternative whose security relies only on hash function properties rather than lattice mathematics, making it suitable for long-lived signatures such as firmware signing where the verification infrastructure may outlast the algorithm's operational period. All three are standardised for immediate use. ML-KEM is the most urgently needed because it addresses Harvest Now, Decrypt Later for data in transit.",
      },
      {
        question: "Does AES-256 need to be replaced for post-quantum security?",
        answer:
          "No. Symmetric encryption algorithms including AES are affected by Grover's algorithm, which provides a quadratic speedup for brute-force key search — effectively halving the security level. AES-128 provides 64-bit effective security against a quantum adversary, which is insufficient. AES-256 provides 128-bit effective security against a quantum adversary, which NIST considers adequate. AES-256 does not require replacement and is classified as Quantum-Safe by this tool. If your system uses AES-128, migration to AES-256 is recommended as part of the post-quantum remediation programme.",
      },
      {
        question: "What is CycloneDX v1.6 and why is it the output format?",
        answer:
          "CycloneDX is an OASIS open standard for bill of materials documents covering software, hardware, and cryptographic components. Version 1.6 introduced the cryptographic asset component type, allowing CBOM data — algorithm name, key size, protocol context, and certificate metadata — to be expressed in a machine-readable format that integrates with SBOM tooling, vulnerability scanners, and compliance automation platforms. Using CycloneDX v1.6 output means your CBOM can be ingested by tools like OWASP Dependency Track, accepted by FedRAMP automated assessment platforms, and cross-referenced with the NIST National Vulnerability Database for cryptographic weakness identifiers (CWE-327 and related entries).",
      },
      {
        question: "When must RSA and ECDH be deprecated under US federal guidance?",
        answer:
          "NIST IR 8547 (initial public draft, 2024) and NSA CNSA 2.0 guidance specify that RSA and ECDH must not be used in new systems after 2026 and must be fully replaced in existing systems by 2030 for most federal and defence applications. CNSA 2.0 specifically mandates ML-KEM for key establishment and ML-DSA for authentication in national security systems with immediate effect for new acquisitions. For commercial organisations outside the federal context, there is no single mandated deadline, but NIST's general guidance is that organisations should target completion of migration for internet-facing systems before 2030 given the Harvest Now, Decrypt Later threat.",
      },
      {
        question: "What should I do with algorithms flagged as Unknown by this tool?",
        answer:
          "Unknown flags indicate algorithm strings the tool did not recognise — either because of non-standard naming conventions, proprietary algorithm identifiers, or abbreviated references without version context. For each Unknown entry: first, resolve the full algorithm name from the component's documentation or source code. Second, determine whether it maps to a known NIST-evaluated algorithm or a proprietary primitive. Third, if proprietary, obtain the vendor's post-quantum roadmap and security assessment. Unknown entries should not be left unresolved in a CBOM submitted for compliance purposes — regulators and auditors treat unclassified cryptographic assets as an inventory gap rather than a low-risk finding.",
      },
      {
        question: "Is a hybrid classical-plus-post-quantum approach sufficient for compliance?",
        answer:
          "Hybrid key exchange — combining X25519 with ML-KEM-768, for example — is the IETF-recommended transition approach and is supported in TLS 1.3 via RFC 8446 extension mechanisms. NIST considers hybrid schemes acceptable during the transition period and they satisfy NIS2 risk management obligations for data in transit. However, hybrid approaches add handshake overhead and increase implementation complexity, and they are a transitional measure rather than a final state. Systems using hybrid schemes should have a documented timeline for completing migration to pure post-quantum algorithms. This tool classifies hybrid implementations as Transitional rather than Quantum-Safe for this reason.",
      },
      {
        question: "How does this tool differ from running a dependency scanner like Dependabot or Snyk?",
        answer:
          "Dependabot and Snyk identify outdated or CVE-affected library versions — they flag that your OpenSSL version has a known vulnerability, for example, but they do not tell you which cryptographic algorithms your application is invoking through that library or whether those algorithms are quantum-vulnerable. A CBOM analysis operates at the algorithm layer rather than the library version layer. It answers: even if your OpenSSL is fully patched, are you calling RSA-2048 key exchange through it? That question requires either static analysis of cryptographic API calls or a structured manual inventory — which is what this tool is designed to support.",
      },
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
    toolGuide: {
      sections: [
        {
          heading: "Why Blackwell Changes the PUE Calculation Compared to Previous GPU Generations",
          body: "PUE — Power Usage Effectiveness — has been the standard data centre efficiency metric since The Green Grid introduced it in 2007. For prior GPU generations including Hopper (H100) and Ampere (A100), the PUE calculation was straightforward: compute racks draw a predictable amount of power, and the facility overhead — cooling, power distribution losses, lighting — adds a multiplier on top of that IT load. A typical hyperscale facility running H100 clusters achieves PUE of 1.2 to 1.4 with precision air cooling. Blackwell changes this because the B200 GPU and GB200 NVL72 rack system have thermal design power figures that air cooling cannot handle at sustained load. The B200 SXM5 has a TDP of 1,000 watts per GPU. An NVL72 rack containing 72 B200 GPUs has a rack-level TDP of approximately 120 kilowatts — above the structural limit of standard raised-floor air cooling, which is typically rated at 15 to 30 kilowatts per rack. NVIDIA's NVL72 reference architecture requires direct liquid cooling to the rack manifold, with NVLink switch cooling also water-assisted. This means Blackwell deployments are not choosing between air and liquid cooling as equivalent options — they are working within a liquid-cooled architecture by default and choosing between different facility cooling plant configurations. PUE for Blackwell clusters is therefore a question of cooling plant efficiency: how efficiently does the facility's water cooling infrastructure — chillers, cooling towers, fluid distribution units, and heat rejection systems — convert the removed heat into facility overhead power draw.",
        },
        {
          heading: "What PUE, kWh, and CO2 the Tool Calculates and Where the Inputs Come From",
          body: "The tool models three outputs from four inputs: rack count, IT load per rack in kilowatts, facility PUE, and regional electricity carbon intensity. IT load per rack is your measured or vendor-specified draw under sustained training workloads — the NVL72 reference is 120 kilowatts at full load, but throttled or inference-only deployments will be lower. PUE is your facility's actual or target PUE, which you can enter from your cooling plant vendor specifications or from measured facility PUE data if your data centre metering provides it. The tool calculates total facility power as IT load times rack count times PUE, annual kWh as total facility power in kilowatts times 8,760 hours, and annual CO2 emissions as annual kWh times the carbon intensity of your regional grid in kilograms per kWh. Regional presets use published grid average carbon intensity figures from IEA World Energy Outlook and EIA data: US average is approximately 0.386 kg CO2 per kWh, EU average is approximately 0.233 kg CO2 per kWh, and the tool includes region-specific presets for high-renewable grids (Nordic countries at approximately 0.027 kg CO2 per kWh) and carbon-intensive grids (Southeast Asia coal-heavy regions at approximately 0.55 to 0.70 kg CO2 per kWh). The CO2 output is relevant for TCFD climate disclosure, corporate net-zero commitments, and EU CSRD sustainability reporting, which increasingly require Scope 2 emissions from data centre operations to be disclosed at facility level.",
        },
        {
          heading: "Worked Example: 10-Rack NVL72 Cluster in Northern Virginia",
          body: "Northern Virginia is the world's largest data centre market and the default location for many US hyperscale GPU deployments. Consider a 10-rack NVL72 Blackwell cluster. Each rack draws 120 kilowatts at sustained training load, giving a total IT load of 1,200 kilowatts. A modern liquid-cooled facility in the Northern Virginia market achieves PUE of 1.15 to 1.20 — this is achievable with a chilled water plant optimised for the local climate, which has moderate temperatures for approximately 7 months of the year allowing economiser operation. At PUE 1.18, total facility power is 1,200 times 1.18 equals 1,416 kilowatts. Annual energy consumption is 1,416 times 8,760 equals 12,404,160 kilowatt-hours, or approximately 12.4 million kWh per year. The US average grid carbon intensity for the PJM interconnect serving Northern Virginia is approximately 0.35 kg CO2 per kWh. Annual CO2 emissions are 12.4 million times 0.35 equals approximately 4,340 tonnes of CO2 equivalent per year for this cluster. For comparison, the same 10 racks in a Nordic facility using hydroelectric power at 0.027 kg CO2 per kWh would produce approximately 335 tonnes CO2 equivalent annually — a 13-fold reduction in emissions footprint from the same hardware running the same workloads, purely from grid carbon intensity difference.",
        },
      ],
    },
    faqs: [
      {
        question: "What is the thermal design power of the NVIDIA B200 and NVL72?",
        answer:
          "The NVIDIA B200 SXM5 GPU has a thermal design power of approximately 1,000 watts per GPU under sustained compute load. The GB200 NVL72 rack unit — containing 36 Grace CPUs and 72 B200 GPUs connected by NVLink — has a rack-level TDP of approximately 120 kilowatts including the NVLink switch fabric and supporting infrastructure. This figure assumes sustained AI training workload at maximum utilisation. Inference workloads at lower batch sizes produce lower actual power draw, typically 60 to 80 percent of TDP. NVIDIA publishes thermal and power specifications in the NVL72 system datasheet and Data Center Design Guide, which should be used for facility planning rather than estimates.",
      },
      {
        question: "Can Blackwell GPU clusters be deployed with air cooling?",
        answer:
          "Not at full rack density. The NVL72 form factor at 120 kilowatts per rack exceeds the structural cooling capacity of conventional raised-floor precision air cooling, which is rated at 15 to 30 kilowatts per rack in standard configurations and up to 40 to 50 kilowatts per rack in high-density air configurations with in-row cooling. Air cooling is used for the residual heat — approximately 10 to 15 percent of total rack power — that direct liquid cooling does not capture. The NVLink switch and some peripheral components in the NVL72 are air-cooled. Full deployment of Blackwell at reference density requires a facility with a chilled water plant and in-rack liquid cooling manifolds capable of handling the 120 kilowatt per rack primary load.",
      },
      {
        question: "What PUE is achievable for a Blackwell liquid-cooled data centre?",
        answer:
          "State-of-the-art liquid-cooled AI data centres built for Blackwell-class density are reporting design PUE targets of 1.10 to 1.20. The lower bound of 1.10 requires near-ideal conditions: a cool climate allowing free cooling or economiser operation for most of the year, a high-efficiency chilled water plant with variable-speed drives, and minimal power distribution losses from high-voltage DC or 415V three-phase distribution. A more typical achievable PUE for a well-designed facility in a temperate climate is 1.15. Facilities in warmer climates without access to economiser cooling will typically achieve 1.20 to 1.30. PUE below 1.10 is possible only with waste heat reuse — for example, district heating connections — that converts removed heat into useful output counted against the facility overhead.",
      },
      {
        question: "Why does grid carbon intensity vary so much between regions and why does it matter?",
        answer:
          "Grid carbon intensity reflects the mix of generation sources on the electricity grid — coal, gas, nuclear, hydro, wind, solar — weighted by their CO2 emissions per kWh generated. Nordic grids dominated by hydroelectric power have intensities below 0.03 kg CO2 per kWh. French grids dominated by nuclear power are approximately 0.05 kg CO2 per kWh. US grids average 0.35 to 0.45 kg CO2 per kWh depending on the regional interconnect, with coal-heavy southeastern grids above 0.45 and California below 0.25. For AI infrastructure sustainability reporting under TCFD and EU CSRD, the location of GPU clusters is a primary determinant of Scope 2 emissions — the same training workload produces 10 to 20 times more CO2 in a coal-heavy grid region than in a renewable-heavy one. This is why several major AI labs have announced GPU deployments in Nordic countries specifically to reduce the carbon footprint of training runs.",
      },
      {
        question: "What is the difference between market-based and location-based Scope 2 accounting for data centres?",
        answer:
          "Location-based Scope 2 accounting uses the average grid carbon intensity for the region where electricity is consumed — the approach this tool uses by default. Market-based accounting allows organisations to subtract the carbon intensity of renewable energy certificates (RECs) or power purchase agreements (PPAs) purchased from specific renewable generators, potentially reducing reported Scope 2 emissions to near zero if 100 percent renewable PPAs are in place. Under GHG Protocol Corporate Standard and TCFD guidance, both methods must be disclosed. For data centre operators with large renewable PPA portfolios — Google, Microsoft, Amazon — market-based Scope 2 can be significantly lower than location-based. The tool calculates location-based emissions, which is the baseline figure required for disclosure before any PPA credits are applied.",
      },
      {
        question: "How do I use this tool's output for CSRD or TCFD sustainability reporting?",
        answer:
          "The EU Corporate Sustainability Reporting Directive (CSRD) and TCFD recommendations both require disclosure of Scope 1 and Scope 2 greenhouse gas emissions. For data centre operators, Scope 2 emissions from purchased electricity are typically the dominant source. This tool produces the annual kWh consumption and annual CO2 equivalent figure needed to populate the Scope 2 location-based emissions line in a GHG Protocol-aligned disclosure. The inputs — rack count, IT load, PUE, and grid intensity — should be documented as methodology assumptions in the disclosure. For CSRD specifically, the European Sustainability Reporting Standard ESRS E1 requires disclosure of energy intensity metrics including kWh per unit of output and total energy consumption by source, making the kWh output of this tool directly relevant to the mandatory reporting template.",
      },
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
    toolGuide: {
      sections: [
        {
          heading: "The Six-Phase Migration Model and What Drives Each Timeline",
          body: "Post-quantum cryptography migration is not a single event but a structured programme that NIST, NSA, and the UK NCSC have all modelled as a multi-phase effort spanning several years. The six phases this tool models reflect the actual sequencing recommended in NIST IR 8547 and NSA CNSA 2.0 implementation guidance. Phase 1 is cryptographic discovery — building the CBOM inventory that identifies where RSA, ECDH, ECDSA, and finite-field DH appear across your systems, libraries, certificates, and protocols. This phase cannot be compressed below its natural duration because it depends on crawling dependencies, analysing API call patterns, and engaging system owners — typically two to six weeks for a well-staffed team with existing SBOM tooling, and three to six months for organisations starting from an undocumented codebase. Phase 2 is risk prioritisation — ranking discovered assets by confidentiality horizon and exposure. Internet-facing TLS endpoints with RSA key exchange and systems handling data with multi-year sensitivity requirements are highest priority. Phase 3 is algorithm selection and library qualification — confirming which NIST-approved library versions (OpenSSL 3.2 and later with oqs-provider, BouncyCastle 1.78 and later, AWS-LC, Microsoft SymCrypt) are available for your platforms and passing your security evaluation process. Phase 4 is parallel deployment — running hybrid classical-plus-post-quantum configurations in production alongside existing infrastructure to validate interoperability before cutover. Phase 5 is cutover — replacing classical-only configurations with post-quantum or hybrid configurations and updating certificates. Phase 6 is decommission and audit — retiring legacy algorithm configurations and documenting completion for compliance evidence.",
        },
        {
          heading: "How FTE Count and Asset Volume Drive the Timeline Calculation",
          body: "The tool uses your FTE count and total cryptographic asset count to estimate phase duration. These two inputs interact because discovery and remediation are fundamentally labour-constrained activities. A single cryptography-competent engineer can inventory and assess approximately 20 to 40 systems per week depending on documentation quality, or remediate one to three systems per week depending on complexity and testing requirements. The tool applies these productivity estimates against your asset count and FTE input to produce phase-level week estimates. There is also a minimum duration floor on each phase that reflects coordination overhead — even with unlimited engineers, discovery cannot complete in under two weeks because it requires gathering inputs from system owners, running automated scanning passes, and validating results. The risk distribution slider shifts the timeline weight between phases: a high-risk distribution indicates many internet-facing or high-sensitivity assets, which front-loads discovery and qualification effort; a low-risk distribution indicates mostly internal systems with short data lifetimes, which allows a more gradual phasing. The 2030 deadline bar on the output is set to the NIST IR 8547 target date for completing RSA and ECDH retirement in internet-facing systems.",
        },
        {
          heading: "Worked Example: Mid-Sized Financial Services Firm",
          body: "Consider a financial services organisation with 4 FTE assigned to the PQC migration programme, 180 cryptographic assets identified in an initial CBOM scan, and a high-risk distribution reflecting significant internet-facing TLS infrastructure and regulatory data retention requirements of 7 to 10 years. Phase 1 discovery at 4 FTE scanning 180 assets takes approximately 6 weeks — asset volume divided by per-FTE throughput of 30 assets per week times 4 FTE, plus coordination overhead. Phase 2 risk prioritisation takes 3 weeks with 4 FTE to classify and stack-rank 180 assets, identify the 40 percent flagged as highest priority, and document the prioritisation rationale for regulatory evidence. Phase 3 library qualification takes 8 weeks — testing FIPS 203 library integration in the organisation's CI pipeline, completing internal security review of the oqs-provider or equivalent, and obtaining sign-off. Phase 4 parallel deployment of the highest-priority 72 assets at a remediation rate of 2 assets per FTE per week takes 9 weeks. Phase 5 cutover for 72 high-priority assets takes 4 weeks, including certificate replacement, monitoring, and validation. Phase 6 decommission and audit takes 3 weeks. Total for the first cohort: approximately 33 weeks. The remaining 108 assets would follow in a second cohort after the first is confirmed stable, completing the full migration in 60 to 70 weeks — well within the 2030 window if the programme begins no later than Q1 2027.",
        },
      ],
    },
    faqs: [
      {
        question: "What is the NIST FIPS 203 standard and what algorithm does it standardise?",
        answer:
          "NIST FIPS 203, finalised in August 2024, standardises ML-KEM — Module Lattice Key Encapsulation Mechanism — as the primary post-quantum key establishment algorithm for federal and commercial use. ML-KEM is derived from the CRYSTALS-Kyber submission to the NIST PQC standardisation process and operates on the hardness of the Module Learning With Errors problem, which has no known efficient quantum algorithm solution. ML-KEM replaces RSA and ECDH in key encapsulation and TLS handshake contexts. Three parameter sets are standardised: ML-KEM-512 targeting 128-bit quantum security, ML-KEM-768 targeting 192-bit quantum security, and ML-KEM-1024 targeting 256-bit quantum security. NIST recommends ML-KEM-768 as the general-purpose choice balancing security margin and performance.",
      },
      {
        question: "What is the difference between FIPS 203, FIPS 204, and FIPS 205?",
        answer:
          "FIPS 203 (ML-KEM) is for key encapsulation — establishing shared secrets for symmetric encryption. FIPS 204 (ML-DSA, from CRYSTALS-Dilithium) is for digital signatures — authentication, code signing, and certificate issuance. FIPS 205 (SLH-DSA, from SPHINCS+) is a stateless hash-based signature scheme providing a conservative alternative to ML-DSA for high-assurance or long-lifetime signature contexts. Most migration programmes begin with FIPS 203 for data in transit because Harvest Now, Decrypt Later attacks target key exchange, then proceed to FIPS 204 for certificate and signature infrastructure. FIPS 205 is typically reserved for firmware signing and other contexts where the signature must remain verifiable over very long periods.",
      },
      {
        question: "What does NSA CNSA 2.0 require and who does it apply to?",
        answer:
          "NSA CNSA 2.0 (Commercial National Security Algorithm Suite 2.0) specifies the cryptographic algorithms required for protecting National Security Systems — US government systems processing classified information and systems used by defence contractors. It mandates ML-KEM for key establishment, ML-DSA for digital signatures, and AES-256 for symmetric encryption, with RSA and ECDH prohibited in new NSS acquisitions immediately and required to be retired from existing systems by 2030. For non-NSS commercial organisations, CNSA 2.0 is not legally binding but represents the benchmark that US federal procurement contracts are beginning to reference, and it aligns with NIST IR 8547 guidance for non-classified systems.",
      },
      {
        question: "How long does a realistic PQC migration programme take for a large enterprise?",
        answer:
          "Published case studies and NIST guidance suggest 3 to 5 years for large enterprises with complex, heterogeneous infrastructure. The primary constraints are discovery completeness — many organisations have cryptographic assets in legacy systems, third-party integrations, and embedded devices that are not surfaced by automated scanning — and vendor readiness, because migrating a system often depends on library or firmware updates from a third-party vendor who is on their own PQC timeline. The 2030 NIST deprecation target for internet-facing systems is achievable for organisations that begin discovery by 2025 to 2026 and have dedicated programme resource. Organisations beginning after 2027 face significant schedule pressure for the 2030 target.",
      },
      {
        question: "Which systems should be migrated first under a risk-prioritised approach?",
        answer:
          "NIST IR 8547 and NSA guidance both recommend prioritising systems in this order: first, long-term data stores where data has confidentiality requirements extending beyond 2030, because Harvest Now, Decrypt Later makes these assets at risk today; second, internet-facing TLS endpoints with RSA or ECDH key exchange, because these are the most accessible targets for harvest attacks; third, certificate infrastructure including internal CAs and code signing systems, because certificate lifetimes and chain dependencies make migration complex; fourth, internal system-to-system communication; and finally, embedded and constrained-device systems, which typically require firmware updates and have the longest vendor dependency chains.",
      },
      {
        question: "Is TLS 1.3 already post-quantum resistant?",
        answer:
          "No. TLS 1.3 standardises ECDHE for key exchange, which is quantum-vulnerable. However, TLS 1.3 supports hybrid key exchange through the supported_groups extension, and RFC 8446 permits negotiation of post-quantum or hybrid key exchange groups. Browser vendors including Google and Cloudflare have deployed X25519Kyber768 — a hybrid combining X25519 and ML-KEM-768 — in production TLS. For an organisation to benefit from post-quantum TLS, both the server and client must support a hybrid or pure post-quantum group, and the server-side TLS library must be updated to a version that includes ML-KEM support (OpenSSL 3.2 with oqs-provider, or BouncyCastle 1.78 and later).",
      },
      {
        question: "What evidence do regulators expect organisations to produce for PQC compliance?",
        answer:
          "NIS2 Directive implementation across EU member states is beginning to incorporate post-quantum migration expectations into technical measure assessments under Article 21. UK NCSC guidance explicitly recommends CBOM production and a documented migration plan as evidence of managing cryptographic risks. For US federal suppliers, FedRAMP is expected to incorporate FIPS 203 requirements into its control baselines. The minimum evidence package regulators and auditors are converging on includes: a completed CBOM documenting all cryptographic assets, a risk-prioritised migration roadmap with target completion dates, evidence of test deployments for highest-priority systems, and a vendor readiness register tracking third-party migration commitments. This tool's output — the phased timeline — forms the migration roadmap component of that evidence package.",
      },
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
    toolGuide: {
      sections: [
        {
          heading: "Why Scope 1, 2, and 3 Mean Something Different for SaaS Companies Than for Industrial Emitters",
          body: "The GHG Protocol Corporate Standard defines three emission scopes, but their relative significance varies dramatically by industry. For a cement manufacturer, Scope 1 — direct combustion emissions from kilns — dominates. For a SaaS company, Scope 1 is typically negligible: unless you operate your own diesel generators or gas-heated offices, you have almost no direct combustion. Your emissions profile is dominated by Scope 2 (purchased electricity for offices and owned data centres) and Scope 3 (cloud infrastructure operated by third parties, employee business travel, commuting, and purchased goods and services). For a typical SaaS company using major cloud providers, Scope 3 Category 1 (purchased services, specifically cloud compute and storage) accounts for 60 to 90 percent of total emissions footprint — a figure that most generic carbon calculators either ignore or treat as optional. The ISSB IFRS S2 standard, which became effective for reporting periods beginning January 2024, and the EU CSRD with mandatory ESRS E1 reporting, both require Scope 3 disclosure for companies above the reporting threshold. The shift from voluntary to mandatory Scope 3 reporting means SaaS companies can no longer report only their office electricity as their carbon footprint. This tool is designed around the SaaS emissions structure specifically: cloud compute as the primary Scope 3 source, travel as the secondary Scope 3 source, and office energy as the Scope 2 source, rather than the industrial-process structure that most enterprise carbon accounting tools assume.",
        },
        {
          heading: "How Cloud vCPU Hours Map to CO2 Emissions",
          body: "Cloud providers do not directly report per-customer emissions in real time, but the methodology for estimating them from usage data is established in GHG Protocol Scope 3 Technical Guidance and the Cloud Carbon Footprint open-source methodology. The calculation has three components: first, the energy consumed by your compute resources, estimated as vCPU count times utilisation rate times the server power usage per vCPU (typically 2 to 10 watts per vCPU depending on instance type and workload characteristics); second, a PUE multiplier for the data centre overhead, which for hyperscale providers is typically 1.10 to 1.20; and third, the carbon intensity of the electricity grid in the region where your cloud region is located. AWS publishes regional carbon intensity figures in its Customer Carbon Footprint Tool. Google Cloud publishes carbon-free energy percentages by region and net carbon intensity after renewable purchases. Microsoft Azure publishes Scope 1 and 2 emissions for its data centre portfolio. This tool uses representative regional emission factors derived from IEA grid data and publicly available cloud provider disclosures. The output — kilograms of CO2 equivalent per year from cloud usage — is a Category 1 Scope 3 purchased services emission and must be disclosed under IFRS S2 and ESRS E1 when the company meets the reporting threshold.",
        },
        {
          heading: "Worked Example: 50-Person SaaS Company Preparing Its First ISSB Report",
          body: "Consider a 50-person SaaS company based in London running its production infrastructure on AWS eu-west-1 (Ireland) and using a leased office in central London. Cloud usage: 200 vCPUs at 40 percent average utilisation running continuously. Estimated server power per vCPU at that utilisation level is approximately 4 watts. Total server power draw: 200 times 0.4 times 4 equals 320 watts, or 0.32 kW. With a data centre PUE of 1.12 (AWS Ireland achieves approximately 1.10 to 1.14): 0.32 times 1.12 equals 0.358 kW of total facility power for this workload. Annual energy: 0.358 times 8,760 equals 3,136 kWh. Ireland grid carbon intensity is approximately 0.295 kg CO2 per kWh (IEA 2023 data). Annual cloud Scope 3 emissions: 3,136 times 0.295 equals approximately 925 kg CO2e — just under one tonne. Office Scope 2: a 50-person London office consuming approximately 50,000 kWh per year at the UK grid intensity of 0.207 kg CO2 per kWh produces approximately 10,350 kg CO2e annually. Business travel Scope 3: 50 employees averaging 3 return long-haul flights per year at approximately 1,200 kg CO2e per return long-haul flight gives 50 times 3 times 1,200 equals 180,000 kg CO2e. In this profile, business travel — not cloud infrastructure — is the dominant emission source at 93 percent of the total. The practical implication is that flight reduction programmes deliver more emissions reduction per pound of effort than cloud efficiency optimisation for this company size and travel intensity.",
        },
      ],
    },
    faqs: [
      {
        question: "What is the difference between TCFD, ISSB IFRS S2, and EU CSRD for emissions disclosure?",
        answer:
          "TCFD (Task Force on Climate-related Financial Disclosures) is a voluntary framework that became the basis for regulatory requirements globally. ISSB IFRS S2 is the International Sustainability Standards Board's climate disclosure standard, effective for reporting periods from January 2024, adopted as mandatory by the UK, Australia, Singapore, and other jurisdictions with more adopting in 2025 and 2026. It requires Scope 1, 2, and 3 emissions disclosure for companies meeting the reporting threshold, which for IFRS S2 is companies already subject to IFRS financial reporting. EU CSRD with ESRS E1 applies to large EU-listed companies and large companies operating in the EU above defined revenue, balance sheet, and employee thresholds — approximately 50,000 companies in scope by 2025. ESRS E1 requires gross Scope 1, 2, and 3 disclosure alongside intensity metrics and net-zero target disclosure. All three frameworks reference the GHG Protocol Corporate Standard as the calculation methodology. If your company is subject to ISSB or CSRD, TCFD compliance is automatically achieved as TCFD is a subset of both.",
      },
      {
        question: "Which Scope 3 categories are most relevant for a SaaS company?",
        answer:
          "GHG Protocol defines 15 Scope 3 categories. For SaaS and tech companies the material ones are: Category 1 (purchased goods and services) — cloud compute, SaaS subscriptions used as inputs, and professional services; Category 6 (business travel) — flights, hotels, and ground transport for employees; Category 7 (employee commuting) — daily travel to office locations; and Category 11 (use of sold products) — the energy consumed by customers using your software, which is relevant if your product runs on customer hardware rather than cloud infrastructure you control. Categories 2 through 5 and 8 through 15 are typically immaterial for asset-light SaaS businesses with no manufacturing, physical distribution, or significant capital goods. ESRS E1 requires disclosure of all material Scope 3 categories with an explanation of why immaterial categories were excluded.",
      },
      {
        question: "How do I get actual cloud carbon data rather than an estimate?",
        answer:
          "AWS provides the Customer Carbon Footprint Tool in the Billing console, which reports monthly Scope 1, 2, and 3 emissions from your AWS usage using AWS's internal emissions factors. Google Cloud provides Carbon Footprint reporting in the Cloud Console. Microsoft Azure provides the Emissions Impact Dashboard in the Azure portal. These tools produce more accurate figures than manual estimation because they apply instance-type-specific power models and actual regional grid data. The tool you are using now is designed for initial estimates and scenario modelling when you do not have console access or are evaluating cloud region choices before committing infrastructure. For formal disclosure, use the cloud provider's own reporting tool and cite it as the data source in your methodology notes.",
      },
      {
        question: "What carbon intensity figure should I use for cloud compute in my disclosure?",
        answer:
          "For location-based Scope 3 accounting — required as the baseline under GHG Protocol and ESRS E1 — use the grid average carbon intensity for the region where your cloud infrastructure runs, sourced from IEA or your national grid operator's published figures. For market-based accounting — which allows you to subtract renewable energy certificates purchased by your cloud provider — use the residual mix intensity published by your cloud provider in its sustainability report or the Carbon Disclosure Project submission. AWS, Google, and Microsoft all publish market-based intensity figures reflecting their renewable purchase agreements. The difference can be significant: AWS us-east-1 on a location basis is approximately 0.35 kg CO2 per kWh; on a market basis, after Amazon's renewable purchases, it may be closer to 0.10 kg CO2 per kWh. Both figures must be disclosed under ESRS E1 — you cannot report only the market-based figure.",
      },
      {
        question: "Does employee commuting need to be included in the carbon footprint?",
        answer:
          "Under GHG Protocol Scope 3 Category 7 and ESRS E1, employee commuting is a required disclosure category if material. For remote-first SaaS companies with small office footprints, commuting may be immaterial relative to business travel and cloud emissions and can be excluded with documented justification. For companies with large office-based workforces, commuting can be a significant source — a 200-person team commuting by car in a car-dependent city may generate more emissions than all cloud infrastructure. The standard approach for commuting estimation is a workforce survey asking employees for their primary commute mode and distance, which you then multiply by modal emission factors from DEFRA (for UK reporting) or EPA (for US reporting). This tool provides a simplified commuting estimate based on office headcount and an average commute assumption that you can adjust.",
      },
      {
        question: "What is the reporting threshold for CSRD and ISSB that determines whether my company must disclose?",
        answer:
          "EU CSRD applies in phases. From financial year 2024, it applies to large EU public-interest entities already subject to NFRD. From financial year 2025, it applies to large companies meeting two of three thresholds: more than 250 employees, more than 40 million euros in net turnover, or more than 20 million euros on the balance sheet. From financial year 2026, it applies to listed SMEs. Non-EU companies with EU net turnover above 150 million euros and at least one large EU subsidiary or branch are in scope from financial year 2028. ISSB IFRS S2 applies based on the local jurisdiction's adoption — UK large and listed companies are subject from 2025, with proportionality provisions for smaller companies. If you are below all CSRD thresholds and not in an IFRS S2 jurisdiction, voluntary disclosure aligned with TCFD remains best practice and is increasingly required by enterprise customers in procurement questionnaires and by lenders in ESG-linked financing.",
      },
      {
        question: "How does this tool's output connect to a net-zero target or science-based target?",
        answer:
          "The Science Based Targets initiative (SBTi) Corporate Standard requires companies to set emissions reduction targets consistent with 1.5 degrees Celsius warming pathways and covering all material Scope 1, 2, and 3 categories. A validated SBTi target requires a baseline year emissions inventory — which this tool helps you produce — and a reduction target expressed as a percentage reduction from that baseline by a target year, with interim milestones. The SBTi Corporate Net-Zero Standard additionally requires achieving near-zero emissions and neutralising any residual emissions with permanent carbon removal (not offsets) by 2050. The first step in any net-zero programme is establishing the baseline inventory. This tool's output — total Scope 1, 2, and 3 CO2 equivalent per year broken down by source — is the input to the SBTi target-setting process and the baseline year figure that will be cited in your net-zero commitment disclosure.",
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
    toolGuide: {
      sections: [
        {
          heading: "Crypto-Agility Is Not the Same as Post-Quantum Migration",
          body: "Post-quantum migration is a specific remediation effort — replacing RSA and ECDH with NIST FIPS 203 and 204 algorithms before the 2030 deprecation window. Crypto-agility is the organisational capability that makes that migration, and every future algorithm transition, possible without rebuilding systems from scratch. An organisation with high crypto-agility has a complete cryptographic inventory, has abstracted algorithm selection behind configurable interfaces rather than hardcoding primitives, maintains key management infrastructure that can rotate algorithms without application changes, tests algorithm swap operations as part of regular security assurance, and has governance processes that keep cryptographic policy current with emerging threats. An organisation with low crypto-agility may complete this specific PQC migration — but only by touching hundreds of individual codebases, negotiating with dozens of system owners, and rebuilding integrations that had cipher suites hardcoded into them. The cycle time and cost difference between high and low crypto-agility organisations becomes apparent every time NIST revises its algorithm recommendations. SHA-1 deprecation, MD5 retirement, and RC4 removal each required years of remediation effort in low-agility environments that took weeks in high-agility ones. The post-quantum transition is an order of magnitude larger than any of those. NIST SP 800-227 (initial public draft, 2024), titled Recommendations for Key Management, introduces crypto-agility as an explicit property that key management systems and cryptographic implementations should support, and frames it as distinct from but complementary to the PQC migration effort.",
        },
        {
          heading: "How the Five Dimensions Map to NIST SP 800-227 and CISA Guidance",
          body: "The five dimensions this tool assesses correspond directly to the capability areas described in NIST SP 800-227 and CISA's Post-Quantum Cryptography Initiative guidance. Cryptographic Inventory — weighted at 20 percent — measures whether your organisation maintains a current, complete CBOM documenting all algorithms, keys, and certificates across your systems. Without inventory, no other capability has a stable foundation to operate against. Algorithm Abstraction — weighted at 20 percent — measures whether cryptographic algorithm selection is configurable rather than hardcoded. High abstraction means an application can switch from RSA to ML-KEM by changing a configuration file or policy parameter; low abstraction means every consuming application must be individually modified. Key Management System maturity — weighted at 25 percent, the highest single weighting — measures whether your KMS supports algorithm-agnostic key lifecycle management. A crypto-agile KMS can issue, rotate, and retire keys of different algorithm types under a unified policy framework. KMS receives the highest weight because it is the most common bottleneck: organisations that have completed algorithm abstraction in their applications still face multi-year delays when their HSM or KMS vendor does not support the target algorithm. Crypto-Agility Testing — weighted at 15 percent — measures whether algorithm swap operations are tested as part of security assurance, not just functional testing. Governance and Policy — weighted at 20 percent — measures whether cryptographic standards, deprecation timelines, and exception processes are documented, communicated, and enforced rather than ad hoc.",
        },
        {
          heading: "What Each Maturity Level Means and Where Most Organisations Start",
          body: "Level 1 corresponds to ad hoc cryptographic management — no inventory, hardcoded algorithms, no KMS, no testing of algorithm transitions, and no documented policy. Cryptographic decisions are made by individual developers based on personal familiarity with libraries rather than organisational standards. Most organisations that have not initiated a formal cryptographic programme are at Level 1 or the lower boundary of Level 2. Level 2 indicates initial awareness — a partial CBOM exists, some systems use configurable cipher suites, KMS is present but not algorithm-agnostic, and there is a cryptographic policy document that may be out of date. Level 3 is defined — inventory is reasonably complete, abstraction is applied to new systems, KMS supports multi-algorithm operation, algorithm swap tests exist for critical paths, and policy is current and enforced. Level 3 represents the threshold at which an organisation can execute a structured PQC migration within a predictable timeframe rather than an open-ended engineering effort. Level 4 is managed — all five dimensions are systematically measured and improved, algorithm transitions are rehearsed through tabletop exercises, and KMS capabilities are verified against algorithm agility requirements as part of procurement. Level 5 is optimising — crypto-agility is embedded in the software development lifecycle, new systems are evaluated for algorithm agility as part of architecture review, and the organisation can execute algorithm migrations for internet-facing systems within weeks rather than months. Published CISA and NSA assessments suggest that most critical infrastructure operators are currently at Level 1 to 2, and that reaching Level 3 is the priority objective before the 2030 PQC deadline.",
        },
      ],
    },
    faqs: [
      {
        question: "What is NIST SP 800-227 and does it create compliance obligations?",
        answer:
          "NIST SP 800-227, Recommendations for Key Management, is a NIST Special Publication that introduces crypto-agility as an explicit design property for key management systems and cryptographic implementations. As of mid-2026 it remains in draft form following its initial public draft release in 2024. NIST Special Publications are not legally binding for commercial organisations but are incorporated by reference into US federal security requirements through FISMA and FedRAMP, meaning federal contractors and cloud service providers seeking FedRAMP authorisation should treat SP 800-227 recommendations as effectively mandatory. For non-federal commercial organisations, SP 800-227 represents the authoritative technical benchmark against which insurance underwriters and enterprise procurement security questionnaires are beginning to assess cryptographic risk management maturity.",
      },
      {
        question: "What is algorithm abstraction and why does it have a 20 percent weighting?",
        answer:
          "Algorithm abstraction is the practice of separating cryptographic algorithm selection from the code that uses cryptography. In a high-abstraction implementation, an application calls a cryptographic service interface that accepts a policy parameter specifying which algorithm to use — the application code itself does not contain algorithm names, key sizes, or cipher suite strings. In a low-abstraction implementation, algorithm choices are embedded as string literals or hardcoded constants throughout the codebase. Abstraction receives 20 percent weighting because it is the enabling condition for rapid migration: without abstraction, migrating from RSA-2048 to ML-KEM-768 requires finding and modifying every location in every application where RSA is referenced, which in a large codebase can number in the thousands. With abstraction, the same migration requires changing one configuration parameter.",
      },
      {
        question: "What does a crypto-agile KMS look like in practice?",
        answer:
          "A crypto-agile KMS supports key lifecycle management — generation, storage, rotation, and retirement — for multiple algorithm types under a unified policy framework, without requiring separate infrastructure for each algorithm. Practically this means: the KMS can generate and store ML-KEM keys alongside RSA keys and issue them to applications via the same API; key policies reference algorithm families rather than specific algorithm names so that policy updates propagate automatically when the algorithm is changed; and the KMS exposes a negotiation capability so that clients can request the strongest algorithm both parties support rather than requiring both sides to be updated simultaneously. AWS KMS, Azure Key Vault, and HashiCorp Vault are in various stages of adding FIPS 203 key type support. Hardware Security Modules from Thales and Utimaco have announced roadmaps for post-quantum algorithm support. HSM vendor readiness is often the critical path item for KMS maturity improvement.",
      },
      {
        question: "What does crypto-agility testing look like in a security assurance programme?",
        answer:
          "Crypto-agility testing verifies that an algorithm swap operation actually works end-to-end without application failures, performance regressions, or interoperability breaks. A basic test suite covers: changing the configured key exchange algorithm for a TLS service and verifying all clients successfully negotiate the new algorithm; rotating to a new signing algorithm for an internal CA and verifying that certificate chains validate correctly across all consuming services; and simulating an emergency algorithm deprecation by disabling a cipher suite and verifying that the system fails safely rather than silently downgrading to a weaker algorithm. Organisations at maturity Level 4 include these tests in their regular security regression suite and run them at least annually. Organisations at Level 5 run them as part of every infrastructure change pipeline that touches cryptographic configuration.",
      },
      {
        question: "How does the remediation roadmap from this tool relate to a formal PQC migration plan?",
        answer:
          "The remediation roadmap this tool generates identifies which of the five dimensions are below the threshold for your current maturity level and recommends capability improvements in priority order. It is a capability gap analysis rather than a migration plan. A formal PQC migration plan — as described in NIST IR 8547 guidance — covers the specific systems, algorithms, timelines, and resource requirements for replacing quantum-vulnerable cryptography. The two documents are complementary: improving crypto-agility maturity is a precondition for executing the PQC migration efficiently, and the maturity model output tells you which capability gaps will create the most friction in executing the migration plan.",
      },
      {
        question: "What is the most common bottleneck that prevents organisations from reaching Level 3?",
        answer:
          "The most consistently reported bottleneck across CISA sector assessments and NIST workshop feedback is KMS and HSM vendor readiness. Organisations that have invested in algorithm abstraction at the application layer and completed a CBOM inventory still cannot execute algorithm migrations when their hardware security modules do not support the target algorithm. HSM firmware updates for post-quantum algorithm support require vendor certification, regulatory approval for certain industries, and planned maintenance windows for production systems. The NIST PQC migration guidance explicitly identifies HSM readiness as a critical path dependency and recommends engaging HSM vendors for post-quantum roadmap commitments as an early programme action, before application-layer remediation begins.",
      },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(
  toolsRegistry.map((tool) => [tool.slug, tool])
);
