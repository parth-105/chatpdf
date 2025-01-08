import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import '../styles/animations.css';

export function Chat({ onAskQuestion }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
  
    const newQuestion = question;
    setQuestion('');
    console.log('ddd', newQuestion);
    setMessages(prev => [...prev, { type: 'user', content: newQuestion }]);
    setIsLoading(true);
  
    try {
      console.log('rrrrr', newQuestion);
      const answer = await onAskQuestion(newQuestion);
      console.log("ajsx", answer);
      setMessages(prev => [...prev, { type: 'assistant', content: answer }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { type: 'assistant', content: 'Sorry, there was an error processing your question.' }
      ]);
    }
  
    setIsLoading(false);
  };
  

  return (
    <div className="chat-container flex flex-col h-[600px] bg-white rounded-xl shadow-2xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start fade-in">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex space-x-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about your PDF..."
            className="flex-1 px-6 py-3 bg-gray-50 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}