import React, { useState } from 'react';

const Calendar = ({ entries }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredEntries = selectedMood
    ? entries.filter((entry) => entry.mood.id === selectedMood)
    : entries;

  const moods = [...new Set(entries.map((entry) => entry.mood.id))];

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Create entries map for quick lookup
  const entriesMap = entries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const dateKey = formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
    acc[dateKey] = entry;
    return acc;
  }, {});

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="mt-8">
      {/* Mood Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Filter by mood:</h3>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md ${
              !selectedMood ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedMood(null)}
          >
            All
          </button>
          {moods.map((moodId) => {
            const mood = entries.find((entry) => entry.mood.id === moodId).mood;
            return (
              <button
                key={moodId}
                className={`px-3 py-1 rounded-md ${
                  selectedMood === moodId ? 'ring-2 ring-blue-500' : ''
                } ${mood.color}`}
                onClick={() => setSelectedMood(moodId)}
              >
                {mood.emoji}
              </button>
            );
          })}
        </div>
      </div>

      {/* Monthly Calendar */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold">{monthYear}</h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateKey = formatDateKey(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const entry = entriesMap[dateKey];
            const isToday = dateKey === formatDateKey(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            );

            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg flex items-center justify-center relative ${
                  isToday ? 'border-blue-500 border-2' : 'border-gray-200'
                } ${entry?.mood.color || 'hover:bg-gray-50'}`}
              >
                {entry ? (
                  <div className="text-2xl" title={entry.note}>
                    {entry.mood.emoji}
                  </div>
                ) : (
                  <span className="text-sm text-gray-600">{day}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Entries List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map((entry) => (
          <div
            key={entry.date}
            className={`p-4 rounded-lg shadow-md ${entry.mood.color}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">{entry.mood.emoji}</span>
              <span className="text-sm text-gray-600">
                {new Date(entry.date).toLocaleDateString()}
              </span>
            </div>
            {entry.weather && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <img
                  src={entry.weather.icon}
                  alt={entry.weather.description}
                  className="w-6 h-6"
                />
                <span>{entry.weather.temp}°C</span>
              </div>
            )}
            <p className="text-gray-700">{entry.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar; 