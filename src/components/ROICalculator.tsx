import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react';
import { ProjectScenario, ROIAnalysis } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ROICalculatorProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ currentScenario, language }) => {
  const [revenueInputs, setRevenueInputs] = useState({
    salePrice: 0,
    rentalIncome: 0,
    rentalYears: 10,
    appreciationRate: 5,
    operatingCosts: 0,
    financingCosts: 0,
    discountRate: 8
  });

  const [roiAnalysis, setRoiAnalysis] = useState<ROIAnalysis | null>(null);

  const texts = {
    tr: {
      roiCalculator: 'Yatırım Getirisi Hesaplayıcısı',
      revenueAssumptions: 'Gelir Varsayımları',
      salePrice: 'Satış Fiyatı (TL)',
      rentalIncome: 'Aylık Kira Geliri (TL)',
      rentalYears: 'Kira Süresi (Yıl)',
      appreciationRate: 'Yıllık Değer Artış Oranı (%)',
      operatingCosts: 'Yıllık İşletme Maliyetleri (TL)',
      financingCosts: 'Finansman Maliyetleri (TL)',
      discountRate: 'İskonto Oranı (%)',
      calculate: 'Hesapla',
      results: 'Sonuçlar',
      totalInvestment: 'Toplam Yatırım',
      expectedRevenue: 'Beklenen Gelir',
      netProfit: 'Net Kar',
      roiPercentage: 'Yatırım Getirisi (%)',
      paybackPeriod: 'Geri Ödeme Süresi (Yıl)',
      irr: 'İç Verim Oranı (%)',
      npv: 'Net Bugünkü Değer',
      excellent: 'Mükemmel',
      good: 'İyi',
      average: 'Ortalama',
      poor: 'Zayıf',
      recommendation: 'Öneri'
    },
    en: {
      roiCalculator: 'ROI Calculator',
      revenueAssumptions: 'Revenue Assumptions',
      salePrice: 'Sale Price (TL)',
      rentalIncome: 'Monthly Rental Income (TL)',
      rentalYears: 'Rental Period (Years)',
      appreciationRate: 'Annual Appreciation Rate (%)',
      operatingCosts: 'Annual Operating Costs (TL)',
      financingCosts: 'Financing Costs (TL)',
      discountRate: 'Discount Rate (%)',
      calculate: 'Calculate',
      results: 'Results',
      totalInvestment: 'Total Investment',
      expectedRevenue: 'Expected Revenue',
      netProfit: 'Net Profit',
      roiPercentage: 'ROI Percentage (%)',
      paybackPeriod: 'Payback Period (Years)',
      irr: 'Internal Rate of Return (%)',
      npv: 'Net Present Value',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      poor: 'Poor',
      recommendation: 'Recommendation'
    }
  };

  const t = texts[language];

  const calculateROI = () => {
    const totalInvestment = currentScenario.costs.total + revenueInputs.financingCosts;
    const annualRental = revenueInputs.rentalIncome * 12;
    const totalRentalIncome = annualRental * revenueInputs.rentalYears;
    const futureValue = revenueInputs.salePrice * Math.pow(1 + revenueInputs.appreciationRate / 100, revenueInputs.rentalYears);
    const totalOperatingCosts = revenueInputs.operatingCosts * revenueInputs.rentalYears;
    
    const expectedRevenue = totalRentalIncome + futureValue;
    const netProfit = expectedRevenue - totalInvestment - totalOperatingCosts;
    const roiPercentage = (netProfit / totalInvestment) * 100;
    
    // Simple payback period calculation
    const paybackPeriod = totalInvestment / (annualRental - revenueInputs.operatingCosts);
    
    // Simplified NPV calculation
    let npv = -totalInvestment;
    for (let year = 1; year <= revenueInputs.rentalYears; year++) {
      const cashFlow = annualRental - revenueInputs.operatingCosts;
      npv += cashFlow / Math.pow(1 + revenueInputs.discountRate / 100, year);
    }
    npv += futureValue / Math.pow(1 + revenueInputs.discountRate / 100, revenueInputs.rentalYears);
    
    // Simplified IRR (approximation)
    const irr = ((expectedRevenue / totalInvestment) ** (1 / revenueInputs.rentalYears) - 1) * 100;

    setRoiAnalysis({
      totalInvestment,
      expectedRevenue,
      netProfit,
      roiPercentage,
      paybackPeriod,
      irr,
      npv
    });
  };

  const getROIRating = (roi: number) => {
    if (roi >= 20) return { label: t.excellent, color: 'text-green-600 bg-green-100' };
    if (roi >= 15) return { label: t.good, color: 'text-blue-600 bg-blue-100' };
    if (roi >= 10) return { label: t.average, color: 'text-yellow-600 bg-yellow-100' };
    return { label: t.poor, color: 'text-red-600 bg-red-100' };
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          {t.revenueAssumptions}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.salePrice}
            </label>
            <input
              type="number"
              value={revenueInputs.salePrice || ''}
              onChange={(e) => setRevenueInputs({
                ...revenueInputs,
                salePrice: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.rentalIncome}
            </label>
            <input
              type="number"
              value={revenueInputs.rentalIncome || ''}
              onChange={(e) => setRevenueInputs({
                ...revenueInputs,
                rentalIncome: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.rentalYears}
            </label>
            <input
              type="number"
              value={revenueInputs.rentalYears}
              onChange={(e) => setRevenueInputs({
                ...revenueInputs,
                rentalYears: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.appreciationRate}
            </label>
            <input
              type="number"
              value={revenueInputs.appreciationRate}
              onChange={(e) => setRevenueInputs({
                ...revenueInputs,
                appreciationRate: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.operatingCosts}
            </label>
            <input
              type="number"
              value={revenueInputs.operatingCosts || ''}
              onChange={(e) => setRevenueInputs({
                ...revenueInputs,
                operatingCosts: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.discountRate}
            </label>
            <input
              type="number"
              value={revenueInputs.discountRate}
              onChange={(e) => setRevenueInputs({
                ...revenueInputs,
                discountRate: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.1"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={calculateROI}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            {t.calculate}
          </button>
        </div>
      </div>

      {/* Results */}
      {roiAnalysis && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            {t.results}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(roiAnalysis.totalInvestment)}
              </div>
              <div className="text-sm text-blue-700">{t.totalInvestment}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(roiAnalysis.expectedRevenue)}
              </div>
              <div className="text-sm text-green-700">{t.expectedRevenue}</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(roiAnalysis.netProfit)}
              </div>
              <div className="text-sm text-purple-700">{t.netProfit}</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {roiAnalysis.roiPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-orange-700">{t.roiPercentage}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gray-800">
                {roiAnalysis.paybackPeriod.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">{t.paybackPeriod}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gray-800">
                {roiAnalysis.irr.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">{t.irr}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gray-800">
                {formatCurrency(roiAnalysis.npv)}
              </div>
              <div className="text-sm text-gray-600">{t.npv}</div>
            </div>
          </div>

          {/* ROI Rating */}
          <div className="mt-6 p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="font-medium">{t.recommendation}:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getROIRating(roiAnalysis.roiPercentage).color}`}>
                {getROIRating(roiAnalysis.roiPercentage).label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;