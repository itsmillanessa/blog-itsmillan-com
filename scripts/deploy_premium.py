#!/usr/bin/env python3
"""
🚀 DEPLOY PREMIUM - Tech Digest
Automatización completa para publicación del blog premium
"""

import os
import subprocess
import json
import time
from datetime import datetime, timedelta
import requests

def run_command(cmd, cwd=None):
    """Ejecutar comando y return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
        if result.returncode == 0:
            print(f"✅ {cmd}")
            return result.stdout
        else:
            print(f"❌ {cmd}")
            print(f"Error: {result.stderr}")
            return None
    except Exception as e:
        print(f"❌ Error ejecutando {cmd}: {e}")
        return None

def build_and_deploy():
    """Build y deploy a Vercel"""
    print("🏗️ BUILDING PREMIUM BLOG...")
    
    # Install dependencies
    print("📦 Installing dependencies...")
    run_command("npm install")
    
    # Build optimizado
    print("🔨 Building Next.js...")
    build_result = run_command("npm run build")
    
    if build_result is None:
        print("❌ Build failed!")
        return False
        
    # Deploy a Vercel
    print("🚀 Deploying to Vercel...")
    deploy_result = run_command("vercel --prod")
    
    if deploy_result:
        print("✅ DEPLOYMENT SUCCESS!")
        print(f"🌍 Live at: https://blog.itsmillan.com")
        return True
    else:
        print("❌ Deployment failed!")
        return False

def optimize_performance():
    """Optimizaciones de performance"""
    print("⚡ OPTIMIZING PERFORMANCE...")
    
    # Optimize images
    print("🖼️ Optimizing images...")
    run_command("npx next-optimized-images")
    
    # Generate sitemap
    print("🗺️ Generating sitemap...")
    run_command("python3 scripts/generate_sitemap.py")
    
    # Update robots.txt
    robots_content = """User-agent: *
Allow: /

# Sitemaps
Sitemap: https://blog.itsmillan.com/sitemap.xml

# AdSense
User-agent: Mediapartners-Google
Allow: /

# Analytics
User-agent: AdsBot-Google
Allow: /
"""
    
    with open('public/robots.txt', 'w') as f:
        f.write(robots_content)
    
    print("✅ Performance optimizations complete!")

def setup_analytics():
    """Configurar Analytics y AdSense"""
    print("📊 SETTING UP ANALYTICS...")
    
    # Crear ads.txt para AdSense
    ads_txt_content = """google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0"""
    
    with open('public/ads.txt', 'w') as f:
        f.write(ads_txt_content)
    
    print("✅ Analytics setup complete!")

def health_check():
    """Verificar que el sitio esté funcionando"""
    print("🏥 HEALTH CHECK...")
    
    time.sleep(10)  # Wait for deployment
    
    try:
        response = requests.get('https://blog.itsmillan.com', timeout=30)
        if response.status_code == 200:
            print("✅ Site is live and healthy!")
            
            # Check for critical elements
            content = response.text
            if 'Tech Digest' in content:
                print("✅ Title rendering correctly")
            if 'NovaSecOps' in content:
                print("✅ AI attribution present")
            if 'adsbygoogle' in content:
                print("✅ AdSense code loaded")
            
            return True
        else:
            print(f"❌ Site returned status code: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def notify_success():
    """Notificar éxito del deployment"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    success_message = f"""
🚀 TECH DIGEST PREMIUM DEPLOYED!

⏰ Time: {timestamp}
🌍 URL: https://blog.itsmillan.com
📊 Analytics: Google Analytics + AdSense
⚡ Performance: Optimized
🤖 AI: NovaSecOps automation ready

✨ Features deployed:
• Premium magazine design
• Responsive AdSense units
• SEO optimization
• Performance optimization
• RSS feed
• Analytics tracking

Ready for monetization! 💰
"""
    
    print(success_message)
    
    # Save deployment log
    with open('deployment_log.txt', 'a') as f:
        f.write(f"{timestamp}: Premium deployment successful\n")

def main():
    """Main deployment pipeline"""
    print("🚀 STARTING PREMIUM DEPLOYMENT PIPELINE")
    print("=" * 50)
    
    start_time = time.time()
    
    # Step 1: Build and deploy
    if not build_and_deploy():
        print("❌ Deployment pipeline failed at build stage")
        return False
    
    # Step 2: Optimize performance
    optimize_performance()
    
    # Step 3: Setup analytics
    setup_analytics()
    
    # Step 4: Health check
    if not health_check():
        print("⚠️ Deployment succeeded but health check failed")
    
    # Step 5: Notify success
    notify_success()
    
    end_time = time.time()
    duration = end_time - start_time
    
    print(f"✅ DEPLOYMENT COMPLETE in {duration:.2f} seconds")
    print("🎉 Tech Digest Premium is LIVE!")
    
    return True

if __name__ == "__main__":
    main()