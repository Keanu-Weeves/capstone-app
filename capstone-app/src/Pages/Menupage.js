import React from 'react';
import Nav from '../Components/Nav/Nav.js'
import Footer from '../Components/Footer/Footer.js';

function Menu() {
    return (
        <>
            <Nav />
            <div className='coming-soon-card'>Coming Soon!</div>
            <Footer />
        </>
    );
}

export default Menu;