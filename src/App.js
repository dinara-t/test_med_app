// Import necessary modules from React library
import React, { useState } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import SignUp from './Components/Sign_Up/Sign_Up';
import FindDoctorSearchIC from './Components/InstantConsultation/FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './Components/InstantConsultation/DoctorCardIC/DoctorCardIC';
import AppointmentFormIC from './Components/InstantConsultation/AppointmentFormIC/AppointmentFormIC';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard'; 
import ProfileForm from './Components/ProfileCard/ProfileForm'; 
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
// Function component for the main App
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
      setIsLoggedIn(false);
    };
  
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          {/* Set up the Routes for different pages */}
         <Notification>
          <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/find-doctor" element={<FindDoctorSearchIC />} />
          <Route path="/doctor-card" element={<DoctorCardIC />} />
          <Route path="/appointment-form" element={<AppointmentFormIC />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/booking-consultation" element={<BookingConsultation />} />
          <Route path="/reviews" element={<ReviewForm />} />
           <Route path="/profile" element={<ProfileCard />} />
          <Route path="/profile/edit" element={<ProfileForm />} />
          <Route path="/reports" element={<ReportsLayout/>} />
          
          {/* Define individual Route components for different pages */}
          </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;