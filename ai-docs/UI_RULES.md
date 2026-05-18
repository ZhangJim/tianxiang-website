# UI_RULES.md

> AI 上下文文件 · UI 与样式规范
> 用途：约束所有页面的布局、组件、交互、响应式与视觉风格，确保官网整体一致。

---

## 一、设计基调

- 整体定位：**B 端官网 + 文旅商业气质**，专业、克制、有温度
- 颜色基调：暖米色背景 + 橙色主题色 + 深绿暗色点缀
- 字体：`"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`
- 圆角：偏大圆角（按钮使用 `border-radius: 999px`）
- 阴影：柔和大投影，避免锐利硬边

### 设计变量（来自 `public/styles/global.css`）

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg` | `#f3f1eb` | 页面底色 |
| `--surface` | `rgba(255,255,255,0.82)` | 卡片背景（带透明感） |
| `--text` | `#151515` | 正文主色 |
| `--muted` | `#5d605f` | 副文字 |
| `--line` | `rgba(21,21,21,0.1)` | 分割线 |
| `--accent` | `#c66a2b` | 品牌橙（CTA / 高亮） |
| `--accent-dark` | `#1d3b36` | 深绿点缀 |
| `--shadow` | `0 24px 60px rgba(24,22,19,0.08)` | 卡片柔光阴影 |

> 新增颜色应优先复用变量，必要时在 `:root` 中扩展，**禁止页面内写死十六进制色**（除非业务图素材属性）。

---

## 二、页面布局规则

### 容器
- 所有页面外层使用 `<section class="page-section">`
- 内层使用 `<div class="shell">`（宽度：`min(1180px, calc(100% - 32px))`）
- 不允许直接在 `<main>` 下写裸内容

### 节奏
- 每个主要内容块都是一个 `page-section`
- 同一页内的 section 顺序：
  1. Hero / Banner
  2. 核心产品 / 能力
  3. 数据 / 案例 / 规模
  4. 合作伙伴 / 信任背书
  5. CTA / 联系入口（如有）
- section 之间的间距由 `page-section` 控制，**禁止在页面里写自定义垂直 margin**

### 标题分区
- 每个区块标题统一使用 `<div class="section-title">`（紧凑款用 `compact-title` 修饰）
- 结构：
  ```html
  <div class="section-title compact-title">
    <p class="eyebrow">SECTION KEY</p>
    <h2>区块中文标题</h2>
  </div>
  ```
- `eyebrow` 使用**大写英文短语**，作为视觉锚点
- `<h2>` 使用中文，**简短有力**（不超过 18 字为佳）

---

## 三、Hero 区域规范

Hero 有两类形态：

### A. 通用 Hero（使用 `src/components/Hero.astro`）
- 字段：`eyebrow` / `title` / `description` / `primaryHref+primaryLabel` / `secondaryHref+secondaryLabel`
- 右侧支持 `<slot>` 插入图像或可视化
- 适用于：算力 / 模型 / 租赁 / 终端等内页

### B. 首页定制 Hero（`home-hero` + `home-hero-grid`）
- 左侧：`eyebrow + h2 + hero-copy`
- 右侧：`hero-scene` 主图
- 不复用 `Hero.astro` 组件，是首页独立结构

### 强制规则
- Hero **必须**有 `eyebrow` 与 `h2/h1`
- Hero 文案最多 2 行（一行英文 eyebrow + 一行核心 slogan）
- 副文案 `hero-copy` 不超过 80 字
- 不在 Hero 中堆叠多个 CTA，**最多 2 个按钮**（主 + 次）

---

## 四、卡片展示规范

### 标准信息卡：`.info-card`
- 用于能力介绍、服务说明、关于我们等场景
- 结构：
  ```html
  <article class="info-card">
    <p class="card-meta">可选元信息</p>
    <h3>卡片标题</h3>
    <p>卡片描述</p>
    <a href="...">查看详情</a>  <!-- 可选 -->
  </article>
  ```
- 多卡布局使用 `<div class="card-grid">` 包裹

### 产品卡：`.home-product-card`
- 含图：上图下文
- 必须包含 `<img loading="lazy">`
- 跳转链接放在卡片底部，文案统一为「查看详情」

### 通用要求
- 卡片高度尽量自动撑开，**禁止固定高度**
- 卡片标题统一使用 `<h3>`
- 卡片描述使用 `<p>`，不超过 3 行
- 不要在卡片里混入按钮（除非整页设计需要），优先使用文字链接

### 复用组件
- `CardGrid.astro`：通用卡片网格（适用于纯文字卡片）
- 自定义卡片样式时优先扩展 `info-card`，命名加业务前缀（如 `about-capability-card`）

---

## 五、列表展示规范

- 数据列表（如租赁型号、模型列表）使用**卡片网格**或**表格**两种之一，不混用
- 卡片型列表用 `card-grid` 或带业务前缀的 grid（如 `home-product-grid`、`home-stat-grid`）
- 列表项数量超过 6 个时考虑加筛选或分组
- **禁止使用 `<ul>` 默认样式直接渲染业务数据列表**

---

## 六、表格规范（用于算力市场 / 整机租赁 / 后台列表）

- 表头使用 `<thead>`，正文使用 `<tbody>`
- 单元格内不要写大段描述，长文放在卡片或抽屉中
- 表格容器需要在小屏可横向滚动（外层加 `overflow-x: auto`）
- 数值列右对齐、文本列左对齐
- 状态字段使用「标签」展示（见下一节）

---

## 七、标签规范（Tag）

- 通用标签：`.tag`，灰底圆角，用于关键词 / 能力 / 状态
- 标签列表使用 `<div class="tag-list">` 包裹
- 标签文字不超过 6 个字
- 颜色变体（建议命名）：
  - 默认：中性灰
  - 高亮：橙色 `--accent`
  - 成功 / 已落地：深绿 `--accent-dark`
  - 警告 / 跟进中：可适当使用半透明橙
- **禁止用按钮样式假装标签**

---

## 八、按钮与 CTA

| 类名 | 用途 |
|---|---|
| `.button.button-primary` | 主操作（橙色渐变） |
| `.button.button-secondary` | 次操作（浅色描边或淡背景） |
| `.nav-cta` | 顶部导航右侧「商务咨询」 |

强制规则：
- 按钮最小高度 44px（无障碍 / 移动端可点）
- 圆角 `999px`
- 一屏内主按钮**最多 1 个**
- 链接不写成按钮样式，反之亦然

---

## 九、页面交互规则

- 表单提交统一 `POST application/json`，错误返回 `{ "message": "..." }`
- 表单错误信息**显示在表单下方**或字段下，不弹 alert
- 表单成功提示使用页面内提示条，不要跳转
- 所有跳转链接是 `<a href>`，**不要用 JS 控制 `location.href`**（除非有埋点需求）
- 滚动锚点跳转使用 `#id`，配合 `html { scroll-behavior: smooth }`
- 禁止引入第三方动效库（GSAP / framer 等）；轻量动效用纯 CSS

---

## 十、响应式规则

### 断点（与 `global.css` 保持一致）
| 设备 | 宽度 | 行为 |
|---|---|---|
| 桌面 | ≥ 1024px | 默认布局 |
| 平板 | 768px ~ 1023px | 网格降列、字号略减 |
| 手机 | < 768px | 单列堆叠、导航折叠、卡片宽度铺满 |

### 强制要求
- 所有新样式必须有移动端表现，**默认走单列**
- 移动端字号下限：正文 14px、标题 20px
- 移动端不允许出现横向滚动条（表格区域除外）
- 图片必须设置 `loading="lazy"`（首屏 Hero 主图除外）
- 移动端导航：顶部紧凑展示，必要时折叠

### 媒体查询
- 移动端样式**集中放在已有的媒体查询区域**，不要每个新模块自己写一段
- 顺序：先桌面默认，再 `@media (max-width: 1023px)`，再 `@media (max-width: 767px)`

---

## 十一、图像规范

- 文件路径：`public/assets/<模块名>/<文件名>`
- 文件名必须英文 / 拼音 / 数字，**禁止中文文件名**（避免 CDN 编码问题）
- 大图（Hero、主图）必须**预压缩**至合理体积
- 所有 `<img>` 必须有 `alt`，描述图片内容（不写「图片」「banner」这种无效词）
- 同一卡片网格内图片**比例保持一致**（如 16:9 或 4:3）

---

## 十二、页面统一风格清单（AI 自检表）

在新增或修改页面前自查：

- [ ] 是否使用 `BaseLayout`？
- [ ] 顶层是否用 `page-section + shell`？
- [ ] 区块是否带 `section-title + eyebrow`？
- [ ] 是否复用了现有的 `info-card` / `card-grid` / `tag` 等 class？
- [ ] 颜色是否使用 CSS 变量？
- [ ] 是否在移动端单列堆叠且无横滚？
- [ ] 图片是否有 `alt` 和 `loading="lazy"`？
- [ ] 文案是否短而有力（不堆术语）？
- [ ] 是否避免引入新依赖？
- [ ] SEO 是否走 `BaseLayout` 注入（而非手写 head）？

---

## 十三、不允许做的事

1. ❌ 引入 React / Vue / Tailwind / UnoCSS
2. ❌ 在 `.astro` 文件内写 `<style>` 大段全局样式（局部 scoped 可用，但优先放 `global.css`）
3. ❌ 通过 JS 动态改全局变量
4. ❌ 写死颜色 / 字号 / 阴影（应使用变量或既有 class）
5. ❌ 用 `<div>` 堆代替语义化 `<section> <article> <nav> <header>`
6. ❌ 在页面内复制粘贴大段相同 UI（应提为组件或抽到 `src/data/`）
7. ❌ 把后台样式与前台样式混用（后台样式独立成段，避免污染）
