import './Hero.css';
import heroImg from '../../Assets/hero-img.jpg'
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const reserveClick = () => {
    navigate('/reservations');
  }
    return (
        <section className="hero-section">
            <div className="hero-content">
              <h1>Little Lemon</h1> <p className="hero-p1">Chicago</p>
              <p className='hero-p2'>We are a family owned Mediterranean restaurant, 
                focused on traditional recipes served with a modern twist.</p>
              <button className='hero-btn' onClick={reserveClick}>Reserve a table</button>
            </div>
            <aside className="hero-image">
              <img src={heroImg}
              className='hero-img'
              alt="Little Lemon restaurant"></img>
            </aside>
        </section>
    );
}

export default Hero;