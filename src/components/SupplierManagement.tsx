import React, { useState } from 'react';
import { Plus, Search, Filter, Star, MapPin, Phone, Mail, Award } from 'lucide-react';
import { ProjectScenario, Supplier } from '../types';
import { formatCurrency } from '../utils/calculations';

interface SupplierManagementProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const SupplierManagement: React.FC<SupplierManagementProps> = ({ scenario, language }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const texts = {
    tr: {
      supplierManagement: 'Tedarikçi Yönetimi',
      addSupplier: 'Yeni Tedarikçi Ekle',
      searchSuppliers: 'Tedarikçi Ara...',
      filterByCategory: 'Kategoriye Göre Filtrele',
      all: 'Tümü',
      materials: 'Malzemeler',
      labor: 'İşçilik',
      equipment: 'Ekipman',
      services: 'Hizmetler',
      supplierName: 'Tedarikçi Adı',
      category: 'Kategori',
      rating: 'Değerlendirme',
      experience: 'Deneyim',
      capacity: 'Kapasite',
      status: 'Durum',
      contact: 'İletişim',
      active: 'Aktif',
      inactive: 'Pasif',
      pendingApproval: 'Onay Bekliyor',
      blacklisted: 'Kara Liste',
      years: 'yıl',
      viewDetails: 'Detayları Görüntüle',
      editSupplier: 'Tedarikçiyi Düzenle',
      supplierDetails: 'Tedarikçi Detayları',
      companyInfo: 'Şirket Bilgileri',
      performanceMetrics: 'Performans Metrikleri',
      certifications: 'Sertifikalar',
      financialInfo: 'Mali Bilgiler',
      documents: 'Belgeler',
      specialization: 'Uzmanlık Alanları',
      overallRating: 'Genel Değerlendirme',
      qualityRating: 'Kalite',
      deliveryRating: 'Teslimat',
      priceRating: 'Fiyat',
      serviceRating: 'Hizmet',
      completedProjects: 'Tamamlanan Projeler',
      onTimeDelivery: 'Zamanında Teslimat',
      customerSatisfaction: 'Müşteri Memnuniyeti',
      maxProjectValue: 'Maksimum Proje Değeri',
      simultaneousProjects: 'Eş Zamanlı Proje Sayısı',
      geographicCoverage: 'Coğrafi Kapsam',
      annualRevenue: 'Yıllık Ciro',
      creditRating: 'Kredi Notu',
      paymentTerms: 'Ödeme Koşulları',
      insuranceCoverage: 'Sigorta Kapsamı'
    },
    en: {
      supplierManagement: 'Supplier Management',
      addSupplier: 'Add New Supplier',
      searchSuppliers: 'Search Suppliers...',
      filterByCategory: 'Filter by Category',
      all: 'All',
      materials: 'Materials',
      labor: 'Labor',
      equipment: 'Equipment',
      services: 'Services',
      supplierName: 'Supplier Name',
      category: 'Category',
      rating: 'Rating',
      experience: 'Experience',
      capacity: 'Capacity',
      status: 'Status',
      contact: 'Contact',
      active: 'Active',
      inactive: 'Inactive',
      pendingApproval: 'Pending Approval',
      blacklisted: 'Blacklisted',
      years: 'years',
      viewDetails: 'View Details',
      editSupplier: 'Edit Supplier',
      supplierDetails: 'Supplier Details',
      companyInfo: 'Company Information',
      performanceMetrics: 'Performance Metrics',
      certifications: 'Certifications',
      financialInfo: 'Financial Information',
      documents: 'Documents',
      specialization: 'Specialization',
      overallRating: 'Overall Rating',
      qualityRating: 'Quality',
      deliveryRating: 'Delivery',
      priceRating: 'Price',
      serviceRating: 'Service',
      completedProjects: 'Completed Projects',
      onTimeDelivery: 'On-Time Delivery',
      customerSatisfaction: 'Customer Satisfaction',
      maxProjectValue: 'Max Project Value',
      simultaneousProjects: 'Simultaneous Projects',
      geographicCoverage: 'Geographic Coverage',
      annualRevenue: 'Annual Revenue',
      creditRating: 'Credit Rating',
      paymentTerms: 'Payment Terms',
      insuranceCoverage: 'Insurance Coverage'
    }
  };

  const t = texts[language];

  // Generate sample suppliers
  React.useEffect(() => {
    const sampleSuppliers: Supplier[] = [
      {
        id: 'supplier-1',
        name: 'Mehmet Yılmaz',
        companyName: 'Yılmaz İnşaat Malzemeleri A.Ş.',
        category: 'materials',
        specialization: ['Beton', 'Çelik', 'Tuğla'],
        contact: {
          email: 'mehmet@yilmazinsaat.com',
          phone: '+90 212 555 0101',
          address: 'Ataşehir, İstanbul',
          website: 'www.yilmazinsaat.com'
        },
        rating: {
          overall: 4.5,
          quality: 4.7,
          delivery: 4.2,
          price: 4.1,
          service: 4.8
        },
        certifications: ['ISO 9001', 'TSE', 'CE'],
        experience: 15,
        capacity: {
          maxProjectValue: 50000000,
          simultaneousProjects: 8,
          geographicCoverage: ['İstanbul', 'Ankara', 'İzmir']
        },
        financialInfo: {
          annualRevenue: 120000000,
          creditRating: 'AA',
          paymentTerms: '30 gün',
          insuranceCoverage: 10000000
        },
        performance: {
          completedProjects: 156,
          onTimeDelivery: 92,
          qualityScore: 4.5,
          customerSatisfaction: 4.6
        },
        documents: {
          taxCertificate: true,
          insurancePolicy: true,
          qualityCertificates: true,
          references: true
        },
        status: 'active',
        lastUpdated: '2025-01-15',
        createdAt: '2020-03-15'
      },
      {
        id: 'supplier-2',
        name: 'Fatma Demir',
        companyName: 'Demir Elektrik ve Tesisat Ltd.',
        category: 'services',
        specialization: ['Elektrik', 'Tesisat', 'HVAC'],
        contact: {
          email: 'fatma@demirelektrik.com',
          phone: '+90 312 555 0202',
          address: 'Çankaya, Ankara'
        },
        rating: {
          overall: 4.8,
          quality: 4.9,
          delivery: 4.7,
          price: 4.5,
          service: 4.9
        },
        certifications: ['ISO 14001', 'OHSAS 18001', 'Elektrik Yeterlilik'],
        experience: 12,
        capacity: {
          maxProjectValue: 25000000,
          simultaneousProjects: 5,
          geographicCoverage: ['Ankara', 'Konya', 'Kayseri']
        },
        financialInfo: {
          annualRevenue: 45000000,
          creditRating: 'A+',
          paymentTerms: '45 gün',
          insuranceCoverage: 5000000
        },
        performance: {
          completedProjects: 89,
          onTimeDelivery: 96,
          qualityScore: 4.8,
          customerSatisfaction: 4.9
        },
        documents: {
          taxCertificate: true,
          insurancePolicy: true,
          qualityCertificates: true,
          references: true
        },
        status: 'active',
        lastUpdated: '2025-01-14',
        createdAt: '2021-07-20'
      },
      {
        id: 'supplier-3',
        name: 'Ali Özkan',
        companyName: 'Özkan İş Makineleri Kiralama',
        category: 'equipment',
        specialization: ['Ekskavatör', 'Vinç', 'Beton Pompası'],
        contact: {
          email: 'ali@ozkanmakine.com',
          phone: '+90 232 555 0303',
          address: 'Bornova, İzmir'
        },
        rating: {
          overall: 4.2,
          quality: 4.0,
          delivery: 4.5,
          price: 4.3,
          service: 4.0
        },
        certifications: ['ISO 9001', 'Makine Güvenlik'],
        experience: 8,
        capacity: {
          maxProjectValue: 15000000,
          simultaneousProjects: 12,
          geographicCoverage: ['İzmir', 'Manisa', 'Aydın']
        },
        financialInfo: {
          annualRevenue: 28000000,
          creditRating: 'A',
          paymentTerms: '15 gün',
          insuranceCoverage: 8000000
        },
        performance: {
          completedProjects: 234,
          onTimeDelivery: 88,
          qualityScore: 4.2,
          customerSatisfaction: 4.1
        },
        documents: {
          taxCertificate: true,
          insurancePolicy: true,
          qualityCertificates: false,
          references: true
        },
        status: 'active',
        lastUpdated: '2025-01-13',
        createdAt: '2022-01-10'
      }
    ];
    setSuppliers(sampleSuppliers);
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || supplier.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'pending-approval': 'bg-yellow-100 text-yellow-800',
      'blacklisted': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors['active'];
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

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t.searchSuppliers}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">{t.all}</option>
              <option value="materials">{t.materials}</option>
              <option value="labor">{t.labor}</option>
              <option value="equipment">{t.equipment}</option>
              <option value="services">{t.services}</option>
            </select>
          </div>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {t.addSupplier}
        </button>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <div
            key={supplier.id}
            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedSupplier(supplier)}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                <p className="text-sm text-gray-600">{supplier.companyName}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                {t[supplier.status.replace('-', '') as keyof typeof t]}
              </span>
            </div>

            {/* Category and Rating */}
            <div className="flex justify-between items-center mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(supplier.category)}`}>
                {t[supplier.category]}
              </span>
              {renderStarRating(supplier.rating.overall)}
            </div>

            {/* Key Info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.experience}:</span>
                <span className="font-medium">{supplier.experience} {t.years}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.completedProjects}:</span>
                <span className="font-medium">{supplier.performance.completedProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.onTimeDelivery}:</span>
                <span className="font-medium">{supplier.performance.onTimeDelivery}%</span>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                {supplier.contact.address}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                {supplier.contact.phone}
              </div>
            </div>

            {/* Specialization */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {supplier.specialization.slice(0, 3).map((spec, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {spec}
                  </span>
                ))}
                {supplier.specialization.length > 3 && (
                  <span className="text-xs text-gray-500">+{supplier.specialization.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supplier Details Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSupplier.name}</h2>
                  <p className="text-gray-600">{selectedSupplier.companyName}</p>
                </div>
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t.companyInfo}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSupplier.contact.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSupplier.contact.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSupplier.contact.address}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t.specialization}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplier.specialization.map((spec, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t.certifications}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplier.certifications.map((cert, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance and Financial */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t.performanceMetrics}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t.overallRating}:</span>
                        {renderStarRating(selectedSupplier.rating.overall)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t.qualityRating}:</span>
                        {renderStarRating(selectedSupplier.rating.quality)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t.deliveryRating}:</span>
                        {renderStarRating(selectedSupplier.rating.delivery)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t.priceRating}:</span>
                        {renderStarRating(selectedSupplier.rating.price)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t.financialInfo}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.annualRevenue}:</span>
                        <span className="font-medium">{formatCurrency(selectedSupplier.financialInfo.annualRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.creditRating}:</span>
                        <span className="font-medium">{selectedSupplier.financialInfo.creditRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.paymentTerms}:</span>
                        <span className="font-medium">{selectedSupplier.financialInfo.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.insuranceCoverage}:</span>
                        <span className="font-medium">{formatCurrency(selectedSupplier.financialInfo.insuranceCoverage)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Kapasite Bilgileri</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.maxProjectValue}:</span>
                        <span className="font-medium">{formatCurrency(selectedSupplier.capacity.maxProjectValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.simultaneousProjects}:</span>
                        <span className="font-medium">{selectedSupplier.capacity.simultaneousProjects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.geographicCoverage}:</span>
                        <span className="font-medium">{selectedSupplier.capacity.geographicCoverage.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Kapat
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  {t.editSupplier}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;