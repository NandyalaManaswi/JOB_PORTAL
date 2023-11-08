import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import './Tag.css';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';
import {BiWorld} from 'react-icons/bi';
import {GiAlarmClock, GiBiceps} from 'react-icons/gi';
import {MdOutlineMedicalServices, MdOutlinePayments} from 'react-icons/md';
import {TbDental} from 'react-icons/tb';
import {FaUmbrellaBeach} from 'react-icons/fa';
import {BsFillCalendar2WeekFill} from 'react-icons/bs';

const tagsData = [
  { title: '401k', icon: <RiMoneyDollarCircleLine /> },
  { title: 'Distributed Team', icon: <BiWorld /> },
  { title: 'Async', icon: <GiAlarmClock /> },
  { title: 'Medical Insurance', icon: <MdOutlineMedicalServices /> },
  { title: 'Dental Insurance', icon: <TbDental /> },
  { title: 'Unlimited Vacation', icon: <FaUmbrellaBeach /> },
  { title: 'Paid time off', icon: <FaUmbrellaBeach /> },
  { title: '4 day work week', icon: <BsFillCalendar2WeekFill /> },
  { title: 'Free gym membership', icon: <GiBiceps /> },
  { title: 'Pay in crypto', icon: <MdOutlinePayments /> },
  // Add more tag objects as needed
];

const TagPage = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (title) => {
    if (selectedTags.includes(title)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== title));
    } else {
      setSelectedTags([...selectedTags, title]);
    }
  };

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  return (
    <div className="tag-page">
      <h1>Tags :</h1>
      <div className="tag-container">
        {tagsData.map((tag, index) => (
          <Tag
            key={index}
            title={tag.title}
            icon={tag.icon}
            isSelected={selectedTags.includes(tag.title)}
            onClick={() => handleTagClick(tag.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagPage;
