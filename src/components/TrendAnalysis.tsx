import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react';
import { ProjectScenario, TrendData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface TrendAnalysisProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ currentScenario, language }) => {
  const texts = {
    tr: {
      trendAnalysis: 'Trend Analizi',
      historicalData: 'Geçmiş Veriler',
      priceProjections: 'Fiyat Projeksiyonları',
      period: 'Dönem',
      materialCosts: 'Malzeme Maliyetleri',
      laborCosts: 'İşçilik Maliyetleri',
      totalCosts: 'Toplam Maliyetler',
      inflationRate: 'Enflasyon Oranı',
      trend: 'Trend',
      increasing: 'Artış',
      decreasing: 'Azalış',
      stable: 'Sabit',
      forecast: 'Tahmin',
      recommendations: 'Öneriler',
      bestTime: 'En İyi Başlangıç Zamanı',
      riskPeriods: 'Riskli Dönemler',
      costOptimization: 'Maliyet Optimizasyonu'
    },
    en: {
      trendAnalysis: 'Trend Analysis',
      historicalData: 'Historical Data',
      priceProjections: 'Price Projections',
      period: 'Period',
      materialCosts: 'Material Costs',
      laborCosts: 'Labor Costs',
      totalCosts: 'Total Costs',
      inflationRate: 'Inflation Rate',
      trend: 'Trend',
      increasing: 'Increasing',
      decreasing: 'Decreasing',
      stable: 'Stable',
      forecast: 'Forecast',
      recommendations: 'Recommendations',
      bestTime: 'Best Start Time',
      riskPeriods: 'Risk Periods',
      costOptimization: 'Cost Optimization'
    }
  };

  const t = texts[language];

  // Generate sample trend data
  const generateTrendData = (): TrendData[] => {
    const baseDate = new Date();
    const data: TrendData[] = [];
    
    // Historical data (last 12 months)
    for (let i = 11; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() - i);
      
      const materialInflation = 1 + (Math.random() * 0.1 - 0.05); // -5% to +5%
      const laborInflation = 1 + (Math.random() * 0.08 - 0.04); // -4% to +4%
      const overallInflation = (materialInflation + laborInflation) / 2;
      
      data.push({
        period: date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
          year: 'numeric', 
          month: 'short' 
        }),
        materialCosts: currentScenario.costs.construction.materials * materialInflation,
        laborCosts: currentScenario.costs.construction.labor * laborInflation,
        totalCosts: currentScenario.costs.total * overallInflation,
        inflationRate: (overallInflation - 1) * 100
      });
    }

    // Future projections (next 6 months)
    for (let i = 1; i <= 6; i++) {
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() + i);
      
      const materialInflation = 1 + (0.02 * i); // 2% monthly increase
      const laborInflation = 1 + (0.015 * i); // 1.5% monthly increase
      const overallInflation = (materialInflation + laborInflation) / 2;
      
      data.push({
        period: date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
          year: 'numeric', 
          month: 'short' 
        }),
        materialCosts: currentScenario.costs.construction.materials * materialInflation,
        laborCosts: currentScenario.costs.construction.labor * laborInflation,
        totalCosts: currentScenario.costs.total * overallInflation,
        inflationRate: (overallInflation - 1) * 100
      });
    }

    return data;
  };

  const trendData = generateTrendData();
  const currentIndex = 12; // Current month index
  const currentData = trendData[currentIndex - 1];
  const nextMonthData = trendData[currentIndex];
  
  const getTrendDirection = (current: number, next: number) => {
    const change = ((next - current) / current) * 100;
    if (change > 1) return { direction: 'increasing', icon: TrendingUp, color: 'text-red-600' };
    if (change < -1) return { direction: 'decreasing', icon: TrendingDown, color: 'text-green-600' };
    return { direction: 'stable', icon: BarChart3, color: 'text-gray-600' };
  };

  const materialTrend = getTrendDirection(currentData.materialCosts, nextMonthData.materialCosts);
  const laborTrend = getTrendDirection(currentData.laborCosts, nextMonthData.laborCosts);
  const totalTrend = getTrendDirection(currentData.totalCosts, nextMonthData.totalCosts);

  return (
    <div className="space-y-6">
      {/* Trend Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{t.materialCosts}</span>
            <materialTrend.icon className={`w-5 h-5 ${materialTrend.color}`} />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(currentData.materialCosts)}</div>
          <div className={`text-sm ${materialTrend.color}`}>
            {t[materialTrend.direction]}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{t.laborCosts}</span>
            <laborTrend.icon className={`w-5 h-5 ${laborTrend.color}`} />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(currentData.laborCosts)}</div>
          <div className={`text-sm ${laborTrend.color}`}>
            {t[laborTrend.direction]}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{t.totalCosts}</span>
            <totalTrend.icon className={`w-5 h-5 ${totalTrend.color}`} />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(currentData.totalCosts)}</div>
          <div className={`text-sm ${totalTrend.color}`}>
            {t[totalTrend.direction]}
          </div>
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            {t.historicalData} & {t.priceProjections}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold">{t.period}</th>
                <th className="text-right p-4 font-semibold">{t.materialCosts}</th>
                <th className="text-right p-4 font-semibold">{t.laborCosts}</th>
                <th className="text-right p-4 font-semibold">{t.totalCosts}</th>
                <th className="text-right p-4 font-semibold">{t.inflationRate}</th>
                <th className="text-center p-4 font-semibold">{t.trend}</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((data, index) => {
                const isCurrentMonth = index === currentIndex - 1;
                const isForecast = index >= currentIndex;
                const prevData = index > 0 ? trendData[index - 1] : null;
                const trend = prevData ? getTrendDirection(prevData.totalCosts, data.totalCosts) : null;
                
                return (
                  <tr 
                    key={index} 
                    className={`border-t border-gray-200 ${
                      isCurrentMonth ? 'bg-blue-50' : 
                      isForecast ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="p-4 font-medium">
                      {data.period}
                      {isCurrentMonth && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Şu an
                        </span>
                      )}
                      {isForecast && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          {t.forecast}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">{formatCurrency(data.materialCosts)}</td>
                    <td className="p-4 text-right">{formatCurrency(data.laborCosts)}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(data.totalCosts)}</td>
                    <td className={`p-4 text-right font-medium ${
                      data.inflationRate > 2 ? 'text-red-600' : 
                      data.inflationRate < -1 ? 'text-green-600' : 
                      'text-gray-600'
                    }`}>
                      {data.inflationRate > 0 ? '+' : ''}{data.inflationRate.toFixed(1)}%
                    </td>
                    <td className="p-4 text-center">
                      {trend && (
                        <trend.icon className={`w-4 h-4 mx-auto ${trend.color}`} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          {t.recommendations}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">{t.bestTime}</h4>
            <p className="text-sm text-green-700">
              {language === 'tr' 
                ? 'Mevcut fiyatlar en uygun seviyede. Projeye hemen başlanması önerilir.'
                : 'Current prices are at optimal levels. Starting the project immediately is recommended.'
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">{t.riskPeriods}</h4>
            <p className="text-sm text-yellow-700">
              {language === 'tr'
                ? 'Önümüzdeki 3-6 ay içinde %5-8 artış bekleniyor.'
                : 'A 5-8% increase is expected in the next 3-6 months.'
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">{t.costOptimization}</h4>
            <p className="text-sm text-blue-700">
              {language === 'tr'
                ? 'Malzeme alımlarını öne çekerek %3-5 tasarruf sağlanabilir.'
                : 'Bringing forward material purchases can save 3-5%.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;