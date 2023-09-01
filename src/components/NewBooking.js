import React, { useState,useRef,useEffect } from 'react';
import '../styles/NewBooking.css';

const NewBooking = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.data.date || '');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots,settimeslots] = useState([
                                        '9:00 AM - 9:30 AM',
                                        '9:30 AM - 10:00 AM',
                                        '10:00 AM - 10:30 AM'
                                    ])
  const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem('bookings')) || []);
  const availableRooms = Array.from({ length: 5 }, (_, index) => `10${index + 1}`);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    setSelectedRoom('');
    setSelectedTimeSlot('');
  };
  

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    var timeSlots1=[
        '9:00 AM - 9:30 AM',
        '9:30 AM - 10:00 AM',
        '10:00 AM - 10:30 AM'
      ];
    // Retrieve all booked data from localStorage
    const allBookedData = JSON.parse(localStorage.getItem('bookings')) || [];
  
    // Filter booked data for the selected date
    const bookedDataForDate = allBookedData.filter(booking => (booking.date === selectedDate && booking.room === room) );
  
    // Extract booked time slots for the selected date
    const bookedSlotsForDate = bookedDataForDate.map(booking => booking.timeSlot);
  
    // Generate a list of unbooked time slots
    const unbookedSlots = timeSlots1.filter(timeSlot => !bookedSlotsForDate.includes(timeSlot));
    console.log("**",unbookedSlots);
  
    setSelectedTimeSlot('');
    settimeslots(unbookedSlots); // Update state with unbooked slots
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = () => {
   
    // Deleting the old slot in case of editing 
    if(props.data.editing){
      handleDeleteBooking(props.data.index)
    }

    if (selectedDate && selectedRoom && selectedTimeSlot) {
      const bookingData = {
        date: selectedDate,
        room: selectedRoom,
        timeSlot: selectedTimeSlot
      };

      // Save the booking data in localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      existingBookings.push(bookingData);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));

      // Reset state after saving
      setSelectedDate('');
      setSelectedRoom('');
      setSelectedTimeSlot('');
      console.log(JSON.parse(localStorage.getItem('bookings')));
    }
 
  
    props.cancelFun();

    
    
  };

  const handleDeleteBooking = (index) => {
    // Remove the booking at the specified index
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
  
    // Update state and localStorage
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };


  //To handel auto scrolling
  const divRef = useRef();
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  [selectedRoom,selectedTimeSlot])


  return (
    <div className="NewBooking" ref={divRef}>
      <h2>{props.data.title}</h2>
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        min={new Date().toISOString().split('T')[0]}
        onChange={handleDateChange}
      />

      {selectedDate && (
        <div className="room-selection">
          <h3>Available Rooms on {selectedDate}:</h3>
          <ul>
            {availableRooms.map(room => (
              <li
                key={room}
                onClick={() => handleRoomSelect(room)}
                className={selectedRoom === room ? 'selected' : ''}
              >
                Room {room}
              </li>
            ))}
          </ul>
        </div>
      )}

      {
        selectedRoom && ((timeSlots.length!==0)?(
            <div className="time-slot-selection" >
              <h3>Select Time Slot:</h3>
              <ul>
               {timeSlots.map(timeSlot => (
                  <li
                    key={timeSlot}
                    onClick={() => handleTimeSlotSelect(timeSlot)}
                    className={selectedTimeSlot === timeSlot ? 'selected' : ''}
                  >
                    {timeSlot}
                  </li>
                ))}
               
              </ul>
            </div>
          ):(<div className="time-slot-selection">
          <h3>Sorry, All slots for this room are booked</h3>
          
        </div>))
      }


      {selectedTimeSlot && (
        <div className="booking-summary" > 
        <h3>Booking Summary:</h3>
        <p>Date: {selectedDate}</p>
        <p>Room: Room {selectedRoom}</p>
        <p>Time Slot: {selectedTimeSlot}</p>
        <button className='btnc' onClick={handleBooking}>{props.data.savebtn}</button>
      </div>
      )}
    </div>
  );
};

export default NewBooking;

