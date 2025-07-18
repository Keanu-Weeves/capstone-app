import React, { useState } from 'react';
import Card from '../Card/Card.js';
import useFetchMeals from '../../Hooks/useFetchMeals.js';
import './Specials.css';

function Specials() {
  const { data: specials, loading, error } = useFetchMeals('Dessert', 3);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % specials.length);
  };

  const gotToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + specials.length) % specials.length);
  };

  if (loading) {
    return <section className="specials-section">
      <h2>Loading Specials</h2>
      </section>
  }
  if (error) {
    return <section className="specials-section">
      <h2>Error loading specials: {error.message}</h2>
      </section>
  }
  if (!specials || specials.length === 0) {
    return <section className="specials-section">
      <h2>No specials today.</h2>
      </section>
  }
    const displayedCard = specials[currentSlide];
    return (
      <section className="specials-section">
        <h2>This Week's Specials</h2>
        <div className="carousel-container"> {/*Slide and Navigation */}
          <button onClick={gotToPrevSlide} className='carousel-nav prev-btn'>
            &#10094;
          </button>

          <div className="carousel-slide-wrapper"> {/*Displays actual Card*/}
            {displayedCard && (
              <Card
                key={displayedCard.idMeal}
                name={displayedCard.strMeal}
                price={(Math.random() * 25).toFixed(2)}
                description={displayedCard.strInstructions.substring(0, 100) + '...'}
                image={displayedCard.strMealThumb}
              />
            )}
          </div>

          <button onClick={goToNextSlide} className='carousel-nav next-btn'>
            &#10095;
          </button>
        </div>
      </section>
    );
}

export default Specials;