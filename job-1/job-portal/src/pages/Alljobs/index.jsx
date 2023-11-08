import React ,{useState,useEffect}from 'react'
import Jobcard from '../../components/Jobcard/Jobcard';



function MyComponent() {
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
    
    

  return (
    <>
    <h1 style={{ fontSize: '2rem' }}>Job Listings</h1>
    <br />
    {jobData.map((x)=>{return <Jobcard job={x} />})}

    <div>
    
    
  </div>
  </>
  )
}

export default MyComponent;