import type { IELTSWriting, IELTSScore } from '../types/ielts';

// Official IELTS Writing Task 2 Scoring Standards
export const IELTSScoringStandards = [
  {
    category: "Task Response",
    bands: [
      { band: 9, en: "Fully addresses all parts of the task. Presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas.", zh: "完全回应所有任务要求，观点发展充分，论证有力。" },
      { band: 8, en: "Covers all parts of the task. Presents a well-developed response to the question with relevant, extended and supported ideas.", zh: "覆盖所有任务点，回应完整，支持充分。" },
      { band: 7, en: "Addresses all parts of the task. Presents a clear position throughout the response. Presents, extends and supports main ideas, but there may be a tendency to overgeneralise and/or supporting ideas may lack focus.", zh: "回应完整，立场清晰，观点支持较好，可能略泛化或不够集中。" },
      { band: 6, en: "Addresses all parts of the task although some parts may be more fully covered than others. Presents a relevant position although the conclusions may become unclear or repetitive. Presents relevant main ideas but some may be inadequately developed/unclear.", zh: "回应基本完整，个别部分展开不足，立场偶有不清，支持略弱。" },
      { band: 5, en: "Addresses the task only partially; the format may be inappropriate in places. Expresses a position but the development is not always clear and there may be no conclusions drawn. Presents some main ideas but these are limited and not sufficiently developed; there may be irrelevant detail.", zh: "只回应部分内容，发展不足，论点零散，有不相关内容。" },
      { band: 4, en: "Responds to the task only in a minimal way or the answer is tangential; the format may be inappropriate. Presents a position but this is unclear. Presents some main ideas but these are difficult to identify and may be repetitive, irrelevant or not well supported.", zh: "回应极少，内容偏题，论点不清或无力支持。" },
      { band: 3, en: "Does not adequately address any part of the task. Does not express a clear position. Presents few ideas, which are largely undeveloped or irrelevant.", zh: "几乎没有回应，观点不清，内容基本无关。" },
      { band: 2, en: "Barely responds to the task. Expresses a position but this is unclear. Presents few ideas, which are largely undeveloped or irrelevant.", zh: "几乎没有回应任务，观点模糊，内容基本无关。" },
      { band: 1, en: "Answer is completely unrelated to the task.", zh: "完全偏题。" },
      { band: 0, en: "No assessable language.", zh: "无语言可评估。" }
    ]
  },
  {
    category: "Coherence and Cohesion",
    bands: [
      { band: 9, en: "Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.", zh: "衔接自然不显痕迹，段落组织出色。" },
      { band: 8, en: "Sequences information and ideas logically. Manages all aspects of cohesion well. Uses paragraphing sufficiently and appropriately.", zh: "信息顺序合理，衔接良好，段落使用恰当。" },
      { band: 7, en: "Logically organises information and ideas; there is clear progression throughout. Uses a range of cohesive devices appropriately although there may be some under-/over-use. Presents a clear central topic within each paragraph.", zh: "逻辑清晰，使用连接手段得当，段落结构合理。" },
      { band: 6, en: "Arranges information and ideas coherently and there is a clear overall progression. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical. May not always use referencing clearly or appropriately. Uses paragraphing, but not always logically.", zh: "组织较清晰，连接手段存在瑕疵，段落有时不合理。" },
      { band: 5, en: "Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or overuse of cohesive devices. May be repetitive because of lack of referencing and substitution. May not write in paragraphs, or paragraphing may be inadequate.", zh: "信息组织弱，连接手段有限或重复，段落使用不当。" },
      { band: 4, en: "Presents information and ideas but these are not arranged coherently and there is no clear progression in the response. Uses some basic cohesive devices but these may be inaccurate or repetitive. May not write in paragraphs or their use may be confusing.", zh: "信息无逻辑，连接重复或错误，段落混乱。" },
      { band: 3, en: "Does not organise ideas logically. May use a very limited range of cohesive devices, and those used may not indicate a logical relationship between ideas.", zh: "组织极差，连接手段非常有限或无逻辑。" },
      { band: 2, en: "Has very little control of organisational features.", zh: "几乎没有组织结构。" },
      { band: 1, en: "Fails to communicate any message.", zh: "未能传达任何信息。" },
      { band: 0, en: "No assessable language.", zh: "无语言可评估。" }
    ]
  },
  {
    category: "Lexical Resource",
    bands: [
      { band: 9, en: "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'.", zh: "词汇广泛，使用自然，仅偶有小错误。" },
      { band: 8, en: "Uses a wide range of vocabulary fluently and flexibly to convey precise meaning. Skilfully uses uncommon lexical items but there may be occasional inaccuracies.", zh: "词汇丰富，用词准确流畅，仅偶有不当。" },
      { band: 7, en: "Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation. May produce occasional errors.", zh: "词汇量够大，有一定变化，少量用词错误。" },
      { band: 6, en: "Uses an adequate range of vocabulary. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation, but they do not impede communication.", zh: "词汇基本够用，尝试使用复杂词但有错误。" },
      { band: 5, en: "Uses a limited range of vocabulary. May make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.", zh: "词汇量有限，拼写/构词错误影响理解。" },
      { band: 4, en: "Uses only basic vocabulary which may be repetitive or inappropriate. Has limited control of word formation and/or spelling.", zh: "只用基础词汇，重复多，错误多。" },
      { band: 3, en: "Uses only a very limited range of words. Errors are frequent and may severely distort the message.", zh: "词汇极少，错误严重影响表达。" },
      { band: 2, en: "Has very limited control of lexical items.", zh: "几乎不会正确使用词汇。" },
      { band: 1, en: "Can only use a few isolated words.", zh: "只能用几个孤立的词。" },
      { band: 0, en: "No assessable language.", zh: "无语言可评估。" }
    ]
  },
  {
    category: "Grammatical Range and Accuracy",
    bands: [
      { band: 9, en: "Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as slips.", zh: "结构多样，语法几无误，仅偶有小错误。" },
      { band: 8, en: "Uses a wide range of structures. The majority of sentences are error-free. Makes only very occasional errors or inappropriacies.", zh: "句型丰富，多数句子无误，仅偶有不当。" },
      { band: 7, en: "Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.", zh: "结构多样，很多句子无误，偶有语法问题。" },
      { band: 6, en: "Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.", zh: "简单句与复杂句混合使用，有些语法错误但不影响理解。" },
      { band: 5, en: "Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate. Makes frequent errors that can cause some difficulty.", zh: "句型有限，复杂句不准确，错误多影响理解。" },
      { band: 4, en: "Uses only a very limited range of structures. Some structures are accurate but errors predominate. Punctuation is often faulty.", zh: "句型极其有限，错误频繁，标点使用不当。" },
      { band: 3, en: "Attempts sentence forms but errors predominate and distort the meaning.", zh: "尝试写句子但错误过多，严重影响意思表达。" },
      { band: 2, en: "Cannot use sentence forms except in memorised phrases.", zh: "除了背诵句子外不会写句。" },
      { band: 1, en: "Cannot use sentence forms at all.", zh: "完全不会写句子。" },
      { band: 0, en: "No assessable language.", zh: "无语言可评估。" }
    ]
  }
] as const;

// Scoring criteria for each dimension
interface ScoringCriteria {
  taskResponse: {
    taskCoverage: number; // 0-9: how well parts are addressed
    positionClarity: number; // 0-9: clarity and consistency of position
    ideaDevelopment: number; // 0-9: development and support of ideas
    relevance: number; // 0-9: relevance to task
  };
  coherence: {
    logicalFlow: number; // 0-9: logical progression of ideas
    cohesion: number; // 0-9: use of cohesive devices
    paragraphing: number; // 0-9: effective paragraphing
    centralTopic: number; // 0-9: clear central topic per paragraph
  };
  lexical: {
    range: number; // 0-9: vocabulary range
    precision: number; // 0-9: precise meaning conveyance
    lessCommon: number; // 0-9: use of less common items
    spelling: number; // 0-9: spelling and word formation
  };
  grammar: {
    range: number; // 0-9: range of structures
    accuracy: number; // 0-9: grammatical accuracy
    complexity: number; // 0-9: use of complex structures
    punctuation: number; // 0-9: punctuation accuracy
  };
}

// Helper function to get band description
export function getBandDescription(category: string, band: number): { en: string; zh: string } {
  const categoryData = IELTSScoringStandards.find(c => c.category === category);
  const bandData = categoryData?.bands.find(b => b.band === Math.floor(band));
  return bandData || { en: "No description available", zh: "无描述可用" };
}

// Calculate band score based on criteria
export function calculateBandScore(criteria: number[]): number {
  const average = criteria.reduce((sum, score) => sum + score, 0) / criteria.length;
  
  // Convert to IELTS band scale (0-9)
  return Math.round(average * 10) / 10;
}

// Analyze essay based on official criteria
export class OfficialIELTSScoringEngine {
  static analyzeEssay(essay: IELTSWriting, taskTitle: string): {
    scores: ScoringCriteria;
    overall: number;
    feedback: {
      taskResponse: string[];
      coherence: string[];
      lexical: string[];
      grammar: string[];
    };
  } {
    const content = essay.content;
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Task Response Analysis
    const taskResponseScores = this.analyzeTaskResponse(content, taskTitle, wordCount);
    
    // Coherence and Cohesion Analysis
    const coherenceScores = this.analyzeCoherence(content, paragraphs, sentences);
    
    // Lexical Resource Analysis
    const lexicalScores = this.analyzeLexical(content, wordCount);
    
    // Grammatical Range and Accuracy Analysis
    const grammarScores = this.analyzeGrammar(content, sentences);

    const overall = calculateBandScore([
      ...Object.values(taskResponseScores),
      ...Object.values(coherenceScores),
      ...Object.values(lexicalScores),
      ...Object.values(grammarScores)
    ]);

    const feedback = this.generateFeedback(taskResponseScores, coherenceScores, lexicalScores, grammarScores);

    return {
      scores: {
        taskResponse: taskResponseScores,
        coherence: coherenceScores,
        lexical: lexicalScores,
        grammar: grammarScores
      },
      overall,
      feedback
    };
  }

  private static analyzeTaskResponse(content: string, taskTitle: string, wordCount: number): ScoringCriteria['taskResponse'] {
    // Check task coverage
    const taskCoverage = this.assessTaskCoverage(content, taskTitle);
    
    // Check position clarity
    const positionClarity = this.assessPositionClarity(content);
    
    // Check idea development
    const ideaDevelopment = this.assessIdeaDevelopment(content, wordCount);
    
    // Check relevance
    const relevance = this.assessRelevance(content, taskTitle);

    return { taskCoverage, positionClarity, ideaDevelopment, relevance };
  }

  private static analyzeCoherence(content: string, paragraphs: string[], sentences: string[]): ScoringCriteria['coherence'] {
    // Check logical flow
    const logicalFlow = this.assessLogicalFlow(content, paragraphs);
    
    // Check cohesion devices
    const cohesion = this.assessCohesion(content, sentences);
    
    // Check paragraphing
    const paragraphing = this.assessParagraphing(paragraphs);
    
    // Check central topic
    const centralTopic = this.assessCentralTopic(paragraphs);

    return { logicalFlow, cohesion, paragraphing, centralTopic };
  }

  private static analyzeLexical(content: string, _wordCount: number): ScoringCriteria['lexical'] {
    const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(words);
    
    // Vocabulary range
    const range = Math.min(9, uniqueWords.size / 50);
    
    // Precision (based on context and word choice)
    const precision = this.assessWordPrecision(words);
    
    // Less common words usage
    const lessCommon = this.assessLessCommonWords(words);
    
    // Spelling accuracy
    const spelling = this.assessSpelling(words);

    return { range, precision, lessCommon, spelling };
  }

  private static analyzeGrammar(content: string, sentences: string[]): ScoringCriteria['grammar'] {
    // Range of structures
    const range = this.assessStructureRange(sentences);
    
    // Accuracy
    const accuracy = this.assessGrammarAccuracy(content, sentences);
    
    // Complexity
    const complexity = this.assessComplexity(sentences);
    
    // Punctuation
    const punctuation = this.assessPunctuation(content);

    return { range, accuracy, complexity, punctuation };
  }

  // Assessment methods for each criterion
  private static assessTaskCoverage(content: string, taskTitle: string): number {
    const lowerContent = content.toLowerCase();
    const taskKeywords = taskTitle.toLowerCase().split(' ');
    
    let score = 5; // Base score
    
    // Check if all parts of task are addressed
    const partsAddressed = taskKeywords.filter(keyword => 
      lowerContent.includes(keyword) || this.isSynonymUsed(lowerContent, keyword)
    ).length;
    
    score += (partsAddressed / taskKeywords.length) * 4;
    
    return Math.min(9, score);
  }

  private static assessPositionClarity(content: string): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const firstSentence = sentences[0] || '';
    
    let score = 5;
    
    // Check for clear thesis statement
    if (firstSentence.includes('I believe') || firstSentence.includes('In my opinion') || 
        firstSentence.includes('I think') || /\b(?:agree|disagree|support|oppose)\b/i.test(firstSentence)) {
      score += 2;
    }
    
    // Check consistency throughout
    const positionWords = sentences.filter(s => 
      /\b(?:believe|think|agree|disagree|support|oppose)\b/i.test(s)
    ).length;
    
    if (positionWords > 2) score += 2;
    
    return Math.min(9, score);
  }

  private static assessIdeaDevelopment(content: string, _wordCount: number): number {
    let score = 4;
    
    // Word count impact (using content length as proxy)
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount >= 250) score += 2;
    else if (wordCount >= 200) score += 1;
    else if (wordCount < 150) score -= 1;
    
    // Examples and evidence
    const examples = (content.match(/\b(?:for example|for instance|such as|like)\b/gi) || []).length;
    if (examples >= 2) score += 2;
    else if (examples >= 1) score += 1;
    
    // Supporting details
    const supportingWords = (content.match(/\b(?:because|since|therefore|thus|hence)\b/gi) || []).length;
    if (supportingWords >= 3) score += 1;
    
    return Math.max(0, Math.min(9, score));
  }

  private static assessRelevance(content: string, taskTitle: string): number {
    const lowerContent = content.toLowerCase();
    const taskWords = taskTitle.toLowerCase().split(' ').filter(w => w.length > 3);
    
    const relevantWords = taskWords.filter(word => 
      lowerContent.includes(word) || this.isSynonymUsed(lowerContent, word)
    ).length;
    
    return Math.min(9, (relevantWords / taskWords.length) * 9);
  }

  private static assessLogicalFlow(_content: string, paragraphs: string[]): number {
    if (paragraphs.length < 3) return 4;
    
    let score = 6;
    
    // Check introduction, body, conclusion structure
    if (paragraphs.length >= 3) score += 1;
    if (paragraphs.length >= 4) score += 1;
    
    return Math.min(9, score);
  }

  private static assessCohesion(content: string, _sentences: string[]): number {
    const cohesiveDevices = [
      'however', 'therefore', 'moreover', 'furthermore', 'in addition',
      'on the other hand', 'consequently', 'as a result', 'for example',
      'for instance', 'such as', 'like', 'similarly', 'in contrast'
    ];
    
    const found = cohesiveDevices.filter(device => 
      content.toLowerCase().includes(device)
    ).length;
    
    return Math.min(9, 4 + found);
  }

  private static assessParagraphing(paragraphs: string[]): number {
    if (paragraphs.length < 3) return 3;
    if (paragraphs.length > 5) return 7;
    return 6 + (paragraphs.length - 3);
  }

  private static assessCentralTopic(paragraphs: string[]): number {
    const scores = paragraphs.map(p => {
      const words = p.split(' ').length;
      return words > 50 ? 7 : words > 30 ? 6 : 5;
    });
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  private static assessWordPrecision(words: string[]): number {
    const basicWords = ['good', 'bad', 'nice', 'thing', 'stuff', 'get', 'make', 'do'];
    const basicCount = words.filter(w => basicWords.includes(w)).length;
    
    return Math.max(4, 9 - (basicCount / 10));
  }

  private static assessLessCommonWords(words: string[]): number {
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'under', 'over', 'inside', 'outside', 'behind', 'beside', 'near', 'across', 'along', 'around', 'toward', 'away', 'back', 'forward', 'out', 'off', 'down', 'up', 'again', 'also', 'always', 'usually', 'often', 'sometimes', 'never', 'ever', 'already', 'just', 'still', 'yet', 'very', 'really', 'quite', 'rather', 'pretty', 'fairly', 'extremely', 'absolutely', 'completely', 'totally', 'entirely', 'really', 'actually', 'basically', 'generally', 'specifically', 'particularly', 'especially', 'mainly', 'mostly', 'largely', 'primarily', 'principally', 'chiefly', 'predominantly']);
    
    const advancedWords = words.filter(w => !commonWords.has(w) && w.length > 6);
    
    return Math.min(9, 4 + (advancedWords.length / 20));
  }

  private static assessSpelling(words: string[]): number {
    // Simple spelling check - in real implementation would use spell checker
    const errors = words.filter(w => w.length > 4 && !/^[a-z]+$/i.test(w)).length;
    return Math.max(5, 9 - (errors / 10));
  }

  private static assessStructureRange(sentences: string[]): number {
    const complexSentences = sentences.filter(s => s.includes(',') || s.includes(';') || s.split(' ').length > 15).length;
    
    const ratio = complexSentences / sentences.length;
    
    if (ratio > 0.6) return 8;
    if (ratio > 0.4) return 7;
    if (ratio > 0.2) return 6;
    return 5;
  }

  private static assessGrammarAccuracy(_content: string, sentences: string[]): number {
    // Simplified grammar check
    const errors = 0; // Placeholder for actual grammar checking
    const accuracy = Math.max(0.7, 1 - (errors / sentences.length));
    
    return Math.min(9, 5 + (accuracy * 4));
  }

  private static assessComplexity(sentences: string[]): number {
    const avgLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
    
    if (avgLength > 20) return 8;
    if (avgLength > 15) return 7;
    if (avgLength > 12) return 6;
    return 5;
  }

  private static assessPunctuation(content: string): number {
    const punctuation = (content.match(/[,.!?;:]/g) || []).length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const ratio = punctuation / sentences.length;
    
    if (ratio > 2) return 8;
    if (ratio > 1.5) return 7;
    if (ratio > 1) return 6;
    return 5;
  }

  private static isSynonymUsed(content: string, word: string): boolean {
    const synonyms: Record<string, string[]> = {
      'important': ['crucial', 'essential', 'vital', 'significant', 'critical'],
      'good': ['beneficial', 'advantageous', 'positive', 'favorable', 'excellent'],
      'bad': ['detrimental', 'harmful', 'negative', 'adverse', 'disadvantageous'],
      'many': ['numerous', 'various', 'diverse', 'multiple', 'countless'],
      'think': ['believe', 'consider', 'argue', 'maintain', 'assert']
    };
    
    const wordSynonyms = synonyms[word.toLowerCase()] || [];
    return wordSynonyms.some(synonym => content.toLowerCase().includes(synonym));
  }

  private static generateFeedback(
    taskResponse: ScoringCriteria['taskResponse'],
    coherence: ScoringCriteria['coherence'],
    lexical: ScoringCriteria['lexical'],
    grammar: ScoringCriteria['grammar']
  ) {
    const feedback = {
      taskResponse: this.generateDimensionFeedback('Task Response', taskResponse),
      coherence: this.generateDimensionFeedback('Coherence and Cohesion', coherence),
      lexical: this.generateDimensionFeedback('Lexical Resource', lexical),
      grammar: this.generateDimensionFeedback('Grammatical Range and Accuracy', grammar)
    };

    return feedback;
  }

  private static generateDimensionFeedback(category: string, scores: any): string[] {
    const values = Object.values(scores) as number[];
    values.reduce((sum: number, score: number) => sum + score, 0) / values.length;
    
    const feedback: string[] = [];
    
    if (category === 'Task Response') {
      if (scores.taskCoverage < 6) feedback.push('需要更全面地回应题目要求');
      if (scores.positionClarity < 6) feedback.push('立场表达需要更清晰');
      if (scores.ideaDevelopment < 6) feedback.push('观点需要更充分的展开和支持');
    }
    
    if (category === 'Coherence and Cohesion') {
      if (scores.logicalFlow < 6) feedback.push('需要更清晰的逻辑发展');
      if (scores.cohesion < 6) feedback.push('需要更多样化的连接手段');
      if (scores.paragraphing < 6) feedback.push('段落组织需要改进');
    }
    
    if (category === 'Lexical Resource') {
      if (scores.range < 6) feedback.push('需要扩大词汇量');
      if (scores.precision < 6) feedback.push('用词需要更精准');
      if (scores.lessCommon < 6) feedback.push('尝试使用更多高级词汇');
    }
    
    if (category === 'Grammatical Range and Accuracy') {
      if (scores.range < 6) feedback.push('需要更多样化的句型结构');
      if (scores.accuracy < 6) feedback.push('需要提高语法准确性');
      if (scores.complexity < 6) feedback.push('尝试使用更复杂的句子结构');
    }
    
    return feedback.length > 0 ? feedback : ['表现良好，继续保持'];
  }
}

// Updated scoring service using official standards
export class OfficialScoringService {
  static async scoreEssayOfficially(essay: IELTSWriting, taskTitle: string): Promise<IELTSScore> {
    const analysis = OfficialIELTSScoringEngine.analyzeEssay(essay, taskTitle);
    
    const taskResponseScore = calculateBandScore(Object.values(analysis.scores.taskResponse));
    const coherenceScore = calculateBandScore(Object.values(analysis.scores.coherence));
    const lexicalScore = calculateBandScore(Object.values(analysis.scores.lexical));
    const grammarScore = calculateBandScore(Object.values(analysis.scores.grammar));
    
    const overall = (taskResponseScore + coherenceScore + lexicalScore + grammarScore) / 4;
    
    return {
      overall: {
        score: overall,
        band: overall
      },
      dimensions: {
        taskResponse: {
          score: taskResponseScore,
          band: taskResponseScore,
          criteria: [
            `任务回应: ${analysis.scores.taskResponse.taskCoverage.toFixed(1)}/9`,
            `立场清晰: ${analysis.scores.taskResponse.positionClarity.toFixed(1)}/9`,
            `观点发展: ${analysis.scores.taskResponse.ideaDevelopment.toFixed(1)}/9`,
            `内容相关: ${analysis.scores.taskResponse.relevance.toFixed(1)}/9`
          ],
          explanation: getBandDescription('Task Response', taskResponseScore).zh,
          examples: analysis.feedback.taskResponse
        },
        coherence: {
          score: coherenceScore,
          band: coherenceScore,
          criteria: [
            `逻辑发展: ${analysis.scores.coherence.logicalFlow.toFixed(1)}/9`,
            `衔接手段: ${analysis.scores.coherence.cohesion.toFixed(1)}/9`,
            `段落组织: ${analysis.scores.coherence.paragraphing.toFixed(1)}/9`,
            `主题明确: ${analysis.scores.coherence.centralTopic.toFixed(1)}/9`
          ],
          explanation: getBandDescription('Coherence and Cohesion', coherenceScore).zh,
          examples: analysis.feedback.coherence
        },
        lexical: {
          score: lexicalScore,
          band: lexicalScore,
          criteria: [
            `词汇范围: ${analysis.scores.lexical.range.toFixed(1)}/9`,
            `用词精准: ${analysis.scores.lexical.precision.toFixed(1)}/9`,
            `高级词汇: ${analysis.scores.lexical.lessCommon.toFixed(1)}/9`,
            `拼写正确: ${analysis.scores.lexical.spelling.toFixed(1)}/9`
          ],
          explanation: getBandDescription('Lexical Resource', lexicalScore).zh,
          examples: analysis.feedback.lexical
        },
        grammar: {
          score: grammarScore,
          band: grammarScore,
          criteria: [
            `结构多样: ${analysis.scores.grammar.range.toFixed(1)}/9`,
            `语法准确: ${analysis.scores.grammar.accuracy.toFixed(1)}/9`,
            `复杂句型: ${analysis.scores.grammar.complexity.toFixed(1)}/9`,
            `标点正确: ${analysis.scores.grammar.punctuation.toFixed(1)}/9`
          ],
          explanation: getBandDescription('Grammatical Range and Accuracy', grammarScore).zh,
          examples: analysis.feedback.grammar
        }
      },
      feedback: {
        strengths: this.identifyStrengths(analysis.scores),
        weaknesses: this.identifyWeaknesses(analysis.scores),
        suggestions: this.generateSuggestions(analysis.scores)
      },
      sentences: []
    };
  }

  private static identifyStrengths(scores: any): string[] {
    const strengths: string[] = [];
    
    if (scores.taskResponse?.taskCoverage >= 7) strengths.push('任务回应全面');
    if (scores.taskResponse?.positionClarity >= 7) strengths.push('立场表达清晰');
    if (scores.coherence?.logicalFlow >= 7) strengths.push('逻辑发展清晰');
    if (scores.lexical?.range >= 7) strengths.push('词汇使用丰富');
    if (scores.grammar?.range >= 7) strengths.push('句型结构多样');
    
    return strengths.length > 0 ? strengths : ['基础写作技能掌握较好'];
  }

  private static identifyWeaknesses(scores: any): string[] {
    const weaknesses: string[] = [];
    
    if (scores.taskResponse?.taskCoverage < 6) weaknesses.push('需要更全面地回应题目要求');
    if (scores.taskResponse?.ideaDevelopment < 6) weaknesses.push('观点需要更充分的展开');
    if (scores.coherence?.cohesion < 6) weaknesses.push('连接手段需要改进');
    if (scores.lexical?.precision < 6) weaknesses.push('用词需要更精准');
    if (scores.grammar?.accuracy < 6) weaknesses.push('语法准确性需要提高');
    
    return weaknesses;
  }

  private static generateSuggestions(_scores: any): string[] {
    const suggestions: string[] = [];
    
    suggestions.push('仔细分析题目要求，确保每个部分都得到回应');
    suggestions.push('使用具体的例子和证据支持观点');
    suggestions.push('多样化使用连接词和过渡手段');
    suggestions.push('扩大词汇量，使用更精准的词汇');
    suggestions.push('增加句子结构的多样性');
    suggestions.push('写完后检查语法和拼写错误');
    
    return suggestions;
  }
}