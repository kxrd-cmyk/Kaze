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

// Improved Cart Management
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(product) {
        try {
            const existingItem = this.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            this.saveCart();
            this.updateUI();
        } catch (error) {
            console.error('Error adding item to cart:', error);
            // Show user-friendly error message
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(event, name, price, image) {
    event.preventDefault();
    event.stopPropagation();

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            image,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Add button animation
    const button = event.target.closest('.add-to-cart-btn');
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 1500);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Attach event listeners directly (no DOMContentLoaded needed)
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const card = button.closest('.release-card');
        const name = card.querySelector('.release-title').textContent;
        const price = card.querySelector('.release-price').textContent;
        const image = card.querySelector('.release-image').src;
        addToCart(event, name, price, image);
    });
});

// Initialize cart count
updateCartCount();