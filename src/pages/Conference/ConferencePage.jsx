import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../store/slices/membersSlice';
import MemberCard from '../../components/MemberCard/MemberCard';
import { sendVotes } from '../../store/slices/votingSlice';
import './ConferencePage.scss';

const ConferencePage = () => {
  const { id } = useParams(); // Извлекаем id из URL
  const dispatch = useDispatch();
  const { members, status, error } = useSelector((state) => state.members);

  const [reactions, setReactions] = useState({});

  useEffect(() => {
    dispatch(fetchMembers(id)); // Загружаем участников конференции
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div>Загрузка участников...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  // Функция для обработки выбора реакции
  const handleReactionSelect = (memberId, reaction) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [memberId]: reaction, // Обновляем реакцию для участника
    }));
  };

  // Обработчик клика для кнопки "Подтвердить"
  const handleConfirmClick = () => {
    // Подготовка данных для отправки на сервер
    const reactionsData = Object.keys(reactions).map((memberId) => ({
      member_id: parseInt(memberId), // Преобразуем id участника в число
      reaction_id: reactions[memberId], // Реакция участника
      event_id: id, // id события (например, конференции)
    }));

    console.log('Reactions data:', reactionsData);  // Выводим массив для отладки

    // Отправляем данные на сервер через Redux
    dispatch(sendVotes(reactionsData)); // Здесь передаем сформированный массив голосов
  };

  return (
    <div className="conference-container">
      <h1>Участники конференции</h1>
      <div>
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onReactionSelect={handleReactionSelect} // Передаем обработчик для обновления реакций
          />
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
