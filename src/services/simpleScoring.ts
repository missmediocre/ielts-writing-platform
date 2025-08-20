import type { IELTSWriting, IELTSScore } from '../types/ielts';

export class SimpleScoringService {
  static async scoreEssay(_essay: IELTSWriting, _taskTitle: string): Promise<IELTSScore> {
    return {
      overall: {
        score: 6.5,
        band: 6.5
      },
      dimensions: {
        taskResponse: {
          score: 6.5,
          band: 6.5,
          criteria: ["addresses task requirements"],
          explanation: "Good response to the task",
          examples: ["clear position", "relevant examples"]
        },
        coherence: {
          score: 6.5,
          band: 6.5,
          criteria: ["logical organization"],
          explanation: "Well organized with clear progression",
          examples: ["effective paragraphs", "good transitions"]
        },
        lexical: {
          score: 6.5,
          band: 6.5,
          criteria: ["adequate vocabulary"],
          explanation: "Good range of vocabulary",
          examples: ["appropriate word choice", "some advanced words"]
        },
        grammar: {
          score: 6.5,
          band: 6.5,
          criteria: ["good grammar control"],
          explanation: "Generally accurate with some minor errors",
          examples: ["varied sentence structures", "mostly accurate"]
        }
      },
      feedback: {
        strengths: ["Clear structure", "Good vocabulary", "Relevant examples"],
        weaknesses: ["Could improve sentence variety", "Some minor grammar issues"],
        suggestions: ["Use more complex sentences", "Add more specific examples"]
      },
      sentences: []
    };
  }
}