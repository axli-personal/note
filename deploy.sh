#!/bin/bash

# Deploy script - Deploy VuePress website to Alibaba Cloud OSS
# @author Cursor@AoXiang

set -e  # Exit on error

echo "🚀 Starting build and deployment..."

echo "🧹 Cleaning previous build..."
# Remove previous build files
if [ -d ".vuepress/dist" ]; then
    rm -rf .vuepress/dist
    echo "Previous build cleaned"
fi

echo "📦 Building website..."
# Execute build
npm run build

# Check if build succeeded
if [ $? -ne 0 ]; then
    echo "❌ Build failed, deployment aborted"
    exit 1
fi

# Check if dist directory exists
if [ ! -d ".vuepress/dist" ]; then
    echo "❌ Error: Build output directory .vuepress/dist does not exist"
    exit 1
fi

echo "✅ Build completed!"

# Check if ossutil is installed
if ! command -v ossutil &> /dev/null; then
    echo "❌ Error: ossutil not found or not in PATH"
    echo "Please install ossutil first: https://help.aliyun.com/document_detail/120075.html"
    echo "💡 Build completed, files are located in .vuepress/dist/ directory"
    exit 1
fi

echo "☁️  Starting upload to OSS..."

# Sync files to OSS using ossutil
# --force: operate silently without asking user to confirm
# --update: only copy when source file is newer than destination
# --delete: delete files in OSS that don't exist locally
# Note: sync is automatically recursive, no need for --recursive flag
ossutil sync .vuepress/dist/ oss://axlis-note-site/ --force --update --delete

# Check if upload succeeded
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful! Website uploaded to oss://axlis-note-site/"
    echo "🌐 Please check your OSS bucket configuration to ensure static website hosting is enabled"
else
    echo "❌ Deployment failed, please check ossutil configuration and network connection"
    exit 1
fi
