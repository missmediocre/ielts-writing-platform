import type { IELTSWriting, IELTSScore } from '../types/ielts';
import { TopicRelevanceChecker } from './topicRelevanceChecker';

export class EnhancedScoringService {
  static async scoreEssay(essay: IELTSWriting, taskTitle: string): Promise<IELTSScore> {
    // Check topic relevance
    const relevance = TopicRelevanceChecker.checkRelevance(essay.content, taskTitle);
    
    // Get the base score from AI (this would be your existing scoring)
    const baseScore = await this.getBaseScore(essay);
    
    // Adjust based on topic relevance
    const adjustedScore = this.adjustScoreForRelevance(baseScore, relevance);
    
    // Add relevance feedback to the score
    adjustedScore.dimensions.taskResponse.band = relevance.suggestedBand;
    adjustedScore.dimensions.taskResponse.explanation = relevance.relevanceExplanation;
    
    // Add relevance-specific feedback
    if (!adjustedScore.feedback.weaknesses) {
      adjustedScore.feedback.weaknesses = [];
    }
    if (!adjustedScore.feedback.suggestions) {
      adjustedScore.feedback.suggestions = [];
    }
    adjustedScore.feedback.weaknesses.push(...this.generateRelevanceFeedback(relevance));
    adjustedScore.feedback.suggestions.push(...this.generateRelevanceSuggestions(relevance));
    
    return adjustedScore;
  }

  private static async getBaseScore(essay: IELTSWriting): Promise<IELTSScore> {
    // Generate a realistic score based on essay characteristics
    const wordCount = essay.wordCount;
    const content = essay.content.toLowerCase();
    
    // Simple scoring algorithm based on content analysis
    let baseBand = 6.0;
    
    // Word count impact
    if (wordCount >= 250) baseBand += 0.5;
    if (wordCount < 150) baseBand -= 1.0;
    
    // Vocabulary diversity
    const words = content.split(/\s+/);
    const uniqueWords = new Set(words);
    const vocabularyRatio = uniqueWords.size / words.length;
    if (vocabularyRatio > 0.7) baseBand += 0.5;
    
    // Sentence complexity
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
    if (avgSentenceLength > 15) baseBand += 0.5;
    
    // Grammar indicators
    const grammarErrors = [
      /\b(is|are|was|were)\b.*\b(is|are|was|were)\b/i, // double verbs
      /\b(more)\s+(better|worse|higher|lower)\b/i, // double comparatives
      /\b(very)\s+(very|extremely|really)\b/i // redundancy
    ].filter(regex => regex.test(content)).length;
    
    baseBand -= Math.min(1.5, grammarErrors * 0.5);
    
    // Ensure score is within valid range
    baseBand = Math.max(3.0, Math.min(8.0, baseBand));
    baseBand = Math.round(baseBand * 2) / 2; // Round to nearest 0.5
    
    return {
      overall: {
        score: baseBand,
        band: baseBand
      },
      dimensions: {
        taskResponse: {
          score: baseBand,
          band: baseBand,
          criteria: ["addresses task requirements", "presents relevant ideas"],
          explanation: baseBand >= 7.0 ? 
            "Addresses all parts of the task with relevant, extended and supported ideas" :
            baseBand >= 6.0 ? 
            "Addresses all parts of the task although some parts may be more fully covered than others" :
            "Addresses the task only partially",
          examples: baseBand >= 7.0 ? ["clear position throughout", "well-developed arguments"] : ["relevant examples", "some development"]
        },
        coherence: {
          score: baseBand,
          band: baseBand,
          criteria: ["logical organization", "cohesive devices"],
          explanation: baseBand >= 7.0 ? 
            "Logically organizes information and ideas; there is clear progression throughout" :
            baseBand >= 6.0 ? 
            "Arranges information and ideas coherently and there is a clear overall progression" :
            "Information and ideas are generally arranged coherently",
          examples: baseBand >= 7.0 ? ["clear progression", "effective linking"] : ["generally clear", "some linking words"]
        },
        lexical: {
          score: baseBand,
          band: baseBand,
          criteria: ["vocabulary range", "accuracy"],
          explanation: baseBand >= 7.0 ? 
            "Uses a sufficient range of vocabulary to allow some flexibility and precision" :
            baseBand >= 6.0 ? 
            "Uses an adequate range of vocabulary for the task" :
            "Uses a limited range of vocabulary",
          examples: baseBand >= 7.0 ? ["some less common vocabulary", "awareness of style"] : ["generally appropriate", "some repetition"]
        },
        grammar: {
          score: baseBand,
          band: baseBand,
          criteria: ["range of structures", "accuracy"],
          explanation: baseBand >= 7.0 ? 
            "Uses a variety of complex structures with frequent error-free sentences" :
            baseBand >= 6.0 ? 
            "Uses a mix of simple and complex sentence forms" :
            "Uses only a limited range of structures",
          examples: baseBand >= 7.0 ? ["complex sentences", "good control"] : ["some complex sentences", "generally accurate"]
        }
      },
      feedback: {
        strengths: this.getStrengths(baseBand, essay.content),
        weaknesses: this.getWeaknesses(baseBand, essay.content),
        suggestions: this.getSuggestions(baseBand, essay.content)
      },
      sentences: []
    };
  }

  private static getStrengths(band: number, _content: string): string[] {
    const strengths = [];
    if (band >= 6.0) {
      strengths.push("清晰的作文结构");
      strengths.push("论点表达清楚");
    }
    if (band >= 7.0) {
      strengths.push("词汇使用准确");
      strengths.push("语法控制良好");
    }
    return strengths;
  }

  private static getWeaknesses(band: number, _content: string): string[] {
    const weaknesses = [];
    if (band < 7.0) {
      weaknesses.push("词汇多样性有待提高");
      weaknesses.push("句型变化可以更丰富");
    }
    if (band < 6.0) {
      weaknesses.push("论证深度需要加强");
      weaknesses.push("连接词使用可以改进");
    }
    return weaknesses;
  }

  private static getSuggestions(band: number, _content: string): string[] {
    const suggestions = [];
    if (band < 7.5) {
      suggestions.push("使用更多高级词汇替换基础词汇");
      suggestions.push("增加复杂句型的使用");
      suggestions.push("添加具体例子支持论点");
    }
    return suggestions;
  }

  private static adjustScoreForRelevance(
    baseScore: IELTSScore, 
    relevance: import('./topicRelevanceChecker').TopicRelevanceResult
  ): IELTSScore {
    const adjusted = { ...baseScore };
    
    // Adjust task response based on relevance
    adjusted.dimensions.taskResponse.band = relevance.suggestedBand;
    adjusted.dimensions.taskResponse.explanation = relevance.relevanceExplanation;
    
    // Recalculate overall score
    const dimensions = adjusted.dimensions;
    const newOverall = (
      relevance.suggestedBand + 
      dimensions.coherence.band + 
      dimensions.lexical.band + 
      dimensions.grammar.band
    ) / 4;
    
    adjusted.overall.band = Math.round(newOverall * 2) / 2; // Round to nearest 0.5
    adjusted.overall.score = adjusted.overall.band;
    
    return adjusted;
  }

  private static generateRelevanceFeedback(
    relevance: import('./topicRelevanceChecker').TopicRelevanceResult
  ): string[] {
    const feedback: string[] = [];
    
    if (!relevance.isOnTopic) {
      feedback.push(`作文主题偏离，未能正确回应题目要求`);
    }
    
    if (relevance.missingKeywords.length > 0) {
      feedback.push(`缺少关键概念: ${relevance.missingKeywords.slice(0, 3).join('、')}`);
    }
    
    return feedback;
  }

  private static generateRelevanceSuggestions(
    relevance: import('./topicRelevanceChecker').TopicRelevanceResult
  ): string[] {
    const suggestions: string[] = [];
    
    if (!relevance.isOnTopic) {
      suggestions.push("确保作文内容完全围绕给定主题展开");
      suggestions.push("仔细阅读题目要求，明确讨论重点");
    }
    
    if (relevance.missingKeywords.length > 0) {
      suggestions.push(`在作文中加入对"${relevance.missingKeywords[0]}"等概念的讨论`);
    }
    
    return suggestions;
  }
}

// Test function for the off-topic essay
export async function testOffTopicDetection() {
  const offTopicEssay = {
    id: 'test-off-topic',
    userId: 'test-user',
    taskId: 'task-006',
    content: `In recent years, online shopping has developed rapidly and is becoming a preferred choice for many consumers. Some people argue that traditional shops will soon vanish due to this trend. While I agree that online shopping is gaining popularity, I do not believe that physical stores will completely disappear in the near future.

There are several reasons why online shopping has become so widespread. First, it offers great convenience. People can buy goods at any time without leaving their homes, which saves time and energy. Second, online platforms often offer more variety and better prices than traditional stores. Customers can compare prices easily and read reviews before making a decision. This helps them make more informed choices.

However, traditional shops still have advantages that online platforms cannot fully replace. For example, in physical stores, customers can touch and try the products before buying. This is especially important for clothes, shoes, and fresh food. Also, shopping in a real store can be a social activity. Some people enjoy walking in malls or talking to staff, which creates a more personal experience.

Moreover, some services, like hair salons, repair shops, and grocery stores, cannot be moved entirely online. These businesses rely on in-person interaction and local presence, which ensures they will continue to exist.

In conclusion, although online shopping will likely continue to grow, I believe that traditional stores still have a place in our lives. Rather than disappearing, they may change their role and work together with online platforms to meet different customer needs.`,
    wordCount: 298,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await EnhancedScoringService.scoreEssay(offTopicEssay, "fast food and health");
  return result;
}