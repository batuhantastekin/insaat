import React, { useState, useEffect } from 'react';
import { Calculator, FileText, AlertCircle, DollarSign } from 'lucide-react';
import { ProjectScenario, TaxCalculation } from '../types';
import { formatCurrency } from '../utils/calculations';

interface TaxCalculatorProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ scenario, language }) => {
  const [taxInputs, setTaxInputs] = useState({
    landValue: scenario.costs.total * 0.3, // 30% land value assumption
    constructionValue: scenario.costs.total * 0.7, // 70% construction value
    salePrice: scenario.costs.total * 1.4, // 40% markup
    isFirstHome: false,
    isCommercial: scenario.basics.buildingType === 'commercial',
    holdingPeriod: 2 // years
  });

  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(null);

  const texts = {
    tr: {
      taxCalculator: 'Vergi Hesaplayıcısı',
      landValue: 'Arsa Değeri (TL)',
      constructionValue: 'İnşaat Değeri (TL)',
      salePrice: 'Satış Fiyatı (TL)',
      isFirstHome: 'İlk Konut',
      isCommercial: 'Ticari Gayrimenkul',
      holdingPeriod: 'Elde Tutma Süresi (Yıl)',
      calculate: 'Hesapla',
      results: 'Vergi Hesaplama Sonuçları',
      totalValue: 'Toplam Değer',
      kdv: 'KDV (%18)',
      harçlar: 'Harçlar',
      emlakVergisi: 'Emlak Vergisi',
      gelirVergisi: 'Gelir Vergisi',
      kurumlarVergisi: 'Kurumlar Vergisi',
      totalTaxes: 'Toplam Vergiler',
      netProfit: 'Net Kar',
      taxBreakdown: 'Vergi Dökümü',
      taxOptimization: 'Vergi Optimizasyonu',
      recommendations: 'Öneriler',
      exemptions: 'Muafiyetler',
      deductions: 'İndirimler'
    },
    en: {
      taxCalculator: 'Tax Calculator',
      landValue: 'Land Value (TL)',
      constructionValue: 'Construction Value (TL)',
      salePrice: 'Sale Price (TL)',
      isFirstHome: 'First Home',
      isCommercial: 'Commercial Property',
      holdingPeriod: 'Holding Period (Years)',
      calculate: 'Calculate',
      results: 'Tax Calculation Results',
      totalValue: 'Total Value',
      kdv: 'VAT (18%)',
      harçlar: 'Fees',
      emlakVergisi: 'Property Tax',
      gelirVergisi: 'Income Tax',
      kurumlarVergisi: 'Corporate Tax',
      totalTaxes: 'Total Taxes',
      netProfit: 'Net Profit',
      taxBreakdown: 'Tax Breakdown',
      taxOptimization: 'Tax Optimization',
      recommendations: 'Recommendations',
      exemptions: 'Exemptions',
      deductions: 'Deductions'
    }
  };

  const t = texts[language];

  useEffect(() => {
    calculateTaxes();
  }, [taxInputs, scenario]);

  const calculateTaxes = () => {
    const { landValue, constructionValue, salePrice, isFirstHome, isCommercial, holdingPeriod } = taxInputs;
    const totalValue = landValue + constructionValue;
    
    // KDV Calculation (18% for construction, land is exempt)
    let kdv = 0;
    if (isCommercial) {
      kdv = constructionValue * 0.18; // 18% VAT for commercial properties
    } else if (!isFirstHome) {
      kdv = constructionValue * 0.18; // 18% VAT for non-first homes
    }
    // First homes are exempt from VAT
    
    // Harçlar (Fees) - approximately 4% of property value
    const harçlar = totalValue * 0.04;
    
    // Emlak Vergisi (Property Tax) - annual, varies by location and type
    const emlakVergisiRate = isCommercial ? 0.002 : 0.001; // 0.2% commercial, 0.1% residential
    const emlakVergisi = totalValue * emlakVergisiRate;
    
    // Capital Gains Tax
    const capitalGain = salePrice - totalValue;
    let gelirVergisi = 0;
    let kurumlarVergisi = 0;
    
    if (capitalGain > 0) {
      if (isCommercial) {
        // Corporate tax for commercial properties
        kurumlarVergisi = capitalGain * 0.25; // 25% corporate tax
      } else {
        // Personal income tax for residential properties
        if (holdingPeriod >= 5) {
          // Exempt from capital gains tax if held for 5+ years
          gelirVergisi = 0;
        } else {
          // Progressive tax rates based on holding period
          const taxRate = holdingPeriod >= 2 ? 0.15 : 0.20; // 15% if held 2+ years, 20% otherwise
          gelirVergisi = capitalGain * taxRate;
        }
      }
    }
    
    const totalTaxes = kdv + harçlar + emlakVergisi + gelirVergisi + kurumlarVergisi;
    const netProfit = salePrice - totalValue - totalTaxes;
    
    setTaxCalculation({
      constructionValue,
      landValue,
      totalValue,
      kdv,
      harçlar,
      emlakVergisi,
      gelirVergisi,
      kurumlarVergisi,
      totalTaxes,
      netProfit
    });
  };

  const handleInputChange = (field: string, value: number | boolean) => {
    setTaxInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTaxEfficiency = () => {
    if (!taxCalculation) return { rating: 'Orta', color: 'text-yellow-600' };
    
    const taxRate = (taxCalculation.totalTaxes / taxCalculation.totalValue) * 100;
    
    if (taxRate < 10) return { rating: 'Çok İyi', color: 'text-green-600' };
    if (taxRate < 20) return { rating: 'İyi', color: 'text-blue-600' };
    if (taxRate < 30) return { rating: 'Orta', color: 'text-yellow-600' };
    return { rating: 'Yüksek', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          {t.taxCalculator}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.landValue}
            </label>
            <input
              type="number"
              value={taxInputs.landValue}
              onChange={(e) => handleInputChange('landValue', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.constructionValue}
            </label>
            <input
              type="number"
              value={taxInputs.constructionValue}
              onChange={(e) => handleInputChange('constructionValue', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.salePrice}
            </label>
            <input
              type="number"
              value={taxInputs.salePrice}
              onChange={(e) => handleInputChange('salePrice', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.holdingPeriod}
            </label>
            <input
              type="number"
              value={taxInputs.holdingPeriod}
              onChange={(e) => handleInputChange('holdingPeriod', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
              max="20"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={taxInputs.isFirstHome}
                onChange={(e) => handleInputChange('isFirstHome', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">{t.isFirstHome}</span>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={taxInputs.isCommercial}
                onChange={(e) => handleInputChange('isCommercial', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">{t.isCommercial}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results */}
      {taxCalculation && (
        <>
          {/* Tax Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">{t.totalValue}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(taxCalculation.totalValue)}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium text-red-800">{t.totalTaxes}</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(taxCalculation.totalTaxes)}
              </div>
              <div className="text-sm text-red-700">
                {((taxCalculation.totalTaxes / taxCalculation.totalValue) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">{t.netProfit}</span>
              </div>
              <div className={`text-2xl font-bold ${taxCalculation.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(taxCalculation.netProfit)}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-800">Vergi Yükü</span>
              </div>
              <div className={`text-2xl font-bold ${getTaxEfficiency().color}`}>
                {getTaxEfficiency().rating}
              </div>
              <div className="text-sm text-purple-700">
                {((taxCalculation.totalTaxes / taxCalculation.totalValue) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Detailed Tax Breakdown */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t.taxBreakdown}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">KDV (%18):</span>
                  <span className="font-semibold">{formatCurrency(taxCalculation.kdv)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Harçlar (%4):</span>
                  <span className="font-semibold">{formatCurrency(taxCalculation.harçlar)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Emlak Vergisi:</span>
                  <span className="font-semibold">{formatCurrency(taxCalculation.emlakVergisi)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Gelir Vergisi:</span>
                  <span className="font-semibold">{formatCurrency(taxCalculation.gelirVergisi)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Kurumlar Vergisi:</span>
                  <span className="font-semibold">{formatCurrency(taxCalculation.kurumlarVergisi)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-bold text-blue-800">Toplam Vergiler:</span>
                  <span className="font-bold text-blue-800">{formatCurrency(taxCalculation.totalTaxes)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Exemptions */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3">{t.exemptions}</h4>
              <div className="space-y-2 text-sm text-green-700">
                <p>• İlk konut alımında KDV muafiyeti</p>
                <p>• 5 yıl elde tutma sonrası sermaye kazancı vergisi muafiyeti</p>
                <p>• Konut kredisi faiz indirimi (gelir vergisinden)</p>
                <p>• Engelli bireylere yönelik emlak vergisi indirimi</p>
                <p>• Yaşlılık aylığı alanlar için emlak vergisi muafiyeti</p>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">{t.deductions}</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• İnşaat maliyetleri (malzeme, işçilik)</p>
                <p>• Proje ve ruhsat giderleri</p>
                <p>• Finansman maliyetleri (kredi faizleri)</p>
                <p>• Sigorta primleri</p>
                <p>• Emlak komisyon giderleri</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {t.recommendations}
            </h4>
            <div className="space-y-2 text-sm text-yellow-700">
              {taxInputs.isFirstHome && <p>• İlk konut avantajından yararlanıyorsunuz - KDV muafiyeti</p>}
              {taxInputs.holdingPeriod < 5 && <p>• 5 yıl elde tutarak sermaye kazancı vergisinden muaf olabilirsiniz</p>}
              {taxCalculation.kdv > 0 && <p>• KDV iadesi için gerekli belgeleri saklayın</p>}
              <p>• Tüm inşaat giderlerini belgelendirin (vergi indirimi için)</p>
              <p>• Emlak vergisi ödemelerini zamanında yapın (gecikme faizi)</p>
              <p>• Vergi danışmanından profesyonel destek alın</p>
              <p>• Belediye vergi borcu sorgulama yapın</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaxCalculator;