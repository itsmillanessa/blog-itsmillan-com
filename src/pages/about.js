import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About | CyberIntel Daily</title>
        <meta name="description" content="Professional cybersecurity and technology intelligence by Alexis Millán." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="site">
        {/* Header */}
        <header className="header">
          <div className="container-wide">
            <div className="header-inner">
              <a href="/" className="logo">
                <span className="accent">Cyber</span>Intel <span className="accent">Daily</span>
              </a>
              <nav className="nav">
                <a href="/" className="nav-link">Home</a>
                <a href="/about" className="nav-link active">About</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="main">
          <div className="container">
            <h1 className="page-title">About</h1>
            
            <div className="content">
              <section className="section">
                <h2 className="section-title"><span className="accent">//</span> The Mission</h2>
                <p>
                  CyberIntel Daily is a professional cybersecurity and technology intelligence publication. 
                  We deliver daily analysis of the most critical developments in information security, 
                  network infrastructure, and emerging technologies.
                </p>
                <p>
                  Our goal is simple: cut through the noise and deliver actionable intelligence 
                  that security professionals and tech enthusiasts can rely on.
                </p>
              </section>

              <section className="section">
                <h2 className="section-title"><span className="accent">//</span> Coverage Areas</h2>
                <div className="areas-grid">
                  <div className="area-card">
                    <h3>🛡️ Cybersecurity</h3>
                    <p>Threat intelligence, vulnerability analysis, incident response, and security operations.</p>
                  </div>
                  <div className="area-card">
                    <h3>🌐 Infrastructure</h3>
                    <p>Network architecture, cloud security, enterprise systems, and operational technology.</p>
                  </div>
                  <div className="area-card">
                    <h3>💻 Technology</h3>
                    <p>Emerging tech trends, software development, and digital transformation.</p>
                  </div>
                  <div className="area-card">
                    <h3>📊 Analysis</h3>
                    <p>Deep dives into industry trends, market shifts, and strategic technology decisions.</p>
                  </div>
                </div>
              </section>

              <section className="section">
                <h2 className="section-title"><span className="accent">//</span> About the Author</h2>
                <div className="author-card">
                  <div className="author-info">
                    <h3>Alexis Millán</h3>
                    <p className="author-role">Security {"&"} Infrastructure Engineer</p>
                    <p className="author-location">Monterrey, México</p>
                    <p className="author-bio">
                      Security professional specialized in infrastructure hardening, network security, 
                      and detection {"&"} response. Passionate about automation, emerging technologies, 
                      and bridging the gap between cybersecurity and practical business operations.
                    </p>
                    <div className="author-links">
                      <a href="https://twitter.com/itsmillan" target="_blank" rel="noopener noreferrer">Twitter</a>
                      <a href="https://itsmillan.com" target="_blank" rel="noopener noreferrer">Website</a>
                      <a href="mailto:alexis@itsmillan.com">Email</a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section">
                <h2 className="section-title"><span className="accent">//</span> Contact</h2>
                <p>
                  For tips, corrections, or collaboration inquiries, reach out via{' '}
                  <a href="https://twitter.com/itsmillan" className="inline-link">Twitter</a> or{' '}
                  <a href="mailto:alexis@itsmillan.com" className="inline-link">email</a>.
                </p>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container-wide">
            <div className="footer-inner">
              <div className="footer-brand"><span className="accent">Cyber</span>Intel <span className="accent">Daily</span></div>
              <p className="footer-copy">© 2026 Alexis Millán. Professional cybersecurity intelligence.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --bg: #0a0a0a;
          --bg-card: #111318;
          --border: #1e2430;
          --green: #00ff41;
          --green-dim: #00cc33;
          --text: #e6edf3;
          --text-dim: #8b949e;
          --text-muted: #484f58;
          --font-mono: 'JetBrains Mono', monospace;
          --font-sans: 'Inter', -apple-system, sans-serif;
          --radius: 8px;
        }
        body { font-family: var(--font-sans); background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }
        a { color: inherit; text-decoration: none; }
        .container { max-width: 700px; margin: 0 auto; padding: 0 20px; }
        .container-wide { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

        .header { border-bottom: 1px solid var(--border); padding: 16px 0; position: sticky; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); z-index: 100; }
        .header-inner { display: flex; align-items: center; justify-content: space-between; }
        .logo { font-family: var(--font-mono); font-size: 1.3rem; font-weight: 700; }
        .accent { color: var(--green); }
        .nav { display: flex; gap: 24px; }
        .nav-link { font-size: 0.9rem; color: var(--text-dim); transition: color 0.2s; font-weight: 500; }
        .nav-link:hover, .nav-link.active { color: var(--green); }

        .main { padding: 48px 0 60px; }
        .page-title { font-size: 2rem; font-weight: 700; margin-bottom: 40px; }
        .content p { color: var(--text-dim); font-size: 1rem; line-height: 1.8; margin-bottom: 16px; }
        .section { margin-bottom: 40px; }
        .section-title { font-family: var(--font-mono); font-size: 1.1rem; font-weight: 600; margin-bottom: 16px; color: var(--text); }

        .areas-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 8px; }
        .area-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; transition: border-color 0.2s; }
        .area-card:hover { border-color: var(--green); }
        .area-card h3 { font-size: 1rem; margin-bottom: 8px; }
        .area-card p { font-size: 0.85rem; margin-bottom: 0; }

        .author-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
        .author-info h3 { font-size: 1.2rem; margin-bottom: 4px; }
        .author-role { font-family: var(--font-mono); font-size: 0.85rem; color: var(--green) !important; margin-bottom: 2px !important; }
        .author-location { font-size: 0.85rem; color: var(--text-muted) !important; margin-bottom: 12px !important; }
        .author-bio { font-size: 0.95rem; }
        .author-links { display: flex; gap: 16px; margin-top: 16px; }
        .author-links a { font-family: var(--font-mono); font-size: 0.8rem; color: var(--green-dim); transition: color 0.2s; }
        .author-links a:hover { color: var(--green); }

        .inline-link { color: var(--green) !important; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .inline-link:hover { border-bottom-color: var(--green); }

        .footer { border-top: 1px solid var(--border); padding: 32px 0; }
        .footer-inner { text-align: center; }
        .footer-brand { font-family: var(--font-mono); font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        .footer-copy { font-size: 0.8rem; color: var(--text-muted); }

        @media (max-width: 600px) {
          .areas-grid { grid-template-columns: 1fr; }
          .nav { gap: 16px; }
        }
      `}</style>
    </>
  )
}
