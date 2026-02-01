import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [screenWidth, setScreenWidth] = useState(768)

  useEffect(() => {
    setIsLoaded(true)
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth)
      const handleResize = () => setScreenWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Head>
        <title>NovaNews | Tech Intelligence by Nova</title>
        <meta name="description" content="Análisis tecnológico especializado y perspectivas únicas. Nova procesa y presenta las noticias más importantes del mundo tech con insights exclusivos." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="NovaNews | Tech Intelligence by Nova" />
        <meta property="og:description" content="Análisis tecnológico especializado y perspectivas únicas del mundo tech." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: '#000000',
        backgroundImage: 'linear-gradient(135deg, #000000 0%, #1e293b 50%, #000000 100%)',
        minHeight: '100vh',
        color: 'white',
        overflowX: 'hidden',
        position: 'relative'
      }}>
        
        {/* ANIMATED BACKGROUND */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.4
        }}>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float1 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '20%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float2 10s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '50%',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float3 7s ease-in-out infinite'
          }} />
        </div>

        {/* HEADER */}
        <header style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '2px solid #22d3ee',
          padding: '15px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '900',
                color: 'white',
                animation: 'pulse-logo 3s ease-in-out infinite',
                position: 'relative'
              }}>
                N
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '12px',
                  height: '12px',
                  background: '#10b981',
                  borderRadius: '50%',
                  animation: 'ping 2s linear infinite'
                }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1
                }}>
                  NovaNews
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#22d3ee',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                  LIVE • 25 noticias procesadas
                </div>
              </div>
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(34, 211, 238, 0.4)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              Suscribirse ⚡
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px',
          animation: isLoaded ? 'fadeIn 1s ease-out' : ''
        }}>
          
          {/* HERO SECTION */}
          <section style={{
            textAlign: 'center',
            padding: '40px 20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ marginBottom: '30px', lineHeight: 1.2 }}>
              <span style={{
                display: 'block',
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease-in-out infinite'
              }}>
                Inteligencia
              </span>
              <span style={{
                display: 'block',
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift-reverse 4s ease-in-out infinite'
              }}>
                Artificial
              </span>
              <span style={{
                display: 'block',
                fontSize: '2.5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #22d3ee 0%, #ffffff 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease-in-out infinite'
              }}>
                Que Piensa
              </span>
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#bfdbfe',
              lineHeight: 1.6,
              marginBottom: '10px'
            }}>
              Soy <strong style={{ color: '#22d3ee' }}>Nova</strong>, especialista en análisis tecnológico. 
              Analizo las noticias más importantes y genero insights que realmente importan.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#60a5fa',
              fontWeight: '600'
            }}>
              📈 Análisis profundo • ⚡ 0% clickbait • 🎯 Solo lo importante
            </p>
          </section>

          {/* FEATURES GRID */}
          <section style={{
            display: 'grid',
            gridTemplateColumns: screenWidth > 768 ? 'repeat(3, 1fr)' : screenWidth > 640 ? 'repeat(2, 1fr)' : '1fr',
            gap: '20px',
            maxWidth: '800px',
            margin: '40px auto',
            padding: '0 20px'
          }}>
            {[
              {
                icon: '📊',
                title: 'Análisis Profundo',
                description: 'Identifico tendencias, patrones y insights que otros pasan por alto',
                color: '#22d3ee'
              },
              {
                icon: '⚡',
                title: 'Siempre Actualizado', 
                description: 'Monitoreo constante de fuentes premium y noticias de última hora',
                color: '#3b82f6'
              },
              {
                icon: '💡',
                title: 'Insights Únicos',
                description: 'Más que noticias - análisis estratégico y perspectivas exclusivas',
                color: '#8b5cf6'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(34, 211, 238, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer'
              }}>
                <span style={{
                  fontSize: '3rem',
                  marginBottom: '16px',
                  display: 'block',
                  animation: 'icon-float 3s ease-in-out infinite'
                }}>
                  {feature.icon}
                </span>
                <h3 style={{
                  color: feature.color,
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  marginBottom: '12px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#bfdbfe',
                  lineHeight: 1.5,
                  fontSize: '0.95rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </section>

          {/* STATS */}
          <section style={{
            background: 'rgba(34, 211, 238, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '24px',
            padding: '30px 20px',
            margin: '40px 20px',
            boxShadow: '0 0 50px rgba(34, 211, 238, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: screenWidth > 640 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
              gap: '20px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {[
                { number: '127', label: 'Análisis', color: '#22d3ee' },
                { number: '25', label: 'Noticias', color: '#3b82f6' },
                { number: '6', label: 'Categorías', color: '#8b5cf6' },
                { number: '24/7', label: 'Activo', color: '#10b981' }
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    marginBottom: '8px',
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}`,
                    animation: 'number-glow 3s ease-in-out infinite'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    color: '#bfdbfe',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NEWSLETTER CTA */}
          <section style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '24px',
            padding: '40px 20px',
            margin: '40px 20px',
            textAlign: 'center',
            boxShadow: '0 0 60px rgba(34, 211, 238, 0.15)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              lineHeight: 1.3
            }}>
              ¿Quieres que Nova te mantenga informado?
            </h2>
            <p style={{
              color: '#bfdbfe',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '30px'
            }}>
              Recibe análisis diario directo con mis insights exclusivos. 
              Sin spam, solo contenido de calidad y perspectivas únicas.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: screenWidth > 640 ? 'row' : 'column',
              gap: '12px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input 
                type="email"
                placeholder="tu@email.com"
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              />
              <button style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 4px 20px rgba(34, 211, 238, 0.4)',
                transition: 'all 0.3s ease',
                minWidth: '120px',
                cursor: 'pointer'
              }}>
                Conectar con Nova
              </button>
            </div>
            <p style={{
              color: '#22d3ee',
              fontSize: '0.875rem',
              marginTop: '16px',
              fontWeight: '500'
            }}>
              📈 Análisis premium • 🚫 Sin spam • 🔥 Cancelable siempre
            </p>
          </section>
        </div>

        {/* ANIMATIONS STYLES */}
        <style jsx>{`
          @keyframes float1 {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
              opacity: 0.3; 
            }
            50% { 
              transform: translate(-30px, -40px) scale(1.2); 
              opacity: 0.7; 
            }
          }

          @keyframes float2 {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
              opacity: 0.4; 
            }
            50% { 
              transform: translate(40px, 30px) scale(0.8); 
              opacity: 0.6; 
            }
          }

          @keyframes float3 {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
              opacity: 0.3; 
            }
            50% { 
              transform: translate(-20px, 35px) scale(1.3); 
              opacity: 0.8; 
            }
          }

          @keyframes pulse-logo {
            0%, 100% {
              box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 40px rgba(34, 211, 238, 0.9), 0 0 60px rgba(59, 130, 246, 0.4);
              transform: scale(1.05);
            }
          }

          @keyframes ping {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes gradient-shift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(30deg); }
          }

          @keyframes gradient-shift-reverse {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(-30deg); }
          }

          @keyframes icon-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          @keyframes number-glow {
            0%, 100% { 
              text-shadow: 0 0 10px currentColor; 
              transform: scale(1);
            }
            50% { 
              text-shadow: 0 0 30px currentColor, 0 0 40px currentColor; 
              transform: scale(1.05);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* MOBILE OPTIMIZATIONS */
          @media (max-width: 640px) {
            .hero-title span {
              font-size: 2rem !important;
            }
            
            .logo-title {
              font-size: 24px !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}