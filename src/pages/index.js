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
        <link href="/styles/editorial.css" rel="stylesheet" />
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
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="container">
            <div className="content-container">
              <h1 className="display-1 hero-title">
                Periodismo tecnológico de próxima generación
              </h1>
              <p className="body-large hero-subtitle">
                Las historias más importantes del mundo tech. Análisis profundo, investigación y perspectivas únicas sobre el futuro que estamos construyendo.
              </p>
              <a href="#stories" className="hero-cta">
                Explorar historias
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L8 15M1 8L15 8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLE */}
        {featuredPost && (
          <section className="featured-article">
            <div className="container">
              <a href={`/story/${featuredPost.slug}`} className="featured-card article-card">
                <img 
                  src={featuredPost.image || '/images/featured-placeholder.jpg'} 
                  alt={featuredPost.title}
                  className="featured-image"
                />
                <div className="featured-content">
                  <div className="overline card-category">{featuredPost.category}</div>
                  <h2 className="display-2 card-title">{featuredPost.title}</h2>
                  <p className="body-large card-excerpt">{featuredPost.excerpt}</p>
                  <div className="card-meta">
                    <span className="caption card-date">
                      {format(new Date(featuredPost.date), 'dd \'de\' MMMM, yyyy', { locale: es })}
                    </span>
                    <span className="caption read-time">{featuredPost.readTime || '5 min lectura'}</span>
                  </div>
                </div>
              </a>
            </div>
          </section>
        )}

        {/* ARTICLES GRID */}
        <section id="stories" className="articles-section">
          <div className="container">
            <div className="articles-grid">
              {posts.map((post, index) => (
                <article key={post.slug} className={`article-card ${isLoaded ? 'fade-in-up' : ''}`}>
                  <a href={`/story/${post.slug}`}>
                    <img 
                      src={post.image || `/images/placeholder-${(index % 4) + 1}.jpg`}
                      alt={post.title}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-content">
                      <div className="overline card-category">{post.category}</div>
                      <h3 className="headline card-title">{post.title}</h3>
                      <p className="body card-excerpt">{post.excerpt}</p>
                      <div className="card-meta">
                        <span className="caption card-date">
                          {format(new Date(post.date), 'dd MMM', { locale: es })}
                        </span>
                        <span className="caption read-time">{post.readTime || '5 min lectura'}</span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* LOAD MORE */}
            <div className="text-center mt-xl">
              <button className="hero-cta">
                Cargar más historias
              </button>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SIGNUP */}
        <section className="newsletter">
          <div className="container">
            <div className="content-container">
              <h2 className="display-2 mb-md">Mantente actualizado</h2>
              <p className="body-large mb-0">
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
              <p className="caption mt-md">
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
              <p className="caption mt-sm">
                Hecho con 🤖 por Nova AI • <a href="/about">Sobre el proyecto</a> • <a href="/contact">Contacto</a>
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .editorial-site {
          font-family: 'Inter', sans-serif;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
          animation-delay: ${props => props.index * 0.1}s;
          animation-fill-mode: both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
    // Create sample blog posts if directory doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      
      // Create sample posts
      const samplePosts = [
        {
          filename: '2026-02-01-ai-revolution-workplace.md',
          frontmatter: {
            title: 'La revolución de la IA está transformando los lugares de trabajo más rápido de lo esperado',
            excerpt: 'Un nuevo estudio revela cómo las empresas están adoptando herramientas de inteligencia artificial y el impacto que esto tiene en la productividad y el empleo.',
            date: '2026-02-01',
            category: 'Inteligencia Artificial',
            readTime: '5 min lectura',
            image: '/images/ai-workplace.jpg',
            featured: true
          },
          content: `Las empresas de todo el mundo están experimentando una transformación sin precedentes gracias a la integración de herramientas de inteligencia artificial en sus flujos de trabajo diarios.

Según un nuevo informe de McKinsey, el 67% de las empresas han implementado al menos una herramienta de IA en los últimos 12 meses, una cifra que se ha triplicado desde 2023.

## El cambio está siendo más rápido de lo esperado

Los datos muestran que la adopción de IA no solo está creciendo, sino que se está acelerando exponencialmente. Las áreas más impactadas incluyen:

- **Atención al cliente**: Chatbots y asistentes virtuales
- **Análisis de datos**: Automatización de insights y reportes  
- **Creación de contenido**: Generación automática de textos y materiales
- **Programación**: Asistentes de código y debugging automático

## Impacto en el empleo

Contrario a los temores iniciales, el estudio sugiere que la IA está creando más empleos de los que elimina, pero está cambiando radicalmente las habilidades requeridas.

Las empresas reportan una necesidad urgente de reentrenar a sus empleados en habilidades relacionadas con IA, gestión de datos y pensamiento crítico.

> "No se trata de reemplazar humanos, sino de amplificar sus capacidades", dice Sarah Chen, directora de innovación en TechCorp.

El futuro del trabajo está aquí, y quienes se adapten más rápido tendrán ventaja competitiva.`
        },
        {
          filename: '2026-02-01-quantum-computing-breakthrough.md',
          frontmatter: {
            title: 'Breakthrough cuántico: IBM logra corrección de errores estable por primera vez',
            excerpt: 'El nuevo chip cuántico de IBM marca un hito histórico al mantener coherencia cuántica durante más de 100 microsegundos, abriendo la puerta a aplicaciones prácticas.',
            date: '2026-02-01',
            category: 'Tecnología',
            readTime: '4 min lectura',
            image: '/images/quantum-chip.jpg'
          },
          content: `IBM ha anunciado un breakthrough revolucionario en computación cuántica que podría cambiar el futuro de la tecnología tal como la conocemos...`
        },
        {
          filename: '2026-02-01-cybersecurity-trends.md',
          frontmatter: {
            title: 'Los hackers están usando IA para crear ataques imposibles de detectar',
            excerpt: 'Nuevas técnicas de machine learning están siendo utilizadas por cibercriminales para evadir sistemas de seguridad tradicionales.',
            date: '2026-02-01',
            category: 'Ciberseguridad',
            readTime: '6 min lectura',
            image: '/images/ai-hacking.jpg'
          },
          content: `El panorama de ciberseguridad está evolucionando a una velocidad alarmante...`
        }
      ]

      samplePosts.forEach(post => {
        const content = `---
title: "${post.frontmatter.title}"
excerpt: "${post.frontmatter.excerpt}"
date: "${post.frontmatter.date}"
category: "${post.frontmatter.category}"
readTime: "${post.frontmatter.readTime}"
image: "${post.frontmatter.image}"
${post.frontmatter.featured ? 'featured: true' : ''}
---

${post.content}`
        
        fs.writeFileSync(path.join(postsDirectory, post.filename), content)
      })
    }

    const filenames = fs.readdirSync(postsDirectory)
    
    posts = filenames
      .filter(name => name.endsWith('.md'))
      .map((name) => {
        const filePath = path.join(postsDirectory, name)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        
        return {
          slug: name.replace(/\.md$/, ''),
          title: data.title,
          excerpt: data.excerpt,
          date: data.date,
          category: data.category,
          readTime: data.readTime,
          image: data.image,
          featured: data.featured || false,
          content: content
        }
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    // Get featured post
    featuredPost = posts.find(post => post.featured) || posts[0]
    
    // Remove featured from regular posts list
    posts = posts.filter(post => !post.featured)

  } catch (error) {
    console.error('Error loading blog posts:', error)
    posts = []
    featuredPost = null
  }

  return {
    props: {
      posts: posts.slice(0, 6), // Show first 6 posts
      featuredPost
    }
  }
}