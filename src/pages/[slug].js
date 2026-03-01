import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

function formatDate(dateStr) {
  try {
    return format(new Date(dateStr), "dd 'de' MMMM, yyyy", { locale: es })
  } catch { return dateStr }
}

const CATEGORY_STYLES = {
  IA: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/50',
  Ciberseguridad: 'bg-red-900/40 text-red-400 border-red-700/50',
  Hardware: 'bg-purple-900/40 text-purple-400 border-purple-700/50',
  Infraestructura: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
}

function getCategoryClass(category) {
  const key = Object.keys(CATEGORY_STYLES).find(k =>
    category && category.toLowerCase().includes(k.toLowerCase())
  )
  return CATEGORY_STYLES[key] || 'bg-slate-800/40 text-slate-400 border-slate-700/50'
}

export default function PostPage({ post }) {
  if (!post) {
    return (
      <>
        <Head>
          <title>Not Found | NOVA FEED</title>
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <div className="min-h-screen bg-[#102222] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-[#0df2f2]">404</h1>
            <p className="text-slate-400 my-4">Artículo no encontrado.</p>
            <Link href="/" className="text-[#0df2f2] hover:underline">← Volver al inicio</Link>
          </div>
        </div>
      </>
    )
  }

  const catClass = getCategoryClass(post.category)

  return (
    <>
      <Head>
        <title>{post.title} | NOVA FEED</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8449056291567140" crossOrigin="anonymous"></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": { "@type": "Person", "name": "Alexis Millán" },
            "publisher": { "@type": "Organization", "name": "NOVA FEED" },
            "datePublished": post.date,
          })
        }} />
      </Head>

      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#102222] text-slate-100">

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-[#0df2f2]/10 bg-[#102222]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0df2f2]/20 text-[#0df2f2]">
                  <span className="material-symbols-outlined text-3xl">token</span>
                </div>
                <span className="text-2xl font-bold tracking-tighter text-slate-100">
                  NOVA <span className="text-[#0df2f2]">FEED</span>
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-[#0df2f2] transition-colors">IA</Link>
                <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-[#0df2f2] transition-colors">Ciberseguridad</Link>
                <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-[#0df2f2] transition-colors">Hardware</Link>
                <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-[#0df2f2] transition-colors">Todo</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Article Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[#0df2f2] text-sm font-medium mb-8 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined" style={{fontSize:'16px'}}>arrow_back</span>
            Volver a reportes
          </Link>

          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className={`rounded border px-3 py-1 text-xs font-bold uppercase tracking-widest ${catClass}`}>
              {post.category}
            </span>
            <span className="text-sm text-slate-500">{formatDate(post.date)}</span>
            <span className="text-sm text-slate-500">{post.readTime || '5 min read'}</span>
            <span className="text-sm text-slate-500">Alexis Millán</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-slate-400 leading-relaxed mb-8 border-l-4 border-[#0df2f2]/40 pl-6">
              {post.excerpt}
            </p>
          )}

          {post.image && (
            <div className="mb-8 rounded-xl overflow-hidden border border-slate-800">
              <img src={post.image} alt={post.title} className="w-full object-cover" style={{maxHeight:'450px', width:'100%'}} />
            </div>
          )}

          {/* AdSense */}
          <div className="mb-8">
            <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-8449056291567140" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
          </div>

          {/* Article content */}
          <div
            className="article-body text-slate-200"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="rounded-full border border-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center gap-4 flex-wrap p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <span className="text-sm text-slate-400 font-semibold">Compartir:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:border-[#0df2f2] hover:text-[#0df2f2] transition-colors"
            >
              Twitter / X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://blog.itsmillan.com/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:border-[#0df2f2] hover:text-[#0df2f2] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-[#0df2f2]/10 bg-slate-900 py-8 text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 text-white mb-4">
              <span className="material-symbols-outlined text-[#0df2f2]">token</span>
              <span className="text-xl font-bold tracking-tighter">NOVA <span className="text-[#0df2f2]">FEED</span></span>
            </div>
            <p className="text-xs text-slate-500">© 2026 NOVA FEED. Todos los derechos reservados. Powered by Nova 🤖</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const dirs = [
    path.join(process.cwd(), 'content', 'blog'),
    path.join(process.cwd(), 'content', 'posts'),
  ]
  let paths = []
  for (const dir of dirs) {
    try {
      if (fs.existsSync(dir)) {
        const filenames = fs.readdirSync(dir)
        const dirPaths = filenames
          .filter(name => name.endsWith('.md'))
          .map(filename => ({ params: { slug: filename.replace('.md', '') } }))
        paths = paths.concat(dirPaths)
      }
    } catch (e) {
      console.log('Dir not found:', dir)
    }
  }
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const dirs = [
    path.join(process.cwd(), 'content', 'blog'),
    path.join(process.cwd(), 'content', 'posts'),
  ]
  for (const dir of dirs) {
    try {
      const filePath = path.join(dir, `${params.slug}.md`)
      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        return {
          props: {
            post: {
              slug: params.slug,
              title: data.title || 'Untitled',
              date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
              excerpt: data.excerpt || '',
              category: data.category || 'General',
              readTime: data.readTime || null,
              image: data.image || null,
              tags: data.tags || [],
              contentHtml: marked(content),
            }
          }
        }
      }
    } catch (e) {}
  }
  return { props: { post: null } }
}
