import React from 'react';
import './ReactionSelector.scss';

const emojis = ['👍', '👏', '❤️', '🎉'];

const ReactionSelector = ({ selected, onSelect }) => (
  <div className="reaction-selector">
    {emojis.map((emoji) => (
      <button
        key={emoji}
        className={emoji === selected ? 'selected' : ''}
        onClick={() => onSelect(emoji)}
      >
        {emoji}
      </button>
    ))}
  </div>
);

export default ReactionSelector;
