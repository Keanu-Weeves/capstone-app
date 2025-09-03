import React, { useState } from 'react';
import './Menu.css';
import useFetchCategories from '../../Hooks/useFetchCategories.js';
import useFetchCategoryMeals from '../../Hooks/useFetchCategoryMeals.js';
import Card from '../Card/Card.js';
import { generatePriceFromId } from '../../Utils/pricing.js';

function Menu({ addToCart }) {
    const { data: categories, loading: categoriesLoading } = useFetchCategories()
    const [selectedCategory, setSelectedCategory] = useState('Beef');
    const { data: meals, loading: mealsLoading } = useFetchCategoryMeals(selectedCategory);

    return(
        <main className="menu-page">
      {/* Category Filter */}
      {categoriesLoading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="category-bar">
          {categories.map((category) => (
            <button
              key={category.strCategory}
              className={`category-button ${selectedCategory === category.strCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.strCategory)}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      )}

      {/* Meal Grid */}
      {mealsLoading ? (
        <p>Loading meals...</p>
      ) : (
        <div className="meal-grid">
          {meals &&
            meals.slice(0, 12).map((meal) => (
            <Card
              key={meal.idMeal}
              name={meal.strMeal}
              description="A delicious meal made with love."
              image={meal.strMealThumb}
              price={generatePriceFromId(meal.idMeal)}
              onAddToCart={() =>
                addToCart(meal)
              }
            />
            ))}
        </div>
      )}
    </main>
    );
}

export default Menu;