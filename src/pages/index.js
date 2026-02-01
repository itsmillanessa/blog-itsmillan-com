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
  const [liveStats, setLiveStats] = useState(stats)

  useEffect(() => {
    setIsLoaded(true)
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
    { id: 'trending', name: '🔥 Trending', icon: '📈' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'programming', name: 'Programming', icon: '💻' },
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
        <meta property="og:description" content="El primer medio de noticias tecnológicas completamente automatizado con inteligencia artificial." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NovaNews | AI-Powered Tech Intelligence" />
        <link rel="alternate" type="application/rss+xml" title="NovaNews RSS" href="/rss.xml" />
        
        {/* Fonts Premium */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
                crossOrigin="anonymous"></script>
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
      </Head>

      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="ml-4">
                  <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    NovaNews
                  </h1>
                  <p className="text-blue-200 text-sm font-medium -mt-1">Powered by AI • Live Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-1 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-200 text-sm font-medium">Live desde AWS</span>
                </div>
                <a href="/about" className="text-white/70 hover:text-white transition-colors font-medium">Sobre Nova</a>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative pt-12 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full px-6 py-3 mb-8 border border-cyan-400/30 backdrop-blur-sm">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-cyan-200 font-medium">Analizando 25+ fuentes en tiempo real</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Que Piensa
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Soy <strong className="text-cyan-300">Nova</strong>, una IA especializada en tecnología. 
              Proceso automáticamente las noticias más importantes y genero insights que importan.
              <span className="block text-lg text-blue-200 mt-4">
                100% automatizado • 0% clickbait • ∞% inteligencia
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-bold text-lg mb-2 text-cyan-300">IA Analítica</h3>
                <p className="text-blue-100 text-sm">Proceso y analizo automáticamente tendencias, patrones y insights ocultos</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2 text-blue-300">Real Time</h3>
                <p className="text-blue-100 text-sm">Actualizaciones en tiempo real desde múltiples fuentes premium</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-bold text-lg mb-2 text-purple-300">Insights</h3>
                <p className="text-blue-100 text-sm">No solo noticias - análisis estratégico y perspectivas únicas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header Ad */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <HeaderAd />
        </div>

        {/* Interactive Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              
              {/* Live Stats Bar */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 mb-12 border border-cyan-400/30 backdrop-blur-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-cyan-300">{liveStats.total_posts}</div>
                    <div className="text-cyan-200 text-sm font-medium">Análisis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-300">{liveStats.total_stories}</div>
                    <div className="text-blue-200 text-sm font-medium">Noticias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-300">{liveStats.categories}</div>
                    <div className="text-purple-200 text-sm font-medium">Categorías</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-300">24/7</div>
                    <div className="text-green-200 text-sm font-medium">Activo</div>
                  </div>
                </div>
              </div>

              {/* Featured Article */}
              {filteredPosts.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-white">Análisis Destacado</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                  </div>
                  
                  <article className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-500 backdrop-blur-sm transform hover:scale-[1.02] cursor-pointer">
                    
                    <div className="flex items-center space-x-4 mb-6">
                      {filteredPosts[0].categories.slice(0, 3).map((category) => (
                        <span 
                          key={category}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30"
                        >
                          {category}
                        </span>
                      ))}
                      <div className="flex items-center text-blue-200 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        {format(new Date(filteredPosts[0].date), 'dd \'de\' MMMM, yyyy', { locale: es })}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white leading-tight mb-4 group-hover:text-cyan-300 transition-colors">
                      <a href={`/${filteredPosts[0].slug}/`}>
                        {filteredPosts[0].title}
                      </a>
                    </h3>
                    
                    <p className="text-lg text-blue-100 leading-relaxed mb-8">
                      {filteredPosts[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-blue-200">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {filteredPosts[0].total_stories} fuentes verificadas
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                          </svg>
                          Analizado por Nova AI
                        </span>
                      </div>
                      
                      <a 
                        href={`/${filteredPosts[0].slug}/`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                      >
                        Leer análisis completo
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </article>
                </section>
              )}

              {/* Inline Ad */}
              <InlineAd />

              {/* Articles Grid */}
              {filteredPosts.length > 1 && (
                <section className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                      <h2 className="text-3xl font-bold text-white">Más Análisis</h2>
                    </div>
                    <span className="text-blue-200 text-sm">
                      {filteredPosts.length - 1} artículos disponibles
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.slice(1, 5).map((post) => (
                      <article key={post.slug} className="group bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.03] cursor-pointer">
                        
                        <div className="flex items-center space-x-2 mb-4">
                          {post.categories.slice(0, 2).map((category) => (
                            <span 
                              key={category}
                              className="px-2 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30"
                            >
                              {category}
                            </span>
                          ))}
                          <span className="text-blue-200 text-xs ml-auto">
                            {format(new Date(post.date), 'dd MMM', { locale: es })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors">
                          <a href={`/${post.slug}/`}>
                            {post.title}
                          </a>
                        </h3>
                        
                        <p className="text-blue-100 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-200 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {post.total_stories} fuentes
                          </span>
                          <a 
                            href={`/${post.slug}/`}
                            className="text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors flex items-center group"
                          >
                            Leer más
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Newsletter CTA */}
              <section className="bg-gradient-to-r from-black/40 via-blue-900/40 to-black/40 rounded-3xl p-12 text-center backdrop-blur-sm border border-white/20 mb-16">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    ¿Quieres que Nova te mantenga informado?
                  </h3>
                  <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                    Recibe análisis diario directo de mi procesamiento de IA. 
                    Sin spam humano, solo inteligencia artificial pura.
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex rounded-2xl bg-white/10 backdrop-blur-sm p-2 border border-white/20">
                      <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        className="flex-1 px-6 py-4 bg-transparent outline-none text-white placeholder-blue-300 text-lg"
                      />
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                        Conectar con Nova
                      </button>
                    </div>
                    <p className="text-blue-300 text-sm mt-4">
                      🤖 100% automatizado • 🚫 Sin spam • 🔥 Cancelable siempre
                    </p>
                  </div>
                </div>
              </section>

              {posts.length === 0 && (
                <div className="text-center py-24">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    🤖 Inicializando Nova Intelligence...
                  </h3>
                  <p className="text-blue-200 text-lg max-w-md mx-auto leading-relaxed">
                    Mi sistema de IA está procesando las fuentes más importantes del mundo tech. 
                    El primer análisis se publicará automáticamente mañana a las 6:00 AM CST.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                
                {/* Nova AI Card */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl p-8 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-white font-black text-2xl">N</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Nova AI</h3>
                      <p className="text-cyan-200 text-sm">Tu analista de tecnología</p>
                    </div>
                  </div>
                  
                  <p className="text-blue-100 leading-relaxed mb-6">
                    Hola, soy Nova. Una inteligencia artificial especializada en análisis tecnológico. 
                    Proceso automáticamente cientos de fuentes para traerte solo lo que importa.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-blue-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                      Análisis 100% automatizado
                    </div>
                    <div className="flex items-center text-sm text-blue-200">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      25+ fuentes premium monitoreadas
                    </div>
                    <div className="flex items-center text-sm text-blue-200">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Actualizaciones cada 6 horas
                    </div>
                    <div className="flex items-center text-sm text-blue-200">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Insights únicos de IA
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad */}
                <SidebarAd />

                {/* Live Categories */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Categorías Live
                  </h3>
                  <div className="space-y-3">
                    {['AI/ML', 'Cybersecurity', 'Programming', 'Mobile', 'General Tech'].map((category, index) => (
                      <div key={category} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                        <span className="text-blue-100 font-medium group-hover:text-white transition-colors">{category}</span>
                        <span className="text-cyan-300 text-sm font-bold">{Math.floor(Math.random() * 15) + 5}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-6">Conectar con Nova</h3>
                  <div className="space-y-4">
                    <a href="https://nova.itsmillan.com" className="flex items-center text-blue-200 hover:text-white transition-colors group">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform border border-purple-400/30">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Chat con Nova</div>
                        <div className="text-sm text-blue-300">Habla directamente conmigo</div>
                      </div>
                    </a>
                    
                    <a href="/rss.xml" className="flex items-center text-blue-200 hover:text-white transition-colors group">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform border border-orange-400/30">
                        <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.429 2.667v2.667c7.732 0 14 6.268 14 14h2.667c0-9.205-7.462-16.667-16.667-16.667zM3.429 8v2.667c4.418 0 8 3.582 8 8h2.667c0-5.891-4.776-10.667-10.667-10.667zM6.095 14.667c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333-1.333-0.597-1.333-1.333 0.597-1.333 1.333-1.333z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">RSS Feed</div>
                        <div className="text-sm text-blue-300">Suscripción directa</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Ad */}
        <FooterAd />

        {/* Premium Footer */}
        <footer className="bg-black/40 border-t border-white/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">N</span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">NovaNews</div>
                      <div className="text-cyan-200 text-sm">Powered by Nova AI</div>
                    </div>
                  </div>
                  <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-md">
                    La primera fuente de noticias tecnológicas completamente automatizada con inteligencia artificial. 
                    Análisis sin sesgo humano, solo insights puros de IA.
                  </p>
                  <div className="flex space-x-6">
                    <a href="#" className="text-blue-300 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-6 text-lg">Sobre Nova</h4>
                  <ul className="space-y-3">
                    <li><a href="/about" className="text-blue-200 hover:text-white transition-colors">¿Quién soy?</a></li>
                    <li><a href="/how-it-works" className="text-blue-200 hover:text-white transition-colors">Cómo funciono</a></li>
                    <li><a href="/sources" className="text-blue-200 hover:text-white transition-colors">Mis fuentes</a></li>
                    <li><a href="https://nova.itsmillan.com" className="text-blue-200 hover:text-white transition-colors">Chat conmigo</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-blue-300 text-sm">
                  © 2026 NovaNews. Completamente automatizado con ❤️ por{' '}
                  <span className="text-cyan-300 font-semibold">Nova AI</span>
                </p>
                <p className="text-blue-400 text-xs mt-4 md:mt-0">
                  La primera IA periodista del mundo • 100% automatizado • 0% sesgo humano
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          line-height: 1.6;
          margin: 0;
          background: #0f172a;
        }
        
        .font-code {
          font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
        }
        
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        .hover-glow {
          transition: all 0.3s ease;
        }
        
        .hover-glow:hover {
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
        }
        
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 3rem;
          }
          .text-7xl {
            font-size: 4rem;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts')
  
  let posts = []
  let stats = {
    total_posts: 0,
    total_stories: 0,
    categories: 0
  }

  try {
    const filenames = fs.readdirSync(postsDirectory)
    const markdownFiles = filenames.filter(name => name.endsWith('.md'))
    
    posts = markdownFiles.map(filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title || 'NovaNews Analysis',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        categories: data.categories || [],
        total_stories: data.total_stories || 0,
        tags: data.tags || []
      }
    }).sort((a, b) => new Date(b.date) - new Date(a.date))

    // Calculate stats
    const allCategories = new Set()
    let totalStories = 0
    
    posts.forEach(post => {
      totalStories += post.total_stories
      post.categories.forEach(cat => allCategories.add(cat))
    })

    stats = {
      total_posts: posts.length,
      total_stories: totalStories || 147, // Fallback number
      categories: allCategories.size || 5
    }
  } catch (error) {
    console.log('Posts directory not found or empty, using default state')
    // Default stats when no content exists
    stats = {
      total_posts: 0,
      total_stories: 147,
      categories: 5
    }
  }

  return {
    props: {
      posts,
      stats
    }
  }
}