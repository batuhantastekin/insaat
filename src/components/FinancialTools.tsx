import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calculator, PieChart, AlertTriangle, CreditCard } from 'lucide-react';
import { ProjectScenario, FinancialReport } from '../types';
import CashFlowAnalysis from './CashFlowAnalysis';
import FinancingOptions from './FinancingOptions';
import LoanCalculator from './LoanCalculator';
import InvestmentAnalyzer from './InvestmentAnalyzer';
import TaxCalculator from './TaxCalculator';
import BudgetTracker from './BudgetTracker';

interface FinancialToolsProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const FinancialTools: React.FC<FinancialToolsProps> = ({ currentScenario, language }) => {
  const [activeTab, setActiveTab] = useState<'cashflow' | 'financing' | 'loans' | 'investment' | 'taxes' | 'budget'>('cashflow');

  const texts = {
    tr: {
      financialTools: 'Finansal Araçlar',
      cashFlowAnalysis: 'Nakit Akış Analizi',
      financingOptions: 'Finansman Seçenekleri',
      loanCalculator: 'Kredi Hesaplayıcısı',
      investmentAnalysis: 'Yatırım Analizi',
      taxCalculator: 'Vergi Hesaplayıcısı',
      budgetTracking: 'Bütçe Takibi',
      overview: 'Genel Bakış',
      totalInvestment: 'Toplam Yatırım',
      expectedReturn: 'Beklenen Getiri',
      financingNeeded: 'Finansman İhtiyacı',
      riskLevel: 'Risk Seviyesi',
      recommendations: 'Öneriler',
      alerts: 'Uyarılar'
    },
    en: {
      financialTools: 'Financial Tools',
      cashFlowAnalysis: 'Cash Flow Analysis',
      financingOptions: 'Financing Options',
      loanCalculator: 'Loan Calculator',
      investmentAnalysis: 'Investment Analysis',
      taxCalculator: 'Tax Calculator',
      budgetTracking: 'Budget Tracking',
      overview: 'Overview',
      totalInvestment: 'Total Investment',
      expectedReturn: 'Expected Return',
      financingNeeded: 'Financing Needed',
      riskLevel: 'Risk Level',
      recommendations: 'Recommendations',
      alerts: 'Alerts'
    }
  };

  const t = texts[language];

  const tabs = [
    { id: 'cashflow', label: t.cashFlowAnalysis, icon: TrendingUp },
    { id: 'financing', label: t.financingOptions, icon: CreditCard },
    { id: 'loans', label: t.loanCalculator, icon: Calculator },
    { id: 'investment', label: t.investmentAnalysis, icon: PieChart },
    { id: 'taxes', label: t.taxCalculator, icon: DollarSign },
    { id: 'budget', label: t.budgetTracking, icon: AlertTriangle }
  ];

  // Generate financial overview data
  const generateFinancialOverview = () => {
    const totalInvestment = currentScenario.costs.total;
    const expectedReturn = totalInvestment * 1.25; // 25% return assumption
    const financingNeeded = totalInvestment * 0.7; // 70% financing assumption
    const riskLevel = 'Orta'; // Medium risk

    return {
      totalInvestment,
      expectedReturn,
      financingNeeded,
      riskLevel
    };
  };

  const financialOverview = generateFinancialOverview();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-lg mr-4">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.financialTools}</h2>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.totalInvestment}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {new Intl.NumberFormat('tr-TR').format(financialOverview.totalInvestment)} TL
          </div>
          <div className="text-sm text-blue-700">Ana yatırım</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.expectedReturn}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {new Intl.NumberFormat('tr-TR').format(financialOverview.expectedReturn)} TL
          </div>
          <div className="text-sm text-green-700">Tahmini getiri</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <CreditCard className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.financingNeeded}</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {new Intl.NumberFormat('tr-TR').format(financialOverview.financingNeeded)} TL
          </div>
          <div className="text-sm text-orange-700">Kredi ihtiyacı</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.riskLevel}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {financialOverview.riskLevel}
          </div>
          <div className="text-sm text-purple-700">Risk değerlendirmesi</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors mr-2 mb-2 rounded-t-lg ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'cashflow' && (
          <CashFlowAnalysis scenario={currentScenario} language={language} />
        )}
        {activeTab === 'financing' && (
          <FinancingOptions scenario={currentScenario} language={language} />
        )}
        {activeTab === 'loans' && (
          <LoanCalculator scenario={currentScenario} language={language} />
        )}
        {activeTab === 'investment' && (
          <InvestmentAnalyzer scenario={currentScenario} language={language} />
        )}
        {activeTab === 'taxes' && (
          <TaxCalculator scenario={currentScenario} language={language} />
        )}
        {activeTab === 'budget' && (
          <BudgetTracker scenario={currentScenario} language={language} />
        )}
      </div>
    </div>
  );
};

export default FinancialTools;