---
layout: post
current: post
navigation: True
title: Deploying Happy-Server on Coolify
date: 2025-10-27 10:30:00
tags: [docker, self-hosting, deployment, mcp]
class: post-template
subclass: 'post'
---

Happy-Server is a powerful tool that enhances AI assistants like Claude by enabling to use it on your smartphone. If you're looking to self-host it using Coolify, this guide covers the Docker setup you'll need.

## Background

While exploring deployment options for Happy-Server, I found a helpful [pull request by @akoenig](https://github.com/slopus/happy-server/pull/5) that added Docker Compose support for easy self-hosting. [@HashWarlock](https://github.com/HashWarlock) also contributed valuable insights. I've adapted their work for Coolify deployment in [my fork](https://github.com/ms-jahan/happy-server).

## The Dockerfile

The setup uses a multi-stage build to keep the final image lean while ensuring all dependencies are properly installed.

### Stage 1: Building the Application

{% highlight dockerfile %}
FROM node:20 AS builder

# Install dependencies
RUN apt-get update && apt-get install -y python3 ffmpeg make g++ build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY ./prisma ./prisma

# Install dependencies
RUN yarn install --frozen-lockfile --ignore-engines

# Copy application code
COPY ./tsconfig.json ./tsconfig.json
COPY ./vitest.config.ts ./vitest.config.ts
COPY ./sources ./sources

# Build the application
RUN yarn build

# Generate Prisma client
RUN yarn prisma generate
{% endhighlight %}

**Key Points:**
- Uses Node.js 20 as the base image
- Installs system dependencies: `python3`, `ffmpeg`, and build tools
- Uses `--frozen-lockfile` for consistent dependency versions
- Includes Prisma database client generation

### Stage 2: Runtime Environment

{% highlight dockerfile %}
FROM node:20 AS runner

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y python3 ffmpeg && rm -rf /var/lib/apt/lists/*

# Set production environment
ENV NODE_ENV=production

# Copy from builder
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/sources ./sources
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3005

# Run migrations then start
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn start"]
{% endhighlight %}

**Key Points:**
- Separates runtime from build dependencies
- Runs database migrations on startup
- Exposes port 3005 (configurable via environment variables)

## Docker Compose Setup

The docker-compose configuration includes:

- **PostgreSQL**: Database for persistent storage
- **Redis**: For caching and session management
- **MinIO**: S3-compatible object storage
- **Happy-Server**: The main application

All services have proper health checks and dependency management.

## Deploying on Coolify

1. Fork or clone [my repository](https://github.com/ms-jahan/happy-server)
2. Set up environment variables:
   - `HANDY_MASTER_SECRET`: Your master secret key
   - `DATABASE_URL`: PostgreSQL connection string
   - `REDIS_URL`: Redis connection string
3. Point Coolify to your repository
4. Use the included Dockerfile for the build
5. Configure port mapping (default: 3005)

## Changes from Original PR

The main modification I made was changing the exposed port from 3000 to 3005:

{% highlight dockerfile %}
# Original PR used port 3000
EXPOSE 3000

# My fork uses port 3005
EXPOSE 3005
{% endhighlight %}

This provides better compatibility with Coolify's default configurations and avoids conflicts with other services.

## Credits

Special thanks to [@akoenig](https://github.com/akoenig) for the [original Docker implementation](https://github.com/slopus/happy-server/pull/5), and [@HashWarlock](https://github.com/HashWarlock) for their valuable feedback.

## Repository

Check out the complete setup here: [github.com/ms-jahan/happy-server](https://github.com/ms-jahan/happy-server)

Happy deploying! 🚀
