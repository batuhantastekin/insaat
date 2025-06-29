import { MaterialData } from '../types';

export const materialPrices: Record<string, MaterialData> = {
  concrete: {
    category: 'Beton C25/30',
    price: 850,
    unit: 'm³',
    suppliers: ['Akçansa', 'Nuh Çimento', 'Bursa Çimento'],
    deliveryTime: '2-3 gün',
    lastUpdated: '2025-01-15'
  },
  steel: {
    category: 'İnşaat Demiri S420',
    price: 28500,
    unit: 'ton',
    suppliers: ['Ereğli Demir Çelik', 'Çemtaş', 'İskenderun Demir Çelik'],
    deliveryTime: '5-7 gün',
    lastUpdated: '2025-01-15'
  },
  brick: {
    category: 'Tuğla 19cm',
    price: 2.8,
    unit: 'adet',
    suppliers: ['Ankara Tuğla', 'Wienerberger', 'Kale Tuğla'],
    deliveryTime: '3-5 gün',
    lastUpdated: '2025-01-15'
  },
  ceramic: {
    category: 'Seramik Fayans 1. Kalite',
    price: 85,
    unit: 'm²',
    suppliers: ['Vitra', 'VitrA', 'Kale Seramik'],
    deliveryTime: '1-2 gün',
    lastUpdated: '2025-01-15'
  },
  insulation: {
    category: 'Mantolama Sistemi XPS',
    price: 120,
    unit: 'm²',
    suppliers: ['Dow', 'BASF', 'Ravago'],
    deliveryTime: '2-4 gün',
    lastUpdated: '2025-01-15'
  },
  windows: {
    category: 'PVC Pencere Çift Cam',
    price: 750,
    unit: 'm²',
    suppliers: ['Rehau', 'Deceuninck', 'Veka'],
    deliveryTime: '10-15 gün',
    lastUpdated: '2025-01-15'
  }
};

export const laborRates = {
  skilled: 450, // TL per day
  semiskilled: 350,
  unskilled: 280,
  specialist: 650
};

export const regionalFactors: Record<string, number> = {
  'İstanbul': 1.15,
  'Ankara': 1.10,
  'İzmir': 1.08,
  'Bursa': 1.05,
  'Antalya': 1.12,
  'Adana': 0.95,
  'Gaziantep': 0.92,
  'Konya': 0.90,
  'Kayseri': 0.93,
  'Trabzon': 0.88
};

export const qualityMultipliers = {
  economic: 0.85,
  standard: 1.0,
  luxury: 1.35
};

export const buildingTypeFactors = {
  residential: 1.0,
  commercial: 1.15,
  industrial: 0.92
};