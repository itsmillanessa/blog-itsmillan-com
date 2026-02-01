#!/usr/bin/env python3
"""
Daily Blog Deployment Script
Automatización completa: Content generation → GitHub → Vercel
"""

import subprocess
import os
import sys
import json
from datetime import datetime
import shutil

class BlogDeployment:
    def __init__(self):
        self.workspace_dir = "/home/ubuntu/.openclaw/workspace"
        self.blog_dir = f"{self.workspace_dir}/blog-itsmillan-com"
        self.venv_path = f"{self.workspace_dir}/blog_env"
        
    def run_command(self, command, description, cwd=None):
        """Ejecutar comando con logging"""
        print(f"🔄 {description}")
        print(f"   Command: {command}")
        
        try:
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                cwd=cwd or self.workspace_dir,
                timeout=300
            )
            
            if result.returncode == 0:
                print(f"   ✅ Success!")
                if result.stdout.strip():
                    print(f"   Output: {result.stdout.strip()}")
                return True, result.stdout
            else:
                print(f"   ❌ Failed: {result.stderr}")
                return False, result.stderr
                
        except subprocess.TimeoutExpired:
            print(f"   ⏰ Timeout after 5 minutes")
            return False, "Timeout"
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return False, str(e)
    
    def generate_daily_content(self):
        """Generar contenido diario"""
        print("\n📰 STEP 1: Generating daily content")
        print("=" * 50)
        
        # Activate venv and run news aggregation
        commands = [
            f"source {self.venv_path}/bin/activate && python3 news_aggregator.py",
            f"source {self.venv_path}/bin/activate && python3 ai_content_processor.py"
        ]
        
        for cmd in commands:
            success, output = self.run_command(cmd, f"Running: {cmd.split('&&')[-1].strip()}")
            if not success:
                return False
                
        return True
    
    def convert_to_markdown(self):
        """Convertir a Markdown para Next.js"""
        print("\n📝 STEP 2: Converting to Markdown")
        print("=" * 50)
        
        # Copy and run markdown generator
        shutil.copy2(f"{self.blog_dir}/scripts/markdown_generator.py", self.workspace_dir)
        
        success, output = self.run_command(
            f"source {self.venv_path}/bin/activate && python3 markdown_generator.py",
            "Converting blog post to Markdown"
        )
        
        if not success:
            return False
        
        # Move generated content to blog repo
        if os.path.exists(f"{self.workspace_dir}/content"):
            # Copy content to blog repo
            if os.path.exists(f"{self.blog_dir}/content"):
                shutil.rmtree(f"{self.blog_dir}/content")
            shutil.copytree(f"{self.workspace_dir}/content", f"{self.blog_dir}/content")
            print("   ✅ Content copied to blog repository")
            return True
        else:
            print("   ❌ No content directory found")
            return False
    
    def create_rss_feed(self):
        """Generar RSS feed y SEO assets"""
        print("\n📡 STEP 3: Generating RSS feed and SEO assets")
        print("=" * 50)
        
        rss_generator = f"""
import os
import json
from datetime import datetime
from xml.dom import minidom

# Simple RSS generation
posts_dir = "{self.blog_dir}/content/posts"
rss_path = "{self.blog_dir}/public/rss.xml"

items = []
if os.path.exists(posts_dir):
    for filename in sorted(os.listdir(posts_dir), reverse=True)[:10]:
        if filename.endswith('.md'):
            with open(os.path.join(posts_dir, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                if '---' in content:
                    _, front_matter, _ = content.split('---', 2)
                    try:
                        # Simple frontmatter parsing
                        title = 'Tech Digest'
                        date = datetime.now().isoformat()
                        excerpt = ''
                        
                        for line in front_matter.split('\\n'):
                            if line.startswith('title:'):
                                title = line.split(':', 1)[1].strip(' "')
                            elif line.startswith('date:'):
                                date = line.split(':', 1)[1].strip(' "')
                            elif line.startswith('excerpt:'):
                                excerpt = line.split(':', 1)[1].strip(' "')
                        
                        slug = filename.replace('.md', '')
                        items.append(f'''
        <item>
            <title>{title}</title>
            <link>https://blog.itsmillan.com/{slug}/</link>
            <description>{excerpt}</description>
            <pubDate>{datetime.fromisoformat(date.replace('Z', '+00:00')).strftime('%a, %d %b %Y %H:%M:%S GMT')}</pubDate>
            <guid>https://blog.itsmillan.com/{slug}/</guid>
        </item>''')
                    except:
                        continue

rss_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>Tech Digest | Blog de Millán</title>
        <link>https://blog.itsmillan.com</link>
        <description>Noticias diarias de tecnología, IA y ciberseguridad analizadas por NovaSecOps</description>
        <language>es</language>
        <lastBuildDate>{datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')}</lastBuildDate>
        <generator>NovaSecOps AI Blog System</generator>
        {''.join(items)}
    </channel>
</rss>'''

os.makedirs(os.path.dirname(rss_path), exist_ok=True)
with open(rss_path, 'w', encoding='utf-8') as f:
    f.write(rss_content)

print("RSS feed generated successfully")
"""
        
        # Write and execute RSS generator
        with open(f"{self.workspace_dir}/generate_rss.py", 'w') as f:
            f.write(rss_generator)
        
        success, output = self.run_command(
            f"source {self.venv_path}/bin/activate && python3 generate_rss.py",
            "Generating RSS feed"
        )
        
        if success:
            # Also run sitemap generator
            success2, output2 = self.run_command(
                f"cd {self.blog_dir} && source {self.venv_path}/bin/activate && python3 scripts/generate_sitemap.py",
                "Generating sitemap and SEO assets"
            )
            return success2
        
        return success
    
    def commit_and_push(self):
        """Commit y push a GitHub"""
        print("\n📤 STEP 4: Committing and pushing to GitHub")
        print("=" * 50)
        
        commands = [
            "git add .",
            f"git commit -m '📰 Daily digest: {datetime.now().strftime('%Y-%m-%d')}'",
            "git push origin main"
        ]
        
        for cmd in commands:
            success, output = self.run_command(cmd, f"Git: {cmd}", cwd=self.blog_dir)
            if not success and "nothing to commit" not in output:
                return False
        
        return True
    
    def verify_deployment(self):
        """Verificar que el deployment fue exitoso"""
        print("\n✅ STEP 5: Verifying deployment")
        print("=" * 50)
        
        # Wait a bit for Vercel to deploy
        import time
        print("   ⏳ Waiting for Vercel deployment...")
        time.sleep(30)
        
        # Try to fetch the homepage
        success, output = self.run_command(
            "curl -f -s https://blog.itsmillan.com/ | head -c 100",
            "Testing blog homepage"
        )
        
        if success:
            print("   ✅ Blog is live and responding!")
            return True
        else:
            print("   ⚠️ Blog might still be deploying...")
            return False
    
    def run_full_deployment(self):
        """Ejecutar deployment completo"""
        print("🚀 DAILY BLOG DEPLOYMENT")
        print("=" * 60)
        print(f"📅 Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}")
        print("")
        
        steps = [
            ("Generate content", self.generate_daily_content),
            ("Convert to Markdown", self.convert_to_markdown),
            ("Generate RSS feed", self.create_rss_feed),
            ("Commit and push", self.commit_and_push),
            ("Verify deployment", self.verify_deployment)
        ]
        
        for step_name, step_func in steps:
            success = step_func()
            if not success:
                print(f"\n❌ DEPLOYMENT FAILED at step: {step_name}")
                return False
        
        print(f"\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!")
        print(f"🌐 Blog updated: https://blog.itsmillan.com")
        print(f"📡 RSS feed: https://blog.itsmillan.com/rss.xml")
        print(f"⏰ Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}")
        
        return True

def main():
    """Main execution"""
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        print("🧪 Running in test mode...")
    
    deployment = BlogDeployment()
    
    # Change to workspace directory
    os.chdir(deployment.workspace_dir)
    
    # Run full deployment
    success = deployment.run_full_deployment()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()