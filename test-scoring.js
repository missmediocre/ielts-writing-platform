// 测试评分API的简单脚本
const testEssay = {
  content: "Technology has revolutionized education by making learning more accessible and interactive. Students can now access vast resources online, attend virtual classes, and collaborate with peers globally. However, excessive screen time and reduced face-to-face interaction may negatively impact social skills development. While digital tools enhance convenience, they cannot fully replace traditional teaching methods that foster critical thinking and personal connections. Therefore, a balanced approach combining technology and traditional education is optimal for comprehensive learning outcomes.",
  wordCount: 120,
  taskType: "Task 2"
};

console.log('🧪 测试评分API...');
console.log('测试作文:', testEssay.content.substring(0, 100) + '...');

// 使用浏览器直接测试
console.log('📋 测试步骤:');
console.log('1. 打开浏览器: http://localhost:5173');
console.log('2. 选择写作题目');
console.log('3. 粘贴上面的作文');
console.log('4. 点击"Submit Essay for Scoring"');
console.log('5. 检查是否跳转到Progress页面');

// 检查环境变量
require('dotenv').config();
const apiKey = process.env.KIMI_API_KEY || process.env.OPENAI_API_KEY;
if (apiKey) {
  console.log('✅ API密钥已配置');
} else {
  console.log('❌ API密钥未配置');
}