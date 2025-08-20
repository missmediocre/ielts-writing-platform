import type { IELTSScore, DimensionScore } from '../types/ielts';

export interface DetailedFeedbackData {
  overallExplanation: string;
  dimensionExplanations: {
    taskResponse: DimensionExplanation;
    coherence: DimensionExplanation;
    lexical: DimensionExplanation;
    grammar: DimensionExplanation;
  };
  improvementSuggestions: ImprovementSuggestions;
  nextSteps: string[];
}

export interface DimensionExplanation {
  score: number;
  band: number;
  criteriaMet: string[];
  criteriaMissing: string[];
  detailedExplanation: string;
  specificExamples: string[];
}

export interface ImprovementSuggestions {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

export class FeedbackGenerator {
  static generateDetailedFeedback(score: IELTSScore): DetailedFeedbackData {
    return {
      overallExplanation: this.generateOverallExplanation(score),
      dimensionExplanations: {
        taskResponse: this.generateTaskResponseExplanation(score.dimensions.taskResponse),
        coherence: this.generateCoherenceExplanation(score.dimensions.coherence),
        lexical: this.generateLexicalExplanation(score.dimensions.lexical),
        grammar: this.generateGrammarExplanation(score.dimensions.grammar),
      },
      improvementSuggestions: this.generateImprovementSuggestions(score),
      nextSteps: this.generateNextSteps(score),
    };
  }

  private static generateOverallExplanation(score: IELTSScore): string {
    const band = score.overall.band;
    
    if (band >= 8.0) {
      return "Excellent work! Your essay demonstrates advanced writing skills with very few minor errors. You're approaching native-level proficiency.";
    } else if (band >= 7.0) {
      return "Good job! Your essay shows strong writing ability with occasional minor errors. You're well-prepared for academic or professional contexts.";
    } else if (band >= 6.0) {
      return "Competent performance! Your essay meets the basic requirements but has some areas for improvement. Focus on the suggestions below to reach a higher band.";
    } else if (band >= 5.0) {
      return "Modest attempt. Your essay addresses the task but needs significant improvement in multiple areas. Follow the detailed feedback to enhance your writing.";
    } else {
      return "Limited performance. Your essay attempts the task but has fundamental issues. Focus on basic essay structure and language accuracy first.";
    }
  }

  private static generateTaskResponseExplanation(dimension: DimensionScore): DimensionExplanation {
    const band = dimension.band;
    
    const explanations: Record<number, {
      criteriaMet: string[];
      criteriaMissing: string[];
      detailedExplanation: string;
      specificExamples: string[];
    }> = {
      9: {
        criteriaMet: ["Fully addresses all parts of the task", "Presents a fully developed position", "Uses relevant, fully extended and well supported ideas"],
        criteriaMissing: [],
        detailedExplanation: "Your response fully addresses all parts of the task with a well-developed, relevant, and fully extended position. Ideas are logically organized and well supported with relevant examples.",
        specificExamples: ["Clear thesis statement", "Comprehensive argument development", "Relevant supporting examples"]
      },
      8: {
        criteriaMet: ["Sufficiently addresses all parts of the task", "Presents a well-developed response", "Relevant, well extended and supported ideas"],
        criteriaMissing: ["Could be more fully extended in places"],
        detailedExplanation: "You have effectively addressed all parts of the task with a well-developed response. Your position is clear and ideas are relevant and well-supported.",
        specificExamples: ["Clear position throughout", "Good use of examples", "Logical argument structure"]
      },
      7: {
        criteriaMet: ["Addresses all parts of the task", "Presents a clear position", "Main ideas are extended and supported"],
        criteriaMissing: ["Some parts may be more fully covered", "Conclusions may become unclear"],
        detailedExplanation: "You have addressed all parts of the task and presented a clear position. Main ideas are relevant and extended, though some aspects could be more fully developed.",
        specificExamples: ["Clear introduction", "Topic sentences in paragraphs", "Supporting examples used"]
      },
      6: {
        criteriaMet: ["Addresses all parts of the task", "Presents a relevant position", "Main ideas are relevant"],
        criteriaMissing: ["Conclusions may be unclear or repetitive", "Ideas may lack focus"],
        detailedExplanation: "You have addressed all parts of the task, though some parts may be more fully covered than others. Your position is relevant but may lack consistent focus.",
        specificExamples: ["Attempt to answer the question", "Some relevant ideas", "Basic structure present"]
      },
      5: {
        criteriaMet: ["Addresses the task only partially", "Expresses a position but development is limited"],
        criteriaMissing: ["Key features not sufficiently covered", "Irrelevant details included", "Format may be inappropriate"],
        detailedExplanation: "You have addressed the task only partially. While you express a position, the development is limited and key aspects of the task may be missing.",
        specificExamples: ["Basic attempt to answer", "Limited development", "Some relevant points"]
      }
    };

    const bandKey = Math.floor(band) as keyof typeof explanations;
    const explanation = explanations[bandKey] || explanations[5];
    
    return {
      score: dimension.score,
      band: dimension.band,
      criteriaMet: explanation.criteriaMet,
      criteriaMissing: band < 9 ? explanation.criteriaMissing : [],
      detailedExplanation: explanation.detailedExplanation,
      specificExamples: explanation.specificExamples,
    };
  }

  private static generateCoherenceExplanation(dimension: DimensionScore): DimensionExplanation {
    const band = dimension.band;
    
    const explanations: Record<number, {
      criteriaMet: string[];
      criteriaMissing: string[];
      detailedExplanation: string;
      specificExamples: string[];
    }> = {
      9: {
        criteriaMet: ["Uses cohesion in such a way that it attracts no attention", "Skillfully manages paragraphing"],
        criteriaMissing: [],
        detailedExplanation: "Your essay demonstrates sophisticated use of cohesive devices and paragraphing. Information and ideas are logically sequenced with clear progression throughout.",
        specificExamples: ["Seamless transitions between ideas", "Logical paragraph structure", "Effective use of linking words"]
      },
      8: {
        criteriaMet: ["Sequences information and ideas logically", "Manages all aspects of cohesion well", "Uses paragraphing sufficiently and appropriately"],
        criteriaMissing: ["Minor lapses in cohesion"],
        detailedExplanation: "Information and ideas are logically sequenced. You use cohesive devices effectively, though there may be minor lapses. Paragraphing is clear and appropriate.",
        specificExamples: ["Clear paragraph structure", "Good use of transition words", "Logical flow of ideas"]
      },
      7: {
        criteriaMet: ["Logically organizes information and ideas", "Clear progression throughout", "Uses cohesive devices appropriately"],
        criteriaMissing: ["Under/over use of cohesive devices", "May be mechanical"],
        detailedExplanation: "Your essay is logically organized with clear progression. You use a range of cohesive devices appropriately, though there may be some under/over-use.",
        specificExamples: ["Topic sentences used", "Paragraphs have clear purpose", "Linking words present"]
      },
      6: {
        criteriaMet: ["Arranges information coherently", "Clear overall progression"],
        criteriaMissing: ["Cohesive devices may be faulty or mechanical", "May not always use referencing clearly"],
        detailedExplanation: "Information is arranged coherently with clear overall progression. You use cohesive devices effectively but may be mechanical or faulty in places.",
        specificExamples: ["Basic paragraph structure", "Some use of transitions", "Generally logical flow"]
      },
      5: {
        criteriaMet: ["Presents information with some organization"],
        criteriaMissing: ["May lack overall progression", "Inadequate or inaccurate use of cohesive devices", "May be repetitive"],
        detailedExplanation: "Your essay presents information with some organization but may lack overall progression. Use of cohesive devices may be inadequate or mechanical.",
        specificExamples: ["Attempt at paragraphing", "Some logical connections", "Basic structure attempted"]
      }
    };

    const bandKey = Math.floor(band) as keyof typeof explanations;
    const explanation = explanations[bandKey] || explanations[5];
    
    return {
      score: dimension.score,
      band: dimension.band,
      criteriaMet: explanation.criteriaMet,
      criteriaMissing: explanation.criteriaMissing,
      detailedExplanation: explanation.detailedExplanation,
      specificExamples: explanation.specificExamples,
    };
  }

  private static generateLexicalExplanation(dimension: DimensionScore): DimensionExplanation {
    const band = dimension.band;
    
    const explanations = {
      9: {
        criteriaMet: ["Uses a wide range of vocabulary with very natural and sophisticated control", "Rare minor errors occur only as slips"],
        criteriaMissing: [],
        detailedExplanation: "You use a wide range of vocabulary fluently and flexibly to convey precise meanings. Word choice is natural and sophisticated with only very occasional slips.",
        specificExamples: ["Advanced vocabulary used accurately", "Precise word choice", "Natural collocation usage"]
      },
      8: {
        criteriaMet: ["Uses a wide range of vocabulary fluently and flexibly", "Conveys precise meaning", "Skillfully uses uncommon lexical items"],
        criteriaMissing: ["Occasional inaccuracies in word choice"],
        detailedExplanation: "You use a wide range of vocabulary fluently and flexibly to convey precise meanings. Some uncommon lexical items are used skillfully with rare inaccuracies.",
        specificExamples: ["Good range of vocabulary", "Generally precise word choice", "Some advanced vocabulary"]
      },
      7: {
        criteriaMet: ["Uses a sufficient range of vocabulary", "Shows some awareness of style and collocation", "Uses less common lexical items"],
        criteriaMissing: ["Some errors in word choice and spelling", "May produce occasional errors in word formation"],
        detailedExplanation: "You use a sufficient range of vocabulary to allow some flexibility and precision. There is some awareness of style and collocation, though some errors occur.",
        specificExamples: ["Adequate vocabulary range", "Some topic-specific vocabulary", "Generally accurate word choice"]
      },
      6: {
        criteriaMet: ["Uses an adequate range of vocabulary", "Attempts to use less common vocabulary"],
        criteriaMissing: ["Some errors in spelling and word formation", "May be inappropriate", "May not have sufficient range"],
        detailedExplanation: "You use an adequate range of vocabulary for the task. You attempt to use less common vocabulary but with some inaccuracy. There are some errors in spelling and word formation.",
        specificExamples: ["Basic vocabulary range", "Some attempt at advanced words", "Generally understandable"]
      },
      5: {
        criteriaMet: ["Uses a limited range of vocabulary"],
        criteriaMissing: ["Noticeably inappropriate word choice", "May make noticeable errors in spelling and word formation", "May be repetitive"],
        detailedExplanation: "Your vocabulary range is limited, which may cause difficulty in conveying precise meaning. Word choice may be noticeably inappropriate and errors in spelling and word formation may be frequent.",
        specificExamples: ["Basic vocabulary", "Some repetition", "Limited range"]
      }
    };

    const bandKey = Math.floor(band) as keyof typeof explanations;
    const explanation = explanations[bandKey] || explanations[5];
    
    return {
      score: dimension.score,
      band: dimension.band,
      criteriaMet: explanation.criteriaMet,
      criteriaMissing: explanation.criteriaMissing,
      detailedExplanation: explanation.detailedExplanation,
      specificExamples: explanation.specificExamples,
    };
  }

  private static generateGrammarExplanation(dimension: DimensionScore): DimensionExplanation {
    const band = dimension.band;
    
    const explanations = {
      9: {
        criteriaMet: ["Uses a wide range of structures with full flexibility and accuracy", "Rare minor errors occur only as slips"],
        criteriaMissing: [],
        detailedExplanation: "You use a wide range of structures with full flexibility and control. Grammar and punctuation are consistently accurate with only very occasional slips.",
        specificExamples: ["Complex sentence structures", "Accurate tense usage", "Perfect punctuation"]
      },
      8: {
        criteriaMet: ["Uses a wide range of structures", "Majority of sentences are error-free", "Good control of grammar and punctuation"],
        criteriaMissing: ["Occasional errors or inappropriacies"],
        detailedExplanation: "You use a wide range of structures with the majority of sentences being error-free. You have good control of grammar and punctuation with only occasional errors.",
        specificExamples: ["Varied sentence types", "Generally accurate grammar", "Good punctuation"]
      },
      7: {
        criteriaMet: ["Uses a variety of complex structures", "Produces frequent error-free sentences", "Good control of grammar and punctuation"],
        criteriaMissing: ["May make a few errors"],
        detailedExplanation: "You use a variety of complex structures and produce frequent error-free sentences. You have generally good control of grammar and punctuation, though some errors occur.",
        specificExamples: ["Mix of simple and complex sentences", "Generally accurate tenses", "Appropriate punctuation"]
      },
      6: {
        criteriaMet: ["Uses a mix of simple and complex sentence forms", "Makes some errors but meaning is clear"],
        criteriaMissing: ["Errors may cause some difficulty for the reader"],
        detailedExplanation: "You use a mix of simple and complex sentence forms though these may not always be accurate. Errors occur but rarely cause difficulty for the reader.",
        specificExamples: ["Basic sentence structures", "Generally understandable", "Some errors but meaning clear"]
      },
      5: {
        criteriaMet: ["Uses only a limited range of structures", "Attempts complex sentences"],
        criteriaMissing: ["Errors may be frequent", "May cause difficulty for the reader"],
        detailedExplanation: "Your range of structures is limited. You attempt complex sentences but these tend to be less accurate than simple sentences. Errors may be frequent and may cause difficulty for the reader.",
        specificExamples: ["Simple sentences mostly", "Frequent errors", "Meaning sometimes unclear"]
      }
    };

    const bandKey = Math.floor(band) as keyof typeof explanations;
    const explanation = explanations[bandKey] || explanations[5];
    
    return {
      score: dimension.score,
      band: dimension.band,
      criteriaMet: explanation.criteriaMet,
      criteriaMissing: explanation.criteriaMissing,
      detailedExplanation: explanation.detailedExplanation,
      specificExamples: explanation.specificExamples,
    };
  }

  private static generateImprovementSuggestions(score: IELTSScore): ImprovementSuggestions {
    const suggestions = {
      immediate: [] as string[],
      shortTerm: [] as string[],
      longTerm: [] as string[],
    };

    // Task Response suggestions
    if (score.dimensions.taskResponse.band < 7) {
      suggestions.immediate.push("Ensure you address all parts of the question explicitly");
      suggestions.shortTerm.push("Practice brainstorming and essay planning before writing");
      suggestions.longTerm.push("Study different essay structures and when to use them");
    }

    // Coherence suggestions
    if (score.dimensions.coherence.band < 7) {
      suggestions.immediate.push("Use clear topic sentences for each paragraph");
      suggestions.shortTerm.push("Practice using linking words and transitions");
      suggestions.longTerm.push("Study paragraph structure and logical flow");
    }

    // Lexical suggestions
    if (score.dimensions.lexical.band < 7) {
      suggestions.immediate.push("Replace basic words with more sophisticated alternatives");
      suggestions.shortTerm.push("Learn topic-specific vocabulary for common IELTS themes");
      suggestions.longTerm.push("Build vocabulary through reading academic texts and essays");
    }

    // Grammar suggestions
    if (score.dimensions.grammar.band < 7) {
      suggestions.immediate.push("Review and correct any basic grammar errors");
      suggestions.shortTerm.push("Practice using a variety of sentence structures");
      suggestions.longTerm.push("Study complex grammar patterns and punctuation rules");
    }

    return suggestions;
  }

  private static generateNextSteps(score: IELTSScore): string[] {
    const nextSteps = [];
    const lowestDimension = Object.entries(score.dimensions)
      .reduce((lowest, [key, value]) => 
        value.band < score.dimensions[lowest as keyof typeof score.dimensions].band ? key : lowest
      , 'taskResponse');

    nextSteps.push(`Focus on improving your ${lowestDimension} as it's your lowest scoring dimension`);
    nextSteps.push("Review the detailed feedback and apply suggestions to your next essay");
    nextSteps.push("Practice writing 2-3 more essays on similar topics");
    nextSteps.push("Study high-band sample essays for comparison");
    
    if (score.overall.band < 7) {
      nextSteps.push("Consider working with a tutor for personalized guidance");
    }

    return nextSteps;
  }
}