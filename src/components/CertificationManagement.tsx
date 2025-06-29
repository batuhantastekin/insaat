import React, { useState } from 'react';
import { Award, Calendar, AlertTriangle, CheckCircle, FileText, Plus } from 'lucide-react';
import { ProjectScenario, Certification, CertificationRequirement } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CertificationManagementProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const CertificationManagement: React.FC<CertificationManagementProps> = ({ scenario, language }) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [requirements, setRequirements] = useState<CertificationRequirement[]>([]);
  const [selectedView, setSelectedView] = useState<'certifications' | 'requirements'>('certifications');

  const texts = {
    tr: {
      certificationManagement: 'Sertifikasyon Yönetimi',
      certifications: 'Sertifikalar',
      requirements: 'Gereksinimler',
      addCertification: 'Sertifika Ekle',
      addRequirement: 'Gereksinim Ekle',
      certificationName: 'Sertifika Adı',
      issuingBody: 'Veren Kurum',
      issueDate: 'Veriliş Tarihi',
      expiryDate: 'Bitiş Tarihi',
      status: 'Durum',
      category: 'Kategori',
      scope: 'Kapsam',
      certificateNumber: 'Sertifika Numarası',
      renewalDate: 'Yenileme Tarihi',
      cost: 'Maliyet',
      active: 'Aktif',
      expired: 'Süresi Doldu',
      pending: 'Bekliyor',
      suspended: 'Askıya Alındı',
      quality: 'Kalite',
      environmental: 'Çevresel',
      safety: 'Güvenlik',
      management: 'Yönetim',
      technical: 'Teknik',
      requirementTitle: 'Gereksinim Başlığı',
      description: 'Açıklama',
      mandatoryBy: 'Zorunlu Kılan',
      dueDate: 'Vade Tarihi',
      responsible: 'Sorumlu',
      priority: 'Öncelik',
      progress: 'İlerleme',
      evidence: 'Kanıt',
      high: 'Yüksek',
      medium: 'Orta',
      low: 'Düşük',
      completed: 'Tamamlandı',
      inProgress: 'Devam Ediyor',
      notStarted: 'Başlamadı',
      certificationMetrics: 'Sertifikasyon Metrikleri',
      activeCertifications: 'Aktif Sertifikalar',
      expiringCertifications: 'Süresi Dolan',
      pendingRequirements: 'Bekleyen Gereksinimler',
      complianceRate: 'Uyumluluk O.'
    },
    en: {
      certificationManagement: 'Certification Management',
      certifications: 'Certifications',
      requirements: 'Requirements',
      addCertification: 'Add Certification',
      addRequirement: 'Add Requirement',
      certificationName: 'Certification Name',
      issuingBody: 'Issuing Body',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date',
      status: 'Status',
      category: 'Category',
      scope: 'Scope',
      certificateNumber: 'Certificate Number',
      renewalDate: 'Renewal Date',
      cost: 'Cost',
      active: 'Active',
      expired: 'Expired',
      pending: 'Pending',
      suspended: 'Suspended',
      quality: 'Quality',
      environmental: 'Environmental',
      safety: 'Safety',
      management: 'Management',
      technical: 'Technical',
      requirementTitle: 'Requirement Title',
      description: 'Description',
      mandatoryBy: 'Mandatory By',
      dueDate: 'Due Date',
      responsible: 'Responsible',
      priority: 'Priority',
      progress: 'Progress',
      evidence: 'Evidence',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      certificationMetrics: 'Certification Metrics',
      activeCertifications: 'Active Certifications',
      expiringCertifications: 'Expiring Certifications',
      pendingRequirements: 'Pending Requirements',
      complianceRate: 'Compliance Rate'
    }
  };

  const t = texts[language];

  // Generate sample data
  React.useEffect(() => {
    const sampleCertifications: Certification[] = [
      {
        id: 'cert-1',
        name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
        issuingBody: 'TSE - Türk Standartları Enstitüsü',
        certificateNumber: 'TSE-ISO-9001-2024-001',
        category: 'quality',
        scope: language === 'tr' ? 'İnşaat proje yönetimi ve kalite kontrol' : 'Construction project management and quality control',
        issueDate: '2024-06-15',
        expiryDate: '2027-06-15',
        status: 'active',
        description: language === 'tr' 
          ? 'Kalite yönetim sistemi sertifikası - inşaat projelerinde kalite standartlarının uygulanması'
          : 'Quality management system certificate - application of quality standards in construction projects',
        requirements: [
          'Kalite politikası oluşturulması',
          'Süreç dokümantasyonu',
          'İç denetim yapılması',
          'Yönetim gözden geçirmesi'
        ],
        renewalDate: '2027-03-15',
        cost: 25000,
        auditDate: '2024-05-20',
        nextAuditDate: '2025-05-20',
        documents: ['Sertifika belgesi', 'Denetim raporu', 'Kalite el kitabı']
      },
      {
        id: 'cert-2',
        name: 'ISO 14001:2015 Çevre Yönetim Sistemi',
        issuingBody: 'TÜRKAK Akredite Kuruluş',
        certificateNumber: 'ENV-14001-2024-002',
        category: 'environmental',
        scope: language === 'tr' ? 'İnşaat faaliyetlerinde çevre yönetimi' : 'Environmental management in construction activities',
        issueDate: '2024-08-10',
        expiryDate: '2027-08-10',
        status: 'active',
        description: language === 'tr' 
          ? 'Çevre yönetim sistemi sertifikası - çevresel etkilerin kontrolü ve azaltılması'
          : 'Environmental management system certificate - control and reduction of environmental impacts',
        requirements: [
          'Çevre politikası belirlenmesi',
          'Çevresel etki değerlendirmesi',
          'Atık yönetim planı',
          'Çevre eğitimleri'
        ],
        renewalDate: '2027-05-10',
        cost: 18000,
        auditDate: '2024-07-15',
        nextAuditDate: '2025-07-15',
        documents: ['Çevre sertifikası', 'Çevre yönetim planı']
      },
      {
        id: 'cert-3',
        name: 'OHSAS 18001 İş Sağlığı ve Güvenliği',
        issuingBody: 'İSG Sertifikasyon Kuruluşu',
        certificateNumber: 'OHS-18001-2023-003',
        category: 'safety',
        scope: language === 'tr' ? 'İnşaat sahası iş sağlığı ve güvenliği' : 'Construction site occupational health and safety',
        issueDate: '2023-12-01',
        expiryDate: '2024-12-01',
        status: 'expired',
        description: language === 'tr' 
          ? 'İş sağlığı ve güvenliği yönetim sistemi sertifikası'
          : 'Occupational health and safety management system certificate',
        requirements: [
          'İSG politikası oluşturulması',
          'Risk değerlendirmesi',
          'Acil durum planları',
          'İSG eğitimleri'
        ],
        renewalDate: '2024-09-01',
        cost: 15000,
        auditDate: '2023-11-10',
        nextAuditDate: '2024-11-10',
        documents: ['İSG sertifikası', 'Risk değerlendirme raporu']
      }
    ];

    const sampleRequirements: CertificationRequirement[] = [
      {
        id: 'req-1',
        title: language === 'tr' ? 'ISO 45001 Geçiş Sertifikasyonu' : 'ISO 45001 Transition Certification',
        description: language === 'tr' 
          ? 'OHSAS 18001\'den ISO 45001\'e geçiş için yeni sertifikasyon alınması gerekiyor'
          : 'New certification required for transition from OHSAS 18001 to ISO 45001',
        category: 'safety',
        mandatoryBy: 'Uluslararası Standartlar',
        dueDate: '2025-03-01',
        responsible: 'İSG Uzmanı',
        priority: 'high',
        status: 'in-progress',
        progress: 65,
        estimatedCost: 20000,
        actualCost: 12000,
        requirements: [
          'Mevcut sistem gözden geçirilmesi',
          'Yeni standart gereksinimlerinin karşılanması',
          'Personel eğitimi',
          'Belgelendirme denetimi'
        ],
        evidence: ['Geçiş planı', 'Eğitim kayıtları'],
        milestones: [
          { name: 'Sistem analizi', dueDate: '2025-01-15', completed: true },
          { name: 'Dokümantasyon güncellemesi', dueDate: '2025-02-01', completed: false },
          { name: 'İç denetim', dueDate: '2025-02-15', completed: false },
          { name: 'Belgelendirme denetimi', dueDate: '2025-03-01', completed: false }
        ]
      },
      {
        id: 'req-2',
        title: language === 'tr' ? 'Yeşil Bina Sertifikasyonu' : 'Green Building Certification',
        description: language === 'tr' 
          ? 'LEED veya BREEAM yeşil bina sertifikasyonu alınması'
          : 'Obtaining LEED or BREEAM green building certification',
        category: 'environmental',
        mandatoryBy: 'Müşteri Talebi',
        dueDate: '2025-06-01',
        responsible: 'Proje Müdürü',
        priority: 'medium',
        status: 'not-started',
        progress: 0,
        estimatedCost: 35000,
        actualCost: 0,
        requirements: [
          'Enerji verimliliği hesaplamaları',
          'Su tasarrufu önlemleri',
          'Malzeme seçimi kriterleri',
          'İç hava kalitesi ölçümleri'
        ],
        evidence: [],
        milestones: [
          { name: 'Ön değerlendirme', dueDate: '2025-02-01', completed: false },
          { name: 'Tasarım optimizasyonu', dueDate: '2025-04-01', completed: false },
          { name: 'Belgelendirme başvurusu', dueDate: '2025-05-01', completed: false },
          { name: 'Final değerlendirme', dueDate: '2025-06-01', completed: false }
        ]
      }
    ];

    setCertifications(sampleCertifications);
    setRequirements(sampleRequirements);
  }, [language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-gray-100 text-gray-800',
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'not-started': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'quality': 'bg-blue-100 text-blue-800',
      'environmental': 'bg-green-100 text-green-800',
      'safety': 'bg-red-100 text-red-800',
      'management': 'bg-purple-100 text-purple-800',
      'technical': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || colors['quality'];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || colors['medium'];
  };

  // Calculate metrics
  const activeCertifications = certifications.filter(cert => cert.status === 'active').length;
  const expiredCertifications = certifications.filter(cert => cert.status === 'expired').length;
  const pendingRequirements = requirements.filter(req => req.status !== 'completed').length;
  
  const completedRequirements = requirements.filter(req => req.status === 'completed').length;
  const totalRequirements = requirements.length;
  const complianceRate = totalRequirements > 0 ? (completedRequirements / totalRequirements) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Certification Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.activeCertifications}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{activeCertifications}</div>
          <div className="text-sm text-green-700">Geçerli sertifika</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.expiringCertifications}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{expiredCertifications}</div>
          <div className="text-sm text-red-700">Süresi doldu</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.pendingRequirements}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{pendingRequirements}</div>
          <div className="text-sm text-blue-700">Bekleyen gereksinim</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.complianceRate}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{complianceRate.toFixed(1)}%</div>
          <div className="text-sm text-purple-700">Uyumluluk oranı</div>
        </div>
      </div>

      {/* View Selection */}
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => setSelectedView('certifications')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'certifications'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.certifications}
        </button>
        <button
          onClick={() => setSelectedView('requirements')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'requirements'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.requirements}
        </button>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'certifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.certifications}</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.addCertification}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications.map(certification => (
              <div key={certification.id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{certification.name}</h4>
                    <p className="text-sm text-gray-600">{certification.issuingBody}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certification.status)}`}>
                      {t[certification.status.replace('-', '') as keyof typeof t]}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(certification.category)}`}>
                      {t[certification.category]}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.certificateNumber}:</span>
                    <span className="font-medium font-mono">{certification.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.issueDate}:</span>
                    <span className="font-medium">{certification.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.expiryDate}:</span>
                    <span className={`font-medium ${
                      certification.status === 'expired' ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {certification.expiryDate}
                    </span>
                  </div>
                  {certification.renewalDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.renewalDate}:</span>
                      <span className="font-medium text-orange-600">{certification.renewalDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.cost}:</span>
                    <span className="font-medium">{formatCurrency(certification.cost)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-2">{t.scope}</h5>
                  <p className="text-sm text-gray-600">{certification.scope}</p>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-2">Gereksinimler</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {certification.requirements.slice(0, 3).map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                    {certification.requirements.length > 3 && (
                      <li className="text-gray-400">+{certification.requirements.length - 3} daha...</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'requirements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.requirements}</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.addRequirement}
            </button>
          </div>

          <div className="space-y-6">
            {requirements.map(requirement => (
              <div key={requirement.id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{requirement.title}</h4>
                    <p className="text-sm text-gray-600">{requirement.mandatoryBy}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(requirement.priority)}`}>
                      {t[requirement.priority]}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement.status)}`}>
                      {t[requirement.status.replace('-', '') as keyof typeof t]}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.dueDate}:</span>
                        <span className="font-medium">{requirement.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.responsible}:</span>
                        <span className="font-medium">{requirement.responsible}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tahmini Maliyet:</span>
                        <span className="font-medium">{formatCurrency(requirement.estimatedCost)}</span>
                      </div>
                      {requirement.actualCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gerçek Maliyet:</span>
                          <span className="font-medium">{formatCurrency(requirement.actualCost)}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium text-gray-800 mb-2">{t.description}</h5>
                      <p className="text-sm text-gray-600">{requirement.description}</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">{t.progress}</span>
                        <span className="text-sm font-medium">{requirement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${requirement.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Kilometre Taşları</h5>
                      <div className="space-y-2">
                        {requirement.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              {milestone.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2"></div>
                              )}
                              <span className={milestone.completed ? 'text-gray-900' : 'text-gray-600'}>
                                {milestone.name}
                              </span>
                            </div>
                            <span className="text-gray-500">{milestone.dueDate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationManagement;