import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ProjectScenario, ProcurementPlan } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ProcurementPlanningProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ProcurementPlanning: React.FC<ProcurementPlanningProps> = ({ scenario, language }) => {
  const [procurementPlans, setProcurementPlans] = useState<ProcurementPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ProcurementPlan | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'details' | 'timeline'>('list');

  const texts = {
    tr: {
      procurementPlanning: 'Tedarik Planlama',
      createPlan: 'Yeni Plan Oluştur',
      planTitle: 'Plan Başlığı',
      totalBudget: 'Toplam Bütçe',
      status: 'Durum',
      categories: 'Kategoriler',
      timeline: 'Zaman Çizelgesi',
      approvals: 'Onaylar',
      actions: 'İşlemler',
      viewDetails: 'Detayları Görüntüle',
      viewTimeline: 'Zaman Çizelgesi',
      editPlan: 'Planı Düzenle',
      draft: 'Taslak',
      approved: 'Onaylandı',
      inProgress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      planDetails: 'Plan Detayları',
      description: 'Açıklama',
      category: 'Kategori',
      budget: 'Bütçe',
      priority: 'Öncelik',
      procurementMethod: 'Tedarik Yöntemi',
      approvalRequired: 'Onay Gerekli',
      high: 'Yüksek',
      medium: 'Orta',
      low: 'Düşük',
      tender: 'İhale',
      direct: 'Doğrudan',
      framework: 'Çerçeve Anlaşma',
      yes: 'Evet',
      no: 'Hayır',
      planningPhase: 'Planlama Fazı',
      tenderPhase: 'İhale Fazı',
      evaluationPhase: 'Değerlendirme Fazı',
      contractPhase: 'Sözleşme Fazı',
      deliveryPhase: 'Teslimat Fazı',
      approvalLevel: 'Onay Seviyesi',
      approver: 'Onaylayan',
      approvalStatus: 'Onay Durumu',
      approvalDate: 'Onay Tarihi',
      comments: 'Yorumlar',
      pending: 'Bekliyor',
      rejected: 'Reddedildi',
      risks: 'Riskler',
      risk: 'Risk',
      probability: 'Olasılık',
      impact: 'Etki',
      mitigation: 'Önlem',
      materials: 'Malzemeler',
      labor: 'İşçilik',
      equipment: 'Ekipman',
      services: 'Hizmetler',
      procurementSchedule: 'Tedarik Programı',
      criticalPath: 'Kritik Yol',
      dependencies: 'Bağımlılıklar',
      milestones: 'Kilometre Taşları'
    },
    en: {
      procurementPlanning: 'Procurement Planning',
      createPlan: 'Create New Plan',
      planTitle: 'Plan Title',
      totalBudget: 'Total Budget',
      status: 'Status',
      categories: 'Categories',
      timeline: 'Timeline',
      approvals: 'Approvals',
      actions: 'Actions',
      viewDetails: 'View Details',
      viewTimeline: 'View Timeline',
      editPlan: 'Edit Plan',
      draft: 'Draft',
      approved: 'Approved',
      inProgress: 'In Progress',
      completed: 'Completed',
      planDetails: 'Plan Details',
      description: 'Description',
      category: 'Category',
      budget: 'Budget',
      priority: 'Priority',
      procurementMethod: 'Procurement Method',
      approvalRequired: 'Approval Required',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      tender: 'Tender',
      direct: 'Direct',
      framework: 'Framework',
      yes: 'Yes',
      no: 'No',
      planningPhase: 'Planning Phase',
      tenderPhase: 'Tender Phase',
      evaluationPhase: 'Evaluation Phase',
      contractPhase: 'Contract Phase',
      deliveryPhase: 'Delivery Phase',
      approvalLevel: 'Approval Level',
      approver: 'Approver',
      approvalStatus: 'Approval Status',
      approvalDate: 'Approval Date',
      comments: 'Comments',
      pending: 'Pending',
      rejected: 'Rejected',
      risks: 'Risks',
      risk: 'Risk',
      probability: 'Probability',
      impact: 'Impact',
      mitigation: 'Mitigation',
      materials: 'Materials',
      labor: 'Labor',
      equipment: 'Equipment',
      services: 'Services',
      procurementSchedule: 'Procurement Schedule',
      criticalPath: 'Critical Path',
      dependencies: 'Dependencies',
      milestones: 'Milestones'
    }
  };

  const t = texts[language];

  // Generate sample procurement plans
  React.useEffect(() => {
    const samplePlans: ProcurementPlan[] = [
      {
        id: 'plan-1',
        projectId: scenario.id,
        title: language === 'tr' ? 'Ana Tedarik Planı 2025' : 'Main Procurement Plan 2025',
        description: language === 'tr' 
          ? 'Proje için gerekli tüm malzeme ve hizmet tedariklerinin planlanması'
          : 'Planning of all material and service procurements required for the project',
        totalBudget: scenario.costs.total,
        categories: [
          {
            category: 'materials',
            budget: scenario.costs.construction.materials,
            priority: 'high',
            timeline: '2025-02-01 - 2025-06-30',
            procurementMethod: 'tender',
            approvalRequired: true
          },
          {
            category: 'labor',
            budget: scenario.costs.construction.labor,
            priority: 'high',
            timeline: '2025-02-15 - 2025-08-15',
            procurementMethod: 'direct',
            approvalRequired: false
          },
          {
            category: 'equipment',
            budget: scenario.costs.construction.equipment,
            priority: 'medium',
            timeline: '2025-03-01 - 2025-07-31',
            procurementMethod: 'framework',
            approvalRequired: true
          },
          {
            category: 'services',
            budget: scenario.costs.softCosts.consulting,
            priority: 'medium',
            timeline: '2025-01-15 - 2025-12-31',
            procurementMethod: 'tender',
            approvalRequired: true
          }
        ],
        timeline: {
          planningPhase: '2025-01-01 - 2025-01-31',
          tenderPhase: '2025-02-01 - 2025-03-15',
          evaluationPhase: '2025-03-16 - 2025-04-15',
          contractPhase: '2025-04-16 - 2025-05-15',
          deliveryPhase: '2025-05-16 - 2025-12-31'
        },
        approvals: [
          {
            level: 'Proje Müdürü',
            approver: 'Ahmet Yılmaz',
            status: 'approved',
            date: '2025-01-10',
            comments: 'Plan onaylandı'
          },
          {
            level: 'Genel Müdür',
            approver: 'Mehmet Kaya',
            status: 'pending',
            comments: 'İnceleme aşamasında'
          }
        ],
        risks: [
          {
            risk: 'Malzeme fiyat artışları',
            probability: 'high',
            impact: 'high',
            mitigation: 'Sabit fiyat sözleşmeleri yapılacak'
          },
          {
            risk: 'Tedarikçi kapasitesi yetersizliği',
            probability: 'medium',
            impact: 'high',
            mitigation: 'Alternatif tedarikçiler belirlenecek'
          },
          {
            risk: 'İhale süreçlerinde gecikmeler',
            probability: 'medium',
            impact: 'medium',
            mitigation: 'Erken başlangıç ve buffer süre'
          }
        ],
        status: 'approved',
        createdBy: 'project-manager',
        createdAt: '2025-01-05',
        updatedAt: '2025-01-15'
      }
    ];
    setProcurementPlans(samplePlans);
  }, [scenario, language]);

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'approved': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || colors['draft'];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || colors['medium'];
  };

  const getApprovalStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getRiskColor = (level: string) => {
    const colors = {
      'high': 'text-red-600',
      'medium': 'text-yellow-600',
      'low': 'text-green-600'
    };
    return colors[level as keyof typeof colors] || colors['medium'];
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

  return (
    <div className="space-y-6">
      {activeView === 'list' && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t.procurementPlanning}</h3>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              {t.createPlan}
            </button>
          </div>

          {/* Plans Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t.planTitle}</th>
                    <th className="text-right p-4 font-semibold">{t.totalBudget}</th>
                    <th className="text-center p-4 font-semibold">{t.categories}</th>
                    <th className="text-center p-4 font-semibold">{t.status}</th>
                    <th className="text-center p-4 font-semibold">{t.approvals}</th>
                    <th className="text-center p-4 font-semibold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {procurementPlans.map(plan => (
                    <tr key={plan.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{plan.title}</div>
                          <div className="text-xs text-gray-500">{plan.description}</div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(plan.totalBudget)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center flex-wrap gap-1">
                          {plan.categories.slice(0, 3).map((cat, index) => (
                            <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(cat.category)}`}>
                              {t[cat.category]}
                            </span>
                          ))}
                          {plan.categories.length > 3 && (
                            <span className="text-xs text-gray-500">+{plan.categories.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                          {t[plan.status.replace('-', '') as keyof typeof t]}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-1">
                          {plan.approvals.map((approval, index) => (
                            <span key={index} className={`w-3 h-3 rounded-full ${
                              approval.status === 'approved' ? 'bg-green-500' :
                              approval.status === 'rejected' ? 'bg-red-500' :
                              'bg-yellow-500'
                            }`}></span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setActiveView('details');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            {t.viewDetails}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setActiveView('timeline');
                            }}
                            className="text-green-600 hover:text-green-800 text-xs"
                          >
                            {t.viewTimeline}
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

      {activeView === 'details' && selectedPlan && (
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
              <h3 className="text-xl font-bold">{selectedPlan.title}</h3>
              <p className="text-gray-600">{selectedPlan.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPlan.status)}`}>
              {t[selectedPlan.status.replace('-', '') as keyof typeof t]}
            </span>
          </div>

          {/* Plan Overview */}
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(selectedPlan.totalBudget)}
                </div>
                <div className="text-sm text-gray-600">{t.totalBudget}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedPlan.categories.length}
                </div>
                <div className="text-sm text-gray-600">{t.categories}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedPlan.approvals.filter(a => a.status === 'approved').length}/{selectedPlan.approvals.length}
                </div>
                <div className="text-sm text-gray-600">{t.approvals}</div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">{t.categories}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">{t.category}</th>
                    <th className="text-right p-3 font-semibold">{t.budget}</th>
                    <th className="text-center p-3 font-semibold">{t.priority}</th>
                    <th className="text-center p-3 font-semibold">{t.procurementMethod}</th>
                    <th className="text-center p-3 font-semibold">{t.approvalRequired}</th>
                    <th className="text-left p-3 font-semibold">{t.timeline}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlan.categories.map((category, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category.category)}`}>
                          {t[category.category]}
                        </span>
                      </td>
                      <td className="p-3 text-right font-medium">
                        {formatCurrency(category.budget)}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(category.priority)}`}>
                          {t[category.priority]}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {t[category.procurementMethod]}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.approvalRequired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {category.approvalRequired ? t.yes : t.no}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{category.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Approvals */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">{t.approvals}</h4>
            <div className="space-y-3">
              {selectedPlan.approvals.map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{approval.level}</div>
                    <div className="text-sm text-gray-600">{approval.approver}</div>
                  </div>
                  <div className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApprovalStatusColor(approval.status)}`}>
                      {t[approval.status]}
                    </span>
                    {approval.date && (
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(approval.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </div>
                    )}
                  </div>
                  <div className="text-right max-w-xs">
                    <div className="text-sm text-gray-600">{approval.comments}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">{t.risks}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">{t.risk}</th>
                    <th className="text-center p-3 font-semibold">{t.probability}</th>
                    <th className="text-center p-3 font-semibold">{t.impact}</th>
                    <th className="text-left p-3 font-semibold">{t.mitigation}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlan.risks.map((risk, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-3 font-medium">{risk.risk}</td>
                      <td className="p-3 text-center">
                        <span className={`font-medium ${getRiskColor(risk.probability)}`}>
                          {t[risk.probability]}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-medium ${getRiskColor(risk.impact)}`}>
                          {t[risk.impact]}
                        </span>
                      </td>
                      <td className="p-3">{risk.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'timeline' && selectedPlan && (
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
              <h3 className="text-xl font-bold">{selectedPlan.title} - {t.procurementSchedule}</h3>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-6">{t.timeline}</h4>
            
            <div className="space-y-6">
              {Object.entries(selectedPlan.timeline).map(([phase, period], index) => (
                <div key={phase} className="relative">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium text-gray-900">
                          {t[phase as keyof typeof t]}
                        </h5>
                        <span className="text-sm text-gray-600">{period}</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(index + 1) * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < Object.entries(selectedPlan.timeline).length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-6 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Category Timeline */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Kategori Bazlı Program</h4>
            <div className="space-y-4">
              {selectedPlan.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category.category)}`}>
                      {t[category.category]}
                    </span>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(category.priority)}`}>
                      {t[category.priority]}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(category.budget)}</div>
                    <div className="text-sm text-gray-600">{category.timeline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcurementPlanning;