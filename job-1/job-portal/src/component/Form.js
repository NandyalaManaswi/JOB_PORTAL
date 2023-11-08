import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Formstyle.css';
import './Tagpage';
import TagPage from './Tagpage';

function Form() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [ApplyURL, setApplyURL] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [CompanyTwitter, setCompanyTwitter] = useState('');
  const [payLater, setPayLater] = useState(false);
  const [howtoapply, setHowToApply] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [Feedback, setFeedback] = useState('');

  const handleDescriptionChange = (value) => {
    setJobDescription(value);
  };
  const handleApplyChange = (value) => {
    setHowToApply(value);
  };
  const handlePayLaterChange = (e) => {
    setPayLater(e.target.checked);
  };
  const handleSkillChange = (event) => {
    const skill = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== skill));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display the filled information in the console log
    console.log('Company Name:', companyName);
    console.log('Position:', position);
    console.log('Employment Type:', employmentType);
    console.log('Location:', location);
    console.log('Apply URL:', ApplyURL);
    console.log('Company Twitter:', CompanyTwitter);
    console.log('How to Apply:', howtoapply);
    console.log('Selected Skills:', selectedSkills);
    console.log('Feedback:', Feedback);

    // Reset form
    setCompanyName('');
    setPosition('');
    setEmploymentType('');
    setLocation('');
    setApplyURL('');
    setJobDescription('');
    setCompanyTwitter('');
    setHowToApply('');
    setSelectedSkills([]);
    setFeedback('');
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Job Details</h1>

          <label>
            Company Name:
            <br />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Position:
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </label>
          <br />
          <label>
            Employment Type:
            <select
              type="text"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <option value="select">--Select--</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <br />
          <label>
            Apply URL:
            <br />
            <input
              type="text"
              value={ApplyURL}
              onChange={(e) => setApplyURL(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="jobDescription">Job Description:</label>
          <ReactQuill
            id="jobDescription"
            value={jobDescription}
            onChange={handleDescriptionChange}
          />
          <br />
          <label htmlFor="HowToApply">How To Apply:</label>
          <ReactQuill
            id="HowToApply"
            value={howtoapply}
            onChange={handleApplyChange}
          />
          <br />
          <label>
            Company Twitter:
            <br />
            <input
              type="text"
              value={CompanyTwitter}
              onChange={(e) => setCompanyTwitter(e.target.value)}
            />
          </label>
          <br />
          <TagPage />
          <br />
          <label htmlFor="payLaterCheckbox">
            <input
              type="checkbox"
              id="payLaterCheckbox"
              checked={payLater}
              onChange={handlePayLaterChange}
            />
            I'd like to pay later
          </label>
          <br />
          <div>
            <h3>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                <input
                  type="checkbox"
                  value="Get premium support and help with job post"
                  onChange={handleSkillChange}
                  checked={selectedSkills.includes('Get premium support and help with job post')}
                />
                Get premium support and help with job post
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Show my company logo beside my post"
                  onChange={handleSkillChange}
                  checked={selectedSkills.includes('Show my company logo beside my post')}
                />
                Show my company logo beside my post
              </label>
              <label>
                <input
                  type="checkbox"
                  value="create a QR code link for sharing your post easily"
                  onChange={handleSkillChange}
                  checked={selectedSkills.includes('create a QR code link for sharing your post easily')}
                />
                Create a QR code link for sharing your post easily
              </label>
              {/* Add more checkbox elements as needed */}
            </div>
          </div>
          <br />
          <label>
            Feedback:
            <br />
            <input
              type="text"
              value={Feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
