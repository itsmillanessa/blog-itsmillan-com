#!/bin/bash

# NovaNews Automation Script
# Daily and weekly content generation with auto-deployment

set -e  # Exit on any error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/logs/automation.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    log "ERROR: $1"
    exit 1
}

log "🚀 Starting NovaNews automation..."

# Check if we're in the right directory
if [ ! -f "$PROJECT_DIR/package.json" ]; then
    error_exit "Not in correct project directory. package.json not found."
fi

cd "$PROJECT_DIR"

# Check what day of the week it is
DAY_OF_WEEK=$(date +%u)  # 1=Monday, 7=Sunday

# Generate content based on schedule
if [ "$1" = "daily" ] || [ "$1" = "" ]; then
    log "📝 Generating daily post..."
    
    if ! node "$SCRIPT_DIR/content-generator.js" daily; then
        error_exit "Failed to generate daily post"
    fi
    
    log "✅ Daily post generated successfully"
fi

# Generate weekly digest on Mondays (day 1) or if explicitly requested
if [ "$DAY_OF_WEEK" = "1" ] || [ "$1" = "weekly" ] || [ "$1" = "both" ]; then
    log "📰 Generating weekly digest..."
    
    if ! node "$SCRIPT_DIR/content-generator.js" weekly; then
        error_exit "Failed to generate weekly digest"
    fi
    
    log "✅ Weekly digest generated successfully"
fi

# Build the site
log "🔨 Building site..."
if ! npm run build; then
    error_exit "Site build failed"
fi

log "✅ Site built successfully"

# Deploy to Vercel
log "🚀 Deploying to production..."
if ! npx vercel --prod --yes; then
    error_exit "Deployment failed"
fi

log "✅ Deployed successfully"

# Update domain alias
log "🔗 Updating domain alias..."
if ! npx vercel alias --scope=alexis-millans-projects blog.itsmillan.com; then
    log "⚠️  Warning: Failed to update domain alias (not critical)"
else
    log "✅ Domain alias updated"
fi

# Cleanup old generated images (keep last 30 days)
log "🧹 Cleaning up old files..."
find "$PROJECT_DIR/public/images/generated" -name "*.jpg" -mtime +30 -delete 2>/dev/null || true
find "$PROJECT_DIR/logs" -name "*.log" -mtime +7 -delete 2>/dev/null || true

log "🎉 Automation completed successfully!"

# Send notification (optional)
if [ -n "$WEBHOOK_URL" ]; then
    curl -X POST "$WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"✅ NovaNews automation completed successfully at $(date)\"}" \
        2>/dev/null || log "⚠️  Failed to send webhook notification"
fi