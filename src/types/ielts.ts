export interface IELTSWritingTask {
  id: string;
  type: 'task2';
  title: string;
  description: string;
  category: 'education' | 'technology' | 'health' | 'environment' | 'society' | 'economy';
  difficulty: 'easy' | 'medium' | 'hard';
  wordCount: {
    min: number;
    max: number;
  };
  timeLimit: number;
}

export interface IELTSWriting {
  id: string;
  userId: string;
  taskId: string;
  taskTitle?: string;
  taskCategory?: string;
  content: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IELTSScore {
  overall: {
    score: number;
    band: number;
  };
  dimensions: {
    taskResponse: DimensionScore;
    coherence: DimensionScore;
    lexical: DimensionScore;
    grammar: DimensionScore;
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  sentences: SentenceAnalysis[];
}

export interface DimensionScore {
  score: number;
  band: number;
  criteria: string[];
  explanation: string;
  examples: string[];
}

export interface SentenceAnalysis {
  index: number;
  text: string;
  issues: SentenceIssue[];
  suggestions: string[];
}

export interface SentenceIssue {
  type: 'grammar' | 'vocabulary' | 'coherence' | 'structure';
  severity: 'minor' | 'moderate' | 'major';
  description: string;
  suggestion: string;
  original: string;
  improved: string;
}

export interface UserProgress {
  userId: string;
  totalEssays: number;
  averageScore: number;
  bestScore: number;
  improvement: number;
  trends: {
    taskResponse: number[];
    coherence: number[];
    lexical: number[];
    grammar: number[];
  };
  recentScores: IELTSScore[];
}