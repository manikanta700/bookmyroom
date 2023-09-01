import React, { useState } from 'react';
import './MyBookings.css';

const MyBookings = () => {
  // Retrieve booking data from localStorage
  const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem('bookings')) || []);

  const handleDeleteBooking = (index) => {
    // Remove the booking at the specified index
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);

    // Update state and localStorage
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="MyBookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <strong>Date:</strong> {booking.date}<br />
              <strong>Room:</strong> {booking.room}<br />
              <strong>Time Slot:</strong> {booking.timeSlot}<br />
              <button className='btnc' onClick={() => handleDeleteBooking(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
