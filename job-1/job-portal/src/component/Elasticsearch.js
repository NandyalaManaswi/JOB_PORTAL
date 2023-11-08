import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

const Elasticsearch = () => {
  const [salary, setSalary] = useState(0);
  const [jobs, setJobs] = useState([]);

  const handleSalaryChange = async (value) => {
    setSalary(value);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/job_search/?salary=${value}`);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
    }
    console.log(value);

  };
  console.log(jobs);
  

  return (
    <div>
      <div
        style={{
          width: '300px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f7f7f7',
        }}
      >
        <h3>Salary Range</h3>
        <Slider
          min={0}
          max={5000000}
          step={1000}
          value={salary}
          onChange={handleSalaryChange}
        />
      </div>

      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.salary_range}</p>
            {/* Render other job details */}
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default Elasticsearch;