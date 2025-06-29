import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, PieChart, BarChart3, AlertTriangle } from 'lucide-react';
import { ProjectScenario, InvestmentAnalysis } from '../types';
import { formatCurrency } from '../utils/calculations';

interface InvestmentAnalyzerProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const InvestmentAnalyzer: React.FC<InvestmentAnalyzerProps> = ({ scenario, language }) => {
  const [investmentInputs, setInvestmentInputs] = useState({
    projectedSalePrice: scenario.costs.total * 1.4, // 40% markup
    rentalIncome: 0,
    operatingCosts: scenario.costs.total * 0.02, // 2% annually
    discountRate: 8, // 8% discount rate
    holdingPeriod: 5, // years
    appreciationRate: 5 // 5% annual appreciation
  });

  const [analysis, setAnalysis] = useState<InvestmentAnalysis | null>(null);

  const texts = {
    tr: {
      investmentAnalysis: 'Yatırım Analizi',
      projectedSalePrice: 'Tahmini Satış Fiyatı (TL)',
      rentalIncome: 'Yıllık Kira Geliri (TL)',
      operatingCosts: 'Yıllık İşletme Maliyetleri (TL)',
      discountRate: 'İskonto Oranı (%)',
      holdingPeriod: 'Elde Tutma Süresi (Yıl)',
      appreciationRate: 'Yıllık Değer Artış Oranı (%)',
      calculate: 'Hesapla',
      results: 'Sonuçlar',
      initialInvestment: 'İlk Yatırım',
      projectedRevenue: 'Tahmini Gelir',
      netIncome: 'Net Gelir',
      roi: 'Yatırım Getirisi (ROI)',
      paybackPeriod: 'Geri Ödeme Süresi',
      irr: 'İç Verim Oranı (IRR)',
      npv: 'Net Bugünkü Değer (NPV)',
      profitabilityIndex: 'Karlılık Endeksi',
      breakEvenPoint: 'Başabaş Noktası',
      sensitivityAnalysis: 'Duyarlılık Analizi',
      scenario: 'Senaryo',
      revenueChange: 'Gelir Değişimi',
      costChange: 'Maliyet Değişimi',
      resultingROI: 'Sonuç ROI',
      resultingNPV: 'Sonuç NPV',
      optimistic: 'İyimser',
      realistic: 'Gerçekçi',
      pessimistic: 'Kötümser',
      recommendations: 'Öneriler',
      riskAssessment: 'Risk Değerlendirmesi',
      years: 'yıl'
    },
    en: {
      investmentAnalysis: 'Investment Analysis',
      projectedSalePrice: 'Projected Sale Price (TL)',
      rentalIncome: 'Annual Rental Income (TL)',
      operatingCosts: 'Annual Operating Costs (TL)',
      discountRate: 'Discount Rate (%)',
      holdingPeriod: 'Holding Period (Years)',
      appreciationRate: 'Annual Appreciation Rate (%)',
      calculate: 'Calculate',
      results: 'Results',
      initialInvestment: 'Initial Investment',
      projectedRevenue: 'Projected Revenue',
      netIncome: 'Net Income',
      roi: 'Return on Investment (ROI)',
      paybackPeriod: 'Payback Period',
      irr: 'Internal Rate of Return (IRR)',
      npv: 'Net Present Value (NPV)',
      profitabilityIndex: 'Profitability Index',
      breakEvenPoint: 'Break Even Point',
      sensitivityAnalysis: 'Sensitivity Analysis',
      scenario: 'Scenario',
      revenueChange: 'Revenue Change',
      costChange: 'Cost Change',
      resultingROI: 'Resulting ROI',
      resultingNPV: 'Resulting NPV',
      optimistic: 'Optimistic',
      realistic: 'Realistic',
      pessimistic: 'Pessimistic',
      recommendations: 'Recommendations',
      riskAssessment: 'Risk Assessment',
      years: 'years'
    }
  };

  const t = texts[language];

  useEffect(() => {
    calculateInvestmentAnalysis();
  }, [investmentInputs, scenario]);

  const calculateInvestmentAnalysis = () => {
    const initialInvestment = scenario.costs.total;
    const { projectedSalePrice, rentalIncome, operatingCosts, discountRate, holdingPeriod, appreciationRate } = investmentInputs;
    
    // Calculate future value with appreciation
    const futureValue = projectedSalePrice * Math.pow(1 + appreciationRate / 100, holdingPeriod);
    
    // Calculate total rental income over holding period
    const totalRentalIncome = rentalIncome * holdingPeriod;
    
    // Calculate total operating costs
    const totalOperatingCosts = operatingCosts * holdingPeriod;
    
    // Total projected revenue
    const projectedRevenue = futureValue + totalRentalIncome;
    
    // Net income
    const netIncome = projectedRevenue - initialInvestment - totalOperatingCosts;
    
    // ROI calculation
    const roi = (netIncome / initialInvestment) * 100;
    
    // Simple payback period (without considering time value of money)
    const annualCashFlow = rentalIncome - operatingCosts;
    const paybackPeriod = annualCashFlow > 0 ? initialInvestment / annualCashFlow : holdingPeriod;
    
    // NPV calculation
    let npv = -initialInvestment;
    for (let year = 1; year <= holdingPeriod; year++) {
      const cashFlow = year === holdingPeriod ? 
        (rentalIncome - operatingCosts + futureValue) : 
        (rentalIncome - operatingCosts);
      npv += cashFlow / Math.pow(1 + discountRate / 100, year);
    }
    
    // IRR approximation (simplified)
    const totalCashFlow = projectedRevenue - totalOperatingCosts;
    const irr = (Math.pow(totalCashFlow / initialInvestment, 1 / holdingPeriod) - 1) * 100;
    
    // Profitability Index
    const profitabilityIndex = (npv + initialInvestment) / initialInvestment;
    
    // Break-even point
    const breakEvenPoint = initialInvestment / (rentalIncome - operatingCosts);
    
    // Sensitivity Analysis
    const sensitivityAnalysis = [
      {
        scenario: t.optimistic,
        revenueChange: 20,
        costChange: -10,
        resultingROI: ((projectedRevenue * 1.2 - (initialInvestment + totalOperatingCosts * 0.9)) / initialInvestment) * 100,
        resultingNPV: 0 // Simplified
      },
      {
        scenario: t.realistic,
        revenueChange: 0,
        costChange: 0,
        resultingROI: roi,
        resultingNPV: npv
      },
      {
        scenario: t.pessimistic,
        revenueChange: -15,
        costChange: 15,
        resultingROI: ((projectedRevenue * 0.85 - (initialInvestment + totalOperatingCosts * 1.15)) / initialInvestment) * 100,
        resultingNPV: 0 // Simplified
      }
    ];

    // Calculate NPV for sensitivity scenarios
    sensitivityAnalysis.forEach(scenario => {
      if (scenario.scenario !== t.realistic) {
        const adjustedRevenue = projectedRevenue * (1 + scenario.revenueChange / 100);
        const adjustedCosts = totalOperatingCosts * (1 + scenario.costChange / 100);
        let scenarioNPV = -initialInvestment;
        
        for (let year = 1; year <= holdingPeriod; year++) {
          const adjustedAnnualRevenue = adjustedRevenue / holdingPeriod;
          const adjustedAnnualCosts = adjustedCosts / holdingPeriod;
          const cashFlow = adjustedAnnualRevenue - adjustedAnnualCosts;
          scenarioNPV += cashFlow / Math.pow(1 + discountRate / 100, year);
        }
        scenario.resultingNPV = scenarioNPV;
      }
    });

    setAnalysis({
      initialInvestment,
      projectedRevenue,
      operatingCosts: totalOperatingCosts,
      netIncome,
      roi,
      paybackPeriod,
      irr,
      npv,
      profitabilityIndex,
      breakEvenPoint,
      sensitivityAnalysis
    });
  };

  const handleInputChange = (field: string, value: number) => {
    setInvestmentInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getROIColor = (roi: number) => {
    if (roi >= 20) return 'text-green-600';
    if (roi >= 10) return 'text-blue-600';
    if (roi >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getROIRating = (roi: number) => {
    if (roi >= 20) return 'Mükemmel';
    if (roi >= 15) return 'Çok İyi';
    if (roi >= 10) return 'İyi';
    if (roi >= 5) return 'Orta';
    return 'Zayıf';
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          {t.investmentAnalysis}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.projectedSalePrice}
            </label>
            <input
              type="number"
              value={investmentInputs.projectedSalePrice}
              onChange={(e) => handleInputChange('projectedSalePrice', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.rentalIncome}
            </label>
            <input
              type="number"
              value={investmentInputs.rentalIncome}
              onChange={(e) => handleInputChange('rentalIncome', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.operatingCosts}
            </label>
            <input
              type="number"
              value={investmentInputs.operatingCosts}
              onChange={(e) => handleInputChange('operatingCosts', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.discountRate}
            </label>
            <input
              type="number"
              value={investmentInputs.discountRate}
              onChange={(e) => handleInputChange('discountRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.holdingPeriod}
            </label>
            <input
              type="number"
              value={investmentInputs.holdingPeriod}
              onChange={(e) => handleInputChange('holdingPeriod', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="1"
              max="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.appreciationRate}
            </label>
            <input
              type="number"
              value={investmentInputs.appreciationRate}
              onChange={(e) => handleInputChange('appreciationRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {analysis && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">{t.roi}</span>
              </div>
              <div className={`text-2xl font-bold ${getROIColor(analysis.roi)}`}>
                {analysis.roi.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">{getROIRating(analysis.roi)}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <PieChart className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">{t.npv}</span>
              </div>
              <div className={`text-2xl font-bold ${analysis.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(analysis.npv)}
              </div>
              <div className="text-sm text-gray-600">
                {analysis.npv >= 0 ? 'Pozitif' : 'Negatif'}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-800">{t.irr}</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {analysis.irr.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">İç verim oranı</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-orange-800">{t.paybackPeriod}</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {analysis.paybackPeriod.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">{t.years}</div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Summary */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Yatırım Özeti</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.initialInvestment}:</span>
                  <span className="font-medium">{formatCurrency(analysis.initialInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.projectedRevenue}:</span>
                  <span className="font-medium">{formatCurrency(analysis.projectedRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">İşletme Maliyetleri:</span>
                  <span className="font-medium">{formatCurrency(analysis.operatingCosts)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600 font-medium">{t.netIncome}:</span>
                  <span className={`font-bold ${analysis.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(analysis.netIncome)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.profitabilityIndex}:</span>
                  <span className="font-medium">{analysis.profitabilityIndex.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">{t.riskAssessment}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Başabaş Süresi:</span>
                  <span className="font-medium">{analysis.breakEvenPoint.toFixed(1)} yıl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Seviyesi:</span>
                  <span className={`font-medium ${
                    analysis.roi >= 15 ? 'text-green-600' : 
                    analysis.roi >= 5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.roi >= 15 ? 'Düşük' : analysis.roi >= 5 ? 'Orta' : 'Yüksek'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Karlılık Durumu:</span>
                  <span className={`font-medium ${analysis.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.npv >= 0 ? 'Karlı' : 'Zararlı'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sensitivity Analysis */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{t.sensitivityAnalysis}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.scenario}</th>
                    <th className="text-center p-4 font-semibold">{t.revenueChange}</th>
                    <th className="text-center p-4 font-semibold">{t.costChange}</th>
                    <th className="text-right p-4 font-semibold">{t.resultingROI}</th>
                    <th className="text-right p-4 font-semibold">{t.resultingNPV}</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.sensitivityAnalysis.map((scenario, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-4 font-medium">{scenario.scenario}</td>
                      <td className="p-4 text-center">
                        {scenario.revenueChange > 0 ? '+' : ''}{scenario.revenueChange}%
                      </td>
                      <td className="p-4 text-center">
                        {scenario.costChange > 0 ? '+' : ''}{scenario.costChange}%
                      </td>
                      <td className={`p-4 text-right font-medium ${getROIColor(scenario.resultingROI)}`}>
                        {scenario.resultingROI.toFixed(1)}%
                      </td>
                      <td className={`p-4 text-right font-medium ${scenario.resultingNPV >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(scenario.resultingNPV)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {t.recommendations}
            </h4>
            <div className="space-y-2 text-sm text-blue-700">
              {analysis.roi >= 15 && <p>• Mükemmel yatırım fırsatı - Projeye devam edilmesi önerilir</p>}
              {analysis.roi >= 10 && analysis.roi < 15 && <p>• İyi bir yatırım fırsatı - Risk faktörleri değerlendirilmeli</p>}
              {analysis.roi >= 5 && analysis.roi < 10 && <p>• Orta seviye getiri - Alternatif yatırımlar karşılaştırılmalı</p>}
              {analysis.roi < 5 && <p>• Düşük getiri - Proje parametreleri gözden geçirilmeli</p>}
              
              {analysis.npv < 0 && <p>• NPV negatif - Proje ekonomik olarak uygun değil</p>}
              {analysis.paybackPeriod > 10 && <p>• Geri ödeme süresi uzun - Nakit akışı planlaması kritik</p>}
              
              <p>• Piyasa koşullarındaki değişimleri yakından takip edin</p>
              <p>• Kira gelirlerinin düzenli tahsil edilmesini sağlayın</p>
              <p>• İşletme maliyetlerini optimize etmeye odaklanın</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvestmentAnalyzer;