$files = @("dist/womens.html", "dist/latest-releases.html", "dist/user-profile.html")

$scriptToAdd = @"
    <script>
        // Immediate login check to populate account links
        (function() {
            const accountLinks = document.getElementById('account-links');
            if (accountLinks) {
                const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                const username = localStorage.getItem('username') || 'User';
                
                if (isLoggedIn) {
                    accountLinks.innerHTML = `
                        <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                            <a href="user-profile.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">YOUR PROFILE</a>
                        </li>
                        <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                            <a href="#" id="logout-link" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">LOGOUT</a>
                        </li>
                    `;
                } else {
                    accountLinks.innerHTML = `
                        <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                            <a href="login.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">LOGIN</a>
                        </li>
                        <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                            <a href="register.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">REGISTER</a>
                        </li>
                    `;
                }
                
                // Add logout event handler
                setTimeout(function() {
                    const logoutLink = document.getElementById('logout-link');
                    if (logoutLink) {
                        logoutLink.addEventListener('click', function(e) {
                            e.preventDefault();
                            localStorage.removeItem('userLoggedIn');
                            localStorage.removeItem('username');
                            window.location.reload();
                        });
                    }
                }, 100);
            }
        })();
    </script>
"@

# This regex pattern will match the incorrect script blocks in the HTML files
$badScriptPattern = @'
<script>
\s+// Immediate login check to populate account links
\s+\(function\(\) \{
\s+const accountLinks = document\.getElementById\('account-links'\);
\s+if \(accountLinks\) \{
\s+const isLoggedIn = localStorage\.getItem\('userLoggedIn'\) === 'true';
\s+const username = localStorage\.getItem\('username'\) \|\| 'User';
\s+
\s+if \(isLoggedIn\) \{
\s+accountLinks\.innerHTML = 
\s+<li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
\s+<a href="user-profile\.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0\.7 !important;">YOUR PROFILE</a>
\s+</li>
\s+<li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
\s+<a href="#" id="logout-link" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0\.7 !important;">LOGOUT</a>
\s+</li>
\s+;
\s+\} else \{
\s+accountLinks\.innerHTML = 
\s+<li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
\s+<a href="login\.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0\.7 !important;">LOGIN</a>
\s+</li>
\s+<li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
\s+<a href="register\.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0\.7 !important;">REGISTER</a>
\s+</li>
\s+;
'@

foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw
    
    # First, remove the bad script section with incorrect template literals
    if ($content -match $badScriptPattern) {
        Write-Host "Found incorrect script in $file, fixing it..."
        
        # Replace the incorrect script with our corrected version
        $content = $content -replace "(?s)<script>.*?// Immediate login check to populate account links.*?setTimeout\(function\(\) \{.*?}, 100\);.*?}\)\(\);\s*</script>", $scriptToAdd
        
        # Save the fixed content back to the file
        $content | Set-Content -Path $file -Force
        Write-Host "Fixed script in $file"
    } else {
        Write-Host "No incorrect script found in $file, skipping..."
    }
    
    # Also fix the cart icon in user-profile.html which somehow got corrupted
    if ($file -eq "dist/user-profile.html") {
        $content = $content -replace '<div class="cart-icon" onclick="window\.location\.href=''cart\.html''">\s+\?\?', '<div class="cart-icon" onclick="window.location.href=''cart.html''">\n        🛒'
        $content | Set-Content -Path $file -Force
        Write-Host "Fixed cart icon in user-profile.html"
    }
}

Write-Host "All files fixed successfully!" 