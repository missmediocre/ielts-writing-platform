import React from 'react';
import { useWritingStore } from '../store/writingStore';
import { RefreshCw } from 'lucide-react';
import Timer from './Timer';
import TaskSelector from './TaskSelector';

const EssayEditor: React.FC = () => {
  const {
    currentTask,
    currentEssay,
    updateEssayContent,
    isLoading,
    error,
    refreshTask,
  } = useWritingStore();

  if (!currentTask) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No task selected</p>
      </div>
    );
  }

  const wordCount = currentEssay?.wordCount || 0;
  const progress = Math.min((wordCount / currentTask.wordCount.min) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Timer */}
      <Timer />
      
      {/* Task Selector */}
      <TaskSelector />

      {/* Writing Interface */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Write your essay here</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {wordCount} / {currentTask.wordCount.min} words
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button
                onClick={refreshTask}
                className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="换一道新题"
              >
                <RefreshCw size={16} className="mr-1" />
                换题
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <textarea
            value={currentEssay?.content || ''}
            onChange={(e) => updateEssayContent(e.target.value)}
            placeholder="Start writing your essay here..."
            className="w-full min-h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Writing Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Address all parts of the question</li>
          <li>• Present a clear position throughout</li>
          <li>• Use linking words for coherence</li>
          <li>• Include specific examples</li>
          <li>• Check grammar and spelling</li>
        </ul>
      </div>
    </div>
  );
};

export default EssayEditor;