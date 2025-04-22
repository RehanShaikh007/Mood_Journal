import React from 'react';

const MoodSelector = ({ moods, selectedMood, onSelect }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onSelect(mood)}
          className={`p-4 rounded-full text-3xl transition-transform duration-200 hover:scale-110 ${
            selectedMood?.id === mood.id
              ? `${mood.color} ring-2 ring-blue-500 scale-110`
              : mood.color
          }`}
          type="button"
          title={mood.label}
        >
          <span role="img" aria-label={mood.label}>
            {mood.emoji}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector; 