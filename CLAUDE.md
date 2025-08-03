# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 Project Overview

**Self-Study IELTS Platform** - AI-powered comprehensive English learning platform targeting 26-45 year old working professionals preparing for IELTS exams with goal of achieving 7.5+ band score.

**Current Phase**: MVP development focusing on IELTS Writing (Task 2) with AI scoring and detailed feedback

## 🎯 Core Features (MVP)

- **AI Writing Assessment**: 0.5 precision scoring across 4 IELTS dimensions
- **Detailed Feedback**: Sentence-level annotations with specific improvement suggestions
- **Progress Tracking**: Visual trends and performance analytics
- **7.5 Band Essay Comparison**: High-quality sample essays for reference
- **Multi-platform**: Web (React), Mobile (React Native), WeChat Mini Program

## 🏗️ Technology Stack

### Frontend
- **Web**: React + TypeScript + Tailwind CSS + Ant Design
- **State Management**: Zustand + React Query
- **Charts**: Recharts + D3.js
- **PWA**: Offline caching, push notifications

### Backend
- **API Gateway**: Kong
- **Microservices**: 
  - User Service (Node.js + Express)
  - Learning Service (Python + FastAPI)
  - Assessment Service (Python + FastAPI)
  - Recommendation Service (Python + FastAPI)
- **Database**: PostgreSQL (primary), Redis (cache), MongoDB (question bank), ClickHouse (analytics)
- **Message Queue**: Redis + Bull Queue

### AI Services
- **Text Processing**: GPT-4o / Claude-3.5-Sonnet
- **Speech Processing**: Whisper-1 + Azure Speech
- **Image Generation**: DALL-E 3
- **Recommendation**: Collaborative filtering + content-based

### Infrastructure
- **Cloud**: AWS + Vercel
- **CDN**: CloudFront + Vercel Edge
- **Monitoring**: DataDog + Sentry
- **CI/CD**: GitHub Actions
- **Containerization**: Docker + Kubernetes

## 🔄 Development Workflow

### MVP Development (3-week sprint)
- **Week 1**: Core AI scoring API + basic frontend
- **Week 2**: Enhanced feedback system + progress tracking
- **Week 3**: User testing + performance optimization

### Quick Start Commands
```bash
# Development setup (when implemented)
npm install
npm run dev
npm run build
npm run test

# AI integration
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Key Architecture Patterns

#### Data Models
```typescript
interface UserProfile {
  targetScore: number;
  currentLevel: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  availableTime: number; // minutes per day
}

interface AssessmentReport {
  overall: { score: number; band: number };
  dimensions: {
    taskResponse: DimensionScore;
    coherence: DimensionScore;
    lexical: DimensionScore;
    grammar: DimensionScore;
  };
}
```

#### User Journey Flow
```
登录 → 题目选择 → 作文输入 → AI评分 → 详细反馈 → 范文对比 → 进步追踪
```

## 📊 Performance Targets

- **Response Time**: <5 seconds for AI scoring
- **Accuracy**: 90%+ AI scoring accuracy vs human evaluators
- **User Retention**: 30%+ 7-day retention
- **Uptime**: 99.9% service availability
- **Cost Control**: $0.01-0.02 per essay assessment

## 🚧 Current Status

- **MVP Scope**: IELTS Writing Task 2 only
- **Excluded**: Task 1, community features, offline mode, multi-device sync
- **Next Phase**: Full 4-skill assessment (Listening, Reading, Speaking)

## 🔧 Development Environment

When setting up development:
1. Create GitHub repository
2. Set up OpenAI API key
3. Configure Vercel/Railway deployment
4. Initialize React/Next.js project
5. Set up Tailwind CSS and component library

## 📈 Success Metrics

- **User**: 7-day retention >30%, weekly usage >2 sessions
- **Technical**: 95% requests <2s, 99.9% uptime
- **Business**: 10K+ MAU, 1K+ paying users, $50K+ MRR

## 🚀 Next Steps

1. **Immediate**: Set up React project with TypeScript
2. **Week 1**: Implement AI scoring API integration
3. **Week 2**: Build responsive UI with progress tracking
4. **Week 3**: User testing and iteration