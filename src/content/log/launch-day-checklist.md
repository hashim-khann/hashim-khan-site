---
title: "What I check on launch day of an e-commerce migration"
summary: "Redirects, canonicals, sitemaps, robots rules, and the pages I open first."
date: 2026-10-01
kind: note
status: draft
---

## Before the switch

- Crawl the old site one last time and save the URL list
- Test the redirect map on staging: every old URL should land on the right new page in one hop

## The first hour

- robots.txt: make sure the staging "disallow everything" rule hasn't come across
- Spot-check the top pages: homepage, main categories, best-selling products
- Check each page's title, canonical tag and index setting
- Submit the new sitemap in Search Console

## The first week

- Crawl the live site and look for 404s, redirect chains and loops
- Watch Search Console for indexing and crawl errors every day
- Compare traffic to the same week before launch

> To add: what actually went wrong on our launch day.
