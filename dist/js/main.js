// Add direct sidebar toggle functionality
const toggleSidebar = function() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    if (toggleBtn && sidebar && overlay) {
        toggleBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('sidebar-open');
    }
};

// Add an immediate listener outside DOMContentLoaded
setTimeout(function() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    // Expose to global scope for manual activation
    window.toggleSidebar = toggleSidebar;
}, 500);

// Make sidebar active by default for debugging
/*
setTimeout(function() {
    toggleSidebar();
}, 1000);
*/

// Rest of main.js...
// ... existing code ... 