# IELTS Writing Assistant

A comprehensive AI-powered platform for IELTS Writing Task 2 preparation, targeting working professionals aiming for 7.5+ band scores.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key

### Installation

1. **Clone and setup**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Environment Variables
Create a `.env` file with:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 📋 Features

### ✅ Completed (MVP)
- **AI Essay Scoring**: 0.5 precision across 4 IELTS dimensions
- **Real-time Writing**: Word count tracking and progress indicators
- **Detailed Feedback**: Sentence-level analysis with improvement suggestions
- **Progress Tracking**: Visual trends and performance analytics
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Persists essays and scores across sessions

### 🎯 IELTS Scoring Dimensions
- **Task Response**: How well you address the question
- **Coherence & Cohesion**: Organization and logical flow
- **Lexical Resource**: Vocabulary usage and range
- **Grammatical Range & Accuracy**: Grammar and sentence structure

### 📊 Progress Metrics
- Total essays written
- Average band score
- Best score achieved
- Improvement tracking over time

## 🏗️ Architecture

### Frontend Stack
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Vite** for build tooling

### AI Integration
- **OpenAI GPT-4o** for essay scoring
- **Custom prompt engineering** for IELTS criteria
- **JSON response parsing** for structured feedback

### Key Components
- `EssayEditor`: Main writing interface with real-time feedback
- `ScoreDisplay`: Progress tracking and analytics
- `IELTSScoringService`: AI integration layer
- `writingStore`: State management with persistence

## 🎯 Usage Guide

### Writing an Essay
1. **Select a task**: Choose from pre-loaded IELTS Task 2 questions
2. **Write your essay**: Use the editor with word count tracking
3. **Check requirements**: Ensure minimum 250 words
4. **Submit for scoring**: Get AI-powered feedback in 5-10 seconds
5. **Review results**: View detailed analysis and improvement suggestions

### Understanding Your Scores
- **Overall Band**: Rounded to nearest 0.5 (e.g., 6.5, 7.0, 7.5)
- **Dimension Scores**: Individual scores for each IELTS criterion
- **Specific Feedback**: Actionable suggestions for improvement
- **Sentence Analysis**: Line-by-line grammar and vocabulary feedback

### Progress Tracking
- View your writing history and score trends
- Track improvement over time
- Identify areas needing focus
- Set goals based on your target band score

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Project Structure
```
src/
├── components/          # React components
├── services/           # API and business logic
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

### Adding New Tasks
Edit `src/store/writingStore.ts` to add new IELTS writing tasks:

```typescript
const newTasks = [
  {
    id: 'task-004',
    type: 'task2',
    title: 'Your Task Title',
    description: 'Full task description here...',
    category: 'your-category',
    difficulty: 'medium',
    wordCount: { min: 250, max: 300 },
    timeLimit: 40
  }
];
```

## 🎯 Target Audience

**Primary Users**: 26-45 year old working professionals preparing for IELTS
- **Goal**: Achieve 7.5+ band score
- **Challenge**: Limited study time due to work commitments
- **Solution**: Efficient, AI-powered practice with instant feedback

## 📈 Performance Targets

- **Response Time**: <5 seconds for scoring
- **Accuracy**: 90%+ vs human examiners
- **User Experience**: Mobile-first responsive design
- **Reliability**: 99.9% uptime

## 🔮 Roadmap

### Next Phase Features
- [ ] IELTS Task 1 (Academic & General)
- [ ] Speaking practice with AI feedback
- [ ] Listening and Reading modules
- [ ] Advanced analytics and insights
- [ ] Community features and peer review
- [ ] Offline mode and sync
- [ ] Multi-device synchronization

### Technical Enhancements
- [ ] Advanced prompt engineering
- [ ] Model fine-tuning for IELTS
- [ ] Performance optimizations
- [ ] A/B testing framework
- [ ] Error tracking and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review common problems below

### Common Issues

**"OpenAI API key not found"**
- Ensure `.env` file exists with `VITE_OPENAI_API_KEY`
- Restart the development server after adding the key

**"Failed to score essay"**
- Check your OpenAI API key validity
- Verify internet connection
- Check browser console for detailed error messages

**"Word count not updating"**
- Ensure you're typing in the textarea
- Check for JavaScript errors in console
- Refresh the page if issues persist
# Deployment ready - 2025年 8月 3日 星期日 22时47分03秒 CST
