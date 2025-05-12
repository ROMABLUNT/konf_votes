import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import { fetchReactionCounts } from '../../store/slices/resultsSlice';
import ResultsPage from './ResultsPage';

const ResultsPageContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);
  const resultsState = useSelector((state) => state.results || {});
  const results = resultsState.results || {};

  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    dispatch(fetchMembers(id));
  }, [id, dispatch]);

  const fetchResults = useCallback(async () => {
    if (members.length > 0) {
      await Promise.all(
        members.map(async (member) => {
          await dispatch(fetchReactionCounts(member.id)).unwrap();
        })
      );
      setLoadingResults(false);
    }
  }, [members, dispatch]);

  useEffect(() => {
    if (members.length > 0) {
      fetchResults();
      const interval = setInterval(fetchResults, 2000);
      return () => clearInterval(interval);
    }
  }, [members, fetchResults]);

  return <ResultsPage members={members} results={results} loading={loadingResults} />;
};

export default ResultsPageContainer;
