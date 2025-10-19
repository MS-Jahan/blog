# Jekyll Testing with Docker

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the server
docker-compose up

# Or run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the server
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -t sabit-blog .

# Run the container
docker run -p 4000:4000 -p 35729:35729 -v $(pwd):/srv/jekyll sabit-blog

# Or with live reload
docker run -p 4000:4000 -p 35729:35729 -v $(pwd):/srv/jekyll sabit-blog jekyll serve --host 0.0.0.0 --livereload --force_polling
```

## Access Your Blog

Once running, open your browser to:
- **Blog**: http://localhost:4000
- **LiveReload**: Automatic (changes reflect instantly)

## Testing Features

After the server starts, navigate to any blog post to see:

1. **Copy Code Button** - Top-right of code blocks
2. **Share Buttons** - Below each post
3. **Reading Progress Bar** - Top of page (scroll to see)
4. **Related Posts** - Bottom of posts with similar tags
5. **Search** - Top-right search icon
6. **Back to Top** - Bottom-right floating button (appears after scrolling)
7. **Table of Contents** - Auto-generated if post has 3+ headings
8. **Last Modified Date** - Add `last_modified_at: 2025-10-07` to post front matter

## Troubleshooting

### Port already in use
```bash
# Change ports in docker-compose.yml
ports:
  - "4001:4000"  # Change 4001 to any available port
```

### Changes not reflecting
```bash
# Rebuild the container
docker-compose down
docker-compose up --build
```

### Permission issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

## Clean Up

```bash
# Stop and remove containers
docker-compose down

# Remove all Jekyll build artifacts
rm -rf _site .jekyll-cache .jekyll-metadata

# Remove Docker volumes
docker-compose down -v
```

## Notes

- LiveReload is enabled - browser refreshes automatically on file changes
- `--force_polling` ensures file changes are detected in Docker
- Drafts and future posts are enabled for testing
- Site builds in development mode for better debugging
