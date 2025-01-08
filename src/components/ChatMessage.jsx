import React from 'react';

export function ChatMessage({ message }) {
  return (
    <div
      className={`flex ${
        message.type === 'user' ? 'justify-end' : 'justify-start'
      } fade-in slide-up`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          message.type === 'user'
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        } shadow-md`}
      >
        {message.content}
      </div>
    </div>
  );
}