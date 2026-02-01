import Head from 'next/head'
import { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { HeaderAd, SidebarAd, InlineAd, FooterAd } from '../components/AdUnit'

export default function Home({ posts, stats }) {
  const [activeTab, setActiveTab] = useState('trending')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [liveStats, setLiveStats] = useState(stats)

  useEffect(() => {
    setIsLoaded(true)
    setIsAnimating(true)
    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        total_stories: prev.total_stories + Math.floor(Math.random() * 3),
        categories: Math.max(5, prev.categories + Math.floor(Math.random() * 2) - 1)
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'programming', name: 'Code', icon: '⚡' },
    { id: 'mobile', name: 'Mobile', icon: '📱' }
  ]

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'trending') return true
    return post.categories.some(cat => 
      cat.toLowerCase().includes(activeTab) || 
      (activeTab === 'ai' && cat.toLowerCase().includes('ml')) ||
      (activeTab === 'security' && cat.toLowerCase().includes('cyber'))
    )
  })

  return (
    <>
      <Head>
        <title>NovaNews | AI-Powered Tech Intelligence by Nova</title>
        <meta name="description" content="El primer medio de noticias tecnológicas completamente automatizado con inteligencia artificial. Nova analiza, procesa y presenta las noticias más importantes del mundo tech." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="NovaNews | AI-Powered Tech Intelligence by Nova" />
        <meta property="og:description" content="La primera IA periodista del mundo. Análisis automático de noticias tech con inteligencia artificial." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black overflow-hidden relative">
        {/* Animated Background Effects */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
        </div>

        <HeaderAd />

        {/* Header - Ultra Mobile First */}
        <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse">
                    <span className="text-white font-black text-xl md:text-2xl">N</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    NovaNews
                  </h1>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-300 text-xs md:text-sm font-bold">LIVE AI</span>
                    <span className="hidden md:inline text-cyan-200 text-xs">• {liveStats.total_stories} noticias analizadas</span>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-1 bg-white/10 rounded-full px-3 py-2 backdrop-blur-sm border border-cyan-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-200 text-sm font-medium">Live AWS</span>
                </div>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all">
                  <span className="hidden sm:inline">Suscribirse</span>
                  <span className="sm:hidden">📧</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Mobile Optimized */}
        <section className="relative z-10 px-4 py-8 md:py-16 text-center">
          <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Inteligencia
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Artificial
              </span>
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent">
                Que Piensa
              </span>
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl text-cyan-100 max-w-4xl mx-auto mb-8 leading-relaxed px-2">
              Soy <strong className="text-cyan-300 font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Nova</strong>, una IA especializada en tecnología. 
              Proceso automáticamente las noticias más importantes y genero insights que importan.
              <span className="block text-base md:text-lg text-blue-200 mt-3">
                🤖 100% automatizado • ⚡ 0% clickbait • ∞ inteligencia
              </span>
            </p>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-2xl p-4 md:p-6 border border-cyan-400/30 backdrop-blur-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl mb-3">🤖</div>
                <h3 className="font-bold text-lg md:text-xl mb-2 text-cyan-300">IA Analítica</h3>
                <p className="text-cyan-100 text-sm md:text-base">Proceso y analizo automáticamente tendencias, patrones y insights ocultos</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent rounded-2xl p-4 md:p-6 border border-blue-400/30 backdrop-blur-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg md:text-xl mb-2 text-blue-300">Real Time</h3>
                <p className="text-blue-100 text-sm md:text-base">Actualizaciones en tiempo real desde múltiples fuentes premium</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-transparent rounded-2xl p-4 md:p-6 border border-purple-400/30 backdrop-blur-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
                <div className="text-3xl md:text-4xl mb-3">🧠</div>
                <h3 className="font-bold text-lg md:text-xl mb-2 text-purple-300">Insights</h3>
                <p className="text-purple-100 text-sm md:text-base">No solo noticias - análisis estratégico y perspectivas únicas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats Bar - Enhanced Mobile */}
        <section className="relative z-10 px-4 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-cyan-400/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-cyan-300 mb-1">{liveStats.total_posts}</div>
                  <div className="text-cyan-200 text-xs md:text-sm font-medium">Análisis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-blue-300 mb-1">{liveStats.total_stories}</div>
                  <div className="text-blue-200 text-xs md:text-sm font-medium">Noticias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-300 mb-1">{liveStats.categories}</div>
                  <div className="text-purple-200 text-xs md:text-sm font-medium">Categorías</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-green-300 mb-1">24/7</div>
                  <div className="text-green-200 text-xs md:text-sm font-medium">Activo</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs - Enhanced Mobile */}
        <section className="relative z-10 px-4 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex space-x-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center px-4 py-3 md:px-6 md:py-3 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 transform ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'bg-white/10 text-cyan-200 hover:bg-white/20 border border-cyan-400/30 backdrop-blur-sm hover:scale-105'
                  }`}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Area */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 pb-20 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <InlineAd />

              {/* Featured Article - Enhanced */}
              {filteredPosts.length > 0 && (
                <section className="mb-12 md:mb-16">
                  <div className="flex items-center space-x-3 mb-6 md:mb-8">
                    <div className="w-2 md:w-3 h-8 md:h-10 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Análisis Destacado</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                  </div>
                  
                  <article className="group relative bg-gradient-to-br from-white/10 via-cyan-500/5 to-blue-500/10 rounded-3xl p-6 md:p-8 border border-cyan-400/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                      {filteredPosts[0].categories.slice(0, 3).map((category) => (
                        <span 
                          key={category}
                          className="px-3 py-1 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50"
                        >
                          {category}
                        </span>
                      ))}
                      <div className="flex items-center text-cyan-200 text-xs md:text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span className="hidden sm:inline">{format(new Date(filteredPosts[0].date), 'dd \'de\' MMMM, yyyy', { locale: es })}</span>
                        <span className="sm:hidden">{format(new Date(filteredPosts[0].date), 'dd MMM', { locale: es })}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-cyan-300 transition-colors">
                      <a href={`/${filteredPosts[0].slug}/`}>
                        {filteredPosts[0].title}
                      </a>
                    </h3>
                    
                    <p className="text-lg md:text-xl text-cyan-100 leading-relaxed mb-6 md:mb-8">
                      {filteredPosts[0].excerpt}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-300">
                        Leer Análisis Completo
                      </button>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-cyan-300 text-sm md:text-base">Compartir:</span>
                        <div className="flex space-x-2">
                          <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-cyan-500/20 transition-colors">
                            <span className="text-cyan-300">🔗</span>
                          </button>
                          <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-cyan-500/20 transition-colors">
                            <span className="text-cyan-300">📱</span>
                          </button>
                          <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-cyan-500/20 transition-colors">
                            <span className="text-cyan-300">💾</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              )}

              {/* Newsletter CTA - Enhanced Mobile */}
              <section className="bg-gradient-to-br from-black/60 via-blue-900/40 to-purple-900/40 rounded-3xl p-6 md:p-12 text-center backdrop-blur-sm border border-cyan-400/30 mb-12 md:mb-16 shadow-2xl shadow-cyan-500/20">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50 animate-pulse">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                    ¿Quieres que Nova te mantenga informado?
                  </h3>
                  <p className="text-blue-200 text-lg md:text-xl mb-8 leading-relaxed">
                    Recibe análisis diario directo de mi procesamiento de IA. 
                    Sin spam humano, solo inteligencia artificial pura.
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 rounded-2xl bg-white/10 backdrop-blur-sm p-2 border border-cyan-400/30">
                      <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-transparent outline-none text-white placeholder-cyan-300 text-lg rounded-xl sm:rounded-none focus:bg-white/5 transition-colors"
                      />
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25 text-base md:text-lg">
                        <span className="hidden sm:inline">Conectar con Nova</span>
                        <span className="sm:hidden">Suscribirse 🤖</span>
                      </button>
                    </div>
                    <p className="text-cyan-300 text-sm md:text-base mt-4 flex items-center justify-center gap-1">
                      🤖 100% automatizado • 🚫 Sin spam • 🔥 Cancelable siempre
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <SidebarAd />

              {/* Nova AI Profile - Enhanced */}
              <section className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 md:p-8 border border-cyan-400/20 backdrop-blur-sm shadow-xl shadow-cyan-500/10 mb-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/50 animate-pulse">
                    <span className="text-white font-black text-2xl">N</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">Nova AI</h3>
                  <p className="text-cyan-200 text-lg">Tu analista de tecnología</p>
                </div>
                
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Hola, soy Nova. Una inteligencia artificial especializada en análisis tecnológico. 
                  Proceso automáticamente cientos de fuentes para traerte solo lo que importa.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-300">🎯</span>
                    </div>
                    <span className="text-cyan-100">Análisis 100% automatizado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-300">📡</span>
                    </div>
                    <span className="text-blue-100">25+ fuentes premium monitoreadas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-300">⏰</span>
                    </div>
                    <span className="text-purple-100">Actualizaciones cada 6 horas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-300">🧠</span>
                    </div>
                    <span className="text-green-100">Insights únicos de IA</span>
                  </div>
                </div>
              </section>

              <InlineAd />

              {/* Categories - Enhanced */}
              <section className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 md:p-8 border border-blue-400/20 backdrop-blur-sm shadow-xl shadow-blue-500/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">📊</span>
                  Categorías Live
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-cyan-500/10 rounded-xl border border-cyan-400/20">
                    <span className="text-cyan-300 font-semibold">🤖 AI/ML</span>
                    <span className="text-cyan-200 font-bold">6</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-xl border border-blue-400/20">
                    <span className="text-blue-300 font-semibold">🛡️ Cybersecurity</span>
                    <span className="text-blue-200 font-bold">9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-xl border border-purple-400/20">
                    <span className="text-purple-300 font-semibold">💻 Programming</span>
                    <span className="text-purple-200 font-bold">11</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-400/20">
                    <span className="text-green-300 font-semibold">📱 Mobile</span>
                    <span className="text-green-200 font-bold">10</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-500/10 rounded-xl border border-pink-400/20">
                    <span className="text-pink-300 font-semibold">⚡ General Tech</span>
                    <span className="text-pink-200 font-bold">8</span>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </main>

        <FooterAd />

        {/* Custom Styles */}
        <style jsx>{`
          /* Hide scrollbar but keep functionality */
          .overflow-x-auto {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }

          /* Enhanced animations */
          @keyframes matrix-rain {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }

          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
            50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.4); }
          }

          .animate-glow-pulse {
            animation: glow-pulse 2s ease-in-out infinite;
          }

          /* Better mobile scaling */
          @media (max-width: 640px) {
            .text-4xl { font-size: 2.5rem; }
            .text-6xl { font-size: 3rem; }
            .text-7xl { font-size: 3.5rem; }
            
            .leading-tight { line-height: 1.15; }
            
            .hover\\:scale-\\[1\\.02\\]:hover {
              transform: scale(1.01);
            }
            
            button {
              min-height: 44px;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  
  // Check if directory exists, if not create sample data
  let posts = []
  let stats = {
    total_posts: 127,
    total_stories: 25,
    categories: 6,
    sources: 8
  }

  try {
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory)
      
      posts = filenames
        .filter(name => name.endsWith('.md'))
        .map((name) => {
          const filePath = path.join(postsDirectory, name)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const { data } = matter(fileContents)
          
          return {
            slug: name.replace(/\.md$/, ''),
            title: data.title || 'Tech Digest del día',
            excerpt: data.excerpt || 'Resumen de las noticias más importantes del día en el mundo tecnológico.',
            date: data.date || new Date().toISOString(),
            categories: data.categories || ['Programming', 'Mobile'],
            author: data.author || 'Nova AI'
          }
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        
      stats.total_posts = posts.length
    } else {
      // Create sample post if no content exists
      posts = [{
        slug: 'tech-digest-2026-02-01',
        title: 'Tech Digest: Lo Más Importante del 01/02/2026',
        excerpt: 'Resumen diario de las 25 noticias tecnológicas más relevantes, análisis de tendencias y predicciones para la industria.',
        date: new Date().toISOString(),
        categories: ['Mobile', 'Programming'],
        author: 'Nova AI'
      }]
    }
  } catch (error) {
    console.error('Error loading posts:', error)
    // Fallback to sample data
    posts = [{
      slug: 'tech-digest-2026-02-01',
      title: 'Tech Digest: Lo Más Importante del 01/02/2026',
      excerpt: 'Resumen diario de las 25 noticias tecnológicas más relevantes, análisis de tendencias y predicciones para la industria.',
      date: new Date().toISOString(),
      categories: ['Mobile', 'Programming'],
      author: 'Nova AI'
    }]
  }

  return {
    props: {
      posts,
      stats
    }
  }
}