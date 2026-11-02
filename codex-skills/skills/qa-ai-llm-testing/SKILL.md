---
name: qa-ai-llm-testing
description: Test AI, LLM, chatbot, RAG, agent, prompt, evaluation, safety, hallucination, retrieval quality, tool-use, guardrail, multilingual, latency, and regression behavior for AI-powered product features.
---

# QA AI LLM Testing

Use this skill for AI-powered features where outputs are probabilistic, model-dependent, or tool-using.

## Coverage Model

- Intent coverage: common user intents, edge intents, ambiguous requests, refusal-worthy requests.
- Output quality: correctness, completeness, format adherence, tone, citations, consistency.
- RAG/retrieval: recall, precision, stale docs, no-answer behavior, source attribution, permission filtering.
- Tool use: correct tool selection, arguments, retries, partial failure, confirmation before risky actions.
- Safety: sensitive data, prompt injection, jailbreak attempts, policy boundaries, data leakage.
- Robustness: multilingual input, typos, long context, contradictory context, adversarial instructions.
- Regression: golden prompts, model/version changes, prompt edits, latency/cost thresholds.
- Human review: severity rubric, acceptance thresholds, sampling plan.

## Workflow

1. Define tasks, user personas, allowed sources, and expected output contracts.
2. Create a balanced eval set: happy path, edge path, adversarial path, and known regressions.
3. Specify scoring rubric: pass/fail, 1-5 score, or category-specific metrics.
4. Run repeated samples when nondeterminism matters.
5. Report examples, failure clusters, suspected causes, and prompt/product fixes.

## Output

```markdown
## AI QA Eval Plan
| Category | Prompt/Input | Expected Behavior | Scoring | Priority |

## Failure Taxonomy
1. ...

## Release Gate
- Minimum pass rate:
- Blocking failure types:
```

Do not use private production user data in eval prompts unless the user explicitly confirms authorization and masking.
