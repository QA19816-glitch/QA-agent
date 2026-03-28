# API assertion rules

## Minimum assertions
- HTTP status code
- Business code or success flag
- Required top-level fields
- Key field types
- Expected data state change, when applicable

## Negative test prompts
- Missing required field
- Invalid type
- Boundary breach
- Unauthorized / forbidden token
- Repeated request
- Stale or nonexistent resource ID

## Evidence to capture
- Endpoint + method
- Sanitized request body/query
- Relevant headers, sanitized
- Response status
- Response body excerpt
- Timing notes if latency is suspicious
