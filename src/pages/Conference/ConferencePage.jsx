import React from 'react';
import { useNavigate } from 'react-router-dom';
import MemberCard from '../../components/MemberCard/MemberCard';
import './ConferencePage.scss';

const ConferencePage = ({
  id, 
  members,
  status,
  error,
  votesCount,
  showResultsButton,
  handleVote
}) => {
  const navigate = useNavigate();

  if (status === 'loading') return <div>Загрузка участников...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;

  return (
    <div className="conference-container">
      <h1>Участники конференции</h1>

      <p className="motivation-text">
        🌟 Мы за добро и позитив! Не забудьте поставить реакцию каждому участнику, ведь каждый достоин внимания. 💛
      </p>

      <div className="vote-progress">{votesCount}/{members.length}</div>

      <div>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} onVoteComplete={handleVote} />
        ))}
      </div>

      {showResultsButton && (
        <button className="results-button show" onClick={() => navigate(`/results/${id}`)}>
          Перейти к результатам
        </button>
      )}
    </div>
  );
};

export default ConferencePage;
