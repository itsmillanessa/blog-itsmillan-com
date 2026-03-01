import Head from 'next/head'
import { useState } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

const CATEGORY_STYLES = {
  IA: { bg: 'bg-cyan-900/40', text: 'text-primary', border: 'border-cyan-700/50' },
  Ciberseguridad: { bg: 'bg-red-900/40', text: 'text-red-400', border: 'border-red-700/50' },
  Hardware: { bg: 'bg-purple-900/40', text: 'text-purple-400', border: 'border-purple-700/50' },
  Infraestructura: { bg: 'bg-blue-900/40', text: 'text-blue-400', border: 'border-blue-700/50' },
}

function getCategoryStyle(category) {
  const key = Object.keys(CATEGORY_STYLES).find(k =>
    category && category.toLowerCase().includes(k.toLowerCase())
  )
  return CATEGORY_STYLES[key] || { bg: 'bg-slate-800/40', text: 'text-slate-400', border: 'border-slate-700/50' }
}

function formatDate(dateStr) {
  try {
    return format(new Date(dateStr), "dd 'de' MMMM, yyyy", { locale: es })
  } catch { return dateStr }
}

export default function Home({ posts, featuredPost }) {
  const [activeCategory, setActiveCategory] = useState('Todo')

  const categories = ['IA', 'Ciberseguridad', 'Hardware', 'Todo']

  const filteredPosts = activeCategory === 'Todo'
    ? posts
    : posts.filter(p => p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase()))

  const mostRead = [...posts].slice(0, 3)

  return (
    <>
      <Head>
        <title>NOVA FEED | AI & Cybersecurity Intelligence</title>
        <meta name="description" content="Información independiente sobre la vanguardia tecnológica. IA, ciberseguridad, hardware y más." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8449056291567140" crossOrigin="anonymous"></script>
      </Head>

      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#102222] text-slate-100">

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-[#0df2f2]/10 bg-[#102222]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between gap-8">
              <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0df2f2]/20 text-[#0df2f2]">
                    <span className="material-symbols-outlined text-3xl">token</span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tighter text-slate-100">
                    NOVA <span className="text-[#0df2f2]">FEED</span>
                  </h1>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm font-semibold transition-colors hover:text-[#0df2f2] ${activeCategory === cat ? 'text-[#0df2f2]' : 'text-slate-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-end gap-6">
                <div className="relative hidden lg:block w-full max-w-sm">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                  <input
                    className="w-full rounded-full border-none bg-slate-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0df2f2]/50"
                    placeholder="Buscar noticias tech..."
                    type="text"
                  />
                </div>
              </div>
            </div>
            {/* Mobile nav */}
            <div className="flex md:hidden gap-4 pb-3 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold whitespace-nowrap px-3 py-1 rounded-full transition-colors ${activeCategory === cat ? 'bg-[#0df2f2]/20 text-[#0df2f2]' : 'text-slate-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Hero / Featured */}
          {featuredPost && (
            <section className="mb-12">
              <div className="group relative overflow-hidden rounded-xl border-2 border-[#0df2f2]/30 bg-slate-900 shadow-2xl shadow-[#0df2f2]/5">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-[450px] w-full overflow-hidden">
                    <div
                      className="h-full w-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${featuredPost.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop'}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent lg:bg-gradient-to-r" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12 bg-slate-900">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0df2f2]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0df2f2] w-fit">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0df2f2] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0df2f2]"></span>
                      </span>
                      Último artículo
                    </div>
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white lg:text-5xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mb-8 text-lg text-slate-400">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6">
                      <Link
                        href={`/${featuredPost.slug}`}
                        className="rounded-lg bg-[#0df2f2] px-8 py-3 text-sm font-bold text-[#102222] hover:brightness-110 transition-all"
                      >
                        Leer artículo completo
                      </Link>
                      <span className="text-sm font-medium text-slate-500">{featuredPost.readTime || '5 min'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AdSense banner */}
          <div className="mb-8">
            <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-8449056291567140" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main feed */}
            <div className="flex-1">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  {activeCategory === 'Todo' ? 'Últimas Noticias' : activeCategory}
                </h3>
              </div>

              {filteredPosts.length === 0 ? (
                <p className="text-slate-400">No hay artículos en esta categoría aún.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map(post => {
                    const catStyle = getCategoryStyle(post.category)
                    return (
                      <Link href={`/${post.slug}`} key={post.slug} className="group cursor-pointer">
                        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-slate-800">
                          <div
                            className="h-full w-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url('${post.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop'}')` }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`rounded ${catStyle.bg} border ${catStyle.border} px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${catStyle.text} backdrop-blur-sm`}>
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <h4 className="mb-2 text-xl font-bold group-hover:text-[#0df2f2] transition-colors">
                          {post.title}
                        </h4>
                        <p className="mb-4 text-sm text-slate-400 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm" style={{fontSize:'14px'}}>schedule</span>
                            {formatDate(post.date)}
                          </span>
                          <span>{post.readTime || '5 min'}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex flex-col gap-10">
              {/* Most read */}
              <div className="rounded-xl bg-slate-900/50 p-6 border border-slate-800">
                <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0df2f2]" style={{fontSize:'20px'}}>trending_up</span>
                  Lo más leído
                </h3>
                <div className="space-y-6">
                  {mostRead.map((post, i) => (
                    <Link href={`/${post.slug}`} key={post.slug} className="flex gap-4 group cursor-pointer">
                      <span className="text-3xl font-bold text-[#0df2f2]/30 group-hover:text-[#0df2f2] transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h5 className="text-sm font-bold leading-tight group-hover:text-[#0df2f2] transition-colors">
                          {post.title}
                        </h5>
                        <span className="text-[10px] uppercase text-slate-500 font-bold">{post.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="relative overflow-hidden rounded-xl bg-[#0df2f2] p-8 text-[#102222]">
                <div className="relative z-10">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight">Tech Intel Weekly</h3>
                  <p className="mb-6 text-sm font-medium opacity-80">Recibe las noticias más importantes de IA y Ciberseguridad cada viernes.</p>
                  <form className="space-y-3">
                    <input
                      className="w-full rounded-lg border-none bg-[#102222]/10 px-4 py-3 text-sm placeholder:text-[#102222]/50 focus:outline-none focus:ring-2 focus:ring-[#102222]/20"
                      placeholder="Tu correo electrónico"
                      type="email"
                    />
                    <button className="w-full rounded-lg bg-[#102222] px-4 py-3 text-sm font-bold text-white transition-transform active:scale-95">
                      Suscribirme ahora
                    </button>
                  </form>
                </div>
                <span className="material-symbols-outlined absolute -bottom-6 -right-6 opacity-10" style={{fontSize:'9rem'}}>alternate_email</span>
              </div>

              {/* Tags */}
              <div className="p-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Temas populares</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Linux', 'Zero Trust', 'Quantum', 'LLMs', 'API Security', 'Hardware', 'Cloud'].map(tag => (
                    <span key={tag} className="rounded-full border border-slate-800 px-3 py-1 text-xs font-medium hover:border-[#0df2f2] hover:text-[#0df2f2] transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-[#0df2f2]/10 bg-slate-900 py-12 text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1">
                <div className="flex items-center gap-2 text-white mb-6">
                  <span className="material-symbols-outlined text-[#0df2f2]">token</span>
                  <span className="text-xl font-bold tracking-tighter">NOVA <span className="text-[#0df2f2]">FEED</span></span>
                </div>
                <p className="text-sm leading-relaxed mb-6">Información independiente sobre la vanguardia tecnológica. El futuro no espera.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Secciones</h4>
                <ul className="space-y-4 text-sm">
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Inteligencia Artificial</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Ciberseguridad</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Hardware & Gadgets</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Infraestructura</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Comunidad</h4>
                <ul className="space-y-4 text-sm">
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="https://twitter.com/itsmillan" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Newsletter</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Legal</h4>
                <ul className="space-y-4 text-sm">
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Privacidad</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Términos</a></li>
                  <li><a className="hover:text-[#0df2f2] transition-colors" href="#">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
              <p>© 2026 NOVA FEED. Todos los derechos reservados. Powered by Nova 🤖</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const dirs = [
    path.join(process.cwd(), 'content/blog'),
    path.join(process.cwd(), 'content/posts'),
  ]
  let posts = []

  for (const dir of dirs) {
    try {
      if (fs.existsSync(dir)) {
        const filenames = fs.readdirSync(dir)
        const dirPosts = filenames
          .filter(name => name.endsWith('.md'))
          .map(name => {
            const filePath = path.join(dir, name)
            const fileContents = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(fileContents)
            return {
              slug: name.replace(/\.md$/, ''),
              title: data.title || 'Untitled',
              excerpt: data.excerpt || '',
              date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
              category: data.category || 'General',
              readTime: data.readTime || '5 min',
              image: data.image || null,
              featured: data.featured || false,
            }
          })
        posts = posts.concat(dirPosts)
      }
    } catch (e) {
      console.error('Error reading', dir, e)
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  const featuredPost = posts.find(p => p.featured) || posts[0] || null

  return {
    props: {
      posts: posts.map(p => ({ ...p, date: p.date })),
      featuredPost,
    }
  }
}
