# PROJECT_CONTEXT.md

> AI 上下文文件 · 项目背景与系统结构
> 用途：让 AI 在新对话中快速理解“天翔睿翼官网项目”是什么、由哪些模块组成、必须遵循的设计原则。

---

## 一、项目背景

- 项目名称：**天翔睿翼官网项目**（`tianxiang-website`）
- 主体公司：**北京天翔睿翼科技有限公司**
- 项目性质：**企业官网 + 轻量后台管理**
- 项目状态：已上线，进入**长期迭代**阶段
- 项目目标：
  - 对外展示公司业务、产品与落地能力
  - 承接合作咨询线索（表单 → CSV）
  - 通过后台维护 AI 旅拍机点位数据
  - 支撑 SEO 与搜索引擎收录

## 二、官网定位

围绕公司两条主线业务对外展示与获客：

1. **AI 算力服务**：面向企业与项目方的算力 / 模型 / 整机资源
2. **智能终端落地**：面向文旅与商业空间的 AI 互动设备

官网整体气质要求：
- 偏 B 端、专业、有可信度
- 内容驱动，强调“真实落地”而非概念
- 视觉风格统一，不堆叠花哨动效

## 三、核心业务结构

```
天翔睿翼
├─ AI 算力服务
│  ├─ 算力市场（按需 GPU 资源）
│  ├─ 模型市场（主流大模型接入）
│  └─ 整机租赁（B300 / H200 / H100 等整机）
└─ 智能终端落地
   ├─ AI 旅拍机（云裳一刻 · 文旅场景）
   ├─ AI 潮玩卡牌机（POPOFIFI · 商业空间）
   └─ AI 机器猫（门店引流 · 互动迎宾）
```

辅助模块：
- **合作咨询**：`/about/` 表单 → `data/leads.csv`
- **后台管理**：`/admin/` 查看线索、维护旅拍机点位

## 四、当前模块结构

### 公开页面（前台）

| 路由 | 模块 | 说明 |
|---|---|---|
| `/` | 首页 | Hero、产品、能力、规模、合作伙伴 |
| `/compute/market/` | 算力市场 | GPU 算力按需选择 |
| `/models/` | 模型市场 | 主流大模型聚合接入 |
| `/rental/` | 整机租赁 | 整机型号列表 |
| `/rental/[slug]/` | 整机详情 | 单机型详情页 |
| `/terminals/travel-photo/` | AI 旅拍机 | 含点位查询 |
| `/terminals/card-machine/` | AI 潮玩卡牌机 | 商业空间互动设备 |
| `/terminals/ai-cat/` | AI 机器猫 | 门店迎宾互动 |
| `/about/` | 关于我们 | 公司介绍 + 合作咨询表单 |
| `/sitemap.xml` | 站点地图 | 动态生成 |
| `/robots.txt` | 爬虫规则 | 动态生成 |

### 后台页面

| 路由 | 模块 |
|---|---|
| `/admin/login/` | 登录页 |
| `/admin/` | 后台首页（查看 / 维护） |

### API 接口

| 路由 | 用途 |
|---|---|
| `POST /api/contact` | 合作咨询表单提交 |
| `GET /api/locations` | 前台旅拍机点位查询（公开只读） |
| `POST /api/admin/login` | 后台登录 |
| `POST /api/admin/logout` | 退出登录 |
| `GET /api/admin/leads` | 合作咨询查看 / 导出 CSV |
| `GET/POST/PUT/DELETE /api/admin/locations` | 点位增删改查、导入、导出 |

## 五、技术栈

| 类别 | 选型 |
|---|---|
| 框架 | **Astro 4**（`output: "hybrid"`） |
| 运行时 | Node.js（`@astrojs/node` standalone） |
| 语言 | **原生 TypeScript**（不引入额外前端框架） |
| 样式 | **原生 CSS**，单文件 `public/styles/global.css` |
| 数据存储 | **CSV 文件**（无数据库） |
| 部署 | Node + PM2 + Nginx 反代 + HTTPS |

明确**不引入**的依赖（除非有强需求）：
- React / Vue / Svelte 等前端框架
- Tailwind / UnoCSS 等原子化 CSS
- 状态管理库
- ORM / 数据库驱动

## 六、目录结构规范

```
.
├─ public/
│  ├─ assets/                         图片、Logo、产品素材
│  ├─ data/travel-photo-locations.csv 旅拍机点位数据
│  └─ styles/global.css               全局样式
├─ src/
│  ├─ components/                     通用组件（Hero / CardGrid / SectionTitle / ComputeTabs）
│  ├─ data/                           页面内容、SEO、导航、产品数据（TS 模块）
│  ├─ layouts/BaseLayout.astro        统一布局（导航 / 页脚 / SEO 注入）
│  ├─ lib/                            服务端工具（csv / adminAuth / adminData）
│  └─ pages/                          页面路由 + API
│     ├─ admin/                       后台页面
│     ├─ api/                         表单与后台 API
│     ├─ compute/  models/  rental/   算力服务三模块
│     └─ terminals/                   智能终端三模块
├─ data/leads.csv                     运行时生成，不进 Git
├─ astro.config.mjs
└─ package.json
```

## 七、页面结构规范

每个页面必须遵循以下结构：

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
// 数据从 src/data/ 引入，不在页面内写死大段内容
---

<BaseLayout title="页面名">
  <!-- Hero 区 -->
  <section class="page-section">
    <div class="shell">
      <!-- 内容分区 -->
    </div>
  </section>
</BaseLayout>
```

强制要求：
1. **必须使用 `BaseLayout`**：导航、页脚、SEO 由 BaseLayout 统一注入
2. **必须传入 `title`**：用于 SEO 与浏览器标题
3. **页面外层使用 `<section class="page-section">`**：保持垂直节奏一致
4. **内容容器使用 `<div class="shell">`**：保证宽度约束统一（`min(1180px, calc(100% - 32px))`）
5. **内容数据写在 `src/data/*.ts`**：页面只负责渲染，不堆数据
6. **页面级脚本仅写当前页面所需逻辑**，禁止污染全局

## 八、系统设计原则

1. **数据驱动渲染**
   列表 / 卡片 / 型号 / 案例统一抽到 `src/data/*.ts`，页面遍历渲染。新增字段时**同步更新页面渲染逻辑**。

2. **CSV 作为存储**
   合作咨询、点位数据都使用 CSV，**保持 UTF-8 + BOM 编码**，字段顺序不得随意调整。

3. **混合渲染模式（hybrid）**
   - 静态展示页 → 默认预渲染
   - 含 API / 后台 / 表单 → 设置 `export const prerender = false`

4. **SEO 统一在 BaseLayout 处理**
   不在单页里手写 `<head>` 标签。SEO 文案集中在 `src/data/site.ts` 的 `seo.pages` 字典。

5. **风格一致性高于个性化**
   任何新页面优先复用现有 class（`page-section` / `shell` / `info-card` / `eyebrow` 等），不轻易新建一套样式。

6. **后台为轻量维护工具，不是 CRM**
   后台只做：查看线索（只读）+ 点位维护。不要在后台里堆通用 CRUD 框架。

7. **谨慎引入依赖**
   只有 `astro` 和 `@astrojs/node` 两个依赖。新增依赖必须有明确理由。

8. **生产敏感数据通过环境变量**
   `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` / `PUBLIC_SITE_URL` 等不进代码。

## 九、环境变量

| 变量 | 用途 |
|---|---|
| `CONTACT_LEADS_FILE` | 合作咨询 CSV 写入位置（默认 `data/leads.csv`） |
| `TRAVEL_PHOTO_LOCATIONS_FILE` | 点位 CSV 位置（默认 `public/data/travel-photo-locations.csv`） |
| `PUBLIC_SITE_URL` | 正式域名（用于 canonical / sitemap / OG） |
| `ADMIN_USERNAME` | 后台账号 |
| `ADMIN_PASSWORD` | 后台密码 |
| `ADMIN_SESSION_SECRET` | 后台 session 签名密钥 |

## 十、AI 协同提醒

AI 在本项目中工作时应：
- 默认沿用现有页面写法，不引入新框架 / 新构建工具
- 修改通用 class 前先检查影响范围
- 增加新产品 / 新页面优先走"加数据 → 复用结构"路径
- 涉及 CSV 字段时与 [BUSINESS_RULES.md](BUSINESS_RULES.md) 保持一致
- UI 改动遵循 [UI_RULES.md](UI_RULES.md)
- 每次有意义的更新追加进 [CHANGELOG.md](CHANGELOG.md)
