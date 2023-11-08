import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from "../components/Jobcard/Jobcard";
// import Elasticsearch from "./Elasticsearch";


const JobList = () => {
  const [salary, setSalary] = useState(null);
  // const [jobs, setJobs] = useState([]);
  const [postData, setPostData] = useState([]);
  const url = "http://127.0.0.1:8000";

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const endpoint = `${url}/get?page=${page}`;
    

    try {
      const response = await fetch(endpoint, {
        method: "GET",
      });

      const { results, count } = await response.json();
      
     console.log(results);
      const data = [...postData].concat(results);
      setPostData(data);
     

      // Check if there are more pages available
      if (data.length >= count) {
        setHasMore(false);
      }
    }
      catch (e) {
      console.log(e);
    }

  };

  const handleSalaryChange = async (value) => {
    setSalary(value);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/job_search/?salary=${value}`
      );
      setPostData(response.data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "300px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "2px",
          background: "#f7f7f7",
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

      {salary > 0 ? (
        postData.length > 0 ? (
          postData.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <InfiniteScroll
        dataLength={postData.length}
        next={() => setPage(prevState => prevState + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
         {postData.map((el) => el.id && <JobCard key={el.id} job={el} />)}
         

        </InfiniteScroll>
      )}
    </div>
  );
};

export default JobList;
