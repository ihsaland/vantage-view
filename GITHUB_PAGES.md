# GitHub Pages Deployment Guide

## 🚀 Quick Start

### 1. Repository Setup
1. Push your code to GitHub repository: `ihsaland/vantage-view`
2. Go to repository **Settings** > **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### 2. Automatic Deployment
- GitHub Actions workflow will automatically deploy on every push to main branch
- Site will be available at: `https://ihsaland.github.io/vantage-view/`
- Deployment typically takes 1-2 minutes

## 📁 File Structure for GitHub Pages

```
vantage-view/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── index.html                  # Main page
├── gallery.html                # Gallery page
├── styles.css                  # Styles
├── script.js                   # JavaScript
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker
├── robots.txt                  # SEO robots
├── sitemap.xml                 # SEO sitemap
├── Vantage_View_Logo.jpeg      # Logo
├── NR.jpeg                     # Founder photo
├── ALCON Images/               # Project images
│   ├── album-d445997216-downloads-pt1/
│   └── BPI_Clareon_Launch/
├── .gitignore                  # Git ignore rules
├── README.md                   # Documentation
└── GITHUB_PAGES.md            # This file
```

## 🔧 Configuration Files

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automatically deploys on push to main branch
- Uses GitHub Pages deployment action
- No build process needed (static site)

### Service Worker (`sw.js`)
- Configured for GitHub Pages base path: `/vantage-view/`
- Caches static assets for offline functionality
- Handles both local and GitHub Pages environments

### SEO Files
- **`sitemap.xml`**: Updated with GitHub Pages URLs
- **`robots.txt`**: Updated with GitHub Pages sitemap URL
- **Meta tags**: Updated with GitHub Pages URLs

## 🌐 URLs and Links

### Production URLs
- **Main site**: `https://ihsaland.github.io/vantage-view/`
- **Gallery**: `https://ihsaland.github.io/vantage-view/gallery.html`
- **Sitemap**: `https://ihsaland.github.io/vantage-view/sitemap.xml`

### Internal Links
All internal links use relative paths and work correctly:
- `href="#about"` - Scroll to about section
- `href="gallery.html"` - Link to gallery page
- `src="Vantage_View_Logo.jpeg"` - Logo image

## 🎯 Custom Domain (Optional)

### Setup Custom Domain
1. Add `CNAME` file to repository root:
   ```
   vantageview.com
   ```
2. Configure DNS records:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: ihsaland.github.io
   - **Type**: A
   - **Name**: @
   - **Value**: 185.199.108.153 (GitHub Pages IP)

3. Enable HTTPS in repository settings

### Update URLs for Custom Domain
If using custom domain, update these files:
- `sitemap.xml` - Replace GitHub Pages URLs
- `robots.txt` - Update sitemap URL
- Meta tags in HTML files - Update og:url and twitter:image

## 📊 Performance Features

### GitHub Pages Benefits
- **Global CDN**: Fast loading worldwide
- **Automatic HTTPS**: Secure connections
- **Gzip Compression**: Reduced file sizes
- **Browser Caching**: Optimized caching headers
- **Service Worker**: Offline functionality

### Performance Optimizations
- **Lazy Loading**: Images load as needed
- **Resource Preloading**: Critical resources prioritized
- **Minified Assets**: Optimized CSS and JavaScript
- **Image Optimization**: Compressed images with proper dimensions

## 🔍 SEO Optimization

### Search Engine Features
- **Sitemap**: Automatically submitted to Google
- **Robots.txt**: Proper crawling instructions
- **Meta Tags**: Complete Open Graph and Twitter Cards
- **Structured Data**: Semantic HTML structure
- **Mobile-First**: Responsive design

### Analytics Integration
Add Google Analytics or other tracking:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ Maintenance

### Regular Updates
1. **Content Updates**: Edit HTML files directly
2. **Image Updates**: Replace images in `ALCON Images/` folder
3. **Style Changes**: Modify `styles.css`
4. **Feature Additions**: Update `script.js`

### Deployment Process
1. Make changes locally
2. Test with local server: `python3 -m http.server 8000`
3. Commit and push to main branch
4. GitHub Actions automatically deploys
5. Verify deployment at GitHub Pages URL

### Monitoring
- **GitHub Actions**: Check deployment status
- **GitHub Pages**: Monitor site health
- **Performance**: Use Google PageSpeed Insights
- **Analytics**: Track visitor metrics

## 🚨 Troubleshooting

### Common Issues

#### Images Not Loading
- Check file paths are correct
- Ensure images are committed to repository
- Verify case sensitivity in file names

#### Service Worker Issues
- Clear browser cache
- Check browser console for errors
- Verify service worker registration

#### Deployment Failures
- Check GitHub Actions logs
- Verify repository permissions
- Ensure all files are committed

### Debug Tools
- **Browser DevTools**: Check console and network tabs
- **GitHub Actions**: View deployment logs
- **PageSpeed Insights**: Test performance
- **Mobile-Friendly Test**: Verify mobile compatibility

## 📞 Support

For GitHub Pages specific issues:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Community Forum](https://github.community/)

---

**Vantage View** - Now optimized for GitHub Pages deployment! 🎉