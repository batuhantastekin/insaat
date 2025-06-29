import React, { useState } from 'react';
import { Eye, FileText, Camera, Download, Plus, Calendar } from 'lucide-react';
import { ProjectScenario, InspectionReport, InspectionFinding } from '../types';
import { formatCurrency } from '../utils/calculations';

interface InspectionReportsProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const InspectionReports: React.FC<InspectionReportsProps> = ({ scenario, language }) => {
  const [inspectionReports, setInspectionReports] = useState<InspectionReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<InspectionReport | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'details'>('list');

  const texts = {
    tr: {
      inspectionReports: 'Denetim Raporları',
      createReport: 'Yeni Rapor Oluştur',
      reportTitle: 'Rapor Başlığı',
      inspector: 'Denetçi',
      inspectionDate: 'Denetim Tarihi',
      inspectionType: 'Denetim Türü',
      status: 'Durum',
      score: 'Puan',
      findings: 'Bulgular',
      actions: 'İşlemler',
      viewDetails: 'Detayları Görüntüle',
      downloadReport: 'Raporu İndir',
      scheduled: 'Planlandı',
      inProgress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
      quality: 'Kalite',
      safety: 'Güvenlik',
      compliance: 'Uyumluluk',
      technical: 'Teknik',
      financial: 'Mali',
      reportDetails: 'Rapor Detayları',
      inspectionScope: 'Denetim Kapsamı',
      methodology: 'Metodoloji',
      summary: 'Özet',
      recommendations: 'Öneriler',
      followUp: 'Takip',
      photos: 'Fotoğraflar',
      documents: 'Belgeler',
      findingTitle: 'Bulgu Başlığı',
      severity: 'Önem Derecesi',
      category: 'Kategori',
      location: 'Konum',
      description: 'Açıklama',
      corrective: 'Düzeltici Eylem',
      responsible: 'Sorumlu',
      dueDate: 'Vade Tarihi',
      critical: 'Kritik',
      major: 'Büyük',
      minor: 'Küçük',
      observation: 'Gözlem',
      materials: 'Malzemeler',
      workmanship: 'İşçilik',
      design: 'Tasarım',
      environmental: 'Çevresel',
      inspectionMetrics: 'Denetim Metrikleri',
      totalReports: 'Toplam Rapor',
      averageScore: 'Ortalama Puan',
      criticalFindings: 'Kritik Bulgular',
      pendingActions: 'Bekleyen Eylemler'
    },
    en: {
      inspectionReports: 'Inspection Reports',
      createReport: 'Create New Report',
      reportTitle: 'Report Title',
      inspector: 'Inspector',
      inspectionDate: 'Inspection Date',
      inspectionType: 'Inspection Type',
      status: 'Status',
      score: 'Score',
      findings: 'Findings',
      actions: 'Actions',
      viewDetails: 'View Details',
      downloadReport: 'Download Report',
      scheduled: 'Scheduled',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      quality: 'Quality',
      safety: 'Safety',
      compliance: 'Compliance',
      technical: 'Technical',
      financial: 'Financial',
      reportDetails: 'Report Details',
      inspectionScope: 'Inspection Scope',
      methodology: 'Methodology',
      summary: 'Summary',
      recommendations: 'Recommendations',
      followUp: 'Follow Up',
      photos: 'Photos',
      documents: 'Documents',
      findingTitle: 'Finding Title',
      severity: 'Severity',
      category: 'Category',
      location: 'Location',
      description: 'Description',
      corrective: 'Corrective Action',
      responsible: 'Responsible',
      dueDate: 'Due Date',
      critical: 'Critical',
      major: 'Major',
      minor: 'Minor',
      observation: 'Observation',
      materials: 'Materials',
      workmanship: 'Workmanship',
      design: 'Design',
      environmental: 'Environmental',
      inspectionMetrics: 'Inspection Metrics',
      totalReports: 'Total Reports',
      averageScore: 'Average Score',
      criticalFindings: 'Critical Findings',
      pendingActions: 'Pending Actions'
    }
  };

  const t = texts[language];

  // Generate sample data
  React.useEffect(() => {
    const sampleReports: InspectionReport[] = [
      {
        id: 'report-1',
        title: language === 'tr' ? 'Aylık Kalite Denetimi - Ocak 2025' : 'Monthly Quality Inspection - January 2025',
        inspector: 'Kalite Kontrol Uzmanı - Ahmet Yılmaz',
        inspectionDate: '2025-01-22',
        inspectionType: 'quality',
        status: 'completed',
        scope: [
          'Beton kalitesi kontrolü',
          'Malzeme test sonuçları',
          'İşçilik kalitesi değerlendirmesi',
          'Teknik şartname uygunluğu'
        ],
        methodology: language === 'tr' 
          ? 'Görsel muayene, test sonuçları incelemesi, dokümantasyon kontrolü'
          : 'Visual inspection, test results review, documentation control',
        overallScore: 87.5,
        findings: [
          {
            id: 'finding-1',
            title: language === 'tr' ? 'Beton yüzey kalitesi sorunu' : 'Concrete surface quality issue',
            description: language === 'tr' 
              ? 'Temel betonunda yüzey pürüzlülüğü ve renk farklılıkları tespit edildi'
              : 'Surface roughness and color variations detected in foundation concrete',
            severity: 'major',
            category: 'materials',
            location: 'Temel - Bölge A',
            correctiveAction: language === 'tr' 
              ? 'Yüzey düzeltme işlemi yapılacak, beton karışım oranları gözden geçirilecek'
              : 'Surface correction work to be performed, concrete mix ratios to be reviewed',
            responsible: 'Saha Müdürü',
            dueDate: '2025-02-05',
            status: 'open',
            photos: ['finding1-1.jpg', 'finding1-2.jpg'],
            estimatedCost: 15000
          },
          {
            id: 'finding-2',
            title: language === 'tr' ? 'Donatı yerleşim uygunluğu' : 'Rebar placement compliance',
            description: language === 'tr' 
              ? 'Kolon donatıları projeye uygun şekilde yerleştirilmiş'
              : 'Column rebars placed in accordance with the project',
            severity: 'observation',
            category: 'workmanship',
            location: 'Kolonlar - Tüm akslar',
            correctiveAction: language === 'tr' ? 'Eylem gerekmiyor' : 'No action required',
            responsible: '-',
            status: 'closed',
            photos: ['finding2-1.jpg']
          }
        ],
        summary: language === 'tr' 
          ? 'Genel olarak kalite standartları karşılanmaktadır. Beton yüzey kalitesinde iyileştirme gereklidir.'
          : 'Quality standards are generally met. Improvement needed in concrete surface quality.',
        recommendations: [
          language === 'tr' ? 'Beton karışım oranlarını optimize edin' : 'Optimize concrete mix ratios',
          language === 'tr' ? 'Kalıp temizliği prosedürlerini güçlendirin' : 'Strengthen formwork cleaning procedures',
          language === 'tr' ? 'İşçi eğitimlerini artırın' : 'Increase worker training'
        ],
        followUpDate: '2025-02-22',
        photos: ['report1-1.jpg', 'report1-2.jpg', 'report1-3.jpg'],
        documents: ['Kalite kontrol raporu.pdf', 'Test sonuçları.pdf'],
        duration: 6,
        cost: 5000
      },
      {
        id: 'report-2',
        title: language === 'tr' ? 'Güvenlik Denetimi - Haftalık' : 'Safety Inspection - Weekly',
        inspector: 'İSG Uzmanı - Fatma Demir',
        inspectionDate: '2025-01-20',
        inspectionType: 'safety',
        status: 'completed',
        scope: [
          'Kişisel koruyucu donanım kontrolü',
          'İskele güvenliği',
          'Makine güvenliği',
          'Acil durum hazırlığı'
        ],
        methodology: language === 'tr' 
          ? 'Saha gezisi, güvenlik kontrol listesi, personel görüşmeleri'
          : 'Site tour, safety checklist, personnel interviews',
        overallScore: 92.3,
        findings: [
          {
            id: 'finding-3',
            title: language === 'tr' ? 'KKD kullanım eksikliği' : 'PPE usage deficiency',
            description: language === 'tr' 
              ? 'Bazı işçilerde baret ve güvenlik ayakkabısı kullanımında eksiklik'
              : 'Deficiency in helmet and safety shoes usage among some workers',
            severity: 'minor',
            category: 'safety',
            location: 'İnşaat sahası geneli',
            correctiveAction: language === 'tr' 
              ? 'KKD eğitimi tekrarlanacak, günlük kontroller artırılacak'
              : 'PPE training to be repeated, daily checks to be increased',
            responsible: 'İSG Uzmanı',
            dueDate: '2025-01-25',
            status: 'in-progress',
            photos: ['finding3-1.jpg']
          }
        ],
        summary: language === 'tr' 
          ? 'Güvenlik standartları genel olarak yüksek seviyede. KKD kullanımında iyileştirme gerekli.'
          : 'Safety standards are generally at high level. Improvement needed in PPE usage.',
        recommendations: [
          language === 'tr' ? 'Günlük güvenlik brifingleri yapın' : 'Conduct daily safety briefings',
          language === 'tr' ? 'KKD kontrol noktaları artırın' : 'Increase PPE checkpoints'
        ],
        followUpDate: '2025-01-27',
        photos: ['report2-1.jpg'],
        documents: ['Güvenlik denetim raporu.pdf'],
        duration: 4,
        cost: 2500
      }
    ];

    setInspectionReports(sampleReports);
  }, [language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-gray-100 text-gray-800',
      'open': 'bg-red-100 text-red-800',
      'closed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || colors['scheduled'];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'quality': 'bg-blue-100 text-blue-800',
      'safety': 'bg-red-100 text-red-800',
      'compliance': 'bg-purple-100 text-purple-800',
      'technical': 'bg-green-100 text-green-800',
      'financial': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || colors['quality'];
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      'critical': 'bg-red-100 text-red-800',
      'major': 'bg-orange-100 text-orange-800',
      'minor': 'bg-yellow-100 text-yellow-800',
      'observation': 'bg-green-100 text-green-800'
    };
    return colors[severity as keyof typeof colors] || colors['minor'];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'materials': 'bg-blue-100 text-blue-800',
      'workmanship': 'bg-green-100 text-green-800',
      'design': 'bg-purple-100 text-purple-800',
      'safety': 'bg-red-100 text-red-800',
      'environmental': 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || colors['materials'];
  };

  // Calculate metrics
  const completedReports = inspectionReports.filter(report => report.status === 'completed');
  const averageScore = completedReports.reduce((sum, report) => sum + report.overallScore, 0) / completedReports.length || 0;
  
  const allFindings = inspectionReports.flatMap(report => report.findings);
  const criticalFindings = allFindings.filter(finding => finding.severity === 'critical').length;
  const pendingActions = allFindings.filter(finding => finding.status === 'open' || finding.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {activeView === 'list' && (
        <>
          {/* Inspection Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">{t.totalReports}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{inspectionReports.length}</div>
              <div className="text-sm text-blue-700">{completedReports.length} tamamlandı</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Eye className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">{t.averageScore}</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{averageScore.toFixed(1)}</div>
              <div className="text-sm text-green-700">100 üzerinden</div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium text-red-800">{t.criticalFindings}</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{criticalFindings}</div>
              <div className="text-sm text-red-700">Kritik bulgu</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-orange-800">{t.pendingActions}</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{pendingActions}</div>
              <div className="text-sm text-orange-700">Bekleyen eylem</div>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.inspectionReports}</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.createReport}
            </button>
          </div>

          {/* Reports Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.reportTitle}</th>
                    <th className="text-left p-4 font-semibold">{t.inspector}</th>
                    <th className="text-center p-4 font-semibold">{t.inspectionType}</th>
                    <th className="text-center p-4 font-semibold">{t.inspectionDate}</th>
                    <th className="text-center p-4 font-semibold">{t.score}</th>
                    <th className="text-center p-4 font-semibold">{t.status}</th>
                    <th className="text-center p-4 font-semibold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {inspectionReports.map(report => (
                    <tr key={report.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-gray-500">
                            {report.findings.length} bulgu
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{report.inspector}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.inspectionType)}`}>
                          {t[report.inspectionType]}
                        </span>
                      </td>
                      <td className="p-4 text-center">{report.inspectionDate}</td>
                      <td className="p-4 text-center font-medium">
                        {report.overallScore.toFixed(1)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {t[report.status.replace('-', '') as keyof typeof t]}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedReport(report);
                              setActiveView('details');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            {t.viewDetails}
                          </button>
                          <button className="text-green-600 hover:text-green-800 text-xs">
                            <Download className="w-4 h-4" />
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

      {activeView === 'details' && selectedReport && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => setActiveView('list')}
                className="text-green-600 hover:text-green-800 mb-2 text-sm"
              >
                ← Geri
              </button>
              <h3 className="text-xl font-bold">{selectedReport.title}</h3>
              <p className="text-gray-600">{selectedReport.inspector} - {selectedReport.inspectionDate}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                {t[selectedReport.status.replace('-', '') as keyof typeof t]}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedReport.inspectionType)}`}>
                {t[selectedReport.inspectionType]}
              </span>
            </div>
          </div>

          {/* Report Overview */}
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{selectedReport.overallScore.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Genel Puan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{selectedReport.findings.length}</div>
                <div className="text-sm text-gray-600">Toplam Bulgu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {selectedReport.findings.filter(f => f.status === 'open').length}
                </div>
                <div className="text-sm text-gray-600">Açık Bulgu</div>
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inspection Scope */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.inspectionScope}</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {selectedReport.scope.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Methodology */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.methodology}</h4>
              <p className="text-sm text-gray-600">{selectedReport.methodology}</p>
            </div>

            {/* Summary */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.summary}</h4>
              <p className="text-sm text-gray-600">{selectedReport.summary}</p>
            </div>

            {/* Recommendations */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{t.recommendations}</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {selectedReport.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Findings */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h4 className="font-semibold text-gray-900">{t.findings}</h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.findingTitle}</th>
                    <th className="text-center p-4 font-semibold">{t.severity}</th>
                    <th className="text-center p-4 font-semibold">{t.category}</th>
                    <th className="text-left p-4 font-semibold">{t.location}</th>
                    <th className="text-left p-4 font-semibold">{t.responsible}</th>
                    <th className="text-center p-4 font-semibold">{t.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReport.findings.map(finding => (
                    <tr key={finding.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{finding.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{finding.description}</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                          {t[finding.severity]}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(finding.category)}`}>
                          {t[finding.category]}
                        </span>
                      </td>
                      <td className="p-4">{finding.location}</td>
                      <td className="p-4">{finding.responsible}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                          {t[finding.status.replace('-', '') as keyof typeof t]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Photos and Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photos */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                {t.photos}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {selectedReport.photos.map((photo, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-xs text-gray-500">{photo}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                {t.documents}
              </h4>
              <div className="space-y-2">
                {selectedReport.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{doc}</span>
                    <Download className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionReports;