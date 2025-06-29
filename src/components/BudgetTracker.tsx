import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { ProjectScenario, BudgetTracking } from '../types';
import { formatCurrency } from '../utils/calculations';

interface BudgetTrackerProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ scenario, language }) => {
  const [budgetData, setBudgetData] = useState<BudgetTracking[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'current' | 'projected'>('current');

  const texts = {
    tr: {
      budgetTracking: 'Bütçe Takibi',
      category: 'Kategori',
      budgeted: 'Bütçelenen',
      actual: 'Gerçekleşen',
      variance: 'Fark',
      variancePercentage: 'Fark %',
      status: 'Durum',
      forecast: 'Tahmin',
      explanation: 'Açıklama',
      underBudget: 'Bütçe Altında',
      onBudget: 'Bütçede',
      overBudget: 'Bütçe Aşımı',
      current: 'Mevcut',
      projected: 'Tahmini',
      budgetSummary: 'Bütçe Özeti',
      totalBudget: 'Toplam Bütçe',
      totalActual: 'Toplam Gerçekleşen',
      totalVariance: 'Toplam Fark',
      budgetUtilization: 'Bütçe Kullanımı',
      criticalAreas: 'Kritik Alanlar',
      recommendations: 'Öneriler',
      alerts: 'Uyarılar'
    },
    en: {
      budgetTracking: 'Budget Tracking',
      category: 'Category',
      budgeted: 'Budgeted',
      actual: 'Actual',
      variance: 'Variance',
      variancePercentage: 'Variance %',
      status: 'Status',
      forecast: 'Forecast',
      explanation: 'Explanation',
      underBudget: 'Under Budget',
      onBudget: 'On Budget',
      overBudget: 'Over Budget',
      current: 'Current',
      projected: 'Projected',
      budgetSummary: 'Budget Summary',
      totalBudget: 'Total Budget',
      totalActual: 'Total Actual',
      totalVariance: 'Total Variance',
      budgetUtilization: 'Budget Utilization',
      criticalAreas: 'Critical Areas',
      recommendations: 'Recommendations',
      alerts: 'Alerts'
    }
  };

  const t = texts[language];

  useEffect(() => {
    generateBudgetData();
  }, [scenario, selectedPeriod]);

  const generateBudgetData = () => {
    const costs = scenario.costs;
    
    // Generate realistic actual costs with some variance
    const generateActual = (budgeted: number, varianceRange: number = 0.1) => {
      const variance = (Math.random() - 0.5) * 2 * varianceRange;
      return budgeted * (1 + variance);
    };

    const budgetItems: BudgetTracking[] = [
      {
        category: language === 'tr' ? 'Malzemeler' : 'Materials',
        budgeted: costs.construction.materials,
        actual: generateActual(costs.construction.materials, 0.08),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.construction.materials * 1.02,
        explanation: language === 'tr' 
          ? 'Çelik fiyatlarında artış gözlendi' 
          : 'Steel price increase observed'
      },
      {
        category: language === 'tr' ? 'İşçilik' : 'Labor',
        budgeted: costs.construction.labor,
        actual: generateActual(costs.construction.labor, 0.12),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.construction.labor * 1.05,
        explanation: language === 'tr' 
          ? 'Usta ücretlerinde mevsimsel artış' 
          : 'Seasonal increase in craftsman wages'
      },
      {
        category: language === 'tr' ? 'Ekipman' : 'Equipment',
        budgeted: costs.construction.equipment,
        actual: generateActual(costs.construction.equipment, 0.06),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.construction.equipment * 0.98,
        explanation: language === 'tr' 
          ? 'Ekipman kiralama maliyetleri stabil' 
          : 'Equipment rental costs stable'
      },
      {
        category: language === 'tr' ? 'İzinler' : 'Permits',
        budgeted: costs.softCosts.permits,
        actual: generateActual(costs.softCosts.permits, 0.15),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.softCosts.permits,
        explanation: language === 'tr' 
          ? 'Belediye harçlarında artış' 
          : 'Municipal fee increase'
      },
      {
        category: language === 'tr' ? 'Tasarım' : 'Design',
        budgeted: costs.softCosts.design,
        actual: generateActual(costs.softCosts.design, 0.05),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.softCosts.design,
        explanation: language === 'tr' 
          ? 'Tasarım giderleri planlandığı gibi' 
          : 'Design costs as planned'
      },
      {
        category: language === 'tr' ? 'Danışmanlık' : 'Consulting',
        budgeted: costs.softCosts.consulting,
        actual: generateActual(costs.softCosts.consulting, 0.10),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.softCosts.consulting * 1.03,
        explanation: language === 'tr' 
          ? 'Ek danışmanlık hizmetleri gerekti' 
          : 'Additional consulting services required'
      },
      {
        category: language === 'tr' ? 'Saha Özel' : 'Site Specific',
        budgeted: costs.siteSpecific,
        actual: generateActual(costs.siteSpecific, 0.20),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.siteSpecific * 1.08,
        explanation: language === 'tr' 
          ? 'Beklenmedik zemin koşulları' 
          : 'Unexpected soil conditions'
      },
      {
        category: language === 'tr' ? 'Beklenmedik Durumlar' : 'Contingency',
        budgeted: costs.contingency,
        actual: generateActual(costs.contingency, 0.30),
        variance: 0,
        variancePercentage: 0,
        status: 'on-budget',
        forecast: costs.contingency * 0.85,
        explanation: language === 'tr' 
          ? 'Rezerv fonun bir kısmı kullanıldı' 
          : 'Part of reserve fund utilized'
      }
    ];

    // Calculate variance and status for each item
    budgetItems.forEach(item => {
      item.variance = item.actual - item.budgeted;
      item.variancePercentage = (item.variance / item.budgeted) * 100;
      
      if (Math.abs(item.variancePercentage) <= 5) {
        item.status = 'on-budget';
      } else if (item.variancePercentage < -5) {
        item.status = 'under-budget';
      } else {
        item.status = 'over-budget';
      }
    });

    setBudgetData(budgetItems);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'under-budget': 'bg-green-100 text-green-800',
      'on-budget': 'bg-blue-100 text-blue-800',
      'over-budget': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors['on-budget'];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'under-budget': TrendingDown,
      'on-budget': CheckCircle,
      'over-budget': TrendingUp
    };
    return icons[status as keyof typeof icons] || CheckCircle;
  };

  const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = budgetData.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalBudgeted;
  const totalVariancePercentage = (totalVariance / totalBudgeted) * 100;
  const budgetUtilization = (totalActual / totalBudgeted) * 100;

  const overBudgetItems = budgetData.filter(item => item.status === 'over-budget');
  const criticalItems = budgetData.filter(item => Math.abs(item.variancePercentage) > 10);

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.budgetTracking}</h3>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setSelectedPeriod('current')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'current'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.current}
          </button>
          <button
            onClick={() => setSelectedPeriod('projected')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'projected'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.projected}
          </button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.totalBudget}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalBudgeted)}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.totalActual}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {formatCurrency(totalActual)}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.totalVariance}</span>
          </div>
          <div className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
          </div>
          <div className="text-sm text-orange-700">
            {totalVariancePercentage >= 0 ? '+' : ''}{totalVariancePercentage.toFixed(1)}%
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.budgetUtilization}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {budgetUtilization.toFixed(1)}%
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Budget Tracking Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold">{t.category}</th>
                <th className="text-right p-4 font-semibold">{t.budgeted}</th>
                <th className="text-right p-4 font-semibold">{t.actual}</th>
                <th className="text-right p-4 font-semibold">{t.variance}</th>
                <th className="text-center p-4 font-semibold">{t.status}</th>
                <th className="text-right p-4 font-semibold">{t.forecast}</th>
                <th className="text-left p-4 font-semibold">{t.explanation}</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((item, index) => {
                const StatusIcon = getStatusIcon(item.status);
                return (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-4 font-medium">{item.category}</td>
                    <td className="p-4 text-right">{formatCurrency(item.budgeted)}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(item.actual)}</td>
                    <td className={`p-4 text-right font-medium ${
                      item.variance >= 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                      <div className="text-xs">
                        ({item.variancePercentage >= 0 ? '+' : ''}{item.variancePercentage.toFixed(1)}%)
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <StatusIcon className="w-4 h-4 mr-1" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {t[item.status.replace('-', '') as keyof typeof t]}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">{formatCurrency(item.forecast)}</td>
                    <td className="p-4 text-sm text-gray-600">{item.explanation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Areas & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Areas */}
        {criticalItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="font-semibold text-red-800 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {t.criticalAreas}
            </h4>
            <div className="space-y-3">
              {criticalItems.map((item, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-red-900">{item.category}</span>
                    <span className="text-red-600 font-bold">
                      {item.variancePercentage >= 0 ? '+' : ''}{item.variancePercentage.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-3">{t.recommendations}</h4>
          <div className="space-y-2 text-sm text-blue-700">
            {overBudgetItems.length > 0 && (
              <p>• {overBudgetItems.length} kategoride bütçe aşımı var - acil önlem gerekli</p>
            )}
            {totalVariancePercentage > 5 && (
              <p>• Toplam bütçe aşımı %{totalVariancePercentage.toFixed(1)} - maliyet kontrolü yapın</p>
            )}
            <p>• Haftalık bütçe takibi yaparak erken müdahale edin</p>
            <p>• Tedarikçilerle fiyat revizyonu görüşmeleri başlatın</p>
            <p>• Alternatif malzeme ve yöntemleri değerlendirin</p>
            <p>• Beklenmedik durum fonunu koruyun</p>
            {budgetUtilization < 90 && (
              <p>• Bütçe kullanımı düşük - hızlandırma fırsatları değerlendirin</p>
            )}
          </div>
        </div>
      </div>

      {/* Budget Performance Chart */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Bütçe Performans Özeti</h4>
        <div className="space-y-4">
          {budgetData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-700 truncate">
                {item.category}
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      item.status === 'over-budget' ? 'bg-red-500' :
                      item.status === 'under-budget' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((item.actual / item.budgeted) * 100, 100)}%` }}
                  ></div>
                  {item.actual > item.budgeted && (
                    <div className="absolute top-0 right-0 h-4 w-2 bg-red-600 rounded-r-full"></div>
                  )}
                </div>
              </div>
              <div className="w-20 text-right text-sm font-semibold">
                {((item.actual / item.budgeted) * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;