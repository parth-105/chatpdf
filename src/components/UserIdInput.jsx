import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import '../styles/animations.css';

export function UserIdInput({ onSubmit }) {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      onSubmit(userId.trim());
    }
  };

  return (
    <div className="max-w-md w-full fade-in slide-up">
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <UserCircle className="w-20 h-20 text-blue-500 relative z-10" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
            <p className="text-gray-600">
              Enter your user ID to start exploring your documents
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              className="w-full px-6 py-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transform transition-all hover:scale-105 active:scale-95"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}