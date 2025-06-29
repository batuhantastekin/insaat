import React, { useState } from 'react';
import { Calculator, FileText, Users, Settings, LogOut, User, TrendingUp } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import LanguageToggle from './components/LanguageToggle';
import ProjectForm from './components/ProjectForm';
import CostResults from './components/CostResults';
import UserManagement from './components/UserManagement';
import { ProjectBasics, TechnicalSpecs, CostBreakdown } from './types';
import { calculateDetailedCosts } from './utils/calculations';

function AppContent() {
  const { user, logout, hasPermission } = useAuth();
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [currentView, setCurrentView] = useState<'dashboard' | 'form' | 'results' | 'users'>('dashboard');
  const [projectData, setProjectData] = useState<{
    basics: ProjectBasics;
    specs: TechnicalSpecs;
    costs: CostBreakdown;
  } | null>(null);

  const texts = {
    tr: {
      title: 'Türkiye İnşaat Maliyet Analisti',
      subtitle: 'Profesyonel maliyet tahmini ve analiz sistemi',
      description: 'Türkiye\'nin inşaat sektörü için detaylı maliyet analizi, tedarikçi bilgileri ve optimizasyon önerileri.',
      newAnalysis: 'Yeni Analiz',
      dashboard: 'Ana Sayfa',
      costAnalysis: 'Maliyet Analizi',
      userManagement: 'Kullanıcı Yönetimi',
      welcome: 'Hoş Geldiniz',
      role: 'Rol',
      logout: 'Çıkış Yap',
      admin: 'Yönetici',
      projectManager: 'Proje Müdürü',
      engineer: 'Mühendis',
      contractor: 'Müteahhit',
      viewer: 'Görüntüleyici',
      quickActions: 'Hızlı İşlemler',
      recentProjects: 'Son Projeler',
      systemStats: 'Sistem İstatistikleri',
      totalProjects: 'Toplam Proje',
      activeUsers: 'Aktif Kullanıcılar',
      totalCost: 'Toplam Maliyet',
      avgCostPerM2: 'Ort. m² Maliyeti'
    },
    en: {
      title: 'Turkish Construction Cost Analyst',
      subtitle: 'Professional cost estimation and analysis system',
      description: 'Detailed cost analysis for Turkey\'s construction sector with supplier information and optimization recommendations.',
      newAnalysis: 'New Analysis',
      dashboard: 'Dashboard',
      costAnalysis: 'Cost Analysis',
      userManagement: 'User Management',
      welcome: 'Welcome',
      role: 'Role',
      logout: 'Logout',
      admin: 'Admin',
      projectManager: 'Project Manager',
      engineer: 'Engineer',
      contractor: 'Contractor',
      viewer: 'Viewer',
      quickActions: 'Quick Actions',
      recentProjects: 'Recent Projects',
      systemStats: 'System Statistics',
      totalProjects: 'Total Projects',
      activeUsers: 'Active Users',
      totalCost: 'Total Cost',
      avgCostPerM2: 'Avg. Cost per m²'
    }
  };

  const t = texts[language];

  const handleFormSubmit = (basics: ProjectBasics, specs: TechnicalSpecs) => {
    const costs = calculateDetailedCosts(basics, specs);
    setProjectData({ basics, specs, costs });
    setCurrentView('results');
  };

  const handleNewAnalysis = () => {
    setProjectData(null);
    setCurrentView('form');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('dashboard');
    setProjectData(null);
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      'admin': t.admin,
      'project-manager': t.projectManager,
      'engineer': t.engineer,
      'contractor': t.contractor,
      'viewer': t.viewer
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800',
      'project-manager': 'bg-blue-100 text-blue-800',
      'engineer': 'bg-green-100 text-green-800',
      'contractor': 'bg-orange-100 text-orange-800',
      'viewer': 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || colors.viewer;
  };

  // Dashboard content
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t.welcome}, {user?.name}!</h2>
            <p className="text-blue-100 mb-4">{t.subtitle}</p>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user?.role || 'viewer')} bg-white/20 text-white`}>
                {getRoleDisplayName(user?.role || 'viewer')}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <Calculator className="w-24 h-24 text-white/30" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t.quickActions}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView('form')}
            className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-semibold text-blue-900">{t.newAnalysis}</div>
              <div className="text-sm text-blue-700">Yeni proje maliyeti hesapla</div>
            </div>
          </button>

          {hasPermission('users', 'read') && (
            <button
              onClick={() => setCurrentView('users')}
              className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <div className="text-left">
                <div className="font-semibold text-purple-900">{t.userManagement}</div>
                <div className="text-sm text-purple-700">Kullanıcıları yönet</div>
              </div>
            </button>
          )}

          <button className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <FileText className="w-8 h-8 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-semibold text-green-900">Raporlar</div>
              <div className="text-sm text-green-700">Detaylı raporları görüntüle</div>
            </div>
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">{t.totalProjects}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">{t.activeUsers}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">₺125M</div>
              <div className="text-sm text-gray-600">{t.totalCost}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">₺4,250</div>
              <div className="text-sm text-gray-600">{t.avgCostPerM2}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t.recentProjects}</h3>
        <div className="space-y-4">
          {[
            { name: 'Ataşehir Konut Projesi', area: '2,500 m²', cost: '₺11.2M', status: 'Tamamlandı', date: '15 Ocak 2025' },
            { name: 'Ankara Ofis Binası', area: '3,200 m²', cost: '₺16.8M', status: 'Devam Ediyor', date: '12 Ocak 2025' },
            { name: 'İzmir Fabrika', area: '5,000 m²', cost: '₺19.5M', status: 'Planlama', date: '10 Ocak 2025' }
          ].map((project, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">{project.name}</div>
                <div className="text-sm text-gray-600">{project.area} • {project.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{project.cost}</div>
                <div className={`text-sm px-2 py-1 rounded-full ${
                  project.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                  project.status === 'Devam Ediyor' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <LoginForm language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.dashboard}
              </button>
              
              <button
                onClick={() => setCurrentView('form')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'form' || currentView === 'results'
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.costAnalysis}
              </button>

              {hasPermission('users', 'read') && (
                <button
                  onClick={() => setCurrentView('users')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'users'
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.userManagement}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {(currentView === 'results' || projectData) && (
                <button
                  onClick={handleNewAnalysis}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {t.newAnalysis}
                </button>
              )}
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-600">{getRoleDisplayName(user.role)}</div>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title={t.logout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
              
              <LanguageToggle currentLang={language} onToggle={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        
        {currentView === 'form' && (
          <div>
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t.description}
                </p>
              </div>
            </div>

            {/* Project Form */}
            <ProjectForm onSubmit={handleFormSubmit} language={language} />
          </div>
        )}

        {currentView === 'results' && projectData && (
          <CostResults
            costs={projectData.costs}
            basics={projectData.basics}
            specs={projectData.specs}
            language={language}
          />
        )}

        {currentView === 'users' && hasPermission('users', 'read') && (
          <UserManagement language={language} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              {language === 'tr' 
                ? '© 2025 Türkiye İnşaat Maliyet Analisti. Tüm hakları saklıdır.'
                : '© 2025 Turkish Construction Cost Analyst. All rights reserved.'
              }
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {language === 'tr'
                ? 'Fiyatlar güncel piyasa koşullarına göre hesaplanmıştır. 30 gün geçerlidir.'
                : 'Prices calculated based on current market conditions. Valid for 30 days.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;