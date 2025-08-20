import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IELTSWriting, IELTSScore, IELTSWritingTask } from '../types/ielts';

interface WritingState {
  // State
  currentEssay: IELTSWriting | null;
  essayHistory: IELTSWriting[];
  scores: Record<string, IELTSScore>;
  currentTask: IELTSWritingTask | null;
  isLoading: boolean;
  error: string | null;
  timer: {
    remainingSeconds: number;
    isRunning: boolean;
    startTime: number | null;
  };

  // Actions
  setCurrentTask: (task: IELTSWritingTask) => void;
  refreshTask: () => void;
  setCurrentEssay: (essay: IELTSWriting) => void;
  updateEssayContent: (content: string) => void;
  submitEssay: () => Promise<void>;
  getScore: (essayId: string) => IELTSScore | undefined;
  getEssay: (essayId: string) => IELTSWriting | undefined;
  getProgress: () => {
    totalEssays: number;
    averageScore: number;
    bestScore: number;
    improvement: number;
  };
  clearError: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
}

const allTasks: IELTSWritingTask[] = [
  {
    id: 'task-001',
    type: 'task2',
    title: 'Technology in Education',
    description: 'Some people believe that technology has made education more accessible and effective. Others think it has created more problems than solutions. Discuss both views and give your own opinion.',
    category: 'education',
    difficulty: 'medium',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-002',
    type: 'task2',
    title: 'Work-Life Balance',
    description: 'In many countries, people are working longer hours and have less leisure time. What are the reasons for this trend? What problems can this cause for individuals and society?',
    category: 'society',
    difficulty: 'medium',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-003',
    type: 'task2',
    title: 'Environmental Protection',
    description: 'Some people think that protecting the environment is the responsibility of governments. Others believe individuals should take responsibility. Discuss both views and give your opinion.',
    category: 'environment',
    difficulty: 'hard',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-004',
    type: 'task2',
    title: 'Online Shopping vs Traditional Stores',
    description: 'Online shopping is becoming more popular. Some people believe that traditional shops will eventually disappear. Do you agree or disagree?',
    category: 'technology',
    difficulty: 'medium',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-005',
    type: 'task2',
    title: 'International Tourism',
    description: 'International tourism brings many benefits to a country, but it can also have negative effects. Discuss both views and give your opinion.',
    category: 'economy',
    difficulty: 'medium',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-006',
    type: 'task2',
    title: 'Fast Food and Health',
    description: 'Fast food is becoming increasingly popular. Discuss the advantages and disadvantages of this trend.',
    category: 'health',
    difficulty: 'easy',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-007',
    type: 'task2',
    title: 'Social Media Impact',
    description: 'Social media has both positive and negative effects on society. Discuss both views and give your opinion.',
    category: 'technology',
    difficulty: 'medium',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-008',
    type: 'task2',
    title: 'Higher Education Costs',
    description: 'University education should be free for everyone. To what extent do you agree or disagree?',
    category: 'education',
    difficulty: 'hard',
    wordCount: { min: 50, max: 300 },
    timeLimit: 40
  }
];

// 随机选择任务函数
const getRandomTask = (): IELTSWritingTask => {
  const randomIndex = Math.floor(Math.random() * allTasks.length);
  return allTasks[randomIndex];
};

export const useWritingStore = create<WritingState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentEssay: null,
      essayHistory: [],
      scores: {},
      currentTask: getRandomTask(),
      isLoading: false,
      error: null,
      timer: {
        remainingSeconds: 40 * 60, // 40 minutes
        isRunning: false,
        startTime: null,
      },

      // Actions
      setCurrentTask: (task) => set({ currentTask: task }),
      refreshTask: () => set({ 
        currentTask: getRandomTask(), 
        currentEssay: null,
        timer: { remainingSeconds: 40 * 60, isRunning: false, startTime: null }
      }),

      setCurrentEssay: (essay) => set({ currentEssay: essay }),

      updateEssayContent: (content) => {
        const current = get().currentEssay;
        if (current) {
          set({
            currentEssay: {
              ...current,
              content,
              wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
              updatedAt: new Date().toISOString(),
            }
          });
        } else {
          const task = get().currentTask;
          if (task) {
            set({
              currentEssay: {
                id: `essay-${Date.now()}`,
                userId: 'current-user',
                taskId: task.id,
                taskTitle: task.title,
                taskCategory: task.category,
                content,
                wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            });
          }
        }
      },

      submitEssay: async () => {
        const { currentEssay } = get();
        if (!currentEssay) {
          set({ error: 'No essay to submit' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          console.log('Submitting essay:', {
            wordCount: currentEssay.wordCount,
            contentLength: currentEssay.content.length,
            taskId: currentEssay.taskId,
            taskTitle: currentEssay.taskTitle,
            content: currentEssay.content.substring(0, 100) + '...'
          });

          const currentTask = get().currentTask;
          
          // Ensure we pass the actual task title to the API
          const taskTitle = currentTask?.title || currentEssay.taskTitle || 'General Task';
          
          // For Vercel API endpoint, we need to include taskTitle in the payload
          const response = await fetch('/api/score-essay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: currentEssay.content,
              wordCount: currentEssay.wordCount,
              taskType: 'Task 2',
              taskTitle: taskTitle
            })
          });
          
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
          
          const score = await response.json();
          
          console.log('Received score:', score);

          set((state) => ({
            isLoading: false,
            scores: {
              ...state.scores,
              [currentEssay.id]: score,
            },
            essayHistory: [...state.essayHistory, currentEssay],
            currentEssay: null,
            error: null, // Clear any previous errors
          }));
        } catch (error) {
          console.error('Scoring failed:', error);
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to score essay',
          });
        }
      },

      getScore: (essayId: string) => get().scores[essayId],
      getEssay: (essayId: string) => get().essayHistory.find(essay => essay.id === essayId),

      getProgress: () => {
        try {
          const { essayHistory, scores } = get();
          const scoredEssays = essayHistory.filter(essay => scores[essay.id] && scores[essay.id].overall);
          
          if (scoredEssays.length === 0) {
            return {
              totalEssays: 0,
              averageScore: 0,
              bestScore: 0,
              improvement: 0,
            };
          }

          const scoresList = scoredEssays.map(essay => scores[essay.id]?.overall?.band || 0).filter(score => typeof score === 'number');
          if (scoresList.length === 0) {
            return {
              totalEssays: 0,
              averageScore: 0,
              bestScore: 0,
              improvement: 0,
            };
          }

          const averageScore = scoresList.reduce((sum, score) => sum + score, 0) / scoresList.length;
          const bestScore = Math.max(...scoresList);
          
          // Calculate improvement based on first vs last 3 scores
          const recentScores = scoresList.slice(-3);
          const initialScores = scoresList.slice(0, 3);
          const recentAvg = recentScores.length > 0 ? recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length : 0;
          const initialAvg = initialScores.length > 0 ? initialScores.reduce((sum, score) => sum + score, 0) / initialScores.length : 0;
          const improvement = recentAvg - initialAvg;

          return {
            totalEssays: scoredEssays.length,
            averageScore: Math.round(averageScore * 10) / 10,
            bestScore,
            improvement: Math.round(improvement * 10) / 10,
          };
        } catch (error) {
          console.error('Error calculating progress:', error);
          return {
            totalEssays: 0,
            averageScore: 0,
            bestScore: 0,
            improvement: 0,
          };
        }
      },

      clearError: () => set({ error: null }),

      // Timer actions
      startTimer: () => {
        set({ 
          timer: { 
            ...get().timer, 
            isRunning: true,
            startTime: Date.now()
          } 
        });
      },

      pauseTimer: () => {
        set({ 
          timer: { 
            ...get().timer, 
            isRunning: false 
          } 
        });
      },

      resetTimer: () => {
        set({ 
          timer: { 
            remainingSeconds: 40 * 60,
            isRunning: false,
            startTime: null
          } 
        });
      },

      tickTimer: () => {
        const { timer } = get();
        if (timer.isRunning && timer.remainingSeconds > 0) {
          set({ 
            timer: { 
              ...timer, 
              remainingSeconds: timer.remainingSeconds - 1 
            } 
          });
        } else if (timer.remainingSeconds === 0) {
          set({ 
            timer: { 
              ...timer, 
              isRunning: false 
            } 
          });
        }
      },
    }),
    {
      name: 'ielts-writing-store',
      partialize: (state) => ({
        essayHistory: state.essayHistory,
        scores: state.scores,
        // Don't persist timer state
      }),
    }
  )
);