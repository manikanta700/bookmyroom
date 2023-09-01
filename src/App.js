import React, { useState } from 'react';
import './App.css';
import NewBooking from './NewBooking';
import MyBookings from './MyBookings';

const App = () => {
  const [activePage, setActivePage] = useState('bookings');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleAfterBooking =()=>{
     setActivePage('bookings');
  };

  return (
    <div className="App">
      <header>
        <div className='headercontainer'>
           <div className='title'>
          <h1>bookmyroom</h1>
          </div>
          <div className='headerbtn'>
            {activePage === 'new' ? (
            <button className='btn' onClick={() => handlePageChange('bookings')}>My Bookings</button>
          ) : (
            <button className='btn' onClick={() => handlePageChange('new')}>New Booking</button>
          )}
          </div>
        </div>
       
        
       
      </header>
      <div className="content">
        {activePage === 'new' ? <NewBooking data={{index:null}} cancelFun={handleAfterBooking}/> : <MyBookings />}
      </div>
    </div>
  );
};

export default App;
