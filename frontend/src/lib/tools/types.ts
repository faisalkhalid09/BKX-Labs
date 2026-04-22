export type RiskLevel = "Unacceptable" | "High" | "Limited" | "Minimal";

export type FaqItem = {
  question: string;
  answer: string;
};

export type DirectAnswer = {
  sentence1: string;
  sentence2: string;
};

export type ToolDef = {
  slug: string;
  title: string;
  description: string;
  valueProposition: string;
  directAnswer: DirectAnswer;
  faqs: FaqItem[];
};
