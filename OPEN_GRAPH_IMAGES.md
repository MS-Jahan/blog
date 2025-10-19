# How to Add Open Graph Images to Your Posts

Open Graph images are the images that appear when you share your blog posts on social media platforms like Twitter, Facebook, LinkedIn, etc.

## Setup Complete! ✅

The blog now automatically supports Open Graph images per post. Here's how to use it:

## Method 1: Using `og_image` (Recommended for Social Media)

Add this to your post's front matter:

```yaml
---
title: "Your Post Title"
date: 2025-10-20
og_image: /assets/images/my-post-og-image.png
---
```

**Recommended image size:** 1200x630 pixels (optimal for all social media platforms)

## Method 2: Using `image`

If you already have an `image` field in your post, it will automatically be used:

```yaml
---
title: "Your Post Title"
date: 2025-10-20
image: /assets/images/my-post-image.png
---
```

## Method 3: Default Site Logo

If no post-specific image is provided, the site logo will be used automatically from `_config.yml`:

```yaml
logo: /assets/images/blog-icon.png
```

## What Gets Added Automatically

When you add an `og_image` or `image` to a post, the following meta tags are generated:

1. **Open Graph Tags:**
   - `og:image` - The image URL
   - `og:image:secure_url` - HTTPS version
   - `og:image:type` - Image format (png/jpg)
   - `og:image:width` - Width (1200px for og_image)
   - `og:image:height` - Height (630px for og_image)
   - `og:image:alt` - Alt text (post title)
   - `og:type` - "article" for posts, "website" for pages

2. **Twitter Card Tags:**
   - `twitter:card` - "summary_large_image"
   - `twitter:image` - The image URL
   - `twitter:site` - Your Twitter username
   - `twitter:creator` - Your Twitter username

3. **Article Meta (for posts):**
   - `article:published_time` - Publication date
   - `article:modified_time` - Last modified date (if available)
   - `article:tag` - All post tags

## Creating OG Images

### Quick Tips:
1. Use **1200x630 pixels** for best results across all platforms
2. Keep important content in the center (some platforms crop edges)
3. Use high contrast text on images
4. Include your blog name/branding

### Tools to Create OG Images:
- **Canva** (https://canva.com) - Free templates
- **Figma** (https://figma.com) - Design tool
- **OG Image Playground** (https://og-playground.vercel.app/) - Online generator

## Example Post with OG Image

```markdown
---
layout: post
title: "How to Use Docker for Jekyll Development"
date: 2025-10-20
og_image: /assets/images/posts/docker-jekyll-og.png
tags:
  - docker
  - jekyll
  - development
---

Your post content here...
```

## Testing Your OG Images

1. **Facebook Debugger:** https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

## File Structure

Store your OG images in:
```
/assets/images/og/
  ├── post-1-og.png
  ├── post-2-og.png
  └── default-og.png
```

Or organize by category:
```
/assets/images/
  ├── og/
  │   ├── docker-posts/
  │   ├── linux-posts/
  │   └── coding-posts/
```

## Notes

- Images are automatically converted to absolute URLs
- HTTPS URLs are generated automatically
- If no image is specified, your site logo is used
- Twitter username from `_config.yml` is used for Twitter cards
