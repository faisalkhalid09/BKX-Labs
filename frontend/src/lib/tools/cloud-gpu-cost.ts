export type CloudProvider = "aws" | "azure" | "google-cloud" | "lambda";

export type CloundGpuInput = {
  gpuType: string;
  region: string;
  hoursPerMonth: number;
};

export type CloudGpuResult = {
  provider: CloudProvider;
  hourlyRate: number;
  monthlyCost: number;
  utilizationHours: number;
  costPerHour: number;
};

export type CloudGpuComparison = {
  results: CloudGpuResult[];
  cheapestProvider: CloudProvider;
  monthlySavings: number;
  cheapestCost: number;
};

const GPU_PRICING: Record<string, Record<CloudProvider, Record<string, number>>> = {
  "a100-40gb": {
    aws: { "us-east-1": 2.92, "eu-west-1": 3.21 },
    azure: { "us-east": 3.06, "uk-south": 3.41 },
    "google-cloud": { "us-central1": 2.93, "us-east1": 2.93 },
    lambda: { default: 0.0001 },
  },
  "a100-80gb": {
    aws: { "us-east-1": 4.88, "eu-west-1": 5.37 },
    azure: { "us-east": 5.12, "uk-south": 5.71 },
    "google-cloud": { "us-central1": 4.95, "us-east1": 4.95 },
    lambda: { default: 0.00015 },
  },
  "h100-80gb": {
    aws: { "us-east-1": 7.09, "eu-west-1": 7.81 },
    azure: { "us-east": 7.2, "uk-south": 8.0 },
    "google-cloud": { "us-central1": 7.25, "us-east1": 7.25 },
    lambda: { default: 0.0002 },
  },
  "v100-32gb": {
    aws: { "us-east-1": 3.06, "eu-west-1": 3.37 },
    azure: { "us-east": 2.97, "uk-south": 3.3 },
    "google-cloud": { "us-central1": 2.48, "us-east1": 2.48 },
    lambda: { default: 0.00008 },
  },
};

function getRate(gpuType: string, provider: CloudProvider, region: string): number {
  const gpu = GPU_PRICING[gpuType.toLowerCase()];
  if (!gpu) {
    return 2.5;
  }
  const providerRates = gpu[provider];
  if (!providerRates) {
    return 2.5;
  }
  const normalizedRegion = region.toLowerCase().replace(/\s+/g, "-");
  return providerRates[normalizedRegion] || Object.values(providerRates)[0] || 2.5;
}

export function compareCloudGpuCosts(input: CloundGpuInput): CloudGpuComparison {
  const providers: CloudProvider[] = ["aws", "azure", "google-cloud", "lambda"];

  const results = providers.map((provider) => {
    const hourlyRate = getRate(input.gpuType, provider, input.region);
    const monthlyCost = hourlyRate * input.hoursPerMonth;
    return {
      provider,
      hourlyRate,
      monthlyCost,
      utilizationHours: input.hoursPerMonth,
      costPerHour: hourlyRate,
    };
  });

  const cheapest = results.reduce((prev, curr) => (prev.monthlyCost < curr.monthlyCost ? prev : curr));
  const mostExpensive = results.reduce((prev, curr) => (prev.monthlyCost > curr.monthlyCost ? prev : curr));
  const monthlySavings = mostExpensive.monthlyCost - cheapest.monthlyCost;

  return {
    results,
    cheapestProvider: cheapest.provider,
    monthlySavings,
    cheapestCost: cheapest.monthlyCost,
  };
}
