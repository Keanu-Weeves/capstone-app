import Hero from '../Components/Hero/Hero.js';
import Specials from '../Components/Specials/Specials.js';
import Testimonials from '../Components/Testimonials/Testimonials.js';
import About from '../Components/About/About.js';

function Homepage() {
    return (
        <>
            <Hero />
            <Specials />
            <Testimonials />
            <About />
        </>
    );
}

export default Homepage;