import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WeatherDisplay from './WeatherDisplay';
import Notification from './Notification';
import Calendar from './Calendar';
import { saveEntry, getEntries } from '../services/storage';

const Mood = () => {
  const moods = [
    { id: 1, emoji: '😊', label: 'Happy', color: 'bg-yellow-200' },
    { id: 2, emoji: '😢', label: 'Sad', color: 'bg-blue-200' },
    { id: 3, emoji: '😡', label: 'Angry', color: 'bg-red-200' },
    { id: 4, emoji: '😴', label: 'Tired', color: 'bg-purple-200' },
    { id: 5, emoji: '😃', label: 'Excited', color: 'bg-green-200' },
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [weather, setWeather] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [currentDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    const entry = {
      date: currentDate.toISOString(),
      mood: selectedMood,
      note,
      weather,
    };

    saveEntry(entry);
    setEntries([...entries, entry]);
    setNote('');
    setSelectedMood(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-lg shadow-md ${
          selectedMood?.color || 'bg-white'
        } transition-colors duration-300 mb-8`}
      >
        <h2 className="text-2xl font-bold mb-4">
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h2>

        <WeatherDisplay onWeatherLoaded={setWeather} />

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">How are you feeling?</label>
          <MoodSelector
            moods={moods}
            selectedMood={selectedMood}
            onSelect={setSelectedMood}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="note" className="block text-sm font-medium mb-1">
            Today's Notes
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            maxLength="200"
            placeholder="How was your day?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!selectedMood}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            selectedMood
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Save Entry
        </button>
      </form>

      <Calendar entries={entries} />
      <Notification show={showNotification} message="Entry saved successfully!" />
    </div>
  );
};

export default Mood;
