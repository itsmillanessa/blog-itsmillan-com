import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function About() {
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

  return (
    <>
      <Head>
        <title>$ whoami | N0V4://FEED</title>
        <meta name="description" content="About Alexis Millán - Security & Infrastructure Engineer from Monterrey, Mexico. Cybersecurity specialist focused on infrastructure hardening and emerging technology analysis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Alexis Millán",
            "url": "https://blog.itsmillan.com/about",
            "jobTitle": "Security & Infrastructure Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "Independent"
            },
            "description": "Security & Infrastructure Engineer from Monterrey, Mexico"
          })
        }} />
      </Head>

      <div className="hacker-site">
        <canvas 
          id="matrix-rain" 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
        ></canvas>
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
                  <li><a href="/about" className="nav-link active">$ whoami</a></li>
                  <li><a href="https://twitter.com/itsmillan" className="nav-link" target="_blank">$ contact</a></li>
                </ul>
              </nav>
              
              <div className="header-status">
                <span className="status-indicator">
                  <span className="status-dot"></span>
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="about-hero">
          <div className="container">
            <div className="hero-content">
              <div className="terminal-prompt">
                <span className="prompt-symbol">{'>'}</span>
                <span className="prompt-text cursor">cat /etc/passwd | grep amillan...</span>
              </div>
              
              <h1 className="hero-title">
                ALEXIS_MILLÁN<br />
                <span className="text-glow">SECURITY_ENGINEER</span>
              </h1>
              
              <div className="hero-info">
                <div className="info-line">
                  <span className="info-label">LOCATION:</span>
                  <span className="info-value">Monterrey, Mexico</span>
                </div>
                <div className="info-line">
                  <span className="info-label">ROLE:</span>
                  <span className="info-value">Security & Infrastructure Engineer</span>
                </div>
                <div className="info-line">
                  <span className="info-label">FOCUS:</span>
                  <span className="info-value">Cybersecurity, Infrastructure, Networking</span>
                </div>
                <div className="info-line">
                  <span className="info-label">STATUS:</span>
                  <span className="info-value text-glow">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="about-main">
          <div className="container">
            <div className="content-layout">
              
              {/* PROFILE */}
              <div className="profile-section">
                <div className="terminal-window">
                  <div className="terminal-header">
                    <span className="terminal-title">profile.sh</span>
                    <div className="terminal-controls">
                      <span className="control-dot red"></span>
                      <span className="control-dot yellow"></span>
                      <span className="control-dot green"></span>
                    </div>
                  </div>
                  
                  <div className="terminal-body">
                    <div className="profile-content">
                      <h2 className="section-title">
                        <span className="terminal-prompt-inline">{'>'}</span>
                        PROFESSIONAL_PROFILE.txt
                      </h2>
                      
                      <div className="profile-text">
                        <p>
                          Security & Infrastructure Engineer based in Monterrey, Mexico, 
                          specializing in cybersecurity analysis, infrastructure hardening, 
                          and emerging technology assessment.
                        </p>
                        
                        <p>
                          Focus areas include network security architecture, threat intelligence, 
                          infrastructure security, and technology trend analysis. 
                          Committed to sharing knowledge through independent cybersecurity 
                          intelligence publication.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPERTISE */}
              <div className="expertise-section">
                <div className="terminal-window">
                  <div className="terminal-header">
                    <span className="terminal-title">skills.cfg</span>
                    <div className="terminal-controls">
                      <span className="control-dot red"></span>
                      <span className="control-dot yellow"></span>
                      <span className="control-dot green"></span>
                    </div>
                  </div>
                  
                  <div className="terminal-body">
                    <div className="skills-content">
                      <h2 className="section-title">
                        <span className="terminal-prompt-inline">{'>'}</span>
                        CORE_EXPERTISE.log
                      </h2>
                      
                      <div className="skills-grid">
                        <div className="skill-category">
                          <h3 className="category-title">
                            <span className="bracket">[</span>CYBERSECURITY<span className="bracket">]</span>
                          </h3>
                          <ul className="skill-list">
                            <li>Threat Intelligence Analysis</li>
                            <li>Vulnerability Assessment</li>
                            <li>Incident Response</li>
                            <li>Security Architecture</li>
                            <li>Risk Management</li>
                          </ul>
                        </div>

                        <div className="skill-category">
                          <h3 className="category-title">
                            <span className="bracket">[</span>INFRASTRUCTURE<span className="bracket">]</span>
                          </h3>
                          <ul className="skill-list">
                            <li>Network Security</li>
                            <li>Cloud Security (AWS/Azure)</li>
                            <li>Infrastructure Hardening</li>
                            <li>DevSecOps Integration</li>
                            <li>Zero Trust Architecture</li>
                          </ul>
                        </div>

                        <div className="skill-category">
                          <h3 className="category-title">
                            <span className="bracket">[</span>TECHNOLOGY<span className="bracket">]</span>
                          </h3>
                          <ul className="skill-list">
                            <li>Emerging Tech Analysis</li>
                            <li>Security Tool Evaluation</li>
                            <li>Technical Writing</li>
                            <li>Research & Development</li>
                            <li>Knowledge Sharing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MISSION */}
              <div className="mission-section">
                <div className="terminal-window">
                  <div className="terminal-header">
                    <span className="terminal-title">mission.md</span>
                    <div className="terminal-controls">
                      <span className="control-dot red"></span>
                      <span className="control-dot yellow"></span>
                      <span className="control-dot green"></span>
                    </div>
                  </div>
                  
                  <div className="terminal-body">
                    <div className="mission-content">
                      <h2 className="section-title">
                        <span className="terminal-prompt-inline">{'>'}</span>
                        MISSION_STATEMENT.exe
                      </h2>
                      
                      <blockquote className="mission-quote">
                        "Providing independent cybersecurity intelligence and technology analysis 
                        to help security professionals stay informed about emerging threats, 
                        vulnerabilities, and defensive strategies in an increasingly complex 
                        digital landscape."
                      </blockquote>
                      
                      <div className="mission-values">
                        <div className="value-item">
                          <span className="value-label">INDEPENDENCE:</span>
                          <span className="value-desc">Unbiased analysis free from vendor influence</span>
                        </div>
                        <div className="value-item">
                          <span className="value-label">ACCURACY:</span>
                          <span className="value-desc">Verified information with technical precision</span>
                        </div>
                        <div className="value-item">
                          <span className="value-label">TIMELINESS:</span>
                          <span className="value-desc">Rapid dissemination of critical intelligence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section">
          <div className="container">
            <div className="terminal-window large">
              <div className="terminal-header">
                <span className="terminal-title">contact.sh</span>
                <div className="terminal-controls">
                  <span className="control-dot red"></span>
                  <span className="control-dot yellow"></span>
                  <span className="control-dot green"></span>
                </div>
              </div>
              
              <div className="terminal-body">
                <div className="contact-content">
                  <h2 className="contact-title">
                    <span className="terminal-prompt-inline">{'>'}</span>
                    ESTABLISH_CONNECTION
                  </h2>
                  
                  <p className="contact-desc">
                    Available for cybersecurity consulting, threat intelligence collaboration, 
                    and professional networking.
                  </p>
                  
                  <div className="contact-methods">
                    <a href="mailto:alexis@itsmillan.com" className="contact-method">
                      {">"} EMAIL.exe → alexis@itsmillan.com
                    </a>
                    <a href="https://twitter.com/itsmillan" target="_blank" className="contact-method">
                      {">"} TWITTER.exe → @itsmillan
                    </a>
                    <a href="https://itsmillan.com" target="_blank" className="contact-method">
                      {">"} WEBSITE.exe → itsmillan.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
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
                <a href="/" className="footer-link">Stories</a>
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
          0%, 74%, 76%, 100% { transform: translate(0); }
          75% { transform: translate(-2px, 2px); }
        }

        @keyframes glitch-1 {
          0%, 24%, 26%, 100% { transform: translate(0); }
          25% { transform: translate(-1px, 1px); }
        }

        @keyframes glitch-2 {
          0%, 49%, 51%, 100% { transform: translate(0); }
          50% { transform: translate(1px, -1px); }
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

        /* HERO */
        .about-hero {
          padding: 6rem 0;
          background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .terminal-prompt {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          text-align: left;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 2rem;
        }

        .prompt-symbol {
          color: var(--color-green-bright);
        }

        .prompt-text {
          margin-left: 0.5rem;
        }

        .hero-title {
          font-family: var(--font-mono);
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 3rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .hero-info {
          font-family: var(--font-mono);
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          padding: 2rem;
        }

        .info-line {
          display: flex;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .info-line:last-child {
          margin-bottom: 0;
        }

        .info-label {
          color: var(--color-green-bright);
          min-width: 120px;
          font-weight: 600;
        }

        .info-value {
          color: var(--color-text-secondary);
          flex: 1;
        }

        .terminal-prompt-inline {
          color: var(--color-green-bright);
          margin-right: 0.5rem;
        }

        /* MAIN CONTENT */
        .about-main {
          padding: 4rem 0;
          background: var(--color-bg-secondary);
        }

        .content-layout {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* TERMINAL WINDOWS */
        .terminal-window {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          width: 100%;
        }

        .terminal-window.large {
          max-width: 800px;
          margin: 0 auto;
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

        .terminal-body {
          padding: 2rem;
        }

        .section-title {
          font-family: var(--font-mono);
          font-size: 1.8rem;
          color: var(--color-green-bright);
          margin-bottom: 1.5rem;
          text-shadow: 0 0 10px var(--color-green-bright);
        }

        /* PROFILE SECTION */
        .profile-text {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        .profile-text p {
          margin-bottom: 1.5rem;
        }

        .profile-text p:last-child {
          margin-bottom: 0;
        }

        /* SKILLS SECTION */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-category {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 1.5rem;
        }

        .category-title {
          font-family: var(--font-mono);
          color: var(--color-green-bright);
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .bracket {
          color: var(--color-text-dim);
        }

        .skill-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .skill-list li {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          position: relative;
          padding-left: 1.5rem;
        }

        .skill-list li::before {
          content: '\\003E';
          position: absolute;
          left: 0;
          color: var(--color-green-bright);
          font-weight: bold;
        }

        /* MISSION SECTION */
        .mission-quote {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-style: italic;
          color: var(--color-text-secondary);
          line-height: 1.8;
          border-left: 4px solid var(--color-green-bright);
          padding-left: 1.5rem;
          margin: 2rem 0;
        }

        .mission-values {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .value-item {
          font-family: var(--font-mono);
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
        }

        .value-label {
          color: var(--color-green-bright);
          font-weight: 600;
          min-width: 120px;
        }

        .value-desc {
          color: var(--color-text-secondary);
          flex: 1;
        }

        /* CONTACT SECTION */
        .contact-section {
          padding: 6rem 0;
          background: var(--color-bg-primary);
        }

        .contact-content {
          text-align: center;
        }

        .contact-title {
          font-family: var(--font-mono);
          font-size: 2rem;
          color: var(--color-green-bright);
          margin-bottom: 1.5rem;
          text-shadow: 0 0 20px var(--color-green-bright);
        }

        .contact-desc {
          color: var(--color-text-secondary);
          margin-bottom: 3rem;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .contact-method {
          font-family: var(--font-mono);
          background: transparent;
          color: var(--color-green-bright);
          border: 1px solid var(--color-green-bright);
          padding: 1rem;
          text-decoration: none;
          transition: all 0.3s;
          text-align: left;
        }

        .contact-method:hover {
          background: var(--color-green-bright);
          color: var(--color-bg-primary);
          box-shadow: 0 0 20px var(--color-green-dim);
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
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }
          
          .hero-info {
            text-align: left;
          }
          
          .info-line {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .info-label {
            min-width: auto;
          }
        }
      `}</style>
    </>
  )
}