import React, { useState } from 'react';
import ReactionSelector from '../ReactionSelector/ReactionSelector';
import './MemberCard.scss';


const MemberCard = ({ member }) => {
  const [reaction, setReaction] = useState(null);

  const handleReactionSelect = (emoji) => {
    setReaction(emoji);
    // Отправка на сервер здесь (опционально)
  };

  return (
    <div className="member-card">
      <h3>{member.member_name}</h3>
      <p>{member.speech_theme}</p>
      <ReactionSelector selected={reaction} onSelect={handleReactionSelect} />
    </div>
  );
};

export default MemberCard;
