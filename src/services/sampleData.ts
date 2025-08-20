import type { IELTSScore } from '../types/ielts';

export const sampleScore: IELTSScore = {
  overall: {
    score: 6.5,
    band: 6.5
  },
  dimensions: {
    taskResponse: {
      score: 6.5,
      band: 6.5,
      criteria: ["addresses all parts of the task", "presents a relevant position"],
      explanation: "Addresses all parts of the task with a relevant position",
      examples: ["clear introduction", "topic sentences used"]
    },
    coherence: {
      score: 6.0,
      band: 6.0,
      criteria: ["arranges information coherently", "clear overall progression"],
      explanation: "Information is arranged coherently with clear overall progression",
      examples: ["basic paragraph structure", "generally logical flow"]
    },
    lexical: {
      score: 6.5,
      band: 6.5,
      criteria: ["uses adequate range of vocabulary", "attempts less common vocabulary"],
      explanation: "Uses adequate range of vocabulary with attempts at less common words",
      examples: ["generally accurate word choice", "some topic-specific vocabulary"]
    },
    grammar: {
      score: 6.0,
      band: 6.0,
      criteria: ["uses mix of simple and complex sentences", "meaning is clear"],
      explanation: "Uses mix of simple and complex sentences with generally clear meaning",
      examples: ["basic sentence structures", "generally understandable"]
    }
  },
  feedback: {
    strengths: ["clear position on the topic", "good range of vocabulary", "generally clear meaning"],
    weaknesses: ["limited development of ideas", "mechanical use of cohesive devices", "frequent grammar errors"],
    suggestions: ["extend main ideas with more examples", "use linking words more naturally", "review complex grammar structures"]
  },
  sentences: [
    {
      index: 0,
      text: "In recent years, technology has become increasingly important in education.",
      issues: [],
      suggestions: []
    },
    {
      index: 1,
      text: "Some people believe it is good, others think it is bad.",
      issues: [
        {
          type: 'vocabulary',
          severity: 'minor',
          description: "Basic vocabulary used",
          suggestion: "Use more sophisticated vocabulary",
          original: "good, bad",
          improved: "beneficial, detrimental"
        }
      ],
      suggestions: ["Replace basic words with more advanced alternatives"]
    }
  ]
};