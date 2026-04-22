/**
 * EU AI Act Risk Level Classifier - Technical Documentation
 * Comprehensive guide for compliance professionals, product teams, and legal advisors
 * Reference: Regulation (EU) 2024/1689
 */

export const euAiActTechnicalDocumentation = `
## EU AI Act Risk Level Classifier: Technical Documentation

### 1. Compliance Requirements for High-Risk Systems (Annex III)

High-risk AI systems under Annex III of the EU AI Act require a comprehensive compliance framework to manage potential harms to fundamental rights and public safety. This section outlines the mandatory requirements that apply to systems classified as High-Risk by this classifier.

#### Risk Management System
Every High-Risk system must implement a documented risk management system per Article 9. This system must:
- Identify and evaluate foreseeable risks throughout the system lifecyclce (design, training, testing, deployment, monitoring)
- Document risk mitigation measures, including technical controls and human oversight
- Undergo continuous updates as new risks emerge or deployment contexts change
- Be available for audit by competent authorities and notified bodies

**Implementation Timeline:** Draft governance framework (weeks 1–2), implement technical logging (weeks 3–6), establish review cadence (week 7).

#### Technical Documentation
Article 11 requires providers to maintain comprehensive technical documentation including:
- **System Architecture:** Data flow diagrams, model inputs/outputs, integration points
- **Training Data Composition:** Data source provenance, quality metrics, bias audit results, exclusion criteria
- **Model Validation:** Accuracy metrics by demographic subgroup, false-positive/false-negative rates, confidence intervals
- **Quality Assurance:** Testing protocols, edge-case scenarios, adversarial robustness evaluations
- **Post-Market Surveillance Plan:** Monitoring approach, incident reporting procedures, corrective action protocols

Non-compliance with documentation requirements carries administrative fines up to €10 million or 2% of global annual turnover.

#### Bias Monitoring and Mitigation (Article 10)
High-Risk systems must implement measurable bias detection:
- Establish baseline performance metrics across protected characteristics (gender, age, race, disability status, where legally permitted)
- Implement continuous monitoring dashboards tracking performance drift
- Document instances where system output deviates unexpectedly from baseline
- Maintain actionable mitigation strategies (retraining, human override thresholds, user warning labels)

Example: An employment AI must track hiring recommendation acceptance rates by gender and ethnicity monthly, documenting any >5% deviation and corresponding remediation.

#### Human Oversight Requirements (Article 14)
For systems affecting consequential decisions (hiring, benefits, loan approval, justice), human oversight is mandatory:
- **Decision Override:** Humans must review system recommendations before execution; automated decisions without review are prohibited
- **Expertise:** Designated human reviewers must have domain knowledge and understand system limitations
- **Appeal Process:** End users affected by High-Risk decisions must have access to human review of adverse outcomes
- **Documentation:** Log all human decisions overriding system recommendations, with justifications

Average manual review adds 2–4 hours per decision for complex cases.

---

### 2. Prohibited Practices in the 2026 Enforcement Era (Article 5)

Three categories of AI use have been outright banned by the EU AI Act, effective August 1, 2026. Organizations deploying these practices must cease operations and comply with transition provisions.

#### Subliminal Manipulation and Behavioral Distortion
**Prohibition:** Algorithms designed to distort behavior by exploiting vulnerabilities, particularly targeting children or persons with disabilities.

**Real-World Examples:**
- Recommendation systems optimized solely for engagement ("dopamine hacking") without transparency
- Dark pattern interfaces that manipulate user decisions through design alone
- Content ranking that prioritizes emotional triggers over accuracy
- Personalization engines trained to exploit specific psychological vulnerabilities

**Compliance:** Organizations currently deploying such systems must (a) document all affected users; (b) notify affected individuals per GDPR Article 34 (breach notification); (c) implement transparency labels; (d) disable manipulative features by August 2026.

#### Social Scoring Systems
**Prohibition:** AI systems that assign social scores to individuals or groups based on behavior, personal characteristics, or social connections, used for decisions affecting their rights or access to services.

**Real-World Examples:**
- Credit scoring systems that penalize purchasing behavior (e.g., buying from specific vendors)
- Reputation systems combining online behavior, financial records, and social media activity
- Workplace scoring that rates productivity by analyzing email metadata, keystroke patterns, or chat sentiment
- Loan eligibility models incorporating social network analysis or relationship data

**Compliance:** Organizations must review existing scoring algorithms. If they combine disparate data sources to create an aggregated score affecting individual rights, they are likely prohibited. Remediation involves decomposing the score into transparent, auditable components.

#### Untargeted Facial Recognition Scraping
**Prohibition:** Large-scale or real-time facial recognition systems operating in publicly accessible government-controlled spaces without proper legal basis and transparency.

**Real-World Examples:**
- Mass facial recognition at border checkpoints without explicit traveler consent
- Real-time identification in airports, train stations, or public streets
- Retroactive facial scraping of online photos to build identification databases
- Surveillance using facial recognition across multiple jurisdictions without harmonized legal basis

**Compliance:** Organizations operating such systems must immediately halt deployment. Migration to targeted, consent-based facial identification (1:1 matching with explicit permission) is the primary pathway forward, with transition provisions extending through 2026.

---

### 3. How to Document Your AI Audit for Regulatory Readiness

Preparing your organization for EU AI Act compliance requires comprehensive documentation. This section provides a step-by-step approach.

#### Phase 1: Inventory and Classification (Weeks 1–4)
**Deliverables:**
- Complete system inventory (name, version, deployment date, release schedule)
- Completed EU AI Act classifier assessment for each system
- Risk level assignment with justification (why this system is Unacceptable/High/Limited/Minimal)
- Stakeholder map (data owners, product managers, legal, compliance)

**Documentation Template:**
For each system, create a one-page risk summary:
\`\`\`
System Name: [Title]
Risk Level: [Unacceptable/High/Limited/Minimal]
Triggering Criteria:
- [Article/Annex reference]: [Description]
- [Article/Annex reference]: [Description]
Responsible Team: [Owner]
Compliance Status: [Not Started/In Progress/Completed]
Audit Date: [YYYY-MM-DD]
\`\`\`

#### Phase 2: Technical Documentation (Weeks 5–12)
**For High-Risk Systems:**
- System architecture diagram (inputs, processing, outputs, integrations)
- Training data: Source(s), volume, version control, retention policy
- Model: Algorithm name, hyperparameters, training date, performance metrics
- Validation: Accuracy by subgroup, false-positive rates, confidence intervals
- Testing: Adversarial robustness, edge cases, failure modes
- Bias audit: Baseline metrics, monitoring dashboard screenshots, remediation log

**For Limited-Risk Systems:**
- Disclosure language (what users will see)
- Privacy notice (data collected, processing logic, retention)
- DPIA (if applicable under GDPR)

**Storage:** Maintain in version-controlled repository (Git, GDrive, SharePoint) with access logged.

#### Phase 3: Risk Management Plan (Weeks 13–16)
Create a documented plan addressing:
- Foreseeable risks (harms to rights, discrimination, system failures)
- Risk mitigation (technical controls, process changes, human oversight)
- Monitoring approach (metrics, review frequency, alert thresholds)
- Incident response (who to notify, escalation path, remediation timeline)
- Review cycle (quarterly minimum for High-Risk; annually for Limited-Risk)

#### Phase 4: Operational Readiness (Weeks 17–24)
- Implement monitoring dashboards (performance, bias, incident tracking)
- Establish human oversight workflows and train reviewers
- Draft user-facing disclosures for Limited/High-Risk systems
- Create appeal/feedback mechanisms for affected users
- Schedule internal audit and designate audit owner

#### Phase 5: Notified Body Assessment (Weeks 25–36) [High-Risk Only]
For High-Risk systems, engage a notified body (independent conformity auditor) or prepare in-house technical file:
- Schedule conformity assessment with notified body (or assign internal assessor)
- Conduct compliance gap analysis
- Remediate gaps
- Receive assessment report and CE mark recommendation

#### Phase 6: NASS Registration and Production Deployment (Week 37+) [High-Risk Only]
- Register system in EU AI Notification & Surveillance System (NASS) via your Member State's AI Office
- Obtain CE mark certification
- Publish EU Declaration of Conformity
- Deploy to production with continuous post-market monitoring

**Total Estimated Effort:** 24–36 weeks (6–9 months) for a typical High-Risk system, depending on system complexity and team size.

---

### 4. Key Regulatory Milestones and Enforcement Timeline

- **August 1, 2025:** Prohibited practices (Article 5) and transparency requirements (Article 13) become binding
- **August 1, 2026:** Full compliance required for High-Risk systems (Annex III); CE mark and NASS registration mandatory
- **Ongoing:** EU AI Office monitors compliance; Member States enforce via competent authorities

---

### 5. Resources and Further Reference

- [EUR-Lex Regulation 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/) (Official EU AI Act text)
- [EU AI Office](https://digital-strategy.ec.europa.eu/en/policies/ai-act) (Regulatory guidance, notified body lists, NASS portal)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81399.html) (AI Management System standard)
- [NIST AI Risk Management Framework](https://airc.nist.gov/) (Complementary risk framework)
`;

export type EuAiActDocSections = "compliance" | "prohibited" | "audit" | "timeline" | "resources";

export function getEuAiActDocSection(section: EuAiActDocSections): string {
  const sections: Record<EuAiActDocSections, string> = {
    compliance:
      "1. Compliance Requirements for High-Risk Systems (Annex III)",
    prohibited: "2. Prohibited Practices in the 2026 Enforcement Era (Article 5)",
    audit: "3. How to Document Your AI Audit for Regulatory Readiness",
    timeline: "4. Key Regulatory Milestones and Enforcement Timeline",
    resources: "5. Resources and Further Reference",
  };
  return sections[section];
}
