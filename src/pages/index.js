import Head from 'next/head'
import { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ProfessionalCyberNews({ posts, featuredPost }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Subtle matrix rain effect - much more subtle for professional look
    const canvas = document.getElementById('matrix-bg')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const matrix = "01"
      const matrixChars = matrix.split("")
      
      const fontSize = 12
      const columns = canvas.width / fontSize
      const drops = []
      
      for(let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize)
      }
      
      function drawMatrix() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.02)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = 'rgba(0, 255, 65, 0.06)'
        ctx.font = fontSize + 'px monospace'
        
        for(let i = 0; i < drops.length; i++) {
          if (Math.random() > 0.99) { // Much slower, more subtle
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
            ctx.fillText(text, i * fontSize, drops[i] * fontSize)
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0
            }
            drops[i]++
          }
        }
      }
      
      const matrixInterval = setInterval(drawMatrix, 150) // Much slower
      
      return () => clearInterval(matrixInterval)
    }
  }, [])

  const categories = [
    { name: 'All Stories', slug: 'all' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Infrastructure', slug: 'infrastructure' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Networking', slug: 'networking' },
    { name: 'AI & ML', slug: 'ai' }
  ]

  return (
    <>
      <Head>
        <title>CyberIntel Daily | Professional Cybersecurity & Technology Intelligence</title>
        <meta name="description" content="Professional cybersecurity and technology intelligence for IT professionals. Daily coverage of threats, vulnerabilities, infrastructure, and emerging tech trends." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            "name": "CyberIntel Daily",
            "url": "https://blog.itsmillan.com",
            "logo": "https://blog.itsmillan.com/logo.png",
            "author": {
              "@type": "Person",
              "name": "Alexis Millán"
            },
            "description": "Professional cybersecurity and technology intelligence publication"
          })
        }} />
      </Head>

      <div className="cyber-news-site">
        {/* Subtle Matrix Background */}
        <canvas 
          id="matrix-bg" 
          className="fixed inset-0 pointer-events-none opacity-20 z-0"
        ></canvas>

        {/* TOP BAR */}
        <div className="top-bar">
          <div className="container">
            <div className="top-content">
              <div className="date-info">
                <span className="today-date">
                  {format(new Date(), 'EEEE, MMMM do, yyyy', { locale: es })}
                </span>
              </div>
              <div className="quick-links">
                <a href="/rss" className="top-link">RSS</a>
                <a href="mailto:alexis@itsmillan.com" className="top-link">Contact</a>
                <a href="https://twitter.com/itsmillan" className="top-link" target="_blank">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <header className="main-header">
          <div className="container">
            <div className="header-content">
              <div className="brand">
                <h1 className="site-title">
                  <a href="/">CyberIntel <span className="title-accent">Daily</span></a>
                </h1>
                <p className="site-tagline">Professional Cybersecurity & Technology Intelligence</p>
              </div>
              
              <nav className="main-nav">
                <ul className="nav-list">
                  <li><a href="/" className="nav-item active">Home</a></li>
                  <li><a href="/categories/cybersecurity" className="nav-item">Cybersecurity</a></li>
                  <li><a href="/categories/infrastructure" className="nav-item">Infrastructure</a></li>
                  <li><a href="/categories/technology" className="nav-item">Technology</a></li>
                  <li><a href="/about" className="nav-item">About</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* BREAKING NEWS BAR (if needed) */}
        <div className="breaking-bar">
          <div className="container">
            <div className="breaking-content">
              <span className="breaking-label">LATEST</span>
              <span className="breaking-text">
                Quantum encryption breakthrough threatens current RSA infrastructure
              </span>
            </div>
          </div>
        </div>

        {/* FEATURED STORY */}
        {featuredPost && (
          <section className="featured-section">
            <div className="container">
              <div className="featured-story">
                <div className="story-image">
                  <img 
                    src={featuredPost.image || '/images/default-tech.jpg'} 
                    alt={featuredPost.title}
                  />
                  <div className="category-badge">{featuredPost.category}</div>
                </div>
                
                <div className="story-content">
                  <div className="story-meta">
                    <span className="meta-category">{featuredPost.category}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-date">
                      {format(new Date(featuredPost.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="meta-separator">•</span>
                    <span className="meta-reading">{featuredPost.readTime} read</span>
                  </div>
                  
                  <h2 className="story-title">
                    <a href={`/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </a>
                  </h2>
                  
                  <p className="story-excerpt">{featuredPost.excerpt}</p>
                  
                  <a href={`/${featuredPost.slug}`} className="read-more-btn">
                    Read Full Story
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CATEGORY FILTER */}
        <section className="filter-section">
          <div className="container">
            <div className="filter-bar">
              <h3 className="filter-title">Browse by Category</h3>
              <div className="category-filters">
                {categories.map((category, index) => (
                  <button
                    key={category.slug}
                    className={`category-btn ${index === 0 ? 'active' : ''}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST STORIES */}
        <section className="latest-section">
          <div className="container">
            <div className="section-header">
              <h3 className="section-title">Latest Intelligence</h3>
            </div>

            <div className="stories-layout">
              {posts && posts.length > 0 ? posts.map((post, index) => (
                <article key={post.slug} className="news-card">
                  <div className="card-image">
                    <img 
                      src={post.image || '/images/default-tech.jpg'} 
                      alt={post.title}
                    />
                    <div className="image-category">{post.category}</div>
                  </div>
                  
                  <div className="card-content">
                    <div className="article-meta">
                      <span className="meta-category">{post.category}</span>
                      <span className="meta-date">
                        {format(new Date(post.date), 'MMM dd')}
                      </span>
                    </div>
                    
                    <h4 className="article-title">
                      <a href={`/${post.slug}`}>
                        {post.title}
                      </a>
                    </h4>
                    
                    <p className="article-excerpt">{post.excerpt}</p>
                    
                    <div className="article-footer">
                      <span className="reading-time">{post.readTime}</span>
                      <a href={`/${post.slug}`} className="read-link">
                        Read More
                      </a>
                    </div>
                  </div>
                </article>
              )) : (
                <div className="no-content">
                  <div className="no-content-icon">📰</div>
                  <h4>No Stories Available</h4>
                  <p>Check back soon for the latest cybersecurity and technology intelligence.</p>
                  <button 
                    className="refresh-btn"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Page
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* NEWSLETTER SIGNUP */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-info">
                <h3 className="newsletter-title">Stay Informed</h3>
                <p className="newsletter-desc">
                  Get daily cybersecurity and technology intelligence delivered to your inbox. 
                  No spam, just professional insights for IT professionals.
                </p>
                <ul className="newsletter-benefits">
                  <li>Daily threat intelligence summaries</li>
                  <li>Breaking security vulnerabilities</li>
                  <li>Infrastructure and networking updates</li>
                  <li>Technology trend analysis</li>
                </ul>
              </div>
              
              <div className="newsletter-form-container">
                <form className="newsletter-form">
                  <div className="form-group">
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="email-input"
                      required
                    />
                    <button type="submit" className="subscribe-btn">
                      Subscribe
                    </button>
                  </div>
                  <p className="form-disclaimer">
                    Secure subscription. Unsubscribe anytime. No spam policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <h4 className="footer-title">CyberIntel Daily</h4>
                <p className="footer-desc">
                  Professional cybersecurity and technology intelligence publication. 
                  Providing IT professionals with the latest threat intelligence, 
                  infrastructure updates, and technology analysis.
                </p>
              </div>
              
              <div className="footer-links">
                <div className="link-group">
                  <h5 className="link-title">Content</h5>
                  <ul>
                    <li><a href="/categories/cybersecurity">Cybersecurity</a></li>
                    <li><a href="/categories/infrastructure">Infrastructure</a></li>
                    <li><a href="/categories/technology">Technology</a></li>
                    <li><a href="/archive">Archive</a></li>
                  </ul>
                </div>
                
                <div className="link-group">
                  <h5 className="link-title">About</h5>
                  <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                  </ul>
                </div>
                
                <div className="link-group">
                  <h5 className="link-title">Connect</h5>
                  <ul>
                    <li><a href="/rss">RSS Feed</a></li>
                    <li><a href="https://twitter.com/itsmillan" target="_blank">Twitter</a></li>
                    <li><a href="https://linkedin.com/in/amillan" target="_blank">LinkedIn</a></li>
                    <li><a href="mailto:alexis@itsmillan.com">Email</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p className="copyright">
                © 2026 CyberIntel Daily. Published by <span className="author-name">Alexis Millán</span>.
                Independent cybersecurity and technology intelligence.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        /* RESET & BASE */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          /* Professional Dark Theme Colors */
          --bg-primary: #0d1117;
          --bg-secondary: #161b22;
          --bg-tertiary: #21262d;
          --bg-surface: #1c2128;
          
          /* Text Colors */
          --text-primary: #e6edf3;
          --text-secondary: #7d8590;
          --text-tertiary: #656d76;
          --text-muted: #484f58;
          
          /* Brand Colors */
          --accent-primary: #00d26a;
          --accent-secondary: #00b959;
          --accent-tertiary: #00a651;
          
          /* Semantic Colors */
          --border-primary: #30363d;
          --border-secondary: #21262d;
          --border-accent: rgba(0, 210, 106, 0.3);
          
          /* Professional Typography */
          --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
          
          /* Spacing Scale */
          --space-xs: 0.25rem;
          --space-sm: 0.5rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-2xl: 3rem;
          --space-3xl: 4rem;
          
          /* Layout */
          --container-max: 1200px;
          --border-radius: 8px;
          --border-radius-lg: 12px;
          --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        body {
          font-family: var(--font-primary);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .cyber-news-site {
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        /* TOP BAR */
        .top-bar {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
          padding: var(--space-sm) 0;
        }

        .top-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .today-date {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .quick-links {
          display: flex;
          gap: var(--space-lg);
        }

        .top-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .top-link:hover {
          color: var(--accent-primary);
        }

        /* MAIN HEADER */
        .main-header {
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-primary);
          padding: var(--space-xl) 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .site-title {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .site-title a {
          color: var(--text-primary);
          text-decoration: none;
        }

        .title-accent {
          color: var(--accent-primary);
        }

        .site-tagline {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          margin-top: var(--space-xs);
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: var(--space-xl);
        }

        .nav-item {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
          position: relative;
        }

        .nav-item:hover,
        .nav-item.active {
          color: var(--text-primary);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-primary);
        }

        /* BREAKING BAR */
        .breaking-bar {
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: var(--space-sm) 0;
        }

        .breaking-content {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .breaking-label {
          background: var(--bg-primary);
          color: var(--accent-primary);
          padding: var(--space-xs) var(--space-sm);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          border-radius: var(--border-radius);
        }

        .breaking-text {
          font-weight: 600;
          animation: scroll-text 30s linear infinite;
        }

        /* FEATURED SECTION */
        .featured-section {
          background: var(--bg-secondary);
          padding: var(--space-3xl) 0;
        }

        .featured-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: center;
        }

        .story-image {
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
        }

        .story-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .category-badge {
          position: absolute;
          top: var(--space-lg);
          left: var(--space-lg);
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: var(--space-sm) var(--space-md);
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          border-radius: var(--border-radius);
        }

        .story-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
          font-size: 0.875rem;
        }

        .meta-category {
          color: var(--accent-primary);
          font-weight: 600;
          text-transform: uppercase;
        }

        .meta-separator {
          color: var(--text-tertiary);
        }

        .meta-date,
        .meta-reading {
          color: var(--text-secondary);
        }

        .story-title {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: var(--space-lg);
        }

        .story-title a {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .story-title a:hover {
          color: var(--accent-primary);
        }

        .story-excerpt {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.7;
          margin-bottom: var(--space-xl);
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: var(--space-md) var(--space-xl);
          text-decoration: none;
          font-weight: 600;
          border-radius: var(--border-radius);
          transition: all 0.2s;
        }

        .read-more-btn:hover {
          background: var(--accent-secondary);
          transform: translateY(-1px);
        }

        /* FILTER SECTION */
        .filter-section {
          background: var(--bg-tertiary);
          padding: var(--space-xl) 0;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .category-filters {
          display: flex;
          gap: var(--space-sm);
        }

        .category-btn {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-primary);
          padding: var(--space-sm) var(--space-lg);
          font-weight: 500;
          font-size: 0.875rem;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-btn:hover,
        .category-btn.active {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-color: var(--accent-primary);
        }

        /* LATEST SECTION */
        .latest-section {
          padding: var(--space-3xl) 0;
        }

        .section-header {
          margin-bottom: var(--space-2xl);
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          position: relative;
          padding-bottom: var(--space-md);
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: var(--accent-primary);
        }

        .stories-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-2xl);
        }

        .news-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          transition: all 0.2s;
        }

        .news-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s;
        }

        .news-card:hover .card-image img {
          transform: scale(1.05);
        }

        .image-category {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          background: rgba(0, 0, 0, 0.8);
          color: var(--accent-primary);
          padding: var(--space-xs) var(--space-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: var(--border-radius);
        }

        .card-content {
          padding: var(--space-xl);
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
          font-size: 0.8rem;
        }

        .article-title {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: var(--space-md);
        }

        .article-title a {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .article-title a:hover {
          color: var(--accent-primary);
        }

        .article-excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-lg);
        }

        .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .reading-time {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          font-family: var(--font-mono);
        }

        .read-link {
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          transition: color 0.2s;
        }

        .read-link:hover {
          color: var(--accent-secondary);
        }

        /* NO CONTENT */
        .no-content {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--space-3xl);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--border-radius-lg);
        }

        .no-content-icon {
          font-size: 3rem;
          margin-bottom: var(--space-lg);
        }

        .refresh-btn {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border: none;
          padding: var(--space-md) var(--space-xl);
          font-weight: 600;
          border-radius: var(--border-radius);
          cursor: pointer;
          margin-top: var(--space-lg);
          transition: background 0.2s;
        }

        .refresh-btn:hover {
          background: var(--accent-secondary);
        }

        /* NEWSLETTER SECTION */
        .newsletter-section {
          background: var(--bg-secondary);
          padding: var(--space-3xl) 0;
        }

        .newsletter-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: center;
        }

        .newsletter-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
        }

        .newsletter-desc {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--space-xl);
        }

        .newsletter-benefits {
          list-style: none;
          color: var(--text-secondary);
        }

        .newsletter-benefits li {
          position: relative;
          padding-left: var(--space-lg);
          margin-bottom: var(--space-sm);
        }

        .newsletter-benefits li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-weight: bold;
        }

        .newsletter-form {
          background: var(--bg-tertiary);
          padding: var(--space-2xl);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--border-primary);
        }

        .form-group {
          display: flex;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .email-input {
          flex: 1;
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          padding: var(--space-md);
          border-radius: var(--border-radius);
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .email-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .email-input::placeholder {
          color: var(--text-tertiary);
        }

        .subscribe-btn {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border: none;
          padding: var(--space-md) var(--space-xl);
          font-weight: 600;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: background 0.2s;
        }

        .subscribe-btn:hover {
          background: var(--accent-secondary);
        }

        .form-disclaimer {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          text-align: center;
        }

        /* FOOTER */
        .site-footer {
          background: var(--bg-primary);
          border-top: 1px solid var(--border-primary);
          padding: var(--space-3xl) 0 var(--space-xl);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-2xl);
          margin-bottom: var(--space-2xl);
        }

        .footer-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--space-md);
          color: var(--text-primary);
        }

        .footer-desc {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .link-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--space-md);
          color: var(--text-primary);
        }

        .link-group ul {
          list-style: none;
        }

        .link-group li {
          margin-bottom: var(--space-sm);
        }

        .link-group a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .link-group a:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-primary);
          padding-top: var(--space-lg);
        }

        .copyright {
          color: var(--text-secondary);
          text-align: center;
        }

        .author-name {
          color: var(--accent-primary);
          font-weight: 600;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .featured-story {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
          
          .newsletter-content {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 var(--space-md);
          }
          
          .header-content {
            flex-direction: column;
            gap: var(--space-lg);
            text-align: center;
          }
          
          .nav-list {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .filter-bar {
            flex-direction: column;
            gap: var(--space-lg);
            text-align: center;
          }
          
          .category-filters {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .stories-layout {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
          }
          
          .form-group {
            flex-direction: column;
          }
          
          .site-title {
            font-size: 2rem;
          }
          
          .story-title {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .top-content {
            flex-direction: column;
            gap: var(--space-sm);
          }
          
          .breaking-content {
            flex-direction: column;
            text-align: center;
            gap: var(--space-sm);
          }
          
          .nav-list {
            gap: var(--space-md);
          }
        }

        /* SMOOTH ANIMATIONS */
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
          
          .news-card,
          .nav-item,
          .category-btn,
          .read-more-btn {
            transition: all 0.2s ease-out;
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