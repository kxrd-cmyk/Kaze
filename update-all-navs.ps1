$files = @(
    "mens.html", 
    "womens.html", 
    "latest-releases.html", 
    "user-profile.html",
    "dist/mens.html", 
    "dist/womens.html", 
    "dist/latest-releases.html", 
    "dist/user-profile.html"
)

# Sidebar HTML pattern to replace
$sidebarPattern = @'
    <nav class="sidebar">
        <div class="nav-category">CATEGORIES</div>
        <ul class="nav-links">
            <li><a href="mens.html">MENS</a></li>
            <li><a href="womens.html">WOMENS</a></li>
            <li><a href="latest-releases.html">LATEST RELEASES</a></li>
        </ul>
        <div class="nav-category">ACCOUNT</div>
        <ul class="nav-links" id="account-links">
            <!-- This content will be dynamically populated based on login status -->
        </ul>
'@

# New sidebar HTML with login/register combined and account at bottom
$newSidebar = @'
    <nav class="sidebar">
        <div class="nav-category">CATEGORIES</div>
        <ul class="nav-links">
            <li><a href="mens.html">MENS</a></li>
            <li><a href="womens.html">WOMENS</a></li>
            <li><a href="latest-releases.html">LATEST RELEASES</a></li>
        </ul>
        
        <!-- Account section moved to bottom of sidebar -->
        <div style="margin-top: auto;">
            <div class="nav-category">ACCOUNT</div>
            <ul class="nav-links" id="account-links">
                <!-- This content will be dynamically populated based on login status -->
                <li><a href="login.html" id="login-register-link">LOGIN / REGISTER</a></li>
            </ul>
        </div>
'@

# JS pattern for user auth
$authJsPattern = @'
        // User authentication management
        document.addEventListener\('DOMContentLoaded', function\(\) \{
            const accountLinks = document.getElementById\('account-links'\);
            
            // Check if user is logged in \(using localStorage for demo\)
            const isLoggedIn = localStorage.getItem\('userLoggedIn'\) === 'true';
            const username = localStorage.getItem\('username'\) \|\| 'User';
            
            // Update the account links based on login status
            if \(isLoggedIn\) \{
                accountLinks.innerHTML = `
                    <li><a href="user-profile.html">YOUR PROFILE</a></li>
                    <li><a href="#" id="logout-link">LOGOUT</a></li>
                `;
'@

# New JS for user auth with combined login/register link
$newAuthJs = @'
        // User authentication management
        document.addEventListener('DOMContentLoaded', function() {
            const accountLinks = document.getElementById('account-links');
            const loginRegisterLink = document.getElementById('login-register-link');
            
            // Check if user is logged in (using localStorage for demo)
            const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
            const username = localStorage.getItem('username') || 'User';
            
            // Update the account links based on login status
            if (isLoggedIn) {
                accountLinks.innerHTML = `
                    <li><a href="user-profile.html">YOUR PROFILE</a></li>
                    <li><a href="#" id="logout-link">LOGOUT</a></li>
                `;
'@

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        
        # Update sidebar HTML
        $content = $content -replace [regex]::Escape($sidebarPattern), $newSidebar
        
        # Update auth JS
        $content = $content -replace $authJsPattern, $newAuthJs
        
        # Save changes
        $content | Set-Content -Path $file -Force
        Write-Host "Updated $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All navigation updates completed!" 