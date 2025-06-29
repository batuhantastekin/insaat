import React, { useState } from 'react';
import { Calculator, FileText } from 'lucide-react';
import LanguageToggle from './components/LanguageToggle';
import ProjectForm from './components/ProjectForm';
import CostResults from './components/CostResults';
import { ProjectBasics, TechnicalSpecs, CostBreakdown } from './types';
import { calculateDetailedCosts } from './utils/calculations';

function App() {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
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
      newAnalysis: 'Yeni Analiz'
    },
    en: {
      title: 'Turkish Construction Cost Analyst',
      subtitle: 'Professional cost estimation and analysis system',
      description: 'Detailed cost analysis for Turkey\'s construction sector with supplier information and optimization recommendations.',
      newAnalysis: 'New Analysis'
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
            <div className="flex items-center space-x-4">
              {currentView === 'results' && (
                <button
                  onClick={handleNewAnalysis}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {t.newAnalysis}
                </button>
              )}
              <LanguageToggle currentLang={language} onToggle={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

export default App;