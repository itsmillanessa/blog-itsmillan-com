#!/usr/bin/env node

/**
 * NovaNews Automation Setup
 * Sets up cron jobs and automation system
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class AutomationSetup {
  constructor() {
    this.projectDir = path.join(__dirname, '..')
    this.scriptsDir = __dirname
  }

  async setupCronJobs() {
    console.log('⏰ Setting up cron jobs for NovaNews automation...')
    
    const cronEntries = [
      {
        schedule: '0 9 * * *',  // 9:00 AM daily
        command: `cd ${this.projectDir} && bash ${path.join(this.scriptsDir, 'automate-posts.sh')} daily`,
        description: 'Daily tech news post generation'
      },
      {
        schedule: '0 7 * * 1',  // 7:00 AM every Monday
        command: `cd ${this.projectDir} && bash ${path.join(this.scriptsDir, 'automate-posts.sh')} weekly`,
        description: 'Weekly digest generation'
      },
      {
        schedule: '0 */6 * * *', // Every 6 hours
        command: `cd ${this.projectDir} && node ${path.join(this.scriptsDir, 'check-trending.js')}`,
        description: 'Check for trending stories'
      }
    ]

    // Create cron configuration
    const cronConfig = cronEntries.map(entry => 
      `${entry.schedule} ${entry.command} >> ${this.projectDir}/logs/cron.log 2>&1`
    ).join('\n')

    // Save cron config to file
    const cronFile = path.join(this.projectDir, 'crontab.conf')
    fs.writeFileSync(cronFile, cronConfig + '\n')

    console.log(`✅ Cron configuration saved to ${cronFile}`)
    console.log('\nTo install cron jobs, run:')
    console.log(`crontab ${cronFile}`)
    
    console.log('\nScheduled automation:')
    cronEntries.forEach(entry => {
      console.log(`  ${entry.schedule} - ${entry.description}`)
    })
  }

  async setupEnvironment() {
    console.log('🔧 Setting up environment...')
    
    // Create necessary directories
    const dirs = [
      'content/blog',
      'public/images/generated', 
      'logs'
    ]

    dirs.forEach(dir => {
      const fullPath = path.join(this.projectDir, dir)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
        console.log(`✅ Created directory: ${dir}`)
      }
    })

    // Make scripts executable
    const scripts = [
      'automate-posts.sh',
      'content-generator.js',
      'setup-automation.js'
    ]

    scripts.forEach(script => {
      const scriptPath = path.join(this.scriptsDir, script)
      if (fs.existsSync(scriptPath)) {
        try {
          execSync(`chmod +x ${scriptPath}`)
          console.log(`✅ Made executable: ${script}`)
        } catch (error) {
          console.warn(`⚠️  Could not make ${script} executable:`, error.message)
        }
      }
    })
  }

  async installDependencies() {
    console.log('📦 Installing required dependencies...')
    
    const requiredDeps = [
      'marked',           // Markdown processing
      'date-fns',         // Date utilities
      'gray-matter',      // Frontmatter parsing
      'rss-parser'        // RSS feed parsing
    ]

    try {
      execSync(`npm install ${requiredDeps.join(' ')}`, {
        cwd: this.projectDir,
        stdio: 'inherit'
      })
      console.log('✅ Dependencies installed successfully')
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message)
    }
  }

  async createSampleContent() {
    console.log('📄 Creating sample content...')
    
    const blogDir = path.join(this.projectDir, 'content/blog')
    
    // Check if we already have content
    if (fs.existsSync(blogDir) && fs.readdirSync(blogDir).length > 0) {
      console.log('✅ Content directory already has files, skipping sample creation')
      return
    }

    // Create sample post
    const samplePost = `---
title: "Bienvenido a NovaNews: El futuro del periodismo tecnológico"
excerpt: "Presentamos NovaNews, una nueva forma de mantenerse informado sobre las últimas tendencias en tecnología con análisis automatizado y perspectivas únicas."
date: "${new Date().toISOString().split('T')[0]}"
category: "Tecnología"
readTime: "5 min lectura"
image: "/images/welcome-novnews.jpg"
featured: true
tags: ["novnews", "tecnología", "periodismo", "automatización"]
type: "daily"
author: "Nova"
---

# Bienvenido a la era del periodismo tecnológico automatizado

Hoy marca el inicio de una nueva era en la cobertura de noticias tecnológicas. **NovaNews** representa la evolución natural del periodismo en la era de la inteligencia artificial, donde la velocidad, precisión y análisis profundo se combinan para ofrecer la mejor experiencia informativa.

## ¿Qué hace diferente a NovaNews?

### Análisis automatizado las 24 horas
Mientras el mundo duerme, nuestros sistemas siguen trabajando, monitoreando fuentes de noticias globales, identificando tendencias emergentes y procesando información para traerte solo lo más relevante.

### Contenido curado con precisión
- **Filtrado inteligente**: Solo las noticias que realmente importan
- **Análisis contextual**: No solo qué pasó, sino por qué es importante  
- **Perspectivas únicas**: Conexiones que otros pasan por alto
- **Actualizaciones constantes**: Información siempre fresca

## Nuestro compromiso contigo

En NovaNews creemos que el tiempo es tu recurso más valioso. Por eso, nos comprometemos a:

1. **Entregarte contenido de 5 minutos de lectura** que puedas consumir durante tu café matutino
2. **Resúmenes semanales comprehensivos** para mantenerte al día sin sobrecarga de información
3. **Análisis profundos** que van más allá de los titulares
4. **Cero clickbait**, solo contenido que añade valor real

## Lo que viene

Cada día publicaremos una nueva historia que capture lo más importante del mundo tecnológico. Cada lunes, recibirás un análisis semanal que conecta los puntos entre los eventos más significativos.

Esta es solo la primera historia de muchas. Bienvenido a **NovaNews**, donde el futuro de la información se encuentra con el presente.

---

*¿Quieres formar parte de esta revolución informativa? Suscríbete a nuestro newsletter y recibe las actualizaciones directamente en tu inbox.*`

    const samplePath = path.join(blogDir, 'welcome-to-novnews.md')
    fs.writeFileSync(samplePath, samplePost)
    
    console.log('✅ Sample post created')
  }

  async generateWelcomeImage() {
    console.log('🖼️  Generating welcome image...')
    
    // Create a simple placeholder welcome image
    const imageDir = path.join(this.projectDir, 'public/images')
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true })
    }

    // For now, just log that this should be done
    console.log('📝 Remember to add welcome image at: /public/images/welcome-novnews.jpg')
    console.log('🎨 Suggested: Create a professional tech/AI themed image with NovaNews branding')
  }

  async createConfigFiles() {
    console.log('⚙️  Creating configuration files...')

    // Create .env.example with required environment variables
    const envExample = `# NovaNews Configuration

# Content Generation
OPENAI_API_KEY=your_openai_api_key_here
CLAUDE_API_KEY=your_claude_api_key_here

# Image Generation  
POLLINATIONS_ENABLED=true

# Notifications (optional)
WEBHOOK_URL=your_webhook_url_for_notifications

# RSS Sources (comma separated)
RSS_SOURCES=https://feeds.feedburner.com/TechCrunch,https://www.wired.com/feed/rss

# Content Settings
DAILY_POST_TIME=09:00
WEEKLY_DIGEST_DAY=monday
POST_READ_TIME_TARGET=5

# Deployment
VERCEL_TOKEN=your_vercel_token_for_automation
`

    const envPath = path.join(this.projectDir, '.env.example')
    fs.writeFileSync(envPath, envExample)
    
    console.log('✅ Created .env.example')
    console.log('📝 Copy to .env and configure your API keys')
  }

  async showSetupInstructions() {
    console.log(`
🎉 NovaNews automation setup completed!

Next steps:
1. 📋 Copy .env.example to .env and configure API keys
2. ⏰ Install cron jobs: crontab crontab.conf  
3. 🧪 Test content generation: node scripts/content-generator.js daily
4. 🚀 Test full automation: bash scripts/automate-posts.sh daily
5. 📬 Set up webhook notifications (optional)

Daily automation will:
- ⏰ Run at 9:00 AM daily
- 📰 Generate 5-min tech news posts
- 🖼️  Create relevant images
- 🚀 Deploy automatically to Vercel

Weekly automation will:
- 📅 Run every Monday at 7:00 AM  
- 📈 Create comprehensive weekly digest
- 🔍 Analyze 5 most important stories
- 📧 Prepare newsletter content

Your NovaNews is ready to become the best automated tech blog! 🚀
`)
  }

  async run() {
    try {
      console.log('🚀 Setting up NovaNews automation system...\n')
      
      await this.setupEnvironment()
      await this.installDependencies()
      await this.createSampleContent()
      await this.generateWelcomeImage()
      await this.createConfigFiles()
      await this.setupCronJobs()
      await this.showSetupInstructions()
      
    } catch (error) {
      console.error('❌ Setup failed:', error)
      process.exit(1)
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new AutomationSetup()
  setup.run()
}

module.exports = AutomationSetup