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
  { href: "/about/", label: "关于我们" }
];
