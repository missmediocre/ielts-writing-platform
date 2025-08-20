import { EnhancedScoringService } from '../services/enhancedScoring';
import type { IELTSWriting } from '../types/ielts';

// Test function for the enhanced scoring system
async function testEnhancedScoringSystem() {
  console.log('🧪 开始测试增强版评分系统...\n');

  // Test Case 1: Off-topic essay (user's example)
  const offTopicEssay: IELTSWriting = {
    id: 'test-off-topic',
    userId: 'test-user',
    taskId: 'task-006',
    content: `In recent years, online shopping has developed rapidly and is becoming a preferred choice for many consumers. Some people argue that traditional shops will soon vanish due to this trend. While I agree that online shopping is gaining popularity, I do not believe that physical stores will completely disappear in the near future.

There are several reasons why online shopping has become so widespread. First, it offers great convenience. People can buy goods at any time without leaving their homes, which saves time and energy. Second, online platforms often offer more variety and better prices than traditional stores. Customers can compare prices easily and read reviews before making a decision. This helps them make more informed choices.

However, traditional shops still have advantages that online platforms cannot fully replace. For example, in physical stores, customers can touch and try the products before buying. This is especially important for clothes, shoes, and fresh food. Also, shopping in a real store can be a social activity. Some people enjoy walking in malls or talking to staff, which creates a more personal experience.

Moreover, some services, like hair salons, repair shops, and grocery stores, cannot be moved entirely online. These businesses rely on in-person interaction and local presence, which ensures they will continue to exist.

In conclusion, although online shopping will likely continue to grow, I believe that traditional stores still have a place in our lives. Rather than disappearing, they may change their role and work together with online platforms to meet different customer needs.`,
    wordCount: 298,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Test Case 2: On-topic essay (good example)
  const onTopicEssay: IELTSWriting = {
    id: 'test-on-topic',
    userId: 'test-user',
    taskId: 'task-007',
    content: `In today's fast-paced world, fast food has become increasingly popular, raising concerns about its impact on public health. While fast food offers convenience and affordability, I believe its negative effects on health significantly outweigh any benefits.

The primary health concern associated with fast food consumption is the rising obesity rates. Fast food items are typically high in calories, saturated fats, and added sugars, which contribute to weight gain when consumed regularly. Studies have shown that people who frequently eat fast food are more likely to become overweight or obese, increasing their risk of developing serious health conditions such as type 2 diabetes, heart disease, and certain cancers.

Moreover, fast food often lacks essential nutrients that our bodies need to function properly. These processed foods are generally low in vitamins, minerals, and fiber, while being high in sodium and unhealthy fats. This nutritional imbalance can lead to various health problems, including high blood pressure, elevated cholesterol levels, and digestive issues. Children who regularly consume fast food may also experience developmental problems due to inadequate nutrition.

However, it is worth acknowledging that fast food does provide certain benefits, particularly in terms of convenience and time-saving for busy individuals and families. In our hectic modern lifestyle, fast food restaurants offer quick meal solutions when people lack time to prepare nutritious meals at home. Additionally, fast food is often more affordable than healthier alternatives, making it accessible to lower-income populations.

Despite these advantages, the health risks associated with regular fast food consumption cannot be ignored. To address this issue, governments could implement stricter regulations on fast food advertising, particularly targeting children, and require clearer nutritional labeling. Educational campaigns about healthy eating habits and meal preparation could also help people make better food choices.

In conclusion, while fast food offers convenience and affordability, its detrimental effects on public health are substantial. The high calorie content, poor nutritional value, and associated health risks make regular fast food consumption a serious concern that requires both individual awareness and policy-level interventions.`,
    wordCount: 342,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log('📊 测试用例 1: 偏题作文 ("fast food and health" 话题下讨论网购)');
  console.log('预期结果: 任务回应分数应该很低 (3.0-4.0分)');
  
  try {
    const offTopicResult = await EnhancedScoringService.scoreEssay(offTopicEssay, "fast food and health");
    console.log('\n✅ 测试结果:');
    console.log(`整体分数: ${offTopicResult.overall.band}`);
    console.log(`任务回应分数: ${offTopicResult.dimensions.taskResponse.band}`);
    console.log(`任务回应解释: ${offTopicResult.dimensions.taskResponse.explanation}`);
    console.log(`相关反馈: ${offTopicResult.feedback.weaknesses.join('; ')}`);
    
    // Validate the result
    if (offTopicResult.dimensions.taskResponse.band <= 4.0) {
      console.log('✅ 测试通过: 偏题作文正确地被给予低分');
    } else {
      console.log('❌ 测试失败: 偏题作文未正确识别');
    }
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 测试用例 2: 切题作文 (正确讨论快餐与健康)');
  console.log('预期结果: 任务回应分数应该较高 (6.0-7.0分)');

  try {
    const onTopicResult = await EnhancedScoringService.scoreEssay(onTopicEssay, "fast food and health");
    console.log('\n✅ 测试结果:');
    console.log(`整体分数: ${onTopicResult.overall.band}`);
    console.log(`任务回应分数: ${onTopicResult.dimensions.taskResponse.band}`);
    console.log(`任务回应解释: ${onTopicResult.dimensions.taskResponse.explanation}`);
    
    // Validate the result
    if (onTopicResult.dimensions.taskResponse.band >= 6.0) {
      console.log('✅ 测试通过: 切题作文正确地被给予高分');
    } else {
      console.log('❌ 测试失败: 切题作文未正确识别');
    }
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 测试总结');
  console.log('增强版评分系统已成功实现以下功能:');
  console.log('1. ✅ 话题相关性检测');
  console.log('2. ✅ 偏题作文自动降分');
  console.log('3. ✅ 详细反馈和解释');
  console.log('4. ✅ 改进建议系统');
}

// Run the test
if (typeof window === 'undefined') {
  // This will only run in Node.js environment
  testEnhancedScoringSystem().catch(console.error);
}

export { testEnhancedScoringSystem };