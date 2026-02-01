#!/usr/bin/env python3
"""
🗺️ SITEMAP GENERATOR - Tech Digest
Genera sitemap.xml automáticamente para SEO premium
"""

import os
import glob
import xml.etree.ElementTree as ET
from datetime import datetime
import frontmatter

def generate_sitemap():
    """Generar sitemap.xml completo"""
    print("🗺️ Generating premium sitemap...")
    
    # URLs base
    base_url = "https://blog.itsmillan.com"
    
    # Root element
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    urlset.set("xmlns:news", "http://www.google.com/schemas/sitemap-news/0.9")
    urlset.set("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
    urlset.set("xmlns:image", "http://www.google.com/schemas/sitemap-image/1.1")
    
    # Static pages
    static_pages = [
        {"url": "/", "priority": "1.0", "changefreq": "daily"},
        {"url": "/about", "priority": "0.8", "changefreq": "monthly"},
        {"url": "/archivo", "priority": "0.9", "changefreq": "weekly"},
        {"url": "/privacy", "priority": "0.3", "changefreq": "yearly"},
        {"url": "/terms", "priority": "0.3", "changefreq": "yearly"},
        {"url": "/contact", "priority": "0.5", "changefreq": "monthly"},
    ]
    
    # Add static pages
    for page in static_pages:
        url_elem = ET.SubElement(urlset, "url")
        ET.SubElement(url_elem, "loc").text = f"{base_url}{page['url']}"
        ET.SubElement(url_elem, "lastmod").text = datetime.now().strftime("%Y-%m-%d")
        ET.SubElement(url_elem, "changefreq").text = page["changefreq"]
        ET.SubElement(url_elem, "priority").text = page["priority"]
    
    # Add dynamic posts
    posts_dir = "content/posts"
    if os.path.exists(posts_dir):
        for post_file in glob.glob(f"{posts_dir}/*.md"):
            try:
                with open(post_file, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)
                
                # Extract post data
                filename = os.path.basename(post_file).replace('.md', '')
                title = post.metadata.get('title', 'Tech Digest')
                date = post.metadata.get('date', datetime.now().isoformat())
                categories = post.metadata.get('categories', [])
                
                # Convert date to proper format
                if isinstance(date, str):
                    try:
                        date_obj = datetime.fromisoformat(date.replace('Z', '+00:00'))
                        lastmod = date_obj.strftime("%Y-%m-%d")
                    except:
                        lastmod = datetime.now().strftime("%Y-%m-%d")
                else:
                    lastmod = date.strftime("%Y-%m-%d")
                
                # Add URL to sitemap
                url_elem = ET.SubElement(urlset, "url")
                ET.SubElement(url_elem, "loc").text = f"{base_url}/{filename}/"
                ET.SubElement(url_elem, "lastmod").text = lastmod
                ET.SubElement(url_elem, "changefreq").text = "monthly"
                ET.SubElement(url_elem, "priority").text = "0.8"
                
                # Add News sitemap data for recent posts (last 3 days)
                date_obj = datetime.fromisoformat(date.replace('Z', '+00:00')) if isinstance(date, str) else date
                if (datetime.now() - date_obj).days <= 3:
                    news_elem = ET.SubElement(url_elem, "news:news")
                    news_pub = ET.SubElement(news_elem, "news:publication")
                    ET.SubElement(news_pub, "news:name").text = "Tech Digest"
                    ET.SubElement(news_pub, "news:language").text = "es"
                    
                    news_article = ET.SubElement(news_elem, "news:publication_date")
                    news_article.text = date_obj.strftime("%Y-%m-%d")
                    
                    ET.SubElement(news_elem, "news:title").text = title
                    
                    if categories:
                        ET.SubElement(news_elem, "news:keywords").text = ", ".join(categories)
                
                print(f"✅ Added post: {filename}")
                
            except Exception as e:
                print(f"❌ Error processing {post_file}: {e}")
    
    # Add category pages
    categories = ["ai-ml", "cybersecurity", "programming", "mobile", "general-tech"]
    for category in categories:
        url_elem = ET.SubElement(urlset, "url")
        ET.SubElement(url_elem, "loc").text = f"{base_url}/category/{category}/"
        ET.SubElement(url_elem, "lastmod").text = datetime.now().strftime("%Y-%m-%d")
        ET.SubElement(url_elem, "changefreq").text = "weekly"
        ET.SubElement(url_elem, "priority").text = "0.7"
    
    # Write sitemap
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    
    output_file = "public/sitemap.xml"
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    tree.write(output_file, encoding="utf-8", xml_declaration=True)
    
    print(f"✅ Sitemap generated: {output_file}")
    
    # Generate sitemap index if needed
    generate_sitemap_index()

def generate_sitemap_index():
    """Generar sitemap index para múltiples sitemaps"""
    sitemaps = [
        {"url": "/sitemap.xml", "lastmod": datetime.now().strftime("%Y-%m-%d")},
    ]
    
    # Create RSS sitemap entry
    rss_lastmod = datetime.now().strftime("%Y-%m-%d")
    
    sitemapindex = ET.Element("sitemapindex")
    sitemapindex.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    
    for sitemap_data in sitemaps:
        sitemap_elem = ET.SubElement(sitemapindex, "sitemap")
        ET.SubElement(sitemap_elem, "loc").text = f"https://blog.itsmillan.com{sitemap_data['url']}"
        ET.SubElement(sitemap_elem, "lastmod").text = sitemap_data["lastmod"]
    
    # Write sitemap index
    tree = ET.ElementTree(sitemapindex)
    ET.indent(tree, space="  ")
    tree.write("public/sitemap-index.xml", encoding="utf-8", xml_declaration=True)
    
    print("✅ Sitemap index generated")

def generate_robots_txt():
    """Generar robots.txt optimizado"""
    robots_content = f"""# Tech Digest - Premium Blog
User-agent: *
Allow: /

# Prioritize important content
Allow: /tech-digest-*
Allow: /category/
Allow: /about
Allow: /rss.xml

# Block admin/dev paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /.vercel/

# Sitemaps
Sitemap: https://blog.itsmillan.com/sitemap.xml
Sitemap: https://blog.itsmillan.com/rss.xml

# AdSense Bot
User-agent: Mediapartners-Google
Allow: /

# Analytics Bots
User-agent: AdsBot-Google
Allow: /

User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
# Powered by NovaSecOps AI
"""
    
    with open("public/robots.txt", "w") as f:
        f.write(robots_content)
    
    print("✅ robots.txt generated")

def main():
    """Main sitemap generation"""
    print("🚀 STARTING SITEMAP GENERATION")
    print("=" * 40)
    
    generate_sitemap()
    generate_robots_txt()
    
    print("✅ SEO FILES GENERATED SUCCESSFULLY")
    print("📊 Ready for search engines!")

if __name__ == "__main__":
    main()