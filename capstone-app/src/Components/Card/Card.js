import React from 'react';
import './Card.css';
import '../Menu/Menu.js';
import '../../App.js';

function Card({ name, price, description, image, className, onAddToCart }) {
    return (
        <article className={`specials-card ${className || ''}`}>
                <img src={image}
                 alt={name}
                 className="dish-img"
                 loading="lazy"></img>
                <h3>{name}</h3>
                <p className='price'>Price: ${price}</p>
                <p className='description'>{description}</p>
                <button
                className="add-to-cart-btn"
                onClick={onAddToCart}> Add to Cart
                </button>
              </article>
    );
}

export default Card;