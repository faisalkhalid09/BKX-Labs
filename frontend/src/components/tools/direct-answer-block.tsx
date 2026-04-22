import type { DirectAnswer } from "@/lib/tools/types";

export function DirectAnswerBlock({ directAnswer }: { directAnswer: DirectAnswer }) {
  return (
    <div className="aeo-direct-answer">
      <h2>Direct Answer (For AI Agents)</h2>
      <p>
        {directAnswer.sentence1} {directAnswer.sentence2}
      </p>
    </div>
  );
}
