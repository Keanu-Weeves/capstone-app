import React from 'react';
import restaurantfoodImg from '../../Assets/restaurantfood.jpg';
import marioAdrianImg from '../../Assets/Mario and Adrian b.jpg';
import './About.css';

function About() {
    return (
        <section class="about-section">
            <div className="about-content-wrapper">
                <h2>Little Lemon</h2>
                <h3>Chicago</h3>
                <p>Little Lemon is a charming neighborhood bistro that serves 
                    simple food and classic cocktails in a lively but casual environment. 
                    We feature a locally-sourced menu with daily specials.</p>
            </div>
            <aside className='about-img-container'>
              <img src={marioAdrianImg} alt='Mario and Adrian' 
              className="about-img1" />
              <img src={restaurantfoodImg} alt='tasty appetizers' 
              className='about-img2' />
            </aside>
        </section>
    );
}

export default About;