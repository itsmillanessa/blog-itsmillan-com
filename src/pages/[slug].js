import Head from 'next/head'
import { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { format } from 'date-fns'

export default function PostPage({ post }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [glitchText, setGlitchText] = useState('N0V4')

  useEffect(() => {
    setIsLoaded(true)
    
    // Matrix rain effect
    const canvas = document.getElementById('matrix-rain')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const matrix = "0101ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?"
      const matrixChars = matrix.split("")
      
      const fontSize = 14
      const columns = canvas.width / fontSize
      const drops = []
      
      for(let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize)
      }
      
      function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = '#00ff41'
        ctx.font = fontSize + 'px monospace'
        
        for(let i = 0; i < drops.length; i++) {
          const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
          ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.8 + 0.2})`
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)
          
          if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }
      
      const matrixInterval = setInterval(drawMatrix, 50)
      
      return () => clearInterval(matrixInterval)
    }
  }, [])

  // Glitch effect for logo
  useEffect(() => {
    const glitchOptions = ['N0V4', 'NOV4', 'N0VA', 'NOVA', 'N█V4', 'N0V█']
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchText(glitchOptions[Math.floor(Math.random() * glitchOptions.length)])
        setTimeout(() => setGlitchText('N0V4'), 100)
      }
    }, 2000)
    
    return () => clearInterval(glitchInterval)
  }, [])

  if (!post) {
    return (
      <div className="hacker-site">
        <canvas 
          id="matrix-rain" 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
        ></canvas>
        <div className="crt-scanlines fixed inset-0 pointer-events-none z-10"></div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-title">error.log</span>
              <div className="terminal-controls">
                <span className="control-dot red"></span>
                <span className="control-dot yellow"></span>
                <span className="control-dot green"></span>
              </div>
            </div>
            <div className="terminal-body">
              <p className="terminal-text error">
                $ cat /dev/null {'>'}article.txt<br />
                ERROR: File not found in directory<br />
                STATUS: <span className="text-red">404_NOT_FOUND</span><br />
                <br />
                <span className="cursor">█</span>
              </p>
              <a href="/" className="terminal-btn">
                {'>'} RETURN_TO_INDEX
              </a>
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          .hacker-site {
            min-height: 100vh;
            position: relative;
            z-index: 5;
            background: #0a0a0a;
            color: #ffffff;
            font-family: 'JetBrains Mono', monospace;
          }
          .terminal-window {
            background: #0a0a0a;
            border: 1px solid #30363d;
            width: 500px;
            margin: 0 auto;
          }
          .terminal-header {
            background: #161b22;
            padding: 0.5rem 1rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #30363d;
          }
          .terminal-title {
            color: #8b949e;
            font-size: 0.8rem;
          }
          .terminal-controls {
            display: flex;
            gap: 0.5rem;
          }
          .control-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
          .control-dot.red { background: #ff5f56; }
          .control-dot.yellow { background: #ffbd2e; }
          .control-dot.green { background: #27ca3f; }
          .terminal-body {
            padding: 2rem;
          }
          .terminal-text {
            color: #8b949e;
            line-height: 1.8;
            margin-bottom: 2rem;
          }
          .terminal-text.error {
            color: #ff4444;
          }
          .text-red {
            color: #ff4444;
          }
          .cursor {
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          .terminal-btn {
            background: transparent;
            color: #00ff41;
            border: 1px solid #00ff41;
            padding: 0.5rem 1rem;
            text-decoration: none;
            transition: all 0.3s;
            display: inline-block;
          }
          .terminal-btn:hover {
            background: #00ff41;
            color: #0a0a0a;
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} | N0V4://FEED</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image || "/images/default-tech.jpg"} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Alexis Millán" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={`https://blog.itsmillan.com/${post.slug}/`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": "Alexis Millán",
              "url": "https://itsmillan.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "N0V4 Feed",
              "logo": {
                "@type": "ImageObject",
                "url": "https://blog.itsmillan.com/images/logo.png"
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

      <div className="hacker-site">
        {/* Matrix Rain Background */}
        <canvas 
          id="matrix-rain" 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
        ></canvas>
        
        {/* CRT Scanlines Overlay */}
        <div className="crt-scanlines fixed inset-0 pointer-events-none z-10"></div>

        {/* HEADER */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <a href="/" className="logo">
                <span className="logo-text glitch" data-text={glitchText}>
                  {glitchText}
                </span>
                <span className="logo-subtitle">://FEED</span>
              </a>
              
              <nav className="nav">
                <ul className="nav-menu">
                  <li><a href="/" className="nav-link">$ ls stories</a></li>
                  <li><a href="/about" className="nav-link">$ whoami</a></li>
                  <li><a href="https://twitter.com/itsmillan" className="nav-link" target="_blank">$ contact</a></li>
                </ul>
              </nav>
              
              <div className="header-status">
                <span className="status-indicator">
                  <span className="status-dot"></span>
                  READING
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Header */}
        <section className="article-hero">
          <div className="container">
            <div className="article-hero-content">
              <nav className="article-breadcrumb">
                <a href="/" className="breadcrumb-link">
                  <span className="terminal-prompt-inline">{'>'}</span>
                  cd ../stories/
                </a>
              </nav>
              
              <div className="article-meta">
                <span className="meta-tag category">
                  <span className="bracket">[</span>
                  {post.category || 'INTEL'}
                  <span className="bracket">]</span>
                </span>
                <span className="meta-tag date">
                  DATE: {format(new Date(post.date), 'dd.MM.yyyy')}
                </span>
                <span className="meta-tag author">
                  AUTH: Alexis Millán
                </span>
                <span className="meta-tag readtime">
                  EXEC: {post.readTime || Math.ceil((post.contentHtml?.length || 0) / 1000) + ' min'}
                </span>
              </div>
              
              <h1 className="article-title">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="article-excerpt">
                  <span className="comment-prefix">//</span> {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <div className="article-section">
          <div className="container">
            <div className="article-layout">
              
              {/* Main Article Content */}
              <div className="article-main">
                <article className="article-container">
                  
                  {/* Article Info Panel */}
                  {(post.sources || post.categories || post.tags) && (
                    <div className="info-panel">
                      <div className="terminal-header">
                        <span className="terminal-title">article.info</span>
                        <div className="terminal-controls">
                          <span className="control-dot red"></span>
                          <span className="control-dot yellow"></span>
                          <span className="control-dot green"></span>
                        </div>
                      </div>
                      
                      <div className="info-content">
                        {post.sources && post.sources.length > 0 && (
                          <div className="info-row">
                            <span className="info-label">SOURCES:</span>
                            <span className="info-value">{post.sources.join(', ')}</span>
                          </div>
                        )}
                        {post.categories && post.categories.length > 0 && (
                          <div className="info-row">
                            <span className="info-label">TOPICS:</span>
                            <div className="info-tags">
                              {post.categories.slice(0, 5).map((category) => (
                                <span key={category} className="info-tag">
                                  [{category}]
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="info-row">
                            <span className="info-label">TAGS:</span>
                            <div className="info-tags">
                              {post.tags.map((tag) => (
                                <span key={tag} className="info-tag">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="article-body">
                    <div 
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
                    />
                  </div>
                </article>

                {/* Share Section */}
                <div className="share-section">
                  <div className="terminal-window">
                    <div className="terminal-header">
                      <span className="terminal-title">share.sh</span>
                      <div className="terminal-controls">
                        <span className="control-dot red"></span>
                        <span className="control-dot yellow"></span>
                        <span className="control-dot green"></span>
                      </div>
                    </div>
                    <div className="terminal-body">
                      <div className="share-content">
                        <h3 className="share-title">
                          <span className="terminal-prompt-inline">{'>'}</span>
                          BROADCAST_SIGNAL
                        </h3>
                        <p className="share-desc">
                          Transmit this intel to your network:
                        </p>
                        
                        <div className="share-buttons">
                          <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}&via=ItsMillan`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-btn twitter"
                          >
                            {'>'} TWITTER.EXE
                          </a>
                          <a 
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-btn linkedin"
                          >
                            {'>'} LINKEDIN.EXE
                          </a>
                          <button 
                            onClick={() => navigator.clipboard.writeText(window.location.href)}
                            className="share-btn copy"
                          >
                            {'>'} COPY_URL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="article-sidebar">
                <div className="sidebar-sticky">
                  
                  {/* Related Articles */}
                  <div className="sidebar-widget">
                    <div className="widget-header">
                      <h3 className="widget-title">
                        <span className="terminal-prompt-inline">{'>'}</span>
                        RELATED_FILES.log
                      </h3>
                    </div>
                    <div className="widget-content">
                      <div className="related-articles">
                        <a href="/" className="related-link">
                          <div className="related-title">
                            Cybersecurity Intelligence Report
                          </div>
                          <div className="related-meta">
                            <span className="file-info">./intel/prev_analysis.txt</span>
                          </div>
                        </a>
                        <a href="/" className="related-link">
                          <div className="related-title">
                            Infrastructure Security Updates
                          </div>
                          <div className="related-meta">
                            <span className="file-info">./security/updates.md</span>
                          </div>
                        </a>
                        <a href="/" className="related-link">
                          <div className="related-title">
                            Network Vulnerability Assessment
                          </div>
                          <div className="related-meta">
                            <span className="file-info">./network/vuln_scan.log</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="sidebar-widget">
                    <div className="widget-header">
                      <h3 className="widget-title">
                        <span className="terminal-prompt-inline">{'>'}</span>
                        AUTHOR.info
                      </h3>
                    </div>
                    <div className="widget-content">
                      <div className="author-info">
                        <div className="author-details">
                          <div className="author-name">Alexis Millán</div>
                          <div className="author-title">Security & Infrastructure Engineer</div>
                          <div className="author-location">Monterrey, Mexico</div>
                        </div>
                        <p className="author-bio">
                          Cybersecurity specialist focused on infrastructure hardening, 
                          network security, and emerging technology analysis.
                        </p>
                        <a href="https://itsmillan.com" className="author-link">
                          {'>'} VIEW_PROFILE
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <section className="article-nav">
          <div className="container">
            <div className="nav-content">
              <a href="/" className="nav-btn">
                <span className="terminal-prompt-inline">{'>'}</span>
                RETURN_TO_INDEX
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="subscribe-section">
          <div className="container">
            <div className="terminal-window large">
              <div className="terminal-header">
                <span className="terminal-title">subscribe.sh</span>
                <div className="terminal-controls">
                  <span className="control-dot red"></span>
                  <span className="control-dot yellow"></span>
                  <span className="control-dot green"></span>
                </div>
              </div>
              
              <div className="terminal-body">
                <div className="subscribe-content">
                  <h2 className="subscribe-title">JOIN_THE_MATRIX</h2>
                  <p className="subscribe-desc">
                    Get exclusive cybersecurity intelligence delivered to your terminal.<br />
                    No spam. No tracking. Pure signal.
                  </p>
                  
                  <form className="subscribe-form">
                    <div className="input-group">
                      <span className="input-prompt">$ echo "your@email.com" {'>'}</span>
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        className="email-input"
                        required
                      />
                      <button type="submit" className="submit-btn">
                        {'>'} EXECUTE
                      </button>
                    </div>
                  </form>
                  
                  <p className="subscribe-note">
                    <span className="text-dim">// Secure connection established. Data encrypted with AES-256.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-info">
                <p className="footer-text">
                  © 2026 N0V4://FEED - Independent cybersecurity intelligence
                </p>
                <p className="footer-author">
                  Engineered by <span className="text-glow">Alexis Millán</span>
                </p>
              </div>
              
              <div className="footer-links">
                <a href="/about" className="footer-link">About</a>
                <a href="https://twitter.com/itsmillan" className="footer-link" target="_blank">Twitter</a>
                <a href="mailto:alexis@itsmillan.com" className="footer-link">Contact</a>
              </div>
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
        }

        body {
          font-family: var(--font-sans);
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
          line-height: 1.6;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .hacker-site {
          min-height: 100vh;
          position: relative;
          z-index: 5;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* CRT SCANLINES */
        .crt-scanlines {
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.03) 2px,
            rgba(0, 255, 65, 0.03) 4px
          );
          animation: scanlines 0.1s linear infinite;
        }

        @keyframes scanlines {
          0% { transform: translateX(0); }
          100% { transform: translateX(2px); }
        }

        /* GLITCH EFFECT */
        .glitch {
          position: relative;
          animation: glitch 2s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #ff0040;
          z-index: -1;
        }

        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #00ffff;
          z-index: -2;
        }

        @keyframes glitch {
          0%, 74%, 76%, 100% {
            transform: translate(0);
          }
          75% {
            transform: translate(-2px, 2px);
          }
        }

        @keyframes glitch-1 {
          0%, 24%, 26%, 100% {
            transform: translate(0);
          }
          25% {
            transform: translate(-1px, 1px);
          }
        }

        @keyframes glitch-2 {
          0%, 49%, 51%, 100% {
            transform: translate(0);
          }
          50% {
            transform: translate(1px, -1px);
          }
        }

        /* TEXT EFFECTS */
        .text-glow {
          color: var(--color-green-bright);
          text-shadow: 
            0 0 10px var(--color-green-bright),
            0 0 20px var(--color-green-bright),
            0 0 30px var(--color-green-bright);
        }

        .text-dim {
          color: var(--color-text-dim);
        }

        .text-red {
          color: var(--color-red);
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* HEADER */
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
          padding: 1rem 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.5rem;
          text-decoration: none;
          color: var(--color-text-primary);
          display: flex;
          align-items: baseline;
        }

        .logo-text {
          color: var(--color-green-bright);
          text-shadow: 0 0 10px var(--color-green-bright);
        }

        .logo-subtitle {
          color: var(--color-text-secondary);
          margin-left: 0.2rem;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-link {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--color-green-bright);
          text-shadow: 0 0 5px var(--color-green-bright);
        }

        .header-status {
          font-family: var(--font-mono);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-size: 0.8rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-green-bright);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ARTICLE HERO */
        .article-hero {
          padding: 4rem 0;
          background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
          border-bottom: 1px solid var(--color-border);
        }

        .article-hero-content {
          max-width: 800px;
        }

        .article-breadcrumb {
          margin-bottom: 2rem;
        }

        .breadcrumb-link {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.3s;
        }

        .breadcrumb-link:hover {
          color: var(--color-green-bright);
          text-shadow: 0 0 5px var(--color-green-bright);
        }

        .terminal-prompt-inline {
          color: var(--color-green-bright);
          margin-right: 0.5rem;
        }

        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
        }

        .meta-tag {
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          padding: 0.5rem 1rem;
          background: var(--color-bg-tertiary);
        }

        .meta-tag.category {
          color: var(--color-green-bright);
          border-color: var(--color-green-bright);
        }

        .bracket {
          color: var(--color-text-dim);
        }

        .article-title {
          font-family: var(--font-mono);
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .article-excerpt {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          border-left: 3px solid var(--color-green-bright);
          padding-left: 1rem;
          margin-top: 2rem;
        }

        .comment-prefix {
          color: var(--color-green-bright);
        }

        /* ARTICLE SECTION */
        .article-section {
          padding: 3rem 0;
          background: var(--color-bg-secondary);
        }

        .article-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
        }

        .article-main {
          min-width: 0;
        }

        .article-container {
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
        }

        .info-panel {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          margin-bottom: 2rem;
        }

        .terminal-header {
          background: var(--color-bg-tertiary);
          padding: 0.5rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
        }

        .terminal-title {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .terminal-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control-dot.red { background: #ff5f56; }
        .control-dot.yellow { background: #ffbd2e; }
        .control-dot.green { background: #27ca3f; }

        .info-content {
          padding: 1.5rem;
        }

        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          font-size: 0.9rem;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-label {
          color: var(--color-green-bright);
          font-weight: 600;
          min-width: 80px;
        }

        .info-value {
          color: var(--color-text-secondary);
          flex: 1;
        }

        .info-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          flex: 1;
        }

        .info-tag {
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          padding: 0.2rem 0.5rem;
          font-size: 0.8rem;
          background: var(--color-bg-secondary);
        }

        /* ARTICLE BODY */
        .article-body {
          padding: 2rem;
        }

        .article-content {
          line-height: 1.8;
        }

        .article-content h1 {
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: 700;
          margin: 3rem 0 1.5rem 0;
          color: var(--color-green-bright);
          line-height: 1.2;
          border-bottom: 2px solid var(--color-green-bright);
          padding-bottom: 0.75rem;
          text-shadow: 0 0 10px var(--color-green-bright);
        }
        
        .article-content h2 {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2.5rem 0 1rem 0;
          color: var(--color-text-primary);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
        }
        
        .article-content h3 {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 2rem 0 0.75rem 0;
          color: var(--color-text-primary);
        }
        
        .article-content p {
          margin: 1.5rem 0;
          line-height: 1.8;
          color: var(--color-text-secondary);
          font-size: 1.1rem;
        }
        
        .article-content ul, .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
          color: var(--color-text-secondary);
        }
        
        .article-content li {
          margin: 0.75rem 0;
          line-height: 1.7;
        }
        
        .article-content strong {
          font-weight: 600;
          color: var(--color-text-primary);
        }
        
        .article-content em {
          font-style: italic;
          color: var(--color-green-bright);
        }
        
        .article-content blockquote {
          border-left: 4px solid var(--color-green-bright);
          margin: 2rem 0;
          padding: 1rem 1.5rem;
          background: var(--color-bg-primary);
          font-style: italic;
          border-radius: 0 0.5rem 0.5rem 0;
          color: var(--color-text-secondary);
        }
        
        .article-content code {
          background: var(--color-bg-primary);
          color: var(--color-green-bright);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: var(--font-mono);
          font-size: 0.9em;
          border: 1px solid var(--color-border);
        }

        .article-content pre {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 2rem 0;
          overflow-x: auto;
        }

        .article-content pre code {
          background: transparent;
          border: none;
          padding: 0;
        }
        
        .article-content hr {
          margin: 3rem 0;
          border: none;
          border-top: 1px solid var(--color-border);
          border-radius: 1px;
        }
        
        .article-content a {
          color: var(--color-green-bright);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s;
        }
        
        .article-content a:hover {
          border-bottom-color: var(--color-green-bright);
          text-shadow: 0 0 5px var(--color-green-bright);
        }

        /* SHARE SECTION */
        .share-section {
          margin-top: 2rem;
        }

        .terminal-window {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          width: 100%;
        }

        .terminal-window.large {
          max-width: 800px;
          margin: 0 auto;
        }

        .terminal-body {
          padding: 2rem;
        }

        .share-content {
          text-align: center;
        }

        .share-title {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          color: var(--color-green-bright);
          margin-bottom: 1rem;
          text-shadow: 0 0 10px var(--color-green-bright);
        }

        .share-desc {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          font-family: var(--font-mono);
        }

        .share-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .share-btn {
          font-family: var(--font-mono);
          background: transparent;
          color: var(--color-green-bright);
          border: 1px solid var(--color-green-bright);
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .share-btn:hover {
          background: var(--color-green-bright);
          color: var(--color-bg-primary);
          box-shadow: 0 0 15px var(--color-green-dim);
        }

        /* SIDEBAR */
        .article-sidebar {
          min-width: 0;
        }

        .sidebar-sticky {
          position: sticky;
          top: 6rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-widget {
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
        }

        .widget-header {
          background: var(--color-bg-primary);
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .widget-title {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--color-green-bright);
          text-shadow: 0 0 5px var(--color-green-bright);
        }

        .widget-content {
          padding: 1.5rem;
        }

        .related-articles {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .related-link {
          color: var(--color-text-primary);
          text-decoration: none;
          transition: all 0.3s;
        }

        .related-link:hover {
          color: var(--color-green-bright);
        }

        .related-title {
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .related-meta {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--color-text-dim);
        }

        .file-info {
          color: var(--color-text-secondary);
        }

        /* AUTHOR INFO */
        .author-info {
          text-align: center;
        }

        .author-details {
          margin-bottom: 1rem;
        }

        .author-name {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-green-bright);
          text-shadow: 0 0 5px var(--color-green-bright);
          margin-bottom: 0.5rem;
        }

        .author-title {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 0.25rem;
        }

        .author-location {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--color-text-dim);
        }

        .author-bio {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .author-link {
          font-family: var(--font-mono);
          color: var(--color-green-bright);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .author-link:hover {
          text-shadow: 0 0 5px var(--color-green-bright);
        }

        /* ARTICLE NAV */
        .article-nav {
          padding: 3rem 0;
          background: var(--color-bg-primary);
          text-align: center;
        }

        .nav-content {
          display: flex;
          justify-content: center;
        }

        .nav-btn {
          font-family: var(--font-mono);
          background: transparent;
          color: var(--color-green-bright);
          border: 1px solid var(--color-green-bright);
          padding: 1rem 2rem;
          text-decoration: none;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .nav-btn:hover {
          background: var(--color-green-bright);
          color: var(--color-bg-primary);
          box-shadow: 0 0 20px var(--color-green-dim);
        }

        /* SUBSCRIBE SECTION */
        .subscribe-section {
          padding: 6rem 0;
          background: var(--color-bg-secondary);
        }

        .subscribe-content {
          text-align: center;
        }

        .subscribe-title {
          font-family: var(--font-mono);
          font-size: 2.5rem;
          color: var(--color-green-bright);
          margin-bottom: 1.5rem;
          text-shadow: 0 0 20px var(--color-green-bright);
        }

        .subscribe-desc {
          color: var(--color-text-secondary);
          margin-bottom: 3rem;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .subscribe-form {
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .input-group {
          display: flex;
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          align-items: center;
          transition: border-color 0.3s;
        }

        .input-group:focus-within {
          border-color: var(--color-green-bright);
          box-shadow: 0 0 10px var(--color-green-dim);
        }

        .input-prompt {
          font-family: var(--font-mono);
          color: var(--color-green-bright);
          padding: 1rem;
          white-space: nowrap;
        }

        .email-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          padding: 1rem 0;
          outline: none;
        }

        .email-input::placeholder {
          color: var(--color-text-dim);
        }

        .submit-btn {
          font-family: var(--font-mono);
          background: var(--color-green-bright);
          color: var(--color-bg-primary);
          border: none;
          padding: 1rem 2rem;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
        }

        .submit-btn:hover {
          box-shadow: 0 0 20px var(--color-green-bright);
        }

        .subscribe-note {
          font-family: var(--font-mono);
          font-size: 0.8rem;
        }

        /* FOOTER */
        .footer {
          padding: 3rem 0 2rem;
          background: var(--color-bg-primary);
          border-top: 1px solid var(--color-border);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-text {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .footer-author {
          font-family: var(--font-mono);
          color: var(--color-text-dim);
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-link {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-link:hover {
          color: var(--color-green-bright);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
          
          .article-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .share-buttons {
            flex-direction: column;
            align-items: stretch;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .input-prompt {
            order: -1;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--color-border);
          }
          
          .submit-btn {
            width: 100%;
          }

          .article-meta {
            flex-direction: column;
            align-items: flex-start;
          }

          .meta-tag {
            width: fit-content;
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
      sources: data.sources || [],
      categories: data.categories || [],
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