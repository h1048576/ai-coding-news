#!/bin/bash
# Deploy to GitHub Pages
# Run this script to push the website to GitHub

set -e

REPO_URL="https://github.com/runningZ1/ai-coding-news.git"

echo "🚀 Deploying AI Coding News to GitHub Pages..."
echo ""

# Check if git is configured
if ! git config user.email > /dev/null 2>&1; then
    echo "⚠️  Git user not configured. Please run:"
    echo "   git config --global user.email 'your-email@example.com'"
    echo "   git config --global user.name 'Your Name'"
    echo ""
fi

# Add remote if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📡 Adding remote repository..."
    git remote add origin "$REPO_URL"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deploy successful!"
echo ""
echo "🌐 Next steps:"
echo "   1. Go to https://github.com/runningZ1/ai-coding-news"
echo "   2. Click Settings → Pages"
echo "   3. Set Source to 'Deploy from a branch', branch 'main', folder '/'"
echo "   4. Wait 1-2 minutes, then visit:"
echo "      https://runningZ1.github.io/ai-coding-news"
echo ""
echo "📰 The GitHub Actions will automatically fetch news daily at 08:00 Beijing time."
