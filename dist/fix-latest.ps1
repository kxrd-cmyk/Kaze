$content = Get-Content -Path "dist/latest-releases.html" -Raw
$replacement = '<ul class="nav-links" id="account-links" style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 20px !important;">
            <!-- Static links as fallback -->
            <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                <a href="login.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">LOGIN</a>
            </li>
            <li style="display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 10px !important;">
                <a href="register.html" style="display: block !important; color: #fff !important; text-decoration: none !important; padding: 8px 0 !important; visibility: visible !important; opacity: 0.7 !important;">REGISTER</a>
            </li>'
$pattern = '<ul class="nav-links" id="account-links">\s+<!-- This content will be dynamically populated based on login status -->'
$content = $content -replace $pattern, $replacement
$content | Set-Content -Path "dist/latest-releases.html" -Force
Write-Host "Fix applied to latest-releases.html" 