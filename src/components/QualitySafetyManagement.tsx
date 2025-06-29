import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Users, Award, Eye, ClipboardCheck } from 'lucide-react';
import { ProjectScenario } from '../types';
import QualityControl from './QualityControl';
import SafetyManagement from './SafetyManagement';
import ComplianceTracking from './ComplianceTracking';
import InspectionReports from './InspectionReports';
import CertificationManagement from './CertificationManagement';

interface QualitySafetyManagementProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const QualitySafetyManagement: React.FC<QualitySafetyManagementProps> = ({ currentScenario, language }) => {
  const [activeTab, setActiveTab] = useState<'quality' | 'safety' | 'compliance' | 'inspections' | 'certifications'>('quality');

  const texts = {
    tr: {
      qualitySafetyManagement: 'Kalite ve Güvenlik Yönetimi',
      qualityControl: 'Kalite Kontrol',
      safetyManagement: 'Güvenlik Yönetimi',
      complianceTracking: 'Uyumluluk Takibi',
      inspectionReports: 'Denetim Raporları',
      certificationManagement: 'Sertifikasyon Yönetimi',
      overview: 'Genel Bakış',
      qualityScore: 'Kalite Puanı',
      safetyScore: 'Güvenlik Puanı',
      complianceRate: 'Uyumluluk Oranı',
      activeInspections: 'Aktif Denetimler',
      recommendations: 'Öneriler',
      alerts: 'Uyarılar'
    },
    en: {
      qualitySafetyManagement: 'Quality and Safety Management',
      qualityControl: 'Quality Control',
      safetyManagement: 'Safety Management',
      complianceTracking: 'Compliance Tracking',
      inspectionReports: 'Inspection Reports',
      certificationManagement: 'Certification Management',
      overview: 'Overview',
      qualityScore: 'Quality Score',
      safetyScore: 'Safety Score',
      complianceRate: 'Compliance Rate',
      activeInspections: 'Active Inspections',
      recommendations: 'Recommendations',
      alerts: 'Alerts'
    }
  };

  const t = texts[language];

  const tabs = [
    { id: 'quality', label: t.qualityControl, icon: CheckCircle },
    { id: 'safety', label: t.safetyManagement, icon: Shield },
    { id: 'compliance', label: t.complianceTracking, icon: FileText },
    { id: 'inspections', label: t.inspectionReports, icon: Eye },
    { id: 'certifications', label: t.certificationManagement, icon: Award }
  ];

  // Generate overview data
  const generateOverviewData = () => {
    return {
      qualityScore: 87.5,
      safetyScore: 92.3,
      complianceRate: 94.1,
      activeInspections: 3
    };
  };

  const overviewData = generateOverviewData();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg mr-4">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.qualitySafetyManagement}</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.qualityScore}</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(overviewData.qualityScore)}`}>
            {overviewData.qualityScore}%
          </div>
          <div className="text-sm text-blue-700">Genel kalite</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.safetyScore}</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(overviewData.safetyScore)}`}>
            {overviewData.safetyScore}%
          </div>
          <div className="text-sm text-green-700">İSG performansı</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.complianceRate}</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(overviewData.complianceRate)}`}>
            {overviewData.complianceRate}%
          </div>
          <div className="text-sm text-purple-700">Mevzuat uyumu</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <Eye className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.activeInspections}</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {overviewData.activeInspections}
          </div>
          <div className="text-sm text-orange-700">Devam eden</div>
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
        {activeTab === 'quality' && (
          <QualityControl scenario={currentScenario} language={language} />
        )}
        {activeTab === 'safety' && (
          <SafetyManagement scenario={currentScenario} language={language} />
        )}
        {activeTab === 'compliance' && (
          <ComplianceTracking scenario={currentScenario} language={language} />
        )}
        {activeTab === 'inspections' && (
          <InspectionReports scenario={currentScenario} language={language} />
        )}
        {activeTab === 'certifications' && (
          <CertificationManagement scenario={currentScenario} language={language} />
        )}
      </div>
    </div>
  );
};

export default QualitySafetyManagement;