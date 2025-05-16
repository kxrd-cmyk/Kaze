$files = @(
    "mens.html", 
    "womens.html", 
    "latest-releases.html", 
    "user-profile.html",
    "kaze.html",
    "cart.html",
    "dist/mens.html", 
    "dist/womens.html", 
    "dist/latest-releases.html", 
    "dist/user-profile.html",
    "dist/kaze.html",
    "dist/cart.html"
)

# Process each file individually to handle different patterns
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        $modified = $false
        
        # Check for the cart.html pattern with profile-link
        if ($content -match '<a href="login\.html" class="profile-link">') {
            Write-Host "Updating profile-link pattern in $file"
            
            # Replace the profile link with account section at bottom
            $pattern = @'
        <a href="login.html" class="profile-link">
            <div class="profile-icon">👤</div>
            LOGIN / REGISTER
        </a>
'@
            $replacement = @'
        
        <!-- Account section moved to bottom of sidebar -->
        <div style="margin-top: auto;">
            <div class="nav-category">ACCOUNT</div>
            <ul class="nav-links" id="account-links">
                <!-- This content will be dynamically populated based on login status -->
                <li><a href="login.html" id="login-register-link">LOGIN / REGISTER</a></li>
            </ul>
        </div>
'@
            $content = $content -replace [regex]::Escape($pattern), $replacement
            
            # Add authentication script
            $authScript = @'

    <script>
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
                
                // Add logout functionality
                const logoutLink = document.getElementById('logout-link');
                if (logoutLink) {
                    logoutLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        localStorage.removeItem('userLoggedIn');
                        localStorage.removeItem('username');
                        window.location.reload();
                    });
                }
            }
        });
'@
            # Find a good insertion point for the auth script
            if ($content -match '(\s*// Sidebar Toggle\s*)') {
                $content = $content -replace '(\s*// Sidebar Toggle\s*)', "$authScript$1"
            }
            
            $modified = $true
        }
        # Standard pattern with account category in middle of sidebar
        elseif ($content -match '<div class="nav-category">ACCOUNT</div>') {
            Write-Host "Updating standard account pattern in $file"
            
            # Update the sidebar structure
            $pattern = @'
        <div class="nav-category">ACCOUNT</div>
        <ul class="nav-links" id="account-links">
            <!-- This content will be dynamically populated based on login status -->
'@
            $replacement = @'
        
        <!-- Account section moved to bottom of sidebar -->
        <div style="margin-top: auto;">
            <div class="nav-category">ACCOUNT</div>
            <ul class="nav-links" id="account-links">
                <!-- This content will be dynamically populated based on login status -->
                <li><a href="login.html" id="login-register-link">LOGIN / REGISTER</a></li>
'@
            $content = $content -replace [regex]::Escape($pattern), $replacement
            
            # Update the authentication JavaScript
            $authJsPattern = @'
        // User authentication management
        document.addEventListener\('DOMContentLoaded', function\(\) \{
            const accountLinks = document.getElementById\('account-links'\);
            
            // Check if user is logged in \(using localStorage for demo\)
'@
            $newAuthJs = @'
        // User authentication management
        document.addEventListener('DOMContentLoaded', function() {
            const accountLinks = document.getElementById('account-links');
            const loginRegisterLink = document.getElementById('login-register-link');
            
            // Check if user is logged in (using localStorage for demo)
'@
            $content = $content -replace $authJsPattern, $newAuthJs
            
            $modified = $true
        }
        
        # Save changes if the file was modified
        if ($modified) {
            $content | Set-Content -Path $file -Force
            Write-Host "Updated $file"
        } else {
            Write-Host "No matching pattern found in $file"
        }
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All navigation updates completed!" 