import type { IELTSWriting, IELTSScore } from '../types/ielts';

export class EnhancedFeedbackGenerator {
  static generateEnhancedFeedback(
    essay: IELTSWriting, 
    score: IELTSScore, 
    taskTitle: string,
    category: string
  ): any {
    const wordCount = essay.content.split(/\s+/).filter(w => w.length > 0).length;
    
    return {
      essayInfo: {
        id: essay.id,
        title: taskTitle,
        category: category,
        wordCount: wordCount,
        submissionTime: new Date().toLocaleString('zh-CN'),
      },
      detailedAnalysis: {
        taskResponse: {
          band: score.dimensions.taskResponse.band,
          originalText: essay.content.substring(0, 100) + '...',
          improvedText: '改进后的文本将基于具体评分维度提供...',
          specificIssues: [
            {
              issue: '确保完全回应题目要求',
              original: '现有观点表达',
              corrected: '更具体的观点阐述',
              explanation: '需要更清晰地阐述立场'
            }
          ]
        },
        coherence: {
          band: score.dimensions.coherence.band,
          paragraphIssues: [
            {
              paragraph: 1,
              issue: '段落结构优化',
              originalTransition: '现有连接',
              improvedTransition: '使用更高级的连接词'
            }
          ]
        },
        lexical: {
          band: score.dimensions.lexical.band,
          vocabularyIssues: [
            {
              basicWord: 'good',
              advancedAlternative: 'beneficial',
              context: 'good → beneficial'
            }
          ],
          repetition: []
        },
        grammar: {
          band: score.dimensions.grammar.band,
          errors: [
            {
              original: '简单句型',
              corrected: '复杂句型结构',
              rule: '增加句型多样性',
              type: 'sentence-structure' as const
            }
          ]
        }
      },
      modelEssay: {
        title: `7.5分范文：${taskTitle}`,
        category: category,
        content: `In today's rapidly evolving society, ${taskTitle.toLowerCase()} has become a contentious issue that requires careful examination. While some argue that this development brings significant benefits, others contend that the drawbacks outweigh any advantages. This essay will critically evaluate both perspectives before presenting a nuanced conclusion.`,
        highlightedVocabulary: '高亮词汇示例',
        keySentences: []
      },
      nextSteps: [
        '📝 词汇积累：每天学习5个高级词汇',
        '📖 范文研读：分析提供的7.5分范文',
        '🔄 重写练习：用改进表达重新撰写',
        '🎯 目标设定：下次写作争取提升0.5分'
      ]
    };
  }
}