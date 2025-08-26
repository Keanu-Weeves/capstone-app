import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../Images/Logo.svg';
import hamburger from '../../Assets/hamburger_icon.svg';
import basket from '../../Assets/Basket.svg';
import './Nav.css'



const Nav = ({
    isMenuOpen, toggleMenu, onCloseMenu,
    isCartOpen, toggleCart, onCloseCart }) => {
    const location = useLocation();
    const headerRef = useRef(null);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        onCloseMenu();
        onCloseCart();
    }, [location.pathname, onCloseMenu, onCloseCart])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerElement = headerRef.current;

            if (!headerElement) {
                return;
            }

            if (currentScrollY > prevScrollY && currentScrollY > headerElement.offsetHeight) {
                setIsVisible(false);
            } else if (currentScrollY < prevScrollY || currentScrollY <= headerElement.offsetHeight) {
                setIsVisible(true);
            }
            setPrevScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY]);

    const navStyle = {
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.3s ease-in-out',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    };

    return (
        <header ref={headerRef} style={navStyle}>
            <nav>
                <button
                className='basket-icon'
                onClick={toggleCart}
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
                    <li><Link to='/home' onClick={onCloseMenu}>Home</Link></li>
                    <li><Link to='/about' onClick={onCloseMenu}>About</Link></li>
                    <li><Link to='/menu' onClick={onCloseMenu}>Menu</Link></li>
                    <li><Link to='/order' onClick={onCloseMenu}>Order Online</Link></li>
                    <li><Link to='/reservations' onClick={onCloseMenu}>Reservations</Link></li>
                    <li><Link to='/login' onClick={onCloseMenu}>Login</Link></li>
                </ul>
            </nav>
            <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`} onClick={onCloseMenu} />

        </header>
    );
}

export default Nav;