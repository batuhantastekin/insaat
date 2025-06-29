import React, { useState } from 'react';
import { Building, MapPin, Calendar, Settings } from 'lucide-react';
import { ProjectBasics, TechnicalSpecs } from '../types';

interface ProjectFormProps {
  onSubmit: (basics: ProjectBasics, specs: TechnicalSpecs) => void;
  language: 'tr' | 'en';
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, language }) => {
  const [activeTab, setActiveTab] = useState('basics');
  const [basics, setBasics] = useState<ProjectBasics>({
    location: { city: '', district: '' },
    area: 0,
    buildingType: 'residential',
    qualityLevel: 'standard',
    startDate: '',
    completionDate: '',
    specialRequirements: ''
  });

  const [specs, setSpecs] = useState<TechnicalSpecs>({
    floors: 1,
    foundationType: 'shallow',
    structuralSystem: 'concrete',
    facadeType: 'brick',
    hvacSystem: 'split',
    specialInstallations: []
  });

  const texts = {
    tr: {
      projectBasics: 'Proje Temelleri',
      technicalSpecs: 'Teknik Özellikler',
      location: 'Konum',
      city: 'Şehir',
      district: 'İlçe',
      totalArea: 'Toplam Alan (m²)',
      buildingType: 'Yapı Tipi',
      residential: 'Konut',
      commercial: 'Ticari',
      industrial: 'Endüstriyel',
      qualityLevel: 'Kalite Seviyesi',
      economic: 'Ekonomik',
      standard: 'Standart',
      luxury: 'Lüks',
      startDate: 'Başlangıç Tarihi',
      completionDate: 'Tamamlanma Tarihi',
      specialRequirements: 'Özel Gereksinimler',
      floors: 'Kat Sayısı',
      foundationType: 'Temel Tipi',
      shallow: 'Yüzeysel',
      deep: 'Derin',
      pile: 'Kazık',
      structuralSystem: 'Yapısal Sistem',
      concrete: 'Beton',
      steel: 'Çelik',
      mixed: 'Karma',
      facadeType: 'Cephe Tipi',
      brick: 'Tuğla',
      curtainWall: 'Perde Duvar',
      composite: 'Kompozit',
      hvacSystem: 'HVAC Sistemi',
      central: 'Merkezi',
      split: 'Split',
      vrf: 'VRF',
      calculate: 'Hesapla',
      previous: 'Önceki',
      next: 'Sonraki'
    },
    en: {
      projectBasics: 'Project Basics',
      technicalSpecs: 'Technical Specifications',
      location: 'Location',
      city: 'City',
      district: 'District',
      totalArea: 'Total Area (m²)',
      buildingType: 'Building Type',
      residential: 'Residential',
      commercial: 'Commercial',
      industrial: 'Industrial',
      qualityLevel: 'Quality Level',
      economic: 'Economic',
      standard: 'Standard',
      luxury: 'Luxury',
      startDate: 'Start Date',
      completionDate: 'Completion Date',
      specialRequirements: 'Special Requirements',
      floors: 'Number of Floors',
      foundationType: 'Foundation Type',
      shallow: 'Shallow',
      deep: 'Deep',
      pile: 'Pile',
      structuralSystem: 'Structural System',
      concrete: 'Concrete',
      steel: 'Steel',
      mixed: 'Mixed',
      facadeType: 'Facade Type',
      brick: 'Brick',
      curtainWall: 'Curtain Wall',
      composite: 'Composite',
      hvacSystem: 'HVAC System',
      central: 'Central',
      split: 'Split',
      vrf: 'VRF',
      calculate: 'Calculate',
      previous: 'Previous',
      next: 'Next'
    }
  };

  const t = texts[language];

  const cities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 
    'Gaziantep', 'Konya', 'Kayseri', 'Trabzon'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(basics, specs);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('basics')}
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'basics'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Building className="w-4 h-4 mr-2" />
          {t.projectBasics}
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'specs'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          {t.technicalSpecs}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Project Basics Tab */}
        {activeTab === 'basics' && (
          <div className="space-y-6">
            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.city}
                </label>
                <select
                  value={basics.location.city}
                  onChange={(e) => setBasics({
                    ...basics,
                    location: { ...basics.location, city: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t.city}</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.district}
                </label>
                <input
                  type="text"
                  value={basics.location.district}
                  onChange={(e) => setBasics({
                    ...basics,
                    location: { ...basics.location, district: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Area and Building Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.totalArea}
                </label>
                <input
                  type="number"
                  value={basics.area || ''}
                  onChange={(e) => setBasics({ ...basics, area: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.buildingType}
                </label>
                <select
                  value={basics.buildingType}
                  onChange={(e) => setBasics({ ...basics, buildingType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="residential">{t.residential}</option>
                  <option value="commercial">{t.commercial}</option>
                  <option value="industrial">{t.industrial}</option>
                </select>
              </div>
            </div>

            {/* Quality Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.qualityLevel}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['economic', 'standard', 'luxury'] as const).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setBasics({ ...basics, qualityLevel: level })}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      basics.qualityLevel === level
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{t[level]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.startDate}
                </label>
                <input
                  type="date"
                  value={basics.startDate}
                  onChange={(e) => setBasics({ ...basics, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.completionDate}
                </label>
                <input
                  type="date"
                  value={basics.completionDate}
                  onChange={(e) => setBasics({ ...basics, completionDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.specialRequirements}
              </label>
              <textarea
                value={basics.specialRequirements}
                onChange={(e) => setBasics({ ...basics, specialRequirements: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.next}
              </button>
            </div>
          </div>
        )}

        {/* Technical Specifications Tab */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            {/* Floors and Foundation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.floors}
                </label>
                <input
                  type="number"
                  value={specs.floors}
                  onChange={(e) => setSpecs({ ...specs, floors: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.foundationType}
                </label>
                <select
                  value={specs.foundationType}
                  onChange={(e) => setSpecs({ ...specs, foundationType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="shallow">{t.shallow}</option>
                  <option value="deep">{t.deep}</option>
                  <option value="pile">{t.pile}</option>
                </select>
              </div>
            </div>

            {/* Structural and Facade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.structuralSystem}
                </label>
                <select
                  value={specs.structuralSystem}
                  onChange={(e) => setSpecs({ ...specs, structuralSystem: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="concrete">{t.concrete}</option>
                  <option value="steel">{t.steel}</option>
                  <option value="mixed">{t.mixed}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.facadeType}
                </label>
                <select
                  value={specs.facadeType}
                  onChange={(e) => setSpecs({ ...specs, facadeType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="brick">{t.brick}</option>
                  <option value="curtain-wall">{t.curtainWall}</option>
                  <option value="composite">{t.composite}</option>
                </select>
              </div>
            </div>

            {/* HVAC System */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.hvacSystem}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['central', 'split', 'vrf'] as const).map(system => (
                  <button
                    key={system}
                    type="button"
                    onClick={() => setSpecs({ ...specs, hvacSystem: system })}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      specs.hvacSystem === system
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{t[system]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('basics')}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t.previous}
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {t.calculate}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProjectForm;