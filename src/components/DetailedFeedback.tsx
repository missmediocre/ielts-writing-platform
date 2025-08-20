import React from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Target, BookOpen } from 'lucide-react';
import type { IELTSScore } from '../types/ielts';
import { EnhancedFeedbackGenerator } from '../services/enhancedFeedbackGenerator';
import { useWritingStore } from '../store/writingStore';
// import { OriginalTextViewer } from './OriginalTextViewer';

interface DetailedFeedbackProps {
  score: IELTSScore;
  isOpen: boolean;
  onToggle: () => void;
  essayId?: string;
}

export const DetailedFeedback: React.FC<DetailedFeedbackProps> = ({ 
  score, 
  isOpen, 
  onToggle,
  essayId
}) => {
  const { getEssay } = useWritingStore();
  const essay = essayId ? getEssay(essayId) : null;
  // const [showOriginalText, setShowOriginalText] = React.useState(false);
  
  // Use enhanced feedback generator if we have essay data
  const feedback = essay 
    ? EnhancedFeedbackGenerator.generateEnhancedFeedback(
        essay,
        score,
        essay.taskTitle || '未知题目',
        essay.taskCategory || '通用'
      )
    : null;

  const getBandColor = (band: number) => {
    if (band >= 7.5) return 'text-green-600 bg-green-50';
    if (band >= 6.5) return 'text-blue-600 bg-blue-50';
    if (band >= 5.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };


  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">
            详细反馈与改进建议
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBandColor(score.overall.band)}`}>
            整体 {score.overall.band.toFixed(1)} 分
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {isOpen ? '收起' : '展开'}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && feedback && (
        <div className="border-t">
          {/* Essay Information */}
          <div className="px-6 py-4 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">{feedback.essayInfo.title}</h4>
                <p className="text-sm text-blue-700">
                  分类: {feedback.essayInfo.category} • {feedback.essayInfo.wordCount} 词 • {feedback.essayInfo.submissionTime}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getBandColor(score.overall.band)}`}>
                最终得分: {score.overall.band.toFixed(1)}/10
              </div>
            </div>
          </div>

          {/* Dimension Breakdown with Specific Examples */}
          <div className="p-6 space-y-6">
            {/* Task Response */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📝</span>
                  <h4 className="font-medium text-gray-900">任务回应</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBandColor(feedback.detailedAnalysis.taskResponse.band)}`}>
                  {feedback.detailedAnalysis.taskResponse.band.toFixed(1)} 分
                </span>
              </div>

              <div className="space-y-3">
                {feedback.detailedAnalysis.taskResponse.specificIssues.map((issue: any, index: number) => (
                  <div key={index} className="bg-red-50 p-3 rounded">
                    <h5 className="font-medium text-red-800 mb-1">❌ {issue.issue}</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>原文:</strong> {issue.original}</p>
                      <p><strong>修改:</strong> <span dangerouslySetInnerHTML={{ __html: issue.corrected }} /></p>
                      <p><strong>说明:</strong> {issue.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coherence */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔗</span>
                  <h4 className="font-medium text-gray-900">连贯与衔接</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBandColor(feedback.detailedAnalysis.coherence.band)}`}>
                  {feedback.detailedAnalysis.coherence.band.toFixed(1)} 分
                </span>
              </div>

              <div className="space-y-3">
                {feedback.detailedAnalysis.coherence.paragraphIssues.map((issue: any, index: number) => (
                  <div key={index} className="bg-yellow-50 p-3 rounded">
                    <h5 className="font-medium text-yellow-800 mb-1">⚠️ 第{issue.paragraph}段: {issue.issue}</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>原文过渡:</strong> {issue.originalTransition}</p>
                      <p><strong>改进过渡:</strong> <span dangerouslySetInnerHTML={{ __html: issue.improvedTransition }} /></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lexical Resources */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📚</span>
                  <h4 className="font-medium text-gray-900">词汇资源</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBandColor(feedback.detailedAnalysis.lexical.band)}`}>
                  {feedback.detailedAnalysis.lexical.band.toFixed(1)} 分
                </span>
              </div>

              <div className="space-y-4">
                {feedback.detailedAnalysis.lexical.vocabularyIssues.map((issue: any, index: number) => (
                  <div key={index} className="bg-green-50 p-3 rounded">
                    <h5 className="font-medium text-green-800 mb-1">📈 词汇提升</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>基础词汇:</strong> {issue.basicWord}</p>
                      <p><strong>高级替换:</strong> <span dangerouslySetInnerHTML={{ __html: issue.advancedAlternative }} /></p>
                      <p><strong>使用示例:</strong> {issue.context}</p>
                    </div>
                  </div>
                ))}
                
                {feedback.detailedAnalysis.lexical.repetition.map((rep: any, index: number) => (
                  <div key={index} className="bg-orange-50 p-3 rounded">
                    <h5 className="font-medium text-orange-800 mb-1">🔄 词汇重复 ({rep.count}次)</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>重复词:</strong> {rep.repeatedWord}</p>
                      <p><strong>替换选项:</strong> {rep.alternatives.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✏️</span>
                  <h4 className="font-medium text-gray-900">语法多样性及准确性</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBandColor(feedback.detailedAnalysis.grammar.band)}`}>
                  {feedback.detailedAnalysis.grammar.band.toFixed(1)} 分
                </span>
              </div>

              <div className="space-y-3">
                {feedback.detailedAnalysis.grammar.errors.map((error: any, index: number) => (
                  <div key={index} className="bg-red-50 p-3 rounded">
                    <h5 className="font-medium text-red-800 mb-1">❌ {error.type === 'tense' ? '时态' : 
                      error.type === 'subject-verb' ? '主谓一致' :
                      error.type === 'article' ? '冠词' :
                      error.type === 'preposition' ? '介词' : '词形'}错误</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>原文:</strong> {error.original}</p>
                      <p><strong>修正:</strong> <span dangerouslySetInnerHTML={{ __html: error.corrected }} /></p>
                      <p><strong>规则:</strong> {error.rule}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Model Essay */}
          <div className="p-6 border-t bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">7.5分范文参考</h4>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-lg mb-2">{feedback.modelEssay.title}</h5>
              <div className="text-sm text-gray-600 mb-3">
                分类: {feedback.modelEssay.category}
              </div>
              
              <div className="mb-4">
                <div 
                  className="text-sm leading-relaxed bg-gray-50 p-3 rounded max-h-96 overflow-y-auto prose prose-sm border"
                  dangerouslySetInnerHTML={{ __html: feedback.modelEssay.highlightedVocabulary }}
                />
              </div>

              {feedback.modelEssay.keySentences.length > 0 && (
                <div>
                  <h6 className="font-medium mb-2">🔍 关键句型学习:</h6>
                  <div className="space-y-2">
                    {feedback.modelEssay.keySentences.map((item: any, index: number) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-3">
                        <p className="text-sm font-medium text-gray-800">{item.sentence}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          <strong>结构:</strong> {item.structure} | <strong>用法:</strong> {item.usage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-gray-900">下一步行动</h4>
            </div>
            <div className="grid gap-2">
              {feedback.nextSteps.map((step: string, index: number) => (
                <div key={index} className="flex items-start text-sm">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!essay && (
        <div className="p-6 text-center text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>请先提交作文以获取详细反馈</p>
        </div>
      )}
    </div>
  );
};