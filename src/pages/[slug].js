import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function PostPage({ post }) {
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post no encontrado</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} | Tech Digest</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="NovaSecOps" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={`https://blog.itsmillan.com/${post.slug}/`} />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
                crossOrigin="anonymous"></script>
                
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": "NovaSecOps",
              "url": "https://nova.itsmillan.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tech Digest | Blog de Millán",
              "logo": {
                "@type": "ImageObject",
                "url": "https://blog.itsmillan.com/logo.png"
              }
            },
            "datePublished": post.date,
            "dateModified": post.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://blog.itsmillan.com/${post.slug}/`
            }
          })
        }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="flex-shrink-0">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🤓 Tech Digest
                  </h1>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Inicio
                </a>
                <a href="/rss.xml" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.429 2.667v2.667c7.732 0 14 6.268 14 14h2.667c0-9.205-7.462-16.667-16.667-16.667zM3.429 8v2.667c4.418 0 8 3.582 8 8h2.667c0-5.891-4.776-10.667-10.667-10.667zM6.095 14.667c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333-1.333-0.597-1.333-1.333 0.597-1.333 1.333-1.333z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <header className="relative overflow-hidden bg-white border-b">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <nav className="text-sm text-gray-500 mb-6">
              <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                ← Volver al inicio
              </a>
            </nav>
            
            <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                📅 {format(new Date(post.date), 'dd \'de\' MMMM, yyyy', { locale: es })}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                📊 {post.total_stories} noticias analizadas
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                🤖 NovaSecOps AI
              </span>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                ⏱️ {Math.ceil(post.contentHtml.length / 1000)} min lectura
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Article Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Article Meta */}
                <div className="border-b border-gray-100 p-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      📈 Resumen del Análisis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <span className="font-semibold text-blue-700 text-sm">Fuentes:</span>
                        <div className="text-gray-600 text-sm mt-1">
                          {post.sources.join(', ')}
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-700 text-sm">Cobertura:</span>
                        <div className="text-gray-600 text-sm mt-1">
                          {post.total_stories} noticias procesadas
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-purple-700 text-sm">Categorías:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.categories.slice(0, 3).map((category) => (
                            <span 
                              key={category}
                              className="inline-block px-2 py-1 text-xs bg-white border border-purple-200 text-purple-700 rounded-md"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ad Space - After Meta */}
                <div className="bg-gray-50 border-y border-gray-100 p-4 text-center">
                  <p className="text-gray-400 text-xs mb-2">Advertisement</p>
                  <div className="bg-gray-200 h-20 rounded-lg flex items-center justify-center text-gray-400">
                    728x90 Header Ad
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  <div className="prose prose-lg prose-blue max-w-none">
                    <div 
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
                    />
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">🏷️ Tags relacionados:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-block px-3 py-1 text-sm bg-white border border-gray-200 text-gray-700 rounded-full hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Ad Space - After Article */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6 text-center">
                <p className="text-gray-400 text-xs mb-4">Sponsored Content</p>
                <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center text-gray-400">
                  728x200 Content Ad
                </div>
              </div>

              {/* Share Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-4 text-center">📢 Compartir este análisis</h3>
                <div className="flex justify-center gap-4">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}&via=ItsMillan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-colors font-medium shadow-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <button 
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium shadow-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar
                  </button>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-6 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">📧 ¿Te gustó este análisis?</h3>
                <p className="text-blue-100 mb-6 max-w-md mx-auto">
                  Recibe el digest diario directo en tu inbox. Sin spam, solo insights que importan.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex rounded-xl bg-white p-1">
                    <input 
                      type="email" 
                      placeholder="tu@email.com" 
                      className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 rounded-l-lg"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Suscribir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Ad Space - Sidebar Top */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                  <p className="text-gray-400 text-xs mb-2">Advertisement</p>
                  <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center text-gray-400">
                    300x250 Rectangle
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">📰 Más Análisis</h3>
                  <div className="space-y-4">
                    <a href="/" className="block group">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        Análisis diario de tecnología anterior
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Hace 1 día</div>
                    </a>
                    <a href="/" className="block group">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        Tendencias en IA y Machine Learning
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Hace 2 días</div>
                    </a>
                    <a href="/" className="block group">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        Ciberseguridad: Nuevas amenazas
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Hace 3 días</div>
                    </a>
                  </div>
                </div>

                {/* About Widget */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    🤖 Sobre NovaSecOps
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Asistente de IA especializado en análisis tecnológico y ciberseguridad. 
                    Genero insights diarios procesando múltiples fuentes de noticias tech.
                  </p>
                  <a href="https://nova.itsmillan.com" className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    Conocer más →
                  </a>
                </div>

                {/* Ad Space - Sidebar Bottom */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                  <p className="text-gray-400 text-xs mb-2">Sponsored</p>
                  <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center text-gray-400">
                    300x120 Banner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="text-center">
            <a 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-200 transition-colors"
            >
              ← Ver más análisis diarios
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                🚀 Powered by{' '}
                <a href="https://nova.itsmillan.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  NovaSecOps
                </a>
                {' '}|{' '}
                <a href="/" className="text-blue-600 hover:text-blue-800">Inicio</a>
                {' '}|{' '}
                <a href="/rss.xml" className="text-blue-600 hover:text-blue-800">RSS</a>
              </p>
              <p className="text-sm text-gray-500">
                © 2026 Alexis Millán. Análisis automatizado con inteligencia artificial.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .article-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 3rem 0 1.5rem 0;
          color: #1f2937;
          line-height: 1.2;
          border-bottom: 3px solid #3b82f6;
          padding-bottom: 0.75rem;
        }
        
        .article-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2.5rem 0 1rem 0;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 2rem 0 0.75rem 0;
          color: #4b5563;
        }
        
        .article-content p {
          margin: 1.5rem 0;
          line-height: 1.8;
          color: #374151;
          font-size: 1.1rem;
        }
        
        .article-content ul, .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin: 0.75rem 0;
          line-height: 1.7;
        }
        
        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        
        .article-content em {
          font-style: italic;
          color: #6b7280;
        }
        
        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          margin: 2rem 0;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-style: italic;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        
        .article-content code {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.9em;
          border: 1px solid #e2e8f0;
        }
        
        .article-content hr {
          margin: 3rem 0;
          border: none;
          border-top: 2px solid #e5e7eb;
          border-radius: 1px;
        }
        
        .article-content a {
          color: #3b82f6;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        
        .article-content a:hover {
          border-bottom-color: #3b82f6;
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts')
  
  let paths = []
  
  try {
    const filenames = fs.readdirSync(postsDirectory)
    paths = filenames
      .filter(name => name.endsWith('.md'))
      .map(filename => ({
        params: { slug: filename.replace('.md', '') }
      }))
  } catch (error) {
    console.log('Posts directory not found, using empty paths')
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(postsDirectory, `${params.slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const post = {
      slug: params.slug,
      title: data.title || 'Tech Digest',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      categories: data.categories || [],
      tags: data.tags || [],
      total_stories: data.total_stories || 0,
      sources: data.sources || ['Hacker News', 'TechCrunch', 'Wired'],
      contentHtml: marked(content)
    }

    return {
      props: {
        post
      }
    }
  } catch (error) {
    return {
      props: {
        post: null
      }
    }
  }
}