import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function PostPage({ post }) {
  if (!post) {
    return (
      <>
        <Head>
          <title>Not Found | CyberIntel Daily</title>
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <div className="error-page">
          <div className="error-box">
            <h1>404</h1>
            <p>Article not found.</p>
            <a href="/">← Back to home</a>
          </div>
        </div>
        <style jsx global>{`
          body { background: #0a0a0a; color: #e6edf3; font-family: 'JetBrains Mono', monospace; }
          .error-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
          .error-box { text-align: center; }
          .error-box h1 { font-size: 4rem; color: #00ff41; }
          .error-box p { color: #8b949e; margin: 12px 0 24px; }
          .error-box a { color: #00ff41; }
        `}</style>
      </>
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
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Alexis Millán" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": { "@type": "Person", "name": "Alexis Millán" },
            "publisher": { "@type": "Organization", "name": "CyberIntel Daily" },
            "datePublished": post.date,
            "dateModified": post.date
          })
        }} />
      </Head>

      <div className="site">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <a href="/" className="logo">
                <span className="logo-accent">Cyber</span>Intel <span className="logo-accent">Daily</span>
              </a>
              <nav className="nav">
                <a href="/" className="nav-link">Home</a>
                <a href="/about" className="nav-link">About</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Article Header */}
        <section className="article-hero">
          <div className="container">
            <a href="/" className="back-link">← Back to reports</a>
            <div className="article-meta-row">
              <span className="tag">{post.category || 'Intel'}</span>
              <span className="meta-text">{format(new Date(post.date), "dd 'de' MMMM, yyyy", { locale: es })}</span>
              <span className="meta-text">{post.readTime || Math.ceil((post.contentHtml?.length || 0) / 1000) + ' min read'}</span>
              <span className="meta-text">Alexis Millán</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt && <p className="article-excerpt">{post.excerpt}</p>}
          </div>
        </section>

        {/* Article Image */}
        {post.image && (
          <div className="article-image-wrapper">
            <div className="container">
              <img src={post.image} alt={post.title} className="article-image" />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="article-content-section">
          <div className="container">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <section className="tags-section">
            <div className="container">
              <div className="tags-list">
                {post.tags.map(tag => (
                  <span key={tag} className="tag-pill">#{tag}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Share */}
        <section className="share-section">
          <div className="container">
            <div className="share-bar">
              <span className="share-label">Share this report:</span>
              <div className="share-buttons">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}`} target="_blank" rel="noopener noreferrer" className="share-btn">Twitter</a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}/`)}`} target="_blank" rel="noopener noreferrer" className="share-btn">LinkedIn</a>
                <button onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')} className="share-btn">Copy Link</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand"><span className="logo-accent">Cyber</span>Intel <span className="logo-accent">Daily</span></div>
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
          --green-dark: #003d10;
          --text: #e6edf3;
          --text-dim: #8b949e;
          --text-muted: #484f58;
          --font-mono: 'JetBrains Mono', monospace;
          --font-sans: 'Inter', -apple-system, sans-serif;
          --container: 800px;
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
        .container { max-width: var(--container); margin: 0 auto; padding: 0 20px; }

        /* HEADER */
        .header {
          border-bottom: 1px solid var(--border);
          padding: 16px 0;
          position: sticky; top: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
        }
        .header .container { max-width: 1100px; }
        .header-inner { display: flex; align-items: center; justify-content: space-between; }
        .logo { font-family: var(--font-mono); font-size: 1.3rem; font-weight: 700; }
        .logo-accent { color: var(--green); }
        .nav { display: flex; gap: 24px; }
        .nav-link { font-size: 0.9rem; color: var(--text-dim); transition: color 0.2s; font-weight: 500; }
        .nav-link:hover { color: var(--green); }

        /* ARTICLE HERO */
        .article-hero { padding: 40px 0 24px; }
        .back-link {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--green);
          display: inline-block;
          margin-bottom: 24px;
          transition: opacity 0.2s;
        }
        .back-link:hover { opacity: 0.8; }
        .article-meta-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;
        }
        .tag {
          font-family: var(--font-mono); font-size: 0.7rem; color: var(--green);
          text-transform: uppercase; letter-spacing: 0.1em;
          border: 1px solid var(--green-dark); padding: 3px 10px; border-radius: 4px;
        }
        .meta-text { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }
        .article-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 700; line-height: 1.25; margin-bottom: 16px;
        }
        .article-excerpt { font-size: 1.05rem; color: var(--text-dim); line-height: 1.7; }

        /* ARTICLE IMAGE */
        .article-image-wrapper { padding: 24px 0; }
        .article-image { width: 100%; border-radius: var(--radius); border: 1px solid var(--border); }

        /* ARTICLE CONTENT */
        .article-content-section { padding: 16px 0 40px; }
        .article-body { font-size: 1.05rem; line-height: 1.8; color: var(--text); }
        .article-body h1 {
          font-size: 1.8rem; font-weight: 700; margin: 2.5rem 0 1rem;
          color: var(--text); border-bottom: 2px solid var(--border); padding-bottom: 8px;
        }
        .article-body h2 {
          font-size: 1.4rem; font-weight: 600; margin: 2rem 0 0.75rem;
          color: var(--green); 
        }
        .article-body h3 {
          font-size: 1.15rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: var(--text);
        }
        .article-body p { margin: 1rem 0; }
        .article-body ul, .article-body ol { margin: 1rem 0; padding-left: 1.5rem; }
        .article-body li { margin: 0.5rem 0; }
        .article-body strong { color: #fff; font-weight: 600; }
        .article-body em { color: var(--text-dim); }
        .article-body blockquote {
          border-left: 3px solid var(--green); margin: 1.5rem 0; padding: 12px 20px;
          background: var(--bg-card); border-radius: 0 var(--radius) var(--radius) 0;
          font-style: italic; color: var(--text-dim);
        }
        .article-body code {
          font-family: var(--font-mono); font-size: 0.85em;
          background: var(--bg-card); padding: 2px 6px; border-radius: 3px;
          border: 1px solid var(--border); color: var(--green);
        }
        .article-body pre {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 16px; overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-body pre code {
          background: none; border: none; padding: 0; font-size: 0.85rem;
        }
        .article-body a { color: var(--green); border-bottom: 1px solid transparent; }
        .article-body a:hover { border-bottom-color: var(--green); }
        .article-body hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

        /* TAGS */
        .tags-section { padding: 0 0 32px; }
        .tags-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-pill {
          font-family: var(--font-mono); font-size: 0.75rem; color: var(--green-dim);
          background: var(--bg-card); border: 1px solid var(--border); padding: 4px 12px;
          border-radius: 20px;
        }

        /* SHARE */
        .share-section { padding: 0 0 40px; }
        .share-bar {
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          padding: 20px; background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius);
        }
        .share-label { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); }
        .share-buttons { display: flex; gap: 10px; }
        .share-btn {
          font-family: var(--font-mono); font-size: 0.75rem;
          padding: 6px 14px; border-radius: 4px; border: 1px solid var(--border);
          background: transparent; color: var(--text-dim); cursor: pointer;
          transition: all 0.2s;
        }
        .share-btn:hover { border-color: var(--green); color: var(--green); }

        /* FOOTER */
        .footer { border-top: 1px solid var(--border); padding: 32px 0; }
        .footer .container { max-width: 1100px; }
        .footer-inner { text-align: center; }
        .footer-brand { font-family: var(--font-mono); font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        .footer-copy { font-size: 0.8rem; color: var(--text-muted); }

        @media (max-width: 768px) {
          .article-title { font-size: 1.5rem; }
          .article-body { font-size: 1rem; }
          .nav { gap: 16px; }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog')
  let paths = []
  try {
    const filenames = fs.readdirSync(postsDirectory)
    paths = filenames
      .filter(name => name.endsWith('.md'))
      .map(filename => ({ params: { slug: filename.replace('.md', '') } }))
  } catch (error) {
    console.log('Posts directory not found')
  }
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'blog')
    const filePath = path.join(postsDirectory, `${params.slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      props: {
        post: {
          slug: params.slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          category: data.category || 'General',
          readTime: data.readTime || null,
          image: data.image || null,
          tags: data.tags || [],
          categories: data.categories || [],
          sources: data.sources || [],
          contentHtml: marked(content)
        }
      }
    }
  } catch (error) {
    return { props: { post: null } }
  }
}
