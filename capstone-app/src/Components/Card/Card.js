import React from 'react';
import './Card.css';

function Card({ name, price, description, image, className }) {
    return (
        <article className={`specials-card ${className || ''}`}>
                <img src={image} alt={name} className="dish-img"></img>
                <h3>{name}</h3>
                <p className='price'>Price: ${price}</p>
                <p className='description'>{description}</p>
                <button className='delivery-btn'>Order a Delivery</button>
              </article>
    );
}

export default Card;