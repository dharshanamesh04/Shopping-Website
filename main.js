document.addEventListener("DOMContentLoaded", () => {
    // ---- Dynamic Theme ----
    const hues = [
        ["#FF921C", "#ECA427"], // Orange/Yellow
        ["#00796b", "#004d40"], // Green
        ["#1565c0", "#0d47a1"]  // Blue
    ];
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % hues.length;
        document.documentElement.style.setProperty("--primary", hues[idx][0]);
        document.documentElement.style.setProperty("--secondary", hues[idx][1]);
    }, 10000);

    // ---- Hero Slider ----
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }
    
    // ---- Dynamic Product & Brand Insertion (Home Page) ----
    const trendingProducts = [
        { name: "Mens Straight Fit Jeans", img: "images/jeans1.jpg", link: "mens-jeans.html" },
        { name: "Mens Formal Shirt", img: "images/shirts2.jpg", link: "mens-shirts.html" },
        { name: "Mens Bomber Jacket", img: "images/jackets1.jpg", link: "jackets.html" },
    ];
    
    const hotDeals = [
        { name: "Mens Smartwatch", img: "images/watches6.jpg", link: "watches.html" },
        { name: "Mens Sneakers", img: "images/footwear1.jpg", link: "footwear.html" },
        { name: "Mens Tapered Jeans", img: "images/jeans3.jpg", link: "mens-jeans.html" },
    ];

    const topBrands = [
        { name: "Brand A", logo: "images/brand1.png", link: "mens-shirts.html" },
        { name: "Brand B", logo: "images/brand2.png", link: "mens-jeans.html" },
        { name: "Brand C", logo: "images/brand3.png", link: "footwear.html" },
        { name: "Brand D", logo: "images/brand4.png", link: "jackets.html" },
        { name: "Brand E", logo: "images/brand5.png", link: "watches.html" },
    ];
    
    const OFFERS = [
        { title: "Flat 40% OFF on Footwear", img: "images/offer1.jpg", link: "footwear.html" },
        { title: "Buy 1 Get 1 on T-Shirts", img: "images/offer2.jpg", link: "mens-shirts.html" },
        { title: "Up to 50% OFF on Jackets", img: "images/offer3.jpg", link: "jackets.html" },
    ];

    function populateProducts(containerId, products) {
        const container = document.getElementById(containerId);
        if (!container) return;
        products.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <a href="${p.link}">
                    <div class="product-img-container">
                        <img class="product-image" src="/static/${p.img}" alt="${p.name}">
                    </div>
                    <p class="product-name">${p.name}</p>
                </a>
            `;
            container.appendChild(card);
        });
    }

    function populateBrands(containerId, brands) {
        const container = document.getElementById(containerId);
        if (!container) return;
        brands.forEach(b => {
            const card = document.createElement("div");
            card.className = "brand-card";
            card.innerHTML = `<a href="${b.link}"><img src="/static/${b.logo}" alt="${b.name}"></a>`;
            container.appendChild(card);
        });
    }

    function populateOffers(containerId, offers) {
        const container = document.getElementById(containerId);
        if (!container) return;
        offers.forEach(o => {
            const card = document.createElement("div");
            card.className = "offer-card";
            card.innerHTML = `
                <a href="${o.link}">
                    <img src="/static/${o.img}" alt="${o.title}">
                </a>
                <h3>${o.title}</h3>
                <a class="btn" href="${o.link}">Shop Offer</a>
            `;
            container.appendChild(card);
        });
    }

    populateProducts('trending-products', trendingProducts);
    populateProducts('hot-deals', hotDeals);
    populateBrands('top-brands', topBrands);
    populateOffers('offers-container', OFFERS);

    // ---- Lightbox Functionality ----
    const lightboxLinks = document.querySelectorAll('.lightbox');
    if (lightboxLinks.length > 0) {
        const overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        const img = document.createElement('img');
        overlay.appendChild(img);
        document.body.appendChild(overlay);

        lightboxLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                img.src = link.href;
                overlay.style.display = 'flex';
            });
        });

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }
    
    // ---- Search Functionality ----
    const search = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const go = () => {
        const q = search.value.toLowerCase();
        if (q.includes("jean")) window.location.href = "mens-jeans.html";
        else if (q.includes("shirt")) window.location.href = "mens-shirts.html";
        else if (q.includes("trouser")) window.location.href = "mens-trousers.html";
        else if (q.includes("jacket")) window.location.href = "jackets.html";
        else if (q.includes("foot") || q.includes("shoe") || q.includes("sneaker")) window.location.href = "footwear.html";
        else if (q.includes("watch")) window.location.href = "watches.html";
        else alert("No products found");
    };
    if (searchBtn) searchBtn.addEventListener("click", go);
    if (search) search.addEventListener("keydown", e => { if (e.key === "Enter") go(); });

    // ---- Dropdown Functionality ----
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            dropdowns.forEach(other => {
                if (other !== this) {
                    other.classList.remove('active');
                }
            });
        });
    });

    document.addEventListener('click', function(e) {
        dropdowns.forEach(drop => {
            if (!drop.contains(e.target)) {
                drop.classList.remove('active');
            }
        });
    });

    // ---- Product Page Logic ----
    function fetchAndDisplayProducts(category, galleryId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;

        fetch(`/api/products/${category}`)
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product-card';
                    productDiv.innerHTML = `
                        <a href="#">
                            <img class="product-image" src="/static/${product.image_url}" alt="${product.name}">
                        </a>
                        <div class="product-details">
                            <p class="product-name">${product.name}</p>
                            <p class="product-price">₹${product.price.toFixed(2)}</p>
                            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                            <button class="add-to-wishlist-btn" data-product-id="${product.id}">Add to Wishlist</button>
                        </div>
                    `;
                    gallery.appendChild(productDiv);
                });
                document.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.addEventListener('click', handleAddToCart));
                document.querySelectorAll('.add-to-wishlist-btn').forEach(btn => btn.addEventListener('click', handleAddToWishlist));
            })
            .catch(error => console.error(`Error fetching products for ${category}:`, error));
    }
    
    // ---- Login and Signup form handling ----
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            fetch('/login', {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    window.location.href = '/';
                }
            });
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const formData = new FormData(signupForm);
            fetch('/signup', {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    window.location.href = '/login.html';
                }
            });
        });
    }

    // ---- Cart, Wishlist, and Orders Logic ----
    function handleAddToCart(event) {
        const productId = event.target.dataset.productId;
        fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    }

    function handleAddToWishlist(event) {
        const productId = event.target.dataset.productId;
        fetch('/api/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    }

    function fetchAndDisplayCart() {
        const cartList = document.getElementById('cart-list');
        const cartTotal = document.getElementById('cart-total');
        if (!cartList || !cartTotal) return;

        fetch('/api/cart')
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '/login.html';
                    return;
                }
                return response.json();
            })
            .then(items => {
                if (!items) return;
                cartList.innerHTML = '';
                let total = 0;
                if (items.length === 0) {
                    cartList.innerHTML = '<p>Your cart is empty.</p>';
                }
                items.forEach(item => {
                    total += item.price * item.quantity;
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="item-info">
                            <img src="/static/${item.image_url}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>Price: ₹${item.price.toFixed(2)}</p>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                        </div>
                        <button class="remove-btn" data-product-id="${item.id}">Remove</button>
                    `;
                    cartList.appendChild(cartItem);
                });
                cartTotal.textContent = total.toFixed(2);

                document.querySelectorAll('.remove-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = this.dataset.productId;
                        fetch('/api/cart', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ product_id: productId })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert(data.message);
                                fetchAndDisplayCart();
                            }
                        });
                    });
                });
            });
    }
    
    function fetchAndDisplayWishlist() {
        const wishlistContainer = document.getElementById('wishlist-container');
        if (!wishlistContainer) return;
        
        fetch('/api/wishlist')
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '/login.html';
                    return;
                }
                return response.json();
            })
            .then(items => {
                if (!items) return;
                wishlistContainer.innerHTML = '';
                if (items.length === 0) {
                    wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
                    return;
                }
                items.forEach(item => {
                    const wishItem = document.createElement('div');
                    wishItem.className = 'product-card';
                    wishItem.innerHTML = `
                        <a href="#">
                            <div class="product-img-container">
                                <img class="product-image" src="/static/${item.image_url}" alt="${item.name}">
                            </div>
                            <p class="product-name">${item.name}</p>
                            <p class="product-price">₹${item.price.toFixed(2)}</p>
                        </a>
                        <div class="btn-group">
                            <button class="add-to-cart-btn" data-product-id="${item.id}">Add to Cart</button>
                            <button class="remove-wish-btn" data-product-id="${item.id}">Remove</button>
                        </div>
                    `;
                    wishlistContainer.appendChild(wishItem);
                });
                
                document.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.addEventListener('click', handleAddToCart));
                document.querySelectorAll('.remove-wish-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = this.dataset.productId;
                        fetch('/api/wishlist', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ product_id: productId })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert(data.message);
                                fetchAndDisplayWishlist();
                            }
                        });
                    });
                });
            });
    }
    
    function fetchAndDisplayOrders() {
        const ordersContainer = document.getElementById('orders-container');
        if (!ordersContainer) return;
        
        fetch('/api/orders')
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '/login.html';
                    return;
                }
                return response.json();
            })
            .then(orders => {
                if (!orders) return;
                ordersContainer.innerHTML = '';
                if (orders.length === 0) {
                    ordersContainer.innerHTML = '<p>You have not placed any orders yet.</p>';
                    return;
                }
                orders.forEach(order => {
                    const orderDiv = document.createElement('div');
                    orderDiv.className = 'order-card';
                    const orderDate = new Date(order.order_date).toLocaleDateString();
                    let itemsHtml = order.items.map(item => `
                        <div class="order-item">
                            <img src="/static/${item.image_url}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>Price: ₹${item.price.toFixed(2)}</p>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                        </div>
                    `).join('');
                    
                    orderDiv.innerHTML = `
                        <h3>Order #${order.order_id} - <span class="order-date">${orderDate}</span></h3>
                        <div class="order-items-list">
                            ${itemsHtml}
                        </div>
                        <p class="order-total">Total: ₹${order.total_price.toFixed(2)}</p>
                    `;
                    ordersContainer.appendChild(orderDiv);
                });
            });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const total = parseFloat(document.getElementById('cart-total').textContent);
            if (total > 0) {
                fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ total_price: total })
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.success) {
                        fetchAndDisplayCart();
                    }
                });
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    const pageTitle = document.title;
    if (pageTitle.includes('Mens Jeans')) {
        fetchAndDisplayProducts('jeans', 'product-gallery');
    } else if (pageTitle.includes('Mens Shirts')) {
        fetchAndDisplayProducts('shirts', 'product-gallery');
    } else if (pageTitle.includes('Mens Trousers')) {
        fetchAndDisplayProducts('trousers', 'product-gallery');
    } else if (pageTitle.includes('Jackets')) {
        fetchAndDisplayProducts('jackets', 'product-gallery');
    } else if (pageTitle.includes('Footwear')) {
        fetchAndDisplayProducts('footwear', 'product-gallery');
    } else if (pageTitle.includes('Watches')) {
        fetchAndDisplayProducts('watches', 'product-gallery');
    } else if (pageTitle.includes('My Cart')) {
        fetchAndDisplayCart();
    } else if (pageTitle.includes('Wishlist')) {
        fetchAndDisplayWishlist();
    } else if (pageTitle.includes('My Orders')) {
        fetchAndDisplayOrders();
    }
});// This ensures the script runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    console.log('Main JavaScript file loaded successfully!');
    
    // Example: A simple alert when a button is clicked.
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Proceeding to checkout!');
            // You would add more complex logic here, like sending data to the server.
        });
    }
});