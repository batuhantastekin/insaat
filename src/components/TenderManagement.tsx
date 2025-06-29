import React, { useState } from 'react';
import { Plus, Calendar, FileText, Users, Award, Clock, AlertCircle } from 'lucide-react';
import { ProjectScenario, TenderProcess, TenderSubmission } from '../types';
import { formatCurrency } from '../utils/calculations';

interface TenderManagementProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const TenderManagement: React.FC<TenderManagementProps> = ({ scenario, language }) => {
  const [tenders, setTenders] = useState<TenderProcess[]>([]);
  const [selectedTender, setSelectedTender] = useState<TenderProcess | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'details' | 'submissions'>('list');

  const texts = {
    tr: {
      tenderManagement: 'İhale Yönetimi',
      createTender: 'Yeni İhale Oluştur',
      tenderTitle: 'İhale Başlığı',
      category: 'Kategori',
      estimatedValue: 'Tahmini Değer',
      status: 'Durum',
      submissionDeadline: 'Teklif Son Tarihi',
      actions: 'İşlemler',
      viewDetails: 'Detayları Görüntüle',
      viewSubmissions: 'Teklifleri Görüntüle',
      editTender: 'İhaleyi Düzenle',
      publishTender: 'İhaleyi Yayınla',
      cancelTender: 'İhaleyi İptal Et',
      draft: 'Taslak',
      published: 'Yayınlandı',
      submissionPeriod: 'Teklif Dönemi',
      evaluation: 'Değerlendirme',
      awarded: 'Kazanan Belirlendi',
      cancelled: 'İptal Edildi',
      tenderDetails: 'İhale Detayları',
      description: 'Açıklama',
      requirements: 'Gereksinimler',
      timeline: 'Zaman Çizelgesi',
      evaluationCriteria: 'Değerlendirme Kriterleri',
      invitedSuppliers: 'Davet Edilen Tedarikçiler',
      submissions: 'Gelen Teklifler',
      technical: 'Teknik',
      financial: 'Mali',
      legal: 'Hukuki',
      experience: 'Deneyim',
      publishDate: 'Yayın Tarihi',
      evaluationPeriod: 'Değerlendirme Dönemi',
      awardDate: 'Kazanan Açıklama Tarihi',
      contractStart: 'Sözleşme Başlangıcı',
      price: 'Fiyat',
      quality: 'Kalite',
      delivery: 'Teslimat',
      submissionDate: 'Teklif Tarihi',
      totalPrice: 'Toplam Fiyat',
      deliveryTime: 'Teslimat Süresi',
      technicalScore: 'Teknik Puan',
      financialScore: 'Mali Puan',
      overallScore: 'Genel Puan',
      days: 'gün',
      supplier: 'Tedarikçi',
      open: 'Açık',
      restricted: 'Kısıtlı',
      negotiated: 'Pazarlık Usulü',
      competitiveDialogue: 'Rekabetçi Diyalog'
    },
    en: {
      tenderManagement: 'Tender Management',
      createTender: 'Create New Tender',
      tenderTitle: 'Tender Title',
      category: 'Category',
      estimatedValue: 'Estimated Value',
      status: 'Status',
      submissionDeadline: 'Submission Deadline',
      actions: 'Actions',
      viewDetails: 'View Details',
      viewSubmissions: 'View Submissions',
      editTender: 'Edit Tender',
      publishTender: 'Publish Tender',
      cancelTender: 'Cancel Tender',
      draft: 'Draft',
      published: 'Published',
      submissionPeriod: 'Submission Period',
      evaluation: 'Evaluation',
      awarded: 'Awarded',
      cancelled: 'Cancelled',
      tenderDetails: 'Tender Details',
      description: 'Description',
      requirements: 'Requirements',
      timeline: 'Timeline',
      evaluationCriteria: 'Evaluation Criteria',
      invitedSuppliers: 'Invited Suppliers',
      submissions: 'Submissions',
      technical: 'Technical',
      financial: 'Financial',
      legal: 'Legal',
      experience: 'Experience',
      publishDate: 'Publish Date',
      evaluationPeriod: 'Evaluation Period',
      awardDate: 'Award Date',
      contractStart: 'Contract Start',
      price: 'Price',
      quality: 'Quality',
      delivery: 'Delivery',
      submissionDate: 'Submission Date',
      totalPrice: 'Total Price',
      deliveryTime: 'Delivery Time',
      technicalScore: 'Technical Score',
      financialScore: 'Financial Score',
      overallScore: 'Overall Score',
      days: 'days',
      supplier: 'Supplier',
      open: 'Open',
      restricted: 'Restricted',
      negotiated: 'Negotiated',
      competitiveDialogue: 'Competitive Dialogue'
    }
  };

  const t = texts[language];

  // Generate sample tenders
  React.useEffect(() => {
    const sampleTenders: TenderProcess[] = [
      {
        id: 'tender-1',
        title: language === 'tr' ? 'Beton Tedariki İhalesi' : 'Concrete Supply Tender',
        description: language === 'tr' 
          ? 'Proje için gerekli C25/30 beton tedariki' 
          : 'Supply of C25/30 concrete for the project',
        category: 'materials',
        projectId: scenario.id,
        estimatedValue: 2500000,
        currency: 'TL',
        tenderType: 'open',
        status: 'submission-period',
        timeline: {
          publishDate: '2025-01-10',
          submissionDeadline: '2025-01-25',
          evaluationPeriod: '2025-01-26 - 2025-02-05',
          awardDate: '2025-02-06',
          contractStart: '2025-02-10'
        },
        requirements: {
          technical: ['TSE belgesi', 'Kalite kontrol sistemi', 'Laboratuvar raporu'],
          financial: ['Mali durum raporu', 'Banka teminat mektubu'],
          legal: ['Vergi levhası', 'Ticaret sicil belgesi'],
          experience: ['Son 3 yılda benzer projeler', 'Referans mektupları']
        },
        evaluationCriteria: {
          price: 40,
          quality: 25,
          delivery: 20,
          experience: 10,
          technical: 5
        },
        documents: {
          specifications: ['Teknik şartname', 'Kalite standartları'],
          drawings: ['Proje planları'],
          conditions: ['Genel şartlar', 'Özel şartlar'],
          forms: ['Teklif formu', 'Fiyat listesi']
        },
        invitedSuppliers: ['supplier-1', 'supplier-2'],
        submissions: [],
        createdBy: 'project-manager',
        createdAt: '2025-01-10',
        updatedAt: '2025-01-15'
      },
      {
        id: 'tender-2',
        title: language === 'tr' ? 'Elektrik Tesisat İhalesi' : 'Electrical Installation Tender',
        description: language === 'tr' 
          ? 'Binanın elektrik tesisatı kurulumu' 
          : 'Building electrical installation setup',
        category: 'services',
        projectId: scenario.id,
        estimatedValue: 1800000,
        currency: 'TL',
        tenderType: 'restricted',
        status: 'evaluation',
        timeline: {
          publishDate: '2025-01-05',
          submissionDeadline: '2025-01-20',
          evaluationPeriod: '2025-01-21 - 2025-01-30',
          awardDate: '2025-01-31',
          contractStart: '2025-02-05'
        },
        requirements: {
          technical: ['Elektrik yeterlilik belgesi', 'İSG sertifikası'],
          financial: ['Son 2 yıl bilanço', 'Kredi referansı'],
          legal: ['Vergi borcu yokluk belgesi'],
          experience: ['Elektrik tesisat deneyimi', 'Benzer proje referansları']
        },
        evaluationCriteria: {
          price: 35,
          quality: 30,
          delivery: 15,
          experience: 15,
          technical: 5
        },
        documents: {
          specifications: ['Elektrik projesi', 'Malzeme listesi'],
          drawings: ['Elektrik şemaları'],
          conditions: ['Sözleşme şartları'],
          forms: ['Teklif formu']
        },
        invitedSuppliers: ['supplier-2'],
        submissions: [],
        createdBy: 'project-manager',
        createdAt: '2025-01-05',
        updatedAt: '2025-01-20'
      }
    ];
    setTenders(sampleTenders);
  }, [scenario.id, language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'published': 'bg-blue-100 text-blue-800',
      'submission-period': 'bg-green-100 text-green-800',
      'evaluation': 'bg-yellow-100 text-yellow-800',
      'awarded': 'bg-purple-100 text-purple-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors['draft'];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'materials': 'bg-blue-100 text-blue-800',
      'labor': 'bg-green-100 text-green-800',
      'equipment': 'bg-orange-100 text-orange-800',
      'services': 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || colors['materials'];
  };

  const getTenderTypeColor = (type: string) => {
    const colors = {
      'open': 'bg-green-100 text-green-800',
      'restricted': 'bg-yellow-100 text-yellow-800',
      'negotiated': 'bg-orange-100 text-orange-800',
      'competitive-dialogue': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors['open'];
  };

  const isDeadlineApproaching = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  const isOverdue = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  return (
    <div className="space-y-6">
      {activeView === 'list' && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.tenderManagement}</h3>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.createTender}
            </button>
          </div>

          {/* Tenders Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.tenderTitle}</th>
                    <th className="text-left p-4 font-semibold">{t.category}</th>
                    <th className="text-right p-4 font-semibold">{t.estimatedValue}</th>
                    <th className="text-center p-4 font-semibold">{t.status}</th>
                    <th className="text-center p-4 font-semibold">{t.submissionDeadline}</th>
                    <th className="text-center p-4 font-semibold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {tenders.map(tender => (
                    <tr key={tender.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{tender.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            <span className={`px-2 py-1 rounded-full ${getTenderTypeColor(tender.tenderType)}`}>
                              {t[tender.tenderType.replace('-', '') as keyof typeof t]}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tender.category)}`}>
                          {tender.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(tender.estimatedValue)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tender.status)}`}>
                          {t[tender.status.replace('-', '') as keyof typeof t]}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          {isOverdue(tender.timeline.submissionDeadline) && (
                            <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                          )}
                          {isDeadlineApproaching(tender.timeline.submissionDeadline) && !isOverdue(tender.timeline.submissionDeadline) && (
                            <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                          )}
                          <span className={`text-sm ${
                            isOverdue(tender.timeline.submissionDeadline) ? 'text-red-600 font-medium' :
                            isDeadlineApproaching(tender.timeline.submissionDeadline) ? 'text-yellow-600 font-medium' :
                            'text-gray-600'
                          }`}>
                            {new Date(tender.timeline.submissionDeadline).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTender(tender);
                              setActiveView('details');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            {t.viewDetails}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTender(tender);
                              setActiveView('submissions');
                            }}
                            className="text-green-600 hover:text-green-800 text-xs"
                          >
                            {t.viewSubmissions}
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

      {activeView === 'details' && selectedTender && (
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
              <h3 className="text-xl font-bold">{selectedTender.title}</h3>
              <p className="text-gray-600">{selectedTender.description}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTender.status)}`}>
                {t[selectedTender.status.replace('-', '') as keyof typeof t]}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedTender.category)}`}>
                {selectedTender.category}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Temel Bilgiler</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.estimatedValue}:</span>
                  <span className="font-medium">{formatCurrency(selectedTender.estimatedValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">İhale Türü:</span>
                  <span className="font-medium">{t[selectedTender.tenderType.replace('-', '') as keyof typeof t]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Para Birimi:</span>
                  <span className="font-medium">{selectedTender.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Davet Edilen Tedarikçi:</span>
                  <span className="font-medium">{selectedTender.invitedSuppliers.length}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.timeline}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.publishDate}:</span>
                  <span className="font-medium">
                    {new Date(selectedTender.timeline.publishDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.submissionDeadline}:</span>
                  <span className="font-medium">
                    {new Date(selectedTender.timeline.submissionDeadline).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.evaluationPeriod}:</span>
                  <span className="font-medium">{selectedTender.timeline.evaluationPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.awardDate}:</span>
                  <span className="font-medium">
                    {new Date(selectedTender.timeline.awardDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.requirements}</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">{t.technical}</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedTender.requirements.technical.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">{t.financial}</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedTender.requirements.financial.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.evaluationCriteria}</h4>
              <div className="space-y-3">
                {Object.entries(selectedTender.evaluationCriteria).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <div className="w-20 text-sm font-medium text-gray-700">
                      {t[key as keyof typeof t]}:
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-semibold">
                      {value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'submissions' && selectedTender && (
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
              <h3 className="text-xl font-bold">{selectedTender.title} - {t.submissions}</h3>
            </div>
          </div>

          {/* Submissions would be displayed here */}
          <div className="bg-white border rounded-lg p-6">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Henüz teklif gelmemiş</p>
              <p className="text-sm text-gray-400 mt-2">
                Teklif son tarihi: {new Date(selectedTender.timeline.submissionDeadline).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderManagement;