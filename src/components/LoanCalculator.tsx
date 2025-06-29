import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { ProjectScenario, LoanCalculation, LoanPayment } from '../types';
import { formatCurrency } from '../utils/calculations';

interface LoanCalculatorProps {
  scenario: ProjectScenario;
  language: 'tr' | 'en';
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ scenario, language }) => {
  const [loanInputs, setLoanInputs] = useState({
    principal: scenario.costs.total * 0.7, // 70% of project cost
    interestRate: 2.89, // Annual interest rate
    term: 120 // months
  });

  const [loanCalculation, setLoanCalculation] = useState<LoanCalculation | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const texts = {
    tr: {
      loanCalculator: 'Kredi Hesaplayıcısı',
      principal: 'Ana Para (TL)',
      interestRate: 'Yıllık Faiz Oranı (%)',
      term: 'Vade (Ay)',
      calculate: 'Hesapla',
      results: 'Sonuçlar',
      monthlyPayment: 'Aylık Ödeme',
      totalPayment: 'Toplam Ödeme',
      totalInterest: 'Toplam Faiz',
      paymentSchedule: 'Ödeme Planı',
      showSchedule: 'Ödeme Planını Göster',
      hideSchedule: 'Ödeme Planını Gizle',
      month: 'Ay',
      payment: 'Ödeme',
      principalPayment: 'Ana Para',
      interestPayment: 'Faiz',
      remainingBalance: 'Kalan Bakiye',
      loanSummary: 'Kredi Özeti',
      interestToTotal: 'Faizin Toplam Ödemeye Oranı',
      averageMonthlyInterest: 'Ortalama Aylık Faiz',
      recommendations: 'Öneriler'
    },
    en: {
      loanCalculator: 'Loan Calculator',
      principal: 'Principal Amount (TL)',
      interestRate: 'Annual Interest Rate (%)',
      term: 'Term (Months)',
      calculate: 'Calculate',
      results: 'Results',
      monthlyPayment: 'Monthly Payment',
      totalPayment: 'Total Payment',
      totalInterest: 'Total Interest',
      paymentSchedule: 'Payment Schedule',
      showSchedule: 'Show Payment Schedule',
      hideSchedule: 'Hide Payment Schedule',
      month: 'Month',
      payment: 'Payment',
      principalPayment: 'Principal',
      interestPayment: 'Interest',
      remainingBalance: 'Remaining Balance',
      loanSummary: 'Loan Summary',
      interestToTotal: 'Interest to Total Payment Ratio',
      averageMonthlyInterest: 'Average Monthly Interest',
      recommendations: 'Recommendations'
    }
  };

  const t = texts[language];

  useEffect(() => {
    calculateLoan();
  }, [loanInputs]);

  const calculateLoan = () => {
    const { principal, interestRate, term } = loanInputs;
    const monthlyRate = interestRate / 100 / 12;
    
    if (monthlyRate === 0) {
      // Handle zero interest rate
      const monthlyPayment = principal / term;
      const totalPayment = principal;
      const totalInterest = 0;
      
      const paymentSchedule: LoanPayment[] = [];
      let balance = principal;
      
      for (let month = 1; month <= term; month++) {
        const principalPayment = monthlyPayment;
        const interestPayment = 0;
        balance -= principalPayment;
        
        paymentSchedule.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        });
      }
      
      setLoanCalculation({
        principal,
        interestRate,
        term,
        monthlyPayment,
        totalPayment,
        totalInterest,
        paymentSchedule
      });
      return;
    }
    
    // Calculate monthly payment using loan formula
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;
    
    // Generate payment schedule
    const paymentSchedule: LoanPayment[] = [];
    let balance = principal;
    
    for (let month = 1; month <= term; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      paymentSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    setLoanCalculation({
      principal,
      interestRate,
      term,
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentSchedule
    });
  };

  const handleInputChange = (field: string, value: number) => {
    setLoanInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          {t.loanCalculator}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.principal}
            </label>
            <input
              type="number"
              value={loanInputs.principal}
              onChange={(e) => handleInputChange('principal', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.interestRate}
            </label>
            <input
              type="number"
              value={loanInputs.interestRate}
              onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              step="0.01"
              min="0"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.term}
            </label>
            <input
              type="number"
              value={loanInputs.term}
              onChange={(e) => handleInputChange('term', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="1"
              max="360"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {loanCalculation && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">{t.monthlyPayment}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(loanCalculation.monthlyPayment)}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <TrendingDown className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">{t.totalPayment}</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(loanCalculation.totalPayment)}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium text-red-800">{t.totalInterest}</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(loanCalculation.totalInterest)}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Calculator className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-800">Faiz Oranı</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {loanCalculation.interestRate}%
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t.loanSummary}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ana Para:</span>
                  <span className="font-medium">{formatCurrency(loanCalculation.principal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vade:</span>
                  <span className="font-medium">{loanCalculation.term} ay ({Math.round(loanCalculation.term / 12)} yıl)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.interestToTotal}:</span>
                  <span className="font-medium">
                    {((loanCalculation.totalInterest / loanCalculation.totalPayment) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.averageMonthlyInterest}:</span>
                  <span className="font-medium">
                    {formatCurrency(loanCalculation.totalInterest / loanCalculation.term)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Toplam Geri Ödeme:</span>
                  <span className="font-medium">{formatCurrency(loanCalculation.totalPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aylık Gelir İhtiyacı:</span>
                  <span className="font-medium">
                    {formatCurrency(loanCalculation.monthlyPayment * 3)} (3x)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {showSchedule ? t.hideSchedule : t.showSchedule}
            </button>
          </div>

          {/* Payment Schedule Table */}
          {showSchedule && (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">{t.paymentSchedule}</h3>
              </div>
              
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="text-center p-3 font-semibold">{t.month}</th>
                      <th className="text-right p-3 font-semibold">{t.payment}</th>
                      <th className="text-right p-3 font-semibold">{t.principalPayment}</th>
                      <th className="text-right p-3 font-semibold">{t.interestPayment}</th>
                      <th className="text-right p-3 font-semibold">{t.remainingBalance}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanCalculation.paymentSchedule.map((payment, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3 text-center font-medium">{payment.month}</td>
                        <td className="p-3 text-right">{formatCurrency(payment.payment)}</td>
                        <td className="p-3 text-right text-blue-600">{formatCurrency(payment.principal)}</td>
                        <td className="p-3 text-right text-red-600">{formatCurrency(payment.interest)}</td>
                        <td className="p-3 text-right font-medium">{formatCurrency(payment.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">{t.recommendations}</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• Aylık gelirinizin en az {formatCurrency(loanCalculation.monthlyPayment * 3)} olması önerilir</p>
              <p>• Faiz oranları değişken ise sabit faiz seçeneğini değerlendirin</p>
              <p>• Erken ödeme yaparak toplam faiz maliyetini azaltabilirsiniz</p>
              <p>• Kredi sigortası maliyetlerini de hesaba katın</p>
              <p>• Birden fazla bankadan teklif alarak en uygun koşulları bulun</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoanCalculator;