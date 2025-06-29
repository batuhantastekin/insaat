import React, { useState } from 'react';
import { CreditCard, Building, Users, Award, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { ProjectScenario, FinancingOption } from '../types';
import { formatCurrency } from '../utils/calculations';

interface FinancingOptionsProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const FinancingOptions: React.FC<FinancingOptionsProps> = ({ scenario, language }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const texts = {
    tr: {
      financingOptions: 'Finansman Seçenekleri',
      bankLoan: 'Banka Kredisi',
      constructionLoan: 'İnşaat Kredisi',
      equity: 'Öz Kaynak',
      governmentIncentive: 'Devlet Teşviki',
      privateInvestor: 'Özel Yatırımcı',
      amount: 'Tutar',
      interestRate: 'Faiz Oranı',
      term: 'Vade',
      monthlyPayment: 'Aylık Ödeme',
      totalInterest: 'Toplam Faiz',
      processingTime: 'İşlem Süresi',
      requirements: 'Gereksinimler',
      advantages: 'Avantajlar',
      disadvantages: 'Dezavantajlar',
      fees: 'Ücretler',
      application: 'Başvuru',
      processing: 'İşlem',
      insurance: 'Sigorta',
      other: 'Diğer',
      collateral: 'Teminat',
      eligibility: 'Uygunluk Kriterleri',
      compare: 'Karşılaştır',
      recommended: 'Önerilen',
      selectOption: 'Seçeneği Seç',
      comparison: 'Karşılaştırma',
      totalCost: 'Toplam Maliyet'
    },
    en: {
      financingOptions: 'Financing Options',
      bankLoan: 'Bank Loan',
      constructionLoan: 'Construction Loan',
      equity: 'Equity',
      governmentIncentive: 'Government Incentive',
      privateInvestor: 'Private Investor',
      amount: 'Amount',
      interestRate: 'Interest Rate',
      term: 'Term',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      processingTime: 'Processing Time',
      requirements: 'Requirements',
      advantages: 'Advantages',
      disadvantages: 'Disadvantages',
      fees: 'Fees',
      application: 'Application',
      processing: 'Processing',
      insurance: 'Insurance',
      other: 'Other',
      collateral: 'Collateral',
      eligibility: 'Eligibility Criteria',
      compare: 'Compare',
      recommended: 'Recommended',
      selectOption: 'Select Option',
      comparison: 'Comparison',
      totalCost: 'Total Cost'
    }
  };

  const t = texts[language];

  const generateFinancingOptions = (): FinancingOption[] => {
    const projectCost = scenario.costs.total;
    const loanAmount = projectCost * 0.7; // 70% financing

    return [
      {
        id: 'bank-loan-1',
        type: 'bank-loan',
        name: language === 'tr' ? 'Ziraat Bankası İnşaat Kredisi' : 'Ziraat Bank Construction Loan',
        provider: 'Ziraat Bankası',
        amount: loanAmount,
        interestRate: 2.89,
        term: 120, // 10 years
        monthlyPayment: (loanAmount * 0.0289 * Math.pow(1.0289, 120)) / (Math.pow(1.0289, 120) - 1),
        totalInterest: 0,
        requirements: language === 'tr' 
          ? ['Gelir belgesi', 'Tapu senedi', 'İnşaat ruhsatı', 'Proje dosyası']
          : ['Income statement', 'Title deed', 'Building permit', 'Project file'],
        advantages: language === 'tr'
          ? ['Düşük faiz oranı', 'Uzun vade', 'Devlet bankası güvencesi']
          : ['Low interest rate', 'Long term', 'State bank guarantee'],
        disadvantages: language === 'tr'
          ? ['Uzun onay süreci', 'Yüksek teminat gereksinimi']
          : ['Long approval process', 'High collateral requirement'],
        processingTime: language === 'tr' ? '15-30 gün' : '15-30 days',
        fees: {
          application: 2500,
          processing: 5000,
          insurance: loanAmount * 0.005,
          other: 1500
        },
        collateral: language === 'tr' ? 'Tapu + İpotek' : 'Title deed + Mortgage',
        eligibility: language === 'tr'
          ? ['Türk vatandaşı', 'Düzenli gelir', 'Kredi notu 1200+']
          : ['Turkish citizen', 'Regular income', 'Credit score 1200+']
      },
      {
        id: 'construction-loan-1',
        type: 'construction-loan',
        name: language === 'tr' ? 'İş Bankası Yapı Kredisi' : 'İş Bank Construction Loan',
        provider: 'Türkiye İş Bankası',
        amount: loanAmount,
        interestRate: 3.15,
        term: 60, // 5 years
        monthlyPayment: (loanAmount * 0.0315 * Math.pow(1.0315, 60)) / (Math.pow(1.0315, 60) - 1),
        totalInterest: 0,
        requirements: language === 'tr'
          ? ['Proje onayı', 'Müteahhit sözleşmesi', 'Gelir belgesi']
          : ['Project approval', 'Contractor agreement', 'Income statement'],
        advantages: language === 'tr'
          ? ['Hızlı onay', 'Esnek ödeme', 'Kademeli kullanım']
          : ['Fast approval', 'Flexible payment', 'Gradual disbursement'],
        disadvantages: language === 'tr'
          ? ['Yüksek faiz', 'Kısa vade']
          : ['Higher interest', 'Short term'],
        processingTime: language === 'tr' ? '7-15 gün' : '7-15 days',
        fees: {
          application: 3000,
          processing: 7500,
          insurance: loanAmount * 0.007,
          other: 2000
        },
        collateral: language === 'tr' ? 'Proje + Kefalet' : 'Project + Guarantee',
        eligibility: language === 'tr'
          ? ['Müteahhitlik belgesi', 'Deneyim belgesi', 'Mali durum']
          : ['Contractor license', 'Experience certificate', 'Financial status']
      },
      {
        id: 'government-incentive-1',
        type: 'government-incentive',
        name: language === 'tr' ? 'TOKİ Destekli Konut Kredisi' : 'TOKİ Supported Housing Loan',
        provider: 'TOKİ',
        amount: Math.min(loanAmount, 500000), // Max 500k TL
        interestRate: 0.99,
        term: 240, // 20 years
        monthlyPayment: (Math.min(loanAmount, 500000) * 0.0099 * Math.pow(1.0099, 240)) / (Math.pow(1.0099, 240) - 1),
        totalInterest: 0,
        requirements: language === 'tr'
          ? ['İlk konut', 'Gelir sınırı', 'Yaş sınırı']
          : ['First home', 'Income limit', 'Age limit'],
        advantages: language === 'tr'
          ? ['Çok düşük faiz', 'Uzun vade', 'Devlet desteği']
          : ['Very low interest', 'Long term', 'Government support'],
        disadvantages: language === 'tr'
          ? ['Sınırlı tutar', 'Katı kriterler', 'Uzun süreç']
          : ['Limited amount', 'Strict criteria', 'Long process'],
        processingTime: language === 'tr' ? '30-60 gün' : '30-60 days',
        fees: {
          application: 500,
          processing: 1000,
          insurance: 0,
          other: 500
        },
        collateral: language === 'tr' ? 'Konut ipoteği' : 'Housing mortgage',
        eligibility: language === 'tr'
          ? ['Gelir sınırı altında', 'İlk konut alımı', '18-65 yaş']
          : ['Below income limit', 'First home purchase', 'Age 18-65']
      },
      {
        id: 'private-investor-1',
        type: 'private-investor',
        name: language === 'tr' ? 'Özel Yatırımcı Ortaklığı' : 'Private Investor Partnership',
        provider: language === 'tr' ? 'Özel Yatırımcı' : 'Private Investor',
        amount: projectCost * 0.5, // 50% partnership
        interestRate: 0, // No interest, profit sharing
        term: 36, // 3 years
        monthlyPayment: 0, // No monthly payment
        totalInterest: 0,
        requirements: language === 'tr'
          ? ['İş planı', 'Proje sunumu', 'Kar paylaşım anlaşması']
          : ['Business plan', 'Project presentation', 'Profit sharing agreement'],
        advantages: language === 'tr'
          ? ['Faiz yok', 'Aylık ödeme yok', 'Risk paylaşımı']
          : ['No interest', 'No monthly payment', 'Risk sharing'],
        disadvantages: language === 'tr'
          ? ['Kar paylaşımı', 'Kontrol kaybı', 'Belirsizlik']
          : ['Profit sharing', 'Loss of control', 'Uncertainty'],
        processingTime: language === 'tr' ? '30-90 gün' : '30-90 days',
        fees: {
          application: 0,
          processing: 10000,
          insurance: 0,
          other: 5000
        },
        collateral: language === 'tr' ? 'Proje ortaklığı' : 'Project partnership',
        eligibility: language === 'tr'
          ? ['Güçlü proje', 'Deneyimli ekip', 'Karlılık potansiyeli']
          : ['Strong project', 'Experienced team', 'Profitability potential']
      }
    ];
  };

  const [financingOptions] = useState<FinancingOption[]>(generateFinancingOptions());

  // Calculate total interest for each option
  financingOptions.forEach(option => {
    if (option.monthlyPayment > 0) {
      option.totalInterest = (option.monthlyPayment * option.term) - option.amount;
    }
  });

  const toggleOptionSelection = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const getOptionIcon = (type: string) => {
    const icons = {
      'bank-loan': CreditCard,
      'construction-loan': Building,
      'government-incentive': Award,
      'private-investor': Users,
      'equity': DollarSign
    };
    return icons[type as keyof typeof icons] || CreditCard;
  };

  const getOptionColor = (type: string) => {
    const colors = {
      'bank-loan': 'bg-blue-50 border-blue-200 text-blue-800',
      'construction-loan': 'bg-green-50 border-green-200 text-green-800',
      'government-incentive': 'bg-purple-50 border-purple-200 text-purple-800',
      'private-investor': 'bg-orange-50 border-orange-200 text-orange-800',
      'equity': 'bg-gray-50 border-gray-200 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors['bank-loan'];
  };

  return (
    <div className="space-y-6">
      {/* Financing Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {financingOptions.map(option => {
          const Icon = getOptionIcon(option.type);
          const isSelected = selectedOptions.includes(option.id);
          const isRecommended = option.type === 'government-incentive';

          return (
            <div
              key={option.id}
              className={`border rounded-lg p-6 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isRecommended ? 'ring-2 ring-purple-200' : ''}`}
              onClick={() => toggleOptionSelection(option.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${getOptionColor(option.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{option.name}</h3>
                    <p className="text-sm text-gray-600">{option.provider}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isRecommended && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      {t.recommended}
                    </span>
                  )}
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">{t.amount}</div>
                  <div className="font-semibold">{formatCurrency(option.amount)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{t.interestRate}</div>
                  <div className="font-semibold">{option.interestRate}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{t.term}</div>
                  <div className="font-semibold">{option.term} ay</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{t.monthlyPayment}</div>
                  <div className="font-semibold">
                    {option.monthlyPayment > 0 ? formatCurrency(option.monthlyPayment) : 'Yok'}
                  </div>
                </div>
              </div>

              {/* Processing Time */}
              <div className="mb-4">
                <div className="text-sm text-gray-600">{t.processingTime}</div>
                <div className="font-medium">{option.processingTime}</div>
              </div>

              {/* Advantages & Disadvantages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-green-700 mb-2">{t.advantages}</div>
                  <ul className="text-xs text-green-600 space-y-1">
                    {option.advantages.map((advantage, index) => (
                      <li key={index}>• {advantage}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium text-red-700 mb-2">{t.disadvantages}</div>
                  <ul className="text-xs text-red-600 space-y-1">
                    {option.disadvantages.map((disadvantage, index) => (
                      <li key={index}>• {disadvantage}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fees */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">{t.fees}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>{t.application}:</span>
                    <span>{formatCurrency(option.fees.application)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.processing}:</span>
                    <span>{formatCurrency(option.fees.processing)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.insurance}:</span>
                    <span>{formatCurrency(option.fees.insurance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.other}:</span>
                    <span>{formatCurrency(option.fees.other)}</span>
                  </div>
                </div>
              </div>

              {/* Total Cost */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t.totalCost}:</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(option.amount + option.totalInterest + Object.values(option.fees).reduce((sum, fee) => sum + fee, 0))}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      {selectedOptions.length > 1 && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{t.comparison}</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">Seçenek</th>
                  <th className="text-right p-4 font-semibold">{t.amount}</th>
                  <th className="text-right p-4 font-semibold">{t.interestRate}</th>
                  <th className="text-right p-4 font-semibold">{t.monthlyPayment}</th>
                  <th className="text-right p-4 font-semibold">{t.totalInterest}</th>
                  <th className="text-right p-4 font-semibold">{t.totalCost}</th>
                </tr>
              </thead>
              <tbody>
                {financingOptions.filter(option => selectedOptions.includes(option.id)).map(option => (
                  <tr key={option.id} className="border-t border-gray-200">
                    <td className="p-4 font-medium">{option.name}</td>
                    <td className="p-4 text-right">{formatCurrency(option.amount)}</td>
                    <td className="p-4 text-right">{option.interestRate}%</td>
                    <td className="p-4 text-right">
                      {option.monthlyPayment > 0 ? formatCurrency(option.monthlyPayment) : 'Yok'}
                    </td>
                    <td className="p-4 text-right">{formatCurrency(option.totalInterest)}</td>
                    <td className="p-4 text-right font-medium">
                      {formatCurrency(option.amount + option.totalInterest + Object.values(option.fees).reduce((sum, fee) => sum + fee, 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Finansman Önerileri
        </h4>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• TOKİ destekli kredi en düşük maliyetli seçenektir (%0.99 faiz)</p>
          <p>• Birden fazla finansman kaynağını kombine edebilirsiniz</p>
          <p>• Öz kaynak oranını artırmak toplam maliyeti düşürür</p>
          <p>• Kredi başvurusu öncesi tüm belgeleri hazırlayın</p>
          <p>• Faiz oranları değişken olabilir, sabit faiz seçeneklerini değerlendirin</p>
        </div>
      </div>
    </div>
  );
};

export default FinancingOptions;