#!/bin/bash
# GitHub Pages Deployment Script for Vantage View

echo "🚀 Vantage View - GitHub Pages Deployment Setup"
echo "=============================================="

# Check if git repository exists
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - Vantage View website"
    echo "✅ Git repository initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📝 Please add your GitHub repository as origin:"
    echo "   git remote add origin https://github.com/ihsaland/vantage-view.git"
    echo ""
    read -p "Press Enter after adding the remote origin..."
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Switching to main branch..."
    git checkout -b main 2>/dev/null || git checkout main
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository settings"
echo "2. Navigate to Pages section"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/' folder"
echo "5. Save settings"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://ihsaland.github.io/vantage-view/"
echo ""
echo "⏱️  Deployment typically takes 1-2 minutes"
echo "📊 Check Actions tab for deployment status"
