import Head from 'next/head'
import { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Home({ posts, featuredPost }) {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => { setIsLoaded(true) }, [])

  return (
    <>
      <Head>
        <title>N0V4 Feed | Cybersecurity & Tech Intelligence</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2269060435520772" crossOrigin="anonymous"></script>
        <meta name="description" content="Professional cybersecurity and technology intelligence. Daily analysis of threats, infrastructure, and emerging tech." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="site">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <a href="/" className="logo">
                <span className="logo-accent">N0V4</span> Feed
              </a>
              <nav className="nav">
                <a href="/" className="nav-link active">Home</a>
                <a href="/about" className="nav-link">About</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <section className="featured">
            <div className="container">
              <div className="featured-card">
                <div className="featured-img">
                  <img src={featuredPost.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop'} alt={featuredPost.title} />
                  <div className="featured-badge">LATEST</div>
                </div>
                <div className="featured-body">
                  <span className="tag">{featuredPost.category || 'Intel'}</span>
                  <h1 className="featured-title">
                    <a href={`/${featuredPost.slug}/`}>{featuredPost.title}</a>
                  </h1>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="meta">
                    <span>{format(new Date(featuredPost.date), "dd 'de' MMMM, yyyy", { locale: es })}</span>
                    <span className="meta-sep">•</span>
                    <span>{featuredPost.readTime || '5 min'}</span>
                    <span className="meta-sep">•</span>
                    <span>Alexis Millán</span>
                  </div>
                  <a href={`/${featuredPost.slug}/`} className="read-btn">
                    Read Analysis →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ad Banner */}
        <section className="ad-section">
          <div className="container">
            <div className="ad-banner" id="ad-top">
              <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-2269060435520772" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="posts-section">
          <div className="container">
            <h2 className="section-title">
              <span className="section-accent">//</span> All Reports
            </h2>
            <div className="posts-grid">
              {posts && posts.length > 0 ? posts.map(post => (
                <article key={post.slug} className="post-card">
                  <a href={`/${post.slug}/`}>
                    <div className="card-img">
                      <img src={post.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop'} alt={post.title} />
                      <span className="card-tag">{post.category || 'Intel'}</span>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{post.title}</h3>
                      <p className="card-excerpt">{post.excerpt}</p>
                      <div className="card-meta">
                        <span>{format(new Date(post.date), 'dd MMM yyyy', { locale: es })}</span>
                        <span className="meta-sep">•</span>
                        <span>{post.readTime || '5 min'}</span>
                      </div>
                    </div>
                  </a>
                </article>
              )) : (
                <div className="empty">
                  <p>No reports available yet. Check back soon.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ad Banner Bottom */}
        <section className="ad-section">
          <div className="container">
            <div className="ad-banner" id="ad-bottom">
              <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-2269060435520772" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="logo-accent">N0V4</span> Feed
              </div>
              <p className="footer-copy">© 2026 Alexis Millán. Professional cybersecurity intelligence.</p>
              <div className="footer-links">
                <a href="/about">About</a>
                <a href="https://twitter.com/itsmillan" target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
          --bg: #0a0a0a;
          --bg-card: #111318;
          --bg-card-hover: #161b22;
          --border: #1e2430;
          --border-hover: #00ff41;
          --green: #00ff41;
          --green-dim: #00cc33;
          --green-dark: #003d10;
          --text: #e6edf3;
          --text-dim: #8b949e;
          --text-muted: #484f58;
          --font-mono: 'JetBrains Mono', monospace;
          --font-sans: 'Inter', -apple-system, sans-serif;
          --container: 1100px;
          --radius: 8px;
        }

        body {
          font-family: var(--font-sans);
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; height: auto; display: block; }

        .container {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 20px;
        }

        /* HEADER */
        .header {
          border-bottom: 1px solid var(--border);
          padding: 16px 0;
          position: sticky;
          top: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-family: var(--font-mono);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text);
        }
        .logo-accent { color: var(--green); }
        .nav { display: flex; gap: 24px; }
        .nav-link {
          font-size: 0.9rem;
          color: var(--text-dim);
          transition: color 0.2s;
          font-weight: 500;
        }
        .nav-link:hover, .nav-link.active { color: var(--green); }

        /* FEATURED */
        .featured { padding: 40px 0; }
        .featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .featured-card:hover { border-color: var(--green); }
        .featured-img {
          position: relative;
          height: 100%;
          min-height: 300px;
        }
        .featured-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--green);
          color: #000;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .featured-body { padding: 32px 32px 32px 0; display: flex; flex-direction: column; justify-content: center; }
        .tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--green);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid var(--green-dark);
          padding: 4px 10px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 16px;
          width: fit-content;
        }
        .featured-title {
          font-family: var(--font-sans);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 12px;
        }
        .featured-title a:hover { color: var(--green); }
        .featured-excerpt {
          color: var(--text-dim);
          font-size: 0.95rem;
          margin-bottom: 16px;
          line-height: 1.7;
        }
        .meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .meta-sep { color: var(--text-muted); }
        .read-btn {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--green);
          font-weight: 600;
          transition: all 0.2s;
        }
        .read-btn:hover { text-decoration: underline; }

        /* POSTS */
        .posts-section { padding: 40px 0 60px; }
        .section-title {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--text-dim);
          margin-bottom: 24px;
          font-weight: 500;
        }
        .section-accent { color: var(--green); }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .post-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: all 0.3s;
        }
        .post-card:hover {
          border-color: var(--green);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 255, 65, 0.05);
        }
        .post-card a { display: block; }
        .card-img {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        .card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .post-card:hover .card-img img { transform: scale(1.03); }
        .card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          background: rgba(0, 255, 65, 0.15);
          color: var(--green);
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .card-body { padding: 20px; }
        .card-title {
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .post-card:hover .card-title { color: var(--green); }
        .card-excerpt {
          font-size: 0.85rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-dim);
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 32px 0;
        }
        .footer-inner { text-align: center; }
        .footer-brand {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .footer-copy {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .footer-links { display: flex; justify-content: center; gap: 20px; }
        .footer-links a {
          font-size: 0.8rem;
          color: var(--text-dim);
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--green); }

        /* ADS */
        .ad-section { padding: 20px 0; }
        .ad-banner {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
          text-align: center;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.7rem;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .featured-card {
            grid-template-columns: 1fr;
          }
          .featured-img { min-height: 200px; }
          .featured-body { padding: 24px; }
          .posts-grid {
            grid-template-columns: 1fr;
          }
          .nav { gap: 16px; }
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
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            date: data.date || new Date().toISOString(),
            category: data.category || 'General',
            readTime: data.readTime || '5 min',
            image: data.image || null,
            featured: data.featured || false
          }
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))

      featuredPost = posts.find(p => p.featured) || posts[0] || null
    }
  } catch (error) {
    console.error('Error loading posts:', error)
  }

  return { props: { posts, featuredPost } }
}
