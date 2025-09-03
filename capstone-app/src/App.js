import './App.css';
import React, { useState, useCallback } from 'react';
import Nav from './Components/Nav/Nav.js';
import Homepage from './Pages/Homepage.js';
import { Routes, Route } from 'react-router-dom';
import Reservations from './Pages/Reservations.js';
import Menupage from './Pages/Menupage.js'
import Aboutpage from './Pages/Aboutpage.js';
import Orderpage from './Pages/Orderpage.js';
import LoginPage from './Pages/LoginPage.js';
import Footer from './Components/Footer/Footer.js';
import CartDrawer from './Components/CartDrawer/CartDrawer.js';
import { generatePriceFromId } from './Utils/pricing.js';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (meal) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === meal.idMeal);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: meal.idMeal,
            name: meal.strMeal,
            price: parseFloat(generatePriceFromId(meal.idMeal)),
            quantity: 1,
            image: meal.strMealThumb,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => {
      if (!prev) setIsMenuOpen(false);
      return !prev;
    });
  }, []);

  const onCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      if(!prev) setIsCartOpen(false);
      return !prev;
    });
  }, []);

  const onCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  return (
    <>
      <Nav
       toggleMenu={toggleMenu}
       isMenuOpen={isMenuOpen}
       onCloseMenu={onCloseMenu}
       toggleCart={toggleCart}
       isCartOpen={isCartOpen}
       onCloseCart={onCloseCart}
      />
      <CartDrawer
       isCartOpen={isCartOpen}
       onCloseCart={onCloseCart}
       cartItems={cartItems}
       addToCart={addToCart}
       increaseQty={increaseQty}
       decreaseQty={decreaseQty}
      />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/menu" element={<Menupage addToCart={addToCart} />} />
          <Route path="/order" element={<Orderpage addToCart={addToCart} />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;