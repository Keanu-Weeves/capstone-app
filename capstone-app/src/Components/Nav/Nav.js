import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom'
import Logo from '../../Images/Logo.svg';
import hamburger from '../../Assets/hamburger_icon.svg';
import basket from '../../Assets/Basket.svg';
import './Nav.css'



const Nav = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const headerRef = useRef(null);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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

            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
            setPrevScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY, isMenuOpen]);

    const handleBasketClick = () => {
        navigate('/order');
        setIsMenuOpen(false);
    };

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