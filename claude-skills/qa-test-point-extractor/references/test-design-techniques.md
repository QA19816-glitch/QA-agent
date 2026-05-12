# Test design techniques

Use whichever technique fits the feature.

## Equivalence partitioning
Split inputs into valid and invalid classes. Test representative values from each class.

## Boundary value analysis
Probe minimum, maximum, just-below, just-above, empty, and overflow conditions.

## Decision table thinking
Use when behavior depends on combinations of flags, permissions, statuses, or channels.

## State transition testing
Use when entities move through lifecycle states or approval flows.

## Error guessing
Probe duplicate submit, stale pages, timeout, refresh mid-flow, revoked permission, and partial save.

## Pairwise / combinational thinking
Use when too many dimensions exist to test exhaustively.
