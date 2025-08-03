import type { VercelRequest, VercelResponse } from '@vercel/node';

interface IELTSWriting {
  content: string;
  wordCount: number;
  taskType: string;
}

interface IELTSScore {
  overall: {
    score: number;
    band: number;
  };
  dimensions: {
    taskResponse: {
      score: number;
      band: number;
      criteria: string[];
      explanation: string;
      examples: string[];
    };
    coherence: {
      score: number;
      band: number;
      criteria: string[];
      explanation: string;
      examples: string[];
    };
    lexical: {
      score: number;
      band: number;
      criteria: string[];
      explanation: string;
      examples: string[];
    };
    grammar: {
      score: number;
      band: number;
      criteria: string[];
      explanation: string;
      examples: string[];
    };
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  sentences: Array<{
    text: string;
    analysis: string;
    suggestion: string;
  }>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content, wordCount, taskType = 'Task 2' } = req.body as IELTSWriting;

    if (!content || content.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Essay content is too short. Please write at least 50 words.' 
      });
    }

    const apiKey = process.env.KIMI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('API key not configured');
      return res.status(500).json({ 
        error: 'Service temporarily unavailable. Please try again later.' 
      });
    }

    const prompt = `Please score this IELTS ${taskType} essay with detailed analysis:

Essay Content:
${content}

Word Count: ${wordCount}

Provide scoring in this JSON format:
{
  "overall": {"score": 6.5, "band": 6.5},
  "dimensions": {
    "taskResponse": {"score": 6.5, "band": 6.5, "criteria": [...], "explanation": "...", "examples": [...]},
    "coherence": {"score": 6.5, "band": 6.5, "criteria": [...], "explanation": "...", "examples": [...]},
    "lexical": {"score": 6.5, "band": 6.5, "criteria": [...], "explanation": "...", "examples": [...]},
    "grammar": {"score": 6.5, "band": 6.5, "criteria": [...], "explanation": "...", "examples": [...]}
  },
  "feedback": {
    "strengths": [...],
    "weaknesses": [...],
    "suggestions": [...]
  },
  "sentences": [
    {"text": "...", "analysis": "...", "suggestion": "..."}
  ]
}`;

    // 支持Kimi API
    const isKimi = apiKey.startsWith('sk-kimi');
    const apiUrl = isKimi 
      ? 'https://api.moonshot.cn/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    
    const model = isKimi ? 'moonshot-v1-8k' : 'gpt-4o-mini';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert IELTS examiner with 10+ years of experience. Provide accurate scoring (0.5 precision) and actionable feedback.'
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

    // 解析JSON响应
    const score = parseScoringResponse(content);
    
    res.status(200).json(score);
  } catch (error) {
    console.error('Scoring error:', error);
    
    // 返回默认评分作为后备
    res.status(200).json(getDefaultScore());
  }
}

function parseScoringResponse(response: string): IELTSScore {
  try {
    // 提取JSON部分
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // 如果无法解析JSON，返回默认评分
    return getDefaultScore();
  } catch (error) {
    console.error('Failed to parse response:', error);
    return getDefaultScore();
  }
}

function getDefaultScore(): IELTSScore {
  return {
    overall: { score: 6.0, band: 6.0 },
    dimensions: {
      taskResponse: {
        score: 6.0,
        band: 6.0,
        criteria: ['Addresses the task partially', 'Presents relevant ideas'],
        explanation: 'Basic understanding of task requirements with room for improvement',
        examples: []
      },
      coherence: {
        score: 6.0,
        band: 6.0,
        criteria: ['Generally coherent', 'Clear progression'],
        explanation: 'Logical organization with some lapses in flow',
        examples: []
      },
      lexical: {
        score: 6.0,
        band: 6.0,
        criteria: ['Adequate vocabulary', 'Some repetition'],
        explanation: 'Sufficient range but could be more varied',
        examples: []
      },
      grammar: {
        score: 6.0,
        band: 6.0,
        criteria: ['Mix of simple/complex', 'Some errors'],
        explanation: 'Generally accurate with noticeable errors',
        examples: []
      }
    },
    feedback: {
      strengths: ['Clear position statement', 'Relevant examples provided'],
      weaknesses: ['Limited vocabulary range', 'Grammar inconsistencies'],
      suggestions: ['Expand vocabulary with academic phrases', 'Review complex sentence structures']
    },
    sentences: []
  };
}