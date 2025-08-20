
export interface ModelEssay {
  title: string;
  category: string;
  content: string;
  highlightedVocabulary: Array<{
    word: string;
    explanation: string;
    type: 'vocabulary' | 'phrase' | 'sentence-structure';
  }>;
  keySentences: Array<{
    sentence: string;
    structure: string;
    usage: string;
  }>;
}

export class ModelEssayGenerator {
  private static readonly MODEL_ESSAYS: Record<string, ModelEssay> = {
    'fast food and health': {
      title: '快餐与健康',
      category: '健康',
      content: `In today's fast-paced society, the proliferation of fast food has become a contentious issue that demands our attention. While these convenience-oriented establishments offer unparalleled accessibility to meals, I firmly believe that their detrimental impact on public health far outweighs any perceived benefits.

The most alarming consequence of fast food consumption is the exponential increase in obesity rates. Processed food items, which are laden with excessive calories, saturated fats, and refined sugars, contribute significantly to weight gain and metabolic disorders. Recent epidemiological studies have demonstrated that individuals who frequently patronize fast food restaurants are substantially more likely to develop type 2 diabetes, cardiovascular disease, and certain forms of cancer. Moreover, the nutritional deficiencies inherent in these meals deprive the body of essential vitamins, minerals, and dietary fiber, leading to long-term health complications.

However, it is imperative to acknowledge that fast food does provide certain societal benefits, particularly for time-constrained individuals. In our increasingly demanding modern lifestyle, these establishments offer expeditious meal solutions for those who lack the temporal resources to prepare nutritious alternatives. Additionally, the economic accessibility of fast food makes it financially viable for lower-income demographics, ensuring food security for vulnerable populations.

To mitigate these adverse effects, comprehensive intervention strategies are required. Governments should implement stringent regulations on advertising practices, particularly those targeting impressionable young consumers. Mandatory nutritional labeling and public health campaigns could empower consumers to make informed dietary choices. Furthermore, educational initiatives focusing on nutritional literacy and meal preparation skills could cultivate healthier eating habits across all socioeconomic strata.

In conclusion, while fast food offers undeniable convenience and affordability, its pernicious effects on public health necessitate immediate and sustained action. The burgeoning health crisis demands both individual responsibility and policy-level interventions to safeguard public well-being for future generations.`,
      highlightedVocabulary: [
        { word: 'fast-paced society', explanation: '快节奏社会 - 高级短语', type: 'phrase' },
        { word: 'proliferation', explanation: '激增/扩散 - 高级词汇', type: 'vocabulary' },
        { word: 'contentious issue', explanation: '有争议的问题 - 学术表达', type: 'phrase' },
        { word: 'detrimental impact', explanation: '有害影响 - 正式用语', type: 'phrase' },
        { word: 'far outweighs', explanation: '远远超过 - 比较级高级表达', type: 'phrase' },
        { word: 'exponential increase', explanation: '指数级增长 - 数学词汇活用', type: 'phrase' },
        { word: 'laden with', explanation: '充满/满载 - 形象化表达', type: 'phrase' },
        { word: 'epidemiological studies', explanation: '流行病学研究 - 专业词汇', type: 'phrase' },
        { word: 'frequently patronize', explanation: '经常光顾 - 正式表达', type: 'phrase' },
        { word: 'substantially more likely to', explanation: '更有可能 - 概率表达', type: 'phrase' },
        { word: 'nutritional deficiencies', explanation: '营养缺乏 - 专业术语', type: 'phrase' },
        { word: 'deprive the body of', explanation: '使身体缺乏 - 生动表达', type: 'phrase' },
        { word: 'imperative to acknowledge', explanation: '必须承认 - 强语气表达', type: 'phrase' },
        { word: 'time-constrained individuals', explanation: '时间受限的个人 - 复合形容词', type: 'phrase' },
        { word: 'expeditious meal solutions', explanation: '快速用餐解决方案 - 高级词汇组合', type: 'phrase' },
        { word: 'temporal resources', explanation: '时间资源 - 学术用语', type: 'phrase' },
        { word: 'financially viable', explanation: '经济上可行 - 商业术语', type: 'phrase' },
        { word: 'mitigate these adverse effects', explanation: '减轻这些不利影响 - 正式表达', type: 'phrase' },
        { word: 'comprehensive intervention strategies', explanation: '全面干预策略 - 政策用语', type: 'phrase' },
        { word: 'implement stringent regulations', explanation: '实施严格规定 - 政府用语', type: 'phrase' },
        { word: 'impressionable young consumers', explanation: '易受影响的年轻消费者 - 心理学词汇', type: 'phrase' },
        { word: 'empower consumers', explanation: '赋予消费者权力 - 现代商务用语', type: 'phrase' },
        { word: 'informed dietary choices', explanation: '明智的饮食选择 - 健康教育用语', type: 'phrase' },
        { word: 'nutritional literacy', explanation: '营养素养 - 健康教育术语', type: 'phrase' },
        { word: 'cultivate healthier eating habits', explanation: '培养更健康的饮食习惯 - 教育目标表达', type: 'phrase' },
        { word: 'pernicious effects', explanation: '有害影响 - 高级负面词汇', type: 'phrase' },
        { word: 'necessitate immediate and sustained action', explanation: '需要立即和持续的行动 - 政策呼吁表达', type: 'phrase' },
        { word: 'burgeoning health crisis', explanation: '日益严重的健康危机 - 危机描述', type: 'phrase' },
        { word: 'safeguard public well-being', explanation: '保障公众福祉 - 政府责任表达', type: 'phrase' }
      ],
      keySentences: [
        {
          sentence: 'In today\'s fast-paced society, the proliferation of fast food has become a contentious issue that demands our attention.',
          structure: '时间状语 + 主语 + 系动词 + 表语 + 定语从句',
          usage: '开篇句式，引入主题，使用高级词汇'
        },
        {
          sentence: 'While these convenience-oriented establishments offer unparalleled accessibility to meals, I firmly believe that their detrimental impact on public health far outweighs any perceived benefits.',
          structure: '让步状语从句 + 主句 + 宾语从句',
          usage: '平衡观点表达，使用高级形容词和动词短语'
        },
        {
          sentence: 'Recent epidemiological studies have demonstrated that individuals who frequently patronize fast food restaurants are substantially more likely to develop type 2 diabetes.',
          structure: '主语 + 谓语 + 宾语从句 + 定语从句',
          usage: '引用研究数据，使用学术表达'
        },
        {
          sentence: 'To mitigate these adverse effects, comprehensive intervention strategies are required.',
          structure: '目的状语 + 被动语态',
          usage: '解决方案表达，使用正式用语'
        }
      ]
    },
    'online shopping vs traditional stores': {
      title: '网购与传统商店',
      category: '科技',
      content: `The unprecedented growth of e-commerce platforms has fundamentally transformed consumer behavior, prompting heated debates about the long-term viability of traditional retail establishments. While digital marketplaces offer unmatched convenience and accessibility, I contend that brick-and-mortar stores will continue to play a vital role in our commercial ecosystem.

Online shopping has revolutionized the retail landscape by providing 24/7 accessibility to consumers worldwide. The ability to compare prices instantaneously across multiple platforms empowers consumers to make informed purchasing decisions. Additionally, product reviews and ratings offer invaluable insights that traditional shopping experiences simply cannot match. The convenience of doorstep delivery and flexible return policies further enhance the consumer experience.

However, traditional stores offer tangible advantages that digital platforms cannot replicate. The sensory experience of physically examining products before purchase reduces buyer's remorse and increases satisfaction levels. Personal interaction with knowledgeable sales staff provides customized recommendations and immediate problem resolution. Moreover, social shopping experiences with friends and family create lasting memories that transcend mere transactional relationships.

Service-oriented businesses such as hair salons, automotive repair centers, and fresh food markets inherently require in-person interactions that cannot be digitized. These establishments foster community connections and support local economies in ways that global e-commerce giants cannot replicate.

In conclusion, while online shopping will undoubtedly continue to expand, traditional retail establishments will adapt and evolve rather than vanish entirely. The future of commerce lies in harmonious integration where digital and physical retail complement each other's strengths to create superior consumer experiences.`,
      highlightedVocabulary: [
        { word: 'unprecedented growth', explanation: '前所未有的增长 - 强调程度', type: 'phrase' },
        { word: 'e-commerce platforms', explanation: '电子商务平台 - 专业术语', type: 'phrase' },
        { word: 'fundamentally transformed', explanation: '根本性地改变 - 强调变化程度', type: 'phrase' },
        { word: 'prompting heated debates', explanation: '引发激烈辩论 - 学术表达', type: 'phrase' },
        { word: 'long-term viability', explanation: '长期可行性 - 商业术语', type: 'phrase' },
        { word: 'digital marketplaces', explanation: '数字市场 - 现代商务词汇', type: 'phrase' },
        { word: 'unmatched convenience', explanation: '无与伦比的便利 - 强调优势', type: 'phrase' },
        { word: 'brick-and-mortar stores', explanation: '实体店 - 地道表达', type: 'phrase' },
        { word: 'commercial ecosystem', explanation: '商业生态系统 - 现代商业术语', type: 'phrase' },
        { word: 'revolutionized', explanation: '彻底改革 - 强烈动词', type: 'vocabulary' },
        { word: '24/7 accessibility', explanation: '24小时可访问性 - 现代表达', type: 'phrase' },
        { word: 'compare prices instantaneously', explanation: '即时比较价格 - 现代购物表达', type: 'phrase' },
        { word: 'empowers consumers', explanation: '赋予消费者权力 - 现代商务用语', type: 'phrase' },
        { word: 'informed purchasing decisions', explanation: '明智的购买决定 - 消费者决策', type: 'phrase' },
        { word: 'invaluable insights', explanation: '宝贵的见解 - 强调价值', type: 'phrase' },
        { word: 'doorstep delivery', explanation: '送货上门 - 电商特色', type: 'phrase' },
        { word: 'tangible advantages', explanation: '实际优势 - 强调具体好处', type: 'phrase' },
        { word: 'sensory experience', explanation: '感官体验 - 心理学词汇', type: 'phrase' },
        { word: 'physically examining products', explanation: '实际检查产品 - 购物行为', type: 'phrase' },
        { word: 'buyer\'s remorse', explanation: '买家懊悔 - 心理学术语', type: 'phrase' },
        { word: 'knowledgeable sales staff', explanation: '知识渊博的销售人员 - 服务质量', type: 'phrase' },
        { word: 'customized recommendations', explanation: '个性化推荐 - 现代服务', type: 'phrase' },
        { word: 'immediate problem resolution', explanation: '即时问题解决 - 客户服务', type: 'phrase' },
        { word: 'social shopping experiences', explanation: '社交购物体验 - 现代消费行为', type: 'phrase' },
        { word: 'transcend mere transactional relationships', explanation: '超越纯粹交易关系 - 高级表达', type: 'phrase' },
        { word: 'service-oriented businesses', explanation: '服务导向型企业 - 商业分类', type: 'phrase' },
        { word: 'inherently require', explanation: '本质上需要 - 强调必要性', type: 'phrase' },
        { word: 'in-person interactions', explanation: '面对面互动 - 社交术语', type: 'phrase' },
        { word: 'foster community connections', explanation: '培养社区联系 - 社会学表达', type: 'phrase' },
        { word: 'support local economies', explanation: '支持地方经济 - 经济学术语', type: 'phrase' },
        { word: 'harmonious integration', explanation: '和谐整合 - 政策用语', type: 'phrase' },
        { word: "complement each other's strengths", explanation: '互补优势 - 合作表达', type: 'phrase' }
      ],
      keySentences: [
        {
          sentence: 'The unprecedented growth of e-commerce platforms has fundamentally transformed consumer behavior, prompting heated debates about the long-term viability of traditional retail establishments.',
          structure: '主语 + 谓语 + 宾语 + 结果状语',
          usage: '开篇句式，使用高级词汇引入主题'
        },
        {
          sentence: 'While digital marketplaces offer unmatched convenience and accessibility, I contend that brick-and-mortar stores will continue to play a vital role in our commercial ecosystem.',
          structure: '让步状语从句 + 主句',
          usage: '表达平衡观点，使用对比词汇'
        },
        {
          sentence: 'The ability to compare prices instantaneously across multiple platforms empowers consumers to make informed purchasing decisions.',
          structure: '主语 + 谓语 + 宾语 + 宾补',
          usage: '描述网购优势，使用现代商务词汇'
        },
        {
          sentence: 'Service-oriented businesses such as hair salons, automotive repair centers, and fresh food markets inherently require in-person interactions that cannot be digitized.',
          structure: '主语 + 同位语 + 谓语 + 宾语',
          usage: '列举具体例子，使用专业分类词汇'
        }
      ]
    }
  };

  static generateModelEssay(taskTitle: string, _category?: string): ModelEssay | null {
    const lowerTitle = taskTitle.toLowerCase();
    
    for (const [key, essay] of Object.entries(this.MODEL_ESSAYS)) {
      if (lowerTitle.includes(key) || key.includes(lowerTitle)) {
        return essay;
      }
    }
    
    return null;
  }

  static getHighlightedContent(content: string, vocabulary: Array<{word: string, explanation: string}>): string {
    let highlightedContent = content;
    
    vocabulary.forEach(item => {
      const regex = new RegExp(`\\b${item.word.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(
        regex, 
        `<span class="bg-yellow-100 px-1 rounded text-blue-800 font-medium" title="${item.explanation}">${item.word}</span>`
      );
    });
    
    return highlightedContent;
  }
}