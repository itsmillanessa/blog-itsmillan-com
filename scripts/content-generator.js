#!/usr/bin/env node

/**
 * NovaNews Content Generator
 * Automated daily tech news and weekly digests
 * Uses web scraping + AI processing to create engaging content
 */

const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { format } = require('date-fns')

class NovaNewsGenerator {
  constructor() {
    this.contentDir = path.join(__dirname, '..', 'content', 'blog')
    this.imagesDir = path.join(__dirname, '..', 'public', 'images', 'generated')
    
    // Ensure directories exist
    if (!fs.existsSync(this.contentDir)) {
      fs.mkdirSync(this.contentDir, { recursive: true })
    }
    if (!fs.existsSync(this.imagesDir)) {
      fs.mkdirSync(this.imagesDir, { recursive: true })
    }
  }

  /**
   * Generate daily tech news article
   */
  async generateDailyPost() {
    try {
      console.log('🚀 Generating daily tech post...')
      
      // 1. Fetch latest tech news from multiple sources
      const newsData = await this.fetchLatestNews()
      
      // 2. Process with AI to create engaging content
      const processedContent = await this.processWithAI(newsData, 'daily')
      
      // 3. Generate relevant image
      const imagePath = await this.generateImage(processedContent.title, processedContent.category)
      
      // 4. Create markdown post
      const post = this.createMarkdownPost(processedContent, imagePath, 'daily')
      
      // 5. Save to file
      const filename = `${format(new Date(), 'yyyy-MM-dd')}-${this.slugify(processedContent.title)}.md`
      const filepath = path.join(this.contentDir, filename)
      
      fs.writeFileSync(filepath, post)
      
      console.log(`✅ Daily post created: ${filename}`)
      return filename
      
    } catch (error) {
      console.error('❌ Error generating daily post:', error)
      throw error
    }
  }

  /**
   * Generate weekly digest with 5 important stories
   */
  async generateWeeklyDigest() {
    try {
      console.log('📰 Generating weekly digest...')
      
      // 1. Fetch top stories from the past week
      const weeklyNews = await this.fetchWeeklyTopStories()
      
      // 2. Process with AI to create comprehensive digest
      const digestContent = await this.processWithAI(weeklyNews, 'weekly')
      
      // 3. Generate digest image
      const imagePath = await this.generateImage(digestContent.title, 'Weekly Digest')
      
      // 4. Create markdown post
      const post = this.createMarkdownPost(digestContent, imagePath, 'weekly')
      
      // 5. Save to file
      const filename = `${format(new Date(), 'yyyy-MM-dd')}-weekly-digest.md`
      const filepath = path.join(this.contentDir, filename)
      
      fs.writeFileSync(filepath, post)
      
      console.log(`✅ Weekly digest created: ${filename}`)
      return filename
      
    } catch (error) {
      console.error('❌ Error generating weekly digest:', error)
      throw error
    }
  }

  /**
   * Fetch latest tech news from multiple sources
   */
  async fetchLatestNews() {
    const sources = [
      'https://feeds.feedburner.com/TechCrunch',
      'https://www.wired.com/feed/rss',
      'https://rss.cnn.com/rss/cnn_tech.rss',
      'https://feeds.arstechnica.com/arstechnica/index',
      'https://www.theverge.com/rss/index.xml'
    ]

    const newsItems = []
    
    for (const source of sources) {
      try {
        // Fetch RSS feed (placeholder - would use actual RSS parser)
        const response = await this.fetchRSSFeed(source)
        newsItems.push(...response.slice(0, 5)) // Top 5 from each source
      } catch (error) {
        console.warn(`⚠️  Failed to fetch from ${source}:`, error.message)
      }
    }

    return newsItems.slice(0, 10) // Return top 10 overall
  }

  /**
   * Fetch weekly top stories
   */
  async fetchWeeklyTopStories() {
    // Get trending stories from past 7 days
    const newsItems = await this.fetchLatestNews()
    
    // Filter and rank by engagement, importance, etc.
    const topStories = newsItems
      .filter(item => this.isImportantStory(item))
      .slice(0, 5)
    
    return topStories
  }

  /**
   * Process raw news with AI to create engaging content
   */
  async processWithAI(newsData, type) {
    try {
      const prompt = this.createPrompt(newsData, type)
      
      // Call AI service (OpenAI, Claude, etc.)
      const aiResponse = await this.callAIService(prompt)
      
      return this.parseAIResponse(aiResponse, type)
      
    } catch (error) {
      console.error('AI processing failed:', error)
      return this.createFallbackContent(newsData, type)
    }
  }

  /**
   * Create AI prompt based on content type
   */
  createPrompt(newsData, type) {
    if (type === 'daily') {
      return `Create an engaging 5-minute tech news article based on these recent developments:

${newsData.map(item => `- ${item.title}: ${item.summary}`).join('\\n')}

Requirements:
- 800-1200 words (5 min reading time)
- Compelling headline that hooks readers
- Clear structure with subheadings
- Expert analysis and insights
- Practical implications for readers
- Engaging conclusion
- Spanish language
- Professional but accessible tone

Format as JSON:
{
  "title": "Compelling headline",
  "excerpt": "Brief summary (2-3 sentences)",
  "category": "One of: Tecnología, Inteligencia Artificial, Ciberseguridad, Programación, Startups",
  "content": "Full article content in markdown",
  "tags": ["tag1", "tag2", "tag3"]
}`

    } else if (type === 'weekly') {
      return `Create a comprehensive weekly tech digest covering these 5 important stories:

${newsData.map((item, index) => `${index + 1}. ${item.title}: ${item.summary}`).join('\\n')}

Requirements:
- 1500-2000 words comprehensive analysis
- Cover all 5 stories with equal depth
- Connect the dots between stories
- Industry implications and trends
- What to watch next week
- Spanish language
- Professional analysis tone

Format as JSON with same structure as daily posts.`
    }
  }

  /**
   * Generate relevant images for posts
   */
  async generateImage(title, category) {
    try {
      // Use Pollinations.ai for free image generation
      const prompt = this.createImagePrompt(title, category)
      const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1200&height=600&model=flux`
      
      // Download and save image
      const imageName = `${Date.now()}-${this.slugify(title)}.jpg`
      const imagePath = path.join(this.imagesDir, imageName)
      
      await this.downloadImage(imageUrl, imagePath)
      
      return `/images/generated/${imageName}`
      
    } catch (error) {
      console.warn('Failed to generate image:', error)
      return '/images/default-tech.jpg' // Fallback image
    }
  }

  /**
   * Create image generation prompt
   */
  createImagePrompt(title, category) {
    const baseStyle = "professional tech illustration, clean modern design, high quality"
    
    const categoryStyles = {
      'Inteligencia Artificial': 'neural networks, AI brain, futuristic technology',
      'Tecnología': 'modern technology, innovation, digital transformation',
      'Ciberseguridad': 'cybersecurity, digital protection, security shields',
      'Programación': 'code, programming, software development',
      'Startups': 'innovation, entrepreneurs, business growth',
      'Weekly Digest': 'tech news roundup, multiple tech elements, information design'
    }
    
    const style = categoryStyles[category] || categoryStyles['Tecnología']
    
    return `${style}, ${baseStyle}, no text, professional photography style`
  }

  /**
   * Create markdown post content
   */
  createMarkdownPost(content, imagePath, type) {
    const frontmatter = `---
title: "${content.title}"
excerpt: "${content.excerpt}"
date: "${format(new Date(), 'yyyy-MM-dd')}"
category: "${content.category}"
readTime: "${type === 'weekly' ? '8 min lectura' : '5 min lectura'}"
image: "${imagePath}"
tags: ${JSON.stringify(content.tags)}
type: "${type}"
author: "Nova"
---

`

    return frontmatter + content.content
  }

  /**
   * Utility functions
   */
  slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50)
  }

  isImportantStory(item) {
    const importantKeywords = [
      'breakthrough', 'revolution', 'major', 'significant', 
      'unprecedented', 'historic', 'game-changing', 'disrupting'
    ]
    
    const content = `${item.title} ${item.summary}`.toLowerCase()
    return importantKeywords.some(keyword => content.includes(keyword))
  }

  /**
   * Mock AI service call (replace with actual AI API)
   */
  async callAIService(prompt) {
    // This would be replaced with actual AI API call (OpenAI, Claude, etc.)
    console.log('📡 Calling AI service...')
    
    // For demo purposes, return mock response
    return {
      title: "La IA está transformando la industria tech más rápido de lo esperado",
      excerpt: "Nuevos avances en inteligencia artificial están acelerando la transformación digital en sectores clave, con implicaciones que van más allá de lo imaginado.",
      category: "Inteligencia Artificial",
      content: `## La revolución silenciosa está en marcha

La industria tecnológica está experimentando una transformación acelerada gracias a los últimos avances en inteligencia artificial. Lo que comenzó como una tendencia emergente se ha convertido en una revolución que está redefiniendo cómo trabajamos, creamos y vivimos.

### Avances clave de esta semana

Los desarrollos más significativos incluyen mejoras en procesamiento de lenguaje natural, automatización inteligente y nuevos modelos de machine learning que superan las expectativas de los expertos.

### Implicaciones para la industria

Esta evolución no solo afecta a las grandes corporaciones tecnológicas, sino que está democratizando el acceso a herramientas avanzadas para empresas de todos los tamaños.

## Lo que viene a continuación

Los próximos meses serán cruciales para determinar cómo se adoptarán estas tecnologías a gran escala y qué nuevos desafíos surgirán en el camino.`,
      tags: ["AI", "tecnología", "innovación"]
    }
  }

  /**
   * Mock RSS feed fetcher (replace with actual RSS parser)
   */
  async fetchRSSFeed(url) {
    console.log(`📰 Fetching RSS from ${url}...`)
    
    // Mock data - replace with actual RSS parsing
    return [
      {
        title: "Major AI Breakthrough Announced by Tech Giant",
        summary: "Revolutionary AI model shows unprecedented capabilities in reasoning and problem-solving.",
        url: "https://example.com/news1",
        publishDate: new Date()
      },
      {
        title: "Cybersecurity Threats Evolve with New AI-Powered Attacks",
        summary: "Security experts warn of sophisticated AI-driven cyber attacks targeting financial institutions.",
        url: "https://example.com/news2", 
        publishDate: new Date()
      }
    ]
  }

  /**
   * Download image from URL
   */
  async downloadImage(url, filepath) {
    // Mock image download - replace with actual HTTP client
    console.log(`🖼️  Generating image: ${path.basename(filepath)}`)
    
    // Create placeholder file
    fs.writeFileSync(filepath, 'placeholder-image-content')
  }

  /**
   * Fallback content when AI fails
   */
  createFallbackContent(newsData, type) {
    if (type === 'weekly') {
      return {
        title: "Resumen Semanal: Lo más importante en tecnología",
        excerpt: "Un análisis de las noticias más relevantes de la semana en el mundo tech.",
        category: "Weekly Digest",
        content: "## Resumen de la semana\\n\\nEsta semana ha estado llena de desarrollos importantes...\\n\\n" +
                newsData.map(item => `### ${item.title}\\n\\n${item.summary}\\n\\n`).join(''),
        tags: ["resumen", "tecnología", "noticias"]
      }
    }
    
    return {
      title: newsData[0]?.title || "Actualización Tecnológica del Día",
      excerpt: newsData[0]?.summary || "Las noticias más importantes del mundo tech de hoy.",
      category: "Tecnología",
      content: "## Actualización del día\\n\\n" +
              newsData.map(item => `### ${item.title}\\n\\n${item.summary}\\n\\n`).join(''),
      tags: ["tecnología", "noticias", "actualización"]
    }
  }
}

// CLI Interface
async function main() {
  const generator = new NovaNewsGenerator()
  const command = process.argv[2]

  try {
    switch (command) {
      case 'daily':
        await generator.generateDailyPost()
        break
        
      case 'weekly':
        await generator.generateWeeklyDigest()
        break
        
      case 'both':
        await generator.generateDailyPost()
        await generator.generateWeeklyDigest()
        break
        
      default:
        console.log(`
NovaNews Content Generator

Usage:
  node content-generator.js daily   - Generate daily tech post
  node content-generator.js weekly  - Generate weekly digest  
  node content-generator.js both    - Generate both types
        `)
        break
    }
  } catch (error) {
    console.error('❌ Generation failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = NovaNewsGenerator