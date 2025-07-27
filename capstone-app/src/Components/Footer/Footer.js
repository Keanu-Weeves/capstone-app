import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const socials = [
  {
    id: 1,
    icon: faFacebook,
    url: 'https://www.facebook.com',
    label: "Facebook"
  },
  {
    id: 2,
    icon: faXTwitter,
    url: 'https://www.x.com',
    label: "XTwitter"
  },
  {
    id: 3,
    icon: faInstagram,
    url: "https://www.instagram.com",
    label: "Instagram"
  }
]

function Footer() {
    return (
        <footer>
          <nav className='footer-nav'>
            <div className="quicklinks-container">
              <h4>Quick Links</h4>
              <ul className="doormat-nav-ul">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/order">Order Online</Link></li>
                <li><Link to="/reservations">Reservations</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            <div className="contact-container">
              <h4>Contact</h4>
              <ul className="contact-nav-ul">
                <li>123 Little Lemon Way</li>
                <li>(123) 456-789</li>
                <li>littlelemon@gmail.com</li>
              </ul>
            </div>
            <div className="socials-container">
              <h4>Follow Us!</h4>
              <ul>
                {socials.map((social) => (
                  <a
                  key={social.id}
                  href={social.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label + " link"}
                  >
                    <FontAwesomeIcon className='navIcons' color="white" icon={social.icon} size="2x" />
                  </a>
                ))}
              </ul>
            </div>
          </nav>
        </footer>
    );
}

export default Footer;