#!/usr/bin/env python3
"""
Sitemap Generator para Tech Blog
Genera sitemap.xml automáticamente basado en posts
"""

import os
import json
from datetime import datetime
import xml.etree.ElementTree as ET

def generate_sitemap():
    """Generar sitemap.xml para el blog"""
    print("🗺️ Generating sitemap.xml...")
    
    # Base URL
    base_url = "https://blog.itsmillan.com"
    
    # Create root element
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    
    # Homepage
    url = ET.SubElement(urlset, "url")
    ET.SubElement(url, "loc").text = base_url
    ET.SubElement(url, "lastmod").text = datetime.now().strftime('%Y-%m-%d')
    ET.SubElement(url, "changefreq").text = "daily"
    ET.SubElement(url, "priority").text = "1.0"
    
    # RSS Feed
    url = ET.SubElement(urlset, "url")
    ET.SubElement(url, "loc").text = f"{base_url}/rss.xml"
    ET.SubElement(url, "lastmod").text = datetime.now().strftime('%Y-%m-%d')
    ET.SubElement(url, "changefreq").text = "daily"
    ET.SubElement(url, "priority").text = "0.8"
    
    # Posts
    posts_dir = "./content/posts"
    if os.path.exists(posts_dir):
        for filename in os.listdir(posts_dir):
            if filename.endswith('.md'):
                slug = filename.replace('.md', '')
                
                # Read post to get date
                post_date = datetime.now().strftime('%Y-%m-%d')
                try:
                    with open(os.path.join(posts_dir, filename), 'r', encoding='utf-8') as f:
                        content = f.read()
                        if 'date:' in content:
                            # Extract date from frontmatter
                            for line in content.split('\n'):
                                if line.startswith('date:'):
                                    date_str = line.split(':', 1)[1].strip(' "')
                                    post_date = datetime.fromisoformat(date_str.replace('Z', '+00:00')).strftime('%Y-%m-%d')
                                    break
                except:
                    pass
                
                url = ET.SubElement(urlset, "url")
                ET.SubElement(url, "loc").text = f"{base_url}/{slug}/"
                ET.SubElement(url, "lastmod").text = post_date
                ET.SubElement(url, "changefreq").text = "weekly"
                ET.SubElement(url, "priority").text = "0.9"
    
    # Write sitemap
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ", level=0)
    
    sitemap_path = "./public/sitemap.xml"
    os.makedirs(os.path.dirname(sitemap_path), exist_ok=True)
    
    with open(sitemap_path, 'wb') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n'.encode('utf-8'))
        tree.write(f, encoding='utf-8')
    
    print(f"✅ Sitemap generated: {sitemap_path}")
    return True

def generate_manifest():
    """Generar manifest.json para PWA"""
    print("📱 Generating manifest.json...")
    
    manifest = {
        "name": "Tech Digest | Blog de Millán",
        "short_name": "Tech Digest",
        "description": "Noticias diarias de tecnología, IA y ciberseguridad analizadas automáticamente por NovaSecOps",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#3b82f6",
        "icons": [
            {
                "src": "/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/icon-512.png", 
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "categories": ["news", "technology", "education"],
        "lang": "es",
        "scope": "/",
        "orientation": "portrait-primary"
    }
    
    manifest_path = "./public/manifest.json"
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Manifest generated: {manifest_path}")
    return True

def main():
    """Ejecutar generadores"""
    print("🔧 SEO Assets Generator")
    print("=" * 40)
    
    generate_sitemap()
    generate_manifest()
    
    print("\n✅ All SEO assets generated successfully!")
    print("\nNext steps:")
    print("1. Submit sitemap to Google Search Console")
    print("2. Verify manifest.json in Chrome DevTools")
    print("3. Test PWA installation")

if __name__ == "__main__":
    main()