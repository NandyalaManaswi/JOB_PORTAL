import React, { useState, useEffect } from 'react';

function Skillset() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const handleSkillChange = (event) => {
        const skill = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedSkills([...selectedSkills, skill]);
        } else {
          setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== skill));
        }
      };
     

      useEffect(() => {
        console.log(selectedSkills);
      }, [selectedSkills]);
    
    return(
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
          create a QR code link for sharing your post easily
        </label>
        {/* Add more checkbox elements as needed */}
      </div>
    </div>


    );
    
};
export default Skillset;