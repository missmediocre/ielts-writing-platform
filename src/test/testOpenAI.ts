import { IELTSScoringService } from '../services/openai';
import type { IELTSWriting } from '../types/ielts';

const testEssay: IELTSWriting = {
  id: 'test-001',
  userId: 'user-001',
  taskId: 'task-001',
  content: `
In today's modern world, technology has become an integral part of our daily lives. While some people argue that technology makes our lives more convenient, others believe it creates more problems than it solves. This essay will discuss both viewpoints and provide my personal opinion.

On one hand, technology has undoubtedly brought numerous benefits to society. Firstly, communication has become much easier and faster with the advent of smartphones and social media platforms. People can now connect with friends and family members across the globe instantly. Secondly, technology has revolutionized the way we work. Many tasks that previously required hours of manual labor can now be completed within minutes using computers and automation. This has significantly increased productivity and efficiency in various industries.

On the other hand, technology also has its drawbacks. One major concern is the increasing dependency on digital devices, which has led to sedentary lifestyles and various health issues. Many people spend excessive amounts of time on their phones or computers, leading to physical problems such as back pain and eye strain. Additionally, technology has created new forms of social isolation, as people often prefer virtual interactions over face-to-face communication.

In conclusion, while technology has brought undeniable benefits to our lives, it is crucial to use it responsibly. I believe that the advantages of technology outweigh its disadvantages, provided that we maintain a healthy balance between our digital and real-world activities. By being mindful of our technology usage, we can maximize its benefits while minimizing its negative impacts.
`,
  wordCount: 287,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function testOpenAIService() {
  console.log('🧪 Testing IELTSScoringService...');
  
  const service = IELTSScoringService.getInstance();
  
  try {
    console.log('📄 Submitting test essay...');
    const result = await service.scoreEssay(testEssay);
    
    console.log('✅ AI Scoring Result:');
    console.log('Overall Score:', result.overall.score);
    console.log('Overall Band:', result.overall.band);
    
    console.log('\n📊 Dimension Scores:');
    Object.entries(result.dimensions).forEach(([key, value]) => {
      console.log(`${key}: ${value.score}/9 (${value.band} band)`);
    });
    
    console.log('\n💪 Strengths:', result.feedback.strengths);
    console.log('⚠️ Weaknesses:', result.feedback.weaknesses);
    console.log('💡 Suggestions:', result.feedback.suggestions);
    
    if (result.sentences && result.sentences.length > 0) {
      console.log('\n📝 Sentence Analysis:');
      result.sentences.slice(0, 3).forEach(sentence => {
        console.log(`Sentence ${sentence.index}: ${sentence.text.substring(0, 50)}...`);
        if (sentence.issues.length > 0) {
          console.log(`  Issues: ${sentence.issues.length}`);
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    // Check for common issues
    if (error instanceof Error && error.message.includes('API key')) {
      console.error('🚨 Missing VITE_OPENAI_API_KEY environment variable');
      console.error('Create .env file with: VITE_OPENAI_API_KEY=your_api_key_here');
    } else if (error instanceof Error && error.message.includes('network')) {
      console.error('🌐 Network error - check internet connection');
    } else if (error instanceof Error && error.message.includes('401')) {
      console.error('🔑 Invalid API key - check your OpenAI API key');
    } else {
      console.error('📋 Unknown error - check console for details');
    }
  }
}

// Run test if this file is executed directly
// if (typeof module !== 'undefined' && module === require.main) {
//   testOpenAIService();
// }

export { testOpenAIService };