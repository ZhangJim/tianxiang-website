# 天相官网项目

基于 `Astro` 搭建的静态官网项目，当前以“算力服务 + AI 终端”两条业务线为主线组织内容。项目采用按页面分文件的方式开发，每个路由都有独立的页面文件，适合继续扩展产品页、案例页和详情页。

## 技术栈

- `Astro 4`
- 原生 `TypeScript` 数据文件
- 静态站点输出（`output: "static"`）
- 静态资源目录：`public/`

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认会启动 Astro 本地开发服务器。

## 构建与预览

生产构建：

```bash
npm run build
```

构建产物会输出到：

```text
dist/
```

本地预览构建结果：

```bash
npm run preview
```

## 项目结构

```text
.
├─ public/                 # 静态资源，图片、品牌素材、全局样式
│  ├─ assets/
│  └─ styles/
├─ src/
│  ├─ components/          # 可复用组件
│  ├─ data/                # 页面内容数据
│  ├─ layouts/             # 页面公共布局
│  └─ pages/               # 路由页面，按目录映射 URL
├─ dist/                   # 构建产物
├─ astro.config.mjs        # Astro 配置
├─ package.json
└─ tsconfig.json
```

## 页面与路由

当前页面主要分布在 `src/pages/`：

- `src/pages/index.astro`：首页
- `src/pages/about/index.astro`：关于我们
- `src/pages/cases/index.astro`：案例中心
- `src/pages/compute/index.astro`：算力服务入口页
- `src/pages/compute/market/index.astro`：算力市场页
- `src/pages/models/index.astro`：模型相关页面
- `src/pages/rental/index.astro`：整机租赁列表页
- `src/pages/rental/[slug].astro`：整机租赁详情动态路由
- `src/pages/solutions/index.astro`：解决方案页
- `src/pages/terminals/index.astro`：终端产品入口页
- `src/pages/terminals/travel-photo/index.astro`：AI 旅拍机页面
- `src/pages/terminals/card-machine/index.astro`：AI 潮玩卡牌机页面

说明：

- Astro 会根据 `src/pages` 的目录结构自动生成路由。
- `rental/[slug].astro` 使用 `getStaticPaths()` 基于数据文件生成静态详情页。

## 内容维护方式

这个项目的内容组织方式比较清晰，页面结构和内容数据是分开的：

- `src/layouts/BaseLayout.astro`
  负责站点公共头部、导航、页脚和全局基础结构。
- `src/components/`
  放通用展示组件，比如 `Hero`、`SectionTitle`、`CardGrid`、`ComputeTabs`。
- `src/data/`
  放页面内容数据，页面通常从这里读取文案、卡片列表、产品信息和案例信息。

当前主要数据文件包括：

- `src/data/site.ts`：公司基础信息、导航配置
- `src/data/compute.ts`：算力服务相关内容
- `src/data/rental.ts`：整机租赁列表与详情数据
- `src/data/terminals.ts`：终端产品内容
- `src/data/travelPhoto.ts`：旅拍机相关素材/内容
- `src/data/cardMachine.ts`：卡牌机相关素材/内容
- `src/data/cases.ts`：案例数据

如果只是更新文案、卡片、型号或案例，优先改 `src/data/`；如果是改页面结构和样式，再改 `src/pages/`、`src/components/` 或 `public/styles/global.css`。

## 开发约定

- 每个页面单独维护，便于按业务模块扩展。
- 公共结构尽量沉淀到 `layouts` 和 `components`。
- 列表型、配置型内容优先放到 `src/data/`，避免把大量文案直接写死在页面里。
- 静态图片、Logo、品牌素材统一放到 `public/assets/`。

## 适合后续继续扩展的方向

- 补充每个业务线的二级详情页
- 为案例中心增加详情页和分类筛选
- 为产品和租赁页面补充 SEO 元信息
- 增加表单、埋点或外部 CRM/线索收集能力
- 补充 README 中未记录的部署方式和环境规范
