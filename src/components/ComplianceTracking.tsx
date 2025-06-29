import React, { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, Calendar, Award, Eye } from 'lucide-react';
import { ProjectScenario, ComplianceItem, Regulation, Permit } from '../types';

interface ComplianceTrackingProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ComplianceTracking: React.FC<ComplianceTrackingProps> = ({ scenario, language }) => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [permits, setPermits] = useState<Permit[]>([]);
  const [selectedView, setSelectedView] = useState<'compliance' | 'regulations' | 'permits'>('compliance');

  const texts = {
    tr: {
      complianceTracking: 'Uyumluluk Takibi',
      complianceItems: 'Uyumluluk Maddeleri',
      regulations: 'Mevzuat',
      permits: 'İzinler',
      requirement: 'Gereksinim',
      status: 'Durum',
      dueDate: 'Vade Tarihi',
      responsible: 'Sorumlu',
      evidence: 'Kanıt',
      notes: 'Notlar',
      compliant: 'Uyumlu',
      nonCompliant: 'Uyumsuz',
      pending: 'Bekliyor',
      inProgress: 'Devam Ediyor',
      expired: 'Süresi Doldu',
      regulationTitle: 'Mevzuat Başlığı',
      authority: 'Otorite',
      effectiveDate: 'Yürürlük Tarihi',
      lastUpdate: 'Son Güncelleme',
      applicability: 'Uygulanabilirlik',
      permitTitle: 'İzin Başlığı',
      permitNumber: 'İzin Numarası',
      issueDate: 'Veriliş Tarihi',
      expiryDate: 'Bitiş Tarihi',
      renewalDate: 'Yenileme Tarihi',
      active: 'Aktif',
      inactive: 'Pasif',
      category: 'Kategori',
      building: 'Yapı',
      environmental: 'Çevresel',
      safety: 'Güvenlik',
      fire: 'Yangın',
      electrical: 'Elektrik',
      complianceMetrics: 'Uyumluluk Metrikleri',
      overallCompliance: 'Genel Uyumluluk',
      activePermits: 'Aktif İzinler',
      expiringPermits: 'Süresi Dolan İzinler',
      nonCompliantItems: 'Uyumsuz Maddeler'
    },
    en: {
      complianceTracking: 'Compliance Tracking',
      complianceItems: 'Compliance Items',
      regulations: 'Regulations',
      permits: 'Permits',
      requirement: 'Requirement',
      status: 'Status',
      dueDate: 'Due Date',
      responsible: 'Responsible',
      evidence: 'Evidence',
      notes: 'Notes',
      compliant: 'Compliant',
      nonCompliant: 'Non-Compliant',
      pending: 'Pending',
      inProgress: 'In Progress',
      expired: 'Expired',
      regulationTitle: 'Regulation Title',
      authority: 'Authority',
      effectiveDate: 'Effective Date',
      lastUpdate: 'Last Update',
      applicability: 'Applicability',
      permitTitle: 'Permit Title',
      permitNumber: 'Permit Number',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date',
      renewalDate: 'Renewal Date',
      active: 'Active',
      inactive: 'Inactive',
      category: 'Category',
      building: 'Building',
      environmental: 'Environmental',
      safety: 'Safety',
      fire: 'Fire',
      electrical: 'Electrical',
      complianceMetrics: 'Compliance Metrics',
      overallCompliance: 'Overall Compliance',
      activePermits: 'Active Permits',
      expiringPermits: 'Expiring Permits',
      nonCompliantItems: 'Non-Compliant Items'
    }
  };

  const t = texts[language];

  // Generate sample data
  React.useEffect(() => {
    const sampleComplianceItems: ComplianceItem[] = [
      {
        id: 'comp-1',
        requirement: language === 'tr' ? 'İSG Risk Değerlendirmesi' : 'OHS Risk Assessment',
        description: language === 'tr' ? 'İş sağlığı ve güvenliği risk değerlendirmesi yapılması' : 'Occupational health and safety risk assessment',
        category: 'safety',
        regulationReference: '6331 Sayılı İSG Kanunu',
        status: 'compliant',
        dueDate: '2025-01-31',
        responsible: 'İSG Uzmanı',
        completedDate: '2025-01-15',
        evidence: ['Risk değerlendirme raporu', 'İSG kurulu kararı'],
        notes: language === 'tr' ? 'Risk değerlendirmesi tamamlandı ve onaylandı' : 'Risk assessment completed and approved'
      },
      {
        id: 'comp-2',
        requirement: language === 'tr' ? 'Çevre Etki Değerlendirmesi' : 'Environmental Impact Assessment',
        description: language === 'tr' ? 'Projenin çevresel etkilerinin değerlendirilmesi' : 'Assessment of environmental impacts of the project',
        category: 'environmental',
        regulationReference: 'Çevre Kanunu',
        status: 'in-progress',
        dueDate: '2025-02-15',
        responsible: 'Çevre Mühendisi',
        evidence: ['Ön rapor'],
        notes: language === 'tr' ? 'Çalışma devam ediyor' : 'Work in progress'
      },
      {
        id: 'comp-3',
        requirement: language === 'tr' ? 'Yangın Güvenlik Raporu' : 'Fire Safety Report',
        description: language === 'tr' ? 'Yangın güvenlik önlemlerinin raporlanması' : 'Reporting of fire safety measures',
        category: 'fire',
        regulationReference: 'Yangın Yönetmeliği',
        status: 'non-compliant',
        dueDate: '2025-01-20',
        responsible: 'Yangın Güvenlik Uzmanı',
        evidence: [],
        notes: language === 'tr' ? 'Rapor henüz hazırlanmadı' : 'Report not yet prepared'
      }
    ];

    const sampleRegulations: Regulation[] = [
      {
        id: 'reg-1',
        title: language === 'tr' ? '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu' : 'Occupational Health and Safety Law No. 6331',
        authority: 'Çalışma ve Sosyal Güvenlik Bakanlığı',
        category: 'safety',
        effectiveDate: '2012-06-30',
        lastUpdate: '2023-01-01',
        applicability: 'high',
        description: language === 'tr' ? 'İş sağlığı ve güvenliği ile ilgili temel mevzuat' : 'Basic legislation on occupational health and safety',
        requirements: [
          'Risk değerlendirmesi yapılması',
          'İSG uzmanı görevlendirilmesi',
          'İşçi eğitimi verilmesi',
          'Kaza raporlama sistemi kurulması'
        ],
        penalties: language === 'tr' ? 'İdari para cezası ve iş durdurma' : 'Administrative fine and work stoppage',
        url: 'https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6331.pdf'
      },
      {
        id: 'reg-2',
        title: language === 'tr' ? 'İnşaat Teknik Yönetmeliği' : 'Construction Technical Regulation',
        authority: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı',
        category: 'building',
        effectiveDate: '2018-01-01',
        lastUpdate: '2024-06-01',
        applicability: 'high',
        description: language === 'tr' ? 'İnşaat yapılarının teknik gereksinimlerini düzenler' : 'Regulates technical requirements for construction structures',
        requirements: [
          'Yapı denetimi yapılması',
          'Teknik şartnamelere uyum',
          'Malzeme test raporları',
          'Yapı kullanma izni alınması'
        ],
        penalties: language === 'tr' ? 'Yapı kullanma izni verilmemesi' : 'Building use permit not granted'
      }
    ];

    const samplePermits: Permit[] = [
      {
        id: 'permit-1',
        title: language === 'tr' ? 'İnşaat Ruhsatı' : 'Building Permit',
        permitNumber: 'İR-2024-001234',
        category: 'building',
        authority: 'Belediye İmar Müdürlüğü',
        issueDate: '2024-12-15',
        expiryDate: '2026-12-15',
        status: 'active',
        description: language === 'tr' ? 'Ana yapı inşaat ruhsatı' : 'Main building construction permit',
        conditions: [
          'Proje değişikliği yapılamaz',
          'Çevre düzenlemesi yapılacak',
          'Yapı denetimi zorunlu'
        ],
        documents: ['Ruhsat belgesi', 'Ek planlar', 'Belediye onayı'],
        renewalRequired: false,
        cost: 25000
      },
      {
        id: 'permit-2',
        title: language === 'tr' ? 'Çevre İzni' : 'Environmental Permit',
        permitNumber: 'Çİ-2025-005678',
        category: 'environmental',
        authority: 'Çevre ve Şehircilik İl Müdürlüğü',
        issueDate: '2025-01-10',
        expiryDate: '2025-07-10',
        status: 'active',
        description: language === 'tr' ? 'İnşaat faaliyetleri çevre izni' : 'Construction activities environmental permit',
        conditions: [
          'Gürültü seviyesi kontrolü',
          'Atık yönetim planı',
          'Toz önleme tedbirleri'
        ],
        documents: ['Çevre izin belgesi', 'Atık yönetim planı'],
        renewalRequired: true,
        renewalDate: '2025-06-10',
        cost: 8000
      },
      {
        id: 'permit-3',
        title: language === 'tr' ? 'Elektrik Projesi Onayı' : 'Electrical Project Approval',
        permitNumber: 'EP-2024-009876',
        category: 'electrical',
        authority: 'EPDK',
        issueDate: '2024-11-20',
        expiryDate: '2025-11-20',
        status: 'expired',
        description: language === 'tr' ? 'Elektrik tesisatı proje onayı' : 'Electrical installation project approval',
        conditions: [
          'Elektrik güvenlik standartları',
          'Topraklama sistemi',
          'Koruma sistemleri'
        ],
        documents: ['Proje onay belgesi'],
        renewalRequired: true,
        cost: 3500
      }
    ];

    setComplianceItems(sampleComplianceItems);
    setRegulations(sampleRegulations);
    setPermits(samplePermits);
  }, [language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'compliant': 'bg-green-100 text-green-800',
      'non-compliant': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'building': 'bg-blue-100 text-blue-800',
      'environmental': 'bg-green-100 text-green-800',
      'safety': 'bg-red-100 text-red-800',
      'fire': 'bg-orange-100 text-orange-800',
      'electrical': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || colors['building'];
  };

  const getApplicabilityColor = (level: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[level as keyof typeof colors] || colors['medium'];
  };

  // Calculate metrics
  const compliantItems = complianceItems.filter(item => item.status === 'compliant').length;
  const totalItems = complianceItems.length;
  const overallCompliance = totalItems > 0 ? (compliantItems / totalItems) * 100 : 0;

  const activePermitsCount = permits.filter(permit => permit.status === 'active').length;
  const expiredPermitsCount = permits.filter(permit => permit.status === 'expired').length;
  const nonCompliantItemsCount = complianceItems.filter(item => item.status === 'non-compliant').length;

  return (
    <div className="space-y-6">
      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.overallCompliance}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{overallCompliance.toFixed(1)}%</div>
          <div className="text-sm text-green-700">{compliantItems}/{totalItems} uyumlu</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.activePermits}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{activePermitsCount}</div>
          <div className="text-sm text-blue-700">Geçerli izin</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.expiringPermits}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{expiredPermitsCount}</div>
          <div className="text-sm text-red-700">Süresi doldu</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <Eye className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.nonCompliantItems}</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{nonCompliantItemsCount}</div>
          <div className="text-sm text-orange-700">Uyumsuz madde</div>
        </div>
      </div>

      {/* View Selection */}
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => setSelectedView('compliance')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'compliance'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.complianceItems}
        </button>
        <button
          onClick={() => setSelectedView('regulations')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'regulations'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.regulations}
        </button>
        <button
          onClick={() => setSelectedView('permits')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'permits'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.permits}
        </button>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'compliance' && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.requirement}</th>
                  <th className="text-center p-4 font-semibold">{t.category}</th>
                  <th className="text-left p-4 font-semibold">{t.responsible}</th>
                  <th className="text-center p-4 font-semibold">{t.dueDate}</th>
                  <th className="text-center p-4 font-semibold">{t.status}</th>
                  <th className="text-left p-4 font-semibold">{t.evidence}</th>
                </tr>
              </thead>
              <tbody>
                {complianceItems.map(item => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{item.requirement}</div>
                        <div className="text-xs text-gray-500">{item.regulationReference}</div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {t[item.category]}
                      </span>
                    </td>
                    <td className="p-4">{item.responsible}</td>
                    <td className="p-4 text-center">{item.dueDate}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {t[item.status.replace('-', '') as keyof typeof t]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        {item.evidence.length > 0 ? (
                          item.evidence.map((evidence, index) => (
                            <div key={index}>• {evidence}</div>
                          ))
                        ) : (
                          <span className="text-gray-400">Kanıt yok</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'regulations' && (
        <div className="space-y-6">
          {regulations.map(regulation => (
            <div key={regulation.id} className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{regulation.title}</h4>
                  <p className="text-sm text-gray-600">{regulation.authority}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(regulation.category)}`}>
                    {t[regulation.category]}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicabilityColor(regulation.applicability)}`}>
                    {regulation.applicability === 'high' ? 'Yüksek' : regulation.applicability === 'medium' ? 'Orta' : 'Düşük'} Öncelik
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Gereksinimler</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {regulation.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.effectiveDate}:</span>
                      <span className="font-medium">{regulation.effectiveDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.lastUpdate}:</span>
                      <span className="font-medium">{regulation.lastUpdate}</span>
                    </div>
                    {regulation.penalties && (
                      <div>
                        <span className="text-gray-600">Cezalar:</span>
                        <p className="text-sm mt-1">{regulation.penalties}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === 'permits' && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.permitTitle}</th>
                  <th className="text-left p-4 font-semibold">{t.permitNumber}</th>
                  <th className="text-center p-4 font-semibold">{t.category}</th>
                  <th className="text-center p-4 font-semibold">{t.issueDate}</th>
                  <th className="text-center p-4 font-semibold">{t.expiryDate}</th>
                  <th className="text-center p-4 font-semibold">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {permits.map(permit => (
                  <tr key={permit.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{permit.title}</div>
                        <div className="text-xs text-gray-500">{permit.authority}</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm">{permit.permitNumber}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(permit.category)}`}>
                        {t[permit.category]}
                      </span>
                    </td>
                    <td className="p-4 text-center">{permit.issueDate}</td>
                    <td className="p-4 text-center">
                      <div>
                        {permit.expiryDate}
                        {permit.renewalRequired && permit.renewalDate && (
                          <div className="text-xs text-orange-600 mt-1">
                            Yenileme: {permit.renewalDate}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(permit.status)}`}>
                        {t[permit.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceTracking;