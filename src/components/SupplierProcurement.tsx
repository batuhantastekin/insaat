import React, { useState } from 'react';
import { Users, FileText, Award, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { ProjectScenario } from '../types';
import SupplierManagement from './SupplierManagement';
import TenderManagement from './TenderManagement';
import ContractManagement from './ContractManagement';
import PerformanceTracking from './PerformanceTracking';
import ProcurementPlanning from './ProcurementPlanning';

interface SupplierProcurementProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const SupplierProcurement: React.FC<SupplierProcurementProps> = ({ currentScenario, language }) => {
  const [activeTab, setActiveTab] = useState<'suppliers' | 'tenders' | 'contracts' | 'performance' | 'planning'>('suppliers');

  const texts = {
    tr: {
      supplierProcurement: 'Tedarikçi ve İhale Yönetimi',
      supplierManagement: 'Tedarikçi Yönetimi',
      tenderManagement: 'İhale Yönetimi',
      contractManagement: 'Sözleşme Yönetimi',
      performanceTracking: 'Performans Takibi',
      procurementPlanning: 'Tedarik Planlama',
      overview: 'Genel Bakış',
      totalSuppliers: 'Toplam Tedarikçi',
      activeTenders: 'Aktif İhaleler',
      activeContracts: 'Aktif Sözleşmeler',
      avgPerformance: 'Ortalama Performans',
      recommendations: 'Öneriler',
      alerts: 'Uyarılar'
    },
    en: {
      supplierProcurement: 'Supplier and Procurement Management',
      supplierManagement: 'Supplier Management',
      tenderManagement: 'Tender Management',
      contractManagement: 'Contract Management',
      performanceTracking: 'Performance Tracking',
      procurementPlanning: 'Procurement Planning',
      overview: 'Overview',
      totalSuppliers: 'Total Suppliers',
      activeTenders: 'Active Tenders',
      activeContracts: 'Active Contracts',
      avgPerformance: 'Average Performance',
      recommendations: 'Recommendations',
      alerts: 'Alerts'
    }
  };

  const t = texts[language];

  const tabs = [
    { id: 'suppliers', label: t.supplierManagement, icon: Users },
    { id: 'tenders', label: t.tenderManagement, icon: FileText },
    { id: 'contracts', label: t.contractManagement, icon: Award },
    { id: 'performance', label: t.performanceTracking, icon: TrendingUp },
    { id: 'planning', label: t.procurementPlanning, icon: CheckCircle }
  ];

  // Generate overview data
  const generateOverviewData = () => {
    return {
      totalSuppliers: 45,
      activeTenders: 3,
      activeContracts: 12,
      avgPerformance: 87.5
    };
  };

  const overviewData = generateOverviewData();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-lg mr-4">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.supplierProcurement}</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.totalSuppliers}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {overviewData.totalSuppliers}
          </div>
          <div className="text-sm text-blue-700">Onaylı tedarikçi</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.activeTenders}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {overviewData.activeTenders}
          </div>
          <div className="text-sm text-green-700">Devam eden</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.activeContracts}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {overviewData.activeContracts}
          </div>
          <div className="text-sm text-purple-700">Yürütülüyor</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.avgPerformance}</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {overviewData.avgPerformance}%
          </div>
          <div className="text-sm text-orange-700">Genel başarı</div>
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
                  ? 'border-b-2 border-orange-600 text-orange-600 bg-orange-50'
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
        {activeTab === 'suppliers' && (
          <SupplierManagement scenario={currentScenario} language={language} />
        )}
        {activeTab === 'tenders' && (
          <TenderManagement scenario={currentScenario} language={language} />
        )}
        {activeTab === 'contracts' && (
          <ContractManagement scenario={currentScenario} language={language} />
        )}
        {activeTab === 'performance' && (
          <PerformanceTracking scenario={currentScenario} language={language} />
        )}
        {activeTab === 'planning' && (
          <ProcurementPlanning scenario={currentScenario} language={language} />
        )}
      </div>
    </div>
  );
};

export default SupplierProcurement;