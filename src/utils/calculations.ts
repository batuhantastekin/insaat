import { ProjectBasics, TechnicalSpecs, CostBreakdown } from '../types';
import { regionalFactors, qualityMultipliers, buildingTypeFactors, laborRates } from '../data/costData';

export function calculateBaseCostPerM2(
  buildingType: string,
  qualityLevel: string,
  structuralSystem: string,
  floors: number
): number {
  const baseCosts = {
    residential: {
      economic: 3200,
      standard: 4500,
      luxury: 7200
    },
    commercial: {
      economic: 3800,
      standard: 5200,
      luxury: 8500
    },
    industrial: {
      economic: 2800,
      standard: 3900,
      luxury: 6200
    }
  };

  let baseRate = baseCosts[buildingType as keyof typeof baseCosts][qualityLevel as keyof typeof baseCosts.residential];
  
  // Structural system adjustment
  const structuralAdjustments = {
    concrete: 1.0,
    steel: 1.12,
    mixed: 1.08
  };
  
  baseRate *= structuralAdjustments[structuralSystem as keyof typeof structuralAdjustments];
  
  // Floor adjustment (higher buildings cost more per m²)
  if (floors > 5) {
    baseRate *= 1 + ((floors - 5) * 0.03);
  }
  
  return baseRate;
}

export function calculateDetailedCosts(
  basics: ProjectBasics,
  specs: TechnicalSpecs
): CostBreakdown {
  const baseCostPerM2 = calculateBaseCostPerM2(
    basics.buildingType,
    basics.qualityLevel,
    specs.structuralSystem,
    specs.floors
  );
  
  const regionalFactor = regionalFactors[basics.location.city] || 1.0;
  const adjustedBaseCost = baseCostPerM2 * regionalFactor;
  
  const constructionTotal = adjustedBaseCost * basics.area;
  
  // Breakdown construction costs
  const materials = constructionTotal * 0.55;
  const labor = constructionTotal * 0.30;
  const equipment = constructionTotal * 0.15;
  
  // Soft costs calculation
  const permits = constructionTotal * 0.025;
  const design = constructionTotal * 0.08;
  const consulting = constructionTotal * 0.035;
  
  // Site specific costs (varies by location and site conditions)
  const siteSpecific = constructionTotal * 0.12;
  
  // Contingency (15%)
  const subtotal = constructionTotal + permits + design + consulting + siteSpecific;
  const contingency = subtotal * 0.15;
  
  const total = subtotal + contingency;
  
  return {
    construction: {
      materials,
      labor,
      equipment
    },
    softCosts: {
      permits,
      design,
      consulting
    },
    siteSpecific,
    contingency,
    total
  };
}

export function formatCurrency(amount: number, currency = 'TL'): string {
  return new Intl.NumberFormat('tr-TR').format(amount) + ' ' + currency;
}

export function calculateProjectDuration(area: number, buildingType: string): number {
  const baseDaysPerM2 = {
    residential: 0.8,
    commercial: 0.9,
    industrial: 0.7
  };
  
  const daysPerM2 = baseDaysPerM2[buildingType as keyof typeof baseDaysPerM2];
  return Math.ceil(area * daysPerM2);
}