import React, { useState } from 'react';
import { Plus, Copy, Trash2, BarChart3 } from 'lucide-react';
import { ProjectScenario } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ScenarioComparisonProps {
  currentScenario: ProjectScenario;
  language: 'tr' | 'en';
}

const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ currentScenario, language }) => {
  const [scenarios, setScenarios] = useState<ProjectScenario[]>([currentScenario]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([currentScenario.id]);

  const texts = {
    tr: {
      createScenario: 'Yeni Senaryo Oluştur',
      duplicateScenario: 'Senaryoyu Kopyala',
      deleteScenario: 'Senaryoyu Sil',
      scenarioName: 'Senaryo Adı',
      totalCost: 'Toplam Maliyet',
      costPerM2: 'M² Başına Maliyet',
      materials: 'Malzemeler',
      labor: 'İşçilik',
      equipment: 'Ekipman',
      difference: 'Fark',
      percentage: 'Yüzde',
      cheapest: 'En Ucuz',
      mostExpensive: 'En Pahalı',
      recommended: 'Önerilen',
      comparison: 'Karşılaştırma',
      selectScenarios: 'Karşılaştırılacak senaryoları seçin'
    },
    en: {
      createScenario: 'Create New Scenario',
      duplicateScenario: 'Duplicate Scenario',
      deleteScenario: 'Delete Scenario',
      scenarioName: 'Scenario Name',
      totalCost: 'Total Cost',
      costPerM2: 'Cost per M²',
      materials: 'Materials',
      labor: 'Labor',
      equipment: 'Equipment',
      difference: 'Difference',
      percentage: 'Percentage',
      cheapest: 'Cheapest',
      mostExpensive: 'Most Expensive',
      recommended: 'Recommended',
      comparison: 'Comparison',
      selectScenarios: 'Select scenarios to compare'
    }
  };

  const t = texts[language];

  const createNewScenario = () => {
    const newScenario: ProjectScenario = {
      ...currentScenario,
      id: `scenario-${Date.now()}`,
      name: `${t.scenarioName} ${scenarios.length + 1}`,
      createdAt: new Date().toISOString()
    };
    setScenarios([...scenarios, newScenario]);
  };

  const duplicateScenario = (scenario: ProjectScenario) => {
    const duplicated: ProjectScenario = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      name: `${scenario.name} - Kopya`,
      createdAt: new Date().toISOString()
    };
    setScenarios([...scenarios, duplicated]);
  };

  const deleteScenario = (scenarioId: string) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter(s => s.id !== scenarioId));
      setSelectedScenarios(selectedScenarios.filter(id => id !== scenarioId));
    }
  };

  const toggleScenarioSelection = (scenarioId: string) => {
    if (selectedScenarios.includes(scenarioId)) {
      setSelectedScenarios(selectedScenarios.filter(id => id !== scenarioId));
    } else {
      setSelectedScenarios([...selectedScenarios, scenarioId]);
    }
  };

  const selectedScenarioData = scenarios.filter(s => selectedScenarios.includes(s.id));
  const minCost = Math.min(...selectedScenarioData.map(s => s.costs.total));
  const maxCost = Math.max(...selectedScenarioData.map(s => s.costs.total));

  return (
    <div className="space-y-6">
      {/* Scenario Management */}
      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={createNewScenario}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.createScenario}
        </button>
      </div>

      {/* Scenario List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {scenarios.map(scenario => (
          <div
            key={scenario.id}
            className={`border rounded-lg p-4 transition-all cursor-pointer ${
              selectedScenarios.includes(scenario.id)
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => toggleScenarioSelection(scenario.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateScenario(scenario);
                  }}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {scenarios.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteScenario(scenario.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.totalCost}:</span>
                <span className="font-medium">{formatCurrency(scenario.costs.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.costPerM2}:</span>
                <span className="font-medium">
                  {formatCurrency(scenario.costs.total / scenario.basics.area)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{scenario.basics.location.city}</span>
                <span className="text-gray-600">{scenario.basics.area} m²</span>
              </div>
            </div>

            {/* Cost indicators */}
            {selectedScenarios.length > 1 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                {scenario.costs.total === minCost && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {t.cheapest}
                  </span>
                )}
                {scenario.costs.total === maxCost && minCost !== maxCost && (
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    {t.mostExpensive}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedScenarios.length > 1 && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              {t.comparison}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.scenarioName}</th>
                  <th className="text-right p-4 font-semibold">{t.totalCost}</th>
                  <th className="text-right p-4 font-semibold">{t.costPerM2}</th>
                  <th className="text-right p-4 font-semibold">{t.materials}</th>
                  <th className="text-right p-4 font-semibold">{t.labor}</th>
                  <th className="text-right p-4 font-semibold">{t.equipment}</th>
                  <th className="text-right p-4 font-semibold">{t.difference}</th>
                </tr>
              </thead>
              <tbody>
                {selectedScenarioData.map((scenario, index) => {
                  const costDifference = scenario.costs.total - minCost;
                  const percentageDifference = minCost > 0 ? (costDifference / minCost) * 100 : 0;
                  
                  return (
                    <tr key={scenario.id} className="border-t border-gray-200">
                      <td className="p-4 font-medium">{scenario.name}</td>
                      <td className="p-4 text-right">{formatCurrency(scenario.costs.total)}</td>
                      <td className="p-4 text-right">
                        {formatCurrency(scenario.costs.total / scenario.basics.area)}
                      </td>
                      <td className="p-4 text-right">
                        {formatCurrency(scenario.costs.construction.materials)}
                      </td>
                      <td className="p-4 text-right">
                        {formatCurrency(scenario.costs.construction.labor)}
                      </td>
                      <td className="p-4 text-right">
                        {formatCurrency(scenario.costs.construction.equipment)}
                      </td>
                      <td className="p-4 text-right">
                        {costDifference === 0 ? (
                          <span className="text-green-600 font-medium">-</span>
                        ) : (
                          <div className="text-right">
                            <div className="text-red-600 font-medium">
                              +{formatCurrency(costDifference)}
                            </div>
                            <div className="text-xs text-gray-500">
                              +{percentageDifference.toFixed(1)}%
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedScenarios.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {t.selectScenarios}
        </div>
      )}
    </div>
  );
};

export default ScenarioComparison;