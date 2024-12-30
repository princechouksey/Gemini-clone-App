import { useState } from 'react';
import { PlusIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar({ show, setShow }) {
  const { 
    chats, 
    currentChatId, 
    setCurrentChatId, 
    createChat, 
    updateChatTitle, 
    deleteChat 
  } = useChat();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleCreateChat = () => {
    createChat();
  };

  const startEditing = (chat) => {
    setEditingId(chat.id);
    setEditTitle(chat.title);
  };

  const handleUpdateTitle = (chatId) => {
    if (editTitle.trim()) {
      updateChatTitle(chatId, editTitle);
      setEditingId(null);
    }
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  const getChatTitle = (chat) => {
    if (chat.messages.length > 0) {
      const firstMessage = chat.messages[0];
      return firstMessage.content.slice(0, 30) + (firstMessage.content.length > 30 ? '...' : '');
    }
    return 'New Chat';
  };

  return (
    <motion.div 
      initial={{ width: show ? 256 : 0 }}
      animate={{ width: show ? 256 : 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#202123] h-screen overflow-hidden border-r border-white/10"
    >
      <div className="p-4">
        <button
          onClick={handleCreateChat}
          className="w-full flex items-center gap-3 rounded-lg border border-white/20 p-4 text-white hover:bg-gray-700 transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-80px)] px-2">
        <AnimatePresence>
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`group flex items-center justify-between p-3 my-1 rounded-lg text-white hover:bg-gray-700 cursor-pointer transition-colors ${
                currentChatId === chat.id ? 'bg-gray-700' : ''
              }`}
            >
              {editingId === chat.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleUpdateTitle(chat.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateTitle(chat.id)}
                  className="bg-gray-800 text-white px-3 py-1 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
              ) : (
                <>
                  <div 
                    className="flex-1 truncate" 
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    {getChatTitle(chat)}
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(chat);
                      }}
                      className="p-1 hover:bg-gray-600 rounded"
                      title="Edit chat title"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="p-1 hover:bg-gray-600 rounded text-red-400 hover:text-red-300"
                      title="Delete chat"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Sidebar; 