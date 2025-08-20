import { useState, lazy, Suspense } from 'react';
import { useWritingStore } from './store/writingStore';
import { Send, BookOpen } from 'lucide-react';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const EssayEditor = lazy(() => import('./components/EssayEditor'));
const ScoreDisplay = lazy(() => import('./components/ScoreDisplay'));

function App() {
  const [activeTab, setActiveTab] = useState<'write' | 'scores'>('write');
  const { currentEssay, isLoading, submitEssay, clearError } = useWritingStore();

  const handleSubmit = async () => {
    if (!currentEssay || currentEssay.wordCount < 50) {
      alert('Please write at least 50 words before submitting.');
      return;
    }
    
    await submitEssay();
    setActiveTab('scores');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">IELTS Writing Assistant</h1>
            </div>
            
            <nav className="flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab('write');
                  clearError();
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'write'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Write Essay
              </button>
              <button
                onClick={() => setActiveTab('scores')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'scores'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Progress
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          {activeTab === 'write' && (
            <div>
              <EssayEditor />
              
              <div className="max-w-4xl mx-auto mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !currentEssay || currentEssay.wordCount < 50}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Scoring...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Essay for Scoring
                    </>
                  )}
                </button>
                
                {currentEssay && currentEssay.wordCount < 50 && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    Minimum {50 - currentEssay.wordCount} more words needed
                  </p>
                )}
                
                {/* 调试信息 */}
                <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
                  <p>Word count: {currentEssay?.wordCount || 0}</p>
                  <p>Content length: {currentEssay?.content?.length || 0} chars</p>
                  <p>Task ID: {currentEssay?.taskId || 'none'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scores' && <ScoreDisplay />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Powered by AI • Built for IELTS success</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
