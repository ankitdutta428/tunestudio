import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiCpu, FiLoader, FiSettings, FiChevronsRight } from 'react-icons/fi';

interface TrainingConfig {
  datasetPath: string;
  selectedModel: string;
  learningRate: number;
  batchSize: number;
  epochs: number;
}

interface ConfigPanelProps {
  models: string[];
  isRunning: boolean;
  onStartTraining: (config: TrainingConfig) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ models, isRunning, onStartTraining }) => {
  const [datasetPath, setDatasetPath] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0] || '');
  const [learningRate, setLearningRate] = useState(2e-5);
  const [batchSize, setBatchSize] = useState(16);
  const [epochs, setEpochs] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartTraining({
      datasetPath,
      selectedModel,
      learningRate,
      batchSize,
      epochs,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-xl flex flex-col h-full p-6 space-y-6"
    >
      <div className="flex items-center space-x-3">
        <FiSettings className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold">Configuration</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
        {/* --- Main Configuration Sections --- */}
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
          {/* Dataset Path */}
          <div>
            <label htmlFor="dataset" className="block text-sm font-medium text-gray-300 mb-1">
              Dataset Path or Hub Name
            </label>
            <div className="relative">
              <FiFolder className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="dataset"
                type="text"
                value={datasetPath}
                onChange={e => setDatasetPath(e.target.value)}
                placeholder="e.g., /path/to/data.csv or 'imdb'"
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isRunning}
                required
              />
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">
              Select a Model
            </label>
            <div className="relative">
              <FiCpu className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {/* FIX: Ensure the select element has proper styling to not be cut off */}
              <select
                id="model"
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isRunning}
              >
                {models.map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hyperparameters */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Hyperparameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Learning Rate, Batch Size, Epochs inputs here, similar styling */}
            </div>
          </div>
        </div>

        {/* --- Action Button --- */}
        <div className="pt-4 border-t border-gray-700">
          <button
            type="submit"
            disabled={isRunning}
            className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Training in Progress...
              </>
            ) : (
              <>
                Start Fine-Tuning
                <FiChevronsRight className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ConfigPanel;
