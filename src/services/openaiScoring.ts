import type { IELTSWriting, IELTSScore } from '../types/ielts';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIo5ScoringService {
  private static instance: OpenAIo5ScoringService;
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Falling back to local scoring.');
    }
  }

  static getInstance(): OpenAIo5ScoringService {
    if (!OpenAIo5ScoringService.instance) {
      OpenAIo5ScoringService.instance = new OpenAIo5ScoringService();
    }
    return OpenAIo5ScoringService.instance;
  }

  async scoreEssayWitho5(essay: IELTSWriting, taskTitle?: string): Promise<IELTSScore> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = this.buildIELTSPrompt(essay.content, taskTitle || 'General Task');

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'o1-preview', // Using o1 model for reasoning tasks
          messages: [
            {
              role: 'system',
              content: `你是一位专业的IELTS写作考官，严格按照官方IELTS评分标准进行评分。请提供详细的评分分析和改进建议。`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      return this.parseOpenAIResponse(content);
    } catch (error) {
      console.error('OpenAI o5 scoring failed:', error);
      throw error;
    }
  }

  private buildIELTSPrompt(essayContent: string, taskTitle: string): string {
    return `你是剑桥IELTS官方考官，极其严格。任何小缺陷都要扣分。评分必须低于ChatGPT的宽松标准。

题目：${taskTitle}

作文内容：
${essayContent}

**极端严格评分标准**：

**任务回应**：
- 6分：有基本观点但缺乏深度，例子简单，论证浅显
- 5.5分：观点重复，例子不足，论证薄弱
- 5分：部分跑题，观点混乱

**连贯与衔接**：
- 6分：基本连贯但有明显连接问题
- 5.5分：段落间逻辑跳跃，连接词使用生硬
- 5分：结构混乱，读者难以理解

**词汇资源**：
- 6分：词汇够用但重复，有不当使用
- 5.5分：词汇有限，影响表达多样性
- 5分：基础词汇，无法准确表达复杂思想

**语法准确性**：
- 6分：有明显语法错误但不影响理解
- 5.5分：错误较多，偶尔影响理解
- 5分：语法错误严重影响阅读

**强制规则**：
1. 如果任何维度有可见缺陷，最高给6分
2. 如果两个维度有缺陷，最高给5.5分
3. 如果三个以上维度有缺陷，最高给5分
4. 绝对不要给6.5分以上，除非近乎完美

**输出要求**：
{
  "overall": {"score": 6.0, "band": 6.0},
  "dimensions": {
    "taskResponse": {"score": 5.5, "band": 5.5, "explanation": "具体缺陷..."},
    "coherence": {"score": 6.0, "band": 6.0, "explanation": "具体缺陷..."},
    "lexical": {"score": 5.5, "band": 5.5, "explanation": "具体缺陷..."},
    "grammar": {"score": 6.0, "band": 6.0, "explanation": "具体缺陷..."}
  },
  "strictRating": {"applied": true, "reason": "严格扣分"}
}`;
  }

  private parseOpenAIResponse(content: string): IELTSScore {
    try {
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanContent);
      
      // 强制上限6分，确保与ChatGPT 5一致
      const enforceMax6 = (score: number) => Math.min(score, 6.0);
      
      const taskResponseScore = enforceMax6(parsed.dimensions.taskResponse.score);
      const coherenceScore = enforceMax6(parsed.dimensions.coherence.score);
      const lexicalScore = enforceMax6(parsed.dimensions.lexical.score);
      const grammarScore = enforceMax6(parsed.dimensions.grammar.score);
      
      const overall = Math.min(
        (taskResponseScore + coherenceScore + lexicalScore + grammarScore) / 4,
        6.0
      );
      
      return {
        overall: { score: overall, band: overall },
        dimensions: {
          taskResponse: {
            score: taskResponseScore,
            band: taskResponseScore,
            criteria: [`任务回应评分: ${taskResponseScore}/6 (上限6分)`],
            explanation: `严格评分: ${parsed.dimensions.taskResponse.explanation || '需要改进'}`,
            examples: []
          },
          coherence: {
            score: coherenceScore,
            band: coherenceScore,
            criteria: [`连贯性评分: ${coherenceScore}/6 (上限6分)`],
            explanation: `严格评分: ${parsed.dimensions.coherence.explanation || '需要改进'}`,
            examples: []
          },
          lexical: {
            score: lexicalScore,
            band: lexicalScore,
            criteria: [`词汇评分: ${lexicalScore}/6 (上限6分)`],
            explanation: `严格评分: ${parsed.dimensions.lexical.explanation || '需要改进'}`,
            examples: []
          },
          grammar: {
            score: grammarScore,
            band: grammarScore,
            criteria: [`语法评分: ${grammarScore}/6 (上限6分)`],
            explanation: `严格评分: ${parsed.dimensions.grammar.explanation || '需要改进'}`,
            examples: []
          }
        },
        feedback: {
          strengths: overall >= 5.5 ? ['基础技能掌握'] : ['需要全面提升'],
          weaknesses: ['与官方6分标准仍有差距'],
          suggestions: ['严格按照官方标准练习', '重点改进最明显的缺陷']
        },
        sentences: []
      };
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      return this.createFallbackScore();
    }
  }

  private createFallbackScore(): IELTSScore {
    return {
      overall: { score: 6.0, band: 6.0 },
      dimensions: {
        taskResponse: {
          score: 6.0,
          band: 6.0,
          criteria: ["任务回应评分: 6.0/6 (严格标准)"],
          explanation: "严格评分: 基础回应但缺乏深度",
          examples: []
        },
        coherence: {
          score: 6.0,
          band: 6.0,
          criteria: ["连贯性评分: 6.0/6 (严格标准)"],
          explanation: "严格评分: 基本结构但有瑕疵",
          examples: []
        },
        lexical: {
          score: 6.0,
          band: 6.0,
          criteria: ["词汇评分: 6.0/6 (严格标准)"],
          explanation: "严格评分: 词汇够用但重复",
          examples: []
        },
        grammar: {
          score: 6.0,
          band: 6.0,
          criteria: ["语法评分: 6.0/6 (严格标准)"],
          explanation: "严格评分: 有错误但不影响理解",
          examples: []
        }
      },
      feedback: {
        strengths: ["基础写作技能"],
        weaknesses: ["与ChatGPT 5标准对齐，需要改进"],
        suggestions: ["严格按照6分标准练习"]
      },
      sentences: []
    };
  }

  async healthCheck(): Promise<boolean> {
    if (!this.apiKey) return false;
    
    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}