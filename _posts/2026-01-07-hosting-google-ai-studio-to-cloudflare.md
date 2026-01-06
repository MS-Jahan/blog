---
layout: post
current: post
navigation: True
title: "Host Website for Free: Google AI Studio -> GitHub -> Cloudflare"
date: 2026-01-07 12:30:00
tags: [hosting, cloudflare, github, google-ai-studio, tutorial]
class: post-template
subclass: 'post'
excerpt: "A step-by-step guide on how to take your generated code from Google AI Studio, push it to GitHub, and host it for free using Cloudflare Pages."
---

Google AI Studio is an incredible tool for generating code, including full-fledged React applications. But once you have that code, how do you share it with the world? In this guide, I'll walk you through the process of taking your project from Google AI Studio to a live, hosted website for free using GitHub and Cloudflare Pages.

## Prerequisite
- A generic Google account (for AI Studio).
- A GitHub account.
- A Cloudflare account.

## Step 1: Export to GitHub

Google AI Studio now has a direct integration with GitHub, making this process incredibly smooth.

1.  Open your project in **Google AI Studio**.
2.  Look for the **"Export to GitHub"** button (often found in the "Share" or "Export" menu).
3.  Click it and authenticate your GitHub account if prompted.
4.  Choose to **Create a new repository**.
5.  Give your repository a name (e.g., `my-ai-app`), add description, and click **Push**.

Your code is now live on GitHub! No terminal commands required.

## Step 2: Connect to Cloudflare Pages

1.  Log in to your **Cloudflare Dashboard**.
2.  Go to **Workers & Pages** > **Create Application** (+ button at the top left) > **Pages** > **Connect to Git**.
3.  Select your GitHub account and the repository you just created.
4.  **Configure the build settings:**
    *   **Framework preset:** usually `React (Vite)`.
    *   **Build command:** `npm run build` (standard for most).
    *   **Build output directory:** `dist` (for Vite).

5.  Click **Save and Deploy**.

## Limitations

Cloudflare Pages has a free tier that allows you to host up to 100,000 requests (page views in this case) per month. If you expect more traffic, you may need to upgrade to a paid plan or host it to GitHub Pages.

## Troubleshooting

### "I see a blank white page!"

If your deployment finishes successfully but you see a blank page, it's likely a missing script tag issue common with some AI-generated exports.

I wrote a detailed guide on how to fix this specific issue here:
[**Troubleshooting: React App Shows Blank White Page on Cloudflare Pages**](/troubleshooting-react-blank-page-cloudflare)

Follow that guide to update your `index.html`, then push the changes to GitHub. Cloudflare will automatically redeploy your fix!

## Conclusion

That's it! You now have a free, SSL-secured, fast-hosting pipeline. Any time you want to update your site, just generate new code, overwrite the files locally, and push to GitHub. Cloudflare handles the rest.
