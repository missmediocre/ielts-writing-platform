import type { IELTSWriting, IELTSScore } from '../types/ielts';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

if (!OPENAI_API_KEY) {
  console.warn('⚠️ VITE_OPENAI_API_KEY is not configured. Please add it to your .env file.');
}

export class IELTSScoringService {
  private static instance: IELTSScoringService;

  static getInstance(): IELTSScoringService {
    if (!IELTSScoringService.instance) {
      IELTSScoringService.instance = new IELTSScoringService();
    }
    return IELTSScoringService.instance;
  }

  async scoreEssay(essay: IELTSWriting): Promise<IELTSScore> {
    const prompt = this.buildScoringPrompt(essay);
    
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are an expert IELTS writing examiner. Score this Task 2 essay according to IELTS band descriptors.
              
Scoring criteria:
1. Task Response (0-9): How well the essay addresses the task
2. Coherence and Cohesion (0-9): Organization and flow
3. Lexical Resource (0-9): Vocabulary usage
4. Grammatical Range and Accuracy (0-9): Grammar and sentence structure

Provide detailed feedback with:
- Overall band score (rounded to 0.5)
- Individual dimension scores
- Specific strengths and weaknesses
- Sentence-by-sentence analysis
- Actionable improvement suggestions
- Examples of improved sentences

Return valid JSON format.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('Invalid response format');
      }

      return this.parseScoringResponse(content);
    } catch (error) {
      console.error('Essay scoring failed:', error);
      throw new Error('Failed to score essay. Please try again.');
    }
  }

  private buildScoringPrompt(essay: IELTSWriting): string {
    return `
Please score this IELTS Task 2 essay:

Essay Content:
${essay.content}

Word Count: ${essay.wordCount}

Task Requirements:
- Write at least 250 words
- Address all parts of the task
- Present a clear position
- Support arguments with examples
- Organize ideas logically
- Use appropriate vocabulary and grammar

Provide a comprehensive analysis with specific examples and actionable feedback.`;
  }

  private parseScoringResponse(response: string): IELTSScore {
    try {
      // Try to parse JSON from response
      const jsonStart = response.indexOf('{');
      const jsonEnd = response.lastIndexOf('}') + 1;
      const jsonStr = response.substring(jsonStart, jsonEnd);
      
      const parsed = JSON.parse(jsonStr);
      
      // Validate and structure the response
      return {
        overall: {
          score: parsed.overall?.score || 6.0,
          band: parsed.overall?.band || 6.0
        },
        dimensions: {
          taskResponse: {
            score: parsed.dimensions?.taskResponse?.score || 6.0,
            band: parsed.dimensions?.taskResponse?.band || 6.0,
            criteria: parsed.dimensions?.taskResponse?.criteria || [],
            explanation: parsed.dimensions?.taskResponse?.explanation || '',
            examples: parsed.dimensions?.taskResponse?.examples || []
          },
          coherence: {
            score: parsed.dimensions?.coherence?.score || 6.0,
            band: parsed.dimensions?.coherence?.band || 6.0,
            criteria: parsed.dimensions?.coherence?.criteria || [],
            explanation: parsed.dimensions?.coherence?.explanation || '',
            examples: parsed.dimensions?.coherence?.examples || []
          },
          lexical: {
            score: parsed.dimensions?.lexical?.score || 6.0,
            band: parsed.dimensions?.lexical?.band || 6.0,
            criteria: parsed.dimensions?.lexical?.criteria || [],
            explanation: parsed.dimensions?.lexical?.explanation || '',
            examples: parsed.dimensions?.lexical?.examples || []
          },
          grammar: {
            score: parsed.dimensions?.grammar?.score || 6.0,
            band: parsed.dimensions?.grammar?.band || 6.0,
            criteria: parsed.dimensions?.grammar?.criteria || [],
            explanation: parsed.dimensions?.grammar?.explanation || '',
            examples: parsed.dimensions?.grammar?.examples || []
          }
        },
        feedback: {
          strengths: parsed.feedback?.strengths || [],
          weaknesses: parsed.feedback?.weaknesses || [],
          suggestions: parsed.feedback?.suggestions || []
        },
        sentences: parsed.sentences || []
      };
    } catch (error) {
      console.error('Failed to parse scoring response:', error);
      return this.getDefaultScore();
    }
  }

  private getDefaultScore(): IELTSScore {
    return {
      overall: { score: 6.0, band: 6.0 },
      dimensions: {
        taskResponse: {
          score: 6.0,
          band: 6.0,
          criteria: ['Addresses the task', 'Presents relevant ideas'],
          explanation: 'Basic understanding of task requirements',
          examples: []
        },
        coherence: {
          score: 6.0,
          band: 6.0,
          criteria: ['Logical organization', 'Clear progression'],
          explanation: 'Generally coherent with some lapses',
          examples: []
        },
        lexical: {
          score: 6.0,
          band: 6.0,
          criteria: ['Adequate vocabulary', 'Some repetition'],
          explanation: 'Sufficient range for task requirements',
          examples: []
        },
        grammar: {
          score: 6.0,
          band: 6.0,
          criteria: ['Mix of simple and complex sentences', 'Some errors'],
          explanation: 'Generally accurate with noticeable errors',
          examples: []
        }
      },
      feedback: {
        strengths: ['Clear position stated', 'Some relevant examples'],
        weaknesses: ['Limited vocabulary range', 'Grammar errors'],
        suggestions: ['Use more varied vocabulary', 'Check verb tenses']
      },
      sentences: []
    };
  }
}