import React from 'react';
import { useWritingStore } from '../store/writingStore';
import { RefreshCw } from 'lucide-react';

const TaskSelector: React.FC = () => {
  const { currentTask, refreshTask } = useWritingStore();

  const handleRefresh = () => {
    refreshTask();
  };

  if (!currentTask) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {currentTask.category}
            </span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
              currentTask.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentTask.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentTask.difficulty === 'easy' ? '简单' :
               currentTask.difficulty === 'medium' ? '中等' : '困难'}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentTask.title}</h3>
          
          <p className="text-gray-600 leading-relaxed">{currentTask.description}</p>
          
          <div className="mt-3 text-sm text-gray-500">
            字数要求: {currentTask.wordCount.min}-{currentTask.wordCount.max}词 | 
            时间限制: {currentTask.timeLimit}分钟
          </div>
        </div>
        
        <div className="ml-4">
          <button
            onClick={handleRefresh}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="换一道新题"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskSelector;