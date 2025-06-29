import React, { useState } from 'react';
import { Plus, FileText, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ProjectScenario, Contract, ContractMilestone, ContractPayment } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ContractManagementProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ContractManagement: React.FC<ContractManagementProps> = ({ scenario, language }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'details' | 'milestones' | 'payments'>('list');

  const texts = {
    tr: {
      contractManagement: 'Sözleşme Yönetimi',
      createContract: 'Yeni Sözleşme Oluştur',
      contractNumber: 'Sözleşme No',
      title: 'Başlık',
      supplier: 'Tedarikçi',
      value: 'Değer',
      status: 'Durum',
      startDate: 'Başlangıç Tarihi',
      endDate: 'Bitiş Tarihi',
      actions: 'İşlemler',
      viewDetails: 'Detayları Görüntüle',
      viewMilestones: 'Kilometre Taşları',
      viewPayments: 'Ödemeler',
      editContract: 'Sözleşmeyi Düzenle',
      draft: 'Taslak',
      active: 'Aktif',
      completed: 'Tamamlandı',
      terminated: 'Feshedildi',
      suspended: 'Askıya Alındı',
      contractDetails: 'Sözleşme Detayları',
      basicInfo: 'Temel Bilgiler',
      terms: 'Şartlar',
      performance: 'Performans',
      documents: 'Belgeler',
      risks: 'Riskler',
      type: 'Tür',
      currency: 'Para Birimi',
      duration: 'Süre',
      days: 'gün',
      paymentTerms: 'Ödeme Şartları',
      deliveryTerms: 'Teslimat Şartları',
      qualityStandards: 'Kalite Standartları',
      penalties: 'Cezalar',
      warranties: 'Garantiler',
      qualityRating: 'Kalite Değerlendirmesi',
      timelyDelivery: 'Zamanında Teslimat',
      budgetCompliance: 'Bütçe Uyumu',
      overallSatisfaction: 'Genel Memnuniyet',
      milestones: 'Kilometre Taşları',
      milestoneName: 'Kilometre Taşı Adı',
      dueDate: 'Vade Tarihi',
      milestoneValue: 'Değer',
      milestoneStatus: 'Durum',
      deliverables: 'Teslim Edilecekler',
      acceptanceCriteria: 'Kabul Kriterleri',
      payments: 'Ödemeler',
      amount: 'Tutar',
      paymentStatus: 'Ödeme Durumu',
      invoiceNumber: 'Fatura No',
      paymentDate: 'Ödeme Tarihi',
      pending: 'Bekliyor',
      approved: 'Onaylandı',
      paid: 'Ödendi',
      overdue: 'Vadesi Geçti',
      disputed: 'İtirazlı',
      inProgress: 'Devam Ediyor',
      delayed: 'Gecikti',
      cancelled: 'İptal Edildi',
      supply: 'Tedarik',
      service: 'Hizmet',
      construction: 'İnşaat',
      consulting: 'Danışmanlık'
    },
    en: {
      contractManagement: 'Contract Management',
      createContract: 'Create New Contract',
      contractNumber: 'Contract No',
      title: 'Title',
      supplier: 'Supplier',
      value: 'Value',
      status: 'Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      actions: 'Actions',
      viewDetails: 'View Details',
      viewMilestones: 'Milestones',
      viewPayments: 'Payments',
      editContract: 'Edit Contract',
      draft: 'Draft',
      active: 'Active',
      completed: 'Completed',
      terminated: 'Terminated',
      suspended: 'Suspended',
      contractDetails: 'Contract Details',
      basicInfo: 'Basic Information',
      terms: 'Terms',
      performance: 'Performance',
      documents: 'Documents',
      risks: 'Risks',
      type: 'Type',
      currency: 'Currency',
      duration: 'Duration',
      days: 'days',
      paymentTerms: 'Payment Terms',
      deliveryTerms: 'Delivery Terms',
      qualityStandards: 'Quality Standards',
      penalties: 'Penalties',
      warranties: 'Warranties',
      qualityRating: 'Quality Rating',
      timelyDelivery: 'Timely Delivery',
      budgetCompliance: 'Budget Compliance',
      overallSatisfaction: 'Overall Satisfaction',
      milestones: 'Milestones',
      milestoneName: 'Milestone Name',
      dueDate: 'Due Date',
      milestoneValue: 'Value',
      milestoneStatus: 'Status',
      deliverables: 'Deliverables',
      acceptanceCriteria: 'Acceptance Criteria',
      payments: 'Payments',
      amount: 'Amount',
      paymentStatus: 'Payment Status',
      invoiceNumber: 'Invoice Number',
      paymentDate: 'Payment Date',
      pending: 'Pending',
      approved: 'Approved',
      paid: 'Paid',
      overdue: 'Overdue',
      disputed: 'Disputed',
      inProgress: 'In Progress',
      delayed: 'Delayed',
      cancelled: 'Cancelled',
      supply: 'Supply',
      service: 'Service',
      construction: 'Construction',
      consulting: 'Consulting'
    }
  };

  const t = texts[language];

  // Generate sample contracts
  React.useEffect(() => {
    const sampleContracts: Contract[] = [
      {
        id: 'contract-1',
        contractNumber: 'SOZ-2025-001',
        title: language === 'tr' ? 'Beton Tedarik Sözleşmesi' : 'Concrete Supply Contract',
        projectId: scenario.id,
        supplierId: 'supplier-1',
        type: 'supply',
        value: 2500000,
        currency: 'TL',
        status: 'active',
        timeline: {
          startDate: '2025-02-01',
          endDate: '2025-08-01',
          duration: 180
        },
        terms: {
          paymentTerms: '30 gün vadeli',
          deliveryTerms: 'Sahaya teslim',
          qualityStandards: 'TSE standartları',
          penalties: 'Gecikme için günlük %0.1',
          warranties: '1 yıl garanti'
        },
        milestones: [
          {
            id: 'milestone-1',
            name: 'İlk Teslimat',
            description: 'Projenin ilk fazı için beton teslimatı',
            dueDate: '2025-03-01',
            value: 500000,
            status: 'completed',
            deliverables: ['C25/30 beton 200m³'],
            acceptanceCriteria: ['Kalite kontrol testleri', 'Mukavemet testleri'],
            completedDate: '2025-02-28'
          },
          {
            id: 'milestone-2',
            name: 'İkinci Teslimat',
            description: 'Projenin ikinci fazı için beton teslimatı',
            dueDate: '2025-04-15',
            value: 750000,
            status: 'in-progress',
            deliverables: ['C25/30 beton 300m³'],
            acceptanceCriteria: ['Kalite kontrol testleri', 'Mukavemet testleri']
          }
        ],
        payments: [
          {
            id: 'payment-1',
            milestoneId: 'milestone-1',
            amount: 500000,
            dueDate: '2025-03-15',
            status: 'paid',
            paymentDate: '2025-03-10',
            invoiceNumber: 'FAT-2025-001'
          },
          {
            id: 'payment-2',
            milestoneId: 'milestone-2',
            amount: 750000,
            dueDate: '2025-04-30',
            status: 'pending'
          }
        ],
        performance: {
          qualityRating: 4.5,
          timelyDelivery: 95,
          budgetCompliance: 98,
          overallSatisfaction: 4.3
        },
        documents: {
          signedContract: true,
          specifications: true,
          insurancePolicies: true,
          guarantees: true
        },
        risks: {
          identified: ['Hava koşulları', 'Malzeme fiyat artışı'],
          mitigation: ['Alternatif teslimat planı', 'Fiyat garantisi'],
          contingency: ['Yedek tedarikçi', 'Stok artırımı']
        },
        createdBy: 'project-manager',
        createdAt: '2025-01-15',
        updatedAt: '2025-01-15'
      },
      {
        id: 'contract-2',
        contractNumber: 'SOZ-2025-002',
        title: language === 'tr' ? 'Elektrik Tesisat Sözleşmesi' : 'Electrical Installation Contract',
        projectId: scenario.id,
        supplierId: 'supplier-2',
        type: 'service',
        value: 1800000,
        currency: 'TL',
        status: 'active',
        timeline: {
          startDate: '2025-02-15',
          endDate: '2025-07-15',
          duration: 150
        },
        terms: {
          paymentTerms: '45 gün vadeli',
          deliveryTerms: 'Aşamalı teslim',
          qualityStandards: 'Elektrik yönetmeliği',
          penalties: 'Gecikme için günlük %0.15',
          warranties: '2 yıl garanti'
        },
        milestones: [
          {
            id: 'milestone-3',
            name: 'Altyapı Kurulumu',
            description: 'Elektrik altyapısının kurulumu',
            dueDate: '2025-04-01',
            value: 600000,
            status: 'pending',
            deliverables: ['Ana dağıtım panosu', 'Kablo döşemesi'],
            acceptanceCriteria: ['Test raporları', 'Güvenlik kontrolleri']
          }
        ],
        payments: [],
        performance: {
          qualityRating: 0,
          timelyDelivery: 0,
          budgetCompliance: 0,
          overallSatisfaction: 0
        },
        documents: {
          signedContract: true,
          specifications: true,
          insurancePolicies: true,
          guarantees: false
        },
        risks: {
          identified: ['Malzeme tedarik sorunu', 'Teknik personel eksikliği'],
          mitigation: ['Erken sipariş', 'Eğitim programı'],
          contingency: ['Alternatif tedarikçi', 'Dış kaynak']
        },
        createdBy: 'project-manager',
        createdAt: '2025-01-20',
        updatedAt: '2025-01-20'
      }
    ];
    setContracts(sampleContracts);
  }, [scenario.id, language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'terminated': 'bg-red-100 text-red-800',
      'suspended': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || colors['draft'];
  };

  const getMilestoneStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'delayed': 'bg-red-100 text-red-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'paid': 'bg-green-100 text-green-800',
      'overdue': 'bg-red-100 text-red-800',
      'disputed': 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'supply': 'bg-blue-100 text-blue-800',
      'service': 'bg-green-100 text-green-800',
      'construction': 'bg-orange-100 text-orange-800',
      'consulting': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors['supply'];
  };

  return (
    <div className="space-y-6">
      {activeView === 'list' && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.contractManagement}</h3>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.createContract}
            </button>
          </div>

          {/* Contracts Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.contractNumber}</th>
                    <th className="text-left p-4 font-semibold">{t.title}</th>
                    <th className="text-left p-4 font-semibold">{t.type}</th>
                    <th className="text-right p-4 font-semibold">{t.value}</th>
                    <th className="text-center p-4 font-semibold">{t.status}</th>
                    <th className="text-center p-4 font-semibold">{t.endDate}</th>
                    <th className="text-center p-4 font-semibold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map(contract => (
                    <tr key={contract.id} className="border-t border-gray-200">
                      <td className="p-4 font-medium">{contract.contractNumber}</td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{contract.title}</div>
                          <div className="text-xs text-gray-500">
                            {contract.timeline.duration} {t.days}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
                          {t[contract.type]}
                        </span>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(contract.value)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {t[contract.status]}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {new Date(contract.timeline.endDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedContract(contract);
                              setActiveView('details');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            {t.viewDetails}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedContract(contract);
                              setActiveView('milestones');
                            }}
                            className="text-green-600 hover:text-green-800 text-xs"
                          >
                            {t.viewMilestones}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedContract(contract);
                              setActiveView('payments');
                            }}
                            className="text-purple-600 hover:text-purple-800 text-xs"
                          >
                            {t.viewPayments}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeView === 'details' && selectedContract && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => setActiveView('list')}
                className="text-orange-600 hover:text-orange-800 mb-2 text-sm"
              >
                ← Geri
              </button>
              <h3 className="text-xl font-bold">{selectedContract.title}</h3>
              <p className="text-gray-600">{selectedContract.contractNumber}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedContract.status)}`}>
              {t[selectedContract.status]}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.basicInfo}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.type}:</span>
                  <span className="font-medium">{t[selectedContract.type]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.value}:</span>
                  <span className="font-medium">{formatCurrency(selectedContract.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.currency}:</span>
                  <span className="font-medium">{selectedContract.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.duration}:</span>
                  <span className="font-medium">{selectedContract.timeline.duration} {t.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.startDate}:</span>
                  <span className="font-medium">
                    {new Date(selectedContract.timeline.startDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.endDate}:</span>
                  <span className="font-medium">
                    {new Date(selectedContract.timeline.endDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.terms}</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600 font-medium">{t.paymentTerms}:</span>
                  <p className="mt-1">{selectedContract.terms.paymentTerms}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">{t.deliveryTerms}:</span>
                  <p className="mt-1">{selectedContract.terms.deliveryTerms}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">{t.qualityStandards}:</span>
                  <p className="mt-1">{selectedContract.terms.qualityStandards}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">{t.penalties}:</span>
                  <p className="mt-1">{selectedContract.terms.penalties}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">{t.warranties}:</span>
                  <p className="mt-1">{selectedContract.terms.warranties}</p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.performance}</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t.qualityRating}:</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(selectedContract.performance.qualityRating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedContract.performance.qualityRating}/5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t.timelyDelivery}:</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${selectedContract.performance.timelyDelivery}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedContract.performance.timelyDelivery}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t.budgetCompliance}:</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${selectedContract.performance.budgetCompliance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedContract.performance.budgetCompliance}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risks */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.risks}</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Tanımlanan Riskler</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedContract.risks.identified.map((risk, index) => (
                      <li key={index}>• {risk}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Risk Azaltma</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedContract.risks.mitigation.map((mitigation, index) => (
                      <li key={index}>• {mitigation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'milestones' && selectedContract && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => setActiveView('list')}
                className="text-orange-600 hover:text-orange-800 mb-2 text-sm"
              >
                ← Geri
              </button>
              <h3 className="text-xl font-bold">{selectedContract.title} - {t.milestones}</h3>
            </div>
          </div>

          {/* Milestones Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.milestoneName}</th>
                    <th className="text-center p-4 font-semibold">{t.dueDate}</th>
                    <th className="text-right p-4 font-semibold">{t.milestoneValue}</th>
                    <th className="text-center p-4 font-semibold">{t.milestoneStatus}</th>
                    <th className="text-left p-4 font-semibold">{t.deliverables}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedContract.milestones.map(milestone => (
                    <tr key={milestone.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-xs text-gray-500">{milestone.description}</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {new Date(milestone.dueDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(milestone.value)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                          {t[milestone.status.replace('-', '') as keyof typeof t]}
                        </span>
                      </td>
                      <td className="p-4">
                        <ul className="text-xs space-y-1">
                          {milestone.deliverables.map((deliverable, index) => (
                            <li key={index}>• {deliverable}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'payments' && selectedContract && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => setActiveView('list')}
                className="text-orange-600 hover:text-orange-800 mb-2 text-sm"
              >
                ← Geri
              </button>
              <h3 className="text-xl font-bold">{selectedContract.title} - {t.payments}</h3>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Kilometre Taşı</th>
                    <th className="text-right p-4 font-semibold">{t.amount}</th>
                    <th className="text-center p-4 font-semibold">{t.dueDate}</th>
                    <th className="text-center p-4 font-semibold">{t.paymentStatus}</th>
                    <th className="text-left p-4 font-semibold">{t.invoiceNumber}</th>
                    <th className="text-center p-4 font-semibold">{t.paymentDate}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedContract.payments.map(payment => {
                    const milestone = selectedContract.milestones.find(m => m.id === payment.milestoneId);
                    return (
                      <tr key={payment.id} className="border-t border-gray-200">
                        <td className="p-4">
                          {milestone ? milestone.name : 'Genel Ödeme'}
                        </td>
                        <td className="p-4 text-right font-medium">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="p-4 text-center">
                          {new Date(payment.dueDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {t[payment.status]}
                          </span>
                        </td>
                        <td className="p-4">
                          {payment.invoiceNumber || '-'}
                        </td>
                        <td className="p-4 text-center">
                          {payment.paymentDate 
                            ? new Date(payment.paymentDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')
                            : '-'
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractManagement;