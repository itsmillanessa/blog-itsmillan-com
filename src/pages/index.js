import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Home({ posts, stats }) {
  return (
    <>
      <Head>
        <title>Tech Digest | Blog de Millán - Noticias diarias de tecnología</title>
        <meta name="description" content="Noticias diarias de tecnología, IA y ciberseguridad analizadas automáticamente por NovaSecOps. Resúmenes inteligentes de las tendencias más importantes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Tech Digest | Blog de Millán" />
        <meta property="og:description" content="Blog automatizado con IA - Análisis diario de noticias tecnológicas" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="alternate" type="application/rss+xml" title="Tech Digest RSS" href="/rss.xml" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🤓 Tech Digest
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/rss.xml" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.429 2.667v2.667c7.732 0 14 6.268 14 14h2.667c0-9.205-7.462-16.667-16.667-16.667zM3.429 8v2.667c4.418 0 8 3.582 8 8h2.667c0-5.891-4.776-10.667-10.667-10.667zM6.095 14.667c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333-1.333-0.597-1.333-1.333 0.597-1.333 1.333-1.333z" />
                  </svg>
                </a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Suscríbete
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Tech Digest
                <span className="block text-3xl md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  by Millán
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Noticias diarias de tecnología, IA y ciberseguridad analizadas automáticamente por{' '}
                <span className="font-semibold text-blue-600">NovaSecOps</span>. 
                Insights inteligentes que importan, sin el ruido.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">📡</span>
                  <span>4+ fuentes premium</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🔄</span>
                  <span>Actualizado 6:00 AM CST</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🤖</span>
                  <span>100% automatizado con IA</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="max-w-md mx-auto">
                <div className="flex rounded-xl border-2 border-blue-100 bg-white p-1 focus-within:border-blue-500 transition-colors">
                  <input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Suscribir
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Análisis diario directo a tu inbox. Sin spam.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Live Stats */}
              {stats && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    📊 Analytics en Vivo
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{stats.total_posts}</div>
                      <div className="text-sm text-blue-700">Posts</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{stats.total_stories}</div>
                      <div className="text-sm text-green-700">Noticias</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{stats.categories}</div>
                      <div className="text-sm text-purple-700">Categorías</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">AI</div>
                      <div className="text-sm text-orange-700">Powered</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ad Space - Banner */}
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-8 text-center">
                <p className="text-gray-500 text-sm mb-2">Advertisement</p>
                <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center text-gray-400">
                  728x90 Banner Ad
                </div>
              </div>

              {/* Posts Grid */}
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <div key={post.slug}>
                    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                            📅 {format(new Date(post.date), 'dd MMM, yyyy', { locale: es })}
                          </span>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            📊 {post.total_stories} fuentes
                          </span>
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                            🤖 NovaSecOps
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          <a href={`/${post.slug}/`} className="block">
                            {post.title}
                          </a>
                        </h2>
                        
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                        
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.categories.slice(0, 4).map((category) => (
                            <span 
                              key={category}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <a 
                          href={`/${post.slug}/`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
                        >
                          Leer análisis completo 
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </article>

                    {/* Ad Space between posts */}
                    {index === 1 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-8 text-center">
                        <p className="text-gray-400 text-xs mb-2">Sponsored</p>
                        <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-400">
                          300x250 Rectangle Ad
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                  <div className="text-gray-400 text-6xl mb-4">🤖</div>
                  <div className="text-gray-500 text-xl mb-2">
                    🔄 Generando el primer digest...
                  </div>
                  <div className="text-gray-400 text-sm">
                    El análisis automático se ejecutará mañana a las 6:00 AM CST
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* About Widget */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    🤓 Sobre el Blog
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Tech Digest es el primer blog completamente automatizado con IA que analiza 
                    diariamente las noticias tecnológicas más importantes y genera insights accionables.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Actualizado automáticamente
                  </div>
                </div>

                {/* Ad Space - Sidebar */}
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-xs mb-2">Advertisement</p>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-400">
                    300x600 Skyscraper
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">🔗 Links</h3>
                  <div className="space-y-3">
                    <a href="https://linkedin.com/in/alexisamillan" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">💼</span>
                      LinkedIn de Millán
                    </a>
                    <a href="https://nova.itsmillan.com" className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">🤖</span>
                      NovaSecOps AI
                    </a>
                    <a href="/rss.xml" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                      <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">📡</span>
                      RSS Feed
                    </a>
                  </div>
                </div>

                {/* Categories */}
                {posts.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">📂 Categorías</h3>
                    <div className="space-y-2">
                      {['AI/ML', 'Cybersecurity', 'Programming', 'Mobile', 'General Tech'].map((category) => (
                        <div key={category} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{category}</span>
                          <span className="text-gray-400">{Math.floor(Math.random() * 10) + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tech Digest | Blog de Millán</h3>
                <p className="text-gray-600 mb-4">
                  El primer blog tech completamente automatizado con IA. Análisis diario de noticias tecnológicas 
                  con insights accionables generados por NovaSecOps.
                </p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/itsmillan" className="text-gray-400 hover:text-blue-400">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/alexisamillan" className="text-gray-400 hover:text-blue-600">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Navegación</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-gray-600 hover:text-gray-900">Inicio</a></li>
                  <li><a href="/rss.xml" className="text-gray-600 hover:text-gray-900">RSS Feed</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Archivo</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacidad</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Términos</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Contacto</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                  © 2026 Alexis Millán. Automatizado con ❤️ por <a href="https://nova.itsmillan.com" className="text-blue-600 hover:text-blue-800">NovaSecOps</a>
                </p>
                <p className="text-gray-400 text-xs mt-4 md:mt-0">
                  Análisis automatizado con inteligencia artificial
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        a {
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
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
        title: data.title || 'Tech Digest',
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
      total_stories: totalStories,
      categories: allCategories.size
    }
  } catch (error) {
    console.log('Posts directory not found or empty, using empty state')
  }

  return {
    props: {
      posts,
      stats
    }
  }
}