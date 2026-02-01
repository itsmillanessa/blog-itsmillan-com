import Head from 'next/head'
import { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Editorial({ posts, featuredPost }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const categories = [
    'Todas las historias',
    'Tecnología',
    'Inteligencia Artificial', 
    'Ciberseguridad',
    'Programación',
    'Startups'
  ]

  return (
    <>
      <Head>
        <title>NovaNews | Periodismo tecnológico de próxima generación</title>
        <meta name="description" content="Las historias más importantes del mundo tech. Análisis profundo, investigación y perspectivas únicas sobre el futuro de la tecnología." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="NovaNews | Periodismo tecnológico de próxima generación" />
        <meta property="og:description" content="Las historias más importantes del mundo tech con análisis profundo y perspectivas únicas." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="editorial-site">
        {/* HEADER */}
        <header className="editorial-header">
          <div className="container">
            <div className="header-content">
              <a href="/" className="logo">NovaNews</a>
              <nav>
                <ul className="nav-menu">
                  <li><a href="/" className="nav-link active">Historias</a></li>
                  <li><a href="/weekly" className="nav-link">Resumen Semanal</a></li>
                  <li><a href="/about" className="nav-link">Sobre Nova</a></li>
                  <li><a href="/newsletter" className="nav-link">Newsletter</a></li>
                </ul>
              </nav>
              <div className="header-actions">
                <button className="theme-toggle" aria-label="Cambiar tema">
                  🌙
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="container">
            <div className="content-container">
              <div className="hero-content">
                <p className="overline">Periodismo tecnológico de próxima generación</p>
                <h1 className="display-1 mb-md">
                  Las historias más importantes del mundo tech.{" "}
                  <span className="text-gradient">Análisis profundo, investigación y perspectivas únicas</span>{" "}
                  sobre el futuro que estamos construyendo.
                </h1>
                <a href="#stories" className="cta-button primary">
                  Explorar historias
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED POST */}
        {featuredPost && (
          <section className="featured-post">
            <div className="container">
              <div className="content-container">
                <div className="featured-content">
                  <div className="featured-text">
                    <div className="overline featured-label">Historia destacada</div>
                    <h2 className="display-2 mb-sm">{featuredPost.title}</h2>
                    <p className="body-large mb-md">{featuredPost.excerpt}</p>
                    <div className="featured-meta">
                      <span className="overline">{featuredPost.category}</span>
                      <span className="meta-separator">•</span>
                      <span className="caption">
                        {format(new Date(featuredPost.date), 'dd \'de\' MMMM', { locale: es })}
                      </span>
                      <span className="meta-separator">•</span>
                      <span className="caption">{featuredPost.readTime}</span>
                    </div>
                    <a 
                      href={`/story/${featuredPost.slug}`}
                      className="read-more"
                    >
                      Leer historia completa →
                    </a>
                  </div>
                  <div className="featured-image">
                    <img 
                      src={featuredPost.image || '/images/default-tech.jpg'} 
                      alt={featuredPost.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STORIES SECTION */}
        <section id="stories" className="stories">
          <div className="container">
            <div className="content-container">
              <div className="stories-header">
                <h3 className="headline">Todas las historias</h3>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`filter-button ${category === 'Todas las historias' ? 'active' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="stories-grid">
                {posts && posts.length > 0 ? posts.map(post => (
                  <article key={post.slug} className="story-card">
                    <a href={`/story/${post.slug}`}>
                      <div className="card-image">
                        <img 
                          src={post.image || '/images/default-tech.jpg'} 
                          alt={post.title}
                        />
                        <div className="card-category">{post.category}</div>
                      </div>
                      <div className="card-content">
                        <h4 className="title card-title">{post.title}</h4>
                        <p className="body card-excerpt">{post.excerpt}</p>
                        <div className="card-meta">
                          <span className="caption">
                            {format(new Date(post.date), 'dd MMM', { locale: es })}
                          </span>
                          <span className="meta-separator">•</span>
                          <span className="caption">{post.readTime}</span>
                        </div>
                      </div>
                    </a>
                  </article>
                )) : (
                  <div className="empty-state">
                    <h4 className="subtitle">Próximamente...</h4>
                    <p className="body">Estamos preparando historias increíbles para ti.</p>
                    <button className="load-more" onClick={() => window.location.reload()}>
                      Cargar más historias
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter">
          <div className="container">
            <div className="content-container">
              <h2 className="display-2 mb-md">Mantente actualizado</h2>
              <p className="body-large mb-xl">
                Recibe cada semana las historias más importantes del mundo tecnológico directamente en tu inbox.
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
              <p className="caption newsletter-disclaimer">
                Sin spam. Solo las historias que importan. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="content-container">
              <p className="body">
                © 2026 NovaNews. Periodismo tecnológico automatizado con análisis de próxima generación.
              </p>
              <div className="footer-links">
                <span className="body">Hecho con 🤖 por Nova AI</span>
                <span className="meta-separator">•</span>
                <a href="/about" className="footer-link">Sobre el proyecto</a>
                <span className="meta-separator">•</span>
                <a href="/contact" className="footer-link">Contacto</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        /* RESET & FOUNDATION */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          /* Typography */
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          
          /* Colors */
          --text-primary: #1a1a1a;
          --text-secondary: #666666;
          --text-tertiary: #999999;
          --accent-primary: #0066cc;
          --accent-secondary: #0052a3;
          --bg-primary: #ffffff;
          --bg-secondary: #f8f9fa;
          --bg-tertiary: #e9ecef;
          --border-light: #e1e5e9;
          --border-medium: #d1d7db;
          
          /* Spacing */
          --space-xs: 0.25rem;
          --space-sm: 0.5rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-xxl: 3rem;
          
          /* Layout */
          --container-width: 1200px;
          --content-width: 800px;
          --border-radius: 12px;
          --transition: all 0.2s ease;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;900&display=swap');

        body {
          font-family: var(--font-body);
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--bg-primary);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* TYPOGRAPHY */
        .display-1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .display-2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.015em;
        }

        .headline {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 600;
          line-height: 1.3;
        }

        .title {
          font-family: var(--font-body);
          font-size: 1.375rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .subtitle {
          font-family: var(--font-body);
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .body-large {
          font-size: 1.125rem;
          line-height: 1.7;
        }

        .body {
          font-size: 1rem;
          line-height: 1.6;
        }

        .caption {
          font-size: 0.875rem;
          line-height: 1.4;
          color: var(--text-tertiary);
        }

        .overline {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
        }

        /* UTILITY CLASSES */
        .text-gradient {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mb-xs { margin-bottom: var(--space-xs); }
        .mb-sm { margin-bottom: var(--space-sm); }
        .mb-md { margin-bottom: var(--space-md); }
        .mb-lg { margin-bottom: var(--space-lg); }
        .mb-xl { margin-bottom: var(--space-xl); }
        .mb-xxl { margin-bottom: var(--space-xxl); }

        .mt-xs { margin-top: var(--space-xs); }
        .mt-sm { margin-top: var(--space-sm); }
        .mt-md { margin-top: var(--space-md); }
        .mt-lg { margin-top: var(--space-lg); }
        .mt-xl { margin-top: var(--space-xl); }
        .mt-xxl { margin-top: var(--space-xxl); }

        /* LAYOUT */
        .container {
          width: 100%;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
        }

        .content-container {
          max-width: var(--content-width);
          margin: 0 auto;
        }

        /* HEADER */
        .editorial-header {
          padding: var(--space-md) 0;
          border-bottom: 1px solid var(--border-light);
          background: var(--bg-primary);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: var(--space-lg);
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--accent-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .theme-toggle {
          background: none;
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .theme-toggle:hover {
          border-color: var(--accent-primary);
        }

        /* HERO */
        .hero {
          padding: var(--space-xxl) 0 var(--space-xl);
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-md) var(--space-xl);
          background: var(--accent-primary);
          color: white;
          text-decoration: none;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: var(--transition);
        }

        .cta-button:hover {
          background: var(--accent-secondary);
          transform: translateY(-1px);
        }

        /* FEATURED POST */
        .featured-post {
          padding: var(--space-xl) 0;
          background: var(--bg-secondary);
        }

        .featured-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
          align-items: center;
        }

        .featured-label {
          margin-bottom: var(--space-sm);
        }

        .featured-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .meta-separator {
          color: var(--text-tertiary);
        }

        .read-more {
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }

        .read-more:hover {
          color: var(--accent-secondary);
        }

        .featured-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: var(--border-radius);
        }

        /* STORIES */
        .stories {
          padding: var(--space-xxl) 0;
        }

        .stories-header {
          margin-bottom: var(--space-xl);
          text-align: center;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          margin-top: var(--space-lg);
          flex-wrap: wrap;
        }

        .filter-button {
          padding: var(--space-xs) var(--space-md);
          background: transparent;
          border: 1px solid var(--border-medium);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-button:hover,
        .filter-button.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-xl);
        }

        .story-card {
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: var(--transition);
          border: 1px solid var(--border-light);
        }

        .story-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .story-card a {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .card-image {
          position: relative;
          height: 200px;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-category {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
          background: rgba(0, 102, 204, 0.9);
          color: white;
          padding: var(--space-xs) var(--space-sm);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-content {
          padding: var(--space-lg);
        }

        .card-title {
          margin-bottom: var(--space-sm);
          line-height: 1.4;
        }

        .card-excerpt {
          color: var(--text-secondary);
          margin-bottom: var(--space-md);
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--space-xxl);
        }

        .load-more {
          margin-top: var(--space-lg);
          padding: var(--space-md) var(--space-xl);
          background: var(--accent-primary);
          color: white;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .load-more:hover {
          background: var(--accent-secondary);
        }

        /* NEWSLETTER */
        .newsletter {
          padding: var(--space-xxl) 0;
          background: var(--bg-secondary);
          text-align: center;
        }

        .newsletter-form {
          display: flex;
          max-width: 400px;
          margin: 0 auto var(--space-md);
          gap: var(--space-sm);
        }

        .newsletter-input {
          flex: 1;
          padding: var(--space-md);
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          font-size: 1rem;
        }

        .newsletter-button {
          padding: var(--space-md) var(--space-lg);
          background: var(--accent-primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
        }

        .newsletter-button:hover {
          background: var(--accent-secondary);
        }

        .newsletter-disclaimer {
          text-align: center;
        }

        /* FOOTER */
        .footer {
          padding: var(--space-xl) 0;
          background: var(--text-primary);
          color: white;
          text-align: center;
        }

        .footer-links {
          margin-top: var(--space-md);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }

        .footer-link {
          color: #cccccc;
          text-decoration: none;
          transition: var(--transition);
        }

        .footer-link:hover {
          color: white;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }

          .featured-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding: 0 var(--space-md);
            margin: var(--space-lg) -var(--space-md) 0;
          }

          .stories-grid {
            grid-template-columns: 1fr;
          }

          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  let posts = []
  let featuredPost = null

  try {
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory)
      
      posts = filenames
        .filter(name => name.endsWith('.md'))
        .map(name => {
          const filePath = path.join(postsDirectory, name)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const { data } = matter(fileContents)
          
          return {
            slug: name.replace(/\.md$/, ''),
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            category: data.category,
            readTime: data.readTime,
            image: data.image,
            featured: data.featured || false
          }
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))

      // Get featured post (first one marked as featured, or most recent)
      featuredPost = posts.find(post => post.featured) || posts[0]
    }
  } catch (error) {
    console.error('Error loading posts:', error)
  }

  return {
    props: {
      posts: posts.slice(0, 9), // Show max 9 posts on homepage
      featuredPost
    }
  }
}