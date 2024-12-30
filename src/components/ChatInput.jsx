import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={disabled ? "Select a chat to start messaging..." : "Message Gemini..."}
          className="w-full bg-white/5 text-white rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500 backdrop-blur-sm"
          disabled={disabled}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 disabled:opacity-50 transition-all duration-200 hover:bg-white/20 disabled:hover:bg-white/10"
          disabled={!input.trim() || disabled}
        >
          <PaperAirplaneIcon className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput; 