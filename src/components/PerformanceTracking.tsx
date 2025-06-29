import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Star, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { ProjectScenario, SupplierPerformance } from '../types';
import { formatCurrency } from '../utils/calculations';

interface PerformanceTrackingProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const PerformanceTracking: React.FC<PerformanceTrackingProps> = ({ scenario, language }) => {
  const [performanceData, setPerformanceData] = useState<SupplierPerformance[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');

  const texts = {
    tr: {
      performanceTracking: 'Performans Takibi',
      supplierPerformance: 'Tedarikçi Performansı',
      period: 'Dönem',
      monthly: 'Aylık',
      quarterly: 'Üç Aylık',
      yearly: 'Yıllık',
      supplier: 'Tedarikçi',
      overallScore: 'Genel Puan',
      onTimeDelivery: 'Zamanında Teslimat',
      qualityScore: 'Kalite Puanı',
      costPerformance: 'Maliyet Performansı',
      responsiveness:  'Yanıt Verme',
      compliance: 'Uyumluluk',
      trend: 'Trend',
      improving: 'İyileşiyor',
      declining: 'Kötüleşiyor',
      stable: 'Sabit',
      projects: 'Projeler',
      contractValue: 'Sözleşme Değeri',
      performance: 'Performans',
      issues: 'Sorunlar',
      recommendations: 'Öneriler',
      nextReview: 'Sonraki İnceleme',
      performanceMetrics: 'Performans Metrikleri',
      topPerformers: 'En İyi Performans',
      needsImprovement: 'İyileştirme Gerekli',
      riskSuppliers: 'Riskli Tedarikçiler',
      performanceTrends: 'Performans Trendleri',
      projectName: 'Proje Adı',
      noIssues: 'Sorun yok',
      excellent: 'Mükemmel',
      good: 'İyi',
      average: 'Ortalama',
      poor: 'Zayıf',
      critical: 'Kritik'
    },
    en: {
      performanceTracking: 'Performance Tracking',
      supplierPerformance: 'Supplier Performance',
      period: 'Period',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      supplier: 'Supplier',
      overallScore: 'Overall Score',
      onTimeDelivery: 'On-Time Delivery',
      qualityScore: 'Quality Score',
      costPerformance: 'Cost Performance',
      responsiveness: 'Responsiveness',
      compliance: 'Compliance',
      trend: 'Trend',
      improving: 'Improving',
      declining: 'Declining',
      stable: 'Stable',
      projects: 'Projects',
      contractValue: 'Contract Value',
      performance: 'Performance',
      issues: 'Issues',
      recommendations: 'Recommendations',
      nextReview: 'Next Review',
      performanceMetrics: 'Performance Metrics',
      topPerformers: 'Top Performers',
      needsImprovement: 'Needs Improvement',
      riskSuppliers: 'Risk Suppliers',
      performanceTrends: 'Performance Trends',
      projectName: 'Project Name',
      noIssues: 'No issues',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      poor: 'Poor',
      critical: 'Critical'
    }
  };

  const t = texts[language];

  // Generate sample performance data
  React.useEffect(() => {
    const samplePerformance: SupplierPerformance[] = [
      {
        supplierId: 'supplier-1',
        period: '2025-Q1',
        metrics: {
          onTimeDelivery: 95,
          qualityScore: 4.5,
          costPerformance: 92,
          responsiveness: 88,
          compliance: 96
        },
        projects: [
          {
            projectId: 'project-1',
            projectName: 'Beton Tedariki',
            contractValue: 2500000,
            performance: 94,
            issues: []
          },
          {
            projectId: 'project-2',
            projectName: 'Malzeme Tedariki',
            contractValue: 1200000,
            performance: 89,
            issues: ['Geç teslimat']
          }
        ],
        trends: {
          improving: ['Kalite', 'Uyumluluk'],
          declining: [],
          stable: ['Maliyet', 'Yanıt verme']
        },
        recommendations: [
          'Teslimat süreçlerini optimize edin',
          'Kalite kontrol sistemini güçlendirin'
        ],
        nextReviewDate: '2025-04-01'
      },
      {
        supplierId: 'supplier-2',
        period: '2025-Q1',
        metrics: {
          onTimeDelivery: 98,
          qualityScore: 4.8,
          costPerformance: 85,
          responsiveness: 95,
          compliance: 99
        },
        projects: [
          {
            projectId: 'project-3',
            projectName: 'Elektrik Tesisat',
            contractValue: 1800000,
            performance: 96,
            issues: []
          }
        ],
        trends: {
          improving: ['Maliyet', 'Kalite'],
          declining: [],
          stable: ['Teslimat', 'Yanıt verme', 'Uyumluluk']
        },
        recommendations: [
          'Maliyet optimizasyonu yapın',
          'Mevcut performansı sürdürün'
        ],
        nextReviewDate: '2025-04-15'
      },
      {
        supplierId: 'supplier-3',
        period: '2025-Q1',
        metrics: {
          onTimeDelivery: 78,
          qualityScore: 3.8,
          costPerformance: 88,
          responsiveness: 72,
          compliance: 85
        },
        projects: [
          {
            projectId: 'project-4',
            projectName: 'Ekipman Kiralama',
            contractValue: 950000,
            performance: 76,
            issues: ['Geç teslimat', 'Kalite sorunları', 'İletişim eksikliği']
          }
        ],
        trends: {
          improving: [],
          declining: ['Teslimat', 'Kalite'],
          stable: ['Maliyet']
        },
        recommendations: [
          'Acil iyileştirme planı gerekli',
          'Teslimat süreçlerini gözden geçirin',
          'Kalite kontrol sistemini güçlendirin',
          'İletişim protokollerini iyileştirin'
        ],
        nextReviewDate: '2025-03-15'
      }
    ];
    setPerformanceData(samplePerformance);
  }, []);

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceRating = (score: number) => {
    if (score >= 90) return t.excellent;
    if (score >= 80) return t.good;
    if (score >= 70) return t.average;
    if (score >= 60) return t.poor;
    return t.critical;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return TrendingUp;
    if (trend === 'declining') return TrendingDown;
    return CheckCircle;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'improving') return 'text-green-600';
    if (trend === 'declining') return 'text-red-600';
    return 'text-gray-600';
  };

  const calculateOverallScore = (metrics: any) => {
    const weights = {
      onTimeDelivery: 0.25,
      qualityScore: 0.25,
      costPerformance: 0.2,
      responsiveness: 0.15,
      compliance: 0.15
    };
    
    return (
      metrics.onTimeDelivery * weights.onTimeDelivery +
      (metrics.qualityScore * 20) * weights.qualityScore +
      metrics.costPerformance * weights.costPerformance +
      metrics.responsiveness * weights.responsiveness +
      metrics.compliance * weights.compliance
    );
  };

  const topPerformers = performanceData
    .map(p => ({ ...p, overallScore: calculateOverallScore(p.metrics) }))
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 3);

  const riskSuppliers = performanceData
    .map(p => ({ ...p, overallScore: calculateOverallScore(p.metrics) }))
    .filter(p => p.overallScore < 80);

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.performanceTracking}</h3>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'monthly'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.monthly}
          </button>
          <button
            onClick={() => setSelectedPeriod('quarterly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'quarterly'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.quarterly}
          </button>
          <button
            onClick={() => setSelectedPeriod('yearly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'yearly'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.yearly}
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.topPerformers}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{topPerformers.length}</div>
          <div className="text-sm text-green-700">90+ puan</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-medium text-yellow-800">{t.needsImprovement}</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {performanceData.filter(p => {
              const score = calculateOverallScore(p.metrics);
              return score >= 70 && score < 90;
            }).length}
          </div>
          <div className="text-sm text-yellow-700">70-89 puan</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.riskSuppliers}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{riskSuppliers.length}</div>
          <div className="text-sm text-red-700">&lt;80 puan</div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h4 className="font-semibold text-gray-900">{t.supplierPerformance}</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold">{t.supplier}</th>
                <th className="text-center p-4 font-semibold">{t.overallScore}</th>
                <th className="text-center p-4 font-semibold">{t.onTimeDelivery}</th>
                <th className="text-center p-4 font-semibold">{t.qualityScore}</th>
                <th className="text-center p-4 font-semibold">{t.costPerformance}</th>
                <th className="text-center p-4 font-semibold">{t.responsiveness}</th>
                <th className="text-center p-4 font-semibold">{t.compliance}</th>
                <th className="text-center p-4 font-semibold">{t.trend}</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((performance, index) => {
                const overallScore = calculateOverallScore(performance.metrics);
                const supplierName = `Tedarikçi ${index + 1}`;
                
                return (
                  <tr key={performance.supplierId} className="border-t border-gray-200">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{supplierName}</div>
                        <div className="text-xs text-gray-500">{performance.period}</div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`text-lg font-bold ${getPerformanceColor(overallScore)}`}>
                        {overallScore.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getPerformanceRating(overallScore)}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`font-medium ${getPerformanceColor(performance.metrics.onTimeDelivery)}`}>
                        {performance.metrics.onTimeDelivery}%
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{performance.metrics.qualityScore}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`font-medium ${getPerformanceColor(performance.metrics.costPerformance)}`}>
                        {performance.metrics.costPerformance}%
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`font-medium ${getPerformanceColor(performance.metrics.responsiveness)}`}>
                        {performance.metrics.responsiveness}%
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`font-medium ${getPerformanceColor(performance.metrics.compliance)}`}>
                        {performance.metrics.compliance}%
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-1">
                        {performance.trends.improving.length > 0 && (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        )}
                        {performance.trends.declining.length > 0 && (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        {performance.trends.stable.length > 0 && performance.trends.improving.length === 0 && performance.trends.declining.length === 0 && (
                          <CheckCircle className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {performanceData.map((performance, index) => {
          const supplierName = `Tedarikçi ${index + 1}`;
          const overallScore = calculateOverallScore(performance.metrics);
          
          return (
            <div key={performance.supplierId} className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{supplierName}</h4>
                  <p className="text-sm text-gray-600">{performance.period}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getPerformanceColor(overallScore)}`}>
                    {overallScore.toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-500">{getPerformanceRating(overallScore)}</div>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">{t.projects}</h5>
                <div className="space-y-2">
                  {performance.projects.map(project => (
                    <div key={project.projectId} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{project.projectName}</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(project.performance)}`}>
                          {project.performance}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {formatCurrency(project.contractValue)}
                      </div>
                      {project.issues.length > 0 ? (
                        <div className="text-xs text-red-600">
                          {project.issues.join(', ')}
                        </div>
                      ) : (
                        <div className="text-xs text-green-600">{t.noIssues}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trends */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">{t.performanceTrends}</h5>
                <div className="flex flex-wrap gap-2">
                  {performance.trends.improving.map(trend => (
                    <span key={trend} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {trend}
                    </span>
                  ))}
                  {performance.trends.declining.map(trend => (
                    <span key={trend} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {trend}
                    </span>
                  ))}
                  {performance.trends.stable.map(trend => (
                    <span key={trend} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {trend}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">{t.recommendations}</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {performance.recommendations.map((rec, recIndex) => (
                    <li key={recIndex}>• {rec}</li>
                  ))}
                </ul>
                <div className="mt-2 text-xs text-gray-500">
                  {t.nextReview}: {new Date(performance.nextReviewDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceTracking;