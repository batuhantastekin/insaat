import React, { useState } from 'react';
import { Users, Wrench, Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { ProjectSchedule, ProjectScenario, ResourceAllocation, TeamMember } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ResourcePlanningProps {
  schedule: ProjectSchedule;
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ResourcePlanning: React.FC<ResourcePlanningProps> = ({ schedule, scenario, language }) => {
  const [activeView, setActiveView] = useState<'overview' | 'labor' | 'equipment' | 'materials'>('overview');

  const texts = {
    tr: {
      resourcePlanning: 'Kaynak Planlama',
      overview: 'Genel Bakış',
      laborResources: 'İnsan Kaynakları',
      equipment: 'Ekipman',
      materials: 'Malzemeler',
      resourceName: 'Kaynak Adı',
      quantity: 'Miktar',
      unit: 'Birim',
      costPerUnit: 'Birim Maliyet',
      totalCost: 'Toplam Maliyet',
      utilization: 'Kullanım Oranı',
      availability: 'Müsaitlik',
      startDate: 'Başlangıç',
      endDate: 'Bitiş',
      available: 'Müsait',
      allocated: 'Atanmış',
      overallocated: 'Aşırı Yüklenmiş',
      teamMember: 'Ekip Üyesi',
      role: 'Rol',
      specialization: 'Uzmanlık',
      dailyRate: 'Günlük Ücret',
      workload: 'İş Yükü',
      contact: 'İletişim',
      resourceUtilization: 'Kaynak Kullanımı',
      totalResources: 'Toplam Kaynaklar',
      activeAllocations: 'Aktif Atamalar',
      overallUtilization: 'Genel Kullanım'
    },
    en: {
      resourcePlanning: 'Resource Planning',
      overview: 'Overview',
      laborResources: 'Labor Resources',
      equipment: 'Equipment',
      materials: 'Materials',
      resourceName: 'Resource Name',
      quantity: 'Quantity',
      unit: 'Unit',
      costPerUnit: 'Cost per Unit',
      totalCost: 'Total Cost',
      utilization: 'Utilization',
      availability: 'Availability',
      startDate: 'Start Date',
      endDate: 'End Date',
      available: 'Available',
      allocated: 'Allocated',
      overallocated: 'Overallocated',
      teamMember: 'Team Member',
      role: 'Role',
      specialization: 'Specialization',
      dailyRate: 'Daily Rate',
      workload: 'Workload',
      contact: 'Contact',
      resourceUtilization: 'Resource Utilization',
      totalResources: 'Total Resources',
      activeAllocations: 'Active Allocations',
      overallUtilization: 'Overall Utilization'
    }
  };

  const t = texts[language];

  // Generate resource allocations
  const generateResourceAllocations = (): ResourceAllocation[] => {
    const startDate = new Date(scenario.basics.startDate || new Date());
    
    return [
      // Labor resources
      {
        id: 'labor-1',
        resourceType: 'labor',
        name: language === 'tr' ? 'İnşaat Mühendisi' : 'Construction Engineer',
        quantity: 2,
        unit: 'kişi',
        costPerUnit: 650,
        totalCost: 650 * 2 * 180,
        startDate: startDate.toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 85,
        availability: 'allocated'
      },
      {
        id: 'labor-2',
        resourceType: 'labor',
        name: language === 'tr' ? 'Usta Ekibi' : 'Master Craftsmen Team',
        quantity: 8,
        unit: 'kişi',
        costPerUnit: 450,
        totalCost: 450 * 8 * 150,
        startDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 170 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 92,
        availability: 'allocated'
      },
      {
        id: 'labor-3',
        resourceType: 'labor',
        name: language === 'tr' ? 'İşçi Ekibi' : 'Worker Team',
        quantity: 15,
        unit: 'kişi',
        costPerUnit: 350,
        totalCost: 350 * 15 * 160,
        startDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 78,
        availability: 'allocated'
      },
      // Equipment resources
      {
        id: 'equipment-1',
        resourceType: 'equipment',
        name: language === 'tr' ? 'Ekskavatör' : 'Excavator',
        quantity: 2,
        unit: 'adet',
        costPerUnit: 1200,
        totalCost: 1200 * 2 * 45,
        startDate: new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 65 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 95,
        availability: 'allocated'
      },
      {
        id: 'equipment-2',
        resourceType: 'equipment',
        name: language === 'tr' ? 'Beton Pompası' : 'Concrete Pump',
        quantity: 1,
        unit: 'adet',
        costPerUnit: 2500,
        totalCost: 2500 * 1 * 30,
        startDate: new Date(startDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 65 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 88,
        availability: 'allocated'
      },
      {
        id: 'equipment-3',
        resourceType: 'equipment',
        name: language === 'tr' ? 'Vinç' : 'Crane',
        quantity: 1,
        unit: 'adet',
        costPerUnit: 3500,
        totalCost: 3500 * 1 * 120,
        startDate: new Date(startDate.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 165 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 75,
        availability: 'allocated'
      },
      // Material resources
      {
        id: 'material-1',
        resourceType: 'material',
        name: language === 'tr' ? 'Beton C25/30' : 'Concrete C25/30',
        quantity: 850,
        unit: 'm³',
        costPerUnit: 850,
        totalCost: 850 * 850,
        startDate: new Date(startDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 100,
        availability: 'allocated'
      },
      {
        id: 'material-2',
        resourceType: 'material',
        name: language === 'tr' ? 'İnşaat Demiri' : 'Rebar Steel',
        quantity: 45,
        unit: 'ton',
        costPerUnit: 28500,
        totalCost: 28500 * 45,
        startDate: new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(startDate.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        utilization: 100,
        availability: 'allocated'
      }
    ];
  };

  // Generate team members
  const generateTeamMembers = (): TeamMember[] => {
    return [
      {
        id: 'team-1',
        name: 'Ahmet Yılmaz',
        role: language === 'tr' ? 'Proje Müdürü' : 'Project Manager',
        specialization: [language === 'tr' ? 'Proje Yönetimi' : 'Project Management', language === 'tr' ? 'İnşaat Mühendisliği' : 'Civil Engineering'],
        dailyRate: 750,
        availability: 100,
        assignedTasks: ['task-1', 'task-2'],
        workload: 85,
        contact: {
          email: 'ahmet.yilmaz@example.com',
          phone: '+90 532 123 4567'
        }
      },
      {
        id: 'team-2',
        name: 'Mehmet Kaya',
        role: language === 'tr' ? 'Saha Müdürü' : 'Site Manager',
        specialization: [language === 'tr' ? 'Saha Yönetimi' : 'Site Management', language === 'tr' ? 'Kalite Kontrol' : 'Quality Control'],
        dailyRate: 650,
        availability: 100,
        assignedTasks: ['task-2', 'task-4', 'task-5'],
        workload: 92,
        contact: {
          email: 'mehmet.kaya@example.com',
          phone: '+90 532 234 5678'
        }
      },
      {
        id: 'team-3',
        name: 'Fatma Demir',
        role: language === 'tr' ? 'İnşaat Mühendisi' : 'Construction Engineer',
        specialization: [language === 'tr' ? 'Yapısal Tasarım' : 'Structural Design', language === 'tr' ? 'Beton Teknolojisi' : 'Concrete Technology'],
        dailyRate: 600,
        availability: 80,
        assignedTasks: ['task-5', 'task-7', 'task-8'],
        workload: 78,
        contact: {
          email: 'fatma.demir@example.com',
          phone: '+90 532 345 6789'
        }
      },
      {
        id: 'team-4',
        name: 'Ali Özkan',
        role: language === 'tr' ? 'Usta Başı' : 'Master Craftsman',
        specialization: [language === 'tr' ? 'Betonarme' : 'Reinforced Concrete', language === 'tr' ? 'Kalıp İşleri' : 'Formwork'],
        dailyRate: 500,
        availability: 100,
        assignedTasks: ['task-4', 'task-5', 'task-6'],
        workload: 95,
        contact: {
          email: 'ali.ozkan@example.com',
          phone: '+90 532 456 7890'
        }
      }
    ];
  };

  const [resources] = useState<ResourceAllocation[]>(generateResourceAllocations());
  const [teamMembers] = useState<TeamMember[]>(generateTeamMembers());

  const getAvailabilityColor = (availability: string) => {
    const colors = {
      'available': 'bg-green-100 text-green-800',
      'allocated': 'bg-blue-100 text-blue-800',
      'overallocated': 'bg-red-100 text-red-800'
    };
    return colors[availability as keyof typeof colors] || colors['available'];
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 75) return 'text-orange-600';
    if (utilization >= 50) return 'text-blue-600';
    return 'text-green-600';
  };

  const laborResources = resources.filter(r => r.resourceType === 'labor');
  const equipmentResources = resources.filter(r => r.resourceType === 'equipment');
  const materialResources = resources.filter(r => r.resourceType === 'material');

  const totalResourceCost = resources.reduce((sum, r) => sum + r.totalCost, 0);
  const averageUtilization = resources.reduce((sum, r) => sum + r.utilization, 0) / resources.length;
  const activeAllocations = resources.filter(r => r.availability === 'allocated').length;

  return (
    <div className="space-y-6">
      {/* Resource Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Package className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t.totalResources}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{resources.length}</div>
          <div className="text-sm text-blue-700">{formatCurrency(totalResourceCost)}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">{t.activeAllocations}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{activeAllocations}</div>
          <div className="text-sm text-green-700">Aktif</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">{t.overallUtilization}</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{averageUtilization.toFixed(0)}%</div>
          <div className="text-sm text-orange-700">Ortalama</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">Ekip Üyeleri</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{teamMembers.length}</div>
          <div className="text-sm text-purple-700">Aktif</div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex flex-wrap border-b border-gray-200">
        {[
          { id: 'overview', label: t.overview, icon: Package },
          { id: 'labor', label: t.laborResources, icon: Users },
          { id: 'equipment', label: t.equipment, icon: Wrench },
          { id: 'materials', label: t.materials, icon: Package }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors mr-2 mb-2 rounded-t-lg ${
                activeView === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
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
      <div className="bg-white border rounded-lg overflow-hidden">
        {activeView === 'overview' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t.resourceUtilization}</h3>
            
            <div className="space-y-4">
              {resources.map(resource => (
                <div key={resource.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      resource.resourceType === 'labor' ? 'bg-blue-500' :
                      resource.resourceType === 'equipment' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{resource.name}</div>
                      <div className="text-sm text-gray-600">
                        {resource.quantity} {resource.unit} • {formatCurrency(resource.costPerUnit)}/{resource.unit}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(resource.totalCost)}</div>
                      <div className={`text-sm ${getUtilizationColor(resource.utilization)}`}>
                        {resource.utilization}% kullanım
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(resource.availability)}`}>
                      {t[resource.availability]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'labor' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.teamMember}</th>
                  <th className="text-left p-4 font-semibold">{t.role}</th>
                  <th className="text-left p-4 font-semibold">{t.specialization}</th>
                  <th className="text-right p-4 font-semibold">{t.dailyRate}</th>
                  <th className="text-center p-4 font-semibold">{t.workload}</th>
                  <th className="text-left p-4 font-semibold">{t.contact}</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(member => (
                  <tr key={member.id} className="border-t border-gray-200">
                    <td className="p-4 font-medium">{member.name}</td>
                    <td className="p-4">{member.role}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {member.specialization.map((spec, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">{formatCurrency(member.dailyRate)}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getUtilizationColor(member.workload) === 'text-red-600' ? 'bg-red-500' : 
                              getUtilizationColor(member.workload) === 'text-orange-600' ? 'bg-orange-500' : 'bg-blue-500'}`}
                            style={{ width: `${member.workload}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{member.workload}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <div>{member.contact.email}</div>
                        <div className="text-gray-500">{member.contact.phone}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(activeView === 'equipment' || activeView === 'materials') && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.resourceName}</th>
                  <th className="text-center p-4 font-semibold">{t.quantity}</th>
                  <th className="text-center p-4 font-semibold">{t.unit}</th>
                  <th className="text-right p-4 font-semibold">{t.costPerUnit}</th>
                  <th className="text-right p-4 font-semibold">{t.totalCost}</th>
                  <th className="text-center p-4 font-semibold">{t.utilization}</th>
                  <th className="text-center p-4 font-semibold">{t.availability}</th>
                </tr>
              </thead>
              <tbody>
                {(activeView === 'equipment' ? equipmentResources : materialResources).map(resource => (
                  <tr key={resource.id} className="border-t border-gray-200">
                    <td className="p-4 font-medium">{resource.name}</td>
                    <td className="p-4 text-center">{resource.quantity}</td>
                    <td className="p-4 text-center">{resource.unit}</td>
                    <td className="p-4 text-right">{formatCurrency(resource.costPerUnit)}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(resource.totalCost)}</td>
                    <td className="p-4 text-center">
                      <span className={`font-medium ${getUtilizationColor(resource.utilization)}`}>
                        {resource.utilization}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(resource.availability)}`}>
                        {t[resource.availability]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcePlanning;