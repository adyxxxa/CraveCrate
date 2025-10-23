import React, { useState } from 'react';

function App() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [email, setEmail] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How fresh are the treats?",
      answer: "All our treats are baked fresh daily in the morning using premium ingredients. We ensure maximum freshness by delivering them within 24 hours of baking."
    },
    {
      id: 2,
      question: "Do you deliver nationwide?",
      answer: "Yes! We currently deliver to all major cities across the country. We're constantly expanding our delivery network to reach more customers."
    },
    {
      id: 3,
      question: "Can I gift a box?",
      answer: "Absolutely! Our boxes are designed to be perfect gifts. You can add a personalized message and we'll include it with your order."
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Croissants",
      emoji: "🥐",
      description: "Buttery, flaky croissants made with French techniques",
      products: [
        { id: 101, name: "Classic Butter Croissant", price: 199, emoji: "🥐" },
        { id: 102, name: "Chocolate Croissant", price: 249, emoji: "🥐" },
        { id: 103, name: "Almond Croissant", price: 299, emoji: "🥐" },
        { id: 104, name: "Ham & Cheese Croissant", price: 349, emoji: "🥐" }
      ]
    },
    {
      id: 2,
      name: "Artisan Cakes",
      emoji: "🍰",
      description: "Handcrafted cakes with premium ingredients",
      products: [
        { id: 201, name: "Chocolate Fudge Cake", price: 1249, emoji: "🍰" },
        { id: 202, name: "Vanilla Bean Cake", price: 1149, emoji: "🍰" },
        { id: 203, name: "Red Velvet Cake", price: 1349, emoji: "🍰" },
        { id: 204, name: "Carrot Cake", price: 1199, emoji: "🍰" }
      ]
    },
    {
      id: 3,
      name: "Seasonal Pies",
      emoji: "🥧",
      description: "Fresh-baked pies with seasonal fruits",
      products: [
        { id: 301, name: "Apple Pie", price: 949, emoji: "🥧" },
        { id: 302, name: "Cherry Pie", price: 999, emoji: "🥧" },
        { id: 303, name: "Pumpkin Pie", price: 899, emoji: "🥧" },
        { id: 304, name: "Blueberry Pie", price: 1049, emoji: "🥧" }
      ]
    },
    {
      id: 4,
      name: "Gourmet Cookies",
      emoji: "🍪",
      description: "Premium cookies with unique flavor combinations",
      products: [
        { id: 401, name: "Chocolate Chip Cookies", price: 749, emoji: "🍪" },
        { id: 402, name: "Oatmeal Raisin Cookies", price: 699, emoji: "🍪" },
        { id: 403, name: "Macadamia Nut Cookies", price: 849, emoji: "🍪" },
        { id: 404, name: "Double Chocolate Cookies", price: 799, emoji: "🍪" }
      ]
    },
    {
      id: 5,
      name: "Cupcakes",
      emoji: "🧁",
      description: "Delicate cupcakes with artisanal frosting",
      products: [
        { id: 501, name: "Vanilla Cupcakes", price: 849, emoji: "🧁" },
        { id: 502, name: "Chocolate Cupcakes", price: 899, emoji: "🧁" },
        { id: 503, name: "Strawberry Cupcakes", price: 949, emoji: "🧁" },
        { id: 504, name: "Red Velvet Cupcakes", price: 999, emoji: "🧁" }
      ]
    },
    {
      id: 6,
      name: "Artisan Breads",
      emoji: "🍞",
      description: "Fresh-baked breads using traditional methods",
      products: [
        { id: 601, name: "Sourdough Bread", price: 599, emoji: "🍞" },
        { id: 602, name: "Whole Wheat Bread", price: 549, emoji: "🍞" },
        { id: 603, name: "French Baguette", price: 449, emoji: "🍞" },
        { id: 604, name: "Cinnamon Raisin Bread", price: 649, emoji: "🍞" }
      ]
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}! We'll send you exclusive offers and updates.`);
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const handleShopNow = () => {
    scrollToSection('products');
  };

  const handleViewSubscription = () => {
    alert('Subscription plans coming soon! Sign up for our email list to be notified when subscriptions are available.');
  };

  const handleGetStarted = () => {
    scrollToSection('email-signup');
  };

  const handleHeaderCTA = () => {
    alert('Use code SAVE10 at checkout for 10% off your first order!');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    if (!appliedDiscount) return 0;
    const subtotal = getSubtotal();
    return subtotal * 0.10; // 10% discount
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    return subtotal - discount;
  };

  const applyDiscountCode = () => {
    if (discountCode.toLowerCase() === 'save10' || discountCode.toLowerCase() === 'crave10') {
      setAppliedDiscount(true);
      alert('Discount code applied! 10% off your order!');
    } else {
      alert('Invalid discount code. Try "SAVE10" or "CRAVE10"');
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const total = getTotalPrice();
    
    alert(`Checkout complete!\n\nSubtotal: ₱${subtotal.toFixed(0)}\nDiscount (10%): -₱${discount.toFixed(0)}\nTotal: ₱${total.toFixed(0)}\n\nThank you for your order!`);
    setCart([]);
    setShowCart(false);
  };

  const openCategoryModal = (category) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1 className="header-brand" onClick={() => scrollToSection('hero')} style={{cursor: 'pointer'}}>CRAVE CRATE</h1>
        <nav className="header-nav">
          <a href="#products" className="nav-link" onClick={(e) => handleNavClick(e, 'products')}>Shop</a>
          <a href="#subscription" className="nav-link" onClick={(e) => handleNavClick(e, 'email-signup')}>Subscription</a>
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'features')}>About</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'footer')}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="cart-icon" onClick={() => setShowCart(true)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
            </svg>
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>
          <button className="header-cta" onClick={handleHeaderCTA}>Get 10% off your order</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line1">One crate to rule</span>
            <span className="hero-title-line2">all cravings</span>
          </h1>
          <p className="hero-description">Freshly baked, beautifully packaged. Delivered to you.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary hero-btn-primary" onClick={handleShopNow}>
              SHOP NOW
              <svg className="btn-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn btn-secondary hero-btn-secondary" onClick={handleViewSubscription}>VIEW SUBSCRIPTION</button>
          </div>
        </div>
      </section>

      {/* Why Choose Crave Crate Section */}
      <section className="section features" id="features">
        <h2 className="section-title">Why Choose Crave Crate?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-outline">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <h3>Freshly Baked Daily</h3>
            <p>Made fresh every morning with premium ingredients</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-outline">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Gift-Ready Packaging</h3>
            <p>Beautiful Presentation for any occasion</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-outline">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <path d="M3.27 6.96L12 12.01l8.73-5.05"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Curated Premium Boxes</h3>
            <p>Hand-Selected Treats</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-outline">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16,8 20,8 23,11 23,16 16,16"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h3>Lightning Fast Delivery</h3>
            <p>Same-day Delivery available in select areas</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section products" id="products">
        <h2 className="section-title">Our Artisanal Pastries</h2>
        <div className="products-grid">
          {categories.map((category) => (
            <div key={category.id} className="product-card category-card" onClick={() => openCategoryModal(category)}>
              <div className="product-image">
                <div className="product-placeholder">{category.emoji}</div>
              </div>
              <div className="product-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="category-info">
                  <span className="product-count">{category.products.length} varieties</span>
                  <button className="btn btn-primary product-btn">
                    View Products
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="section testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="star-rating">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p className="testimonial-quote">"The quality is absolutely incredible! Every bite is pure heaven."</p>
            <div className="testimonial-footer">
              <svg className="heart-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span className="customer-name">Sarah Jones</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="star-rating">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p className="testimonial-quote">"Perfect for gifting. The packaging is so beautiful and the taste is amazing."</p>
            <div className="testimonial-footer">
              <svg className="heart-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span className="customer-name">Mike Chen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Satisfy Your Cravings Section */}
      <section className="email-signup" id="email-signup">
        <div className="email-signup-content">
          <h2>Ready To Satisfy Your Cravings?</h2>
          <form className="email-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-white">Get Started</button>
          </form>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section faqs" id="faqs">
        <h2 className="section-title">FAQs</h2>
        <div className="faqs-container">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="faq-arrow">
                  {openFAQ === faq.id ? '▼' : '►'}
                </span>
                <span className="faq-text">{faq.question}</span>
              </button>
              {openFAQ === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 onClick={() => scrollToSection('hero')} style={{cursor: 'pointer'}}>CRAVE CRATE</h2>
            <p>Delivering happiness,</p>
            <p>One Crate At a Time</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Shop</h3>
              <p onClick={() => scrollToSection('products')} style={{cursor: 'pointer'}}>All Products</p>
              <p onClick={handleViewSubscription} style={{cursor: 'pointer'}}>Subscriptions</p>
              <p onClick={() => alert('Gift cards coming soon!')} style={{cursor: 'pointer'}}>Gift Cards</p>
              <p onClick={() => alert('Corporate gifts available! Contact us for bulk orders.')} style={{cursor: 'pointer'}}>Corporate Gifts</p>
            </div>
            
            <div className="footer-column">
              <h3>Support</h3>
              <p onClick={() => scrollToSection('faqs')} style={{cursor: 'pointer'}}>FAQ</p>
              <p onClick={() => alert('Contact us at hello@cravecrate.com or call (555) 123-4567')} style={{cursor: 'pointer'}}>Contact Us</p>
              <p onClick={() => alert('Free shipping on orders over $50! Same-day delivery available in select areas.')} style={{cursor: 'pointer'}}>Shipping Info</p>
              <p onClick={() => alert('30-day return policy for unopened items. Contact us for returns.')} style={{cursor: 'pointer'}}>Returns</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div>
                <h2>Shopping Cart</h2>
                {cart.length > 0 && appliedDiscount && (
                  <div className="discount-badge">
                    🎉 10% Discount Applied!
                  </div>
                )}
              </div>
              <button className="cart-close" onClick={() => setShowCart(false)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Add some delicious pastries to get started!</p>
                  <button className="btn btn-primary" onClick={() => {
                    setShowCart(false);
                    scrollToSection('products');
                  }}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                          <span className="cart-item-emoji">{item.emoji}</span>
                        </div>
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>₱{item.price.toFixed(0)} each</p>
                        </div>
                        <div className="cart-item-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-item-total">
                          ₱{(item.price * item.quantity).toFixed(0)}
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cart-summary">
                    {!appliedDiscount && (
                      <div className="discount-code-section">
                        <div className="discount-code-input">
                          <input
                            type="text"
                            placeholder="Enter discount code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="form-input discount-input"
                          />
                          <button 
                            className="btn btn-secondary apply-discount-btn"
                            onClick={applyDiscountCode}
                          >
                            Apply
                          </button>
                        </div>
                        <p className="discount-hint">Try "SAVE10" or "CRAVE10" for 10% off!</p>
                      </div>
                    )}
                    
                    <div className="cart-total">
                      <div className="cart-total-line">
                        <span>Subtotal:</span>
                        <span>₱{getSubtotal().toFixed(0)}</span>
                      </div>
                      {appliedDiscount && (
                        <div className="cart-total-line">
                          <span>Discount (10%):</span>
                          <span className="discount-amount">-₱{getDiscountAmount().toFixed(0)}</span>
                        </div>
                      )}
                      <div className="cart-total-line">
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="cart-total-line cart-total-final">
                        <span>Total:</span>
                        <span>₱{getTotalPrice().toFixed(0)}</span>
                      </div>
                    </div>
                    
                    <div className="cart-actions">
                      <button className="btn btn-secondary" onClick={() => setShowCart(false)}>
                        Continue Shopping
                      </button>
                      <button className="btn btn-primary" onClick={checkout}>
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && selectedCategory && (
        <div className="cart-overlay" onClick={closeCategoryModal}>
          <div className="category-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>{selectedCategory.name}</h2>
              <button className="cart-close" onClick={closeCategoryModal}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="cart-content">
              <div className="category-description">
                <div className="category-icon">{selectedCategory.emoji}</div>
                <p>{selectedCategory.description}</p>
              </div>
              
              <div className="category-products">
                {selectedCategory.products.map((product) => (
                  <div key={product.id} className="category-product-item">
                    <div className="category-product-image">
                      <span className="category-product-emoji">{product.emoji}</span>
                    </div>
                    <div className="category-product-info">
                      <h4>{product.name}</h4>
                      <p>Freshly baked with premium ingredients</p>
                    </div>
                    <div className="category-product-price">
                      ₱{product.price.toFixed(0)}
                    </div>
                    <button 
                      className="btn btn-primary category-add-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
