import React from 'react';
import Nav from '../Components/Nav/Nav.js';
import Footer from '../Components/Footer/Footer.js';
import Login from '../Components/Login/Login.js';


function LoginPage() {
    return (
        <>
            <Nav />
            <Login />
            {/* <div className='coming-soon-card'>Coming Soon!</div> */}
            <Footer />
        </>
    );
}

export default LoginPage;