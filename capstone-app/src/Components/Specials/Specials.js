import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card.js';
import useFetchMeals from '../../Hooks/useFetchMeals.js';
import './Specials.css';

const AUTOPLAY_INTERVAL = 5000;

function Specials() {
  const { data: specials, loading, error } = useFetchMeals('Dessert', 6);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null); // carousel container managing hover
  const intervalRef = useRef(null); // store interval ID

  //Navigation
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % specials.length);
  };

  const gotToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + specials.length) % specials.length);
  };

  //Autoplay
  const startAutoplay = () => {
    if (specials && specials.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNextSlide();
      }, AUTOPLAY_INTERVAL);
    }
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  //useEffect for autoplay and cleanup

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, [specials]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', stopAutoplay);
      carouselElement.addEventListener('mouseleave', startAutoplay);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', stopAutoplay);
        carouselElement.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [specials]);

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
  //multiple cards
  const getVisibleSlides = () => {
    if (!specials || specials.length === 0) return [];
    const numSpecials = specials.length;
    return specials.map((meal, index) => {
        let status = '';
        if (index === currentSlide) {
            status = 'current';
        } else if (index === (currentSlide - 1 + numSpecials) % numSpecials) {
            status = 'prev';
        } else if (index === (currentSlide + 1) % numSpecials) {
            status = 'next';
        } else if (index === (currentSlide - 2 + numSpecials) % numSpecials) {
            // Optional: for an outer-prev if 5 cards visible
            status = 'prev-2';
        } else if (index === (currentSlide + 2) % numSpecials) {
            // Optional: for an outer-next if 5 cards visible
            status = 'next-2';
        } else {
            status = 'hidden'; // Cards far away or not currently visible
        }
        return { ...meal, status };
    });
};

const allCardsWithStatus = getVisibleSlides();

  return (
    <section className="specials-section">
      <h2>This Week's Specials</h2>
      <div className="carousel-container" ref={carouselRef}> {/*Slide and Navigation */}
        <button onClick={gotToPrevSlide} className='carousel-nav prev-btn' aria-label='Previous special'>
          &#10094;
        </button>

        <div className="carousel-slide-wrapper"> {/*Displays actual Card*/}
          {allCardsWithStatus.map((meal) => (
            <Card
              key={meal.idMeal}
              name={meal.strMeal}
              price={(Math.random() * 25).toFixed(2)}
              description={
                meal.strIngredient1 +
                (meal.strIngredient2 ? ', ' + meal.strIngredient2 : '') +
                (meal.strIngredient3 ? ', ' + meal.strIngredient3 : '') +
                (meal.strIngredient4 ? ', ' + meal.strIngredient4 : '') +
                (meal.strIngredient5 ? ', ' + meal.strIngredient5 : '') +
                (meal.strIngredient6 ? ', ' + meal.strIngredient6 : '')
              }
              image={meal.strMealThumb}
              className={`carousel-card ${meal.status}`}
            />
          ))}
        </div>

        <button onClick={goToNextSlide} className='carousel-nav next-btn'>
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default Specials;