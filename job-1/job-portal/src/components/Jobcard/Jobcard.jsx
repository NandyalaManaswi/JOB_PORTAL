import React from 'react'
import styles from './index.module.scss';
import images from './images.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip,faSackDollar,faBookmark  } from '@fortawesome/free-solid-svg-icons';
//import { savedJobs } from "../../redux/action";


//import { useDispatch } from 'react-redux';
import moment from 'moment';


  


function Jobcard({job}) {
  const cardColor = () => {
    const colors = [
       "#ffcccc", // Light Coral
      // "#ccffcc", // Pale Green
      // "#ccccff", // Lavender
      // "#ffd9b3", // Peach
      // "#b3ffb3", // Mint
      // "#b3b3ff", // Periwinkle
      // "#ffe6cc", // Apricot
      // "#ccffe6", // Seafoam
      // "#e6ccff", // Lilac
      // "#ffebcc", // Pale Orange
      // "#d9ccff", // Orchid
      // "#ccffd9", // Pale Turquoise
      // "#ffccff", // Bubblegum Pink
      // "#e6ffcc", // Pale Lime
      // "#ccf3ff", // Baby Blue
      // "#ffcce6", // Cotton Candy
      // "#ccffeb", // Mint Cream
      // "#ffeacc", // Creamsicle
      // "#ccf6ff", // Powder Blue
      // "#ffccf3"  // Pink Lemonade
    ];// Add more colors as needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const jobData = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'ABC Company',
      location: 'City A',
      salaryRange: '$150k - $170k',
      tags: ['JavaScript', 'React', 'CSS'],
      datePosted: '13h',
      companyLogo: 'https://example.com/company-logo-1.png',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'XYZ Company',
      location: 'City B',
      salaryRange: '$600k - $800k',
      tags: ['Node.js', 'MongoDB', 'API'],
      datePosted: '10h',
      companyLogo: 'https://pixabay.com/photos/bird-common-redstart-songbird-7945398/.png'
    },
    {
        id: 3,
        title: 'mern Developer',
        company: 'tcs Company',
        location: 'City B',
        salaryRange: ' $600k - $800k',
        tags: ['Node.js', 'MongoDB', 'API'],
        datePosted: '13h',
        companyLogo: 'https://example.com/company-logo-2.png',
      },
      {
        id: 4,
        title: 'mean Developer',
        company: 'XYZ Company',
        location: 'City B',
        salaryRange: '$345k - $400k',
        tags: ['Node.js', 'MongoDB', 'API'],
        datePosted: '48h',
        companyLogo: 'https://example.com/company-logo-2.png',
      },
    
  ];
  //const dispatch = useDispatch();
  const datePosted=job.date_posted
  const now = moment();
const duration = now.diff(moment(datePosted));
const hours = Math.floor(moment.duration(duration).asHours());

  return (
    <div >
    <card>
        <div className={`${styles["firstcard"]} d-flex align-items-center`} style={{ backgroundColor: cardColor() }}>
          <div>
        <img className={`${styles["images"]}`}src={images}></img>
        </div>
        <div className={`${styles["role"]}`}>
          <h6>{job.company_name}</h6>
          <p className={`${styles["space"]}`}>{job.title}</p>
          
          <button className={`${styles["worldbutton"]} ${styles["smallButton"]}`}>{job.location}</button><button className={`${styles["worldbutton"]}`}><FontAwesomeIcon icon={faSackDollar}></FontAwesomeIcon>{job.salary_range}</button>
         
        </div>
        <div className= {`${styles["skill"]} d-flex flex-wrap h-2` }>
          {job?.tags?.map((x)=>{return <button className={`${styles["techbutton"]}`} >{x}</button>})}
          
        </div>
        <div className= {`${styles["jobpostedduration"]}`} >
          
          <p> <FontAwesomeIcon icon={faPaperclip} />{hours} hours</p>
          </div>
          <br></br>
          

      </div>
      </card>


    </div>
  )
}

export default Jobcard