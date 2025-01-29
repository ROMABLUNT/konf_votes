import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import MemberCard from '../../components/MemberCard/MemberCard';
import { sendVote } from '../../store/slices/votingSlice';
import './ConferencePage.scss';

const ConferencePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { members, status, error } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers(id));
  }, [id, dispatch]);

  if (status === 'loading') return <div>Загрузка участников...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;

  const handleVote = (memberId, reaction) => {
    const voteData = {
      event_id: parseInt(id),
      member_id: parseInt(memberId),
      reaction_id: reaction,
    };

    dispatch(sendVote(voteData));
  };

  return (
    <div className="conference-container">
      <h1>Участники конференции</h1>
      <div>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} onVoteComplete={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default ConferencePage;
