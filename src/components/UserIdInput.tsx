import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

interface UserIdInputProps {
  onSubmit: (userId: string) => void;
}

export function UserIdInput({ onSubmit }: UserIdInputProps) {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onSubmit(userId.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-4">
        <UserCircle className="w-16 h-16 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
        <p className="text-gray-600 text-center">
          Please enter your user ID to continue
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}