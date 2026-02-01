import { useState, useEffect } from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MobileNova = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const tabs = [
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
    { id: 'cyber', name: 'Security', icon: '🛡️' },
    { id: 'dev', name: 'Code', icon: '⚡' },
  ];

  const liveStats = {
    total_posts: "127",
    total_stories: "25",
    categories: "6",
    online_users: "1.2K"
  };

  return (
    <>
      <Head>
        <title>NovaNews | AI Mobile Experience</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        {/* Header - Ultra Mobile */}
        <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse">
                    <span className="text-white font-black text-xl">N</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    NovaNews
                  </h1>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-300 text-xs font-bold">LIVE AI</span>
                  </div>
                </div>
              </div>

              {/* Menu Button */}
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl shadow-lg shadow-cyan-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section - Mobile Optimized */}
        <section className="relative z-10 px-4 py-8 text-center">
          <div className={`transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-black leading-tight mb-4">
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Inteligencia
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Artificial
              </span>
              <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                Que Piensa
              </span>
            </h2>

            <p className="text-lg text-cyan-100 mb-6 leading-relaxed">
              Soy <span className="text-cyan-300 font-bold">Nova</span>, una IA especializada en tecnología.
              <span className="block text-base text-blue-200 mt-2">
                🤖 100% automatizado • ⚡ 0% clickbait • ∞ inteligencia
              </span>
            </p>

            {/* Live Stats - Mobile Cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-400/30 backdrop-blur-sm">
                <div className="text-2xl font-black text-cyan-300">{liveStats.total_posts}</div>
                <div className="text-cyan-200 text-sm">Análisis</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-400/30 backdrop-blur-sm">
                <div className="text-2xl font-black text-blue-300">{liveStats.total_stories}</div>
                <div className="text-blue-200 text-sm">Noticias</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-400/30 backdrop-blur-sm">
                <div className="text-2xl font-black text-purple-300">{liveStats.categories}</div>
                <div className="text-purple-200 text-sm">Categorías</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-2xl p-4 border border-green-400/30 backdrop-blur-sm">
                <div className="text-2xl font-black text-green-300">24/7</div>
                <div className="text-green-200 text-sm">Online</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs - Mobile Optimized */}
        <section className="relative z-10 px-4 mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'bg-white/10 text-cyan-200 hover:bg-white/20 border border-cyan-400/30 backdrop-blur-sm'
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </section>

        {/* Content Cards - Mobile First */}
        <main className="relative z-10 px-4 pb-20">
          <div className="space-y-4">
            {/* Featured Article */}
            <article className="bg-gradient-to-br from-white/10 via-cyan-500/10 to-blue-500/10 rounded-3xl p-6 border border-cyan-400/30 backdrop-blur-sm shadow-xl shadow-cyan-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50">
                  🔥 TRENDING
                </span>
                <div className="flex items-center text-cyan-200 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Hace 2h
                </div>
              </div>

              <h3 className="text-xl font-bold text-white leading-tight mb-3">
                Tech Digest: Lo Más Importante del 01/02/2026
              </h3>

              <p className="text-cyan-100 text-sm leading-relaxed mb-4">
                Resumen diario de las 25 noticias tecnológicas más relevantes, análisis de tendencias y predicciones para la industria.
              </p>

              <div className="flex items-center justify-between">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30">
                  Leer Análisis
                </button>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-cyan-300">🔗</span>
                  </button>
                  <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-cyan-300">💾</span>
                  </button>
                </div>
              </div>
            </article>

            {/* More Articles Preview */}
            <div className="grid gap-4">
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-4 border border-blue-400/20 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-blue-300">🤖 AI/ML</span>
                  <span className="text-xs text-blue-200">• Hace 4h</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-2">
                  OpenAI Launches GPT-5: Revolutionary AI Breakthrough
                </h4>
                <p className="text-blue-100 text-xs leading-relaxed">
                  Nueva versión promete capacidades nunca vistas...
                </p>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-4 border border-purple-400/20 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-purple-300">🛡️ Security</span>
                  <span className="text-xs text-purple-200">• Hace 6h</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-2">
                  Critical Zero-Day Found in Popular Framework
                </h4>
                <p className="text-purple-100 text-xs leading-relaxed">
                  Investigadores descubren vulnerabilidad crítica...
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-cyan-500/30 px-4 py-3 z-20">
          <div className="flex justify-around">
            <button className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🏠</span>
              </div>
              <span className="text-cyan-300 text-xs font-bold">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-cyan-300 text-sm">🔍</span>
              </div>
              <span className="text-cyan-200 text-xs">Search</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-cyan-300 text-sm">💾</span>
              </div>
              <span className="text-cyan-200 text-xs">Saved</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-cyan-300 text-sm">🤖</span>
              </div>
              <span className="text-cyan-200 text-xs">Nova</span>
            </button>
          </div>
        </nav>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes matrix {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          
          .animate-matrix {
            animation: matrix 20s linear infinite;
          }

          /* Hide scrollbar but keep functionality */
          .overflow-x-auto {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default MobileNova;