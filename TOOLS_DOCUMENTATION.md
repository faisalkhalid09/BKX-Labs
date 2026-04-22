# BKX Labs Utility Tools Suite - Complete Documentation

**Total Tools: 15**

---

## 📋 Tools Overview & How They Work

### 1. **EU AI Act Risk Level Classifier**
**Slug:** `eu-ai-act-risk-level-classifier`  
**URL:** `https://bkxlabs.com/tools/eu-ai-act-risk-level-classifier`

**What it does:**
Categorizes an AI system into 4 compliance risk levels: Unacceptable, High, Limited, or Minimal based on EU AI Act regulations.

**How it works:**
- User selects conditions that apply to their AI system (subliminal manipulation, social scoring, facial scraping, law enforcement use, etc.)
- Tool evaluates against prohibited practices, high-risk sector usage, and transparency requirements
- Returns risk level + auditable reasoning for each classification
- No legal advice, but provides defensible compliance screening

**Best for:** AI product teams, compliance officers, legal teams doing fast compliance triage

---

### 2. **Post-Quantum CBOM Generator**
**Slug:** `post-quantum-cbom-generator`  
**URL:** `https://bkxlabs.com/tools/post-quantum-cbom-generator`

**What it does:**
Analyzes cryptographic dependencies in your codebase for quantum-vulnerability and generates a PQC migration roadmap.

**How it works:**
- User inputs a JSON dependency list (name, version, algorithm)
- Tool matches each dependency against NIST-standardized PQC libraries (Kyber, Dilithium, ML-KEM, etc.)
- Classifies as: PQC-ready, PQC-aware, or classical (needs migration)
- Returns readiness percentage + recommendations aligned to NIST 2030 migration timeline

**Best for:** Security teams, cryptography engineers, organizations managing long-lived secrets

---

### 3. **SaaS SOC 2 Readiness Calculator**
**Slug:** `saas-soc2-readiness-calculator`  
**URL:** `https://bkxlabs.com/tools/saas-soc2-readiness-calculator`

**What it does:**
Gap-analysis tool for B2B compliance. Scores your SOC 2 readiness and generates a prioritized implementation roadmap.

**How it works:**
- User selects implemented controls (access controls, encryption, monitoring, change management, incident response, vendor management)
- User selects target trust categories (Security, Availability, Confidentiality, Integrity, Privacy)
- Tool calculates readiness % per category and overall
- Generates prioritized gap list with implementation timeline estimates (6-12 months typical)
- Flags which controls to implement first for fastest compliance

**Best for:** SaaS founders, compliance teams, CISOs prepping for SOC 2 Type II audits

---

### 4. **Cloud-GPU Cost Comparison Tool**
**Slug:** `cloud-gpu-cost-comparison`  
**URL:** `https://bkxlabs.com/tools/cloud-gpu-cost-comparison`

**What it does:**
Real-time hourly GPU pricing across AWS, Azure, Google Cloud, and Lambda Labs for cost optimization.

**How it works:**
- User selects GPU type (A100, H100, L40S, etc.), region, and hours/month usage
- Tool compares official on-demand pricing from all 4 providers
- Calculates monthly + annual cost for each provider
- Shows cheapest option and savings vs competitors
- Prices updated quarterly from official rate cards

**Best for:** ML engineers, data scientists, infrastructure teams optimizing training budgets

---

### 5. **NVIDIA Blackwell PUE Estimator**
**Slug:** `nvidia-blackwell-pue-estimator`  
**URL:** `https://bkxlabs.com/tools/nvidia-blackwell-pue-estimator`

**What it does:**
Estimates Power Usage Effectiveness (PUE) and annual energy costs for GPU-dense data center deployments.

**How it works:**
- User inputs GPU count, utilization %, and cooling type (air vs. liquid)
- Tool calculates IT load (1.456 kW per Blackwell GPU)
- Applies PUE factor (1.9 for air, 1.2 for liquid cooling)
- Multiplies by facility power and $85/MWh (US average) to get annual OpEx
- Returns facility-wide power draw + annual energy bill

**Best for:** Data center planners, infrastructure engineers, GPU cluster operators

---

### 6. **AI Prompt Privacy Auditor**
**Slug:** `ai-prompt-privacy-auditor`  
**URL:** `https://bkxlabs.com/tools/ai-prompt-privacy-auditor`

**What it does:**
Scans prompts for PII (emails, phone numbers, API keys, SSNs, credit cards) before sending to ChatGPT/Claude/other AI services.

**How it works:**
- User pastes prompt text
- Tool pattern-matches against regex for common PII types:
  - Email addresses
  - Phone numbers (US + international)
  - Social Security Numbers
  - API keys / tokens
  - Credit card numbers
  - IP addresses
- Flags detected patterns with confidence score
- User decides if flagged items should be redacted before sending to AI

**Best for:** Security teams, engineers using AI assistants, companies handling sensitive data

---

### 7. **ADMT Proportionality Scorer**
**Slug:** `admt-proportionality-scorer`  
**URL:** `https://bkxlabs.com/tools/admt-proportionality-scorer`

**What it does:**
Evaluates legal proportionality of AI workplace monitoring under EU ADMT (Automated Decision-Making Technology) regulations.

**How it works:**
- User rates 5 legal factors on 0-100:
  1. **Necessity** - Is monitoring required for operational/compliance reasons?
  2. **Transparency** - Are workers fully informed of scope/use/retention?
  3. **Intrusiveness** - How invasive is the monitoring method?
  4. **Safeguards** - Are there protections against misuse/discrimination?
  5. **Impact** - How much does it affect workers' privacy/autonomy?
- Tool averages scores into 0–100 proportionality rating
- Maps to risk band: Low (defensible), Medium (review), High (risky)
- Reduces litigation risk by documenting proportionality assessment

**Best for:** HR teams, legal counsel, European companies implementing worker monitoring

---

### 8. **NIST FIPS 203 Migration Timeline Planner**
**Slug:** `nist-fips-203-migration-timeline-planner`  
**URL:** `https://bkxlabs.com/tools/nist-fips-203-migration-timeline-planner`

**What it does:**
Generates a phased post-quantum cryptography migration timeline from classical algorithms (RSA/ECC) to NIST-standardized PQC (ML-KEM, ML-DSA).

**How it works:**
- User inputs:
  - Total cryptographic assets (keys, certificates, algorithms)
  - Team size / crypto engineers available
  - Asset criticality distribution
- Tool distributes assets across 6 migration phases:
  1. **Assessment & Discovery** - Inventory all crypto
  2. **Design & Testing** - Lab PQC implementations
  3. **Implementation** - Deploy in non-production
  4. **Production Testing** - Validate at scale
  5. **Dual-Run** - Run classical + PQC in parallel (3-6 months)
  6. **Cutover** - Retire classical algorithms
- Returns realistic timeline (usually 12-36 months depending on scale)
- Aligned to NIST 2030 migration deadline for critical systems

**Best for:** CISOs, cryptography teams, government contractors managing long-lived secrets

---

### 9. **Direct-to-Chip Liquid Cooling ROI Tool**
**Slug:** `direct-to-chip-liquid-cooling-roi`  
**URL:** `https://bkxlabs.com/tools/direct-to-chip-liquid-cooling-roi`

**What it does:**
5-year financial comparison: Air cooling vs. Direct-to-Chip liquid cooling with ROI, payback period, and annual savings.

**How it works:**
- User inputs:
  - Rack count & GPU density per rack
  - Cooling capital cost (CapEx)
  - Annual maintenance labor cost
  - Power consumption by type
  - Electricity rate ($/kWh)
- Tool calculates over 5 years:
  - Air cooling total cost = 5 × annual OpEx
  - Liquid cooling total cost = CapEx + (5 × annual OpEx)
  - Break-even point (when savings exceed CapEx)
  - Annual savings once amortized
  - ROI percentage
- Liquid cooling is only justified if annual savings exceed initial CapEx within equipment lifetime

**Best for:** Data center architects, infrastructure leaders, hyperscale operations

---

### 10. **Agentic AI Workflow Debugger**
**Slug:** `agentic-workflow-debugger`  
**URL:** `https://bkxlabs.com/tools/agentic-workflow-debugger`

**What it does:**
Analyzes agent workflow graphs for infinite loops, unreachable nodes, and missing guard conditions before deployment.

**How it works:**
- User inputs workflow graph (nodes + transitions)
- Tool applies graph algorithms (DFS/BFS):
  - **Loop detection** - Finds cycles that could cause infinite loops
  - **Reachability analysis** - Identifies dead code paths
  - **Guard validation** - Flags missing conditions on transitions
- Returns:
  - List of problematic nodes
  - Cycle paths (to understand loop origins)
  - Recommended fixes (add guards, remove nodes, restructure)
- Helps prevent runaway agents that exhaust compute/tokens

**Best for:** AI engineers, agentic systems architects, LLM operations teams

---

### 11. **Smart Contract Gas Fee Optimizer**
**Slug:** `smart-contract-gas-optimizer`  
**URL:** `https://bkxlabs.com/tools/smart-contract-gas-optimizer`

**What it does:**
Detects gas inefficiency patterns in smart contracts and recommends refactoring to reduce transaction costs.

**How it works:**
- User inputs contract code (Solidity)
- Tool scans for common inefficiencies:
  - Excessive storage writes (20,000 gas each) → batch writes
  - Unbounded loops → add limits/pagination
  - Redundant computations → cache results
  - Missing data packing → consolidate types
  - External calls in loops → move outside
- Returns:
  - Detected inefficiencies ranked by gas impact
  - Potential savings % (often 10-40%)
  - Refactoring recommendations with code examples
  - Priority order (highest impact first)

**Best for:** Smart contract developers, blockchain engineers, DeFi projects

---

### 12. **ESG Carbon Footprint Tracker for Devs**
**Slug:** `esg-carbon-footprint-tracker`  
**URL:** `https://bkxlabs.com/tools/esg-carbon-footprint-tracker`

**What it does:**
Calculates CO2 emissions of your cloud deployment and estimates carbon offset costs.

**How it works:**
- User inputs:
  - Monthly compute hours (by region)
  - Storage in GB (by region)
  - Cloud provider (AWS, Azure, GCP)
- Tool applies regional carbon intensity factors (grams CO2 per kWh):
  - Coal-heavy regions: 800-1200 g/kWh
  - Renewables-heavy regions: 50-200 g/kWh
- Calculates:
  - Monthly emissions in kg CO2
  - Annual emissions in metric tons
  - Carbon offset cost ($15/ton US estimate)
- Returns monthly + annual impact summary

**Best for:** Sustainability teams, ESG-committed developers, corporate carbon accounting

---

### 13. **Zero-Knowledge Proof Validator**
**Slug:** `zk-circuit-validator`  
**URL:** `https://bkxlabs.com/tools/zk-circuit-validator`

**What it does:**
Validates zero-knowledge circuit syntax and detects unsound constraints (Circom or similar frameworks).

**How it works:**
- User inputs circuit code
- Tool scans for:
  - **Missing signal declarations** - Flags undeclared variables
  - **Unsound assignments** - Detects `signal x = y;` (invalid without constraints)
  - **Missing constraints** - Finds signals that are computed but never used
  - **Incomplete gates** - Identifies malformed constraint syntax
- Returns:
  - Line-by-line error list
  - Severity (error vs. warning)
  - Fix suggestions
- Does NOT prove circuit correctness (that requires witness generation + prover)

**Best for:** ZK protocol developers, cryptographers, privacy-focused apps

---

### 14. **Deepfake Detection Probability Tool**
**Slug:** `deepfake-detector-probability`  
**URL:** `https://bkxlabs.com/tools/deepfake-detector-probability`

**What it does:**
Scores the probability that a media file is AI-generated (deepfake) based on artifact indicators.

**How it works:**
- User inputs media file or artifact indicators
- Tool checks for:
  - **Codec anomalies** - Unexpected compression patterns
  - **Frame cadence irregularities** - Unnatural frame timing
  - **Audio-video desync** - Lip/audio misalignment
  - **Metadata absence** - Missing EXIF, camera info
  - **Facial pattern anomalies** - Unnatural eye movement, blinks, etc.
- Weights each indicator based on forensic research
- Calculates cumulative probability score (0-100%)
- **IMPORTANT:** Not 100% accurate; fast screening tool only, not legal evidence

**Best for:** Journalists, content moderation teams, misinformation researchers

---

### 15. **Crypto-Agility Maturity Model**
**Slug:** `crypto-agility-maturity-model`  
**URL:** `https://bkxlabs.com/tools/crypto-agility-maturity-model`

**What it does:**
Scores organizational capability to swap cryptographic algorithms (e.g., RSA → post-quantum) at scale.

**How it works:**
- User rates organization on 5 capability areas (0-100 each):
  1. **Cryptographic Inventory** - Do you know all crypto in use?
  2. **Algorithm Abstraction** - Can you swap algorithms without code changes?
  3. **Key Management** - Centralized, policy-driven key lifecycle?
  4. **Substitution Testing** - CI/CD tests for algorithm swaps?
  5. **Governance** - Crypto standards, change policies, audit trails?
- Tool averages scores → Maturity Level 1-5:
  - **Level 1** (0-20%): No inventory, brittle crypto
  - **Level 2** (21-40%): Basic inventory, manual processes
  - **Level 3** (41-60%): Documented, some automation
  - **Level 4** (61-80%): Abstraction, testing, governance in place
  - **Level 5** (81-100%): Full agility, policy-driven change
- Returns improvement roadmap to advance levels

**Best for:** CISOs, architecture teams, large enterprises managing cryptographic risk

---

## 📊 Tools by Category

### **Compliance & Regulatory**
1. EU AI Act Risk Level Classifier
2. SaaS SOC 2 Readiness Calculator
3. ADMT Proportionality Scorer

### **Cryptography & Security**
1. Post-Quantum CBOM Generator
2. NIST FIPS 203 Migration Timeline Planner
3. Crypto-Agility Maturity Model
4. AI Prompt Privacy Auditor
5. Zero-Knowledge Proof Validator

### **Infrastructure & Cloud**
1. Cloud-GPU Cost Comparison Tool
2. NVIDIA Blackwell PUE Estimator
3. Direct-to-Chip Liquid Cooling ROI Tool
4. ESG Carbon Footprint Tracker

### **AI & Agents**
1. Agentic AI Workflow Debugger
2. Deepfake Detection Probability Tool

### **Smart Contracts & Blockchain**
1. Smart Contract Gas Fee Optimizer

---

## 🎯 Common Use Cases

| Role | Tools to Use | Purpose |
|------|--------------|---------|
| **CISO / Security Lead** | PQ-CBOM, FIPS 203 Planner, Crypto-Agility, SOC 2 | Assess and plan cryptographic transitions |
| **Compliance Officer** | EU AI Act Classifier, ADMT Scorer, SOC 2 | Regulatory risk and proportionality assessment |
| **ML Engineer** | GPU Cost Comparison, Blackwell PUE | Optimize training infrastructure spend |
| **Data Center Architect** | Blackwell PUE, Liquid Cooling ROI | Plan power-efficient deployments |
| **Smart Contract Dev** | Gas Optimizer, ZK Validator | Optimize contracts and circuits |
| **AI Systems Engineer** | Agentic Debugger, Prompt Privacy Auditor | Ensure safe, privacy-respecting AI systems |
| **Sustainability Lead** | Carbon Footprint Tracker | Track and offset cloud emissions |
| **Product Security Team** | Prompt Privacy Auditor, Deepfake Detector | Prevent PII leaks and misinformation |

---

## 🚀 Getting Started

All tools are **free, no login required**, and load in **milliseconds**.

- **Access all tools:** https://bkxlabs.com/tools
- **Individual tool URL pattern:** https://bkxlabs.com/tools/{slug}

Each tool includes:
- **Direct Answer block** (for AI agents & search engines)
- **Interactive form** (for user input)
- **FAQ section** (with common questions)
- **Transparent methodology** (how the tool calculates results)
