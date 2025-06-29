import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, FileText, Camera, ClipboardCheck, TrendingUp } from 'lucide-react';
import { ProjectScenario, QualityCheckpoint, QualityTest, QualityIssue } from '../types';
import { formatCurrency } from '../utils/calculations';

interface QualityControlProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const QualityControl: React.FC<QualityControlProps> = ({ scenario, language }) => {
  const [qualityCheckpoints, setQualityCheckpoints] = useState<QualityCheckpoint[]>([]);
  const [qualityTests, setQualityTests] = useState<QualityTest[]>([]);
  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([]);
  const [selectedView, setSelectedView] = useState<'checkpoints' | 'tests' | 'issues'>('checkpoints');

  const texts = {
    tr: {
      qualityControl: 'Kalite Kontrol',
      qualityCheckpoints: 'Kalite Kontrol Noktaları',
      qualityTests: 'Kalite Testleri',
      qualityIssues: 'Kalite Sorunları',
      checkpoint: 'Kontrol Noktası',
      phase: 'Faz',
      status: 'Durum',
      inspector: 'Denetçi',
      date: 'Tarih',
      result: 'Sonuç',
      passed: 'Geçti',
      failed: 'Başarısız',
      pending: 'Bekliyor',
      inProgress: 'Devam Ediyor',
      testName: 'Test Adı',
      testType: 'Test Türü',
      laboratory: 'Laboratuvar',
      sampleDate: 'Numune Tarihi',
      resultDate: 'Sonuç Tarihi',
      specification: 'Şartname',
      actualValue: 'Gerçek Değer',
      issueTitle: 'Sorun Başlığı',
      severity: 'Önem Derecesi',
      category: 'Kategori',
      reportedBy: 'Rapor Eden',
      assignedTo: 'Atanan',
      dueDate: 'Vade Tarihi',
      resolution: 'Çözüm',
      high: 'Yüksek',
      medium: 'Orta',
      low: 'Düşük',
      critical: 'Kritik',
      open: 'Açık',
      resolved: 'Çözüldü',
      closed: 'Kapatıldı',
      materials: 'Malzemeler',
      workmanship: 'İşçilik',
      design: 'Tasarım',
      safety: 'Güvenlik',
      environmental: 'Çevresel',
      qualityMetrics: 'Kalite Metrikleri',
      passRate: 'Geçme Oranı',
      averageScore: 'Ortalama Puan',
      totalTests: 'Toplam Test',
      openIssues: 'Açık Sorunlar',
      recommendations: 'Öneriler'
    },
    en: {
      qualityControl: 'Quality Control',
      qualityCheckpoints: 'Quality Checkpoints',
      qualityTests: 'Quality Tests',
      qualityIssues: 'Quality Issues',
      checkpoint: 'Checkpoint',
      phase: 'Phase',
      status: 'Status',
      inspector: 'Inspector',
      date: 'Date',
      result: 'Result',
      passed: 'Passed',
      failed: 'Failed',
      pending: 'Pending',
      inProgress: 'In Progress',
      testName: 'Test Name',
      testType: 'Test Type',
      laboratory: 'Laboratory',
      sampleDate: 'Sample Date',
      resultDate: 'Result Date',
      specification: 'Specification',
      actualValue: 'Actual Value',
      issueTitle: 'Issue Title',
      severity: 'Severity',
      category: 'Category',
      reportedBy: 'Reported By',
      assignedTo: 'Assigned To',
      dueDate: 'Due Date',
      resolution: 'Resolution',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      critical: 'Critical',
      open: 'Open',
      resolved: 'Resolved',
      closed: 'Closed',
      materials: 'Materials',
      workmanship: 'Workmanship',
      design: 'Design',
      safety: 'Safety',
      environmental: 'Environmental',
      qualityMetrics: 'Quality Metrics',
      passRate: 'Pass Rate',
      averageScore: 'Average Score',
      totalTests: 'Total Tests',
      openIssues: 'Open Issues',
      recommendations: 'Recommendations'
    }
  };

  const t = texts[language];

  // Generate sample data
  React.useEffect(() => {
    const sampleCheckpoints: QualityCheckpoint[] = [
      {
        id: 'qc-1',
        name: language === 'tr' ? 'Temel Kalite Kontrolü' : 'Foundation Quality Control',
        phase: 'foundation',
        description: language === 'tr' ? 'Temel betonunun kalite kontrolü' : 'Foundation concrete quality control',
        inspector: 'Ahmet Yılmaz',
        scheduledDate: '2025-01-20',
        completedDate: '2025-01-20',
        status: 'passed',
        score: 92,
        criteria: [
          { name: 'Beton mukavemeti', required: '≥25 MPa', actual: '28 MPa', passed: true },
          { name: 'Boyutsal tolerans', required: '±2 cm', actual: '±1 cm', passed: true },
          { name: 'Yüzey kalitesi', required: 'Düzgün', actual: 'Düzgün', passed: true }
        ],
        photos: ['photo1.jpg', 'photo2.jpg'],
        notes: language === 'tr' ? 'Tüm kriterler başarıyla geçildi' : 'All criteria passed successfully'
      },
      {
        id: 'qc-2',
        name: language === 'tr' ? 'Kolon Kalite Kontrolü' : 'Column Quality Control',
        phase: 'structure',
        description: language === 'tr' ? 'Kolon betonunun kalite kontrolü' : 'Column concrete quality control',
        inspector: 'Fatma Demir',
        scheduledDate: '2025-01-25',
        status: 'in-progress',
        score: 0,
        criteria: [
          { name: 'Beton mukavemeti', required: '≥30 MPa', actual: 'Test devam ediyor', passed: false },
          { name: 'Donatı yerleşimi', required: 'Projeye uygun', actual: 'Kontrol ediliyor', passed: false }
        ],
        photos: [],
        notes: language === 'tr' ? 'Kontrol devam ediyor' : 'Control in progress'
      }
    ];

    const sampleTests: QualityTest[] = [
      {
        id: 'test-1',
        name: language === 'tr' ? 'Beton Basınç Dayanımı Testi' : 'Concrete Compressive Strength Test',
        type: 'concrete',
        laboratory: 'İTÜ Yapı Malzemeleri Laboratuvarı',
        sampleDate: '2025-01-18',
        resultDate: '2025-01-25',
        status: 'completed',
        specification: '≥25 MPa',
        actualValue: '28.5 MPa',
        result: 'passed',
        testStandard: 'TS EN 12390-3',
        sampleLocation: 'Temel - Aks A/1',
        testCost: 350,
        certificate: 'cert-001.pdf'
      },
      {
        id: 'test-2',
        name: language === 'tr' ? 'Çelik Çekme Dayanımı Testi' : 'Steel Tensile Strength Test',
        type: 'steel',
        laboratory: 'TÜBITAK MAM',
        sampleDate: '2025-01-20',
        status: 'pending',
        specification: '≥420 MPa',
        actualValue: 'Bekleniyor',
        result: 'pending',
        testStandard: 'TS 708',
        sampleLocation: 'Kolon donatısı Φ16',
        testCost: 280
      }
    ];

    const sampleIssues: QualityIssue[] = [
      {
        id: 'issue-1',
        title: language === 'tr' ? 'Beton yüzeyinde pürüzlülük' : 'Concrete surface roughness',
        description: language === 'tr' ? 'Temel betonunda yüzey pürüzlülüğü tespit edildi' : 'Surface roughness detected in foundation concrete',
        category: 'materials',
        severity: 'medium',
        status: 'open',
        reportedBy: 'Kalite Kontrol Ekibi',
        reportedDate: '2025-01-22',
        assignedTo: 'Saha Müdürü',
        dueDate: '2025-01-30',
        location: 'Temel - Bölge C',
        photos: ['issue1-1.jpg', 'issue1-2.jpg'],
        estimatedCost: 5000,
        actualCost: 0,
        resolution: language === 'tr' ? 'Yüzey düzeltme işlemi planlandı' : 'Surface correction work planned'
      },
      {
        id: 'issue-2',
        title: language === 'tr' ? 'Donatı yerleşim hatası' : 'Rebar placement error',
        description: language === 'tr' ? 'Kolon donatısında projeye uygun olmayan yerleşim' : 'Non-compliant rebar placement in column',
        category: 'workmanship',
        severity: 'high',
        status: 'resolved',
        reportedBy: 'Yapı Denetim',
        reportedDate: '2025-01-20',
        assignedTo: 'Usta Başı',
        dueDate: '2025-01-25',
        resolvedDate: '2025-01-24',
        location: 'Kolon K-5',
        photos: ['issue2-1.jpg'],
        estimatedCost: 8000,
        actualCost: 7500,
        resolution: language === 'tr' ? 'Donatı yeniden yerleştirildi' : 'Rebar repositioned'
      }
    ];

    setQualityCheckpoints(sampleCheckpoints);
    setQualityTests(sampleTests);
    setQualityIssues(sampleIssues);
  }, [language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'passed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'open': 'bg-red-100 text-red-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      'critical': 'bg-red-100 text-red-800',
      'high': 'bg-orange-100 text-orange-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[severity as keyof typeof colors] || colors['medium'];
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
  const passedCheckpoints = qualityCheckpoints.filter(qc => qc.status === 'passed').length;
  const totalCheckpoints = qualityCheckpoints.length;
  const passRate = totalCheckpoints > 0 ? (passedCheckpoints / totalCheckpoints) * 100 : 0;
  
  const completedTests = qualityTests.filter(test => test.status === 'completed');
  const averageScore = qualityCheckpoints.reduce((sum, qc) => sum + qc.score, 0) / qualityCheckpoints.length || 0;
  
  const openIssuesCount = qualityIssues.filter(issue => issue.status === 'open').length;

  return (
    <div className="space-y-6">
      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.passRate}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{passRate.toFixed(1)}%</div>
          <div className="text-sm text-green-700">{passedCheckpoints}/{totalCheckpoints} kontrol</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.averageScore}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{averageScore.toFixed(1)}</div>
          <div className="text-sm text-blue-700">100 üzerinden</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.totalTests}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{qualityTests.length}</div>
          <div className="text-sm text-purple-700">{completedTests.length} tamamlandı</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.openIssues}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{openIssuesCount}</div>
          <div className="text-sm text-red-700">Çözüm bekliyor</div>
        </div>
      </div>

      {/* View Selection */}
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => setSelectedView('checkpoints')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'checkpoints'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.qualityCheckpoints}
        </button>
        <button
          onClick={() => setSelectedView('tests')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'tests'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.qualityTests}
        </button>
        <button
          onClick={() => setSelectedView('issues')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'issues'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.qualityIssues}
        </button>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'checkpoints' && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.checkpoint}</th>
                  <th className="text-left p-4 font-semibold">{t.phase}</th>
                  <th className="text-left p-4 font-semibold">{t.inspector}</th>
                  <th className="text-center p-4 font-semibold">{t.date}</th>
                  <th className="text-center p-4 font-semibold">{t.status}</th>
                  <th className="text-center p-4 font-semibold">Puan</th>
                </tr>
              </thead>
              <tbody>
                {qualityCheckpoints.map(checkpoint => (
                  <tr key={checkpoint.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{checkpoint.name}</div>
                        <div className="text-xs text-gray-500">{checkpoint.description}</div>
                      </div>
                    </td>
                    <td className="p-4 capitalize">{checkpoint.phase}</td>
                    <td className="p-4">{checkpoint.inspector}</td>
                    <td className="p-4 text-center">
                      {checkpoint.completedDate || checkpoint.scheduledDate}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(checkpoint.status)}`}>
                        {t[checkpoint.status.replace('-', '') as keyof typeof t]}
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">
                      {checkpoint.score > 0 ? checkpoint.score : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'tests' && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.testName}</th>
                  <th className="text-left p-4 font-semibold">{t.laboratory}</th>
                  <th className="text-center p-4 font-semibold">{t.sampleDate}</th>
                  <th className="text-center p-4 font-semibold">{t.specification}</th>
                  <th className="text-center p-4 font-semibold">{t.actualValue}</th>
                  <th className="text-center p-4 font-semibold">{t.result}</th>
                </tr>
              </thead>
              <tbody>
                {qualityTests.map(test => (
                  <tr key={test.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{test.name}</div>
                        <div className="text-xs text-gray-500">{test.testStandard}</div>
                      </div>
                    </td>
                    <td className="p-4">{test.laboratory}</td>
                    <td className="p-4 text-center">{test.sampleDate}</td>
                    <td className="p-4 text-center font-medium">{test.specification}</td>
                    <td className="p-4 text-center">{test.actualValue}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.result)}`}>
                        {t[test.result.replace('-', '') as keyof typeof t]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'issues' && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.issueTitle}</th>
                  <th className="text-center p-4 font-semibold">{t.category}</th>
                  <th className="text-center p-4 font-semibold">{t.severity}</th>
                  <th className="text-left p-4 font-semibold">{t.assignedTo}</th>
                  <th className="text-center p-4 font-semibold">{t.dueDate}</th>
                  <th className="text-center p-4 font-semibold">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {qualityIssues.map(issue => (
                  <tr key={issue.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-xs text-gray-500">{issue.location}</div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
                        {t[issue.category]}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {t[issue.severity]}
                      </span>
                    </td>
                    <td className="p-4">{issue.assignedTo}</td>
                    <td className="p-4 text-center">{issue.dueDate}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {t[issue.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3">{t.recommendations}</h4>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Kalite kontrol noktalarını düzenli olarak takip edin</p>
          <p>• Test sonuçlarını beklemeden bir sonraki faza geçmeyin</p>
          <p>• Açık kalite sorunlarını öncelikle çözün</p>
          <p>• Kalite belgelerini düzenli olarak arşivleyin</p>
          <p>• Tedarikçi kalite sertifikalarını kontrol edin</p>
        </div>
      </div>
    </div>
  );
};

export default QualityControl;