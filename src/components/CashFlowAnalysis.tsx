import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { ProjectScenario, CashFlowProjection } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CashFlowAnalysisProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const CashFlowAnalysis: React.FC<CashFlowAnalysisProps> = ({ scenario, language }) => {
  const [cashFlowData, setCashFlowData] = useState<CashFlowProjection[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  const texts = {
    tr: {
      cashFlowAnalysis: 'Nakit Akış Analizi',
      period: 'Dönem',
      inflows: 'Gelen Nakit',
      outflows: 'Giden Nakit',
      netCashFlow: 'Net Nakit Akışı',
      cumulativeCashFlow: 'Kümülatif Nakit Akışı',
      minimumBalance: 'Minimum Bakiye İhtiyacı',
      equity: 'Öz Kaynak',
      loan: 'Kredi',
      sales: 'Satış',
      materials: 'Malzemeler',
      labor: 'İşçilik',
      equipment: 'Ekipman',
      permits: 'İzinler',
      other: 'Diğer',
      total: 'Toplam',
      monthly: 'Aylık',
      quarterly: 'Üç Aylık',
      cashFlowSummary: 'Nakit Akış Özeti',
      peakFunding: 'Maksimum Finansman İhtiyacı',
      totalInflows: 'Toplam Gelen',
      totalOutflows: 'Toplam Giden',
      finalBalance: 'Son Bakiye',
      recommendations: 'Öneriler'
    },
    en: {
      cashFlowAnalysis: 'Cash Flow Analysis',
      period: 'Period',
      inflows: 'Cash Inflows',
      outflows: 'Cash Outflows',
      netCashFlow: 'Net Cash Flow',
      cumulativeCashFlow: 'Cumulative Cash Flow',
      minimumBalance: 'Minimum Balance Required',
      equity: 'Equity',
      loan: 'Loan',
      sales: 'Sales',
      materials: 'Materials',
      labor: 'Labor',
      equipment: 'Equipment',
      permits: 'Permits',
      other: 'Other',
      total: 'Total',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      cashFlowSummary: 'Cash Flow Summary',
      peakFunding: 'Peak Funding Requirement',
      totalInflows: 'Total Inflows',
      totalOutflows: 'Total Outflows',
      finalBalance: 'Final Balance',
      recommendations: 'Recommendations'
    }
  };

  const t = texts[language];

  useEffect(() => {
    generateCashFlowProjections();
  }, [scenario, selectedPeriod]);

  const generateCashFlowProjections = () => {
    const startDate = new Date(scenario.basics.startDate || new Date());
    const totalCost = scenario.costs.total;
    const projectDuration = Math.ceil(scenario.basics.area * 0.8 / 30); // months
    const periods = selectedPeriod === 'monthly' ? projectDuration : Math.ceil(projectDuration / 3);
    
    const projections: CashFlowProjection[] = [];
    let cumulativeFlow = 0;

    for (let i = 0; i < periods; i++) {
      const periodDate = new Date(startDate);
      if (selectedPeriod === 'monthly') {
        periodDate.setMonth(periodDate.getMonth() + i);
      } else {
        periodDate.setMonth(periodDate.getMonth() + (i * 3));
      }

      // Calculate inflows
      const equity = i === 0 ? totalCost * 0.3 : 0; // 30% equity at start
      const loan = i === 0 ? totalCost * 0.7 : 0; // 70% loan at start
      const sales = i >= periods - 2 ? totalCost * 1.2 : 0; // Sales at end
      const otherInflows = 0;
      const totalInflows = equity + loan + sales + otherInflows;

      // Calculate outflows based on construction phases
      const phaseMultiplier = selectedPeriod === 'monthly' ? 1 : 3;
      const materials = (totalCost * 0.55) / periods * phaseMultiplier;
      const labor = (totalCost * 0.30) / periods * phaseMultiplier;
      const equipment = (totalCost * 0.15) / periods * phaseMultiplier;
      const permits = i === 0 ? scenario.costs.softCosts.permits : 0;
      const otherOutflows = (scenario.costs.softCosts.design + scenario.costs.softCosts.consulting) / periods * phaseMultiplier;
      const totalOutflows = materials + labor + equipment + permits + otherOutflows;

      const netCashFlow = totalInflows - totalOutflows;
      cumulativeFlow += netCashFlow;
      const minimumBalance = Math.max(0, -cumulativeFlow);

      projections.push({
        month: i + 1,
        period: periodDate.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
          year: 'numeric',
          month: 'short',
          ...(selectedPeriod === 'monthly' ? {} : { day: 'numeric' })
        }),
        inflows: {
          equity,
          loan,
          sales,
          other: otherInflows,
          total: totalInflows
        },
        outflows: {
          materials,
          labor,
          equipment,
          permits,
          other: otherOutflows,
          total: totalOutflows
        },
        netCashFlow,
        cumulativeCashFlow: cumulativeFlow,
        minimumBalance
      });
    }

    setCashFlowData(projections);
  };

  const totalInflows = cashFlowData.reduce((sum, period) => sum + period.inflows.total, 0);
  const totalOutflows = cashFlowData.reduce((sum, period) => sum + period.outflows.total, 0);
  const peakFunding = Math.max(...cashFlowData.map(p => Math.abs(Math.min(0, p.cumulativeCashFlow))));
  const finalBalance = cashFlowData.length > 0 ? cashFlowData[cashFlowData.length - 1].cumulativeCashFlow : 0;

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.cashFlowAnalysis}</h3>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'monthly'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.monthly}
          </button>
          <button
            onClick={() => setSelectedPeriod('quarterly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'quarterly'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.quarterly}
          </button>
        </div>
      </div>

      {/* Cash Flow Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.totalInflows}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalInflows)}
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.totalOutflows}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(totalOutflows)}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.peakFunding}</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(peakFunding)}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.finalBalance}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(finalBalance)}
          </div>
        </div>
      </div>

      {/* Cash Flow Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">{t.period}</th>
                <th className="text-right p-3 font-semibold text-green-700">{t.inflows}</th>
                <th className="text-right p-3 font-semibold text-red-700">{t.outflows}</th>
                <th className="text-right p-3 font-semibold">{t.netCashFlow}</th>
                <th className="text-right p-3 font-semibold">{t.cumulativeCashFlow}</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((period, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3 font-medium">{period.period}</td>
                  <td className="p-3 text-right text-green-600 font-medium">
                    {formatCurrency(period.inflows.total)}
                  </td>
                  <td className="p-3 text-right text-red-600 font-medium">
                    {formatCurrency(period.outflows.total)}
                  </td>
                  <td className={`p-3 text-right font-medium ${
                    period.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(period.netCashFlow)}
                  </td>
                  <td className={`p-3 text-right font-medium ${
                    period.cumulativeCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(period.cumulativeCashFlow)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inflows Breakdown */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">{t.inflows} Detayı</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t.equity}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.inflows.equity, 0))}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.loan}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.inflows.loan, 0))}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.sales}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.inflows.sales, 0))}</span>
            </div>
          </div>
        </div>

        {/* Outflows Breakdown */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-3">{t.outflows} Detayı</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t.materials}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.outflows.materials, 0))}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.labor}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.outflows.labor, 0))}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.equipment}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.outflows.equipment, 0))}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.permits}:</span>
              <span className="font-medium">{formatCurrency(cashFlowData.reduce((sum, p) => sum + p.outflows.permits, 0))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          {t.recommendations}
        </h4>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Maksimum finansman ihtiyacı: {formatCurrency(peakFunding)}</p>
          <p>• Kredi limitinizin en az bu tutarda olması önerilir</p>
          <p>• Nakit akışının negatif olduğu dönemlerde ek finansman planlaması yapın</p>
          <p>• Satış gelirlerinin zamanında tahsil edilmesi kritik öneme sahiptir</p>
          {finalBalance > 0 && <p>• Proje sonunda {formatCurrency(finalBalance)} pozitif nakit akışı beklenmektedir</p>}
        </div>
      </div>
    </div>
  );
};

export default CashFlowAnalysis;