---
name: geo-testing
description: GEO (Generative Engine Optimization) testing skill for verifying AI search engine visibility, brand mentions, and citation optimization. Use when user needs GEO testing, AI search optimization verification, brand visibility in LLM responses, or checking how well content performs in generative AI search results.
metadata:
  openclaw:
    emoji: 🎯
compatibility:
  tools:
    - browser
    - web_fetch
---

# GEO Testing Skill

Test and verify Generative Engine Optimization (GEO) performance for websites and content.

## What is GEO

GEO (Generative Engine Optimization) is the practice of optimizing content to appear in AI-generated search results from LLMs like ChatGPT, Perplexity, Gemini, and Claude.

## When to Use

Use this skill when:
- Testing brand visibility in AI search engines
- Verifying citation and source mentions in LLM responses
- Checking content optimization for generative AI
- Auditing AI search engine presence
- Comparing GEO performance with competitors

## Testing Steps

### 1. Brand Mention Testing

Test if AI engines mention the brand/website:

```
Test queries:
- "What is [brand name]?"
- "Tell me about [website/company]"
- "Best [category] platforms"
- "[Industry] recommendations"
```

**Verification checklist:**
- [ ] Brand appears in AI response
- [ ] Correct description provided
- [ ] Website URL mentioned
- [ ] Key products/services listed

### 2. Citation & Source Testing

Verify if AI cites your content as source:

```
Test queries:
- Questions your content answers
- Topics you have authority on
- Specific data/statistics you published
```

**Verification checklist:**
- [ ] Content cited as source
- [ ] Correct attribution
- [ ] Link or reference provided
- [ ] Context accurately represented

### 3. Competitive GEO Analysis

Compare GEO performance with competitors:

| Competitor | Brand Mention | Citation | Position |
|------------|--------------|----------|----------|
| Your Site | ✅/❌ | ✅/❌ | 1st/2nd/3rd |
| Competitor A | ✅/❌ | ✅/❌ | 1st/2nd/3rd |
| Competitor B | ✅/❌ | ✅/❌ | 1st/2nd/3rd |

### 4. Content GEO Optimization Check

Check if content is GEO-optimized:

**Structure verification:**
- [ ] Clear entity definitions
- [ ] Structured data markup
- [ ] Authoritative tone
- [ ] Comprehensive coverage
- [ ] Statistical data included
- [ ] Expert quotes/citations

**Technical verification:**
- [ ] Fast loading speed
- [ ] Mobile optimized
- [ ] Semantic HTML
- [ ] Rich snippets
- [ ] Author attribution

## Testing Tools

### Perplexity.ai
1. Go to https://www.perplexity.ai/
2. Enter test query
3. Check citations section
4. Verify brand/content mention

### ChatGPT (with browsing)
1. Use GPT-4 with browsing
2. Ask about brand/topic
3. Check if it references your site

### Gemini
1. Go to https://gemini.google.com/
2. Test queries
3. Check source attribution

### Claude
1. Ask about industry/topic
2. Check if brand mentioned
3. Verify accuracy

## Report Template

### GEO Test Report

**Date:** [YYYY-MM-DD]
**Brand:** [Brand Name]
**Website:** [URL]

#### Summary
- Brand Mention Rate: X%
- Citation Rate: X%
- Average Position: X
- Overall GEO Score: [A/B/C/D]

#### Test Results

| AI Engine | Query | Brand Mentioned | Cited | Position |
|-----------|-------|-----------------|-------|----------|
| Perplexity | "What is X?" | ✅ | ✅ | 1st |
| ChatGPT | "Best X tools" | ✅ | ❌ | 2nd |
| Gemini | "X vs Y" | ❌ | - | Not listed |

#### Recommendations

1. [Specific improvement 1]
2. [Specific improvement 2]
3. [Specific improvement 3]

## Output Format

Always respond using this structure:

### GEO Test Results
[Summary of findings]

### Brand Visibility
- Perplexity: [X/10]
- ChatGPT: [X/10]
- Gemini: [X/10]
- Claude: [X/10]

### Citations & Sources
[List of verified citations]

### Competitive Analysis
[Comparison with competitors]

### Optimization Recommendations
[Actionable steps to improve GEO]

## Notes

- GEO is evolving rapidly - test regularly
- Results vary by AI model version
- Citations may not include links
- Position in lists matters significantly
