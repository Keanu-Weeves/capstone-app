import React from 'react';
import Card from '../Card/Card.js';
import useFetchMeals from '../../Hooks/useFetchMeals.js';
import './Specials.css';

function Specials() {
  const { data: specials, loading, error } = useFetchMeals('Dessert', 3);

  if (loading) {
    return <section className="specials-section">
      <h2>Loading Specials</h2>
      </section>
  }
  if (error) {
    return <section className="specials-section">
      <h2>Error loading specials</h2>
      </section>
  }
  if (!specials || specials.length === 0) {
    return <section className="specials-section">
      <h2>No specials today</h2>
      </section>
  }

    return (
      <section className="specials-section">
        <h2>This Week's Specials</h2>
        <div className="specials-container">
          {specials.map(meal => (
            <Card
              key={meal.idMeal}
              name={meal.strMeal}
              price={(Math.random() * 25).toFixed(2)}
              description={meal.strInstructions.substring(0, 100) + '...'}
              image={meal.strMealThumb}
            />
          ))}
        </div>
      </section>
    );
}

export default Specials;