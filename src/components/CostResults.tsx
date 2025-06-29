import React from 'react';
import { TrendingUp, Download, Users, Clock, AlertTriangle } from 'lucide-react';
import { CostBreakdown, ProjectBasics, TechnicalSpecs, ProjectScenario } from '../types';
import { formatCurrency, calculateProjectDuration } from '../utils/calculations';
import { materialPrices } from '../data/costData';
import AdvancedAnalysis from './AdvancedAnalysis';
import ProjectManagement from './ProjectManagement';
import FinancialTools from './FinancialTools';
import SupplierProcurement from './SupplierProcurement';
import QualitySafetyManagement from './QualitySafetyManagement';

interface CostResultsProps {
  costs: CostBreakdown;
  basics: ProjectBasics;
  specs: TechnicalSpecs;
  language: 'tr' | 'en';
}

const CostResults: React.FC<CostResultsProps> = ({ costs, basics, specs, language }) => {
  const texts = {
    tr: {
      costAnalysis: 'Maliyet Analizi',
      executiveSummary: 'Yönetici Özeti',
      totalCost: 'Toplam Maliyet',
      costPerM2: 'm² Başına Maliyet',
      projectDuration: 'Proje Süresi',
      days: 'gün',
      detailedBreakdown: 'Detaylı Dökümü',
      constructioncosts: 'İnşaat Maliyetleri',
      materials: 'Malzemeler',
      labor: 'İşçilik',
      equipment: 'Ekipman',
      softCosts: 'Yumuşak Maliyetler',
      permits: 'İzinler',
      design: 'Tasarım',
      consulting: 'Danışmanlık',
      siteSpecific: 'Sahaya Özel',
      contingency: 'Beklenmedik Durumlar',
      materialPrices: 'Malzeme Fiyatları',
      category: 'Kategori',
      price: 'Fiyat',
      unit: 'Birim',
      suppliers: 'Tedarikçiler',
      deliveryTime: 'Teslimat Süresi',
      lastUpdated: 'Son Güncelleme',
      downloadReport: 'Raporu İndir',
      riskFactors: 'Risk Faktörleri',
      inflationRisk: 'Enflasyon riski: Fiyatlar 30 gün geçerlidir',
      seasonalRisk: 'Mevsimsel risk: Kış aylarında %5-10 artış olabilir',
      supplyRisk: 'Tedarik riski: Büyük projeler için erken sipariş gerekir'
    },
    en: {
      costAnalysis: 'Cost Analysis',
      executiveSummary: 'Executive Summary',
      totalCost: 'Total Cost',
      costPerM2: 'Cost per m²',
      projectDuration: 'Project Duration',
      days: 'days',
      detailedBreakdown: 'Detailed Breakdown',
      constructioncosts: 'Construction Costs',
      materials: 'Materials',
      labor: 'Labor',
      equipment: 'Equipment',
      softCosts: 'Soft Costs',
      permits: 'Permits',
      design: 'Design',
      consulting: 'Consulting',
      siteSpecific: 'Site Specific',
      contingency: 'Contingency',
      materialPrices: 'Material Prices',
      category: 'Category',
      price: 'Price',
      unit: 'Unit',
      suppliers: 'Suppliers',
      deliveryTime: 'Delivery Time',
      lastUpdated: 'Last Updated',
      downloadReport: 'Download Report',
      riskFactors: 'Risk Factors',
      inflationRisk: 'Inflation risk: Prices valid for 30 days',
      seasonalRisk: 'Seasonal risk: May increase 5-10% in winter months',
      supplyRisk: 'Supply risk: Early ordering required for large projects'
    }
  };

  const t = texts[language];
  const duration = calculateProjectDuration(basics.area, basics.buildingType);
  const costPerM2 = costs.total / basics.area;

  // Create current scenario for advanced analysis
  const currentScenario: ProjectScenario = {
    id: 'current-scenario',
    name: language === 'tr' ? 'Mevcut Proje' : 'Current Project',
    basics,
    specs,
    costs,
    createdAt: new Date().toISOString()
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2" />
          {t.executiveSummary}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{formatCurrency(costs.total)}</div>
            <div className="text-blue-100">{t.totalCost}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{formatCurrency(costPerM2)}</div>
            <div className="text-blue-100">{t.costPerM2}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 flex items-center">
            <Clock className="w-8 h-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{duration}</div>
              <div className="text-blue-100">{t.days}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality and Safety Management */}
      <QualitySafetyManagement currentScenario={currentScenario} language={language} />

      {/* Supplier and Procurement Management */}
      <SupplierProcurement currentScenario={currentScenario} language={language} />

      {/* Financial Tools */}
      <FinancialTools currentScenario={currentScenario} language={language} />

      {/* Project Management */}
      <ProjectManagement currentScenario={currentScenario} language={language} />

      {/* Advanced Analysis */}
      <AdvancedAnalysis currentScenario={currentScenario} language={language} />

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">{t.detailedBreakdown}</h3>
        
        {/* Construction Costs */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">{t.constructioncosts}</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{t.materials}</span>
              <span className="font-semibold">{formatCurrency(costs.construction.materials)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{t.labor}</span>
              <span className="font-semibold">{formatCurrency(costs.construction.labor)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{t.equipment}</span>
              <span className="font-semibold">{formatCurrency(costs.construction.equipment)}</span>
            </div>
          </div>
        </div>

        {/* Soft Costs */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">{t.softCosts}</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{t.permits}</span>
              <span className="font-semibold">{formatCurrency(costs.softCosts.permits)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{t.design}</span>
              <span className="font-semibold">{formatCurrency(costs.softCosts.design)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{t.consulting}</span>
              <span className="font-semibold">{formatCurrency(costs.softCosts.consulting)}</span>
            </div>
          </div>
        </div>

        {/* Other Costs */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>{t.siteSpecific}</span>
            <span className="font-semibold">{formatCurrency(costs.siteSpecific)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <span className="text-orange-800">{t.contingency} (15%)</span>
            <span className="font-semibold text-orange-800">{formatCurrency(costs.contingency)}</span>
          </div>
        </div>
      </div>

      {/* Material Prices */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">{t.materialPrices}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold">{t.category}</th>
                <th className="text-left p-3 font-semibold">{t.price}</th>
                <th className="text-left p-3 font-semibold">{t.unit}</th>
                <th className="text-left p-3 font-semibold">{t.suppliers}</th>
                <th className="text-left p-3 font-semibold">{t.deliveryTime}</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(materialPrices).map((material, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3 font-medium">{material.category}</td>
                  <td className="p-3">{formatCurrency(material.price)}</td>
                  <td className="p-3">{material.unit}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {material.suppliers.map((supplier, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {supplier}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">{material.deliveryTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center text-amber-800">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {t.riskFactors}
        </h3>
        <div className="space-y-2 text-amber-700">
          <p>• {t.inflationRisk}</p>
          <p>• {t.seasonalRisk}</p>
          <p>• {t.supplyRisk}</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center font-medium">
          <Download className="w-5 h-5 mr-2" />
          {t.downloadReport}
        </button>
      </div>
    </div>
  );
};

export default CostResults;