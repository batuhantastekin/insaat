import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronDown, Clock, Users, AlertTriangle } from 'lucide-react';
import { ProjectSchedule, ProjectScenario, ProjectTask, ProjectPhase } from '../types';
import { formatCurrency } from '../utils/calculations';

interface GanttChartProps {
  schedule: ProjectSchedule;
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const GanttChart: React.FC<GanttChartProps> = ({ schedule, scenario, language }) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());

  const texts = {
    tr: {
      ganttChart: 'Gantt Şeması',
      taskName: 'Görev Adı',
      duration: 'Süre',
      startDate: 'Başlangıç',
      endDate: 'Bitiş',
      progress: 'İlerleme',
      assignedTo: 'Atanan',
      cost: 'Maliyet',
      status: 'Durum',
      dependencies: 'Bağımlılıklar',
      criticalPath: 'Kritik Yol',
      days: 'gün',
      notStarted: 'Başlamadı',
      inProgress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      delayed: 'Gecikti',
      onHold: 'Beklemede'
    },
    en: {
      ganttChart: 'Gantt Chart',
      taskName: 'Task Name',
      duration: 'Duration',
      startDate: 'Start Date',
      endDate: 'End Date',
      progress: 'Progress',
      assignedTo: 'Assigned To',
      cost: 'Cost',
      status: 'Status',
      dependencies: 'Dependencies',
      criticalPath: 'Critical Path',
      days: 'days',
      notStarted: 'Not Started',
      inProgress: 'In Progress',
      completed: 'Completed',
      delayed: 'Delayed',
      onHold: 'On Hold'
    }
  };

  const t = texts[language];

  // Generate project phases and tasks based on building type
  const generateProjectData = () => {
    const startDate = new Date(scenario.basics.startDate || new Date());
    const area = scenario.basics.area;
    const buildingType = scenario.basics.buildingType;
    
    const phases: ProjectPhase[] = [
      {
        id: 'phase-1',
        name: language === 'tr' ? 'Ön Hazırlık ve İzinler' : 'Preparation and Permits',
        description: language === 'tr' ? 'Proje izinleri ve sahaya hazırlık' : 'Project permits and site preparation',
        startDate: startDate.toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 100,
        color: 'bg-blue-500',
        tasks: ['task-1', 'task-2', 'task-3']
      },
      {
        id: 'phase-2',
        name: language === 'tr' ? 'Temel ve Altyapı' : 'Foundation and Infrastructure',
        description: language === 'tr' ? 'Temel kazısı ve altyapı çalışmaları' : 'Foundation excavation and infrastructure work',
        startDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 75,
        color: 'bg-green-500',
        tasks: ['task-4', 'task-5', 'task-6']
      },
      {
        id: 'phase-3',
        name: language === 'tr' ? 'Yapısal İnşaat' : 'Structural Construction',
        description: language === 'tr' ? 'Betonarme ve çelik konstrüksiyon' : 'Reinforced concrete and steel construction',
        startDate: new Date(startDate.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 40,
        color: 'bg-orange-500',
        tasks: ['task-7', 'task-8', 'task-9']
      },
      {
        id: 'phase-4',
        name: language === 'tr' ? 'Cephe ve Kaplama' : 'Facade and Cladding',
        description: language === 'tr' ? 'Dış cephe ve yalıtım çalışmaları' : 'External facade and insulation work',
        startDate: new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 15,
        color: 'bg-purple-500',
        tasks: ['task-10', 'task-11']
      },
      {
        id: 'phase-5',
        name: language === 'tr' ? 'İç Mekan ve Tesisat' : 'Interior and MEP',
        description: language === 'tr' ? 'İç mekan düzenlemesi ve tesisat' : 'Interior fit-out and MEP systems',
        startDate: new Date(startDate.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 0,
        color: 'bg-indigo-500',
        tasks: ['task-12', 'task-13', 'task-14']
      }
    ];

    const tasks: ProjectTask[] = [
      // Phase 1 tasks
      {
        id: 'task-1',
        name: language === 'tr' ? 'İmar İzni Alımı' : 'Building Permit Acquisition',
        description: language === 'tr' ? 'Belediyeden imar izni alınması' : 'Obtaining building permit from municipality',
        phase: phases[0],
        startDate: phases[0].startDate,
        endDate: new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 14,
        dependencies: [],
        progress: 100,
        assignedTeam: ['Hukuk Müşaviri', 'Proje Müdürü'],
        cost: scenario.costs.softCosts.permits * 0.6,
        status: 'completed',
        priority: 'critical',
        milestones: []
      },
      {
        id: 'task-2',
        name: language === 'tr' ? 'Saha Hazırlığı' : 'Site Preparation',
        description: language === 'tr' ? 'İnşaat sahasının hazırlanması' : 'Construction site preparation',
        phase: phases[0],
        startDate: new Date(startDate.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 11,
        dependencies: [],
        progress: 100,
        assignedTeam: ['Saha Müdürü', 'İş Makinesi Operatörü'],
        cost: scenario.costs.siteSpecific * 0.3,
        status: 'completed',
        priority: 'high',
        milestones: []
      },
      {
        id: 'task-3',
        name: language === 'tr' ? 'Geçici Tesisler' : 'Temporary Facilities',
        description: language === 'tr' ? 'Geçici ofis ve depo kurulumu' : 'Temporary office and storage setup',
        phase: phases[0],
        startDate: new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 6,
        dependencies: ['task-2'],
        progress: 100,
        assignedTeam: ['Saha Müdürü'],
        cost: scenario.costs.siteSpecific * 0.2,
        status: 'completed',
        priority: 'medium',
        milestones: []
      },
      // Phase 2 tasks
      {
        id: 'task-4',
        name: language === 'tr' ? 'Kazı Çalışmaları' : 'Excavation Work',
        description: language === 'tr' ? 'Temel kazısı ve toprak işleri' : 'Foundation excavation and earthwork',
        phase: phases[1],
        startDate: phases[1].startDate,
        endDate: new Date(startDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 14,
        dependencies: ['task-2'],
        progress: 100,
        assignedTeam: ['Kazı Ekibi', 'İş Makinesi Operatörü'],
        cost: scenario.costs.construction.equipment * 0.4,
        status: 'completed',
        priority: 'critical',
        milestones: []
      },
      {
        id: 'task-5',
        name: language === 'tr' ? 'Temel Betonajı' : 'Foundation Concrete',
        description: language === 'tr' ? 'Temel betonunun dökülmesi' : 'Foundation concrete pouring',
        phase: phases[1],
        startDate: new Date(startDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 15,
        dependencies: ['task-4'],
        progress: 80,
        assignedTeam: ['Beton Ekibi', 'Demir Bağlama Ekibi'],
        cost: scenario.costs.construction.materials * 0.25,
        status: 'in-progress',
        priority: 'critical',
        milestones: []
      },
      {
        id: 'task-6',
        name: language === 'tr' ? 'Altyapı Tesisatı' : 'Infrastructure Systems',
        description: language === 'tr' ? 'Su, kanalizasyon ve elektrik altyapısı' : 'Water, sewage and electrical infrastructure',
        phase: phases[1],
        startDate: new Date(startDate.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 15,
        dependencies: ['task-5'],
        progress: 30,
        assignedTeam: ['Tesisat Ekibi', 'Elektrik Ekibi'],
        cost: scenario.costs.construction.materials * 0.15,
        status: 'in-progress',
        priority: 'high',
        milestones: []
      }
    ];

    return { phases, tasks };
  };

  const { phases, tasks } = generateProjectData();

  const togglePhaseExpansion = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'not-started': 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'delayed': 'bg-red-100 text-red-800',
      'on-hold': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || colors['not-started'];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'text-gray-500',
      'medium': 'text-blue-500',
      'high': 'text-orange-500',
      'critical': 'text-red-500'
    };
    return colors[priority as keyof typeof colors] || colors['medium'];
  };

  return (
    <div className="space-y-6">
      {/* Gantt Chart Header */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">{t.ganttChart}</h3>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>{t.criticalPath}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Tamamlandı</span>
          </div>
        </div>
      </div>

      {/* Gantt Chart Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold min-w-[300px]">{t.taskName}</th>
                <th className="text-center p-4 font-semibold">{t.duration}</th>
                <th className="text-center p-4 font-semibold">{t.startDate}</th>
                <th className="text-center p-4 font-semibold">{t.endDate}</th>
                <th className="text-center p-4 font-semibold">{t.progress}</th>
                <th className="text-center p-4 font-semibold">{t.status}</th>
                <th className="text-right p-4 font-semibold">{t.cost}</th>
              </tr>
            </thead>
            <tbody>
              {phases.map(phase => (
                <React.Fragment key={phase.id}>
                  {/* Phase Row */}
                  <tr className="bg-gray-100 border-t-2 border-gray-300">
                    <td className="p-4">
                      <button
                        onClick={() => togglePhaseExpansion(phase.id)}
                        className="flex items-center font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {expandedPhases.has(phase.id) ? (
                          <ChevronDown className="w-4 h-4 mr-2" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-2" />
                        )}
                        <div className={`w-3 h-3 rounded mr-3 ${phase.color}`}></div>
                        {phase.name}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      {Math.ceil((new Date(phase.endDate).getTime() - new Date(phase.startDate).getTime()) / (1000 * 60 * 60 * 24))} {t.days}
                    </td>
                    <td className="p-4 text-center">
                      {new Date(phase.startDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                    </td>
                    <td className="p-4 text-center">
                      {new Date(phase.endDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${phase.color}`}
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{phase.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        phase.progress === 100 ? 'bg-green-100 text-green-800' :
                        phase.progress > 0 ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.progress === 100 ? t.completed :
                         phase.progress > 0 ? t.inProgress :
                         t.notStarted}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatCurrency(tasks.filter(t => phase.tasks.includes(t.id)).reduce((sum, t) => sum + t.cost, 0))}
                    </td>
                  </tr>

                  {/* Task Rows */}
                  {expandedPhases.has(phase.id) && tasks.filter(task => phase.tasks.includes(task.id)).map(task => (
                    <tr key={task.id} className="border-t border-gray-200">
                      <td className="p-4 pl-12">
                        <div className="flex items-center">
                          <AlertTriangle className={`w-4 h-4 mr-2 ${getPriorityColor(task.priority)}`} />
                          <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-xs text-gray-500">{task.description}</div>
                            {task.assignedTeam.length > 0 && (
                              <div className="flex items-center mt-1">
                                <Users className="w-3 h-3 mr-1 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {task.assignedTeam.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">{task.duration} {t.days}</td>
                      <td className="p-4 text-center">
                        {new Date(task.startDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </td>
                      <td className="p-4 text-center">
                        {new Date(task.endDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{task.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {t[task.status.replace('-', '') as keyof typeof t] || task.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">{formatCurrency(task.cost)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;