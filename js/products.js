// Product data structured as a JavaScript object
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
    'kaze-womens-basic-tee': {
        id: 'kaze-womens-basic-tee',
        title: 'KAZE BASIC TEE - WOMEN',
        price: '₹1,400',
        description: 'Our KAZE Basic Tee for women offers timeless style with premium comfort. Cut from soft, breathable cotton with a slightly relaxed fit that flatters every body type. Features a minimalist design with subtle KAZE branding. The perfect foundation for any outfit, from casual to dressed up.',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Organic Cotton, 180 GSM',
        care: 'Machine wash cold, tumble dry low',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-WTEE-001',
        category: 'womens',
        subcategory: 'tshirts',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'White', value: '#fff' },
            { name: 'Gray', value: '#808080' },
            { name: 'Beige', value: '#f5f5dc' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'kaze-jogger-pants': {
        id: 'kaze-jogger-pants',
        title: 'KAZE JOGGER PANTS',
        price: '₹1,700',
        description: 'Experience ultimate comfort with our KAZE Jogger Pants. Features a relaxed fit with tapered legs, elastic waistband with drawstring, and side pockets. Made from premium French terry fabric that's soft against the skin yet durable for everyday wear. The perfect balance of style and comfort for your active lifestyle.',
        image: 'https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '80% Cotton, 20% Polyester French Terry',
        care: 'Machine wash cold, tumble dry low',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-PANT-002',
        category: 'mens',
        subcategory: 'pants',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'Gray', value: '#808080' },
            { name: 'Navy', value: '#000080' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    'kaze-chino-pants': {
        id: 'kaze-chino-pants',
        title: 'KAZE CHINO PANTS',
        price: '₹1,700',
        description: 'Our KAZE Chino Pants offer timeless style with contemporary details. Features a slim fit with slight stretch for comfort, clean front with subtle pocket styling, and minimal branding. Versatile enough for both casual and semi-formal occasions. Made from premium twill fabric that gets better with each wear.',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '98% Cotton, 2% Elastane Twill',
        care: 'Machine wash cold, hang dry',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-PANT-003',
        category: 'mens',
        subcategory: 'pants',
        colors: [
            { name: 'Beige', value: '#f5f5dc' },
            { name: 'Navy', value: '#000080' },
            { name: 'Olive', value: '#556b2f' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    'kaze-latest-pants': {
        id: 'kaze-latest-pants',
        title: 'KAZE CARGO PANTS',
        price: '₹1,500',
        description: 'Our newest cargo pants design featuring a contemporary silhouette with functional details. Six pockets provide ample storage while the adjustable waist and ankle cuffs ensure a perfect fit. Made from durable ripstop fabric that's built to last yet remains comfortable for all-day wear.',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Cotton Ripstop',
        care: 'Machine wash cold, hang dry',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-PANT-004',
        category: 'mens',
        subcategory: 'pants',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'Khaki', value: '#c3b091' },
            { name: 'Olive', value: '#556b2f' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    'kaze-womens-graphic-tee': {
        id: 'kaze-womens-graphic-tee',
        title: 'KAZE GRAPHIC TEE - WOMEN',
        price: '₹1,200',
        description: 'Express your style with our KAZE Graphic Tee for women. Features our signature artistic design printed using eco-friendly techniques. Made from soft, premium cotton with a contemporary fit that's both comfortable and flattering. A versatile piece that pairs well with anything from jeans to skirts.',
        image: 'https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Combed Cotton, 180 GSM',
        care: 'Machine wash cold, tumble dry low, do not iron on print',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-WTEE-002',
        category: 'womens',
        subcategory: 'tshirts',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'White', value: '#fff' },
            { name: 'Pink', value: '#ffc0cb' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'kaze-womens-striped-tee': {
        id: 'kaze-womens-striped-tee',
        title: 'KAZE STRIPED TEE - WOMEN',
        price: '₹1,200',
        description: 'Our KAZE Striped Tee for women combines classic pattern with modern styling. Features alternating stripes with our subtle logo embroidery. Made from premium cotton blend for exceptional comfort and durability, with a contemporary silhouette that offers a flattering fit. Perfect for elevating your casual wardrobe.',
        image: 'https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '95% Cotton, 5% Elastane',
        care: 'Machine wash cold, tumble dry low',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-WTEE-003',
        category: 'womens',
        subcategory: 'tshirts',
        colors: [
            { name: 'Black/White', value: '#000' },
            { name: 'Navy/White', value: '#000080' },
            { name: 'Red/White', value: '#ff0000' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'kaze-womens-essential-hoodie': {
        id: 'kaze-womens-essential-hoodie',
        title: 'KAZE ESSENTIAL HOODIE - WOMEN',
        price: '₹2,700',
        description: 'Stay cozy in style with our KAZE Essential Hoodie for women. Crafted from premium heavyweight cotton with a soft brushed interior and a relaxed yet flattering fit. Features a kangaroo pocket and our signature logo embroidery. The perfect balance of comfort and style for cooler days.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Premium Organic Cotton, 400 GSM',
        care: 'Machine wash cold, tumble dry low, do not bleach',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-WHOOD-001',
        category: 'womens',
        subcategory: 'hoodies',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'White', value: '#fff' },
            { name: 'Pink', value: '#ffc0cb' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'kaze-womens-zip-up-hoodie': {
        id: 'kaze-womens-zip-up-hoodie',
        title: 'KAZE ZIP-UP HOODIE - WOMEN',
        price: '₹2,700',
        description: 'Our KAZE Zip-Up Hoodie for women offers versatility with premium style. Features a full-length zipper, adjustable hood, and side pockets. Made from heavyweight cotton with a soft brushed interior for exceptional comfort. Perfect for layering or wearing on its own in changing weather conditions.',
        image: 'https://images.unsplash.com/photo-1552663651-2e4250e6c7c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Premium Organic Cotton, 400 GSM',
        care: 'Machine wash cold, tumble dry low, do not bleach',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-WHOOD-002',
        category: 'womens',
        subcategory: 'hoodies',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'Gray', value: '#808080' },
            { name: 'Cream', value: '#fffdd0' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'kaze-womens-oversized-hoodie': {
        id: 'kaze-womens-oversized-hoodie',
        title: 'KAZE OVERSIZED HOODIE - WOMEN',
        price: '₹2,700',
        description: 'Make a statement with our KAZE Oversized Hoodie for women. Features an ultra-comfortable relaxed fit, drop shoulders, and our signature minimalist branding. The exaggerated silhouette creates a contemporary look that's both on-trend and timeless. Perfect for lounging or styling as streetwear.',
        image: 'https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: '100% Premium Organic Cotton, 420 GSM',
        care: 'Machine wash cold, tumble dry low, do not bleach',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-WHOOD-003',
        category: 'womens',
        subcategory: 'hoodies',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'White', value: '#fff' },
            { name: 'Lavender', value: '#e6e6fa' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'kaze-bomber-jacket': {
        id: 'kaze-bomber-jacket',
        title: 'KAZE BOMBER JACKET',
        price: '₹3,500',
        description: 'The KAZE Bomber Jacket represents the perfect fusion of streetwear aesthetic and premium craftsmanship. Features a sleek silhouette with ribbed collar, cuffs, and hem, along with our signature embroidered logo. Multiple pockets provide both functionality and style. The ideal outerwear piece for transitional seasons.',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: 'Outer: 100% Nylon, Lining: 100% Polyester, Ribbing: 98% Cotton, 2% Elastane',
        care: 'Dry clean only',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-JACK-001',
        category: 'mens',
        subcategory: 'jackets',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'Olive', value: '#556b2f' },
            { name: 'Navy', value: '#000080' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    'kaze-sneakers': {
        id: 'kaze-sneakers',
        title: 'KAZE MINIMAL SNEAKERS',
        price: '₹4,200',
        description: 'Step into style with our KAZE Minimal Sneakers. Handcrafted with premium materials and meticulous attention to detail. Features a clean, minimalist design with subtle KAZE branding, ultra-comfortable cushioned insole, and durable outsole for all-day wear. The perfect balance of fashion and function for the modern individual.',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: 'Upper: Premium Leather, Lining: Textile, Sole: Rubber',
        care: 'Wipe clean with damp cloth',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-FOOT-001',
        category: 'footwear',
        subcategory: 'sneakers',
        colors: [
            { name: 'White', value: '#fff' },
            { name: 'Black', value: '#000' },
            { name: 'Gray', value: '#808080' }
        ],
        sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
    },
    'kaze-backpack': {
        id: 'kaze-backpack',
        title: 'KAZE UTILITY BACKPACK',
        price: '₹3,800',
        description: 'The KAZE Utility Backpack combines functionality with our signature minimalist aesthetic. Features multiple compartments including a padded laptop sleeve, water-resistant exterior, and ergonomic shoulder straps. Perfect for everyday adventures, work commutes, or weekend getaways. Thoughtfully designed to organize your essentials in style.',
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=85',
        material: 'Water-resistant Nylon with Leather Accents',
        care: 'Spot clean with mild soap and water',
        origin: 'Ethically manufactured in India',
        sku: 'KAZE-ACC-001',
        category: 'accessories',
        subcategory: 'bags',
        colors: [
            { name: 'Black', value: '#000' },
            { name: 'Gray', value: '#808080' },
            { name: 'Olive', value: '#556b2f' }
        ],
        sizes: ['One Size']
    }
};

// Export the products object for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
} 