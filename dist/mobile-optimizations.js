// Mobile Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced debounce with requestAnimationFrame for smoother animations
    function debounce(func, wait) {
        let timeout;
        let lastRun = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastRun >= wait) {
                cancelAnimationFrame(timeout);
                lastRun = now;
                func.apply(this, args);
            } else {
                cancelAnimationFrame(timeout);
                timeout = requestAnimationFrame(() => {
                    lastRun = now;
                    func.apply(this, args);
                });
            }
        };
    }

    // Optimized spiral path creation using requestAnimationFrame
    function createSimpleSpiralPath() {
        requestAnimationFrame(() => {
            const path = document.getElementById('spiralPath');
            if (!path) return;

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
        });
    }

    // Optimized scroll handling with IntersectionObserver
    const productsSectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const searchContainer = document.querySelector('.search-container');
                    if (searchContainer) {
                        searchContainer.classList.add('visible');
                    }
                }
            });
        },
        { threshold: 0.1 }
    );

    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSectionObserver.observe(productsSection);
    }

    // Optimized search container floating behavior
    const searchContainerObserver = new IntersectionObserver(
        (entries) => {
            const searchContainer = document.querySelector('.search-container');
            if (!searchContainer) return;

            entries.forEach(entry => {
                searchContainer.classList.toggle('floating', !entry.isIntersecting);
            });
        },
        { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );

    const header = document.querySelector('header');
    if (header) {
        searchContainerObserver.observe(header);
    }

    // Optimized logo interaction with hardware acceleration
    const logo = document.getElementById('logo');
    const logoContainer = document.querySelector('.logo-container');

    if (logo && logoContainer) {
        let rafId;
        const handleLogoMove = (e) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = logoContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                logo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                logo.style.willChange = 'transform';
            });
        };

        logoContainer.addEventListener('mousemove', handleLogoMove, { passive: true });
        logoContainer.addEventListener('mouseleave', () => {
            cancelAnimationFrame(rafId);
            logo.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            logo.style.willChange = 'auto';
        });

        // Touch events for mobile
        logoContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            handleLogoMove(touch);
        }, { passive: false });
    }

    // Dynamic neon ring optimization
    function optimizeNeonRings() {
        requestAnimationFrame(() => {
            const backgroundAnimation = document.querySelector('.background-animation');
            if (!backgroundAnimation) return;

            const rings = backgroundAnimation.querySelectorAll('.neon-ring');
            const maxRings = window.innerWidth <= 768 ? 2 : rings.length;
            
            rings.forEach((ring, index) => {
                if (index >= maxRings) {
                    ring.style.display = 'none';
                } else {
                    ring.style.display = '';
                }
            });
        });
    }

    // Optimized navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (navToggle && sidebar) {
        navToggle.addEventListener('click', () => {
            requestAnimationFrame(() => {
                navToggle.classList.toggle('active');
                sidebar.classList.toggle('active');
                sidebar.style.willChange = 'transform';
                
                setTimeout(() => {
                    sidebar.style.willChange = 'auto';
                }, 300);
            });
        });

        // Optimized click outside handling
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && 
                !navToggle.contains(e.target) && 
                sidebar.classList.contains('active')) {
                requestAnimationFrame(() => {
                    sidebar.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            }
        }, { passive: true });
    }

    // Optimized carousel with IntersectionObserver and touch support
    class OptimizedCarousel {
        constructor() {
            this.carousel = document.querySelector('.carousel');
            this.slides = document.querySelectorAll('.carousel-slide');
            this.dotsContainer = document.querySelector('.carousel-dots');
            
            if (!this.carousel || !this.slides.length) return;

            this.currentSlide = 0;
            this.autoScrollDelay = 3000;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.minSwipeDistance = 50;

            this.init();
        }

        init() {
            this.createDots();
            this.setupTouchEvents();
            this.setupIntersectionObserver();
            this.startAutoScroll();

            // Optimize transitions
            this.carousel.style.willChange = 'transform';
            this.slides.forEach(slide => {
                slide.style.willChange = 'transform';
            });
        }

        createDots() {
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index), { passive: true });
                this.dotsContainer.appendChild(dot);
            });
        }

        setupTouchEvents() {
            this.carousel.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
            }, { passive: true });

            this.carousel.addEventListener('touchmove', (e) => {
                this.touchEndX = e.touches[0].clientX;
            }, { passive: true });

            this.carousel.addEventListener('touchend', () => {
                const swipeDistance = this.touchEndX - this.touchStartX;
                
                if (Math.abs(swipeDistance) > this.minSwipeDistance) {
                    if (swipeDistance > 0) {
                        this.prevSlide();
                    } else {
                        this.nextSlide();
                    }
                }
            }, { passive: true });
        }

        setupIntersectionObserver() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.startAutoScroll();
                        } else {
                            this.stopAutoScroll();
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(this.carousel);
        }

        updateDots() {
            requestAnimationFrame(() => {
                const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
            });
        }

        goToSlide(index) {
            this.currentSlide = index;
            requestAnimationFrame(() => {
                this.carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                this.updateDots();
            });
            this.resetAutoScroll();
        }

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(this.currentSlide);
        }

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(this.currentSlide);
        }

        startAutoScroll() {
            this.stopAutoScroll();
            this.autoScrollInterval = setInterval(() => this.nextSlide(), this.autoScrollDelay);
        }

        stopAutoScroll() {
            if (this.autoScrollInterval) {
                clearInterval(this.autoScrollInterval);
            }
        }

        resetAutoScroll() {
            this.stopAutoScroll();
            this.startAutoScroll();
        }
    }

    // Initialize
    createSimpleSpiralPath();
    optimizeNeonRings();
    new OptimizedCarousel();

    // Optimized resize handler
    const debouncedResize = debounce(() => {
        optimizeNeonRings();
        createSimpleSpiralPath();
    }, 150);

    window.addEventListener('resize', debouncedResize, { passive: true });

    // Cleanup function
    window.addEventListener('unload', () => {
        productsSectionObserver.disconnect();
        searchContainerObserver.disconnect();
    });
}));