import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // 诊断API状态
    return res.status(200).json({
      status: 'diagnostic',
      timestamp: new Date().toISOString(),
      env_check: {
        kimi_key_set: !!process.env.KIMI_API_KEY,
        openai_key_set: !!process.env.OPENAI_API_KEY,
        api_key_preview: process.env.KIMI_API_KEY ? 
          process.env.KIMI_API_KEY.substring(0, 8) + '...' : 'none',
      },
      message: 'API configuration check'
    });
  }

  if (req.method === 'POST') {
    // 测试Kimi API
    const { content } = req.body;
    
    try {
      const apiKey = process.env.KIMI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'KIMI_API_KEY not configured',
          message: '请在Vercel设置KIMI_API_KEY'
        });
      }

      const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'moonshot-v1-8k',
          messages: [
            {
              role: 'user',
              content: `Score this IELTS essay (1-9 band): "${content}"`
            }
          ],
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      
      return res.status(200).json({
        status: 'success',
        api_response: data,
        test_content: content.substring(0, 100) + '...'
      });

    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        suggestion: '检查Kimi API密钥和网络连接'
      });
    }
  }
}