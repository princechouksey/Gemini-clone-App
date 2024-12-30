import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

const STORAGE_KEY = 'gemini_chats';

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever chats change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const [currentChatId, setCurrentChatId] = useState(null);

  // Create new chat
  const createChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
    return newChat;
  };

  // Update chat title
  const updateChatTitle = (chatId, newTitle) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  // Delete chat
  const deleteChat = (chatId) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  // Add message to chat and update title if it's the first message
  const addMessage = (chatId, message) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        const updatedMessages = [...chat.messages, message];
        // If this is the first message and it's from the user, update the chat title
        if (updatedMessages.length === 1 && message.role === 'user') {
          const newTitle = message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '');
          return {
            ...chat,
            title: newTitle,
            messages: updatedMessages
          };
        }
        return {
          ...chat,
          messages: updatedMessages
        };
      }
      return chat;
    }));
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <ChatContext.Provider value={{
      chats,
      currentChat,
      currentChatId,
      setCurrentChatId,
      createChat,
      updateChatTitle,
      deleteChat,
      addMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext); 