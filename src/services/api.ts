import type { IELTSWriting, IELTSScore } from '../types/ielts';
import { OpenAIo5ScoringService } from './openaiScoring';
import { OfficialScoringService } from './officialScoringStandards';

export class APIService {
  private static instance: APIService;
  private openAIService: OpenAIo5ScoringService;
  private useOpenAI: boolean;

  constructor() {
    this.openAIService = OpenAIo5ScoringService.getInstance();
    this.useOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY || !!process.env.OPENAI_API_KEY;
  }

  static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  async scoreEssay(essay: IELTSWriting, taskTitle?: string): Promise<IELTSScore> {
    if (this.useOpenAI) {
      try {
        console.log('🤖 Using OpenAI o5 model for scoring...');
        return await this.openAIService.scoreEssayWitho5(essay, taskTitle || 'General Task');
      } catch (error) {
        console.error('OpenAI o5 scoring failed:', error);
        console.log('🔄 Falling back to official scoring...');
        return await OfficialScoringService.scoreEssayOfficially(essay, taskTitle || 'General Task');
      }
    } else {
      console.log('📊 Using local official scoring...');
      return await OfficialScoringService.scoreEssayOfficially(essay, taskTitle || 'General Task');
    }
  }

  async healthCheck(): Promise<boolean> {
    if (this.useOpenAI) {
      return await this.openAIService.healthCheck();
    }
    return true;
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

  async scoreEssay(essay: IELTSWriting, taskTitle?: string): Promise<IELTSScore> {
    return this.apiService.scoreEssay(essay, taskTitle);
  }
}