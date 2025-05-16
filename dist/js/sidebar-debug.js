// Sidebar Debug Utility
(function() {
    // Debug function to check if the sidebar is working
    function checkSidebarFunctionality() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        console.log('Sidebar Debug Information:');
        console.log('- Sidebar exists:', !!sidebar);
        console.log('- Overlay exists:', !!overlay);
        
        if (sidebar && overlay) {
            console.log('- Sidebar current state:', sidebar.classList.contains('active') ? 'active' : 'inactive');
            console.log('- Overlay current state:', overlay.classList.contains('active') ? 'active' : 'inactive');
            
            // Removed debug button
        } else {
            console.error('Some sidebar elements are missing!');
        }
    }
    
    // Run the check after a short delay
    setTimeout(checkSidebarFunctionality, 1000);
    
    // Expose debug function to window
    window.debugSidebar = checkSidebarFunctionality;
    
    // Add keyboard shortcut (Alt+D) to trigger debug
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'd') {
            checkSidebarFunctionality();
            console.log('Sidebar debug triggered via keyboard shortcut (Alt+D)');
        }
    });
    
    console.log('Sidebar debug utility loaded. Press Alt+D to debug sidebar.');
})(); 