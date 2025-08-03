import React from 'react';
import { useWritingStore } from '../store/writingStore';
import { Award, TrendingUp, BookOpen } from 'lucide-react';

export const ScoreDisplay: React.FC = () => {
  const { getProgress, essayHistory } = useWritingStore();
  const progress = getProgress();

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
              <p className="text-2xl font-bold text-gray-900">{progress.totalEssays}</p>
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
                {progress.averageScore.toFixed(1)}
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
                {progress.bestScore.toFixed(1)}
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
              <p className={`text-2xl font-bold ${progress.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {progress.improvement >= 0 ? '+' : ''}{progress.improvement.toFixed(1)}
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
              const score = useWritingStore.getState().getScore(essay.id);
              if (!score) return null;

              return (
                <div key={essay.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Essay #{essayHistory.length - index}
                      </p>
                      <p className="text-sm text-gray-500">
                        {essay.wordCount} words • {new Date(essay.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getBandColor(score.overall.band)}`}>
                        {score.overall.band.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-500">{getBandLevel(score.overall.band)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Task Response</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.taskResponse.band)}`}>
                        {score.dimensions.taskResponse.band.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Coherence</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.coherence.band)}`}>
                        {score.dimensions.coherence.band.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Lexical</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.lexical.band)}`}>
                        {score.dimensions.lexical.band.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Grammar</p>
                      <p className={`text-sm font-semibold ${getBandColor(score.dimensions.grammar.band)}`}>
                        {score.dimensions.grammar.band.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {essayHistory.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No essays yet</h3>
          <p className="text-gray-500">Start writing to see your progress here</p>
        </div>
      )}
    </div>
  );
};