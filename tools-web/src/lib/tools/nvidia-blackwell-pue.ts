export type NvidiaBlackwellInput = {
  rackCount: number;
  gpusPerRack: number;
  utilizationPercent: number;
  coolingType: "air" | "liquid";
};

export type NvidiaBlackwellResult = {
  totalGpus: number;
  itLoadKw: number;
  pueValue: number;
  facilityPowerKw: number;
  annualEnergyMwh: number;
  estimatedAnnualCostUsd: number;
  coolingPowerKw: number;
};

const GPU_POWER_KW = 1.456;
const ENERGY_COST_PER_MWH = 85;
const PUE_AIR = 1.9;
const PUE_LIQUID = 1.2;

export function estimateBlackwellPUE(input: NvidiaBlackwellInput): NvidiaBlackwellResult {
  const totalGpus = input.rackCount * input.gpusPerRack;
  const peakItPowerKw = totalGpus * GPU_POWER_KW;
  const itLoadKw = (peakItPowerKw * input.utilizationPercent) / 100;
  const pueValue = input.coolingType === "liquid" ? PUE_LIQUID : PUE_AIR;
  const facilityPowerKw = itLoadKw * pueValue;
  const coolingPowerKw = facilityPowerKw - itLoadKw;

  const hoursPerYear = 8760;
  const annualEnergyMwh = (facilityPowerKw * hoursPerYear) / 1000;
  const estimatedAnnualCostUsd = annualEnergyMwh * ENERGY_COST_PER_MWH;

  return {
    totalGpus,
    itLoadKw: Math.round(itLoadKw * 100) / 100,
    pueValue,
    facilityPowerKw: Math.round(facilityPowerKw * 100) / 100,
    annualEnergyMwh: Math.round(annualEnergyMwh),
    estimatedAnnualCostUsd: Math.round(estimatedAnnualCostUsd),
    coolingPowerKw: Math.round(coolingPowerKw * 100) / 100,
  };
}
