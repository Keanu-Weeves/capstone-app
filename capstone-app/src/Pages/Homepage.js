import Nav from '../Components/Nav/Nav.js';
import Hero from '../Components/Hero/Hero.js';
import Specials from '../Components/Specials/Specials.js';
import Testimonials from '../Components/Testimonials/Testimonials.js';
import About from '../Components/About/About.js';
import Footer from '../Components/Footer/Footer.js';

function Homepage() {
    return (
        <>
            <Hero />
            <Specials />
            <Testimonials />
            <About />
            <Footer />
        </>
    );
}

export default Homepage;