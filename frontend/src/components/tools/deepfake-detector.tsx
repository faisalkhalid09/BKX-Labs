
import { useState } from "react";
import { analyzeDeepfakeProbability } from "@/lib/tools/deepfake-detector";

export function DeepfakeDetector() {
  const [codec, setCodec] = useState(false);
  const [cadence, setCadence] = useState(false);
  const [desync, setDesync] = useState(false);
  const [meta, setMeta] = useState(false);
  const [patterns, setPatterns] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof analyzeDeepfakeProbability> | null>(null);

  const onAnalyze = () => {
    const res = analyzeDeepfakeProbability({
      hasCodecAnomalies: codec,
      frameCadenceIrregular: cadence,
      audioVideoDesync: desync,
      missingMetadata: meta,
      suspiciousPatterns: patterns,
    });
    setResult(res);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Deepfake Detection Probability Tool</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Score the probability that a media file is AI-generated based on artifact indicators.
        </p>
        <div className="field-grid mt-4">
          {[
            { state: codec, setState: setCodec, label: "Codec anomalies" },
            { state: cadence, setState: setCadence, label: "Frame cadence irregular" },
            { state: desync, setState: setDesync, label: "Audio-video desync" },
            { state: meta, setState: setMeta, label: "Missing metadata" },
            { state: patterns, setState: setPatterns, label: "Facial patterns suspicious" },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.state}
                onChange={(e) => item.setState(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
        <button type="button" className="btn primary mt-3" onClick={onAnalyze}>
          Analyze
        </button>
        {result && (
          <div className="tool-result mt-3" aria-live="polite">
            <p className="text-lg font-semibold">{result.probabilityPercent}% AI-Generated</p>
            <p className="mt-2 text-sm capitalize font-semibold">Confidence: {result.confidence}</p>
            {result.indicators.map((ind: any) => (
              <p key={ind} className="mt-1 text-sm">
                •{ind}
              </p>
            ))}
            <p className="mt-3 text-xs text-[#4f565c] italic">{result.disclaimer}</p>
          </div>
        )}
      </section>
    </>
  );
}
