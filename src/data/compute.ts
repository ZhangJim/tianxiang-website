// export const computeHighlights = [
//   {
//     title: "算力市场",
//     description: "面向企业与项目方提供可筛选、可比价的 GPU 算力资源。",
//     href: "/compute/market/"
//   },
//   {
//     title: "模型市场",
//     description: "聚合主流热门模型生态、接入方式与交付能力，支持接入咨询与部署规划。",
//     href: "/models/"
//   },
//   {
//     title: "整机租赁",
//     description: "提供多型号整机租赁与交付支持，适合训练、推理和私有部署。",
//     href: "/rental/"
//   }
// ];

export const marketFilters = {
  billing: ["按量计费", "包日", "包周", "包月"],
  regions: ["全部", "北京", "青海", "华东"],
  gpus: [
    "全部",
    "B300",
    "H200",
    "H100",
    "RTX PRO 6000",
    "RTX 5090",
    "RTX 4090"
  ],
  cardCounts: ["1 卡", "2 卡", "4 卡", "8 卡"]
};

export const marketItems = [
  {
    name: "B300 192GB",
    region: "可对接",
    cpu: "64 核",
    memory: "1024 GB",
    storage: "2 TB + 8 TB",
    cuda: "最新版本",
    price: "企业定制报价",
    note: "适合超大模型训练与企业级AI基础设施部署。"
  },
  {
    name: "H200 141GB",
    region: "华东",
    cpu: "32 核",
    memory: "512 GB",
    storage: "1 TB + 4 TB",
    cuda: "12.4",
    price: "￥28.00 / 时",
    note: "适合大模型训练、高并发推理与多模态任务。"
  },
  {
    name: "H100 80GB",
    region: "青海",
    cpu: "64 核",
    memory: "512 GB",
    storage: "1 TB + 8 TB",
    cuda: "12.4",
    // stock: "0 / 8 可用",
    price: "￥19.90 / 时",
    note: "面向高性能训练、复杂推理和大规模并发场景。"
  },
  {
    name: "RTX PRO 6000 96GB",
    region: "北京",
    cpu: "32 核",
    memory: "256 GB",
    storage: "500 GB + 4 TB",
    cuda: "12.4+",
    price: "￥12.00 / 时",
    note: "适合高性能推理、图像生成、视频生成与多模态应用部署。"
  },
  {
    name: "RTX5090 32GB",
    region: "北京",
    cpu: "16 核",
    memory: "128 GB",
    storage: "200 GB + 3 TB",
    cuda: "12.4+",
    price: "￥5.90 / 时",
    note: "适合图像生成、高性能推理与中等规模训练任务。"
  }
 
];

export const modelCategories = [

];

export const modelEcosystemProviders = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "DeepSeek",
  "Moonshot Kimi",
  "通义千问",
  "智谱 GLM",
  "xAI Grok"
];

// export const modelMarketHighlights = [
//   {
//     value: "多模型接入与能力组合",
//     label: "主流模型生态"
//   },
//   {
//     value: "对话 / 推理 / 视觉 / 多模态",
//     label: "热门能力类型"
//   },
//   {
//     value: "API接入与应用开发支持",
//     label: "接入形态"
//   },
//   {
//     value: "场景方案设计与落地交付",
//     label: "项目交付方式"
//   }
// ];



export const models = [
  {
    provider: "OpenAI",
    name: "GPT 系列",
    version: "GPT-5 / GPT-4.1 / GPT-4o / GPT Image",
    category: "旗舰对话模型",
    capability: "通用对话、工具调用、代码辅助、视觉理解、图像生成",
    scenario: "企业 Copilot、知识库问答、智能客服、内容生产、图像生成",
    status: "热门模型聚合接入规划",
    delivery: "API 聚合 / 项目集成",
    tags: ["热门模型", "对话", "视觉", "工具调用"]
  },
  {
    provider: "Anthropic",
    name: "Claude 系列",
    version: "Claude Sonnet 4 / Opus 4",
    category: "旗舰对话模型",
    capability: "长文理解、复杂任务拆解、代码生成、企业文档分析",
    scenario: "研发辅助、文档处理、流程自动化、知识工作台",
    status: "企业接入咨询",
    delivery: "API 聚合 / 企业专线",
    tags: ["长上下文", "代码", "企业办公"]
  },
  {
    provider: "Google",
    name: "Gemini 系列",
    version: "Gemini 2.5 Pro / Flash",
    category: "多模态模型",
    capability: "多模态理解、长上下文、推理分析、实时交互",
    scenario: "搜索问答、文档分析、图文理解、智能助手",
    status: "聚合接入建设中",
    delivery: "API 聚合 / 场景集成",
    tags: ["多模态", "长上下文", "轻量调用"]
  },
  {
    provider: "DeepSeek",
    name: "DeepSeek 系列",
    version: "R1 / V3",
    category: "推理与代码模型",
    capability: "复杂推理、代码生成、数学分析、长文本处理",
    scenario: "企业问答、研发辅助、智能客服、内部知识助手",
    status: "可咨询接入",
    delivery: "公有 API / 私有部署咨询",
    tags: ["高热度", "推理", "代码"]
  },
  {
    provider: "Moonshot",
    name: "Kimi 系列",
    version: "Kimi K2 / 长文本能力版本",
    category: "旗舰对话模型",
    capability: "长文档总结、知识问答、办公提效、内容整理",
    scenario: "知识库问答、文档分析、内容生产、办公助理",
    status: "可咨询接入",
    delivery: "API 聚合 / 企业应用接入",
    tags: ["中文能力", "长文本", "办公场景"]
  },
  {
    provider: "阿里云百炼",
    name: "通义千问系列",
    version: "Qwen-Max / Qwen-Plus / Qwen-Flash / Qwen-VL",
    category: "多模态模型",
    capability: "中文对话、指令跟随、多模态理解、企业工作流接入",
    scenario: "企业应用、内容平台、客服系统、图文理解",
    status: "企业接入咨询",
    delivery: "API 聚合 / 云上集成",
    tags: ["中文生态", "多规格", "图文理解"]
  },
  {
    provider: "智谱",
    name: "GLM 系列",
    version: "GLM-4 / GLM-4V",
    category: "多模态模型",
    capability: "通用问答、工具调用、视觉理解、应用开发支持",
    scenario: "Agent 应用、文档处理、图文识别、企业助手",
    status: "接入评估中",
    delivery: "API 聚合 / 项目制接入",
    tags: ["国产模型", "Agent", "视觉"]
  },
  {
    provider: "xAI",
    name: "Grok 系列",
    version: "Grok 热门版本",
    category: "旗舰对话模型",
    capability: "实时问答、推理对话、开放式内容生成",
    scenario: "热点内容、开放问答、社交内容辅助、创意生成",
    status: "热门能力跟进中",
    delivery: "聚合接入规划",
    tags: ["热点模型", "开放问答", "内容生成"]
  },
  {
    provider: "平台级能力",
    name: "视觉与图像生成模型",
    version: "平台聚合能力",
    category: "视觉与图像模型",
    capability: "图像生成、海报物料、角色形象、图文扩写与营销视觉",
    scenario: "视觉营销、旅拍、品牌内容、终端互动展示",
    status: "一键调用建设中",
    delivery: "API 聚合 / 场景化封装",
    tags: ["图像生成", "视觉营销", "终端联动"]
  },
  {
    provider: "行业交付",
    name: "文旅与商业空间模型",
    version: "定制版",
    category: "行业定制模型",
    capability: "文旅内容生成、导览问答、商场互动话术、终端内容生产",
    scenario: "景区导览、内容生成、商业互动、智能终端",
    status: "私有部署咨询",
    delivery: "私有化 / 项目交付",
    tags: ["行业模型", "定制训练", "终端方案"]
  }
];
