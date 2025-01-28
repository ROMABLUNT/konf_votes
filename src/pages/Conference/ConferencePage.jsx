import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import MemberCard from '../../components/MemberCard/MemberCard';
import "./ConferencePage.scss";

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

  // Обработчик клика для кнопки "Подтвердить"
  const handleConfirmClick = () => {
    console.log('Подтверждение прошло успешно!');
    // Здесь можно добавить дополнительную логику для обработки подтверждения, например, отправку данных на сервер
  };

  return (
    <div className="conference-container">
      <h1>Участники конференции</h1>
      <div>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Кнопка Подтвердить */}
      <button className="confirm-button" onClick={handleConfirmClick}>
        Подтвердить
      </button>
    </div>
  );
};

export default ConferencePage;
