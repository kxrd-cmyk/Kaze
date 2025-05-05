// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Helper functions
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Centralized Cart Management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
    }

    loadCart() {
        try {
            // Try localStorage first
            const local = localStorage.getItem('cart');
            if (local) return JSON.parse(local);
        } catch {}
        // Fallback to cookies
        try {
            return JSON.parse(getCookie('cart')) || [];
        } catch {
            return [];
        }
    }

    saveCart() {
        const cartString = JSON.stringify(this.cart);
        try {
            localStorage.setItem('cart', cartString);
        } catch {}
        setCookie('cart', cartString);
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateUI();
    }

    updateUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
}

const cartManager = new CartManager();

// Attach event listeners after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const card = button.closest('.release-card');
            const name = card.querySelector('.release-title').textContent;
            const price = card.querySelector('.release-price').textContent;
            const image = card.querySelector('.release-image').src;
            cartManager.addItem({ name, price, image });
            // Add button animation
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 1500);
        });
    });
    cartManager.updateUI();
});
