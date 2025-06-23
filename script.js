document.addEventListener('DOMContentLoaded', function() {
    // Menu items data
    const menuItems = [
        {
            id: 1,
            title: "Margherita Pizza",
            category: "food",
            price: 12.99,
            img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Classic pizza with tomato sauce, mozzarella, and basil."
        },
        {
            id: 2,
            title: "Chicken Burger",
            category: "food",
            price: 9.99,
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Juicy chicken patty with lettuce, tomato, and special sauce."
        },
        {
            id: 3,
            title: "Caesar Salad",
            category: "food",
            price: 8.99,
            img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan."
        },
        {
            id: 4,
            title: "Pasta Carbonara",
            category: "food",
            price: 11.99,
            img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Creamy pasta with eggs, cheese, pancetta, and black pepper."
        },
        {
            id: 5,
            title: "Iced Coffee",
            category: "beverage",
            price: 3.99,
            img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Chilled coffee with milk and sweetener of your choice."
        },
        {
            id: 6,
            title: "Fresh Orange Juice",
            category: "beverage",
            price: 4.49,
            img: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Freshly squeezed orange juice, packed with vitamin C."
        },
        {
            id: 7,
            title: "Green Smoothie",
            category: "beverage",
            price: 5.99,
            img: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Healthy blend of spinach, banana, apple, and almond milk."
        },
        {
            id: 8,
            title: "Chocolate Cake",
            category: "dessert",
            price: 6.99,
            img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Rich chocolate cake with creamy frosting."
        },
        {
            id: 9,
            title: "Vanilla Ice Cream",
            category: "dessert",
            price: 4.99,
            img: "https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Classic vanilla ice cream with a smooth texture."
        },
        {
            id: 10,
            title: "Fruit Salad",
            category: "dessert",
            price: 5.49,
            img: "https://images.unsplash.com/photo-1564093497595-593ca31633e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            desc: "Seasonal fresh fruits mixed together."
        }
    ];

    // DOM Elements
    const menuItemsContainer = document.getElementById('menu-items');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.querySelector('.checkout-modal');
    const closeCheckout = document.querySelector('.close-checkout');
    const checkoutForm = document.querySelector('.checkout-form');

    // Shopping cart
    let cart = [];

    // Display menu items
    function displayMenuItems(items) {
        menuItemsContainer.innerHTML = items.map(item => `
            <div class="menu-item" data-id="${item.id}" data-category="${item.category}">
                <img src="${item.img}" alt="${item.title}" class="item-img">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <div class="item-footer">
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Filter menu items
    function filterMenu() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;
                if (filter === 'all') {
                    displayMenuItems(menuItems);
                } else {
                    const filteredItems = menuItems.filter(item => item.category === filter);
                    displayMenuItems(filteredItems);
                }
            });
        });
    }

    // Add item to cart
    function addToCart(e) {
        const menuItem = e.target.closest('.menu-item');
        const itemId = parseInt(menuItem.dataset.id);
        const item = menuItems.find(item => item.id === itemId);

        // Check if item already in cart
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        updateCart();
    }

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <i class="fas fa-trash remove-item"></i>
            </div>
        `).join('');

        // Update cart total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);

        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Decrease item quantity
    function decreaseQuantity(e) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = parseInt(cartItem.dataset.id);
        const item = cart.find(item => item.id === itemId);

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== itemId);
        }

        updateCart();
    }

    // Increase item quantity
    function increaseQuantity(e) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = parseInt(cartItem.dataset.id);
        const item = cart.find(item => item.id === itemId);

        item.quantity += 1;
        updateCart();
    }

    // Remove item from cart
    function removeItem(e) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = parseInt(cartItem.dataset.id);
        
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    }

    // Toggle cart modal
    function toggleCart() {
        cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
    }

    // Toggle checkout modal
    function toggleCheckout() {
        checkoutModal.style.display = checkoutModal.style.display === 'flex' ? 'none' : 'flex';
        if (checkoutModal.style.display === 'flex') {
            cartModal.style.display = 'none';
        }
    }

    // Handle checkout form submission
    function handleCheckout(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // In a real application, you would send this data to a server
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            payment: document.getElementById('payment').value,
            items: cart,
            total: parseFloat(cartTotal.textContent)
        };

        console.log('Order submitted:', formData);
        
        // Show confirmation
        alert(`Thank you for your order! Your total is $${formData.total.toFixed(2)}. Your food will be delivered soon.`);
        
        // Reset cart and close modals
        cart = [];
        updateCart();
        checkoutModal.style.display = 'none';
        checkoutForm.reset();
    }

    // Initialize the app
    function init() {
        displayMenuItems(menuItems);
        filterMenu();

        // Event listeners
        cartIcon.addEventListener('click', toggleCart);
        closeCart.addEventListener('click', toggleCart);
        checkoutBtn.addEventListener('click', toggleCheckout);
        closeCheckout.addEventListener('click', toggleCheckout);
        checkoutForm.addEventListener('submit', handleCheckout);

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                toggleCart();
            }
            if (e.target === checkoutModal) {
                toggleCheckout();
            }
        });
    }

    init();
});