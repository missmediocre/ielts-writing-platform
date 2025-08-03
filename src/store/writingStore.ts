import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IELTSWriting, IELTSScore, IELTSWritingTask } from '../types/ielts';
import { IELTSScoringService } from '../services/api';

interface WritingState {
  // State
  currentEssay: IELTSWriting | null;
  essayHistory: IELTSWriting[];
  scores: Record<string, IELTSScore>;
  currentTask: IELTSWritingTask | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentTask: (task: IELTSWritingTask) => void;
  setCurrentEssay: (essay: IELTSWriting) => void;
  updateEssayContent: (content: string) => void;
  submitEssay: () => Promise<void>;
  getScore: (essayId: string) => IELTSScore | undefined;
  getProgress: () => {
    totalEssays: number;
    averageScore: number;
    bestScore: number;
    improvement: number;
  };
  clearError: () => void;
}

const initialTasks: IELTSWritingTask[] = [
  {
    id: 'task-001',
    type: 'task2',
    title: 'Technology in Education',
    description: 'Some people believe that technology has made education more accessible and effective. Others think it has created more problems than solutions. Discuss both views and give your own opinion.',
    category: 'education',
    difficulty: 'medium',
    wordCount: { min: 250, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-002',
    type: 'task2',
    title: 'Work-Life Balance',
    description: 'In many countries, people are working longer hours and have less leisure time. What are the reasons for this trend? What problems can this cause for individuals and society?',
    category: 'society',
    difficulty: 'medium',
    wordCount: { min: 250, max: 300 },
    timeLimit: 40
  },
  {
    id: 'task-003',
    type: 'task2',
    title: 'Environmental Protection',
    description: 'Some people think that protecting the environment is the responsibility of governments. Others believe individuals should take responsibility. Discuss both views and give your opinion.',
    category: 'environment',
    difficulty: 'hard',
    wordCount: { min: 250, max: 300 },
    timeLimit: 40
  }
];

export const useWritingStore = create<WritingState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentEssay: null,
      essayHistory: [],
      scores: {},
      currentTask: initialTasks[0],
      isLoading: false,
      error: null,

      // Actions
      setCurrentTask: (task) => set({ currentTask: task }),

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
            taskId: currentEssay.taskId
          });

          const service = IELTSScoringService.getInstance();
          const score = await service.scoreEssay(currentEssay);
          
          console.log('Received score:', score);

          set((state) => ({
            isLoading: false,
            scores: {
              ...state.scores,
              [currentEssay.id]: score,
            },
            essayHistory: [...state.essayHistory, currentEssay],
            currentEssay: null,
          }));
        } catch (error) {
          console.error('Scoring failed:', error);
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to score essay',
          });
        }
      },

      getScore: (essayId) => get().scores[essayId],

      getProgress: () => {
        const { essayHistory, scores } = get();
        const scoredEssays = essayHistory.filter(essay => scores[essay.id]);
        
        if (scoredEssays.length === 0) {
          return {
            totalEssays: 0,
            averageScore: 0,
            bestScore: 0,
            improvement: 0,
          };
        }

        const scoresList = scoredEssays.map(essay => scores[essay.id]!.overall.band);
        const averageScore = scoresList.reduce((sum, score) => sum + score, 0) / scoresList.length;
        const bestScore = Math.max(...scoresList);
        
        // Calculate improvement based on first vs last 3 scores
        const recentScores = scoresList.slice(-3);
        const initialScores = scoresList.slice(0, 3);
        const recentAvg = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
        const initialAvg = initialScores.reduce((sum, score) => sum + score, 0) / initialScores.length;
        const improvement = recentAvg - initialAvg;

        return {
          totalEssays: scoredEssays.length,
          averageScore: Math.round(averageScore * 10) / 10,
          bestScore,
          improvement: Math.round(improvement * 10) / 10,
        };
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ielts-writing-store',
      partialize: (state) => ({
        essayHistory: state.essayHistory,
        scores: state.scores,
      }),
    }
  )
);