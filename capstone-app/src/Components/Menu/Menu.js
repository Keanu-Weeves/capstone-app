import React, { useState } from 'react';
import './Menu.css';
import '../../Hooks/useFetchCategoryMeals.js';
import '../../Hooks/useFetchCategories.js';
import useFetchCategories from '../../Hooks/useFetchCategories.js';
import useFetchCategoryMeals from '../../Hooks/useFetchCategoryMeals.js';
import Card from '../Card/Card.js';

function Menu() {
    const { data: categories, loading: categoriesLoading } = useFetchCategories()
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data: meals, loading: mealsLoading } = useFetchCategoryMeals(selectedCategory);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMeal, setModalMeal] = useState(null);

    const handleCategoryClick = (categoryName) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryName);
        }
    };
    return(
        <>
            <main>
                {categoriesLoading ? (
                    <p>Loading categories...</p>
                ) : (
                    <ul className="category-list">
                        {categories.map((category) => (
                            <li key={category.idCategory}>
                                <button
                                onClick={() => handleCategoryClick(category.strCategory)}
                                className={`category-button ${selectedCategory === category.strCategory ? 'active' : ''}`}
                                >
                                    {category.strCategory}
                                </button>
                                {selectedCategory === category.strCategory && (
                                    <ul className="meal-sublist">
                                        {mealsLoading ? (
                                            <p>Loading meals...</p>
                                        ) : (
                                            meals && meals.slice(0, 6).map((meal) => (
                                                <li key={meal.idMeal}
                                                onClick={() => {
                                                    setModalMeal(meal);
                                                    setIsModalOpen(true);
                                                }}>
                                                    <h3>{meal.strMeal}</h3>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            {isModalOpen && modalMeal && (
                <div className='modal-overlay'>
                    <div className="modal-content">
                        <button className="modal-close"
                        onClick={() => {
                            setIsModalOpen(false);
                            setModalMeal(null);
                        }}>
                            &times;
                        </button>
                        <Card
                        name={modalMeal.strMeal}
                        description={
                            modalMeal.strIngredient1 +
                            (modalMeal.strIngredient2 ? ', ' + modalMeal.strIngredient2 : '') +
                            (modalMeal.strIngredient3 ? ', ' + modalMeal.strIngredient3 : '') +
                            (modalMeal.strIngredient4 ? ', ' + modalMeal.strIngredient4 : '') +
                            (modalMeal.strIngredient5 ? ', ' + modalMeal.strIngredient5 : '') +
                            (modalMeal.strIngredient6 ? ', ' + modalMeal.strIngredient6 : '')
                        }
                        image={modalMeal.strMealThumb}
                        price={(Math.random() * 25).toFixed(2)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;