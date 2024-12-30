import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { ChatProvider } from './context/ChatContext';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <ChatProvider>
      <div className="flex h-screen">
        <Sidebar show={showSidebar} setShow={setShowSidebar} />
        <Chat showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </ChatProvider>
  );
}

export default App; 