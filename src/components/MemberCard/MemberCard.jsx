import React, { useState } from 'react';
import ReactionSelector from '../ReactionSelector/ReactionSelector';
import './MemberCard.scss';

const MemberCard = ({ member, onReactionSelect }) => {
  const [reaction, setReaction] = useState(null);

  const handleReactionSelect = (emoji) => {
    setReaction(emoji);
    onReactionSelect(member.id, emoji);  // Обновляем реакцию для данного участника в родительском компоненте
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
