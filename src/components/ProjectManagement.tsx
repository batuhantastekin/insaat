import React, { useState } from 'react';
import { Calendar, Users, BarChart3, Clock, Target, AlertCircle } from 'lucide-react';
import { ProjectScenario, ProjectSchedule, ProjectProgress } from '../types';
import GanttChart from './GanttChart';
import ResourcePlanning from './ResourcePlanning';
import ProjectTimeline from './ProjectTimeline';
import ProgressTracking from './ProgressTracking';

interface ProjectManagementProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ currentScenario, language }) => {
  const [activeTab, setActiveTab] = useState<'gantt' | 'resources' | 'timeline' | 'progress'>('gantt');

  const texts = {
    tr: {
      projectManagement: 'Proje Yönetimi',
      ganttChart: 'Gantt Şeması',
      resourcePlanning: 'Kaynak Planlama',
      projectTimeline: 'Proje Zaman Çizelgesi',
      progressTracking: 'İlerleme Takibi',
      overview: 'Genel Bakış',
      totalDuration: 'Toplam Süre',
      days: 'gün',
      phases: 'Fazlar',
      tasks: 'Görevler',
      milestones: 'Kilometre Taşları',
      criticalPath: 'Kritik Yol',
      resourceUtilization: 'Kaynak Kullanımı',
      teamMembers: 'Ekip Üyeleri',
      budgetStatus: 'Bütçe Durumu'
    },
    en: {
      projectManagement: 'Project Management',
      ganttChart: 'Gantt Chart',
      resourcePlanning: 'Resource Planning',
      projectTimeline: 'Project Timeline',
      progressTracking: 'Progress Tracking',
      overview: 'Overview',
      totalDuration: 'Total Duration',
      days: 'days',
      phases: 'Phases',
      tasks: 'Tasks',
      milestones: 'Milestones',
      criticalPath: 'Critical Path',
      resourceUtilization: 'Resource Utilization',
      teamMembers: 'Team Members',
      budgetStatus: 'Budget Status'
    }
  };

  const t = texts[language];

  const tabs = [
    { id: 'gantt', label: t.ganttChart, icon: BarChart3 },
    { id: 'resources', label: t.resourcePlanning, icon: Users },
    { id: 'timeline', label: t.projectTimeline, icon: Calendar },
    { id: 'progress', label: t.progressTracking, icon: Target }
  ];

  // Generate project schedule based on current scenario
  const generateProjectSchedule = (): ProjectSchedule => {
    const startDate = new Date(currentScenario.basics.startDate || new Date());
    const area = currentScenario.basics.area;
    const buildingType = currentScenario.basics.buildingType;
    
    // Calculate duration based on building type and area
    const baseDaysPerM2 = {
      residential: 0.8,
      commercial: 0.9,
      industrial: 0.7
    };
    
    const totalDuration = Math.ceil(area * baseDaysPerM2[buildingType]);
    
    return {
      id: `schedule-${currentScenario.id}`,
      projectId: currentScenario.id,
      phases: [],
      tasks: [],
      milestones: [],
      resources: [],
      criticalPath: [],
      totalDuration,
      bufferTime: Math.ceil(totalDuration * 0.1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const [projectSchedule] = useState<ProjectSchedule>(generateProjectSchedule());

  // Generate mock progress data
  const generateProgressData = (): ProjectProgress => {
    return {
      overallProgress: 35,
      phaseProgress: {
        'foundation': 100,
        'structure': 60,
        'envelope': 20,
        'interior': 0,
        'finishing': 0
      },
      tasksCompleted: 28,
      totalTasks: 85,
      milestonesAchieved: 3,
      totalMilestones: 8,
      budgetSpent: currentScenario.costs.total * 0.35,
      budgetRemaining: currentScenario.costs.total * 0.65,
      daysElapsed: Math.ceil(projectSchedule.totalDuration * 0.35),
      daysRemaining: Math.ceil(projectSchedule.totalDuration * 0.65),
      isOnSchedule: true,
      isOnBudget: true
    };
  };

  const [progressData] = useState<ProjectProgress>(generateProgressData());

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg mr-4">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.projectManagement}</h2>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.totalDuration}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {projectSchedule.totalDuration}
          </div>
          <div className="text-sm text-blue-700">{t.days}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">İlerleme</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {progressData.overallProgress}%
          </div>
          <div className="text-sm text-green-700">Tamamlandı</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.tasks}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {progressData.tasksCompleted}/{progressData.totalTasks}
          </div>
          <div className="text-sm text-purple-700">Aktif</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">Durum</span>
          </div>
          <div className="text-lg font-bold text-orange-600">
            {progressData.isOnSchedule && progressData.isOnBudget ? 'Normal' : 'Dikkat'}
          </div>
          <div className="text-sm text-orange-700">
            {progressData.isOnSchedule ? 'Zamanında' : 'Gecikme'} • {progressData.isOnBudget ? 'Bütçede' : 'Aşım'}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors mr-2 mb-2 rounded-t-lg ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'gantt' && (
          <GanttChart 
            schedule={projectSchedule} 
            scenario={currentScenario} 
            language={language} 
          />
        )}
        {activeTab === 'resources' && (
          <ResourcePlanning 
            schedule={projectSchedule} 
            scenario={currentScenario} 
            language={language} 
          />
        )}
        {activeTab === 'timeline' && (
          <ProjectTimeline 
            schedule={projectSchedule} 
            scenario={currentScenario} 
            language={language} 
          />
        )}
        {activeTab === 'progress' && (
          <ProgressTracking 
            progress={progressData} 
            schedule={projectSchedule} 
            scenario={currentScenario} 
            language={language} 
          />
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;