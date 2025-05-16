// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.updateTotal();
        this.saveToLocalStorage();
        this.updateCartUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveToLocalStorage();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateTotal();
                this.saveToLocalStorage();
                this.updateCartUI();
            }
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartUI() {
        // Update cart preview
        const cartPreviewItems = document.querySelector('.cart-preview-items');
        const cartPreviewTotal = document.querySelector('.cart-preview-total span:last-child');
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total-amount span:last-child');

        if (cartPreviewItems) {
            if (this.items.length === 0) {
                cartPreviewItems.innerHTML = '<div class="cart-preview-empty">Your cart is empty</div>';
            } else {
                cartPreviewItems.innerHTML = this.items.map(item => `
                    <div class="cart-preview-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-preview-image">
                        <div class="cart-preview-details">
                            <div class="cart-preview-name">${item.name}</div>
                            <div class="cart-preview-price">₹${item.price} x ${item.quantity}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (cartPreviewTotal) {
            cartPreviewTotal.textContent = `₹${this.total.toFixed(2)}`;
        }

        if (cartItems) {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">₹${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        if (cartTotal) {
            cartTotal.textContent = `₹${this.total.toFixed(2)}`;
        }
    }
}

// Initialize cart
const cart = new Cart();

// Add to cart button click handler
function handleAddToCart(event, product) {
    const button = event.target;
    button.classList.add('clicked');
    
    // Add item to cart
    cart.addItem(product);
    
    // Reset button state after animation
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 2000);
}

// Initialize add to cart buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        const card = button.closest('.release-card');
        const product = {
            id: card.dataset.productId,
            name: card.querySelector('.release-title').textContent,
            price: parseFloat(card.querySelector('.release-price').textContent.replace('₹', '')),
            image: card.querySelector('.release-image').src
        };
        
        button.addEventListener('click', (e) => handleAddToCart(e, product));
    });
}); 