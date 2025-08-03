# 部署指南

## Vercel部署步骤

### 1. 配置环境变量
在Vercel项目设置中添加环境变量：
- `OPENAI_API_KEY`: 你的OpenAI API密钥

### 2. 部署命令
```bash
# 使用Vercel CLI
npm i -g vercel
vercel --prod

# 或直接连接GitHub
# 在vercel.com上连接GitHub仓库，自动部署
```

### 3. 验证部署
- 访问: https://ielts-band-75-pro.vercel.app
- 测试AI评分功能
- 检查网络控制台是否有错误

### 4. 故障排除
- **评分无响应**: 检查环境变量是否正确设置
- **CORS错误**: API已配置CORS，确保使用正确域名
- **API错误**: 查看Vercel函数日志

## 本地开发
```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 环境变量模板
创建 `.env.local` 文件：
```
OPENAI_API_KEY=your_openai_api_key_here
```

## API端点
- POST `/api/score-essay` - 评分接口
- GET `/api/health` - 健康检查