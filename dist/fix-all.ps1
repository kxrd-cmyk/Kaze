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

foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw
    $pattern = "</head>\s+<body>"
    $replacement = "</head>`n<body>`n$scriptToAdd"
    $content = $content -replace $pattern, $replacement
    $content | Set-Content -Path $file -Force
    Write-Host "Added immediate login check to $file"
}

Write-Host "All files updated successfully!" 