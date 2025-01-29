import React, { useState, useEffect } from 'react';
import ReactionSelector from '../ReactionSelector/ReactionSelector';
import './MemberCard.scss';

const MemberCard = ({ member, onVoteComplete }) => {
  const [reaction, setReaction] = useState(null);
  const [ifVoted, setIfVoted] = useState(false);

  useEffect(() => {
    const savedReaction = localStorage.getItem(`reaction-${member.id}`);
    const savedVotedStatus = localStorage.getItem(`voted-${member.id}`);

    if (savedReaction) setReaction(savedReaction);
    if (savedVotedStatus === 'true') setIfVoted(true);
  }, [member.id]);

  const handleReactionSelect = (emoji) => {
    if (!ifVoted) {
      setReaction(emoji);
      localStorage.setItem(`reaction-${member.id}`, emoji);
    }
  };

  const handleConfirmClick = () => {
    if (reaction) {
      onVoteComplete(member.id, reaction); // Отправляем запрос
      setIfVoted(true);
      localStorage.setItem(`voted-${member.id}`, 'true'); // Запоминаем, что голос учтен
    } else {
      alert('Выберите реакцию перед подтверждением!');
    }
  };

  return (
    <div className="member-card">
      <h3>{member.member_name}</h3>
      <p>{member.speech_theme}</p>

      {!ifVoted && <ReactionSelector selected={reaction} onSelect={handleReactionSelect} />}
      {ifVoted && <p>Ваш голос учтен!</p>}

      {!ifVoted && (
        <button className="confirm-button" onClick={handleConfirmClick} disabled={!reaction}>
          Подтвердить
        </button>
      )}
    </div>
  );
};

export default MemberCard;
