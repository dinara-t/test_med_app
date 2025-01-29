// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import './Notification.css'
// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointments, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const appointments = JSON.parse(localStorage.getItem('appointments'));
console.log(appointments);
    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (appointments) {
      setAppointmentData(appointments);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const handleAppointmentCancel = (appointmentId) => {
    const loggedInUser = localStorage.getItem("email");
    if (loggedInUser) {
      let localAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
      localAppointments[loggedInUser] = localAppointments[loggedInUser].filter(appointment => appointment.id !== appointmentId);
      localStorage.setItem("appointments", JSON.stringify(localAppointments));
      setAppointmentData(localAppointments);
    }
  };
  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {children}
      {isLoggedIn && appointments && (
        <div className='appointments-container'>
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-card__content">
                <h3 className="appointment-card__title">Appointment Details</h3>
                <p className="appointment-card__message"><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p className="appointment-card__message"><strong>Speciality:</strong> {appointment.speciality}</p>
                <p className="appointment-card__message"><strong>Name:</strong> {appointment.name}</p>
                <p className="appointment-card__message"><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
                <p className="appointment-card__message"><strong>Date:</strong> {appointment.selectedDate}</p>
                <p className="appointment-card__message"><strong>Time:</strong> {appointment.selectedSlot}</p>
                <button className="cancel-button" onClick={() => handleAppointmentCancel(appointment.id)}>Cancel Appointment</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;