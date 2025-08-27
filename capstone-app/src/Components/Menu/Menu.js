import React, { useState } from 'react';
import './Menu.css';
import useFetchCategories from '../../Hooks/useFetchCategories.js';
import useFetchCategoryMeals from '../../Hooks/useFetchCategoryMeals.js';
import Card from '../Card/Card.js';

function Menu({ addToCart }) {
    const { data: categories, loading: categoriesLoading } = useFetchCategories()
    const [selectedCategory, setSelectedCategory] = useState('Beef');
    const { data: meals, loading: mealsLoading } = useFetchCategoryMeals(selectedCategory);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMeal, setModalMeal] = useState(null);

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
                image={meal.strMealThumb}
                price={(Math.random() * 25).toFixed(2)}
                onClick={() => {
                  setModalMeal(meal);
                  setIsModalOpen(true);
                }}
              >
                <button
                className="add-to-cart-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    addToCart(meal);
                }}>
                    Add to Cart
                </button>
              </Card>
            ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && modalMeal && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => {
                setIsModalOpen(false);
                setModalMeal(null);
              }}
            >
              &times;
            </button>
            <Card
              name={modalMeal.strMeal}
              description="A delicious meal made with love."
              image={modalMeal.strMealThumb}
              price={(Math.random() * 25).toFixed(2)}
            />
          </div>
        </div>
      )}
    </main>
    );
}

export default Menu;