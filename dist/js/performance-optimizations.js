// Optimize Mobile Performance
document.addEventListener('DOMContentLoaded', () => {
    // Debounce function to limit event frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Simplified Spiral Path Creation
    function createSimpleSpiralPath() {
        const path = document.getElementById('spiralPath');
        const rings = document.querySelectorAll('.neon-ring');
        const sizes = Array.from(rings).map(ring => {
            const style = window.getComputedStyle(ring);
            return parseFloat(style.width);
        });

        let pathData = '';
        for (let i = 0; i < sizes.length; i++) {
            const radius = sizes[i] / 2;
            pathData += `M ${-radius} 0 A ${radius} ${radius} 0 1 1 ${radius} 0 A ${radius} ${radius} 0 1 1 ${-radius} 0 `;
        }
        
        path.setAttribute('d', pathData);
    }

    // Optimized Scroll Handling
    const handleScroll = debounce(() => {
        const productsSection = document.getElementById('products');
        
        if (productsSection) {
            // Any products section related code can go here
        }
    }, 50);

    // Simplified Logo Interaction
    const logo = document.getElementById('logo');
    const logoContainer = document.querySelector('.logo-container');

    if (logo && logoContainer) {
        logoContainer.addEventListener('mousemove', debounce((e) => {
            const rect = logoContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            const currentY = parseFloat(getComputedStyle(logo).transform.split(',')[5]) || 0;
            logo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${currentY}px)`;
        }, 16)); // 60fps equivalent

        logoContainer.addEventListener('mouseleave', () => {
            const currentY = parseFloat(getComputedStyle(logo).transform.split(',')[5]) || 0;
            logo.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(${currentY}px)`;
        });
    }

    // Reduced Neon Ring Count for Mobile
    function optimizeNeonRings() {
        const backgroundAnimation = document.querySelector('.background-animation');
        if (!backgroundAnimation) return;
        
        const rings = backgroundAnimation.querySelectorAll('.neon-ring');
        const spiralPath = document.getElementById('spiralPath');
        
        // Optimize for mobile
        if (window.innerWidth <= 768) {
            // Keep only 2 rings on mobile
            for (let i = 2; i < rings.length; i++) {
                if (rings[i].parentNode === backgroundAnimation) {
                    backgroundAnimation.removeChild(rings[i]);
                }
            }
            
            // Hide the spiral path on mobile
            if (spiralPath) {
                spiralPath.style.display = 'none';
            }
        } else {
            // Restore spiral path on desktop if it was hidden
            if (spiralPath) {
                spiralPath.style.display = '';
            }
        }
    }

    // Navigation Toggle with Performance Optimization
    const navToggle = document.querySelector('.nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;
    const overlay = document.querySelector('.sidebar-overlay');

    if (navToggle && sidebar) {
        function openSidebar() {
            navToggle.classList.add('active');
            sidebar.classList.add('active');
            body.classList.add('sidebar-open');
        }
        
        function closeSidebar() {
            navToggle.classList.remove('active');
            sidebar.classList.remove('active');
            body.classList.remove('sidebar-open');
        }
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Ensure clicking on sidebar doesn't close it
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling to document
        });

        // Close sidebar when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                closeSidebar();
            });
        }
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeSidebar();
            }
        });
        
        // Handle escape key to close sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    }

    // Initialize
    if (document.getElementById('spiralPath')) {
        createSimpleSpiralPath();
    }
    optimizeNeonRings();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', optimizeNeonRings);
    handleScroll();
});

// Carousel Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (slides.length === 0 || !dotsContainer) return;
    
    let currentSlide = 0;
    let autoScrollInterval;
    const autoScrollDelay = 3000;

    // Create dots with passive event listener
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index), { passive: true });
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        resetAutoScroll();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function startAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Passive event listeners
    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval), { passive: true });
    carousel.addEventListener('mouseleave', startAutoScroll, { passive: true });

    // Start auto-scroll
    startAutoScroll();
}); 