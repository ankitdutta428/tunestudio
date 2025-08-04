import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

interface LogPanelProps {
  logs: string; // The prop is now a single string
  isRunning: boolean;
  onClearLogs: () => void;
}

const LogPanel: React.FC<LogPanelProps> = ({ logs, isRunning, onClearLogs }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // This effect will automatically scroll the log panel to the bottom
  // whenever the 'logs' content changes.
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-xl flex flex-col h-full"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Live Log</h2>
        <button
          onClick={onClearLogs}
          disabled={isRunning}
          className="p-2 text-gray-400 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Clear logs"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <div ref={logContainerRef} className="p-4 overflow-y-auto flex-grow">
        <AnimatePresence>
          {/* 
            FIX: Instead of mapping, we now render the 'logs' string directly
            inside a <pre> tag. The 'whitespace-pre-wrap' class ensures that
            newline characters create new lines in the display.
          */}
          <motion.pre
            key={logs} // Using key to re-trigger animation on change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-mono whitespace-pre-wrap break-words"
          >
            {logs}
          </motion.pre>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LogPanel;
