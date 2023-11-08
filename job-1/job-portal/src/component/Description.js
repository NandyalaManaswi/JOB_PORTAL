import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Description(){
    const [jobDescription, setJobDescription] = useState('');
    const handleDescriptionChange = (value) => {
        setJobDescription(value);
      };
    return(
        <div className = "description">
        <label htmlFor="jobDescription">Job Description:</label>
        <ReactQuill
          id="jobDescription"
          value={jobDescription}
          onChange={handleDescriptionChange}
        />
        </div>
    );

};
export default Description;