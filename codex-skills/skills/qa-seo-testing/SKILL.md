---
name: qa-seo-testing
description: Test SEO quality for websites including crawlability, indexability, metadata, canonical URLs, robots.txt, sitemap, structured data, Open Graph, performance signals, redirects, hreflang, pagination, duplicate content, and search-result readiness.
---

# QA SEO Testing

Use this skill when the user asks for SEO testing, search visibility checks, website launch SEO QA, or regression risk around public pages.

## Coverage Model

- Crawl/index: robots.txt, sitemap, noindex/nofollow, canonical, status codes, redirect chains.
- Metadata: title, description, headings, Open Graph/Twitter cards, image alt text.
- Structured data: JSON-LD validity, schema type, required fields, duplicate entities.
- URL quality: slugs, query parameters, pagination, faceted search, duplicate content.
- International SEO: hreflang, locale URLs, language metadata, canonical per locale.
- Performance signals: Core Web Vitals risk, image weight, render-blocking assets, mobile friendliness.
- Content risk: thin content, placeholder text, private pages accidentally exposed.

## Workflow

1. Identify target pages, locale, environment, and whether pages should be indexed.
2. Inspect HTML head, status codes, canonical/robots/sitemap behavior.
3. Validate structured data and social metadata.
4. Compare mobile and desktop rendering for content visibility.
5. Report launch blockers separately from improvements.

## Output

```markdown
## SEO QA Checklist
| Page | Check | Expected | Result | Priority |

## Blockers
1. ...
```
