import React, { useState } from 'react';
import { AlertTriangle, Shield, TrendingDown, TrendingUp } from 'lucide-react';
import { ProjectScenario, RiskFactor } from '../types';

interface RiskMatrixProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ currentScenario, language }) => {
  const texts = {
    tr: {
      riskMatrix: 'Risk Matrisi',
      riskFactors: 'Risk Faktörleri',
      probability: 'Olasılık',
      impact: 'Etki',
      riskScore: 'Risk Skoru',
      mitigation: 'Önlem',
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek',
      financial: 'Finansal',
      technical: 'Teknik',
      environmental: 'Çevresel',
      regulatory: 'Yasal',
      overallRisk: 'Genel Risk Seviyesi',
      riskSummary: 'Risk Özeti',
      highRiskItems: 'Yüksek Risk Öğeleri',
      recommendations: 'Öneriler'
    },
    en: {
      riskMatrix: 'Risk Matrix',
      riskFactors: 'Risk Factors',
      probability: 'Probability',
      impact: 'Impact',
      riskScore: 'Risk Score',
      mitigation: 'Mitigation',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      financial: 'Financial',
      technical: 'Technical',
      environmental: 'Environmental',
      regulatory: 'Regulatory',
      overallRisk: 'Overall Risk Level',
      riskSummary: 'Risk Summary',
      highRiskItems: 'High Risk Items',
      recommendations: 'Recommendations'
    }
  };

  const t = texts[language];

  const generateRiskFactors = (): RiskFactor[] => {
    const baseRisks: Omit<RiskFactor, 'id' | 'riskScore'>[] = [
      {
        category: 'financial',
        description: language === 'tr' ? 'Enflasyon ve döviz kuru dalgalanmaları' : 'Inflation and currency fluctuations',
        probability: 'high',
        impact: 'high',
        mitigation: language === 'tr' ? 'Sabit fiyat sözleşmeleri, döviz hedge işlemleri' : 'Fixed price contracts, currency hedging'
      },
      {
        category: 'technical',
        description: language === 'tr' ? 'Zemin koşulları ve jeoteknik riskler' : 'Soil conditions and geotechnical risks',
        probability: 'medium',
        impact: 'high',
        mitigation: language === 'tr' ? 'Detaylı zemin etüdü, ek temel çalışmaları' : 'Detailed soil survey, additional foundation work'
      },
      {
        category: 'regulatory',
        description: language === 'tr' ? 'İmar planı değişiklikleri ve izin gecikmeleri' : 'Zoning changes and permit delays',
        probability: 'medium',
        impact: 'medium',
        mitigation: language === 'tr' ? 'Erken izin başvuruları, hukuki danışmanlık' : 'Early permit applications, legal consultation'
      },
      {
        category: 'environmental',
        description: language === 'tr' ? 'Hava koşulları ve mevsimsel etkiler' : 'Weather conditions and seasonal effects',
        probability: 'high',
        impact: 'low',
        mitigation: language === 'tr' ? 'Mevsimsel planlama, hava koşulu sigortası' : 'Seasonal planning, weather insurance'
      },
      {
        category: 'financial',
        description: language === 'tr' ? 'Malzeme fiyat artışları' : 'Material price increases',
        probability: 'high',
        impact: 'medium',
        mitigation: language === 'tr' ? 'Erken malzeme alımı, fiyat garantili sözleşmeler' : 'Early material procurement, price-guaranteed contracts'
      },
      {
        category: 'technical',
        description: language === 'tr' ? 'Nitelikli işçi bulma zorluğu' : 'Difficulty finding skilled workers',
        probability: 'medium',
        impact: 'medium',
        mitigation: language === 'tr' ? 'Erken işçi rezervasyonu, eğitim programları' : 'Early worker reservation, training programs'
      }
    ];

    return baseRisks.map((risk, index) => {
      const probabilityScore = risk.probability === 'low' ? 1 : risk.probability === 'medium' ? 2 : 3;
      const impactScore = risk.impact === 'low' ? 1 : risk.impact === 'medium' ? 2 : 3;
      
      return {
        ...risk,
        id: `risk-${index}`,
        riskScore: probabilityScore * impactScore
      };
    });
  };

  const [riskFactors] = useState<RiskFactor[]>(generateRiskFactors());

  const getRiskColor = (score: number) => {
    if (score <= 2) return 'bg-green-100 text-green-800';
    if (score <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 2) return t.low;
    if (score <= 4) return t.medium;
    return t.high;
  };

  const averageRiskScore = riskFactors.reduce((sum, risk) => sum + risk.riskScore, 0) / riskFactors.length;
  const highRiskFactors = riskFactors.filter(risk => risk.riskScore >= 6);

  const categoryColors = {
    financial: 'bg-blue-100 text-blue-800',
    technical: 'bg-purple-100 text-purple-800',
    environmental: 'bg-green-100 text-green-800',
    regulatory: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            <span className="font-medium">{t.overallRisk}</span>
          </div>
          <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getRiskColor(averageRiskScore)}`}>
            {getRiskLevel(averageRiskScore)}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Skor: {averageRiskScore.toFixed(1)}/9
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            <span className="font-medium">{t.highRiskItems}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {highRiskFactors.length}
          </div>
          <div className="text-sm text-gray-600">
            / {riskFactors.length} toplam risk
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            <span className="font-medium">Önlem Oranı</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            100%
          </div>
          <div className="text-sm text-gray-600">
            Tüm riskler için önlem tanımlı
          </div>
        </div>
      </div>

      {/* Risk Matrix Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{t.riskFactors}</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold">Kategori</th>
                <th className="text-left p-4 font-semibold">Risk Açıklaması</th>
                <th className="text-center p-4 font-semibold">{t.probability}</th>
                <th className="text-center p-4 font-semibold">{t.impact}</th>
                <th className="text-center p-4 font-semibold">{t.riskScore}</th>
                <th className="text-left p-4 font-semibold">{t.mitigation}</th>
              </tr>
            </thead>
            <tbody>
              {riskFactors.map(risk => (
                <tr key={risk.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[risk.category]}`}>
                      {t[risk.category]}
                    </span>
                  </td>
                  <td className="p-4">{risk.description}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.probability === 'low' ? 'bg-green-100 text-green-800' :
                      risk.probability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {t[risk.probability]}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.impact === 'low' ? 'bg-green-100 text-green-800' :
                      risk.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {t[risk.impact]}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(risk.riskScore)}`}>
                      {risk.riskScore}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{risk.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Recommendations */}
      {highRiskFactors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Acil Dikkat Gereken Riskler
          </h3>
          <div className="space-y-3">
            {highRiskFactors.map(risk => (
              <div key={risk.id} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-red-900">{risk.description}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                    Risk: {risk.riskScore}
                  </span>
                </div>
                <p className="text-sm text-red-700">
                  <strong>Önerilen Önlem:</strong> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskMatrix;