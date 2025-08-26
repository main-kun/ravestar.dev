# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Eleventy-based blog site (ravestar.dev) focused on technology and programming content. The site uses Eleventy v3 with Nunjucks templating and includes features like syntax highlighting, image optimization, and a theme switcher.

## Commands

### Development
- `npm start` - Start the development server with live reload
- `npm run build` - Build the site for production

### Debugging
- `npm run debug` - Run Eleventy with debug output
- `npm run debugstart` - Start dev server with debug output
- `npm run benchmark` - Run with benchmark debugging

## Architecture

### Directory Structure
- `content/` - Source content files (markdown, nunjucks)
  - `blog/` - Blog posts in markdown
  - Main pages (index, about, blog listing, tags)
- `_includes/` - Templates and partials
  - `layouts/` - Base, home, and post templates
- `_data/` - Global data files and schemas
- `_config/` - Configuration modules (filters.js)
- `public/` - Static assets (CSS, images, manifest)
- `js/` - Client-side JavaScript (theme-switcher.js)
- `_site/` - Build output directory

### Key Configuration
- **Template Engine**: Nunjucks for markdown and HTML
- **Supported Formats**: md, njk, html, liquid, 11ty.js
- **Image Optimization**: Automatic AVIF/WebP generation via eleventy-img
- **Syntax Highlighting**: Prism.js with custom styles
- **Drafts**: Filtered in production builds via ELEVENTY_RUN_MODE

### Content Structure
- Blog posts use front matter with title, description, date, and tags
- Draft posts are excluded from production builds
- Navigation is handled via eleventy-navigation plugin
- RSS feed generation included

### Styling
- Main styles in `public/css/index.css`
- Syntax highlighting styles in `public/css/prism-diff.css`
- Per-page CSS/JS bundling available via {% css %} and {% js %} shortcodes