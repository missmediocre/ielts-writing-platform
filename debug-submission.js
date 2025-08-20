// 快速诊断脚本
console.log('🔍 IELTS写作评分系统诊断');

// 1. 检查环境变量
console.log('环境变量检查:', {
  KIMI_API_KEY: process.env.KIMI_API_KEY ? '✅ 已配置' : '❌ 未配置',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

// 2. API端点测试
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:5173/api/health');
    const health = await response.json();
    console.log('✅ API健康检查:', health);
  } catch (error) {
    console.log('❌ API连接失败:', error.message);
  }
};

// 3. 测试评分API
const testScoring = async () => {
  const testEssay = {
    content: "Technology has revolutionized education by making learning more accessible and interactive. Students can now access vast resources online.",
    wordCount: 50,
    taskType: "Task 2"
  };

  try {
    const response = await fetch('http://localhost:5173/api/score-essay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testEssay)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ 评分成功:', result.overall);
    } else {
      console.log('❌ 评分失败:', response.status, await response.text());
    }
  } catch (error) {
    console.log('❌ API错误:', error.message);
  }
};

console.log('开始诊断...');
testAPI();
setTimeout(testScoring, 1000);