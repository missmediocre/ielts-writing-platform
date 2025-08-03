import type { IELTSWriting, IELTSScore } from '../types/ielts';

const API_BASE_URL = import.meta.env.PROD 
  ? window.location.origin + '/api' 
  : 'http://localhost:3000/api';

export class APIService {
  private static instance: APIService;

  static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  async scoreEssay(essay: IELTSWriting): Promise<IELTSScore> {
    try {
      const response = await fetch(`${API_BASE_URL}/score-essay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: essay.content,
          wordCount: essay.wordCount,
          taskType: essay.taskType || 'Task 2'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to score essay');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API scoring failed:', error);
      
      // 提供友好的错误消息和默认评分
      if (error instanceof Error) {
        throw new Error(`评分服务暂时不可用: ${error.message}`);
      }
      
      throw new Error('无法连接到评分服务，请稍后重试');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// 兼容旧接口的包装器
export class IELTSScoringService {
  private static instance: IELTSScoringService;
  private apiService = APIService.getInstance();

  static getInstance(): IELTSScoringService {
    if (!IELTSScoringService.instance) {
      IELTSScoringService.instance = new IELTSScoringService();
    }
    return IELTSScoringService.instance;
  }

  async scoreEssay(essay: IELTSWriting): Promise<IELTSScore> {
    return this.apiService.scoreEssay(essay);
  }
}