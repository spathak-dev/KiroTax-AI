# Pull Request

## PR Information

| Field | Value |
|-------|-------|
| PR Number | #___ |
| Author | @___ |
| Date | YYYY-MM-DD |
| Target Branch | `develop` / `main` |
| Type | `feat` / `fix` / `refactor` / `docs` / `test` / `chore` |

## Purpose

### Summary
<!-- Provide a brief summary of the changes (2-3 sentences) -->

### Related Issues
<!-- Link to related issues -->
Closes #___
Relates to #___

### Motivation
<!-- Why is this change necessary? What problem does it solve? -->

## System Impact

### Components Affected
<!-- Check all that apply -->
- [ ] Frontend (Next.js)
- [ ] Backend - Python (FastAPI)
- [ ] Backend - .NET (Auth/Admin)
- [ ] Database Schema
- [ ] Infrastructure
- [ ] Documentation

### Breaking Changes
<!-- Does this PR introduce breaking changes? -->
- [ ] Yes (Describe below)
- [ ] No

**Breaking Change Description:**
<!-- If yes, describe the breaking changes and migration path -->

### Performance Impact
<!-- Does this PR affect performance? -->
- [ ] Improves performance
- [ ] No performance impact
- [ ] May degrade performance (explain below)

**Performance Notes:**
<!-- Describe performance implications -->

### Security Impact
<!-- Does this PR affect security? -->
- [ ] Improves security
- [ ] No security impact
- [ ] Requires security review

**Security Notes:**
<!-- Describe security implications -->

## Changes Made

### Code Changes
<!-- List the main code changes -->
- 
- 
- 

### Database Changes
<!-- List any database schema changes -->
- [ ] No database changes
- [ ] Schema migration required
- [ ] Data migration required

**Migration Scripts:**
```sql
-- Add migration SQL here if applicable
```

### Configuration Changes
<!-- List any configuration changes -->
- [ ] No configuration changes
- [ ] Environment variables added/modified
- [ ] Config files updated

**Configuration Updates:**
```
KEY=value
```

### API Changes
<!-- List any API changes -->
- [ ] No API changes
- [ ] New endpoints added
- [ ] Existing endpoints modified
- [ ] Endpoints deprecated/removed

**API Changes:**
```
POST   /api/new-endpoint
PUT    /api/existing-endpoint (modified)
DELETE /api/old-endpoint (deprecated)
```

## Testing Evidence

### Unit Tests
- [ ] Unit tests added/updated
- [ ] All unit tests passing
- [ ] Code coverage: ___%

**Test Coverage:**
```bash
# Paste test coverage output
```

### Integration Tests
- [ ] Integration tests added/updated
- [ ] All integration tests passing

**Test Results:**
```bash
# Paste test results
```

### Manual Testing
- [ ] Manual testing completed
- [ ] Test scenarios documented

**Test Scenarios:**
1. Scenario 1: Description
   - Steps: ...
   - Expected: ...
   - Actual: ...
   - Status: ✅ Pass / ❌ Fail

2. Scenario 2: Description
   - Steps: ...
   - Expected: ...
   - Actual: ...
   - Status: ✅ Pass / ❌ Fail

### Performance Testing
- [ ] Performance testing completed
- [ ] No performance degradation

**Performance Metrics:**
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Response Time (p95) | ___ ms | ___ ms | ___ |
| Throughput | ___ req/s | ___ req/s | ___ |
| Memory Usage | ___ MB | ___ MB | ___ |

### Security Testing
- [ ] Security testing completed
- [ ] No security vulnerabilities introduced

**Security Checks:**
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Authentication/authorization

## Diagrams Updated

### Architecture Diagrams
- [ ] No diagram updates needed
- [ ] Architecture diagram updated
- [ ] Sequence diagram updated
- [ ] Component diagram updated

**Updated Diagrams:**
<!-- Link to updated diagrams or embed them here -->

### Documentation
- [ ] README updated
- [ ] API documentation updated
- [ ] Architecture documentation updated
- [ ] Deployment documentation updated

## Reviewer Checklist

### Code Quality
- [ ] Code follows project style guidelines
- [ ] No code duplication
- [ ] Proper error handling
- [ ] Logging added where appropriate
- [ ] Comments added for complex logic
- [ ] No hardcoded values
- [ ] Type safety maintained

### Testing
- [ ] Adequate test coverage
- [ ] Tests are meaningful and not trivial
- [ ] Edge cases covered
- [ ] Error cases tested
- [ ] Tests are maintainable

### Security
- [ ] Input validation present
- [ ] No sensitive data in logs
- [ ] Authentication/authorization correct
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Secrets not committed

### Performance
- [ ] No unnecessary database queries
- [ ] Proper indexing used
- [ ] Caching implemented where appropriate
- [ ] No memory leaks
- [ ] Efficient algorithms used

### Documentation
- [ ] Code is self-documenting
- [ ] Complex logic explained
- [ ] API changes documented
- [ ] README updated if needed
- [ ] Migration guide provided (if breaking changes)

### Deployment
- [ ] Database migrations included
- [ ] Configuration changes documented
- [ ] Rollback plan documented
- [ ] Deployment steps clear

## Pre-Merge Checklist

### Author Checklist
- [ ] Self-review completed
- [ ] All tests passing locally
- [ ] No merge conflicts
- [ ] Branch up to date with target
- [ ] Commit messages are clear
- [ ] PR description is complete

### CI/CD Checks
- [ ] Build passing
- [ ] All tests passing
- [ ] Linting passing
- [ ] Type checking passing
- [ ] Code coverage meets threshold
- [ ] No security vulnerabilities

### Review Requirements
- [ ] Required approvals received
- [ ] All comments addressed
- [ ] No unresolved conversations
- [ ] Reviewer checklist completed

## Deployment Plan

### Deployment Steps
1. 
2. 
3. 

### Rollback Plan
<!-- How to rollback if issues occur -->
1. 
2. 
3. 

### Monitoring
<!-- What to monitor after deployment -->
- Metric 1: ...
- Metric 2: ...
- Metric 3: ...

### Smoke Tests
<!-- Post-deployment smoke tests -->
- [ ] Test 1: ...
- [ ] Test 2: ...
- [ ] Test 3: ...

## Additional Notes

### Dependencies
<!-- List any dependencies on other PRs or external changes -->
- Depends on PR #___
- Requires infrastructure change: ...

### Follow-up Tasks
<!-- List any follow-up tasks or future improvements -->
- [ ] Task 1: ...
- [ ] Task 2: ...

### Screenshots
<!-- Add screenshots if applicable -->

### References
<!-- Add any relevant links or references -->
- Documentation: ...
- Design doc: ...
- Related PR: ...

---

## Reviewer Sign-off

| Reviewer | Role | Approval | Date |
|----------|------|----------|------|
| @___ | Code Review | ✅ / ❌ | YYYY-MM-DD |
| @___ | Security Review | ✅ / ❌ | YYYY-MM-DD |
| @___ | Architecture Review | ✅ / ❌ | YYYY-MM-DD |

## Merge Authorization

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Approver | ___ | _________ | ______ |
| Merger | ___ | _________ | ______ |
