import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { format } from 'date-fns'

export default function ArticlePage({ post }) {
  if (!post) {
    return (
      <div className="error-page">
        <div className="container">
          <div className="error-content">
            <h1>Article Not Found</h1>
            <p>The requested cybersecurity intelligence article could not be found.</p>
            <a href="/" className="return-home">Return to Homepage</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} | CyberIntel Daily</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image || '/images/default-tech.jpg'} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Alexis Millán" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={`https://blog.itsmillan.com/${post.slug}/`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": "Alexis Millán"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CyberIntel Daily",
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
            },
            "image": post.image || '/images/default-tech.jpg'
          })
        }} />
      </Head>

      <div className="article-page">
        {/* HEADER */}
        <header className="article-header">
          <div className="container">
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span className="breadcrumb-separator">/</span>
              <a href={`/categories/${post.category?.toLowerCase()}`} className="breadcrumb-link">
                {post.category}
              </a>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Article</span>
            </nav>
            
            <div className="site-brand">
              <a href="/">
                <h1 className="brand-title">CyberIntel <span className="brand-accent">Daily</span></h1>
              </a>
            </div>
          </div>
        </header>

        {/* ARTICLE HERO */}
        <section className="article-hero">
          <div className="container">
            <div className="hero-content">
              <div className="article-meta">
                <span className="category-tag">{post.category}</span>
                <span className="meta-separator">•</span>
                <time className="publish-date" dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </time>
                <span className="meta-separator">•</span>
                <span className="reading-time">{post.readTime || '5 min read'}</span>
              </div>
              
              <h1 className="article-title">{post.title}</h1>
              
              {post.excerpt && (
                <p className="article-excerpt">{post.excerpt}</p>
              )}
              
              <div className="author-info">
                <div className="author-details">
                  <span className="author-name">By Alexis Millán</span>
                  <span className="author-title">Cybersecurity Intelligence Analyst</span>
                </div>
                
                <div className="article-actions">
                  <button className="share-btn" onClick={() => {
                    if (typeof window !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: post.title,
                        url: window.location.href
                      })
                    }
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 12v4a2 2 0 002 2h8a2 2 0 002-2v-4M12 8l-4-4m0 0L4 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED IMAGE */}
        {post.image && (
          <section className="featured-image">
            <div className="container">
              <div className="image-container">
                <img src={post.image} alt={post.title} />
              </div>
            </div>
          </section>
        )}

        {/* ARTICLE CONTENT */}
        <main className="article-main">
          <div className="container">
            <div className="content-layout">
              <article className="article-content">
                <div 
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
                />
                
                {/* TAGS */}
                {post.tags && post.tags.length > 0 && (
                  <div className="article-tags">
                    <h4 className="tags-title">Related Topics</h4>
                    <div className="tags-list">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* SHARE SECTION */}
                <div className="article-share">
                  <h4 className="share-title">Share This Intelligence</h4>
                  <div className="share-buttons">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}`)}&via=itsmillan`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-button twitter"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                      Twitter
                    </a>
                    
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-button linkedin"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    
                    <button 
                      className="share-button copy"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          navigator.clipboard.writeText(window.location.href).then(() => {
                            alert('Link copied to clipboard!')
                          }).catch(() => {
                            alert('Failed to copy link')
                          })
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy Link
                    </button>
                  </div>
                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="article-sidebar">
                
                {/* NEWSLETTER SIGNUP */}
                <div className="sidebar-card">
                  <h3 className="card-title">Stay Updated</h3>
                  <p className="card-desc">
                    Get the latest cybersecurity intelligence delivered to your inbox.
                  </p>
                  <form className="newsletter-form">
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="newsletter-input"
                      required 
                    />
                    <button type="submit" className="newsletter-btn">
                      Subscribe
                    </button>
                  </form>
                  <p className="form-note">No spam. Professional insights only.</p>
                </div>

                {/* RELATED ARTICLES */}
                <div className="sidebar-card">
                  <h3 className="card-title">Related Intelligence</h3>
                  <div className="related-articles">
                    <a href="/" className="related-item">
                      <h4 className="related-title">Latest Cybersecurity Threats</h4>
                      <span className="related-date">2 days ago</span>
                    </a>
                    <a href="/" className="related-item">
                      <h4 className="related-title">Infrastructure Security Updates</h4>
                      <span className="related-date">4 days ago</span>
                    </a>
                    <a href="/" className="related-item">
                      <h4 className="related-title">Technology Trend Analysis</h4>
                      <span className="related-date">1 week ago</span>
                    </a>
                  </div>
                </div>

                {/* AUTHOR INFO */}
                <div className="sidebar-card">
                  <h3 className="card-title">About the Author</h3>
                  <div className="author-card">
                    <div className="author-avatar">AM</div>
                    <div className="author-info">
                      <h4 className="author-name">Alexis Millán</h4>
                      <p className="author-bio">
                        Cybersecurity professional and technology analyst. 
                        Specializes in infrastructure security, threat intelligence, 
                        and emerging technology trends.
                      </p>
                      <div className="author-links">
                        <a href="https://twitter.com/itsmillan" target="_blank" className="author-link">
                          Twitter
                        </a>
                        <a href="https://linkedin.com/in/amillan" target="_blank" className="author-link">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* NEWSLETTER CTA */}
        <section className="newsletter-cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Get Professional Cybersecurity Intelligence</h2>
              <p className="cta-desc">
                Join IT professionals who rely on CyberIntel Daily for the latest 
                threat intelligence, security updates, and technology analysis.
              </p>
              <form className="cta-form">
                <input 
                  type="email" 
                  placeholder="Enter your professional email"
                  className="cta-input"
                  required
                />
                <button type="submit" className="cta-button">
                  Get Daily Intelligence
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="article-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-nav">
                <a href="/">← Back to Intelligence Feed</a>
                <a href="/about">About CyberIntel Daily</a>
                <a href="mailto:alexis@itsmillan.com">Contact</a>
              </div>
              <p className="footer-copyright">
                © 2026 CyberIntel Daily. Published by <span className="author-highlight">Alexis Millán</span>. 
                Professional cybersecurity intelligence.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        /* RESET & FONTS */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          
          --color-bg-primary: #0a0a0a;
          --color-bg-secondary: #0d1117;
          --color-bg-tertiary: #161b22;
          --color-green-bright: #00ff41;
          --color-green-dark: #00cc33;
          --color-green-dim: rgba(0, 255, 65, 0.3);
          --color-text-primary: #ffffff;
          --color-text-secondary: #8b949e;
          --color-text-dim: #6e7681;
          --color-border: #30363d;
          --color-border-glow: rgba(0, 255, 65, 0.3);
          --color-red: #ff4444;
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
          
          /* Semantic Colors */
          --border-primary: #30363d;
          --border-secondary: #21262d;
          
          /* Professional Typography */
          --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
          
          /* Spacing */
          --space-xs: 0.25rem;
          --space-sm: 0.5rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-2xl: 3rem;
          --space-3xl: 4rem;
          
          /* Layout */
          --container-max: 1200px;
          --content-max: 800px;
          --sidebar-width: 320px;
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

        .article-page {
          min-height: 100vh;
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        /* ARTICLE HEADER */
        .article-header {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
          padding: var(--space-lg) 0;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          margin-bottom: var(--space-lg);
        }

        .breadcrumb-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb-link:hover {
          color: var(--accent-primary);
        }

        .breadcrumb-separator {
          margin: 0 var(--space-sm);
          color: var(--text-muted);
        }

        .breadcrumb-current {
          color: var(--text-primary);
        }

        .brand-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .brand-accent {
          color: var(--accent-primary);
        }

        .site-brand a {
          text-decoration: none;
        }

        /* ARTICLE HERO */
        .article-hero {
          background: var(--bg-primary);
          padding: var(--space-3xl) 0;
        }

        .hero-content {
          max-width: var(--content-max);
          margin: 0 auto;
          text-align: center;
        }

        .article-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
          font-size: 0.875rem;
        }

        .category-tag {
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: var(--space-xs) var(--space-md);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          border-radius: 4px;
        }

        .meta-separator {
          color: var(--text-tertiary);
        }

        .publish-date,
        .reading-time {
          color: var(--text-secondary);
        }

        .article-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--space-xl);
          color: var(--text-primary);
        }

        .article-excerpt {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-2xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .author-info {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-xl);
        }

        .author-name {
          font-weight: 600;
          color: var(--text-primary);
          display: block;
        }

        .author-title {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .article-actions {
          display: flex;
          gap: var(--space-md);
        }

        .share-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: transparent;
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
          padding: var(--space-sm) var(--space-lg);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .share-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* FEATURED IMAGE */
        .featured-image {
          background: var(--bg-secondary);
          padding: var(--space-xl) 0;
        }

        .image-container {
          max-width: var(--content-max);
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        .image-container img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ARTICLE MAIN */
        .article-main {
          background: var(--bg-primary);
          padding: var(--space-3xl) 0;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr var(--sidebar-width);
          gap: var(--space-3xl);
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .article-content {
          max-width: none;
        }

        /* PROSE STYLES */
        .prose {
          color: var(--text-primary);
          max-width: none;
          line-height: 1.8;
        }

        .prose h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: var(--space-3xl) 0 var(--space-xl) 0;
          color: var(--text-primary);
          border-bottom: 2px solid var(--accent-primary);
          padding-bottom: var(--space-md);
        }

        .prose h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin: var(--space-2xl) 0 var(--space-lg) 0;
          color: var(--text-primary);
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: var(--space-xl) 0 var(--space-md) 0;
          color: var(--text-primary);
        }

        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: var(--space-lg) 0 var(--space-sm) 0;
          color: var(--text-primary);
        }

        .prose p {
          margin: var(--space-lg) 0;
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .prose ul, .prose ol {
          margin: var(--space-lg) 0;
          padding-left: var(--space-xl);
        }

        .prose li {
          margin: var(--space-sm) 0;
          font-size: 1.125rem;
        }

        .prose strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .prose em {
          color: var(--text-secondary);
        }

        .prose blockquote {
          border-left: 4px solid var(--accent-primary);
          margin: var(--space-xl) 0;
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border-radius: 0 8px 8px 0;
          font-style: italic;
        }

        .prose code {
          background: var(--bg-secondary);
          color: var(--accent-primary);
          padding: var(--space-xs) var(--space-sm);
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.9em;
        }

        .prose pre {
          background: var(--bg-tertiary);
          padding: var(--space-lg);
          border-radius: 8px;
          overflow-x: auto;
          margin: var(--space-xl) 0;
          border: 1px solid var(--border-primary);
        }

        .prose pre code {
          background: transparent;
          padding: 0;
        }

        .prose a {
          color: var(--accent-primary);
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: text-decoration-color 0.2s;
        }

        .prose a:hover {
          text-decoration-color: var(--accent-primary);
        }

        /* ARTICLE TAGS */
        .article-tags {
          margin: var(--space-3xl) 0;
          padding: var(--space-xl);
          background: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border-primary);
        }

        .tags-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: var(--space-md);
          color: var(--text-primary);
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }

        .tag {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          padding: var(--space-sm) var(--space-md);
          border-radius: 20px;
          font-size: 0.875rem;
          border: 1px solid var(--border-primary);
          transition: all 0.2s;
        }

        .tag:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* ARTICLE SHARE */
        .article-share {
          margin: var(--space-3xl) 0;
          padding: var(--space-xl);
          background: var(--bg-secondary);
          border-radius: 12px;
          text-align: center;
        }

        .share-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
        }

        .share-buttons {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
        }

        .share-button {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-lg);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .share-button.twitter {
          background: #1da1f2;
          color: white;
        }

        .share-button.linkedin {
          background: #0077b5;
          color: white;
        }

        .share-button.copy {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-primary);
        }

        .share-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* SIDEBAR */
        .article-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .sidebar-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: var(--space-xl);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--space-md);
          color: var(--text-primary);
        }

        .card-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-lg);
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .newsletter-input {
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          padding: var(--space-md);
          border-radius: 6px;
          font-size: 1rem;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .newsletter-input::placeholder {
          color: var(--text-tertiary);
        }

        .newsletter-btn {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border: none;
          padding: var(--space-md);
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .newsletter-btn:hover {
          background: var(--accent-secondary);
        }

        .form-note {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          text-align: center;
          margin-top: var(--space-sm);
        }

        /* RELATED ARTICLES */
        .related-articles {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .related-item {
          text-decoration: none;
          padding: var(--space-md);
          border-radius: 8px;
          transition: background 0.2s;
        }

        .related-item:hover {
          background: var(--bg-tertiary);
        }

        .related-title {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
          margin-bottom: var(--space-xs);
        }

        .related-date {
          color: var(--text-tertiary);
          font-size: 0.875rem;
        }

        /* AUTHOR CARD */
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
          font-weight: 700;
          color: var(--bg-primary);
          flex-shrink: 0;
        }

        .author-bio {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-md);
          font-size: 0.9rem;
        }

        .author-links {
          display: flex;
          gap: var(--space-md);
        }

        .author-link {
          color: var(--accent-primary);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }

        .author-link:hover {
          color: var(--accent-secondary);
        }

        /* NEWSLETTER CTA */
        .newsletter-cta {
          background: var(--bg-secondary);
          padding: var(--space-3xl) 0;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
        }

        .cta-desc {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--space-xl);
        }

        .cta-form {
          display: flex;
          gap: var(--space-md);
          max-width: 400px;
          margin: 0 auto;
        }

        .cta-input {
          flex: 1;
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          padding: var(--space-md);
          border-radius: 6px;
          font-size: 1rem;
        }

        .cta-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .cta-button {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border: none;
          padding: var(--space-md) var(--space-xl);
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }

        .cta-button:hover {
          background: var(--accent-secondary);
        }

        /* FOOTER */
        .article-footer {
          background: var(--bg-primary);
          border-top: 1px solid var(--border-primary);
          padding: var(--space-2xl) 0;
        }

        .footer-content {
          text-align: center;
        }

        .footer-nav {
          display: flex;
          justify-content: center;
          gap: var(--space-xl);
          margin-bottom: var(--space-lg);
        }

        .footer-nav a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-nav a:hover {
          color: var(--accent-primary);
        }

        .footer-copyright {
          color: var(--text-tertiary);
        }

        .author-highlight {
          color: var(--accent-primary);
          font-weight: 600;
        }

        /* ERROR PAGE */
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
        }

        .error-content {
          text-align: center;
          max-width: 500px;
        }

        .error-content h1 {
          font-size: 2rem;
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
        }

        .error-content p {
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
        }

        .return-home {
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: var(--space-md) var(--space-xl);
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .return-home:hover {
          background: var(--accent-secondary);
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .content-layout {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 var(--space-md);
          }
          
          .author-info {
            flex-direction: column;
            gap: var(--space-lg);
          }
          
          .article-meta {
            flex-wrap: wrap;
          }
          
          .share-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-form {
            flex-direction: column;
            max-width: 100%;
          }
          
          .footer-nav {
            flex-direction: column;
            gap: var(--space-md);
          }
          
          .author-card {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .article-title {
            font-size: 2rem;
          }
          
          .breadcrumb {
            font-size: 0.8rem;
          }
          
          .sidebar-card {
            padding: var(--space-lg);
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog')
  
  let paths = []
  
  try {
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory)
      paths = filenames
        .filter(name => name.endsWith('.md'))
        .map(filename => ({
          params: { slug: filename.replace('.md', '') }
        }))
    }
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
    const postsDirectory = path.join(process.cwd(), 'content', 'blog')
    const filePath = path.join(postsDirectory, `${params.slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const post = {
      slug: params.slug,
      title: data.title || 'CyberIntel Article',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      category: data.category || 'Technology',
      tags: data.tags || [],
      image: data.image,
      readTime: data.readTime || '5 min read',
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