import React, { useState } from 'react';
import { useWritingStore } from '../store/writingStore';
import { Award, TrendingUp, BookOpen, Eye } from 'lucide-react';
import { DetailedFeedback } from './DetailedFeedback';

const ScoreDisplay: React.FC = () => {
  const { getProgress, essayHistory, getScore } = useWritingStore();
  const progress = getProgress();
  const [expandedEssayId, setExpandedEssayId] = useState<string | null>(null);
  const [showOriginalText, setShowOriginalText] = useState<string | null>(null);

  const getBandColor = (band: number) => {
    if (band >= 7.5) return 'text-green-600';
    if (band >= 6.5) return 'text-blue-600';
    if (band >= 5.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBandLevel = (band: number) => {
    if (band >= 7.5) return 'Excellent';
    if (band >= 6.5) return 'Good';
    if (band >= 5.5) return 'Competent';
    return 'Modest';
  };

  if (!progress || typeof progress.totalEssays === 'undefined') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">正在加载评分数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Essays</p>
              <p className="text-2xl font-bold text-gray-900">{progress.totalEssays || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className={`text-2xl font-bold ${getBandColor(progress.averageScore)}`}>
                {(progress.averageScore || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className={`text-2xl font-bold ${getBandColor(progress.bestScore)}`}>
                {(progress.bestScore || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <div className="w-6 h-6 text-orange-600">📈</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Improvement</p>
              <p className={`text-2xl font-bold ${(progress.improvement || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(progress.improvement || 0) >= 0 ? '+' : ''}{(progress.improvement || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Score History */}
      {essayHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Scores</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {essayHistory.slice(-5).reverse().map((essay, index) => {
              const score = getScore(essay.id);
              if (!score || !score.dimensions || !score.overall) return null;

              return (
                <div key={essay.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {essay.taskTitle || `作文 #${essayHistory.length - index}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {essay.taskCategory || '通用'} • {essay.wordCount} 词 • {new Date(essay.createdAt).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getBandColor(score.overall.band)}`}>
                        {score.overall.band.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-500">{getBandLevel(score.overall.band)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">任务回应</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.taskResponse.band)}`}>
                        {score.dimensions.taskResponse.band.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">连贯与衔接</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.coherence.band)}`}>
                        {score.dimensions.coherence.band.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">词汇资源</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.lexical.band)}`}>
                        {score.dimensions.lexical.band.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">语法多样性及准确性</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.grammar.band)}`}>
                        {score.dimensions.grammar.band.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setExpandedEssayId(
                        expandedEssayId === essay.id ? null : essay.id
                      )}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                    >
                      {expandedEssayId === essay.id ? '收起详情' : '查看详细反馈'}
                    </button>
                    <button
                      onClick={() => setShowOriginalText(essay.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      查看原文
                    </button>
                  </div>
                  
                  <DetailedFeedback
                    score={score}
                    isOpen={expandedEssayId === essay.id}
                    onToggle={() => setExpandedEssayId(
                      expandedEssayId === essay.id ? null : essay.id
                    )}
                    essayId={essay.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Original Text Viewer Modal */}
      {showOriginalText && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">原文查看</h3>
              <button
                onClick={() => setShowOriginalText(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {essayHistory.find(essay => essay.id === showOriginalText)?.content || '原文未找到'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {essayHistory.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无作文记录</h3>
          <p className="text-gray-500">开始写作后，您将在这里看到详细的评分和反馈</p>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>💡 提交作文后，AI将为您提供：</p>
            <ul className="text-left max-w-xs mx-auto mt-2 space-y-1">
              <li>• 详细评分解释</li>
              <li>• 针对性改进建议</li>
              <li>• 个性化学习计划</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;