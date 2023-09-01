import React, { useState } from 'react';
import '../styles/MyBookings.css';
import '../components/NewBooking'
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
  
    // Updating state and localStorage
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };
  
  // Set the edited booking details and open the edit page
  const handleEditBooking = (index) => {
    setEditedBookingindex(index);
    setEditedBooking(bookings[index]);
    setIsEditing(true);
  };

  // Closing the edit page after changes
  const handleEditpage = () => {
    setIsEditing(false);
    setBookings(JSON.parse(localStorage.getItem('bookings')));
  };

  // Editing page
  if(isEditing){
    return((
      <div className="edit-popup">
        <NewBooking data={{editing:true,index:editedBookingIndex,date:editedBooking.date,title:"Modifying your booking",savebtn:"conform changes"}} cancelFun={handleEditpage}></NewBooking>
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
              <button className='btnc' onClick={() => handleEditBooking(index)}>Modify</button>
              <button className='btnc' onClick={() => handleDeleteBooking(index)}>cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
