import React from 'react';
import Nav from '../Components/Nav/Nav.js'
import TableForm from '../Components/TableForm/TableForm.js';
import Footer from '../Components/Footer/Footer.js';

const h2Style = {
    marginLeft: '.5em',
    marginTop: '.5em'
}

function Reservations() {
    return(
        <>
            <Nav />
            <h1 className="reserve-h1" style={h2Style}>Reserve A Table</h1>
            <TableForm />
            <Footer />
        </>
    )
}

export default Reservations;