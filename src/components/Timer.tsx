import React, { useEffect } from 'react';
import { useWritingStore } from '../store/writingStore';

const Timer: React.FC = () => {
  const { timer, startTimer, pauseTimer, resetTimer, tickTimer } = useWritingStore();
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (timer.isRunning && timer.remainingSeconds > 0) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer.isRunning, timer.remainingSeconds, tickTimer]);

  const handleStart = () => {
    startTimer();
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleReset = () => {
    resetTimer();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">考试倒计时</h3>
          <p className="text-sm text-gray-600">IELTS Writing Task 2</p>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-mono font-bold ${
            timer.remainingSeconds <= 300 ? 'text-red-600' : 
            timer.remainingSeconds <= 600 ? 'text-orange-600' : 'text-green-600'
          }`}>
            {formatTime(timer.remainingSeconds)}
          </div>
          
          <div className="mt-2 flex space-x-2">
            {!timer.isRunning && timer.remainingSeconds > 0 ? (
              <button
                onClick={handleStart}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                开始
              </button>
            ) : timer.isRunning ? (
              <button
                onClick={handlePause}
                className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
              >
                暂停
              </button>
            ) : null}
            
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </div>
      
      {timer.remainingSeconds === 0 && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          ⏰ 时间到！请尽快完成并提交您的作文。
        </div>
      )}
    </div>
  );
};

export default Timer;