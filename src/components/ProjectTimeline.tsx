import React, { useState } from 'react';
import { Calendar, Clock, Flag, CheckCircle, AlertCircle } from 'lucide-react';
import { ProjectSchedule, ProjectScenario, ProjectMilestone } from '../types';

interface ProjectTimelineProps {
  schedule: ProjectSchedule;
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ schedule, scenario, language }) => {
  const texts = {
    tr: {
      projectTimeline: 'Proje Zaman Çizelgesi',
      milestones: 'Kilometre Taşları',
      upcomingMilestones: 'Yaklaşan Kilometre Taşları',
      completedMilestones: 'Tamamlanan Kilometre Taşları',
      criticalMilestones: 'Kritik Kilometre Taşları',
      timeline: 'Zaman Çizelgesi',
      phase: 'Faz',
      startDate: 'Başlangıç',
      endDate: 'Bitiş',
      duration: 'Süre',
      status: 'Durum',
      progress: 'İlerleme',
      days: 'gün',
      completed: 'Tamamlandı',
      inProgress: 'Devam Ediyor',
      notStarted: 'Başlamadı',
      delayed: 'Gecikti',
      critical: 'Kritik',
      normal: 'Normal',
      description: 'Açıklama'
    },
    en: {
      projectTimeline: 'Project Timeline',
      milestones: 'Milestones',
      upcomingMilestones: 'Upcoming Milestones',
      completedMilestones: 'Completed Milestones',
      criticalMilestones: 'Critical Milestones',
      timeline: 'Timeline',
      phase: 'Phase',
      startDate: 'Start Date',
      endDate: 'End Date',
      duration: 'Duration',
      status: 'Status',
      progress: 'Progress',
      days: 'days',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      delayed: 'Delayed',
      critical: 'Critical',
      normal: 'Normal',
      description: 'Description'
    }
  };

  const t = texts[language];

  // Generate milestones based on project phases
  const generateMilestones = (): ProjectMilestone[] => {
    const startDate = new Date(scenario.basics.startDate || new Date());
    
    return [
      {
        id: 'milestone-1',
        name: language === 'tr' ? 'İmar İzni Onayı' : 'Building Permit Approval',
        description: language === 'tr' ? 'Tüm yasal izinlerin tamamlanması' : 'Completion of all legal permits',
        date: new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: true,
        critical: true
      },
      {
        id: 'milestone-2',
        name: language === 'tr' ? 'Saha Hazırlığı Tamamlandı' : 'Site Preparation Completed',
        description: language === 'tr' ? 'İnşaat sahasının inşaata hazır hale getirilmesi' : 'Construction site ready for construction',
        date: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: true,
        critical: false
      },
      {
        id: 'milestone-3',
        name: language === 'tr' ? 'Temel Kazısı Tamamlandı' : 'Foundation Excavation Completed',
        description: language === 'tr' ? 'Tüm temel kazı çalışmalarının bitirilmesi' : 'All foundation excavation work completed',
        date: new Date(startDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: true,
        critical: true
      },
      {
        id: 'milestone-4',
        name: language === 'tr' ? 'Temel Betonajı Tamamlandı' : 'Foundation Concrete Completed',
        description: language === 'tr' ? 'Tüm temel beton çalışmalarının bitirilmesi' : 'All foundation concrete work completed',
        date: new Date(startDate.getTime() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        critical: true
      },
      {
        id: 'milestone-5',
        name: language === 'tr' ? 'Zemin Kat Tamamlandı' : 'Ground Floor Completed',
        description: language === 'tr' ? 'Zemin kat yapısal çalışmalarının bitirilmesi' : 'Ground floor structural work completed',
        date: new Date(startDate.getTime() + 80 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        critical: true
      },
      {
        id: 'milestone-6',
        name: language === 'tr' ? 'Çatı Tamamlandı' : 'Roof Completed',
        description: language === 'tr' ? 'Çatı konstrüksiyonunun bitirilmesi' : 'Roof construction completed',
        date: new Date(startDate.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        critical: true
      },
      {
        id: 'milestone-7',
        name: language === 'tr' ? 'Cephe Çalışmaları Tamamlandı' : 'Facade Work Completed',
        description: language === 'tr' ? 'Dış cephe ve yalıtım çalışmalarının bitirilmesi' : 'External facade and insulation work completed',
        date: new Date(startDate.getTime() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        critical: false
      },
      {
        id: 'milestone-8',
        name: language === 'tr' ? 'Proje Teslimi' : 'Project Delivery',
        description: language === 'tr' ? 'Projenin tamamlanması ve teslimi' : 'Project completion and delivery',
        date: new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        critical: true
      }
    ];
  };

  const [milestones] = useState<ProjectMilestone[]>(generateMilestones());

  const completedMilestones = milestones.filter(m => m.completed);
  const upcomingMilestones = milestones.filter(m => !m.completed);
  const criticalMilestones = milestones.filter(m => m.critical && !m.completed);

  const today = new Date();
  const getTimelinePosition = (date: string) => {
    const milestoneDate = new Date(date);
    const startDate = new Date(scenario.basics.startDate || new Date());
    const endDate = new Date(startDate.getTime() + schedule.totalDuration * 24 * 60 * 60 * 1000);
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = milestoneDate.getTime() - startDate.getTime();
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  };

  const isOverdue = (date: string, completed: boolean) => {
    return !completed && new Date(date) < today;
  };

  return (
    <div className="space-y-6">
      {/* Milestone Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.completedMilestones}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{completedMilestones.length}</div>
          <div className="text-sm text-green-700">/ {milestones.length} toplam</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.upcomingMilestones}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{upcomingMilestones.length}</div>
          <div className="text-sm text-blue-700">Bekleyen</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">{t.criticalMilestones}</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{criticalMilestones.length}</div>
          <div className="text-sm text-red-700">Kritik</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <Flag className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">Geciken</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {milestones.filter(m => isOverdue(m.date, m.completed)).length}
          </div>
          <div className="text-sm text-orange-700">Kilometre Taşı</div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          {t.timeline}
        </h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-4 h-4 rounded-full border-2 ${
                  milestone.completed 
                    ? 'bg-green-500 border-green-500' 
                    : milestone.critical 
                      ? 'bg-red-500 border-red-500'
                      : 'bg-blue-500 border-blue-500'
                }`}>
                  {milestone.completed && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                
                {/* Timeline content */}
                <div className="ml-6 flex-1">
                  <div className={`p-4 rounded-lg border ${
                    milestone.completed 
                      ? 'bg-green-50 border-green-200' 
                      : isOverdue(milestone.date, milestone.completed)
                        ? 'bg-red-50 border-red-200'
                        : milestone.critical
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{milestone.name}</h4>
                      <div className="flex items-center space-x-2">
                        {milestone.critical && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            {t.critical}
                          </span>
                        )}
                        {milestone.completed && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {t.completed}
                          </span>
                        )}
                        {isOverdue(milestone.date, milestone.completed) && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            Gecikti
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {new Date(milestone.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{t.milestones}</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold">Kilometre Taşı</th>
                <th className="text-left p-4 font-semibold">{t.description}</th>
                <th className="text-center p-4 font-semibold">Tarih</th>
                <th className="text-center p-4 font-semibold">{t.status}</th>
                <th className="text-center p-4 font-semibold">Öncelik</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map(milestone => (
                <tr key={milestone.id} className="border-t border-gray-200">
                  <td className="p-4 font-medium">{milestone.name}</td>
                  <td className="p-4 text-gray-600">{milestone.description}</td>
                  <td className="p-4 text-center">
                    {new Date(milestone.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      milestone.completed 
                        ? 'bg-green-100 text-green-800'
                        : isOverdue(milestone.date, milestone.completed)
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {milestone.completed 
                        ? t.completed 
                        : isOverdue(milestone.date, milestone.completed)
                          ? 'Gecikti'
                          : 'Bekliyor'
                      }
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      milestone.critical 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {milestone.critical ? t.critical : t.normal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;