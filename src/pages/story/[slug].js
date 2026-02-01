import Head from 'next/head'
import { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { marked } from 'marked'

export default function Story({ post, relatedPosts }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Add reading progress indicator
    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      
      const progressBar = document.getElementById('reading-progress')
      if (progressBar) {
        progressBar.style.width = scrolled + '%'
      }
    }
    
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  if (!post) {
    return <div>Post not found</div>
  }

  const contentHtml = marked(post.content)
  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <>
      <Head>
        <title>{post.title} | NovaNews</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/styles/editorial.css" rel="stylesheet" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://blog.itsmillan.com${post.image}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://blog.itsmillan.com${post.image}`} />
      </Head>

      {/* Reading Progress */}
      <div className="reading-progress-container">
        <div id="reading-progress" className="reading-progress"></div>
      </div>

      <div className="story-page">
        {/* HEADER */}
        <header className="editorial-header">
          <div className="container">
            <div className="header-content">
              <a href="/" className="logo">NovaNews</a>
              <nav>
                <ul className="nav-menu">
                  <li><a href="/" className="nav-link">← Volver a historias</a></li>
                  <li><a href="/newsletter" className="nav-link">Newsletter</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* ARTICLE HEADER */}
        <article className="story-article">
          <header className="story-header">
            <div className="container">
              <div className="content-container">
                <div className="story-meta mb-md">
                  <span className="overline story-category">{post.category}</span>
                  <span className="story-date">
                    {format(new Date(post.date), 'dd \'de\' MMMM, yyyy', { locale: es })}
                  </span>
                  <span className="story-read-time">{estimatedReadTime} min lectura</span>
                </div>
                
                <h1 className="display-1 story-title mb-md">{post.title}</h1>
                <p className="body-large story-excerpt mb-xl">{post.excerpt}</p>
                
                {/* Share buttons */}
                <div className="story-share mb-xl">
                  <span className="caption share-label">Compartir:</span>
                  <div className="share-buttons">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/story/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-button twitter"
                      aria-label="Compartir en Twitter"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/story/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-button linkedin"
                      aria-label="Compartir en LinkedIn"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4.477 4.479A1.67 1.67 0 116.146 6.146 1.67 1.67 0 014.477 4.479zM4.694 7.464h3.089v9.888H4.694V7.464zm4.77 0h2.963v1.35h.043c.413-.783 1.422-1.608 2.926-1.608 3.129 0 3.708 2.058 3.708 4.737v5.409h-3.088v-4.79c0-1.154-.021-2.637-1.608-2.637-1.609 0-1.856 1.257-1.856 2.552v4.875H9.464V7.464z"/>
                      </svg>
                    </a>
                    <button 
                      onClick={() => navigator.clipboard.writeText(`https://blog.itsmillan.com/story/${post.slug}`)}
                      className="share-button copy"
                      aria-label="Copiar enlace"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v6.793L5.414 10.5a1 1 0 011.414 0L10 13.672l3.172-3.172a1 1 0 011.414 0L16 11.914V5a2 2 0 00-2-2H6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* FEATURED IMAGE */}
          {post.image && (
            <div className="story-image-container">
              <div className="container">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="story-image"
                />
              </div>
            </div>
          )}

          {/* ARTICLE CONTENT */}
          <div className="story-content">
            <div className="container">
              <div className="content-container">
                <div 
                  className="story-body"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="story-tags mt-xl">
                    <span className="caption tags-label">Etiquetas:</span>
                    <div className="tags-list">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author info */}
                <div className="story-author mt-xl">
                  <div className="author-card">
                    <div className="author-avatar">
                      <span className="author-initial">N</span>
                    </div>
                    <div className="author-info">
                      <h4 className="subtitle author-name">Nova</h4>
                      <p className="body author-bio">
                        Inteligencia artificial especializada en análisis tecnológico y periodismo automatizado. 
                        Procesando información 24/7 para traerte las historias más importantes del mundo tech.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* RELATED POSTS */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="related-posts">
            <div className="container">
              <div className="content-container">
                <h3 className="headline mb-lg">Historias relacionadas</h3>
                <div className="related-grid">
                  {relatedPosts.map(relatedPost => (
                    <article key={relatedPost.slug} className="related-card">
                      <a href={`/story/${relatedPost.slug}`}>
                        <img 
                          src={relatedPost.image || '/images/default-tech.jpg'}
                          alt={relatedPost.title}
                          className="related-image"
                        />
                        <div className="related-content">
                          <div className="overline related-category">{relatedPost.category}</div>
                          <h4 className="title related-title">{relatedPost.title}</h4>
                          <div className="related-meta">
                            <span className="caption">{format(new Date(relatedPost.date), 'dd MMM', { locale: es })}</span>
                            <span className="caption">{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEWSLETTER CTA */}
        <section className="newsletter">
          <div className="container">
            <div className="content-container">
              <h2 className="display-2 mb-md">¿Te gustó esta historia?</h2>
              <p className="body-large mb-0">
                Recibe cada semana análisis como este directamente en tu inbox. Sin spam, solo las historias que importan.
              </p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="content-container">
              <p className="body">
                © 2026 NovaNews. Periodismo tecnológico automatizado.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .reading-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 1000;
          background: #f0f0f0;
        }
        
        .reading-progress {
          height: 100%;
          background: var(--accent-primary);
          transition: width 0.1s ease;
        }
        
        .story-header {
          padding: var(--space-xxl) 0 var(--space-xl);
        }
        
        .story-meta {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        
        .story-category {
          color: var(--accent-primary);
        }
        
        .story-date,
        .story-read-time {
          color: var(--text-tertiary);
          font-size: 0.875rem;
        }
        
        .story-share {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .share-label {
          color: var(--text-secondary);
        }
        
        .share-buttons {
          display: flex;
          gap: var(--space-xs);
        }
        
        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .share-button:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--bg-secondary);
        }
        
        .story-image-container {
          margin-bottom: var(--space-xxl);
        }
        
        .story-image {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          display: block;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .story-content {
          padding-bottom: var(--space-xxl);
        }
        
        .story-body {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-primary);
        }
        
        .story-body h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          margin: var(--space-xl) 0 var(--space-md);
          color: var(--text-primary);
        }
        
        .story-body h3 {
          font-family: var(--font-body);
          font-size: 1.375rem;
          font-weight: 600;
          margin: var(--space-lg) 0 var(--space-sm);
          color: var(--text-primary);
        }
        
        .story-body p {
          margin-bottom: var(--space-md);
        }
        
        .story-body blockquote {
          border-left: 4px solid var(--accent-primary);
          padding-left: var(--space-md);
          margin: var(--space-lg) 0;
          font-style: italic;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: var(--space-md);
          border-radius: 0 8px 8px 0;
        }
        
        .story-body ul,
        .story-body ol {
          margin: var(--space-md) 0;
          padding-left: var(--space-lg);
        }
        
        .story-body li {
          margin-bottom: var(--space-xs);
        }
        
        .story-tags {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--border-light);
        }
        
        .tags-label {
          color: var(--text-secondary);
        }
        
        .tags-list {
          display: flex;
          gap: var(--space-xs);
          flex-wrap: wrap;
        }
        
        .tag {
          padding: var(--space-xs) var(--space-sm);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .story-author {
          padding: var(--space-lg) 0;
          border-top: 1px solid var(--border-light);
        }
        
        .author-card {
          display: flex;
          gap: var(--space-md);
        }
        
        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .author-initial {
          color: white;
          font-weight: 600;
          font-size: 1.5rem;
        }
        
        .author-name {
          margin-bottom: var(--space-xs);
        }
        
        .author-bio {
          color: var(--text-secondary);
          margin: 0;
        }
        
        .related-posts {
          padding: var(--space-xxl) 0;
          background: var(--bg-secondary);
        }
        
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-lg);
        }
        
        .related-card {
          background: var(--bg-primary);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        
        .related-card a {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .related-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .related-content {
          padding: var(--space-md);
        }
        
        .related-category {
          color: var(--accent-primary);
          margin-bottom: var(--space-xs);
        }
        
        .related-title {
          margin-bottom: var(--space-sm);
          line-height: 1.4;
        }
        
        .related-meta {
          display: flex;
          gap: var(--space-sm);
          color: var(--text-tertiary);
        }
        
        @media (max-width: 768px) {
          .story-header {
            padding: var(--space-lg) 0;
          }
          
          .story-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-xs);
          }
          
          .story-share {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .author-card {
            flex-direction: column;
            text-align: center;
          }
          
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  let paths = []
  
  try {
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory)
      
      paths = filenames
        .filter(name => name.endsWith('.md'))
        .map(name => ({
          params: {
            slug: name.replace(/\.md$/, '')
          }
        }))
    }
  } catch (error) {
    console.error('Error loading post paths:', error)
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return {
        notFound: true
      }
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const post = {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      readTime: data.readTime,
      image: data.image,
      tags: data.tags || [],
      content
    }

    // Get related posts (same category, excluding current)
    let relatedPosts = []
    try {
      const filenames = fs.readdirSync(postsDirectory)
      
      relatedPosts = filenames
        .filter(name => name.endsWith('.md') && name !== `${slug}.md`)
        .map(name => {
          const relatedPath = path.join(postsDirectory, name)
          const relatedContents = fs.readFileSync(relatedPath, 'utf8')
          const { data: relatedData } = matter(relatedContents)
          
          return {
            slug: name.replace(/\.md$/, ''),
            title: relatedData.title,
            category: relatedData.category,
            date: relatedData.date,
            readTime: relatedData.readTime,
            image: relatedData.image
          }
        })
        .filter(relatedPost => relatedPost.category === post.category)
        .slice(0, 3)
        
    } catch (error) {
      console.warn('Error loading related posts:', error)
    }

    return {
      props: {
        post,
        relatedPosts
      }
    }
    
  } catch (error) {
    console.error('Error loading post:', error)
    return {
      notFound: true
    }
  }
}