import React from 'react';
import './Tag.css';

const Tag = ({ title, icon, isSelected, onClick }) => {
  return (
    <div
      className={`tag ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="tag-icon">{icon}</span>
      <span className="tag-title">{title}</span>
    </div>
  );
};

export default Tag;
