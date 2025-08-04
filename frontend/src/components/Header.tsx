import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FiCpu className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">FineTuner</h1>
          </div>
          
          <nav className="flex items-center space-x-8">
            {['Dashboard', 'Docs', 'Account'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;