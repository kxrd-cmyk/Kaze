// Product data structure
const products = {
    'kaze-essential-hoodie': {
        id: 'kaze-essential-hoodie',
        title: 'KAZE ESSENTIAL HOODIE',
        price: '₹2,700',
        description: 'Introducing the KAZE Essential Hoodie, the cornerstone of modern streetwear. Crafted from premium heavyweight cotton with a soft brushed interior for maximum comfort. Features a relaxed fit, kangaroo pocket, and our iconic logo embroidered on the chest. Perfect for layering or wearing on its own. Available in multiple colors to match your style.',
        image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Premium Organic Cotton, 400 GSM',
        care: 'Machine wash cold, tumble dry low, do not bleach',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-HOOD-001',
        category: 'mens',
        subcategory: 'hoodies',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'White', value: '#fff' },
            { name: 'Gray', value: '#808080' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    'kaze-graphic-tee': {
        id: 'kaze-graphic-tee',
        title: 'KAZE GRAPHIC TEE',
        price: '₹1,200',
        description: 'The KAZE Graphic Tee redefines everyday style with its minimalist design and subtle statement logo. Made from lightweight yet durable cotton with a relaxed silhouette that drapes perfectly on any body type. Features our signature KAZE motif that represents the flow of creativity and chaos. An essential addition to any wardrobe.',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Combed Cotton, 180 GSM',
        care: 'Machine wash cold, tumble dry low, do not iron on print',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-TEE-001',
        category: 'mens',
        subcategory: 'tshirts',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'White', value: '#fff' },
            { name: 'Gray', value: '#808080' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    'kaze-cargo-pants': {
        id: 'kaze-cargo-pants',
        title: 'KAZE CARGO PANTS',
        price: '₹1,700',
        description: 'Our signature KAZE Cargo Pants blend functional design with contemporary style. Features multiple utility pockets, an adjustable drawstring waist, and tapered legs for a modern silhouette. Made from durable yet comfortable twill fabric with just the right amount of stretch for all-day comfort. Perfect for both urban adventures and casual wear.',
        image: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '98% Cotton, 2% Elastane Twill',
        care: 'Machine wash cold, hang dry',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-PANT-001',
        category: 'mens',
        subcategory: 'pants',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'Khaki', value: '#c3b091' },
            { name: 'Olive', value: '#556b2f' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    // Add more products as needed
};

// Helper function to get product by ID
export const getProductById = (productId) => {
    return products[productId] || null;
};

// Get all products
export const getAllProducts = () => {
    return Object.values(products);
};

// Get products by category
export const getProductsByCategory = (category) => {
    return Object.values(products).filter(product => product.category === category);
};

export default products; 