import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarComponent  from './components/Navbar.js';
import ProductContainer from './components/ProductContainer';
import CartModal from './components/CartModal';
import Checkout from './components/Checkout';

// App component is the main component of the application, handling routing and state management
function App() {
  const [products, setProducts] = useState([]); // State to store products
  const [cart, setCart] = useState([]); // State to store items in the cart
  const [show, setShow] = useState(false); // State to handle modal visibility
  
  // Fetch products from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== '[]') {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    
    if (existingProduct) {
      setCart(cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    } 
    else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Function to update the quantity of a product in the cart
  const updateCart = (productId, quantity) => {
    setCart(cart.map(item => item._id === productId ? { ...item, quantity } : item));
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  // Handlers for showing and closing the cart modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div className="App">
        <NavbarComponent handleShow={handleShow} cart={cart} />
        <Routes>
          <Route path="/" element={
            <>
              <ProductContainer products={products} addToCart={addToCart} />
              <CartModal show={show} handleClose={handleClose} cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
            </>
          } />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
