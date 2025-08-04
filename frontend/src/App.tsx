import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import LogPanel from './components/LogPanel';
import { FiLoader } from 'react-icons/fi';

interface TrainingConfig {
  datasetPath: string;
  selectedModel: string;
  learningRate: number;
  batchSize: number;
  epochs: number;
}

const App: React.FC = () => {
  const [logs, setLogs] = useState<string>('Awaiting job...');
  const [isRunning, setIsRunning] = useState(false);
  const [supportedModels, setSupportedModels] = useState<string[]>([]); // Starts empty
  const [isLoading, setIsLoading] = useState(true);

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  // --- THIS IS THE CODE THAT FETCHES THE REAL DATA ---
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Fetches the model list from your Python backend
        const response = await fetch('http://127.0.0.1:5001/api/config');
        const data = await response.json();
        // Updates the state with the REAL list of models
        setSupportedModels(data.supported_models);
      } catch (error) {
        console.error("Error fetching config:", error);
        setLogs("FATAL ERROR: Could not load model configuration from the server. Check CORS and that the backend is running.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []); // The empty [] means this runs only once when the app loads

  const handleStartTraining = async (config: TrainingConfig) => {
    // ... (rest of the handleStartTraining logic remains the same)
  };

  // ... (rest of the App.tsx component remains the same)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <motion.main /* ... */>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
            <FiLoader className="animate-spin text-blue-400" size={48} />
            <p className="mt-4 text-lg">Loading Model List...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
            <div className="space-y-6">
              <ConfigPanel
                models={supportedModels} // <-- Passes the REAL, fetched models
                isRunning={isRunning}
                onStartTraining={handleStartTraining}
              />
            </div>
            <div className="min-h-[500px] lg:min-h-full">
              <LogPanel
                logs={logs}
                isRunning={isRunning}
                onClearLogs={() => setLogs('Logs cleared.')}
              />
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default App;
