$content = Get-Content -Path "dist/user-profile.html" -Raw
$replacement = '<ul class="nav-links" id="account-links" style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 20px !important;">
            <!-- Static links as fallback -->
            <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                <a href="user-profile.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">YOUR PROFILE</a>
            </li>
            <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                <a href="#" id="logout-link" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">LOGOUT</a>
            </li>'
$pattern = '<ul class="nav-links" id="account-links">\s+<!-- This content will be dynamically populated based on login status -->'
$content = $content -replace $pattern, $replacement
$content | Set-Content -Path "dist/user-profile.html" -Force
Write-Host "Fix applied to user-profile.html" 