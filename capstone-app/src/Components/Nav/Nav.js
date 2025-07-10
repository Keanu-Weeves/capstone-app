import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Logo from '../../Images/Logo.svg';
import hamburger from '../../Assets/hamburger_icon.svg';
import basket from '../../Assets/Basket.svg';
import './Nav.css'

function Nav() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleBasketClick = () => {
        navigate('/order');
        setIsMenuOpen(false);
    }

    return (
        <header>
            <nav>
                <button
                className='basket-icon'
                onClick={handleBasketClick}
                >
                    <img src={basket} alt='Cart Items' />
                </button>
                <img src={Logo} alt='Logo' className='logo' />
                <button
                className="hamburger-menu"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-list"
                >
                    <img src={hamburger} alt="Navigation Menu Icon" />
                </button>
                <ul id="mobile-nav-list" className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><a href='/home' onClick={toggleMenu}>Home</a></li>
                    <li><a href='/about' onClick={toggleMenu}>About</a></li>
                    <li><a href='/menu'>Menu</a></li>
                    <li><a href='/order' onClick={toggleMenu}>Order Online</a></li>
                    <li><a href='/reservations' onClick={toggleMenu}>Reservations</a></li>
                    <li><a href='/login' onClick={toggleMenu}>Login</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;