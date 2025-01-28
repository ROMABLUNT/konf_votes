import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import MemberCard from '../../components/MemberCard/MemberCard';

const ConferencePage = () => {
  const { id } = useParams(); // Извлекаем id из URL
  const dispatch = useDispatch();
  const { members, status, error } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers(id)); // Загружаем участников конференции
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div>Загрузка участников...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Участники конференции</h1>
      <div>
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
          />
        ))}
      </div>
    </div>
  );
};

export default ConferencePage;
