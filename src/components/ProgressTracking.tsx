import React from 'react';
import { TrendingUp, Target, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { ProjectProgress, ProjectSchedule, ProjectScenario } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ProgressTrackingProps {
  progress: ProjectProgress;
  schedule: ProjectSchedule;
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ progress, schedule, scenario, language }) => {
  const texts = {
    tr: {
      progressTracking: 'İlerleme Takibi',
      overallProgress: 'Genel İlerleme',
      phaseProgress: 'Faz İlerlemesi',
      budgetTracking: 'Bütçe Takibi',
      scheduleTracking: 'Program Takibi',
      tasksCompleted: 'Tamamlanan Görevler',
      totalTasks: 'Toplam Görevler',
      milestonesAchieved: 'Ulaşılan Kilometre Taşları',
      totalMilestones: 'Toplam Kilometre Taşları',
      budgetSpent: 'Harcanan Bütçe',
      budgetRemaining: 'Kalan Bütçe',
      daysElapsed: 'Geçen Günler',
      daysRemaining: 'Kalan Günler',
      onSchedule: 'Programda',
      onBudget: 'Bütçede',
      delayed: 'Gecikti',
      overBudget: 'Bütçe Aşımı',
      phase: 'Faz',
      foundation: 'Temel',
      structure: 'Yapı',
      envelope: 'Kabuk',
      interior: 'İç Mekan',
      finishing: 'Son Kat',
      status: 'Durum',
      alerts: 'Uyarılar',
      recommendations: 'Öneriler'
    },
    en: {
      progressTracking: 'Progress Tracking',
      overallProgress: 'Overall Progress',
      phaseProgress: 'Phase Progress',
      budgetTracking: 'Budget Tracking',
      scheduleTracking: 'Schedule Tracking',
      tasksCompleted: 'Tasks Completed',
      totalTasks: 'Total Tasks',
      milestonesAchieved: 'Milestones Achieved',
      totalMilestones: 'Total Milestones',
      budgetSpent: 'Budget Spent',
      budgetRemaining: 'Budget Remaining',
      daysElapsed: 'Days Elapsed',
      daysRemaining: 'Days Remaining',
      onSchedule: 'On Schedule',
      onBudget: 'On Budget',
      delayed: 'Delayed',
      overBudget: 'Over Budget',
      phase: 'Phase',
      foundation: 'Foundation',
      structure: 'Structure',
      envelope: 'Envelope',
      interior: 'Interior',
      finishing: 'Finishing',
      status: 'Status',
      alerts: 'Alerts',
      recommendations: 'Recommendations'
    }
  };

  const t = texts[language];

  const phaseNames = {
    foundation: t.foundation,
    structure: t.structure,
    envelope: t.envelope,
    interior: t.interior,
    finishing: t.finishing
  };

  const budgetUtilization = (progress.budgetSpent / scenario.costs.total) * 100;
  const scheduleUtilization = (progress.daysElapsed / (progress.daysElapsed + progress.daysRemaining)) * 100;

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getStatusColor = (isOnTrack: boolean) => {
    return isOnTrack ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.overallProgress}</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">{progress.overallProgress}%</div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.tasksCompleted}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {progress.tasksCompleted}/{progress.totalTasks}
          </div>
          <div className="text-sm text-green-700">
            {Math.round((progress.tasksCompleted / progress.totalTasks) * 100)}% tamamlandı
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <DollarSign className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">{t.budgetTracking}</span>
          </div>
          <div className="text-lg font-bold text-purple-600">
            {budgetUtilization.toFixed(1)}%
          </div>
          <div className={`text-sm ${getStatusColor(progress.isOnBudget)}`}>
            {progress.isOnBudget ? t.onBudget : t.overBudget}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.scheduleTracking}</span>
          </div>
          <div className="text-lg font-bold text-orange-600">
            {scheduleUtilization.toFixed(1)}%
          </div>
          <div className={`text-sm ${getStatusColor(progress.isOnSchedule)}`}>
            {progress.isOnSchedule ? t.onSchedule : t.delayed}
          </div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          {t.phaseProgress}
        </h3>
        
        <div className="space-y-4">
          {Object.entries(progress.phaseProgress).map(([phaseKey, percentage]) => (
            <div key={phaseKey} className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-700">
                {phaseNames[phaseKey as keyof typeof phaseNames]}
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-right text-sm font-semibold">
                {percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget and Schedule Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Breakdown */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            {t.budgetTracking}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Toplam Bütçe</span>
              <span className="font-bold">{formatCurrency(scenario.costs.total)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="font-medium">{t.budgetSpent}</span>
              <span className="font-bold text-red-600">{formatCurrency(progress.budgetSpent)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">{t.budgetRemaining}</span>
              <span className="font-bold text-green-600">{formatCurrency(progress.budgetRemaining)}</span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Bütçe Kullanımı</span>
                <span>{budgetUtilization.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${budgetUtilization > 100 ? 'bg-red-500' : budgetUtilization > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Program Detayları
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Toplam Süre</span>
              <span className="font-bold">{schedule.totalDuration} gün</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">{t.daysElapsed}</span>
              <span className="font-bold text-blue-600">{progress.daysElapsed} gün</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">{t.daysRemaining}</span>
              <span className="font-bold text-green-600">{progress.daysRemaining} gün</span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Zaman Kullanımı</span>
                <span>{scheduleUtilization.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${scheduleUtilization}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Alerts */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {t.status} & {t.alerts}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Schedule Status */}
          <div className={`p-4 rounded-lg border ${
            progress.isOnSchedule 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center mb-2">
              <Clock className={`w-5 h-5 mr-2 ${progress.isOnSchedule ? 'text-green-600' : 'text-red-600'}`} />
              <span className="font-medium">Program Durumu</span>
            </div>
            <div className={`text-sm ${progress.isOnSchedule ? 'text-green-700' : 'text-red-700'}`}>
              {progress.isOnSchedule 
                ? 'Proje programında ilerliyor. Tüm kilometre taşları zamanında tamamlanıyor.'
                : 'Proje programında gecikme var. Kritik görevlere odaklanılması gerekiyor.'
              }
            </div>
          </div>

          {/* Budget Status */}
          <div className={`p-4 rounded-lg border ${
            progress.isOnBudget 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center mb-2">
              <DollarSign className={`w-5 h-5 mr-2 ${progress.isOnBudget ? 'text-green-600' : 'text-red-600'}`} />
              <span className="font-medium">Bütçe Durumu</span>
            </div>
            <div className={`text-sm ${progress.isOnBudget ? 'text-green-700' : 'text-red-700'}`}>
              {progress.isOnBudget 
                ? 'Bütçe kontrolü altında. Harcamalar planlanan seviyede ilerliyor.'
                : 'Bütçe aşımı riski var. Maliyet kontrolü ve optimizasyon gerekiyor.'
              }
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">{t.recommendations}</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Haftalık ilerleme toplantıları düzenli olarak yapılmalı</li>
            <li>• Kritik yol üzerindeki görevlere öncelik verilmeli</li>
            <li>• Kaynak kullanımı optimize edilmeli</li>
            <li>• Risk faktörleri sürekli izlenmeli</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;