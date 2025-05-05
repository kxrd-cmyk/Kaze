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

// Centralized Cart Management
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
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

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
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
