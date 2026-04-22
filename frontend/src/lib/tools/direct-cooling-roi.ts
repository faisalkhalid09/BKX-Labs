export type DirectCoolingInput = {
  rackCount: number;
  airCoolingAnnualOpexUsd: number;
  liquidCoolingAnnualOpexUsd: number;
  liquidImplementationCostUsd: number;
};

export type DirectCoolingResult = {
  airCoolingTotal: number;
  liquidCoolingTotal: number;
  annualSavings: number;
  breakEvenMonths: number;
  roi5YearPercent: number;
};

export function calculateCoolingROI(input: DirectCoolingInput): DirectCoolingResult {
  const airCoolingTotal = input.airCoolingAnnualOpexUsd * 5;
  const liquidCoolingTotal = input.liquidCoolingAnnualOpexUsd * 5 + input.liquidImplementationCostUsd;
  const annualSavings = input.airCoolingAnnualOpexUsd - input.liquidCoolingAnnualOpexUsd;
  const breakEvenMonths =
    annualSavings > 0 ? Math.ceil((input.liquidImplementationCostUsd / annualSavings) * 12) : 999;

  const roi5YearPercent =
    input.liquidImplementationCostUsd > 0
      ? Math.round(((airCoolingTotal - liquidCoolingTotal) / input.liquidImplementationCostUsd) * 100)
      : 0;

  return {
    airCoolingTotal: Math.round(airCoolingTotal),
    liquidCoolingTotal: Math.round(liquidCoolingTotal),
    annualSavings: Math.round(annualSavings),
    breakEvenMonths,
    roi5YearPercent,
  };
}
