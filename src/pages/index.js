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
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="alternate" type="application/rss+xml" title="Tech Digest RSS" href="/rss.xml" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🤓 Tech Digest | Blog de Millán
            </h1>
            <p className="text-lg text-gray-600">
              Noticias diarias de tecnología, IA y ciberseguridad analizadas automáticamente por{' '}
              <strong className="text-blue-600">NovaSecOps</strong>
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
              <span>📡 Fuentes: Hacker News, TechCrunch, Wired, Ars Technica</span>
              <span>🔄 Actualizado diariamente 6:00 AM CST</span>
              <span>🤖 Powered by AI</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Stats */}
          {stats && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Estadísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total_posts}</div>
                  <div className="text-sm text-gray-600">Posts publicados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.total_stories}</div>
                  <div className="text-sm text-gray-600">Noticias analizadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.categories}</div>
                  <div className="text-sm text-gray-600">Categorías</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Automatizado</div>
                </div>
              </div>
            </div>
          )}

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>📅 {format(new Date(post.date), 'dd \'de\' MMMM, yyyy', { locale: es })}</span>
                    <span>•</span>
                    <span>📊 {post.total_stories} noticias analizadas</span>
                    <span>•</span>
                    <span>🤖 NovaSecOps</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    <a href={`/${post.slug}/`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.slice(0, 4).map((category) => (
                      <span 
                        key={category}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={`/${post.slug}/`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Leer artículo completo →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                🔄 Generando contenido...
              </div>
              <div className="text-gray-400 text-sm mt-2">
                El primer digest se publicará automáticamente mañana a las 6:00 AM CST
              </div>
            </div>
          )}
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                🚀 Powered by{' '}
                <a href="https://nova.itsmillan.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  NovaSecOps
                </a>
                {' '}|{' '}
                <a href="/rss.xml" className="text-blue-600 hover:text-blue-800">RSS Feed</a>
                {' '}|{' '}
                <a href="https://linkedin.com/in/alexisamillan" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
              </p>
              <p className="text-sm text-gray-500">
                Análisis automatizado de noticias tecnológicas con inteligencia artificial
              </p>
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
          text-decoration: underline;
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