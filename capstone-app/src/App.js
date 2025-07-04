import './App.css';
import Logo from './Images/Logo.svg';

function App() {
  return (
    <>
      <body>
        <header>
          <nav>
            <img src={Logo} alt='Logo'></img>
            <ul>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>About</a></li>
              <li><a href='#'>Menu/Order Online</a></li>
              <li><a href='#'>Reservations</a></li>
              <li><a href='#'>Login</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section class="hero-section">
            <div class="hero-content">
              <h1>Little Lemon</h1> <p>Chicago</p>
              <p>Lorem ipsum filler text...</p>
              <button>Reserve a table</button>
            </div>
            <div class="hero-image">
              <img src="hero-image-placeholder.png" alt="Little Lemon restaurant image"></img>
            </div>
          </section>
          <section class="specials-section">
            <h2>Specials</h2> <button>Online Menu</button> <div class="cards-container">
              <article class="special-card">
                <img src="dish1-placeholder.png" alt="dish 1"></img>
                <h3>Dish 1</h3>
                <p>Price: $XX.XX</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <button>Order a Delivery</button>
              </article>
              <article class="special-card">
                <img src="dish2-placeholder.png" alt="dish 2"></img>
                <h3>Dish 2</h3>
                <p>Price: $XX.XX</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <button>Order a Delivery</button>
              </article>
              <article class="special-card">
                <img src="dish3-placeholder.png" alt="dish 3"></img>
                <h3>Dish 3</h3>
                <p>Price: $XX.XX</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <button>Order a Delivery</button>
              </article>
            </div>
          </section>
          <section class="testimonials-section">
            <article class="testimonial-card">
              <img src="user-placeholder.png" alt="image of user"></img>
              <h3>Name</h3>
              <p>User comment text here</p>
            </article>
            <article class="testimonial-card">
              <img src="user-placeholder.png" alt="image of user"></img>
              <h3>Name</h3>
              <p>User comment text here</p>
            </article>
            <article class="testimonial-card">
              <img src="user-placeholder.png" alt="image of user"></img>
              <h3>Name</h3>
              <p>User comment text here</p>
            </article>
            <article class="testimonial-card">
              <img src="user-placeholder.png" alt="image of user"></img>
              <h3>Name</h3>
              <p>User comment text here</p>
            </article>
          </section>
          <section class="about-section">
            <h2>Little Lemon</h2>
            <h3>Chicago</h3>
            <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <aside>
              <img src="placeholder.png"></img>
              <img src="placeholder.png"></img>
            </aside>
          </section>
        </main>
        <footer>
          <img src="logo-placeholder.png" alt="little lemon logo"></img>
          <nav>
            <ul class="doormat-nav">Doormat Navigation
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Menu/Order Online</a></li>
              <li><a href="#">Reservations</a></li>
              <li><a href="#">Login</a></li>
            </ul>
            <ul class="contact">Contact
              <li>Address</li>
              <li>Phone</li>
              <li>Email</li>
            </ul>
            <ul>
              Social Media
              <li>Facebook</li>
              <li>X</li>
              <li>IG</li>
            </ul>
          </nav>
        </footer>
      </body>  
    </>
  );
}

export default App;
