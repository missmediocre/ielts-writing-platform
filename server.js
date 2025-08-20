import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'ielts-scoring-api' });
});

// 评分API
app.post('/api/score-essay', async (req, res) => {
  try {
    const { content, wordCount, taskType = 'Task 2' } = req.body;
    
    if (!content || content.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Essay content is too short. Please write at least 50 words.' 
      });
    }

    // 模拟评分结果
    const mockScore = {
      overall: { score: 7.0, band: 7.0 },
      dimensions: {
        taskResponse: {
          score: 7.0,
          band: 7.0,
          criteria: ['Addresses all parts of the task', 'Presents a clear position', 'Relevant examples provided'],
          explanation: 'Your essay demonstrates good understanding of the task requirements. You addressed both viewpoints and provided your own opinion with relevant supporting examples. To improve further, consider developing your ideas with more specific examples and deeper analysis.',
          examples: [
            'Good: "While technology offers convenient access to education, it also creates distractions"',
            'Improvement: Add specific examples like "For instance, online learning platforms like Khan Academy have helped millions of students worldwide access quality education at no cost"'
          ]
        },
        coherence: {
          score: 7.0,
          band: 7.0,
          criteria: ['Logical progression', 'Good paragraphing', 'Clear topic sentences'],
          explanation: 'Your essay shows good organization with a clear introduction, body paragraphs, and conclusion. Each paragraph has a clear topic sentence and progresses logically. Consider using more sophisticated linking words like "furthermore", "nevertheless", and "consequently" to enhance cohesion.',
          examples: [
            'Good: Clear paragraph structure with introduction, body, and conclusion',
            'Improvement: Use transition phrases like "Having examined the benefits, let us now consider the drawbacks"'
          ]
        },
        lexical: {
          score: 7.0,
          band: 7.0,
          criteria: ['Good vocabulary range', 'Appropriate word choice', 'Some less common vocabulary'],
          explanation: 'You demonstrate a good range of vocabulary with generally accurate usage. However, to reach a higher band, incorporate more sophisticated academic vocabulary and avoid repetition of common words like "good", "bad", "important" by using alternatives such as "beneficial", "detrimental", "significant".',
          examples: [
            'Good: Words like "accessible", "convenient", "effective"',
            'Improvement: Replace "good" with "advantageous", "bad" with "adverse", "important" with "crucial"'
          ]
        },
        grammar: {
          score: 7.0,
          band: 7.0,
          criteria: ['Good grammar control', 'Variety of structures', 'Generally accurate'],
          explanation: 'Your grammar control is generally good with a variety of sentence structures. To aim for a higher band, focus on using more complex structures such as conditional sentences, passive voice, and relative clauses. Also, pay attention to minor errors in subject-verb agreement and article usage.',
          examples: [
            'Good: Variety of simple and compound sentences',
            'Improvement: Use complex sentences like "Despite the challenges that online learning presents, its benefits far outweigh its drawbacks"'
          ]
        }
      },
      feedback: {
        strengths: [
          'Clear position statement in the introduction',
          'Balanced discussion of both viewpoints',
          'Relevant examples provided to support arguments',
          'Good paragraph organization with topic sentences'
        ],
        weaknesses: [
          'Some vocabulary could be more sophisticated',
          'Grammar errors in complex sentence structures',
          'Examples could be more specific and detailed',
          'Transition between paragraphs could be smoother'
        ],
        suggestions: [
          'Develop ideas with more specific examples and statistics',
          'Use more sophisticated linking words and phrases',
          'Incorporate more academic vocabulary and collocations',
          'Practice using complex grammatical structures',
          'Review and proofread for minor grammar errors',
          'Consider both sides more thoroughly before presenting your opinion'
        ]
      },
      sentences: []
    };

    res.json(mockScore);
  } catch (error) {
    console.error('Scoring error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});