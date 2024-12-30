import { UserCircleIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

function ChatMessage({ message }) {
  // Function to format code blocks and preserve line breaks
  const formatContent = (content) => {
    // Replace single newlines with <br/> and preserve double newlines for paragraphs
    return content.replace(/\n(?!\n)/g, '  \n');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex items-start gap-4 ${
        message.role === 'assistant' 
          ? 'bg-white/5 border border-white/10' 
          : ''
      } p-6 rounded-xl backdrop-blur-sm hover:shadow-lg`}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={`flex-shrink-0 ${
          message.role === 'assistant' 
            ? 'bg-white/10' 
            : 'bg-white/20'
          } rounded-xl p-2 shadow-lg`}
      >
        {message.role === 'assistant' ? (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        ) : (
          <UserCircleIcon className="w-6 h-6 text-white" />
        )}
      </motion.div>
      
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="font-medium text-white text-sm">
            {message.role === 'assistant' ? 'Gemini AI' : 'You'}
          </span>
          <span className="text-xs text-gray-400">
            {message.timestamp && format(new Date(message.timestamp), 'h:mm a')}
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`prose prose-invert max-w-none ${
            message.error ? 'text-red-400' : 'text-gray-200'
          } leading-relaxed`}
        >
          <ReactMarkdown
            className="markdown-content"
            components={{
              p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
              code: ({ node, inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code className="bg-gray-800 rounded px-1 py-0.5" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto my-4">
                    <code className="text-sm" {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {formatContent(message.content)}
          </ReactMarkdown>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ChatMessage; 