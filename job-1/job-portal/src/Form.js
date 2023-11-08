import React, { useState } from 'react';
import './Formstyle.css'

function Form()  {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display the filled information in the console log
    console.log('Company Name:', companyName);
    console.log('Position:', position);
    console.log('Employment Type:', employmentType);
    console.log('Location:', location);

    // Reset form 
    setCompanyName('');
    setPosition('');
    setEmploymentType('');
    setLocation('');
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
    <form onSubmit={handleSubmit}>
       <h1>Job Details</h1>
      <label>
        Company Name :
        <br />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Position :
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </label>
      <br />
     
      <label>
        Employment Type :
        <select 
          type="text"
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}>
          <option value="select">--Select--</option>
          <option value="Part-time">Part-time</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
        </select>
      </label>
      
      <br />
      <label>
        Location : 
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};

export default Form;
