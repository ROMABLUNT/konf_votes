import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import { fetchReactionCounts } from '../../store/slices/resultsSlice';
import './ResultsPage.scss';

const emojiMap = {
  1: '👍',
  2: '👏',
  3: '❤️',
  4: '🎉',
};

const ResultsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);
  const resultsState = useSelector((state) => state.results || {}); 
  const results = resultsState.results || {}; // Убедимся, что это объект

  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    dispatch(fetchMembers(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (members.length > 0) {
      const fetchReactions = async () => {
        await Promise.all(
          members.map(async (member) => {
            await dispatch(fetchReactionCounts(member.id)).unwrap();
          })
        );
        setLoadingResults(false);
      };

      fetchReactions();
    }
  }, [members, dispatch]);

  if (loadingResults) return <div>Загрузка результатов...</div>;

  return (
    <div className="results-container">
      <h1>Результаты голосования</h1>
      {members.map((member) => (
        <div key={member.id} className="member-results">
          <h2>{member.member_name}</h2>
          <p>{member.speech_theme}</p>
          <div className="reaction-results">
            {(Array.isArray(results[member.id]) ? results[member.id] : []).map(({ reaction_id, r_count }) => (
              <div key={reaction_id} className="reaction-item">
                {emojiMap[reaction_id]} {r_count}
              </div>
            ))}
            {(!results[member.id] || results[member.id].length === 0) && <p>Нет голосов</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
