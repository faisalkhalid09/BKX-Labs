export type EsgCarbonInput = {
  computeKwh: number;
  storageGbMonth: number;
  regionCarbonIntensity: number;
};

export type EsgCarbonResult = {
  monthlyComputeCO2kg: number;
  monthlyStorageCO2kg: number;
  totalMonthlyCO2kg: number;
  annualCO2kg: number;
  annualCO2Tons: number;
  offsetCost: number;
};

const STORAGE_ENERGY_PER_GB_YEAR_KWH = 0.0002;

export function calculateCarbonFootprint(input: EsgCarbonInput): EsgCarbonResult {
  const { computeKwh, storageGbMonth, regionCarbonIntensity } = input;

  const computeCO2Kg = computeKwh * (regionCarbonIntensity / 1000);

  const storageEnergyPerMonth = (storageGbMonth * STORAGE_ENERGY_PER_GB_YEAR_KWH) / 12;
  const storageCO2Kg = storageEnergyPerMonth * (regionCarbonIntensity / 1000);

  const totalMonthlyCO2 = computeCO2Kg + storageCO2Kg;
  const annualCO2Kg = totalMonthlyCO2 * 12;
  const annualCO2Tons = annualCO2Kg / 1000;

  const costPerTonOffset = 15;
  const offsetCost = annualCO2Tons * costPerTonOffset;

  return {
    monthlyComputeCO2kg: Math.round(computeCO2Kg * 100) / 100,
    monthlyStorageCO2kg: Math.round(storageCO2Kg * 100) / 100,
    totalMonthlyCO2kg: Math.round(totalMonthlyCO2 * 100) / 100,
    annualCO2kg: Math.round(annualCO2Kg),
    annualCO2Tons: Math.round(annualCO2Tons * 100) / 100,
    offsetCost: Math.round(offsetCost),
  };
}
