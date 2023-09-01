# BookMyRoom

BookMyRoom is a small web application that allows users to book available meeting rooms for specific time slots within a workday.

## Features

- **Display Available Rooms:**
  - List all available meeting rooms. Each room has a unique name or identifier.
  - Users can view the current booking status for each room.

- **Booking a Room:**
  - Users can select a room and choose a time slot to book it.
  - Time slots are in increments of 30 minutes (e.g., 9:00-9:30, 9:30-10:00...).
  - Once booked, the time slot is marked as unavailable for that specific room.

- **Viewing Bookings:**
  - Users can view all of their current bookings.
  - The view displays the room name and the booked time slot.

- **Editing and Canceling Bookings:**
  - Users have the option to modify the time or cancel their booking.
  - Once a booking is canceled, the time slot becomes available for others.

- **Conflict Handling:**
  - The system does not allow double-booking of rooms. Users are alerted if they try to book a room that's already reserved for a specific time slot.

## Technical Requirements

- The frontend is built using React.js.
- The frontend is user-friendly and responsive.
- Data is stored in the browser's local storage for a simplified backend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## Installation

1. Clone the repository:
   ### `git clone https://github.com/manikanta700/bookmyroom.git`
2. Navigate to the project folder:
   ### `cd bookmyroom`
3. Install the project dependencies:
   ### `npm install`
## Usage
   Start the development server:
   ### `npm start`
## Folder Structure
In this structure:

- `bookmyroom/` is the root directory of your project.
  - `node_modules/` contains the dependencies installed for your project.
  - `package.json` contains the configuration and dependencies information.
  - `public/` contains the public files like the HTML template.
  - `src/` is where your source code resides.
    - `App.js` is the main application component.
    - `index.js` is the entry point of your application.
    - `components/` is a directory for organizing your React components.
      - `NewBooking.js` is the component for making new bookings.
      - `MyBookings.js` is the component for displaying user bookings.
    - `styles/` is where your CSS stylesheets are located.
      - `App.css` contains styles for the main application.
      - `NewBooking.css` contains styles for the New Booking component.
      - `MyBookings.css` contains styles for the My Bookings component.
