import React, { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal.js';
import './TableForm.css';
import { fetchAPI, submitAPI } from '../../Utils/api.js';

function TableForm() {
    const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
    };

    const creatDateAtMidnight = (dateString) => {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const todayString = getFormattedDate(new Date());

    // console.log('TableForm renders');
    const [formData, setFormData] = useState(() => {
        const initialState = {
        resDate: '',
        resTime: '',
        guests: '4',
        occasion: 'birthday',
        firstName:'',
        lastName: '',
        email: '',
        phone: '',
        seatingPref: 'indoor',
        comments: '',
        subscribe: false,
    };
    // console.log('Initial formData state:', initialState);
    return initialState;
    });

    const [availableTimes, setAvailableTimes] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);




    useEffect(() => {
        const initialDateForApi = creatDateAtMidnight(todayString);
        const initialTimes = fetchAPI(initialDateForApi);
        console.log("Initial times fetched for today (standardized):", initialTimes);
        setAvailableTimes(initialTimes);

        setFormData(prevData => {
            if (!prevData.resDate) {
                return {
                    ...prevData,
                    resDate: todayString,
                    resTime: initialTimes[0] || ''
                };
            }
            return prevData;
        });
    }, [todayString]);

    useEffect(() => {
        if (formData.resDate) {
            const selectedDateForApi = creatDateAtMidnight(formData.resDate);
            const timesForSelectedDate = fetchAPI(selectedDateForApi);
            setAvailableTimes(timesForSelectedDate);
            console.log("Times fetched for selected date (standardized):", formData.resDate, timesForSelectedDate);
            if (!timesForSelectedDate.includes(formData.resTime)) {
                setFormData(prevData => ({
                    ...prevData,
                    resTime: timesForSelectedDate[0] || ''
                }));
            }
        }
    }, [formData.resDate, formData.resTime])



    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        setFormData(prevData => {
            const newValue = type === 'checkbox' ? checked : value;
            const updatedData = {
                ...prevData,
                [id]: newValue,
            };
            // console.log(`Updating ${id} to:`, newValue, 'New formData:', updatedData);
            return updatedData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form Submitted:', formData)
        // console.log('Showing modal:', showConfirmModal)
        const submissionResult = await submitAPI(formData);

        if (submissionResult) {
            setShowConfirmModal(true);
        } else {
            alert('Reservation failed. Please try again or contact us directly.')
        }
    };

    const handleConfirmReservation = () => {
        setShowConfirmModal(false);
        setFormData({
            resDate: todayString,
            resTime: availableTimes[0] || '',
            guests: '4',
            occasion: 'birthday',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            seatingPref: 'indoor',
            comments: '',
            subscribe: false,
        });
    }
    // console.log('Current state of formData (after render):', formData);

    const handleCancelReservation = () => {
        console.log('Reservation Cancelled');
        setShowConfirmModal(false)
    }
    console.log("Current availableTimes state:", availableTimes);
    return(
        <section className="form-section">
            <h2>Your Reservation Details</h2>
            <form className="form-container" onSubmit={handleSubmit} method="post">
                <div className="form-group">
                    <label htmlFor='resDate'>Date</label>
                    <input
                    key={formData.resDate}
                    type="date"
                    id='resDate'
                    required
                    value={formData.resDate}
                    onChange={handleChange}
                    min={todayString} />
                </div>
                <div className="form-group">
                    <label htmlFor="resTime">Time</label>
                    <select
                    key={formData.resTime}
                    type="time"
                    id='resTime'
                    required
                    value={formData.resTime}
                    onChange={handleChange}>
                        {availableTimes.length > 0 ? (
                            availableTimes.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))
                    ) : (
                        <option value="">No times available for this day</option>
                    )}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Number of Guests</label>
                    <select id='guests' required value={formData.guests} onChange={handleChange}>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='occasion'>Occasion</label>
                    <select id='occasion' defaultValue='birthday' value={formData.occasion} onChange={handleChange}>
                        <option value='birthday'>Birthday</option>
                        <option value='anniversary'>Anniversary</option>
                        <option value='engagement'>Engagement</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='firstName'>First Name</label>
                    <input type="text" id='firstName' required value={formData.firstName} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" id="lastName" required value={formData.lastName} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" required value={formData.email} onChange={handleChange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input type="tel" id="phone" required value={formData.phone} onChange={handleChange}></input>
                </div>
                <fieldset className="form-group">
                    <legend>Seating Preferences</legend>
                    <input type="radio" id="indoor" name="seatingPref" value="indoor" checked={formData.seatingPref === 'indoor'} onChange={handleChange}></input>
                    <label htmlFor='indoor'>Indoor</label>
                    <input type="radio" id="outdoor" name="seatingPref" value="outdoor" checked={formData.seatingPref === 'outdoor'} onChange={handleChange}></input>
                    <label htmlFor='outdoor'>Outdoor</label>
                    <input type="radio" id="noPref" name="seatingPref" value="no-preference" checked={formData.seatingPref === 'no-preference'} onChange={handleChange}></input>
                    <label htmlFor='no-pref'>No Preference</label>
                </fieldset>
                <div className="form-group">
                    <label htmlFor='comments'>Comments (optional)</label>
                    <textarea type="text" id='comments' rows='4' value={formData.comments} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <input type="checkbox" id="subscribe" checked={formData.subscribe} onChange={handleChange}></input>
                    <label htmlFor='subscribe'>Subscribe to Little Lemon News</label>
                </div>
                <button type="submit" className="submit-button">Review & Reserve</button>
            </form>
        {showConfirmModal && (
            <ConfirmationModal
                formData={formData}
                onConfirm={handleConfirmReservation}
                onCancel={handleCancelReservation}
            />
        )}
    </section>
    );
}

export default TableForm;