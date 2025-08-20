export interface TopicRelevanceResult {
  isOnTopic: boolean;
  relevanceScore: number; // 0-100
  topicKeywords: string[];
  essayKeywords: string[];
  missingKeywords: string[];
  relevanceExplanation: string;
  suggestedBand: number; // Adjusted band for task response
}

export interface TopicAnalysis {
  topic: string;
  expectedFocus: string[];
  keywords: string[];
  relatedConcepts: string[];
}

export class TopicRelevanceChecker {
  private static readonly TOPICS: Record<string, TopicAnalysis> = {
    'fast food and health': {
      topic: 'fast food and health',
      expectedFocus: ['fast food', 'health', 'nutrition', 'obesity', 'diet', 'health risks', 'convenience', 'lifestyle'],
      keywords: [
        'fast food', 'junk food', 'processed food', 'obesity', 'overweight', 'diabetes', 'heart disease',
        'nutrition', 'calories', 'fat', 'sugar', 'salt', 'health risks', 'convenience', 'lifestyle',
        'healthy eating', 'balanced diet', 'nutrients', 'cholesterol', 'blood pressure'
      ],
      relatedConcepts: [
        'health consequences', 'nutritional value', 'eating habits', 'food industry', 'public health',
        'consumer choice', 'advertising', 'children and fast food', 'addiction', 'economic factors'
      ]
    },
    'online shopping vs traditional stores': {
      topic: 'online shopping vs traditional stores',
      expectedFocus: ['online shopping', 'traditional stores', 'e-commerce', 'retail', 'consumer behavior'],
      keywords: [
        'online shopping', 'e-commerce', 'traditional stores', 'physical stores', 'retail', 'convenience',
        'price comparison', 'variety', 'customer experience', 'touch and feel', 'social interaction',
        'local businesses', 'delivery', 'returns', 'digital platforms'
      ],
      relatedConcepts: [
        'consumer behavior', 'retail trends', 'technology impact', 'local economy', 'shopping experience'
      ]
    },
    'technology in education': {
      topic: 'technology in education',
      expectedFocus: ['technology', 'education', 'learning', 'digital tools', 'teaching methods'],
      keywords: [
        'technology', 'education', 'digital learning', 'online learning', 'e-learning', 'digital tools',
        'teaching methods', 'student engagement', 'accessibility', 'remote learning', 'educational apps',
        'interactive learning', 'personalized learning', 'digital divide', 'screen time'
      ],
      relatedConcepts: [
        'educational outcomes', 'teacher training', 'infrastructure', 'digital literacy', 'cost benefits'
      ]
    }
  };

  static checkRelevance(essayContent: string, taskTitle: string): TopicRelevanceResult {
    const essayText = essayContent.toLowerCase();
    const taskLower = taskTitle.toLowerCase();
    
    // Find matching topic
    const matchingTopic = this.findMatchingTopic(taskLower);
    if (!matchingTopic) {
      return {
        isOnTopic: true, // If no specific topic found, assume it's on topic
        relevanceScore: 70,
        topicKeywords: [],
        essayKeywords: [],
        missingKeywords: [],
        relevanceExplanation: "通用主题，按标准评分",
        suggestedBand: 7.0
      };
    }

    // Extract keywords from essay
    const essayKeywords = this.extractKeywords(essayText, matchingTopic.keywords);
    const topicKeywords = matchingTopic.keywords;
    const missingKeywords = topicKeywords.filter(keyword => 
      !essayKeywords.some(essayKeyword => essayKeyword.includes(keyword) || keyword.includes(essayKeyword))
    );

    // Calculate relevance score
    const relevanceScore = this.calculateRelevanceScore(essayKeywords, topicKeywords, essayText, matchingTopic);
    
    // Determine if essay is on topic
    const isOnTopic = relevanceScore >= 40;
    
    // Adjust band based on relevance
    const suggestedBand = this.adjustBandForRelevance(relevanceScore);

    return {
      isOnTopic,
      relevanceScore,
      topicKeywords: topicKeywords,
      essayKeywords: essayKeywords,
      missingKeywords: missingKeywords.slice(0, 5), // Top 5 missing keywords
      relevanceExplanation: this.generateRelevanceExplanation(relevanceScore, missingKeywords),
      suggestedBand
    };
  }

  private static findMatchingTopic(taskTitle: string): TopicAnalysis | null {
    for (const [key, topic] of Object.entries(this.TOPICS)) {
      if (taskTitle.includes(key) || key.includes(taskTitle)) {
        return topic;
      }
    }
    return null;
  }

  private static extractKeywords(text: string, keywords: string[]): string[] {
    return keywords.filter(keyword => 
      text.includes(keyword.toLowerCase()) || 
      text.includes(keyword.replace(' ', ''))
    );
  }

  private static calculateRelevanceScore(
    essayKeywords: string[], 
    topicKeywords: string[], 
    essayText: string,
    topic: TopicAnalysis
  ): number {
    let score = 0;
    
    // Keyword matching (40%)
    const keywordMatchScore = (essayKeywords.length / topicKeywords.length) * 40;
    score += keywordMatchScore;
    
    // Topic focus detection (30%)
    const topicFocusScore = this.calculateTopicFocusScore(essayText, topic);
    score += topicFocusScore;
    
    // Related concepts (20%)
    const relatedConceptScore = this.calculateRelatedConceptScore(essayText, topic);
    score += relatedConceptScore;
    
    // Overall relevance (10%)
    const overallRelevanceScore = this.calculateOverallRelevance(essayText, topic);
    score += overallRelevanceScore;
    
    return Math.min(100, Math.max(0, score));
  }

  private static calculateTopicFocusScore(text: string, topic: TopicAnalysis): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let relevantSentences = 0;
    
    for (const sentence of sentences) {
      const lowerSentence = sentence.toLowerCase();
      const hasTopicKeyword = topic.keywords.some(keyword => lowerSentence.includes(keyword));
      const hasRelatedConcept = topic.relatedConcepts.some(concept => lowerSentence.includes(concept));
      
      if (hasTopicKeyword || hasRelatedConcept) {
        relevantSentences++;
      }
    }
    
    return (relevantSentences / sentences.length) * 30;
  }

  private static calculateRelatedConceptScore(text: string, topic: TopicAnalysis): number {
    const matchedConcepts = topic.relatedConcepts.filter(concept => 
      text.includes(concept.toLowerCase())
    );
    
    return (matchedConcepts.length / topic.relatedConcepts.length) * 20;
  }

  private static calculateOverallRelevance(text: string, topic: TopicAnalysis): number {
    // Check if essay is discussing the actual topic vs a different one
    const textLower = text.toLowerCase();
    
    // If essay mentions a completely different topic, reduce score
    const offTopicIndicators = {
      'fast food and health': ['online shopping', 'e-commerce', 'traditional stores', 'retail', 'digital'],
      'online shopping vs traditional stores': ['fast food', 'health', 'nutrition', 'obesity', 'diet'],
      'technology in education': ['shopping', 'retail', 'consumer', 'health', 'nutrition']
    };
    
    const indicators = offTopicIndicators[topic.topic as keyof typeof offTopicIndicators] || [];
    const offTopicMatches = indicators.filter(indicator => textLower.includes(indicator));
    
    if (offTopicMatches.length > 0) {
      return Math.max(0, 10 - (offTopicMatches.length * 5));
    }
    
    return 10;
  }

  private static adjustBandForRelevance(relevanceScore: number): number {
    if (relevanceScore >= 80) return 7.0; // Fully on topic
    if (relevanceScore >= 60) return 6.0; // Mostly on topic
    if (relevanceScore >= 40) return 5.0; // Partially on topic
    if (relevanceScore >= 20) return 4.0; // Minimally on topic
    return 3.0; // Completely off topic
  }

  private static generateRelevanceExplanation(
    relevanceScore: number, 
    missingKeywords: string[]
  ): string {
    if (relevanceScore >= 80) {
      return "作文完全切题，围绕主题展开讨论";
    } else if (relevanceScore >= 60) {
      return "作文基本切题，但部分讨论可能偏离主题";
    } else if (relevanceScore >= 40) {
      return "作文部分切题，缺少关键主题的讨论";
    } else if (relevanceScore >= 20) {
      return "作文轻微切题，大部分内容与主题无关";
    } else {
      const missingStr = missingKeywords.slice(0, 3).join('、');
      return `作文完全偏题，缺少对"${missingStr}"等关键概念的讨论`;
    }
  }
}