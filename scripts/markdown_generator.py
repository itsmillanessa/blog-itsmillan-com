#!/usr/bin/env python3
"""
Markdown Generator para Blog Vercel
Convierte el output del AI processor a Markdown para Next.js
"""

import json
import os
from datetime import datetime
from typing import Dict, Any
import re

class MarkdownGenerator:
    def __init__(self):
        self.content_dir = "./content/posts"
        self.public_dir = "./public"
        os.makedirs(self.content_dir, exist_ok=True)
        os.makedirs(self.public_dir, exist_ok=True)
    
    def convert_blog_post_to_markdown(self, blog_post_file: str) -> str:
        """Convierte blog post JSON a Markdown con frontmatter"""
        print(f"🔄 Converting {blog_post_file} to Markdown...")
        
        # Load blog post data
        with open(blog_post_file, 'r', encoding='utf-8') as f:
            blog_post = json.load(f)
        
        # Extract data
        title = blog_post.get('title', 'Tech Digest')
        date = blog_post.get('date', datetime.now().isoformat())
        excerpt = blog_post.get('excerpt', '')
        content = blog_post.get('content', '')
        trends_analysis = blog_post.get('trends_analysis', {})
        metadata = blog_post.get('metadata', {})
        seo = blog_post.get('seo', {})
        
        # Create frontmatter
        frontmatter = f"""---
title: "{title}"
date: "{date}"
excerpt: "{excerpt}"
author: "NovaSecOps"
tags: {json.dumps(seo.get('keywords', ['tech', 'ai', 'news']))}
categories: {json.dumps(list(metadata.get('categories', {}).keys()))}
total_stories: {metadata.get('total_stories', 0)}
sources: {json.dumps(metadata.get('sources', []))}
slug: "{blog_post.get('slug', 'tech-digest')}"
---

"""
        
        # Process content
        if isinstance(content, dict) and content.get('fallback'):
            # Generate content from available data
            processed_content = self.generate_content_from_metadata(metadata, trends_analysis)
        elif isinstance(content, str):
            processed_content = content
        else:
            processed_content = self.generate_content_from_metadata(metadata, trends_analysis)
        
        # Add trends analysis section
        if trends_analysis and isinstance(trends_analysis, dict) and not trends_analysis.get('fallback'):
            trends_section = self.format_trends_analysis(trends_analysis)
            processed_content += f"\n\n{trends_section}"
        
        # Complete markdown
        markdown_content = frontmatter + processed_content
        
        # Save to content directory
        slug = blog_post.get('slug', f"tech-digest-{datetime.now().strftime('%Y-%m-%d')}")
        output_file = os.path.join(self.content_dir, f"{slug}.md")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"✅ Saved: {output_file}")
        return output_file
    
    def generate_content_from_metadata(self, metadata: Dict, trends_analysis: Dict) -> str:
        """Genera contenido a partir de metadata cuando el content principal falta"""
        today = datetime.now()
        
        content = f"""# Panorama Tecnológico del {today.strftime('%d de %B, %Y')}

La industria tecnológica continúa su evolución acelerada con {metadata.get('total_stories', 0)} desarrollos significativos detectados en las últimas 24 horas.

## 📊 Análisis del Día

**Fuentes analizadas:** {', '.join(metadata.get('sources', ['Hacker News', 'TechCrunch', 'Wired']))}

**Distribución por categorías:**"""

        # Add category breakdown
        categories = metadata.get('categories', {})
        for category, count in categories.items():
            content += f"\n- **{category}:** {count} historias"
        
        content += f"""

## 🔍 Aspectos Destacados

La jornada de hoy refleja un enfoque particular en {max(categories.items(), key=lambda x: x[1])[0] if categories else 'desarrollo tecnológico'}, con múltiples innovaciones que continúan moldeando el panorama digital actual.

### Tendencias Emergentes

Los desarrollos observados sugieren una consolidación en las tecnologías de {', '.join(list(categories.keys())[:3])} que están redefiniendo los estándares de la industria.

## 💡 Perspectivas

Estas innovaciones representan oportunidades significativas para profesionales y empresas que buscan mantenerse a la vanguardia tecnológica. La velocidad de adopción y la diversidad de aplicaciones indican un momento crucial para la toma de decisiones estratégicas en tecnología.

---

*Análisis generado automáticamente por **NovaSecOps** - Inteligencia artificial especializada en ciberseguridad y análisis tecnológico.*
*Datos recopilados y procesados desde múltiples fuentes tecnológicas de primer nivel.*
"""
        
        return content
    
    def format_trends_analysis(self, trends_analysis: Dict) -> str:
        """Formatea el análisis de tendencias en Markdown"""
        if not trends_analysis or trends_analysis.get('fallback'):
            return ""
        
        trends_md = "\n## 🔥 Análisis de Tendencias\n"
        
        # Main trends
        if 'tendencias_principales' in trends_analysis:
            trends_md += "\n### 📈 Tendencias Principales\n"
            for trend in trends_analysis['tendencias_principales']:
                trends_md += f"- {trend}\n"
        
        # Executive summary
        if 'resumen_ejecutivo' in trends_analysis:
            trends_md += f"\n### 💼 Resumen Ejecutivo\n\n{trends_analysis['resumen_ejecutivo']}\n"
        
        # Predictions
        if 'predicciones' in trends_analysis:
            trends_md += "\n### 🔮 Predicciones\n"
            if isinstance(trends_analysis['predicciones'], list):
                for prediction in trends_analysis['predicciones']:
                    trends_md += f"- {prediction}\n"
            else:
                trends_md += f"{trends_analysis['predicciones']}\n"
        
        # Business impact
        if 'impacto_empresarial' in trends_analysis:
            trends_md += f"\n### 🏢 Impacto Empresarial\n\n{trends_analysis['impacto_empresarial']}\n"
        
        return trends_md
    
    def update_index_data(self, recent_posts: list):
        """Actualiza datos para la página principal"""
        index_data = {
            "latest_posts": recent_posts[:5],
            "total_posts": len(recent_posts),
            "last_update": datetime.now().isoformat(),
            "categories": self.extract_categories(recent_posts)
        }
        
        with open(os.path.join(self.public_dir, 'index-data.json'), 'w', encoding='utf-8') as f:
            json.dump(index_data, f, indent=2, ensure_ascii=False)
    
    def extract_categories(self, posts: list) -> Dict:
        """Extrae categorías de todos los posts"""
        categories = {}
        for post in posts:
            if 'metadata' in post and 'categories' in post['metadata']:
                for category, count in post['metadata']['categories'].items():
                    categories[category] = categories.get(category, 0) + count
        return categories

def main():
    """Ejecutar conversión de blog post"""
    print("📝 Markdown Generator - Blog Vercel")
    print("=" * 50)
    
    # Find latest blog post JSON
    blog_files = [f for f in os.listdir('.') if f.startswith('blog_post_') and f.endswith('.json')]
    if not blog_files:
        print("❌ No blog post found. Run ai_content_processor.py first.")
        return
    
    # Use latest blog post
    latest_blog = sorted(blog_files)[-1]
    print(f"📄 Processing: {latest_blog}")
    
    generator = MarkdownGenerator()
    markdown_file = generator.convert_blog_post_to_markdown(latest_blog)
    
    print(f"\n✅ Conversion completed!")
    print(f"📁 Markdown saved to: {markdown_file}")
    print(f"\n🚀 Ready for Next.js build!")

if __name__ == "__main__":
    main()