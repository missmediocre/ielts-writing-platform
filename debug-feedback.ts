// Debug script to test EnhancedFeedbackGenerator
import { EnhancedFeedbackGenerator } from './src/services/enhancedFeedbackGenerator';
import type { IELTSWriting, IELTSScore } from './src/types/ielts';

// Test with a sample essay
const testEssay: IELTSWriting = {
  id: 'test-001',
  userId: 'user-001',
  taskId: 'task-001',
  taskTitle: 'Fast Food and Health',
  taskCategory: 'health',
  content: 'Fast food is bad for health. People eat it too much. This is very important problem. We need to stop it.',
  wordCount: 25,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const testScore: IELTSScore = {
  overall: { score: 5.5, band: 5.5 },
  dimensions: {
    taskResponse: { score: 5.5, band: 5.5, criteria: [], explanation: '', examples: [] },
    coherence: { score: 5.5, band: 5.5, criteria: [], explanation: '', examples: [] },
    lexical: { score: 5.5, band: 5.5, criteria: [], explanation: '', examples: [] },
    grammar: { score: 5.5, band: 5.5, criteria: [], explanation: '', examples: [] }
  },
  feedback: {
    strengths: [],
    weaknesses: [],
    suggestions: []
  },
  sentences: []
};

// Generate feedback
const feedback = EnhancedFeedbackGenerator.generateEnhancedFeedback(
  testEssay,
  testScore,
  'Fast Food and Health',
  'health'
);

console.log('=== DEBUG RESULTS ===');
console.log('Model Essay Title:', feedback.modelEssay.title);
console.log('Model Essay Content Length:', feedback.modelEssay.content.length);
console.log('Model Essay has highlighted vocab:', feedback.modelEssay.highlightedVocabulary.length > 0);
console.log('Grammar analysis errors:', feedback.detailedAnalysis.grammar.errors.length);
console.log('Grammar band:', feedback.detailedAnalysis.grammar.band);

// Check model essay content
console.log('\n=== MODEL ESSAY ===');
console.log('Title:', feedback.modelEssay.title);
console.log('Category:', feedback.modelEssay.category);
console.log('Content preview:', feedback.modelEssay.content.substring(0, 300));
console.log('Highlighted vocab length:', feedback.modelEssay.highlightedVocabulary.length);

// Check grammar analysis
console.log('\n=== GRAMMAR ANALYSIS ===');
console.log('Band:', feedback.detailedAnalysis.grammar.band);
console.log('Errors found:', feedback.detailedAnalysis.grammar.errors.length);
feedback.detailedAnalysis.grammar.errors.forEach((error, i) => {
  console.log(`${i+1}. ${error.type}: ${error.original} → ${error.corrected}`);
});