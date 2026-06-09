# SEO Setup Guide for Webix Landing Page

This guide explains the SEO optimizations that have been implemented and what you need to do to complete the setup.

## ✅ Already Implemented

### 1. Sitemap.xml
- Location: `public/sitemap.xml`
- Contains URLs for homepage, privacy policy, and cookie policy
- Updated with proper priority and changefreq values

### 2. Robots.txt
- Location: `public/robots.txt`
- Allows all crawlers
- References the sitemap.xml

### 3. Canonical URLs
- Implemented in `src/component/common/SEO.jsx`
- Automatically added to all pages via the SEO component

### 4. Open Graph Tags
- Implemented in `src/component/common/SEO.jsx`
- Includes og:type, og:title, og:description, og:image, og:url, og:site_name
- Twitter Card tags also included

### 5. Structured Data (Schema.org)
- Implemented in `src/App.jsx`
- Organization schema with business details
- Includes name, URL, logo, telephone, address, and social media links

### 6. WebP Images
- Primary logo (`logo.webp`) is already in WebP format
- Favicon updated to use WebP format in index.html

### 7. Lazy Loading
- Logo in Navbar has `loading="eager"` (correct for above-the-fold content)
- No other images found in the codebase that need lazy loading

### 8. Mobile Responsive Design
- Built with Tailwind CSS responsive classes
- Fully responsive across all device sizes

### 9. Performance Optimizations
- Preconnect hints for Google Fonts, CDNJS, and Google Tag Manager
- DNS prefetch for domain
- Preload for critical logo image
- Async loading for Google Analytics



## 🔧 Action Required (You Need to Complete These)

### 1. Google Search Console Setup

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://webixinfotech.com`
3. Choose verification method: "HTML tag"
4. Copy the verification code (content value)
5. Replace `YOUR_VERIFICATION_CODE_HERE` in `index.html` line 9 with your actual code

**Example:**
```html
<meta name="google-site-verification" content="abc123xyz456" />
```

### 2. Google Analytics Setup

**Steps:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for `webixinfotech.com`
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace `G-YOUR_TRACKING_ID` in `index.html` lines 12 and 17 with your actual ID

**Example:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ');
</script>
```

### 3. Submit Sitemap to Google Search Console

**Steps:**
1. In Google Search Console, go to your property
2. Navigate to: Sitemaps > Add a new sitemap
3. Enter: `sitemap.xml`
4. Click Submit

### 4. Create Open Graph Image

**Current Status:** The SEO component references a default OG image at `https://webixinfotech.com/og-image.jpg`

**Recommended:**
- Create a 1200x630px image for social sharing
- Upload it to your server
- Update the default image path in `src/component/common/SEO.jsx` line 15 if needed

### 5. Test Performance

**Tools to use:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [GTmetrix](https://gtmetrix.com/)

**Target:** < 3 seconds load time

## 📋 SEO Checklist

- [ ] Replace Google Search Console verification code
- [ ] Replace Google Analytics Measurement ID
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Create and upload OG image
- [ ] Test page speed with PageSpeed Insights
- [ ] Verify structured data with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check mobile-friendliness with [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 🎯 Additional Recommendations

1. **Add more structured data:**
   - BreadcrumbList schema
   - FAQ schema (for FAQSection)
   - Service schema for services

2. **Create robots.txt for staging:**
   - Block staging environments from search engines

3. **Add 404 page:**
   - Create a custom 404 page with proper SEO

4. **Add XML sitemap for dynamic routes:**
   - If you add more pages, update sitemap.xml

5. **Monitor performance:**
   - Set up Google Analytics reports
   - Monitor Core Web Vitals in Search Console

## 📞 Support

For any issues or questions about SEO implementation, refer to:
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
