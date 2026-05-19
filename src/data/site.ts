export const company = {
  name: "北京天翔睿翼科技有限公司",
  shortName: "天翔睿翼",
  tagline: "AI算力服务与智能终端落地解决方案",
  description:
    "面向企业、文旅与商业空间，提供算力资源、模型接入、整机租赁及 AI 互动终端落地服务，支持项目实施与场景交付。",
  footerTitle: "AI 算力 · AI 终端 · AI 场景运营",
  footerDescription:
    "面向文旅、商业与城市空间，提供 AI 互动终端、算力服务与场景化解决方案。",
  email: "finance@freewifi8.com",
  address: "北京市东城区禄米仓胡同71号院3号楼4层",
  icp: "京ICP备14053542号"
};

export const seo = {
  defaultImage: "/assets/branding/001.jpg",
  keywords: [
    "AI算力服务",
    "GPU算力租赁",
    "大模型接入",
    "AI旅拍机",
    "AI潮玩卡牌机",
    "AI机器猫",
    "智能终端",
    "文旅数字化",
    "商业空间互动"
  ],
  pages: {
    "/": {
      title: "天翔睿翼｜AI算力服务与智能终端落地解决方案",
      description:
        "北京天翔睿翼科技有限公司面向企业、文旅与商业空间，提供AI算力资源、模型接入、整机租赁及AI互动终端落地服务。"
    },
    "/compute/": {
      title: "算力服务｜GPU算力资源、模型训练与推理部署",
      description:
        "提供GPU算力资源、模型训练、推理服务与企业AI应用开发支持，适配训练、推理和项目交付等多类算力需求。"
    },
    "/compute/market/": {
      title: "算力市场｜按需选择GPU算力配置",
      description:
        "按需开通GPU算力资源，支持模型训练、推理服务和AI应用开发，覆盖B300、H200、H100等多种算力配置。"
    },
    "/models/": {
      title: "模型市场｜主流大模型API接入与企业应用方案",
      description:
        "整合OpenAI、Claude、Gemini、DeepSeek、Kimi、通义千问、智谱GLM等主流大模型能力，支持API接入、企业应用和私有化部署咨询。"
    },
    "/rental/": {
      title: "整机租赁｜高性能GPU服务器与整机算力方案",
      description:
        "面向模型训练、推理服务和企业级AI部署，提供B300、H200、H100等整机算力租赁与项目交付支持。"
    },
    "/terminals/": {
      title: "智能终端｜AI互动设备与线下场景落地",
      description:
        "提供AI旅拍机、AI潮玩卡牌机、AI机器猫等智能终端产品，面向景区、商场、门店和品牌活动场景落地。"
    },
    "/terminals/travel-photo/": {
      title: "AI旅拍机｜文旅景区智能拍照与互动打卡设备",
      description:
        "云裳一刻AI旅拍机面向景区、文博、历史街区和城市地标场景，提供AI影像生成、游客互动、打卡传播和现场转化能力。"
    },
    "/terminals/card-machine/": {
      title: "AI潮玩卡牌机｜商场互动零售与个性化卡牌设备",
      description:
        "POPOFIFI AI潮玩卡牌机面向商场、IP联名、活动快闪和文旅场景，提供形象生成、实体卡牌、社交传播与互动零售体验。"
    },
    "/terminals/ai-cat/": {
      title: "AI机器猫引流机器人｜门店迎宾互动与会员沉淀",
      description:
        "AI机器猫面向茶饮门店、商业快闪、品牌联名和商场点位，支持主动迎宾、互动吸引、发券拍照和会员沉淀。"
    },
    "/about/": {
      title: "关于我们｜北京天翔睿翼科技有限公司",
      description:
        "北京天翔睿翼科技有限公司专注AI大模型、AI算力服务与智能终端产品落地，为企业、文旅项目和商业空间提供可交付的AI解决方案。"
    },
    "/cases/": {
      title: "案例中心｜AI终端与文旅商业场景落地案例",
      description:
        "展示天翔睿翼在文旅景区、商业空间、门店互动和AI终端项目中的真实落地案例与应用场景。"
    },
    "/solutions/": {
      title: "行业方案｜AI算力、智能终端与场景化解决方案",
      description:
        "围绕企业、文旅、商业空间和门店场景，提供从AI能力、智能终端到项目交付的行业解决方案。"
    },
    "/careers/": {
      title: "加入我们｜AI 推理、算法、全栈与嵌入式岗位招聘",
      description:
        "天翔睿翼长期招募 AI 推理平台工程师、算法工程师、全栈高级工程师与嵌入式软件工程师，参与大模型、智能终端与 AI 基础设施建设。"
    }
  }
};

export const navLinks = [
  { href: "/", label: "首页" },
  {
    href: "/compute/market/",
    label: "算力服务",
    matchPrefixes: ["/compute/", "/models/", "/rental/"]
  },
  {
    href: "/terminals/travel-photo/",
    label: "AI旅拍机",
    matchPrefixes: ["/terminals/travel-photo/"]
  },
  {
    href: "/terminals/card-machine/",
    label: "AI潮玩卡牌机",
    matchPrefixes: ["/terminals/card-machine/"]
  },
  {
    href: "/terminals/ai-cat/",
    label: "AI机器猫",
    matchPrefixes: ["/terminals/ai-cat/"]
  },
  {
    href: "/careers/",
    label: "加入我们",
    matchPrefixes: ["/careers/"]
  },
  { href: "/about/", label: "关于我们" }
];
