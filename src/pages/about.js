import Head from 'next/head'
import { useState } from 'react'

export default function About() {
  const [activeTab, setActiveTab] = useState('background')

  const tabs = [
    { id: 'background', title: 'Background', icon: '👤' },
    { id: 'expertise', title: 'Expertise', icon: '🛡️' },
    { id: 'methodology', title: 'Methodology', icon: '🔍' },
    { id: 'mission', title: 'Mission', icon: '🎯' }
  ]

  return (
    <>
      <Head>
        <title>About | CyberIntel Daily - Professional Cybersecurity Intelligence</title>
        <meta name="description" content="Learn about Alexis Millán, cybersecurity professional and technology analyst behind CyberIntel Daily. Professional intelligence for IT professionals." />
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
            "jobTitle": "Cybersecurity Professional & Technology Analyst",
            "worksFor": {
              "@type": "Organization",
              "name": "CyberIntel Daily"
            },
            "description": "Cybersecurity professional specializing in threat intelligence, infrastructure security, and technology analysis"
          })
        }} />
      </Head>

      <div className="about-page">
        {/* HEADER */}
        <header className="page-header">
          <div className="container">
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">About</span>
            </nav>
            
            <div className="site-brand">
              <a href="/">
                <h1 className="brand-title">CyberIntel <span className="brand-accent">Daily</span></h1>
              </a>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="about-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-image">
                <div className="profile-avatar">AM</div>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span className="status-text">Active</span>
                </div>
              </div>
              
              <div className="hero-text">
                <h1 className="hero-title">Alexis Millán</h1>
                <p className="hero-subtitle">Cybersecurity Professional & Technology Analyst</p>
                <p className="hero-description">
                  Independent cybersecurity professional providing intelligence analysis 
                  on emerging threats, infrastructure security, and technology trends 
                  for IT professionals and security teams worldwide.
                </p>
                
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Intelligence Reports</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50k+</span>
                    <span className="stat-label">Professionals Reached</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <a href="mailto:alexis@itsmillan.com" className="contact-btn primary">
                    Get in Touch
                  </a>
                  <a href="https://linkedin.com/in/amillan" target="_blank" className="contact-btn secondary">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="about-content">
          <div className="container">
            <div className="content-layout">
              
              {/* TAB NAVIGATION */}
              <div className="tab-navigation">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-title">{tab.title}</span>
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="tab-content">
                
                {/* BACKGROUND TAB */}
                {activeTab === 'background' && (
                  <div className="tab-panel">
                    <h2 className="panel-title">Professional Background</h2>
                    
                    <div className="content-grid">
                      <div className="content-section">
                        <h3 className="section-title">Career Journey</h3>
                        <p className="section-text">
                          With over a decade of experience in cybersecurity and technology infrastructure, 
                          I've worked across diverse environments from enterprise corporations to 
                          government agencies. My career has spanned network security, incident response, 
                          threat intelligence, and strategic security planning.
                        </p>
                        
                        <p className="section-text">
                          I founded <strong>CyberIntel Daily</strong> to bridge the gap between 
                          complex cybersecurity developments and actionable intelligence for 
                          IT professionals. The goal is simple: deliver critical security 
                          information in a format that busy professionals can quickly digest and act upon.
                        </p>
                      </div>
                      
                      <div className="content-section">
                        <h3 className="section-title">Core Competencies</h3>
                        <ul className="competency-list">
                          <li>Threat Intelligence Analysis</li>
                          <li>Infrastructure Security Architecture</li>
                          <li>Incident Response & Forensics</li>
                          <li>Risk Assessment & Management</li>
                          <li>Security Policy Development</li>
                          <li>Technology Trend Analysis</li>
                          <li>Vulnerability Assessment</li>
                          <li>Compliance & Governance</li>
                        </ul>
                      </div>
                    </div>

                    <div className="credentials-section">
                      <h3 className="section-title">Education & Certifications</h3>
                      <div className="credentials-grid">
                        <div className="credential-item">
                          <div className="credential-type">Education</div>
                          <div className="credential-title">B.S. Computer Science</div>
                          <div className="credential-detail">Information Security Concentration</div>
                        </div>
                        <div className="credential-item">
                          <div className="credential-type">Certification</div>
                          <div className="credential-title">CISSP</div>
                          <div className="credential-detail">Certified Information Systems Security Professional</div>
                        </div>
                        <div className="credential-item">
                          <div className="credential-type">Certification</div>
                          <div className="credential-title">CISM</div>
                          <div className="credential-detail">Certified Information Security Manager</div>
                        </div>
                        <div className="credential-item">
                          <div className="credential-type">Training</div>
                          <div className="credential-title">Advanced Threat Hunting</div>
                          <div className="credential-detail">SANS FOR508</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* EXPERTISE TAB */}
                {activeTab === 'expertise' && (
                  <div className="tab-panel">
                    <h2 className="panel-title">Areas of Expertise</h2>
                    
                    <div className="expertise-grid">
                      <div className="expertise-card">
                        <div className="card-header">
                          <div className="card-icon">🛡️</div>
                          <h3 className="card-title">Cybersecurity</h3>
                        </div>
                        <div className="card-content">
                          <ul>
                            <li>Advanced Persistent Threat (APT) Analysis</li>
                            <li>Zero-day Vulnerability Research</li>
                            <li>Malware Analysis & Reverse Engineering</li>
                            <li>Security Operations Center (SOC) Management</li>
                            <li>Incident Response & Digital Forensics</li>
                            <li>Threat Intelligence Platforms</li>
                          </ul>
                        </div>
                      </div>

                      <div className="expertise-card">
                        <div className="card-header">
                          <div className="card-icon">🏗️</div>
                          <h3 className="card-title">Infrastructure</h3>
                        </div>
                        <div className="card-content">
                          <ul>
                            <li>Network Security Architecture</li>
                            <li>Cloud Security (AWS, Azure, GCP)</li>
                            <li>Zero Trust Implementation</li>
                            <li>Identity & Access Management (IAM)</li>
                            <li>Secure DevOps & CI/CD Pipelines</li>
                            <li>Container & Kubernetes Security</li>
                          </ul>
                        </div>
                      </div>

                      <div className="expertise-card">
                        <div className="card-header">
                          <div className="card-icon">🔗</div>
                          <h3 className="card-title">Networking</h3>
                        </div>
                        <div className="card-content">
                          <ul>
                            <li>Network Segmentation & Microsegmentation</li>
                            <li>VPN & Remote Access Security</li>
                            <li>Software-Defined Networking (SDN)</li>
                            <li>Network Traffic Analysis</li>
                            <li>Firewall & IPS Management</li>
                            <li>5G & IoT Security</li>
                          </ul>
                        </div>
                      </div>

                      <div className="expertise-card">
                        <div className="card-header">
                          <div className="card-icon">🚀</div>
                          <h3 className="card-title">Emerging Technologies</h3>
                        </div>
                        <div className="card-content">
                          <ul>
                            <li>Artificial Intelligence & Machine Learning Security</li>
                            <li>Quantum Computing & Cryptography</li>
                            <li>Blockchain & DeFi Security</li>
                            <li>Edge Computing Security</li>
                            <li>Extended Reality (XR) Security</li>
                            <li>Autonomous Systems Security</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="focus-areas">
                      <h3 className="section-title">Current Research Focus</h3>
                      <div className="focus-list">
                        <div className="focus-item">
                          <strong>Post-Quantum Cryptography:</strong> Analyzing the impact of quantum computing 
                          on current encryption standards and evaluating migration strategies.
                        </div>
                        <div className="focus-item">
                          <strong>Supply Chain Security:</strong> Investigating software supply chain attacks 
                          and developing frameworks for vendor risk assessment.
                        </div>
                        <div className="focus-item">
                          <strong>AI-Powered Threats:</strong> Studying the evolution of AI-generated attacks 
                          and developing countermeasures for AI-based security solutions.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* METHODOLOGY TAB */}
                {activeTab === 'methodology' && (
                  <div className="tab-panel">
                    <h2 className="panel-title">Intelligence Methodology</h2>
                    
                    <div className="methodology-flow">
                      <div className="flow-step">
                        <div className="step-number">01</div>
                        <div className="step-content">
                          <h3 className="step-title">Data Collection</h3>
                          <p className="step-description">
                            Continuous monitoring of 50+ premium cybersecurity sources, 
                            government advisories, research publications, and industry reports. 
                            Automated aggregation combined with manual verification.
                          </p>
                        </div>
                      </div>

                      <div className="flow-step">
                        <div className="step-number">02</div>
                        <div className="step-content">
                          <h3 className="step-title">Analysis & Validation</h3>
                          <p className="step-description">
                            Multi-source verification and context analysis. Assessment of 
                            credibility, impact, and relevance. Cross-referencing with 
                            historical patterns and threat landscape evolution.
                          </p>
                        </div>
                      </div>

                      <div className="flow-step">
                        <div className="step-number">03</div>
                        <div className="step-content">
                          <h3 className="step-title">Synthesis & Insight</h3>
                          <p className="step-description">
                            Transformation of raw intelligence into actionable insights. 
                            Identification of trends, implications, and strategic recommendations. 
                            Focus on practical application for IT professionals.
                          </p>
                        </div>
                      </div>

                      <div className="flow-step">
                        <div className="step-number">04</div>
                        <div className="step-content">
                          <h3 className="step-title">Distribution & Follow-up</h3>
                          <p className="step-description">
                            Timely dissemination through multiple channels. Monitoring of 
                            developments and providing updates as situations evolve. 
                            Community feedback integration for continuous improvement.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="standards-section">
                      <h3 className="section-title">Editorial Standards</h3>
                      <div className="standards-grid">
                        <div className="standard-item">
                          <div className="standard-icon">✅</div>
                          <div className="standard-content">
                            <h4>Source Verification</h4>
                            <p>All information verified through multiple independent sources before publication.</p>
                          </div>
                        </div>
                        <div className="standard-item">
                          <div className="standard-icon">🔍</div>
                          <div className="standard-content">
                            <h4>Fact Checking</h4>
                            <p>Rigorous fact-checking process with technical accuracy as top priority.</p>
                          </div>
                        </div>
                        <div className="standard-item">
                          <div className="standard-icon">⚡</div>
                          <div className="standard-content">
                            <h4>Timeliness</h4>
                            <p>Critical security information prioritized for immediate dissemination.</p>
                          </div>
                        </div>
                        <div className="standard-item">
                          <div className="standard-icon">🎯</div>
                          <div className="standard-content">
                            <h4>Relevance</h4>
                            <p>Content filtered for practical relevance to IT security professionals.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MISSION TAB */}
                {activeTab === 'mission' && (
                  <div className="tab-panel">
                    <h2 className="panel-title">Mission & Vision</h2>
                    
                    <div className="mission-content">
                      <div className="mission-statement">
                        <h3 className="mission-title">Mission Statement</h3>
                        <blockquote className="mission-quote">
                          "To provide IT professionals and cybersecurity teams with timely, 
                          accurate, and actionable intelligence that enables proactive defense 
                          against emerging threats and informed decision-making in an 
                          increasingly complex digital landscape."
                        </blockquote>
                      </div>

                      <div className="vision-section">
                        <h3 className="section-title">Core Values</h3>
                        <div className="values-grid">
                          <div className="value-item">
                            <div className="value-icon">🔒</div>
                            <h4 className="value-title">Independence</h4>
                            <p className="value-description">
                              Maintaining editorial independence from vendors, governments, 
                              and special interests to provide unbiased analysis.
                            </p>
                          </div>
                          <div className="value-item">
                            <div className="value-icon">📊</div>
                            <h4 className="value-title">Accuracy</h4>
                            <p className="value-description">
                              Commitment to technical accuracy and thorough verification 
                              of all published intelligence.
                            </p>
                          </div>
                          <div className="value-item">
                            <div className="value-icon">⚡</div>
                            <h4 className="value-title">Timeliness</h4>
                            <p className="value-description">
                              Rapid dissemination of critical security information 
                              when timing can impact defensive posture.
                            </p>
                          </div>
                          <div className="value-item">
                            <div className="value-icon">🎯</div>
                            <h4 className="value-title">Practicality</h4>
                            <p className="value-description">
                              Focus on actionable intelligence that professionals 
                              can immediately apply to improve security posture.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="goals-section">
                        <h3 className="section-title">Strategic Goals</h3>
                        <div className="goals-list">
                          <div className="goal-item">
                            <div className="goal-number">2026</div>
                            <div className="goal-content">
                              <h4>Intelligence Expansion</h4>
                              <p>Expand coverage to include emerging markets and specialized threat actors. 
                              Launch real-time threat intelligence API for enterprise subscribers.</p>
                            </div>
                          </div>
                          <div className="goal-item">
                            <div className="goal-number">2027</div>
                            <div className="goal-content">
                              <h4>Community Building</h4>
                              <p>Build collaborative platform for security professionals to share 
                              validated threat intelligence and best practices.</p>
                            </div>
                          </div>
                          <div className="goal-item">
                            <div className="goal-number">2028</div>
                            <div className="goal-content">
                              <h4>Research Initiative</h4>
                              <p>Launch independent cybersecurity research program focusing on 
                              post-quantum cryptography and AI-powered defense systems.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="contact-section">
                        <h3 className="section-title">Get Involved</h3>
                        <p className="contact-description">
                          CyberIntel Daily thrives on community input and collaboration. 
                          Whether you're a security researcher, IT professional, or industry expert, 
                          there are several ways to contribute to the mission.
                        </p>
                        <div className="involvement-options">
                          <div className="involvement-item">
                            <strong>Share Intelligence:</strong> Submit verified threat intelligence 
                            or security research findings for community benefit.
                          </div>
                          <div className="involvement-item">
                            <strong>Expert Commentary:</strong> Provide expert analysis on emerging 
                            threats or technology developments in your area of expertise.
                          </div>
                          <div className="involvement-item">
                            <strong>Community Feedback:</strong> Help improve content quality and 
                            relevance through constructive feedback and suggestions.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-content">
              <h2 className="contact-title">Professional Contact</h2>
              <p className="contact-description">
                Available for cybersecurity consulting, threat intelligence collaboration, 
                and professional speaking engagements.
              </p>
              
              <div className="contact-methods">
                <a href="mailto:alexis@itsmillan.com" className="contact-method">
                  <div className="method-icon">✉️</div>
                  <div className="method-content">
                    <div className="method-title">Email</div>
                    <div className="method-detail">alexis@itsmillan.com</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/amillan" target="_blank" className="contact-method">
                  <div className="method-icon">💼</div>
                  <div className="method-content">
                    <div className="method-title">LinkedIn</div>
                    <div className="method-detail">Professional Network</div>
                  </div>
                </a>
                
                <a href="https://twitter.com/itsmillan" target="_blank" className="contact-method">
                  <div className="method-icon">🐦</div>
                  <div className="method-content">
                    <div className="method-title">Twitter</div>
                    <div className="method-detail">Industry Updates</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="page-footer">
          <div className="container">
            <div className="footer-content">
              <p className="footer-text">
                © 2026 CyberIntel Daily. Published by <span className="author-name">Alexis Millán</span>. 
                Independent cybersecurity intelligence for IT professionals.
              </p>
              <div className="footer-links">
                <a href="/">Back to Intelligence Feed</a>
                <a href="mailto:alexis@itsmillan.com">Contact</a>
                <a href="/privacy">Privacy Policy</a>
              </div>
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
          
          /* Semantic Colors */
          --border-primary: #30363d;
          --border-secondary: #21262d;
          
          /* Typography */
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

        .about-page {
          min-height: 100vh;
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        /* PAGE HEADER */
        .page-header {
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

        /* HERO SECTION */
        .about-hero {
          background: var(--bg-primary);
          padding: var(--space-3xl) 0;
        }

        .hero-content {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-3xl);
          align-items: start;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-image {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 800;
          color: var(--bg-primary);
          box-shadow: 0 8px 32px rgba(0, 210, 106, 0.3);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-primary);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: var(--space-sm);
          color: var(--text-primary);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: var(--space-lg);
        }

        .hero-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-2xl);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }

        .stat-item {
          text-align: center;
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent-primary);
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .hero-actions {
          display: flex;
          gap: var(--space-md);
        }

        .contact-btn {
          padding: var(--space-md) var(--space-xl);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .contact-btn.primary {
          background: var(--accent-primary);
          color: var(--bg-primary);
        }

        .contact-btn.primary:hover {
          background: var(--accent-secondary);
          transform: translateY(-2px);
        }

        .contact-btn.secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-primary);
        }

        .contact-btn.secondary:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* TAB NAVIGATION */
        .about-content {
          background: var(--bg-secondary);
          padding: var(--space-3xl) 0;
        }

        .content-layout {
          max-width: 1000px;
          margin: 0 auto;
        }

        .tab-navigation {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-3xl);
        }

        .tab-button {
          background: transparent;
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
          padding: var(--space-lg);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
        }

        .tab-button:hover,
        .tab-button.active {
          border-color: var(--accent-primary);
          background: var(--bg-tertiary);
        }

        .tab-button.active {
          color: var(--accent-primary);
        }

        .tab-icon {
          font-size: 1.5rem;
        }

        .tab-title {
          font-weight: 600;
        }

        /* TAB CONTENT */
        .tab-content {
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          border-radius: 16px;
          padding: var(--space-3xl);
        }

        .tab-panel {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .panel-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: var(--space-2xl);
          color: var(--text-primary);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          margin-bottom: var(--space-3xl);
        }

        .content-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }

        .section-text {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1.125rem;
        }

        .competency-list {
          list-style: none;
          display: grid;
          gap: var(--space-sm);
        }

        .competency-list li {
          position: relative;
          padding-left: var(--space-lg);
          color: var(--text-secondary);
        }

        .competency-list li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-weight: bold;
        }

        /* CREDENTIALS */
        .credentials-section {
          margin-top: var(--space-3xl);
          padding: var(--space-2xl);
          background: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border-primary);
        }

        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
        }

        .credential-item {
          padding: var(--space-lg);
          background: var(--bg-tertiary);
          border-radius: 8px;
          border: 1px solid var(--border-secondary);
        }

        .credential-type {
          font-size: 0.875rem;
          color: var(--accent-primary);
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: var(--space-xs);
        }

        .credential-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .credential-detail {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        /* EXPERTISE GRID */
        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-3xl);
        }

        .expertise-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: var(--space-xl);
          transition: all 0.2s;
        }

        .expertise-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-4px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .card-icon {
          font-size: 2rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .card-content ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .card-content li {
          position: relative;
          padding-left: var(--space-lg);
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .card-content li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-weight: bold;
        }

        /* FOCUS AREAS */
        .focus-areas {
          margin-top: var(--space-3xl);
        }

        .focus-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .focus-item {
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border-radius: 8px;
          border-left: 4px solid var(--accent-primary);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* METHODOLOGY FLOW */
        .methodology-flow {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xl);
          margin-bottom: var(--space-3xl);
        }

        .flow-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-xl);
          align-items: start;
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-family: var(--font-mono);
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .step-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* STANDARDS GRID */
        .standards-section {
          margin-top: var(--space-3xl);
        }

        .standards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
        }

        .standard-item {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-primary);
        }

        .standard-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .standard-content h4 {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .standard-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* MISSION CONTENT */
        .mission-statement {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }

        .mission-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-lg);
        }

        .mission-quote {
          font-size: 1.375rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
          border-left: 4px solid var(--accent-primary);
          padding-left: var(--space-xl);
          margin: 0 auto;
          max-width: 800px;
        }

        /* VALUES GRID */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-3xl);
        }

        .value-item {
          text-align: center;
          padding: var(--space-xl);
          background: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border-primary);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: var(--space-lg);
        }

        .value-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }

        .value-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* GOALS LIST */
        .goals-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .goal-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-xl);
          align-items: start;
        }

        .goal-number {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          background: var(--accent-primary);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .goal-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .goal-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* INVOLVEMENT OPTIONS */
        .contact-description {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--space-xl);
        }

        .involvement-options {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .involvement-item {
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border-radius: 8px;
          border-left: 4px solid var(--accent-primary);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CONTACT SECTION */
        .contact-section {
          background: var(--bg-primary);
          padding: var(--space-3xl) 0;
        }

        .contact-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
        }

        .contact-description {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--space-2xl);
        }

        .contact-methods {
          display: grid;
          gap: var(--space-lg);
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-xl);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .contact-method:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .method-icon {
          font-size: 2rem;
        }

        .method-content {
          text-align: left;
        }

        .method-title {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .method-detail {
          color: var(--text-secondary);
        }

        /* FOOTER */
        .page-footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-primary);
          padding: var(--space-2xl) 0;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-text {
          color: var(--text-secondary);
        }

        .author-name {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .footer-links {
          display: flex;
          gap: var(--space-xl);
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: var(--accent-primary);
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: var(--space-2xl);
          }
          
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .tab-navigation {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 var(--space-md);
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .tab-navigation {
            grid-template-columns: 1fr;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .footer-content {
            flex-direction: column;
            gap: var(--space-lg);
            text-align: center;
          }
          
          .expertise-grid {
            grid-template-columns: 1fr;
          }
          
          .values-grid {
            grid-template-columns: 1fr;
          }
          
          .flow-step {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .panel-title {
            font-size: 2rem;
          }
          
          .contact-method {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}