# Code Review Policy

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | February 15, 2026 |
| Status | Production |
| Owner | Engineering Management |

## Core Principles

### 1. No Direct Commits to Main

**Rule:** All changes to `main` branch MUST go through a pull request.

**Enforcement:**
- Branch protection enabled on `main`
- Direct push disabled for all users (including admins)
- Merge commits only allowed after approval

**Exceptions:**
- Emergency hotfixes (requires post-merge review)
- Automated dependency updates (requires CI passing)

### 2. One Reviewer Mandatory

**Rule:** Every PR MUST have at least one approval before merging.

**Reviewer Selection:**
- Frontend PRs: Shivansh OR Bhavya
- Python PRs: Harit
- .NET PRs: Tushar
- Cross-stack PRs: Relevant owners

**Reviewer Responsibilities:**
- Review within 24 hours
- Provide constructive feedback
- Approve only if all checklist items pass
- Request changes if issues found

### 3. Infrastructure Changes Require 2 Reviewers

**Rule:** PRs affecting infrastructure MUST have 2 approvals.

**Infrastructure Changes Include:**
- Kubernetes configurations
- Terraform files
- Docker configurations
- CI/CD pipelines
- Network configurations
- Security policies

**Required Reviewers:**
- Primary: Shivansh (Infrastructure Lead)
- Secondary: Tushar (Technical Lead)

**Review Focus:**
- Security implications
- Performance impact
- Cost implications
- Rollback plan
- Monitoring setup

### 4. Tool Changes Require Validation Logs

**Rule:** PRs modifying backend tools MUST include validation logs.

**Tool Changes Include:**
- OCR extraction tool
- Template matching tool
- Field extraction tool
- Compliance validation tool
- AI/ML integration

**Required Validation:**
- Unit test results
- Integration test results
- Sample input/output logs
- Performance benchmarks
- Error handling tests

**Validation Log Format:**
```
Tool: ocr_extract_text
Test Date: 2026-02-15
Test Environment: Staging

Test Case 1: Standard Invoice
Input: sample_invoice.pdf
Output: {extracted_text}
Confidence: 0.96
Processing Time: 2.3s
Status: ✅ Pass

Test Case 2: Long Receipt
Input: long_receipt.jpg
Output: {extracted_text}
Confidence: 0.94
Processing Time: 3.1s
Status: ✅ Pass

Test Case 3: Low Quality Image
Input: blurry_bill.jpg
Output: {extracted_text}
Confidence: 0.68
Processing Time: 4.5s
Status: ⚠️ Warning (Low confidence)

Summary:
- Total Tests: 10
- Passed: 8
- Failed: 0
- Warnings: 2
- Average Confidence: 0.91
- Average Processing Time: 2.8s
```

## Review Process

### 1. PR Creation

**Author Responsibilities:**
1. Create feature branch from `develop`
2. Make changes with clear commit messages
3. Write/update tests
4. Run tests locally
5. Update documentation
6. Fill out PR template completely
7. Request review from appropriate reviewer(s)

**PR Title Format:**
```
[TYPE] Brief description

Examples:
[FEAT] Add bill upload component
[FIX] Resolve authentication token expiry
[REFACTOR] Optimize template matching algorithm
[DOCS] Update API documentation
[TEST] Add integration tests for compliance validation
```

### 2. Review Assignment

**Automatic Assignment:**
- Frontend PRs → Shivansh
- Python PRs → Harit
- .NET PRs → Tushar

**Manual Assignment:**
- Cross-stack PRs → Multiple reviewers
- Complex PRs → Senior engineers
- Security PRs → Security lead (Tushar)

### 3. Review Timeline

| PR Type | Review SLA | Approval SLA |
|---------|------------|--------------|
| Hotfix | 2 hours | 4 hours |
| Critical | 8 hours | 24 hours |
| Normal | 24 hours | 48 hours |
| Low Priority | 48 hours | 72 hours |

### 4. Review Checklist

**Code Quality:**
- [ ] Code is readable and maintainable
- [ ] Follows project conventions
- [ ] No code duplication
- [ ] Proper error handling
- [ ] No hardcoded values
- [ ] Type safety maintained

**Testing:**
- [ ] Tests are comprehensive
- [ ] Edge cases covered
- [ ] Tests are maintainable
- [ ] Mock data is realistic
- [ ] Test coverage meets threshold

**Performance:**
- [ ] No unnecessary re-renders (React)
- [ ] Efficient database queries
- [ ] Proper caching implemented
- [ ] No memory leaks
- [ ] Algorithms are efficient

**Security:**
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] Sensitive data not exposed
- [ ] Authentication/authorization correct
- [ ] No secrets in code

**Documentation:**
- [ ] Code comments for complex logic
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] Type definitions complete
- [ ] Migration guide provided (if breaking)

### 5. Feedback Guidelines

**Constructive Feedback:**
- Be specific about issues
- Suggest improvements
- Explain reasoning
- Be respectful and professional
- Focus on code, not person

**Feedback Categories:**
```
🔴 MUST FIX: Critical issues that block merge
🟡 SHOULD FIX: Important issues that should be addressed
🟢 NICE TO HAVE: Suggestions for improvement
💡 QUESTION: Clarification needed
👍 PRAISE: Acknowledge good work
```

**Example Feedback:**
```
🔴 MUST FIX: This function is vulnerable to SQL injection. 
Use parameterized queries instead.

🟡 SHOULD FIX: This loop has O(n²) complexity. Consider using 
a hash map for O(n) performance.

🟢 NICE TO HAVE: Consider extracting this logic into a separate 
function for better reusability.

💡 QUESTION: Why did you choose this approach over the standard 
pattern we use elsewhere?

👍 PRAISE: Great job on the comprehensive test coverage!
```

### 6. Approval Process

**Approval Criteria:**
- All checklist items pass
- All comments addressed
- CI/CD checks passing
- No unresolved conversations
- Documentation updated

**Approval Types:**
- ✅ **Approve**: Ready to merge
- 🔄 **Request Changes**: Issues must be fixed
- 💬 **Comment**: Feedback without blocking

**Merge Methods:**
- **Squash and Merge** (Default): For feature branches
- **Rebase and Merge**: For hotfixes
- **Merge Commit**: For release branches

## Special Review Requirements

### Database Schema Changes

**Required Reviewers:** Harit + Tushar

**Review Focus:**
- Schema design
- Migration scripts
- Rollback scripts
- Index strategy
- Performance impact
- Data integrity

**Required Artifacts:**
- Migration SQL scripts
- Rollback SQL scripts
- Performance test results
- Data migration plan (if applicable)

### API Contract Changes

**Required Reviewers:** API Owner + All Consumers

**Review Focus:**
- Backward compatibility
- Breaking changes
- Versioning strategy
- Documentation
- Client impact

**Required Artifacts:**
- OpenAPI specification
- Migration guide
- Client update timeline
- Deprecation notice (if applicable)

### Security Changes

**Required Reviewers:** Tushar + 1 Senior Engineer

**Review Focus:**
- Security implications
- Vulnerability assessment
- Compliance requirements
- Audit trail
- Incident response

**Required Artifacts:**
- Security assessment
- Threat model
- Test results
- Compliance checklist

### Performance-Critical Changes

**Required Reviewers:** Component Owner + Performance Lead

**Review Focus:**
- Performance benchmarks
- Load testing results
- Resource utilization
- Scalability impact
- Monitoring setup

**Required Artifacts:**
- Performance test results
- Load test results
- Profiling data
- Monitoring dashboard

## Review Metrics

### Reviewer Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Review Turnaround Time | < 24 hours | Time from PR creation to first review |
| Approval Time | < 48 hours | Time from PR creation to approval |
| Review Quality | > 90% | Issues caught in review vs production |
| Feedback Quality | > 4.0/5.0 | Author satisfaction rating |

### PR Quality

| Metric | Target | Measurement |
|--------|--------|-------------|
| First-Time Approval Rate | > 70% | PRs approved without changes |
| Rework Rate | < 20% | PRs requiring significant rework |
| Defect Escape Rate | < 5% | Issues found in production |
| Test Coverage | > 80% | Code coverage percentage |

## Escalation Process

### Disagreements

**Level 1: Discussion**
- Reviewer and author discuss in PR comments
- Seek to understand different perspectives
- Find common ground

**Level 2: Team Discussion**
- Bring to team standup or dedicated meeting
- Get input from other team members
- Vote if necessary

**Level 3: Technical Lead**
- Escalate to technical lead (Tushar)
- Technical lead makes final decision
- Document decision and reasoning

### Blocked PRs

**Reasons for Blocking:**
- Critical security issues
- Breaking changes without migration plan
- Insufficient test coverage
- Performance degradation
- Violates architecture principles

**Resolution:**
- Author addresses blocking issues
- Re-request review
- Reviewer re-reviews and approves/blocks again

### Stale PRs

**Definition:** PR with no activity for 7 days

**Process:**
1. Automated reminder after 7 days
2. Manual follow-up after 10 days
3. Close PR after 14 days (can be reopened)

## Review Tools

### Automated Checks

**CI/CD Pipeline:**
- Build verification
- Unit tests
- Integration tests
- Linting
- Type checking
- Security scanning
- Code coverage

**Code Quality Tools:**
- SonarQube (code quality)
- ESLint (JavaScript/TypeScript)
- Pylint (Python)
- StyleCop (.NET)

**Security Tools:**
- Snyk (dependency scanning)
- OWASP ZAP (security testing)
- GitGuardian (secret detection)

### Manual Review Tools

**Code Review:**
- GitHub PR interface
- VS Code GitHub extension
- GitLens

**Testing:**
- Postman (API testing)
- Browser DevTools (frontend testing)
- Database clients (schema review)

## Best Practices

### For Authors

1. **Keep PRs Small:** < 500 lines of code
2. **Write Clear Descriptions:** Explain what and why
3. **Add Tests:** Comprehensive test coverage
4. **Update Documentation:** Keep docs in sync
5. **Respond Promptly:** Address feedback quickly
6. **Be Open to Feedback:** Learn from reviews

### For Reviewers

1. **Review Promptly:** Within 24 hours
2. **Be Thorough:** Check all aspects
3. **Be Constructive:** Suggest improvements
4. **Be Respectful:** Professional feedback
5. **Ask Questions:** Understand the changes
6. **Acknowledge Good Work:** Positive feedback

### For Teams

1. **Pair Programming:** For complex changes
2. **Code Review Sessions:** Weekly review meetings
3. **Knowledge Sharing:** Learn from each other
4. **Continuous Improvement:** Refine process
5. **Celebrate Success:** Recognize good work

## Exceptions

### Emergency Hotfixes

**Criteria:**
- Production is down
- Critical security vulnerability
- Data loss risk

**Process:**
1. Create hotfix branch from `main`
2. Make minimal fix
3. Get expedited review (< 2 hours)
4. Merge to `main` and `develop`
5. Deploy immediately
6. Post-mortem within 24 hours

### Automated Updates

**Criteria:**
- Dependency updates
- Security patches
- Documentation updates

**Process:**
1. Automated PR created
2. CI/CD checks must pass
3. Auto-merge if all checks pass
4. Manual review if checks fail

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-15 | Engineering Management | Initial production release |

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead | Tushar | _________ | ______ |
| Engineering Manager | _________ | _________ | ______ |
