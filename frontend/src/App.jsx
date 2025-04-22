import React from 'react';
import Mood from './components/Mood';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Mood Journal</h1>
        </div>
      </header>
      <main className="py-8">
        <Mood />
      </main>
    </div>
  );
}

export default App;
