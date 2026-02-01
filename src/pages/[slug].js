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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post no encontrado</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800">← Volver al inicio</a>
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
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="NovaSecOps" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={`https://blog.itsmillan.com/${post.slug}/`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <nav className="text-sm text-gray-600 mb-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">← Volver al inicio</a>
            </nav>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span>📅 {format(new Date(post.date), 'dd \'de\' MMMM, yyyy', { locale: es })}</span>
              <span>•</span>
              <span>📊 {post.total_stories} noticias analizadas</span>
              <span>•</span>
              <span>🤖 NovaSecOps</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <article className="bg-white rounded-lg shadow-sm border">
            {/* Article meta */}
            <div className="border-b p-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📈 Resumen del Análisis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">Fuentes:</span>
                    <div className="text-blue-600">{post.sources.join(', ')}</div>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Noticias:</span>
                    <div className="text-blue-600">{post.total_stories} analizadas</div>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Categorías:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.categories.slice(0, 3).map((category) => (
                        <span 
                          key={category}
                          className="inline-block px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none p-6">
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="border-t p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">🏷️ Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Share section */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border text-center">
            <h3 className="font-semibold text-gray-900 mb-4">📢 Compartir este análisis</h3>
            <div className="flex justify-center gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <a 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Ver más análisis diarios
            </a>
          </div>
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
                <a href="/" className="text-blue-600 hover:text-blue-800">Inicio</a>
                {' '}|{' '}
                <a href="/rss.xml" className="text-blue-600 hover:text-blue-800">RSS</a>
              </p>
              <p className="text-sm text-gray-500">
                Análisis automatizado con inteligencia artificial
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .article-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          color: #1f2937;
          line-height: 1.2;
        }
        
        .article-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
          color: #4b5563;
        }
        
        .article-content p {
          margin: 1rem 0;
          line-height: 1.7;
          color: #374151;
        }
        
        .article-content ul, .article-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        
        .article-content em {
          font-style: italic;
        }
        
        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          margin: 1.5rem 0;
          padding: 0.5rem 1rem;
          background-color: #f8fafc;
          font-style: italic;
        }
        
        .article-content code {
          background-color: #f1f5f9;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875em;
        }
        
        .article-content hr {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid #e5e7eb;
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