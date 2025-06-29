import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calculator, AlertTriangle, Target, DollarSign } from 'lucide-react';
import { ProjectScenario, ROIAnalysis, RiskFactor, TrendData, ComparisonProject } from '../types';
import { formatCurrency } from '../utils/calculations';
import ScenarioComparison from './ScenarioComparison';
import ROICalculator from './ROICalculator';
import RiskMatrix from './RiskMatrix';
import TrendAnalysis from './TrendAnalysis';

interface AdvancedAnalysisProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const AdvancedAnalysis: React.FC<AdvancedAnalysisProps> = ({ currentScenario, language }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'roi' | 'risk' | 'trends'>('comparison');

  const texts = {
    tr: {
      advancedAnalysis: 'Gelişmiş Analiz',
      scenarioComparison: 'Senaryo Karşılaştırması',
      roiAnalysis: 'Yatırım Getirisi Analizi',
      riskMatrix: 'Risk Matrisi',
      trendAnalysis: 'Trend Analizi',
      insights: 'Öngörüler ve Öneriler',
      keyMetrics: 'Anahtar Metrikler',
      recommendations: 'Öneriler'
    },
    en: {
      advancedAnalysis: 'Advanced Analysis',
      scenarioComparison: 'Scenario Comparison',
      roiAnalysis: 'ROI Analysis',
      riskMatrix: 'Risk Matrix',
      trendAnalysis: 'Trend Analysis',
      insights: 'Insights and Recommendations',
      keyMetrics: 'Key Metrics',
      recommendations: 'Recommendations'
    }
  };

  const t = texts[language];

  const tabs = [
    { id: 'comparison', label: t.scenarioComparison, icon: BarChart3 },
    { id: 'roi', label: t.roiAnalysis, icon: DollarSign },
    { id: 'risk', label: t.riskMatrix, icon: AlertTriangle },
    { id: 'trends', label: t.trendAnalysis, icon: TrendingUp }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg mr-4">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.advancedAnalysis}</h2>
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
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
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
      <div className="min-h-[400px]">
        {activeTab === 'comparison' && (
          <ScenarioComparison currentScenario={currentScenario} language={language} />
        )}
        {activeTab === 'roi' && (
          <ROICalculator currentScenario={currentScenario} language={language} />
        )}
        {activeTab === 'risk' && (
          <RiskMatrix currentScenario={currentScenario} language={language} />
        )}
        {activeTab === 'trends' && (
          <TrendAnalysis currentScenario={currentScenario} language={language} />
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalysis;