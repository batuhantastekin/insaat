import React, { useState } from 'react';
import { Shield, AlertTriangle, Users, FileText, HardHat, Eye, Plus } from 'lucide-react';
import { ProjectScenario, SafetyIncident, SafetyTraining, SafetyInspection } from '../types';

interface SafetyManagementProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const SafetyManagement: React.FC<SafetyManagementProps> = ({ scenario, language }) => {
  const [safetyIncidents, setSafetyIncidents] = useState<SafetyIncident[]>([]);
  const [safetyTrainings, setSafetyTrainings] = useState<SafetyTraining[]>([]);
  const [safetyInspections, setSafetyInspections] = useState<SafetyInspection[]>([]);
  const [selectedView, setSelectedView] = useState<'incidents' | 'training' | 'inspections'>('incidents');

  const texts = {
    tr: {
      safetyManagement: 'Güvenlik Yönetimi',
      safetyIncidents: 'Güvenlik Olayları',
      safetyTraining: 'Güvenlik Eğitimleri',
      safetyInspections: 'Güvenlik Denetimleri',
      addIncident: 'Olay Ekle',
      addTraining: 'Eğitim Ekle',
      addInspection: 'Denetim Ekle',
      incidentType: 'Olay Türü',
      severity: 'Önem Derecesi',
      date: 'Tarih',
      location: 'Konum',
      description: 'Açıklama',
      reportedBy: 'Rapor Eden',
      status: 'Durum',
      investigation: 'Soruşturma',
      corrective: 'Düzeltici Eylem',
      preventive: 'Önleyici Eylem',
      trainingTitle: 'Eğitim Başlığı',
      trainer: 'Eğitmen',
      participants: 'Katılımcılar',
      duration: 'Süre',
      certificate: 'Sertifika',
      inspectionTitle: 'Denetim Başlığı',
      inspector: 'Denetçi',
      score: 'Puan',
      findings: 'Bulgular',
      recommendations: 'Öneriler',
      accident: 'Kaza',
      nearMiss: 'Ramak Kala',
      unsafe: 'Güvensiz Durum',
      violation: 'İhlal',
      minor: 'Hafif',
      major: 'Ciddi',
      critical: 'Kritik',
      open: 'Açık',
      investigating: 'Soruşturuluyor',
      closed: 'Kapatıldı',
      completed: 'Tamamlandı',
      scheduled: 'Planlandı',
      cancelled: 'İptal Edildi',
      hours: 'saat',
      people: 'kişi',
      safetyMetrics: 'Güvenlik Metrikleri',
      incidentRate: 'Olay Oranı',
      trainingCompliance: 'Eğitim Uyumu',
      inspectionScore: 'Denetim Puanı',
      daysWithoutIncident: 'Olaysız Gün'
    },
    en: {
      safetyManagement: 'Safety Management',
      safetyIncidents: 'Safety Incidents',
      safetyTraining: 'Safety Training',
      safetyInspections: 'Safety Inspections',
      addIncident: 'Add Incident',
      addTraining: 'Add Training',
      addInspection: 'Add Inspection',
      incidentType: 'Incident Type',
      severity: 'Severity',
      date: 'Date',
      location: 'Location',
      description: 'Description',
      reportedBy: 'Reported By',
      status: 'Status',
      investigation: 'Investigation',
      corrective: 'Corrective Action',
      preventive: 'Preventive Action',
      trainingTitle: 'Training Title',
      trainer: 'Trainer',
      participants: 'Participants',
      duration: 'Duration',
      certificate: 'Certificate',
      inspectionTitle: 'Inspection Title',
      inspector: 'Inspector',
      score: 'Score',
      findings: 'Findings',
      recommendations: 'Recommendations',
      accident: 'Accident',
      nearMiss: 'Near Miss',
      unsafe: 'Unsafe Condition',
      violation: 'Violation',
      minor: 'Minor',
      major: 'Major',
      critical: 'Critical',
      open: 'Open',
      investigating: 'Investigating',
      closed: 'Closed',
      completed: 'Completed',
      scheduled: 'Scheduled',
      cancelled: 'Cancelled',
      hours: 'hours',
      people: 'people',
      safetyMetrics: 'Safety Metrics',
      incidentRate: 'Incident Rate',
      trainingCompliance: 'Training Compliance',
      inspectionScore: 'Inspection Score',
      daysWithoutIncident: 'Days Without Incident'
    }
  };

  const t = texts[language];

  // Generate sample data
  React.useEffect(() => {
    const sampleIncidents: SafetyIncident[] = [
      {
        id: 'incident-1',
        type: 'near-miss',
        title: language === 'tr' ? 'Malzeme düşme riski' : 'Material falling risk',
        description: language === 'tr' ? 'Vinçten malzeme düşme riski tespit edildi' : 'Risk of material falling from crane detected',
        severity: 'major',
        date: '2025-01-20',
        time: '14:30',
        location: 'İnşaat sahası - Vinç alanı',
        reportedBy: 'İSG Uzmanı',
        involvedPersons: ['Vinç operatörü'],
        witnesses: ['Saha müdürü', 'İşçi'],
        status: 'investigating',
        investigation: {
          investigator: 'İSG Uzmanı',
          startDate: '2025-01-20',
          findings: language === 'tr' ? 'Vinç halatında aşınma tespit edildi' : 'Wear detected on crane cable',
          rootCause: language === 'tr' ? 'Düzenli bakım eksikliği' : 'Lack of regular maintenance'
        },
        correctiveActions: [
          language === 'tr' ? 'Vinç halatı değiştirildi' : 'Crane cable replaced',
          language === 'tr' ? 'Acil bakım yapıldı' : 'Emergency maintenance performed'
        ],
        preventiveActions: [
          language === 'tr' ? 'Haftalık vinç kontrolü başlatıldı' : 'Weekly crane inspection initiated',
          language === 'tr' ? 'Operatör eğitimi planlandı' : 'Operator training planned'
        ],
        photos: ['incident1-1.jpg', 'incident1-2.jpg'],
        estimatedCost: 15000,
        actualCost: 12000
      },
      {
        id: 'incident-2',
        type: 'unsafe',
        title: language === 'tr' ? 'Güvensiz çalışma platformu' : 'Unsafe work platform',
        description: language === 'tr' ? 'İskele güvenlik korkuluğu eksik' : 'Scaffold safety railing missing',
        severity: 'critical',
        date: '2025-01-18',
        time: '09:15',
        location: 'Bina cephesi - 3. kat',
        reportedBy: 'Yapı Denetim',
        status: 'closed',
        investigation: {
          investigator: 'Saha Müdürü',
          startDate: '2025-01-18',
          endDate: '2025-01-19',
          findings: language === 'tr' ? 'Korkuluk montajı tamamlanmamış' : 'Railing installation incomplete',
          rootCause: language === 'tr' ? 'İş planlaması hatası' : 'Work planning error'
        },
        correctiveActions: [
          language === 'tr' ? 'Korkuluk acilen tamamlandı' : 'Railing completed urgently',
          language === 'tr' ? 'Çalışma durduruldu' : 'Work stopped'
        ],
        preventiveActions: [
          language === 'tr' ? 'İskele kontrol listesi oluşturuldu' : 'Scaffold checklist created'
        ],
        estimatedCost: 5000,
        actualCost: 4500
      }
    ];

    const sampleTrainings: SafetyTraining[] = [
      {
        id: 'training-1',
        title: language === 'tr' ? 'Genel İSG Eğitimi' : 'General OHS Training',
        description: language === 'tr' ? 'Temel iş sağlığı ve güvenliği eğitimi' : 'Basic occupational health and safety training',
        trainer: 'İSG Uzmanı - Ahmet Yılmaz',
        date: '2025-01-15',
        duration: 8,
        participants: [
          { name: 'Ali Demir', position: 'İşçi', attended: true, score: 85 },
          { name: 'Mehmet Kaya', position: 'Usta', attended: true, score: 92 },
          { name: 'Fatma Özkan', position: 'İşçi', attended: false, score: 0 }
        ],
        topics: [
          'Kişisel koruyucu donanım',
          'İş kazası önleme',
          'Acil durum prosedürleri',
          'Risk değerlendirmesi'
        ],
        materials: ['Sunum', 'Video', 'Broşür'],
        certificate: true,
        status: 'completed',
        cost: 2500,
        effectiveness: 88
      },
      {
        id: 'training-2',
        title: language === 'tr' ? 'Yüksekte Çalışma Güvenliği' : 'Working at Height Safety',
        description: language === 'tr' ? 'Yüksekte güvenli çalışma teknikleri' : 'Safe working techniques at height',
        trainer: 'Dış Eğitmen - Güvenlik A.Ş.',
        date: '2025-01-25',
        duration: 6,
        participants: [
          { name: 'Hasan Yıldız', position: 'Usta', attended: false, score: 0 },
          { name: 'Osman Çelik', position: 'İşçi', attended: false, score: 0 }
        ],
        topics: [
          'Emniyet kemeri kullanımı',
          'İskele güvenliği',
          'Düşme önleme sistemleri'
        ],
        materials: ['Pratik uygulama', 'Ekipman tanıtımı'],
        certificate: true,
        status: 'scheduled',
        cost: 3500
      }
    ];

    const sampleInspections: SafetyInspection[] = [
      {
        id: 'inspection-1',
        title: language === 'tr' ? 'Aylık Güvenlik Denetimi' : 'Monthly Safety Inspection',
        description: language === 'tr' ? 'Rutin aylık güvenlik denetimi' : 'Routine monthly safety inspection',
        inspector: 'İSG Uzmanı',
        date: '2025-01-22',
        duration: 4,
        areas: ['İnşaat sahası', 'Depo alanı', 'Sosyal tesisler', 'Makine parkı'],
        checklist: [
          { item: 'KKD kullanımı', compliant: true, score: 95 },
          { item: 'İskele güvenliği', compliant: false, score: 70 },
          { item: 'Elektrik güvenliği', compliant: true, score: 90 },
          { item: 'Yangın güvenliği', compliant: true, score: 85 },
          { item: 'Makine güvenliği', compliant: true, score: 88 }
        ],
        overallScore: 85.6,
        findings: [
          language === 'tr' ? 'İskele korkuluklarında eksiklik' : 'Deficiency in scaffold railings',
          language === 'tr' ? 'Bazı işçilerde KKD eksikliği' : 'PPE deficiency in some workers'
        ],
        recommendations: [
          language === 'tr' ? 'İskele kontrollerini artırın' : 'Increase scaffold inspections',
          language === 'tr' ? 'KKD eğitimi tekrarlayın' : 'Repeat PPE training'
        ],
        status: 'completed',
        followUpDate: '2025-02-22'
      }
    ];

    setSafetyIncidents(sampleIncidents);
    setSafetyTrainings(sampleTrainings);
    setSafetyInspections(sampleInspections);
  }, [language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'open': 'bg-red-100 text-red-800',
      'investigating': 'bg-yellow-100 text-yellow-800',
      'closed': 'bg-green-100 text-green-800',
      'completed': 'bg-green-100 text-green-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'cancelled': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors['open'];
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      'minor': 'bg-green-100 text-green-800',
      'major': 'bg-yellow-100 text-yellow-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors] || colors['minor'];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'accident': 'bg-red-100 text-red-800',
      'near-miss': 'bg-yellow-100 text-yellow-800',
      'unsafe': 'bg-orange-100 text-orange-800',
      'violation': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors['unsafe'];
  };

  // Calculate metrics
  const totalIncidents = safetyIncidents.length;
  const openIncidents = safetyIncidents.filter(inc => inc.status === 'open').length;
  const incidentRate = totalIncidents > 0 ? (openIncidents / totalIncidents) * 100 : 0;

  const completedTrainings = safetyTrainings.filter(tr => tr.status === 'completed');
  const totalParticipants = completedTrainings.reduce((sum, tr) => sum + tr.participants.length, 0);
  const attendedParticipants = completedTrainings.reduce((sum, tr) => 
    sum + tr.participants.filter(p => p.attended).length, 0);
  const trainingCompliance = totalParticipants > 0 ? (attendedParticipants / totalParticipants) * 100 : 0;

  const completedInspections = safetyInspections.filter(ins => ins.status === 'completed');
  const averageInspectionScore = completedInspections.reduce((sum, ins) => sum + ins.overallScore, 0) / completedInspections.length || 0;

  const daysWithoutIncident = 15; // Sample value

  return (
    <div className="space-y-6">
      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.incidentRate}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{incidentRate.toFixed(1)}%</div>
          <div className="text-sm text-red-700">{openIncidents}/{totalIncidents} açık</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.trainingCompliance}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{trainingCompliance.toFixed(1)}%</div>
          <div className="text-sm text-blue-700">{attendedParticipants}/{totalParticipants} katılım</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Eye className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.inspectionScore}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{averageInspectionScore.toFixed(1)}</div>
          <div className="text-sm text-green-700">100 üzerinden</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.daysWithoutIncident}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{daysWithoutIncident}</div>
          <div className="text-sm text-purple-700">Gün</div>
        </div>
      </div>

      {/* View Selection */}
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => setSelectedView('incidents')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'incidents'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.safetyIncidents}
        </button>
        <button
          onClick={() => setSelectedView('training')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'training'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.safetyTraining}
        </button>
        <button
          onClick={() => setSelectedView('inspections')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'inspections'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.safetyInspections}
        </button>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'incidents' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.safetyIncidents}</h3>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.addIncident}
            </button>
          </div>

          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Olay</th>
                    <th className="text-center p-4 font-semibold">{t.incidentType}</th>
                    <th className="text-center p-4 font-semibold">{t.severity}</th>
                    <th className="text-center p-4 font-semibold">{t.date}</th>
                    <th className="text-left p-4 font-semibold">{t.location}</th>
                    <th className="text-center p-4 font-semibold">{t.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {safetyIncidents.map(incident => (
                    <tr key={incident.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-xs text-gray-500">{incident.reportedBy}</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(incident.type)}`}>
                          {t[incident.type.replace('-', '') as keyof typeof t]}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                          {t[incident.severity]}
                        </span>
                      </td>
                      <td className="p-4 text-center">{incident.date}</td>
                      <td className="p-4">{incident.location}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                          {t[incident.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'training' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.safetyTraining}</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.addTraining}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {safetyTrainings.map(training => (
              <div key={training.id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{training.title}</h4>
                    <p className="text-sm text-gray-600">{training.trainer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}>
                    {t[training.status]}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.date}:</span>
                    <span className="font-medium">{training.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.duration}:</span>
                    <span className="font-medium">{training.duration} {t.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.participants}:</span>
                    <span className="font-medium">{training.participants.length} {t.people}</span>
                  </div>
                  {training.effectiveness && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Etkinlik:</span>
                      <span className="font-medium">{training.effectiveness}%</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-2">Konular</h5>
                  <div className="flex flex-wrap gap-1">
                    {training.topics.map((topic, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'inspections' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.safetyInspections}</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.addInspection}
            </button>
          </div>

          <div className="space-y-6">
            {safetyInspections.map(inspection => (
              <div key={inspection.id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{inspection.title}</h4>
                    <p className="text-sm text-gray-600">{inspection.inspector} - {inspection.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{inspection.overallScore.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">Genel Puan</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-3">Kontrol Listesi</h5>
                    <div className="space-y-2">
                      {inspection.checklist.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{item.item}</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">{item.score}</span>
                            {item.compliant ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-800 mb-3">{t.findings}</h5>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {inspection.findings.map((finding, index) => (
                        <li key={index}>• {finding}</li>
                      ))}
                    </ul>

                    <h5 className="font-medium text-gray-800 mb-3">{t.recommendations}</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {inspection.recommendations.map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
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

export default SafetyManagement;