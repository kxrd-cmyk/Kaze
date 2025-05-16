import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product data based on ID
  useEffect(() => {
    // Simulate API call with 500ms delay
    const timer = setTimeout(() => {
      const fetchedProduct = getProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Preselect first size and color if available
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
          setSelectedColor(fetchedProduct.colors[0].name);
        }
      } else {
        // Redirect to 404 page if product not found
        navigate('/not-found');
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId, navigate]);

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === cartItem.id && 
      item.size === cartItem.size && 
      item.color === cartItem.color
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show added to cart message
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  // Render product detail page
  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-container">
          <div className="product-images">
            <img src={product.image} alt={product.title} className="main-image" />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-options">
                <h3 className="option-title">SIZE</h3>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <div 
                      key={size} 
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {product.colors && product.colors.length > 0 && (
              <div className="product-options">
                <h3 className="option-title">COLOR</h3>
                <div className="color-options">
                  {product.colors.map(color => (
                    <div 
                      key={color.name}
                      className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColorSelect(color.name)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              {addedToCart ? 'ADDED TO CART!' : 'ADD TO CART'}
            </button>
            
            <div className="product-details">
              <h3 className="details-title">DETAILS</h3>
              <p className="details-content">
                <strong>Material:</strong> {product.material}<br />
                <strong>Care:</strong> {product.care}<br />
                <strong>Origin:</strong> {product.origin}<br />
                <strong>SKU:</strong> {product.sku}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 