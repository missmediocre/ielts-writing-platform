import { OfficialScoringService } from '../services/officialScoringStandards';
import type { IELTSWriting } from '../types/ielts';

// Test the official IELTS scoring system with sample essays

const sampleEssays = [
  {
    title: "Some people believe that children should learn how to cook at school. Do you agree or disagree?",
    content: `I strongly agree that children should learn how to cook at school. This essential life skill provides numerous benefits that extend far beyond simply preparing meals.

First and foremost, learning to cook at school teaches children valuable independence and self-reliance. When students master basic culinary techniques, they gain confidence in their ability to care for themselves. This independence is particularly crucial as they transition into adulthood, where the ability to prepare nutritious meals becomes fundamental to maintaining a healthy lifestyle.

Moreover, cooking education in schools addresses the growing concern of childhood obesity and poor nutrition. By teaching students how to prepare balanced, wholesome meals, schools can directly combat the excessive consumption of processed foods and fast food. Students who understand nutritional principles and cooking methods are more likely to make healthier dietary choices throughout their lives.

Additionally, cooking classes foster creativity and cultural appreciation. Students can explore diverse cuisines from around the world, gaining insights into different cultures and traditions. This exposure not only broadens their culinary horizons but also promotes cultural understanding and tolerance.

Furthermore, cooking education develops practical mathematical and scientific skills. Students learn to measure ingredients accurately, understand ratios and proportions, and observe chemical reactions during cooking processes. These hands-on experiences reinforce academic concepts in mathematics and science in an engaging, practical context.

In conclusion, incorporating cooking education into school curricula offers multifaceted benefits that prepare children for healthy, independent, and culturally aware adulthood. The investment in such programs will yield significant returns in terms of public health, cultural appreciation, and practical life skills.`,
    expectedBand: 7.5
  },
  {
    title: "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake. Discuss both views and give your opinion.",
    content: `In recent years, the primary purpose of university education has become a subject of intense debate. While some argue that universities should primarily equip students with practical workplace skills, others contend that the fundamental role of higher education is to pursue knowledge for its intrinsic value. This essay will examine both perspectives before presenting a balanced viewpoint.

Proponents of workplace-oriented education argue that universities have a responsibility to prepare students for successful careers. They emphasize that graduates must possess relevant skills to compete effectively in the job market. For instance, engineering programs that incorporate real-world projects and internships provide students with hands-on experience that directly translates to workplace competencies. Similarly, business schools that focus on practical applications of management theories better prepare students for corporate challenges. This approach ensures that educational investment yields tangible returns in terms of employability and career advancement.

Conversely, advocates for knowledge-centered education maintain that universities should prioritize intellectual development and theoretical understanding. They argue that universities are unique institutions dedicated to advancing human knowledge through research and critical inquiry. This perspective values the pursuit of knowledge for its own sake, regardless of immediate practical applications. For example, theoretical physics or pure mathematics may not have immediate workplace relevance, but such disciplines have historically led to groundbreaking discoveries that ultimately benefit society in unforeseen ways.

In my opinion, universities should strike a balance between these two approaches. While practical skills are undoubtedly important for career success, the broader purpose of higher education extends beyond mere job preparation. Universities should provide students with both specialized knowledge in their chosen fields and transferable skills such as critical thinking, analytical reasoning, and effective communication. This balanced approach ensures that graduates are not only employable but also capable of adapting to changing professional landscapes throughout their careers.

In conclusion, the debate between workplace preparation and knowledge pursuit represents a false dichotomy. The most effective university education combines practical skill development with intellectual exploration, creating graduates who are both professionally competent and intellectually curious.`,
    expectedBand: 8.0
  },
  {
    title: "Some people believe that advertising has a negative impact on society. To what extent do you agree or disagree?",
    content: `I think advertising has bad effect on people. Many advertisement show wrong things to make people buy stuff. This is not good for society.

First, advertising make people buy things they don't need. They see beautiful people in ads and want to be like them. So they buy expensive things to look good. This is bad because people waste money.

Second, advertising tell lies about products. They say products are best but actually not true. People trust ads and buy bad things. This make people unhappy.

Third, advertising show wrong values. They show rich people are happy and poor people are sad. This is not true. But people believe it and want to be rich.

In conclusion, advertising is bad for society. It make people buy things they don't need and tell lies. We should have less advertising.`,
    expectedBand: 5.0
  }
];

async function testOfficialScoring() {
  console.log('🧪 Testing Official IELTS Scoring System\n');
  
  for (const [index, essay] of sampleEssays.entries()) {
    console.log(`📄 Test ${index + 1}: ${essay.title}`);
    console.log(`字数: ${essay.content.split(/\s+/).filter(w => w.length > 0).length} 词`);
    console.log(`预期分数: ${essay.expectedBand}`);
    
    const mockEssay: IELTSWriting = {
      id: `test-${index + 1}`,
      userId: 'test-user',
      taskId: `task-${index + 1}`,
      taskTitle: essay.title,
      content: essay.content,
      wordCount: essay.content.split(/\s+/).filter(w => w.length > 0).length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    try {
      const result = await OfficialScoringService.scoreEssayOfficially(mockEssay, essay.title);
      
      console.log(`\n🏆 评分结果:`);
      console.log(`整体分数: ${result.overall.band}/9`);
      console.log(`\n📊 各维度分数:`);
      console.log(`任务回应: ${result.dimensions.taskResponse.band}/9`);
      console.log(`连贯与衔接: ${result.dimensions.coherence.band}/9`);
      console.log(`词汇资源: ${result.dimensions.lexical.band}/9`);
      console.log(`语法多样性及准确性: ${result.dimensions.grammar.band}/9`);
      
      console.log(`\n💡 主要反馈:`);
      result.feedback.strengths.forEach(strength => console.log(`✅ ${strength}`));
      result.feedback.weaknesses.forEach(weakness => console.log(`❌ ${weakness}`));
      
      // Calculate accuracy against expected band
      const deviation = Math.abs(result.overall.band - essay.expectedBand);
      console.log(`\n🎯 准确性评估: ${deviation <= 0.5 ? '✅ 非常准确' : deviation <= 1.0 ? '⚠️ 基本准确' : '❌ 需要调整'}`);
      console.log(`偏差: ${deviation.toFixed(1)} 分\n`);
      
    } catch (error) {
      console.error(`❌ 测试失败:`, error);
    }
    
    console.log('─'.repeat(50) + '\n');
  }
}

// Run the test
testOfficialScoring().catch(console.error);

export { testOfficialScoring };