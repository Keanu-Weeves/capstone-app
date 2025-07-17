import React from 'react';
import './Card.css';

function Card({ name, price, description, image }) {
    return (
        <article class="specials-card">
                <img src={image} alt={name}></img>
                <h3>{name}</h3>
                <p className='price'>Price: ${price}</p>
                <p className='description'>{description}</p>
                <button className='delivery-btn'>Order a Delivery</button>
              </article>
    );
}

export default Card;