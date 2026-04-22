
import { useState } from "react";
import { scoreCryptoAgilityMaturity } from "@/lib/tools/crypto-agility-maturity";

export function CryptoAgilityMaturitModel() {
  const [inventory, setInventory] = useState(50);
  const [abstraction, setAbstraction] = useState(50);
  const [kms, setKms] = useState(50);
  const [testing, setTesting] = useState(50);
  const [governance, setGovernance] = useState(50);
  const [result, setResult] = useState<ReturnType<typeof scoreCryptoAgilityMaturity> | null>(null);

  const onScore = () => {
    const res = scoreCryptoAgilityMaturity({
      inventoryScore: inventory,
      abstractionScore: abstraction,
      kmsScore: kms,
      testingScore: testing,
      governanceScore: governance,
    });
    setResult(res);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Crypto-Agility Maturity Model</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Score organizational capability to swap cryptographic algorithms (e.g., RSA → post-quantum) at scale.
        </p>
        <div className="mt-4 space-y-3">
          {[
            { state: inventory, setState: setInventory, label: "Inventory (0-100)" },
            { state: abstraction, setState: setAbstraction, label: "Abstraction (0-100)" },
            { state: kms, setState: setKms, label: "Key Management (0-100)" },
            { state: testing, setState: setTesting, label: "Testing (0-100)" },
            { state: governance, setState: setGovernance, label: "Governance (0-100)" },
          ].map((item) => (
            <div key={item.label}>
              <label className="block text-sm font-medium mb-1">
                {item.label.split(" ")[0]}: {item.state}
              </label>
              <input
                type="range"
                value={item.state}
                onChange={(e) => item.setState(Number(e.target.value))}
                min="0"
                max="100"
                className="w-full"
              />
            </div>
          ))}
        </div>
        <button type="button" className="btn primary mt-4" onClick={onScore}>
          Calculate Maturity
        </button>
        {result && (
          <div className="tool-result mt-3" aria-live="polite">
            <p className="text-lg font-semibold">Level {result.overallMaturityLevel} / 5</p>
            <p className="mt-2 text-sm">Score: {result.overallScore}%</p>
            {result.recommendations.map((rec: string) => (
              <p key={rec} className="mt-1 text-sm">
                • {rec}
              </p>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
