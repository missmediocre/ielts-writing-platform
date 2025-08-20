import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { IELTSWriting } from '../types/ielts';

interface OriginalTextViewerProps {
  essay: IELTSWriting;
  onClose: () => void;
}

export const OriginalTextViewer: React.FC<OriginalTextViewerProps> = ({ 
  essay, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'original' | 'highlighted'>('highlighted');

  const getHighlightedText = () => {
    let text = essay.content;
    
    // Highlight vocabulary issues (yellow)
    const vocabularyIssues = [
      'good', 'bad', 'important', 'big', 'many', 'get', 'make', 'think',
      'nice', 'great', 'awesome', 'cool', 'stuff', 'things', 'a lot', 'very'
    ];
    
    vocabularyIssues.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, `<span class="bg-yellow-200 px-1 rounded font-semibold">${word}</span>`);
    });

    // Highlight sentence structure issues (green)
    const structurePatterns = [
      /\b(I think|I believe|In my opinion|I feel)\b/gi,
      /\b(First|Second|Third|Finally|Lastly)\b/gi,
      /\b(Also|Moreover|Furthermore|Besides)\b/gi
    ];

    structurePatterns.forEach(pattern => {
      text = text.replace(pattern, match => 
        `<span class="bg-green-200 px-1 rounded font-semibold">${match}</span>`
      );
    });

    return text;
  };

  const getLegend = () => (
    <div className="flex gap-4 text-sm mb-4">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
        <span>词汇提升空间</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-green-200 rounded"></div>
        <span>句型改进空间</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">原文查看与提升建议</h3>
            <p className="text-sm text-gray-600">
              {essay.taskTitle || '作文原文'} - 高亮显示可提升至7.5分的部分
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('highlighted')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'highlighted'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              高亮建议版
            </button>
            <button
              onClick={() => setActiveTab('original')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'original'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              原始文本
            </button>
          </div>

          {getLegend()}

          {/* Content */}
          <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
            {activeTab === 'highlighted' ? (
              <div 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
              />
            ) : (
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {essay.content}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">字数:</span> {essay.wordCount}
            </div>
            <div>
              <span className="font-medium">分类:</span> {essay.taskCategory || '通用'}
            </div>
            <div>
              <span className="font-medium">提交时间:</span> {new Date(essay.createdAt).toLocaleString('zh-CN')}
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            <p>💡 提示：黄色高亮的词汇可以替换为更高级的表达，绿色高亮的句型可以优化为更复杂的结构。</p>
          </div>
        </div>
      </div>
    </div>
  );
};