import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Shield, Users, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
  language: 'tr' | 'en';
}

const LoginForm: React.FC<LoginFormProps> = ({ language }) => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const texts = {
    tr: {
      welcome: 'Hoş Geldiniz',
      subtitle: 'Türkiye İnşaat Maliyet Analisti',
      description: 'Hesabınıza giriş yaparak proje yönetimi araçlarına erişin',
      email: 'E-posta Adresi',
      password: 'Şifre',
      rememberMe: 'Beni Hatırla',
      signIn: 'Giriş Yap',
      forgotPassword: 'Şifremi Unuttum',
      demoAccounts: 'Demo Hesapları',
      admin: 'Yönetici',
      projectManager: 'Proje Müdürü',
      engineer: 'Mühendis',
      contractor: 'Müteahhit',
      allPasswordsAre: 'Tüm şifreler: password',
      features: 'Özellikler',
      feature1: 'Kapsamlı proje yönetimi',
      feature2: 'Gerçek zamanlı maliyet analizi',
      feature3: 'Çok kullanıcılı işbirliği',
      feature4: 'Detaylı raporlama'
    },
    en: {
      welcome: 'Welcome',
      subtitle: 'Turkish Construction Cost Analyst',
      description: 'Sign in to your account to access project management tools',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember Me',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password',
      demoAccounts: 'Demo Accounts',
      admin: 'Admin',
      projectManager: 'Project Manager',
      engineer: 'Engineer',
      contractor: 'Contractor',
      allPasswordsAre: 'All passwords: password',
      features: 'Features',
      feature1: 'Comprehensive project management',
      feature2: 'Real-time cost analysis',
      feature3: 'Multi-user collaboration',
      feature4: 'Detailed reporting'
    }
  };

  const t = texts[language];

  const demoAccounts = [
    { email: 'admin@company.com', role: t.admin, icon: Shield },
    { email: 'pm@company.com', role: t.projectManager, icon: Users },
    { email: 'engineer@company.com', role: t.engineer, icon: Building },
    { email: 'contractor@company.com', role: t.contractor, icon: Building }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.welcome}</h1>
            <h2 className="text-xl text-gray-600 mb-2">{t.subtitle}</h2>
            <p className="text-gray-500">{t.description}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="ornek@sirket.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{t.rememberMe}</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {t.forgotPassword}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  {t.signIn}
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">{t.demoAccounts}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account, index) => {
                const Icon = account.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleDemoLogin(account.email)}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 mr-2 text-gray-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.role}</div>
                      <div className="text-xs text-gray-500">{account.email}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">{t.allPasswordsAre}</p>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-green-600 p-8 items-center justify-center">
        <div className="max-w-md text-white">
          <h3 className="text-2xl font-bold mb-6">{t.features}</h3>
          <div className="space-y-4">
            {[t.feature1, t.feature2, t.feature3, t.feature4].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold mb-2">Türkiye'nin En Kapsamlı</h4>
            <p className="text-white/90">İnşaat maliyet analizi ve proje yönetimi platformu. Gerçek zamanlı veriler, detaylı raporlar ve çok kullanıcılı işbirliği özellikleri.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;