import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    question: "What's the cheapest way to rent an H100 GPU in April 2026?",
    answer: "Vast.ai offers the cheapest spot instances at $0.99/hr, but with 30-60 minute interruption windows. For guaranteed uptime, Lambda Labs at $2.50/hr provides 99.9% SLA with the same quality. RunPod's specialist rate of $2.49/hr offers a middle ground with excellent support but higher egress costs ($0.50/GB).",
    tags: ['H100', 'cheapest', 'spot-instances', 'pricing'],
  },
  {
    question: "When will B200 GPU availability improve in 2026?",
    answer: "Based on NVIDIA's production ramp, B200 availability should improve significantly by May 2026 (4-6 weeks from April). RunPod expects inventory to exceed H100 by end of May as fab yields exceed 95%. Currently, Vast.ai maintains 30-50 B200 instances at any time; RunPod has a 2-4 week waiting list.",
    tags: ['B200', 'availability', 'supply-chain', 'NVIDIA'],
  },
  {
    question: "Is Lambda Labs really free egress for all outbound traffic?",
    answer: "Yes. Lambda Labs includes all outbound data transfer in the hourly rate with no separate egress fees. This makes them the clear winner for inference workloads (1-2 TB/month). For comparison, RunPod charges $0.50/GB ($512/TB), which can add $512-1024/month to large inference deployments.",
    tags: ['Lambda-Labs', 'egress', 'TCO', 'cost-optimization'],
  },
  {
    question: "Vast.ai vs Lambda Labs—which is better for production?",
    answer: "Vast.ai is better for development/training (60% cheaper with auto-save checkpoints). Lambda Labs is better for production inference (99.9% uptime, free egress, stable pricing). For mixed workloads, use Vast.ai for non-critical batch jobs and Lambda Labs for APIs.",
    tags: ['Vast.ai', 'Lambda-Labs', 'production-comparison', 'reliability'],
  },
  {
    question: "How much cheaper are spot GPU instances vs specialist clouds?",
    answer: "Spot instances offer 60-70% discounts. Example: A100 at $0.65/hr spot vs $1.79 specialist (64% cheaper). However, spot instances interrupt every 30-60 minutes. Use checkpoint auto-save every 5 minutes to recover from interruptions. For production, the reliability tax often justifies specialist pricing.",
    tags: ['spot-instances', 'savings', 'interruptions', 'checkpointing'],
  },
  {
    question: "What's the break-even point between hyperscaler and specialist clouds?",
    answer: "For most workloads, specialist clouds break even in <2 months. Example: B200 at $4.99 specialist vs $14.24 hyperscaler saves $7,254/month per GPU. The only barrier is egress costs—if you transfer >500GB/month, add $256-1024/month depending on provider.",
    tags: ['ROI', 'hyperscaler-vs-specialist', 'break-even', 'financial-analysis'],
  },
  {
    question: "Can I fit a 7B model on an L40S GPU? What about 30B?",
    answer: "Yes. L40S (48GB) fits 7B models at batch=1-2 for inference. For 30B, you need at least 80GB: use H100 or A100. For 70B, you need 140GB: use H200 or cluster 2× H100. B200's 192GB fits all model sizes except 400B+ (which requires distributed training).",
    tags: ['model-deployment', 'VRAM', '7B', '30B', 'L40S', 'H100'],
  },
  {
    question: "How do I choose between H100 and H200 for LLM inference?",
    answer: "H200 (141GB) is superior for inference: 4.8 TB/s memory bandwidth vs H100's 3.3 TB/s—20% faster token generation. H200 specialist pricing ($3.59/hr) is only 44% higher than H100 ($2.49/hr), making H200 the better value. Choose H200 unless VRAM is overkill for your model.",
    tags: ['H100-vs-H200', 'inference-optimization', 'token-generation', 'value-comparison'],
  },
  {
    question: "What's included in BKX Labs' Cloud GPU Cost Comparison calculator?",
    answer: "Our calculator includes: (1) Real-time pricing for 5 GPU models across 3-4 provider types, (2) Cost breakdowns showing hourly rates, monthly totals, and annual projections, (3) Savings analysis comparing your choice vs hyperscaler rates, (4) Provider availability and SLA details, (5) Workload-specific recommendations for inference, training, and batch processing.",
    tags: ['tool-features', 'calculator', 'BKX-Labs'],
  },
  {
    question: "RunPod vs AWS—what are the real savings for an AI startup?",
    answer: "RunPod saves 65% on compute ($4.99 B200 vs $14.24 AWS) but costs 1250% more on egress ($0.50/GB vs AWS's $0.02/GB). For a startup with moderate egress (<100GB/month): RunPod saves $6,000/month. For high egress (1TB/month): savings drop to $4,700/month. Use RunPod for development; move to Lambda Labs for production.",
    tags: ['RunPod', 'AWS', 'cost-analysis', 'startup-economics'],
  },
  {
    question: "What's the expected price drop for GPUs in 2026?",
    answer: "NVIDIA projects 500K GPU shipments in 2026 (vs 80K in 2025)—6.25× increase. Expected Q4 2026 prices: B200 to $3.50 specialist (from $4.99, -30%), H200 to $2.80 (from $3.59, -22%), H100 to $1.80 (from $2.49, -27%). Spot instances will drop proportionally.",
    tags: ['price-forecast', 'market-trends', 'supply-chain', '2026-outlook'],
  },
  {
    question: "How do egress costs affect total TCO for inference?",
    answer: "Egress can be 30-50% of total TCO for high-throughput inference. Example: H200 API serving 100M tokens/day (50GB/month egress) costs $1,436 (GPU $3,628 + egress $256 on RunPod). Switching to Lambda Labs ($3,628 + $0 egress) saves $256/month (7% reduction). For 1TB/month: egress becomes 40% of TCO.",
    tags: ['egress-fees', 'TCO', 'inference-economics', 'hidden-costs'],
  },
];

export default function CloudGPUFAQ() {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  // Group FAQs by category from tags
  const categories = Array.from(
    new Set(faqData.flatMap(item => item.tags))
  ).sort();

  const faqsByCategory = categories.reduce((acc, category) => {
    acc[category] = faqData.filter(item => item.tags.includes(category));
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cloud GPU Pricing FAQ
          </h1>
          <p className="text-lg text-gray-600">
            Answers to 12 critical questions about NVIDIA GPU pricing, availability, and cost optimization in April 2026.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Navigation */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <a
                key={category}
                href={`#${category}`}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-100"
              >
                {category.replaceAll('-', ' ')}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Sections by Category */}
        {categories.map(category => (
          <div key={category} id={category} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3"></span>
              {category.replaceAll('-', ' ')}
            </h2>

            <div className="space-y-4">
              {faqsByCategory[category]?.map((item, idx) => {
                const globalIndex = faqData.indexOf(item);
                const isExpanded = expandedIndex === globalIndex;

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() =>
                        setExpandedIndex(
                          isExpanded ? null : globalIndex
                        )
                      }
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex justify-between items-start"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {item.answer}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded"
                            >
                              {tag.replaceAll('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Optimize Your GPU Costs?
          </h2>
          <p className="text-gray-700 mb-6">
            Use our interactive{' '}
            <a href="/tools/cloud-gpu-cost-comparison" className="font-bold text-blue-600 hover:underline">
              Cloud GPU Cost Comparison Calculator
            </a>
            {' '}to model your specific workload and get price quotes from all major providers.
          </p>
          <a
            href="/tools/cloud-gpu-cost-comparison"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Open Calculator →
          </a>
        </div>
      </div>

      {/* Schema Markup for FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })
      }} />
    </div>
  );
}
