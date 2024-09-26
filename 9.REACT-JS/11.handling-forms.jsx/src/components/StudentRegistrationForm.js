import React, { useState } from "react";
import "./StudentRegistrationForm.css";
const StudentRegistrationForm = () => {
  //Manage the input state
  const [studentName, setStudentName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("Data Structures");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  //Handle Change
  const handleNameChange = (e) => {
    //console.log(e.target.value);
    setStudentName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };
  const handleConsentChange = (e) => {
    setConsent(e.target.value);
  };

  //Handle submit
  const handleSubmit = (e) => {
    //Prevent browser default
    e.preventDefault();
    console.log({
      studentName,
      age,
      consent,
      course,
    });
    // Set submitted state to true after form submission
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Student Registration Form</h2>
        <div>
          <label>Name:</label>
          <input type="text" value={studentName} onChange={handleNameChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={handleAgeChange} />
        </div>
        <div>
          <label>Course:</label>
          <select value={course} onChange={handleCourseChange}>
            <option value="Data Structures">Data Structures</option>
            <option value="Data Science">Data Science</option>
            <option value="MERN">MERN</option>
          </select>
        </div>
        <div>
          <label>
            Consent:
            <input
              type="checkbox"
              checked={consent}
              onChange={handleConsentChange}
            />
            I give my consent
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      {/* Show success message after form submission */}
      {submitted && (
        <div className="success-message">
          <h3>Registration Successful!</h3>
          <p>Thank you for registering, {studentName}.</p>
        </div>
      )}
    </div>
  );
};
export default StudentRegistrationForm;
