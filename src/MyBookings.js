import React, { useState } from 'react';
import './MyBookings.css';
import './NewBooking'
import NewBooking from './NewBooking';

const MyBookings = () => {
  // Retrieve booking data from localStorage
  const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem('bookings')) || []);
  
  // New state variables for edit functionality
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({});
  const [editedBookingIndex, setEditedBookingindex] = useState(null);


  
  const handleDeleteBooking = (index) => {
    // Remove the booking at the specified index
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
  
    // Update state and localStorage
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };
  
  const handleEditBooking = (index) => {
    // Set the edited booking details and open the edit popup
    setEditedBookingindex(index);
    setEditedBooking(bookings[index]);
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    // Close the edit popup without saving changes
    setIsEditing(false);
    setBookings(JSON.parse(localStorage.getItem('bookings')));
  };
  if(isEditing){
    return((
      <div className="edit-popup">
        <NewBooking data={{editing:true,index:editedBookingIndex,date:editedBooking.date}} cancelFun={handleCancelEdit}></NewBooking>
      </div>
    ))
    
  }
  
  return (
    <div className="MyBookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings...
          <br></br>
          <br></br>
          
          Click on NEW BOOKING to start your booking
        </p>
        
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <strong>Date:</strong> {booking.date}<br />
              <strong>Room:</strong> {booking.room}<br />
              <strong>Time Slot:</strong> {booking.timeSlot}<br />
              <button className='btnc' onClick={() => handleEditBooking(index)}>Edit</button>
              <button className='btnc' onClick={() => handleDeleteBooking(index)}>cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
