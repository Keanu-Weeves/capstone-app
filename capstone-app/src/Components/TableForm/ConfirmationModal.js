import React from 'react';
import './ConfirmationModal.css';

function ConfirmationModal({ formData, onConfirm, onCancel }) {
    return (
        <div className='modal-backdrop'>
            <div className='modal-content'>
                <h3>Please Confirm Your Reservation Details:</h3>
                <div className='modal-details'>
                    <p><strong>Date:</strong> {formData.resDate}</p>
                    <p><strong>Time:</strong> {formData.resTime}</p>
                    <p><strong>Guests:</strong> {formData.guests}</p>
                    <p><strong>Occasion:</strong> {formData.occasion}</p>
                    <p><strong>Name:</strong> {formData.firstName} {formData.LastName}</p>
                    <p><strong>Contact:</strong> {formData.email} {formData.phone ? ` / ${formData.phone}` : ''}</p>
                    <p><strong>Seating:</strong> {formData.seatingPref}</p>
                    {formData.comments && <p><strong>Comments:</strong>{formData.comments}</p>}
                    <p><strong>Subscribe:</strong> {formData.subscribe ? 'Yes' : 'No'}</p>
                </div>

                <h4>Mock Payment Confirmation:</h4>
                <p>To confirm your reservation, please proceed with the mock payment of $5.00 deposit</p>
                <p>*(No actual payment will be processed for this demonstration.)</p>

                <div className='modal-actions'>
                    <button className='modal-button confirm' onClick={onConfirm}>Confirm & Pay</button>
                    <button className='modal-button cancel' onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;