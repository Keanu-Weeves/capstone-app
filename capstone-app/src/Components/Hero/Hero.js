import './Hero.css';

function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-content">
              <h1>Little Lemon</h1> <p>Chicago</p>
              <p>Lorem ipsum filler text...</p>
              <button>Reserve a table</button>
            </div>
            <div className="hero-image">
              <img src="hero-image-placeholder.png" alt="Little Lemon restaurant"></img>
            </div>
        </section>
    );
}

export default Hero;