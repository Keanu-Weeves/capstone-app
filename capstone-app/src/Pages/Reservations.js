import React from 'react';
import TableForm from '../Components/TableForm/TableForm.js';

const h2Style = {
    marginLeft: '.5em',
    marginTop: '.5em'
}

function Reservations() {
    return(
        <>
            <h1 className="reserve-h1" style={h2Style}>Reserve A Table</h1>
            <TableForm />
        </>
    )
}

export default Reservations;