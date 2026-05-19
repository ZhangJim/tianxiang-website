export interface CareerDetail {
  intro: string;
  responsibilities: string[];
  requirements: string[];
  bonus: string[];
}

export interface Career {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  detail: CareerDetail;
}

export const careers: Career[] = [
  {
    slug: "ai-inference-engineer",
    title: "AI 推理平台工程师",
    tags: ["vLLM", "GPU", "推理平台"],
    summary: "参与构建高性能 AI 推理基础设施与模型服务平台。",
    detail: {
      intro:
        "负责公司大模型推理平台与算力服务后端的研发与优化，围绕 vLLM、SGLang 等推理引擎构建稳定、高并发的模型服务能力，服务于公司算力市场与 AI 应用产品。",
      responsibilities: [
        "设计与开发基于 vLLM / Triton / SGLang 等的推理服务架构",
        "优化模型推理性能（吞吐、延迟、显存利用率）",
        "维护多模型路由、负载均衡与限流策略",
        "配合算力调度，完成 GPU 资源的高效利用与运维"
      ],
      requirements: [
        "3 年以上后端或推理平台开发经验",
        "熟悉 Python / Go，具备良好的工程能力与代码品味",
        "熟悉至少一种主流推理引擎（vLLM / TensorRT-LLM / Triton）",
        "了解 GPU 体系结构、CUDA 基础与显存优化方法"
      ],
      bonus: [
        "有大模型服务上线、调优、稳定性保障经验",
        "熟悉 Kubernetes、容器化与服务网格",
        "持续关注 AI 工程化与开源社区"
      ]
    }
  },
  {
    slug: "algorithm-engineer",
    title: "算法工程师",
    tags: ["视觉", "LLM", "机器人"],
    summary: "负责视觉算法、大模型与智能交互能力建设。",
    detail: {
      intro:
        "负责公司视觉、对话与多模态算法能力建设，服务于 AI 旅拍机、AI 潮玩卡牌机、AI 机器猫等智能终端产品，推动算法在真实业务场景中的稳定落地。",
      responsibilities: [
        "研究并落地图像生成、人像识别、姿态识别、风格化等视觉算法",
        "大模型 Prompt / Agent / 多模态能力集成与场景化定制",
        "配合产品与终端，完成场景化算法定制与上线",
        "推动算法在边缘端 / 云端的工程化部署与持续迭代"
      ],
      requirements: [
        "计算机 / 人工智能 / 自动化等相关专业背景",
        "熟悉 Python 与 PyTorch，能独立完成模型训练、评估、部署",
        "至少一个方向有实际项目经验：视觉 / NLP / 多模态 / 强化学习",
        "关注前沿模型与开源生态，具备工程化落地能力"
      ],
      bonus: [
        "有图像生成（SD / ControlNet / ComfyUI）工程经验",
        "有 LLM Agent / RAG 系统、Function Calling 经验",
        "有机器人 / 嵌入式 / IoT 算法落地经验"
      ]
    }
  },
  {
    slug: "fullstack-engineer",
    title: "全栈高级工程师",
    tags: ["Go", "AI", "系统架构"],
    summary: "推动智能终端、AI 服务和系统架构持续升级。",
    detail: {
      intro:
        "负责公司业务平台、终端管理系统与 AI 应用产品的全栈开发，推动系统架构持续演进，保障线上服务的稳定与可扩展。",
      responsibilities: [
        "业务系统、终端管理平台、AI 服务接口的设计与开发",
        "前后端架构设计、模块拆分、性能与质量保障",
        "跨团队协作，与算法、嵌入式、产品紧密配合推动项目交付",
        "推动技术选型、规范沉淀与团队工程能力提升"
      ],
      requirements: [
        "5 年以上全栈或后端开发经验",
        "熟悉 Go 或 Node.js，具备成熟的前端工程经验",
        "熟悉系统架构设计、数据库选型、缓存与消息中间件",
        "关注 AI 应用工程，有结合 LLM / 大模型 API 的开发经验"
      ],
      bonus: [
        "主导过中等规模系统的设计与上线",
        "熟悉 Astro / React / Vue 等前端生态",
        "有 SRE / DevOps / 可观测性实践经验"
      ]
    }
  },
  {
    slug: "embedded-engineer",
    title: "嵌入式软件工程师",
    tags: ["Linux", "硬件接入", "设备控制"],
    summary: "负责智能终端设备接入与底层控制能力建设。",
    detail: {
      intro:
        "负责 AI 终端设备（旅拍机、卡牌机、机器猫等）的嵌入式底层、外设接入与硬件协同，保障终端在景区、商场等现场环境下的长期稳定运行。",
      responsibilities: [
        "Linux 嵌入式系统、应用层与底层驱动的开发与维护",
        "外设（摄像头、打印机、屏幕、传感器等）的接入与控制",
        "终端固件升级、远程运维与稳定性保障",
        "配合算法与平台，完成端侧能力对接与场景化定制"
      ],
      requirements: [
        "计算机 / 自动化 / 嵌入式 / 电子相关专业",
        "熟悉 Linux 系统、C / C++ / Python 中至少一种",
        "有嵌入式设备、工控机或商用终端的实际项目经验",
        "熟悉串口、USB、网络通信等常用协议"
      ],
      bonus: [
        "熟悉 Rockchip / 瑞芯微 / Jetson 等嵌入式平台",
        "有边缘 AI 推理部署、模型量化经验",
        "参与过工业互动 / 自助终端 / 零售设备类项目"
      ]
    }
  }
];

export interface Benefit {
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    title: "成长空间",
    description: "参与 AI、大模型与智能终端真实项目"
  },
  {
    title: "技术学习",
    description: "鼓励使用 AI 工具与新技术探索"
  },
  {
    title: "五险一金",
    description: "完善的基础保障体系"
  },
  {
    title: "带薪培训",
    description: "提供技术与业务成长机会"
  },
  {
    title: "团队氛围",
    description: "开放沟通、快速迭代"
  },
  {
    title: "弹性协作",
    description: "关注效率与结果"
  }
];

export const recruitContact = {
  email: "13439060173@xcastle.cn",
  subjectHint: "【应聘岗位】+姓名+工作年限"
};
