import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import { sendVote } from '../../store/slices/votingSlice';
import ConferencePage from './ConferencePage';

const ConferencePageContainer = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { members, status, error } = useSelector((state) => state.members);

  const [votesCount, setVotesCount] = useState(0);
  const [showResultsButton, setShowResultsButton] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers(id)); 
  }, [id, dispatch]);

  const handleVote = useCallback((memberId, reaction) => {
    const voteData = {
      event_id: parseInt(id),
      member_id: parseInt(memberId),
      reaction_id: reaction,
    };

    dispatch(sendVote(voteData));

    if (!localStorage.getItem(`voted-${memberId}`)) {
      localStorage.setItem(`voted-${memberId}`, 'true');
      setVotesCount(prev => prev + 1);
    }
  }, [id, dispatch]);

  useEffect(() => {
    const count = members.filter(member => localStorage.getItem(`voted-${member.id}`) === 'true').length;
    setVotesCount(count);
  }, [members]);

  useEffect(() => {
    if (votesCount === members.length && members.length > 0) {
      setShowResultsButton(true);
    }
  }, [votesCount, members]);

  return (
    <ConferencePage
      id={id}  
      members={members}
      status={status}
      error={error}
      votesCount={votesCount}
      showResultsButton={showResultsButton}
      handleVote={handleVote}
    />
  );
};

export default ConferencePageContainer;
