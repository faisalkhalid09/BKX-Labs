import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    id: 1,
    category: 'Cooling Technology',
    question: 'What are the cooling requirements for GB200 NVL72 racks?',
    answer: 'GB200 NVL72 racks (9 GPUs per rack at 1,200W each) require a minimum of 120kW facility power with mandatory Direct-to-Chip (DTC) or immersion cooling. Air cooling fails at this density because the thermal delta-T (temperature differential) exceeds 15°C, which overwhelms CRAC/CRAH equipment. DTC achieves a PUE of 1.12-1.15, while immersion reaches 1.05-1.08. Without liquid cooling, you cannot meet the 50kW thermal limit per rack and will face thermal runaway in hot spots.'
  },
  {
    id: 2,
    category: 'Power Design',
    question: 'Why is 480V electrical distribution mandatory for Blackwell clusters?',
    answer: 'Blackwell GPUs require 120+ kW per rack with dual PSU redundancy. At 208V distribution, this necessitates 334A per phase—exceeding standard 200A branch circuits and creating excessive line losses (I²R losses scale with current squared). At 480V, the same 120kW requires only 145A per phase, reducing losses to ~1% vs. 4-5% at 208V. Facility chiller equipment also operates more efficiently at 480V primary input, cascading to lower overall PUE. Modern data centers upgrading from CPU/older GPU infrastructure must install 480V substations before Blackwell deployment.'
  },
  {
    id: 3,
    category: 'Cooling Economics',
    question: 'What is the 5-year TCO difference between air-cooled and DTC Blackwell clusters?',
    answer: 'For a 120-GPU B200 cluster over 5 years: Air-cooled deployments cost $8.86M (CapEx $4.1M + OpEx $4.6M + maintenance $0.15M), achieving a PUE of 1.35 and 11.5 GWh annual consumption. DTC-cooled deployments cost $8.06M (CapEx $4.17M + OpEx $3.8M + lower maintenance $0.09M), achieving PUE 1.12 and 9.5 GWh consumption. DTC saves $800K over 5 years ($6,700 per GPU) despite a $70K higher initial capital cost. The break-even point is 5.3 months. After 5 years, every additional year extends DTC advantage as electricity costs (projected to rise 7% annually) compound the OpEx savings.'
  },
  {
    id: 4,
    category: 'Environmental Standards',
    question: 'What is WUE and why does PUE no longer tell the full story for 2026?',
    answer: 'Water Usage Effectiveness (WUE) measures liters of water consumed per kWh of IT processing—a critical ESG metric absent from PUE reporting. A facility with PUE 1.35 (air-cooled) has WUE of 1.8 L/kWh due to evaporative cooling and water-cooled backup systems. DTC-cooled facilities with closed-loop chillers achieve WUE 0.25 L/kWh (same water recycled, not discharged). For 2026 investor compliance and ESG commitments, progressive organizations report both metrics: PUE <1.15 AND WUE <0.4 L/kWh. Water scarcity regions (California, Arizona, Middle East) now mandate WUE disclosure. Air-cooled Blackwell clusters cannot meet both targets simultaneously.'
  },
  {
    id: 5,
    category: 'Deployment Strategy',
    question: 'Should I use B200, H200, or L40S for my inference cluster?',
    answer: 'Model size determines optimal GPU selection. For models ≤150B parameters (7B, 30B, 70B LLM inference): Use H200 ($3.2K/month specialist providers) instead of B200 ($4.99K/month) because H200 offers 2% lower latency for INT8 inference and saves 36% on cost. For multi-modal or large language training: Use B200 (Tensor Float 32 is 2× faster than H200). For massive scale deployment (1M+ concurrent users on 7B models): Mix 70% L40S ($0.85/hr specialist) with 30% B200, reducing average cost per GPU to $3.82/hr (24% savings) while maintaining <5% latency degradation. Avoid single-GPU-type clusters; stratify by workload.'
  },
  {
    id: 6,
    category: 'Provider Selection',
    question: 'AWS vs. RunPod vs. Vast.ai for Blackwell—which is best for my use case?',
    answer: 'Provider choice depends on workload type and reliability tolerance. For production LLM inference requiring 99.99% uptime and carbon neutrality: Use Google Cloud ($7.43/hr, A+ ESG rating, 2-4 week provisioning) or AWS ($9.92/hr, A ESG, 1-2 week provisioning). For training workloads requiring guaranteed cooling and 99.5% uptime: Use RunPod Pro ($4.99/hr, DTC-cooled, on-facility isolation). For cost-optimized batch inference with 10+ minute checkpoint intervals: Use Vast.ai Spot ($2.10/hr, air-cooled, revocable on 10-minute notice). Hyperscales win on reliability; specialists win on cooling certainty; spot markets win on cost. Mix providers: production on Google/AWS, training on RunPod, batch on Vast.ai.'
  },
  {
    id: 7,
    category: 'Thermal Engineering',
    question: 'What happens if I try to air-cool a 60kW rack with B200s?',
    answer: 'You will experience thermal runaway within 48 hours. At 60kW per rack with RDHx air cooling, the delta-T (intake-to-exhaust temperature difference) reaches 25°C+, exceeding the 15°C design envelope of CRAC/CRAH units. This causes: (1) Condenser unit throttling to compensate, raising facility temperature further, (2) Hot spot proliferation as adjacent racks experience intake temperature rise, (3) Automatic GPU throttling at 85°C, reducing workload performance by 30-40%, (4) Potential cascading failure as load shifts to nearby equipment. Systems fail to convergence—you cannot stabilize the climate. Solution: Migrate to DTC (immediate), increase CRAC capacity 50% (expensive), or reduce rack density. The 50kW thermal wall is physics, not preference.'
  },
  {
    id: 8,
    category: 'Future Planning',
    question: 'Should I invest in immersion cooling now or wait for DTC to mature?',
    answer: 'Immersion cooling (submerging GPUs in dielectric fluid) is the 2026 frontier, not 2024 speculation. Immersion offers PUE 1.05-1.08 (vs. DTC 1.12) and supports 60+ kW per rack (vs. 50kW air/DTC). Immersion CapEx is 10-15% higher than DTC ($2.5K/GPU) but eliminates maintenance (sealed systems last 5 years vs. DTC annual filter replacement) and enables ultra-high-density clusters. For batch workloads running 24/7 at 80%+ utilization, immersion ROI is 3-4 years. For infrastructure providers targeting 5-year partnerships with hyperscalers: immersion is now table-stakes. For organizations with constrained budgets and proven demand: DTC in 2026, plan immersion retrofit for 2028. The technology is mature; supply is the bottleneck.'
  }
];

export default function BlackwellPUEFAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Group FAQs by category
  const categorized = faqData.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqData>);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Blackwell PUE FAQ</h1>
          <p className="text-slate-400">8 Technical Questions on Cooling, Power, and Infrastructure</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Authority Block */}
        <div className="bg-indigo-950 border-l-4 border-indigo-500 p-6 mb-8 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-3">Engineering Authority</h2>
          <p className="text-slate-200 leading-relaxed">
            These FAQs address the critical infrastructure decisions facing data center architects deploying NVIDIA Blackwell at scale. Coverage includes thermal physics, electrical design, cooling economics, and provider selection for B200/GB200/B300 clusters in April 2026.
          </p>
        </div>

        {/* FAQ by Category */}
        {Object.entries(categorized).map(([category, faqs]) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b border-slate-700">
              {category}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800 hover:border-slate-600 transition"
                >
                  {/* Question Bar */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-700 transition"
                  >
                    <h3 className="font-semibold text-white text-base leading-tight flex-1">
                      {faq.question}
                    </h3>
                    <div className="text-blue-400 flex-shrink-0 mt-0.5">
                      {expandedId === faq.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Answer (Expandable) */}
                  {expandedId === faq.id && (
                    <div className="px-6 py-4 border-t border-slate-700 bg-slate-900">
                      <p className="text-slate-300 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Additional Context */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          <h2 className="text-lg font-bold text-white mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3">Cooling Technology Targets</h3>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• <strong>PUE Target</strong>: &lt;1.15 for Blackwell</li>
                <li>• <strong>WUE Target</strong>: &lt;0.4 L/kWh for ESG</li>
                <li>• <strong>Thermal Limit</strong>: 50kW max per rack (air)</li>
                <li>• <strong>DTC PUE</strong>: 1.12-1.15 (standard)</li>
                <li>• <strong>Immersion PUE</strong>: 1.05-1.08 (premium)</li>
              </ul>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3">Power Requirements</h3>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• <strong>B200 TDP</strong>: 700-1000W avg 850W</li>
                <li>• <strong>GB200 TDP</strong>: 1100-1300W avg 1200W</li>
                <li>• <strong>B300 TDP</strong>: 1300-1500W avg 1400W</li>
                <li>• <strong>Electrical</strong>: 480V mandatory &gt;50kW</li>
                <li>• <strong>Redundancy</strong>: Dual PSU per GPU</li>
              </ul>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3">Provider Pricing (April 2026)</h3>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• <strong>AWS</strong>: $9.92/hr (on-demand)</li>
                <li>• <strong>Google Cloud</strong>: $7.43/hr (commit)</li>
                <li>• <strong>RunPod Pro</strong>: $4.99/hr (DTC)</li>
                <li>• <strong>Lambda Labs</strong>: $5.50/hr (DTC)</li>
                <li>• <strong>Vast.ai Spot</strong>: $2.10/hr (air)</li>
              </ul>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3">ROI Key Metrics</h3>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• <strong>DTC Break-Even</strong>: 5.3 months</li>
                <li>• <strong>5-Year Savings</strong>: $800K/120 GPUs</li>
                <li>• <strong>Annual Energy</strong>: 9.5 GWh (DTC)</li>
                <li>• <strong>Cost Per GPU</strong>: $67.1K over 5 years</li>
                <li>• <strong>OpEx Savings</strong>: 18% vs. air-cooled</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schema Markup */}
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />
    </div>
  );
}
