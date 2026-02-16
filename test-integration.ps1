# KiroTax AI - Integration Test Script
# Tests connectivity between Python, .NET, and Next.js services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KiroTax AI - Integration Test Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$pythonUrl = "http://localhost:8000"
$adminUrl = "https://localhost:5001"
$nextjsUrl = "http://localhost:3000"

$testsPassed = 0
$testsFailed = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [object]$Body = $null
    )
    
    Write-Host "Testing: $Name" -NoNewline
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            TimeoutSec = 5
            SkipCertificateCheck = $true
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json)
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-RestMethod @params
        Write-Host " ✓ PASS" -ForegroundColor Green
        $script:testsPassed++
        return $response
    }
    catch {
        Write-Host " ✗ FAIL" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        $script:testsFailed++
        return $null
    }
}

# Test 1: Python Backend Health
Write-Host "`n[1/10] Python Backend Tests" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Yellow
Test-Endpoint -Name "Python Health Check" -Url "$pythonUrl/health"
Test-Endpoint -Name "Python Root Endpoint" -Url "$pythonUrl/"

# Test 2: .NET Admin API Health
Write-Host "`n[2/10] .NET Admin API Tests" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Yellow
$stats = Test-Endpoint -Name "Admin Stats Endpoint" -Url "$adminUrl/api/admin/stats"
if ($stats) {
    Write-Host "  Total Users: $($stats.totalUsers)" -ForegroundColor Gray
    Write-Host "  Total Bills: $($stats.totalBills)" -ForegroundColor Gray
}

# Test 3: User Management
Write-Host "`n[3/10] User Management Tests" -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Yellow
$users = Test-Endpoint -Name "List Users" -Url "$adminUrl/api/admin/users"
if ($users) {
    Write-Host "  Found $($users.Count) users" -ForegroundColor Gray
}

# Test 4: Create User
Write-Host "`n[4/10] Create User Test" -ForegroundColor Yellow
Write-Host "------------------------" -ForegroundColor Yellow
$newUser = @{
    name = "Integration Test User"
    email = "test-$(Get-Random)@example.com"
    role = "client"
    company = "Test Company"
    isActive = $true
}
$createdUser = Test-Endpoint -Name "Create New User" -Url "$adminUrl/api/admin/users" -Method "POST" -Body $newUser
if ($createdUser) {
    Write-Host "  Created user ID: $($createdUser.id)" -ForegroundColor Gray
    $userId = $createdUser.id
}

# Test 5: Get Specific User
if ($userId) {
    Write-Host "`n[5/10] Get User Test" -ForegroundColor Yellow
    Write-Host "---------------------" -ForegroundColor Yellow
    $user = Test-Endpoint -Name "Get User by ID" -Url "$adminUrl/api/admin/users/$userId"
    if ($user) {
        Write-Host "  User: $($user.name) ($($user.email))" -ForegroundColor Gray
    }
}
else {
    Write-Host "`n[5/10] Get User Test - SKIPPED (no user created)" -ForegroundColor Yellow
}

# Test 6: Update User
if ($userId) {
    Write-Host "`n[6/10] Update User Test" -ForegroundColor Yellow
    Write-Host "------------------------" -ForegroundColor Yellow
    $updateUser = @{
        id = $userId
        name = "Updated Test User"
        email = $createdUser.email
        role = "ca"
        company = "Updated Company"
        isActive = $true
    }
    Test-Endpoint -Name "Update User" -Url "$adminUrl/api/admin/users/$userId" -Method "PUT" -Body $updateUser
}
else {
    Write-Host "`n[6/10] Update User Test - SKIPPED" -ForegroundColor Yellow
}

# Test 7: Bill Management
Write-Host "`n[7/10] Bill Management Tests" -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Yellow
$bills = Test-Endpoint -Name "List Bills" -Url "$adminUrl/api/admin/bills"
if ($bills) {
    Write-Host "  Found $($bills.Count) bills" -ForegroundColor Gray
}

# Test 8: Template Management
Write-Host "`n[8/10] Template Management Tests" -ForegroundColor Yellow
Write-Host "---------------------------------" -ForegroundColor Yellow
$templates = Test-Endpoint -Name "List Templates" -Url "$adminUrl/api/admin/templates"
if ($templates) {
    Write-Host "  Found $($templates.Count) templates" -ForegroundColor Gray
}

# Test 9: Activity Logs
Write-Host "`n[9/10] Activity Log Tests" -ForegroundColor Yellow
Write-Host "--------------------------" -ForegroundColor Yellow
$activity = Test-Endpoint -Name "Get Activity Logs" -Url "$adminUrl/api/admin/activity"
if ($activity) {
    Write-Host "  Found $($activity.Count) activity logs" -ForegroundColor Gray
    if ($activity.Count -gt 0) {
        Write-Host "  Latest: $($activity[0].description)" -ForegroundColor Gray
    }
}

# Test 10: Settings
Write-Host "`n[10/10] Settings Tests" -ForegroundColor Yellow
Write-Host "----------------------" -ForegroundColor Yellow
$settings = Test-Endpoint -Name "Get Settings" -Url "$adminUrl/api/admin/settings"
if ($settings) {
    Write-Host "  Found $($settings.Count) settings" -ForegroundColor Gray
}

# Test 11: Delete User (Cleanup)
if ($userId) {
    Write-Host "`n[Cleanup] Delete Test User" -ForegroundColor Yellow
    Write-Host "---------------------------" -ForegroundColor Yellow
    Test-Endpoint -Name "Delete User" -Url "$adminUrl/api/admin/users/$userId" -Method "DELETE"
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Tests Passed: $testsPassed" -ForegroundColor Green
Write-Host "Tests Failed: $testsFailed" -ForegroundColor Red
Write-Host "Total Tests:  $($testsPassed + $testsFailed)" -ForegroundColor Cyan

if ($testsFailed -eq 0) {
    Write-Host "`n✓ All tests passed! Integration is working correctly." -ForegroundColor Green
    exit 0
}
else {
    Write-Host "`n✗ Some tests failed. Please check the services." -ForegroundColor Red
    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Ensure all services are running" -ForegroundColor Gray
    Write-Host "2. Check service logs for errors" -ForegroundColor Gray
    Write-Host "3. Verify ports are not in use by other applications" -ForegroundColor Gray
    Write-Host "4. Review CORS configuration" -ForegroundColor Gray
    exit 1
}
