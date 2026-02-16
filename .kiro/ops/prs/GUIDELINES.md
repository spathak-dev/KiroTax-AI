# Pull Request Guidelines

## PR Creation Process

### 1. Before Creating a PR

- [ ] Code is complete and tested locally
- [ ] All tests pass
- [ ] Code follows project conventions
- [ ] No console.log or debug code
- [ ] Documentation is updated
- [ ] Branch is up to date with main

### 2. PR Title Format

```
[TYPE] Brief description

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code refactoring
- docs: Documentation changes
- style: Code style changes
- test: Test additions/changes
- chore: Build/config changes

Examples:
- feat: Add bill upload component
- fix: Resolve authentication token expiry
- refactor: Optimize template matching algorithm
```

### 3. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

## Code Review Process

### Reviewer Responsibilities

1. **Review within 24 hours**
2. **Check for**:
   - Code quality and readability
   - Test coverage
   - Performance implications
   - Security concerns
   - Breaking changes
   - Documentation completeness

3. **Provide constructive feedback**:
   - Be specific
   - Suggest improvements
   - Explain reasoning
   - Be respectful

### Review Checklist

#### Code Quality
- [ ] Code is readable and maintainable
- [ ] Follows project conventions
- [ ] No code duplication
- [ ] Proper error handling
- [ ] No hardcoded values

#### Testing
- [ ] Tests are comprehensive
- [ ] Edge cases covered
- [ ] Tests are maintainable
- [ ] Mock data is realistic

#### Performance
- [ ] No unnecessary re-renders (React)
- [ ] Efficient database queries
- [ ] Proper caching implemented
- [ ] No memory leaks

#### Security
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] Sensitive data not exposed
- [ ] Authentication/authorization correct

#### Documentation
- [ ] Code comments for complex logic
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] Type definitions complete

## Approval Requirements

### Standard PRs
- **1 approval required**
- Reviewer must be from relevant stack:
  - Frontend PRs: Shivansh or Bhavya
  - Python PRs: Harit
  - .NET PRs: Tushar

### Critical PRs
- **2 approvals required** for:
  - Database schema changes
  - Authentication/authorization changes
  - Breaking API changes
  - Production hotfixes

### Auto-merge Eligible
- Documentation-only changes
- Test-only changes
- Minor style fixes
- After 1 approval + CI passing

## Merge Strategy

### Branch Strategy
```
main (production)
  ├── develop (staging)
  │   ├── feature/bill-upload
  │   ├── feature/template-marketplace
  │   └── fix/auth-token-expiry
```

### Merge Methods

1. **Squash and Merge** (Default)
   - Use for feature branches
   - Keeps history clean
   - Single commit per feature

2. **Rebase and Merge**
   - Use for hotfixes
   - Maintains linear history
   - Preserves individual commits

3. **Merge Commit**
   - Use for release branches
   - Preserves full history
   - Shows merge points

## CI/CD Integration

### Required Checks
- [ ] Build passes
- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Code coverage > 80%
- [ ] No security vulnerabilities

### Deployment
- **develop branch**: Auto-deploy to staging
- **main branch**: Manual deploy to production

## Common Review Comments

### Code Style
```
❌ Bad:
function getData() {
  return fetch('/api/data').then(r=>r.json())
}

✅ Good:
async function getData(): Promise<Data> {
  const response = await fetch('/api/data')
  return response.json()
}
```

### Error Handling
```
❌ Bad:
try {
  await uploadBill(file)
} catch (e) {
  console.log(e)
}

✅ Good:
try {
  await uploadBill(file)
} catch (error) {
  logger.error('Bill upload failed', { error, fileId: file.id })
  throw new BillUploadError('Failed to upload bill', { cause: error })
}
```

### Type Safety
```
❌ Bad:
function processBill(bill: any) {
  return bill.amount * 1.18
}

✅ Good:
function processBill(bill: Bill): number {
  if (!bill.amount || typeof bill.amount !== 'number') {
    throw new Error('Invalid bill amount')
  }
  return bill.amount * 1.18
}
```

## PR Size Guidelines

### Ideal PR Size
- **Small**: < 200 lines (preferred)
- **Medium**: 200-500 lines (acceptable)
- **Large**: > 500 lines (split if possible)

### Breaking Down Large PRs
1. Separate refactoring from features
2. Split by component/module
3. Create dependent PRs
4. Use feature flags for partial features

## Emergency Hotfix Process

1. Create branch from `main`
2. Make minimal fix
3. Add test for bug
4. Get expedited review (< 2 hours)
5. Merge to `main` and `develop`
6. Deploy immediately
7. Post-mortem within 24 hours

## PR Labels

- `priority:high` - Urgent changes
- `priority:medium` - Normal priority
- `priority:low` - Nice to have
- `type:feature` - New feature
- `type:bug` - Bug fix
- `type:refactor` - Code refactoring
- `needs:review` - Awaiting review
- `needs:changes` - Changes requested
- `ready:merge` - Approved and ready
- `wip` - Work in progress
- `blocked` - Blocked by dependency

## Resources

- [Code Style Guide](../team_roles/README.md)
- [Testing Guidelines](../../evaluation/README.md)
- [Architecture Docs](../../ARCHITECTURE.md)
