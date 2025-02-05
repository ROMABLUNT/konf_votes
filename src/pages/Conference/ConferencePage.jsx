import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import MemberCard from '../../components/MemberCard/MemberCard';
import { sendVote } from '../../store/slices/votingSlice';
import './ConferencePage.scss';

const ConferencePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { members, status, error } = useSelector((state) => state.members);
  const [allVoted, setAllVoted] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (members.length > 0) {
      const votedAll = members.every(member => localStorage.getItem(`voted-${member.id}`) === 'true');
      setAllVoted(votedAll);
    }
  }, [members]);

  if (status === 'loading') return <div>Загрузка участников...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;

  const handleVote = (memberId, reaction) => {
    const voteData = {
      event_id: parseInt(id),
      member_id: parseInt(memberId),
      reaction_id: reaction,
    };

    dispatch(sendVote(voteData));

    localStorage.setItem(`voted-${memberId}`, 'true');
    setAllVoted(members.every(member => localStorage.getItem(`voted-${member.id}`) === 'true'));
  };

  return (
    <div className="conference-container">
      <h1>Участники конференции</h1>
      <div>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} onVoteComplete={handleVote} />
        ))}
      </div>

      {allVoted && (
        <button className="results-button" onClick={() => navigate(`/results/${id}`)}>
          Перейти на страницу результатов
        </button>
      )}
    </div>
  );
};

export default ConferencePage;
