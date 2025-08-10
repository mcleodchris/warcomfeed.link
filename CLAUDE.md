# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Eleventy static site generator project that creates an RSS feed for Warhammer Community news articles. The official site doesn't provide RSS, so this project fills that gap by fetching data from their API and generating feeds.

## Architecture

- **Static Site Generator**: Eleventy (11ty) v3.1.2 with ES modules
- **Data Source**: Warhammer Community API at `https://www.warhammer-community.com/api/search/news/`
- **Templating**: Nunjucks templates
- **Data Fetching**: Uses `@11ty/eleventy-fetch` plugin for cached API requests

## Key Files & Structure

- `src/_data/warcom.js` - Main data fetching logic, contains API documentation and response structure
- `src/_includes/` - Page templates (Nunjucks)
- `src/pages/` - Content pages (Markdown/Nunjucks)
- `eleventy.config.js` - Eleventy configuration (currently minimal)

## Development Commands

- `npm run build` - Build the site for production
- `npm run serve` - Start development server
- `npm run dev` - Start development server with file watching

## Data Flow

1. At build time, `warcom.js` makes API requests to fetch latest news
2. API response contains news articles with metadata (title, excerpt, image, date, etc.)
3. Templates render this data into static HTML and RSS feeds
4. Each article links directly back to the original WarCom article via the `uri` field

## Feed Outputs

The site generates three feed formats:
- **RSS 2.0**: `/rss.xml` - Standard RSS feed
- **Atom**: `/atom.xml` - Atom 1.0 format  
- **JSON Feed**: `/feed.json` - JSON Feed v1.1 format

Each feed includes article title, excerpt, publication date, link to original article, and featured image.

## API Details

The WarCom API expects POST requests with JSON payload specifying search parameters like sorting, pagination, and filters. See `warcom.js:5-10` for the exact payload structure and `warcom.js:15-64` for sample response format.