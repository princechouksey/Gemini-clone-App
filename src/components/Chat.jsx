import { useState, useRef, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import LoadingSpinner from './LoadingSpinner';
import { getGeminiResponse } from '../services/gemini';
import { useChat } from '../context/ChatContext';
import { AnimatePresence } from 'framer-motion';

function Chat({ showSidebar, setShowSidebar }) {
  const { currentChat, addMessage } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSendMessage = async (message) => {
    if (!currentChat) return;

    try {
      const userMessage = { 
        role: 'user', 
        content: message, 
        timestamp: new Date() 
      };
      addMessage(currentChat.id, userMessage);
      
      setIsLoading(true);

      const response = await getGeminiResponse(message);
      const aiMessage = { 
        role: 'assistant', 
        content: response, 
        timestamp: new Date() 
      };
      addMessage(currentChat.id, aiMessage);
    } catch (error) {
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.', 
        timestamp: new Date(),
        error: true 
      };
      addMessage(currentChat.id, errorMessage);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessages = () => {
    if (!currentChat?.messages?.length) return null;

    return currentChat.messages.map((message, index) => (
      <ChatMessage 
        key={`${message.timestamp}-${index}`}
        message={message}
      />
    ));
  };

  return (
    <div className="flex-1 theme-gradient flex flex-col">
      <div className="border-b border-white/10 backdrop-blur-md bg-black/20 p-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        {currentChat && (
          <h2 className="text-white font-medium text-lg tracking-wide">
            {currentChat.title}
          </h2>
        )}
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {!currentChat ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-[#66FCF1]/10 rounded-full flex items-center justify-center mb-4 neon-border">
                <svg className="w-8 h-8 text-[#66FCF1] neon-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#66FCF1] mb-2 neon-text">Welcome to Gemini AI Chat</h3>
              <p className="text-[#C5C6C7] max-w-md">
                Select an existing chat or create a new one to start a conversation with Gemini AI.
              </p>
            </div>
          ) : currentChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-[#66FCF1]/10 rounded-full flex items-center justify-center mb-4 neon-border">
                <svg className="w-8 h-8 text-[#66FCF1] neon-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#66FCF1] mb-2 neon-text">Start a New Conversation</h3>
              <p className="text-[#C5C6C7] max-w-md">
                Type your message below to begin chatting with Gemini AI.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {renderMessages()}
              {isLoading && <LoadingSpinner />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/10 p-4 backdrop-blur-md bg-black/20">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={!currentChat}
        />
      </div>
    </div>
  );
}

export default Chat; 