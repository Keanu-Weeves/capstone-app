import React from 'react';
import Menu from '../Components/Menu/Menu.js';

function MenuPage({ addToCart }) {
    return (
        <>
            <Menu addToCart={addToCart} />
        </>
    );
}

export default MenuPage;