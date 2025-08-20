import type { IELTSWriting, IELTSScore } from '../types/ielts';

export class OfficialScoringService {
  static async scoreEssayOfficially(essay: IELTSWriting, _taskTitle: string): Promise<IELTSScore> {
    const wordCount = essay.content.split(/\s+/).filter(w => w.length > 0).length;
    
    // Simple scoring based on basic criteria
    let overallScore = 6.0;
    
    // Adjust based on word count
    if (wordCount < 150) overallScore -= 1.0;
    else if (wordCount < 200) overallScore -= 0.5;
    else if (wordCount >= 250) overallScore += 0.5;
    
    // Ensure score stays within bounds
    overallScore = Math.max(5.0, Math.min(9.0, overallScore));
    
    return {
      overall: {
        score: overallScore,
        band: overallScore
      },
      dimensions: {
        taskResponse: {
          score: overallScore,
          band: overallScore,
          criteria: ["addresses task requirements", "presents clear position"],
          explanation: "Basic task response scoring",
          examples: []
        },
        coherence: {
          score: overallScore,
          band: overallScore,
          criteria: ["logical organization", "clear progression"],
          explanation: "Basic coherence scoring",
          examples: []
        },
        lexical: {
          score: overallScore,
          band: overallScore,
          criteria: ["adequate vocabulary", "some variety"],
          explanation: "Basic lexical scoring",
          examples: []
        },
        grammar: {
          score: overallScore,
          band: overallScore,
          criteria: ["generally accurate", "some variety"],
          explanation: "Basic grammar scoring",
          examples: []
        }
      },
      feedback: {
        strengths: ["作文已提交", `字数: ${wordCount}`],
        weaknesses: ["可以添加更多具体例子"],
        suggestions: ["使用更多连接词", "增加词汇多样性"]
      },
      sentences: []
    };
  }
}