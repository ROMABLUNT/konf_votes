import React from 'react';
import './ReactionSelector.scss';

// Задаем ID для каждой реакции
const emojis = [
  { id: 1, emoji: '👍' },
  { id: 2, emoji: '👏' },
  { id: 3, emoji: '❤️' },
  { id: 4, emoji: '🎉' },
];

const ReactionSelector = ({ selected, onSelect }) => (
  <div className="reaction-selector">
    {emojis.map((reaction) => (
      <button
        key={reaction.id}
        className={reaction.id === selected ? 'selected' : ''}
        onClick={() => onSelect(reaction.id)}  // Отправляем id реакции
      >
        {reaction.emoji}
      </button>
    ))}
  </div>
);

export default ReactionSelector;
