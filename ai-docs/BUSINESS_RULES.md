# BUSINESS_RULES.md

> AI 上下文文件 · 业务规则与数据规范
> 用途：约束产品展示口径、数据维护方式、后台权限、CSV 字段、API 行为与 SEO 规则。

---

## 一、产品展示规则

### 业务主线

官网只对外讲两条线：

1. **AI 算力服务**：算力市场、模型市场、整机租赁
2. **智能终端落地**：AI 旅拍机、AI 潮玩卡牌机、AI 机器猫

不允许新增第三条主线，除非业务侧明确扩展。

### 产品文案口径

| 产品 | 对外品牌名 | 主要场景 | 关键词锚点 |
|---|---|---|---|
| AI 旅拍机 | 云裳一刻 | 景区 / 文博 / 历史街区 / 城市地标 | 文化数字活化、即时出片、文化旅拍 |
| AI 潮玩卡牌机 | POPOFIFI | 商场 / IP 联名 / 快闪 / 文旅 | 形象生成、实体卡牌、社交传播 |
| AI 机器猫 | 无独立子品牌 | 茶饮门店 / 商场点位 / 品牌联名 | 主动迎宾、互动吸引、会员沉淀 |
| 算力市场 | — | 企业训练 / 推理 | 按需 GPU、计费灵活、多区域 |
| 模型市场 | — | 企业应用 / 接入 | 主流模型聚合、API 接入、私有化咨询 |
| 整机租赁 | — | 大模型训练 / 企业部署 | B300 / H200 / H100 等整机 |

### 文案约束
- **不允许**承诺"保证签约""保证收益""百分百落地"等绝对话术
- **不允许**虚标数字（如设备数、合作景区数），现有口径见 `src/data/`（如 `300+ 景区合作`、`50+ 商业体落地`、`1200+ 设备长期运营`）
- 改数据时必须**同步更新所有出现位置**，至少检查：首页 `index.astro`、`src/data/travelPhoto.ts`
- 模型市场不出现具体调用价格；算力市场可写公开报价（如 `￥28.00/时`）

### 模型市场覆盖范围

当前对外展示的模型生态（顺序保持稳定）：

```
OpenAI / Anthropic / Google Gemini / DeepSeek / Moonshot Kimi /
通义千问 / 智谱 GLM / xAI Grok
```

新增模型必须：
- 在 `src/data/compute.ts` 的 `models` 数组里增加完整字段
- 同步更新 `modelEcosystemProviders`（如需在生态条上展示）
- 不擅自删除已有提供方

### 整机租赁机型

当前机型来自 `src/data/rental.ts`：
`B300-8 / H200-8 / H100-8 / RTX-PRO6000-4 / RTX5090-4`

- 每台必须填齐：`slug / name / gpu / count / cpu / memory / storage / network / price / delivery / usage`
- `slug` 用于 URL（`/rental/[slug]/`），**只能使用英文小写 + 数字 + 连字符**
- 价格写法：可写`￥X.XX / 时`或`面议 / 月`或`企业定制报价`，**不混用单位**

---

## 二、数据维护规则

### 内容数据：`src/data/*.ts`

| 文件 | 内容 |
|---|---|
| `site.ts` | 公司信息、SEO 文案、导航 |
| `compute.ts` | 算力市场筛选项、机器列表、模型列表 |
| `rental.ts` | 整机租赁机型 |
| `travelPhoto.ts` | AI 旅拍机页面内容（数据 / 价值 / 体验 / 案例 / 画廊） |
| `cardMachine.ts` | AI 潮玩卡牌机页面内容 |
| `aiCat.ts` | AI 机器猫页面内容 |
| `terminals.ts` | 终端聚合页内容 |
| `cases.ts` | 案例聚合内容 |

强制约束：
- 这些文件只放**数据与结构化文案**，**不写样式 / 不写 JSX 逻辑**
- 字段使用统一命名风格：英文 camelCase，中文字段仅在 CSV 行使用
- 新增字段必须**同步更新页面渲染**与本文件
- 删除字段必须**确认无页面引用**后再删

### 运行时数据：CSV

| 文件 | 用途 | 谁能编辑 |
|---|---|---|
| `data/leads.csv` | 合作咨询线索 | 仅运行时写入，**禁止人工编辑** |
| `public/data/travel-photo-locations.csv` | 旅拍机点位 | 通过 `/admin/` 后台维护 |
| `public/data/*.bak` | 点位备份 | 自动生成，不要手工删 |

---

## 三、后台管理规则

### 后台定位
- **轻量维护工具**，不是 CRM、不是 BI、不要扩成通用后台框架
- 只允许操作：查看线索、维护点位、导入导出

### 登录认证
- 账号来自环境变量 `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- Session 用 `ADMIN_SESSION_SECRET` 签名
- `/admin/*` 与 `/api/admin/*` 必须**鉴权后才可访问**
- `robots.txt` 已禁止抓取 `/admin/`，新增管理路径需同步禁止

### 权限边界
| 操作 | 是否允许 |
|---|---|
| 查看合作咨询 | ✅ |
| 导出合作咨询 CSV | ✅ |
| **修改 / 删除合作咨询** | ❌（保留追溯证据） |
| 新增 / 修改 / 删除点位 | ✅ |
| 导入 / 导出点位 CSV | ✅ |
| 直接覆盖 `leads.csv` | ❌ |
| 改全局站点配置 | ❌（走代码 PR） |

### 安全要求
- 生产环境**必须**改默认账号密码
- `ADMIN_SESSION_SECRET` 必须是随机长字符串
- `.env` 不进 Git
- 接口返回**不要泄露**目录路径、stack trace

---

## 四、点位数据规则（AI 旅拍机）

### CSV 字段（顺序不可变）

```
城市,点位名称,场景类型,设备类型,状态,说明,关键词
```

字段约束（来自 `src/lib/adminData.ts`）：

| 字段 | 必填 | 最大长度 |
|---|---|---|
| 城市 | ✅ | 80 |
| 点位名称 | ✅ | 120 |
| 场景类型 | ✅ | 80 |
| 设备类型 | ✅ | 80 |
| 状态 | ✅ | 40 |
| 说明 | ⚪ | 500 |
| 关键词 | ⚪ | 300 |

### 导入兼容性
后台 CSV 导入支持**字段别名**（见 `locationHeaderAliases`），例如：
- `城市` 可识别 `城市/省份`、`省份`、`省市`、`省/市`
- `点位名称` 可识别 `景区名称`、`景区名`、`名称`
- 其他字段同理

> 新增别名必须改 `src/lib/adminData.ts` 的 `locationHeaderAliases`，不要在前端临时映射。

### 数据写入流程
1. 后台 / API 修改 → 调 `updateLocations`
2. 文件加锁（`withFileLock`）→ 防止并发写入
3. 自动备份（`backupFile` 生成 `.bak`）
4. 先写临时文件 `.tmp` → 原子重命名

> 不允许跳过此流程直接 `writeFile`。

---

## 五、CSV 规则

### 统一约束
- **编码必须是 UTF-8 with BOM**（`﻿` 前缀）
- 行尾使用 `\n`，**不要混 `\r\n`**
- 单元格含逗号 / 双引号 / 换行时必须用双引号包裹
- 字段顺序**不可任意调整**，否则导入和前台查询会失效
- 不允许在 CSV 里写 Excel 公式（`=...`）

### 合作咨询字段（`data/leads.csv`）
```
提交时间,姓名,公司,手机号,咨询产品,来源IP
```

- `提交时间` 格式：`yyyy/MM/dd HH:mm:ss`（Asia/Shanghai，24 小时）
- `咨询产品` 只接受以下白名单（见 `src/pages/api/contact.ts`）：
  ```
  AI算力服务 / 模型接入 / 整机租赁 /
  AI旅拍机 / AI潮玩卡牌机 / AI机器猫 / 其他合作
  ```
- 手机号正则：`^1[3-9]\d{9}$`
- 字段最大长度：120

---

## 六、SEO 规则

### 统一注入
- 所有 SEO 元信息**由 `BaseLayout` 注入**，包括：
  `title / description / keywords / canonical / OG / Twitter / 结构化数据`
- 页面级文案集中维护在 `src/data/site.ts` 的 `seo.pages` 字典
- 新增页面必须**同步添加** SEO 配置项（key 是路径，带末尾 `/`）

### 标题与描述写法
- `title`：核心关键词在前，含「天翔睿翼」或品牌词，结构 `主关键词｜辅关键词`
- `description`：≤ 80 字，包含核心关键词，避免堆砌
- `keywords`：复用 `seo.keywords` 公共数组，不在单页里再写一套

### Canonical 与域名
- canonical 由 `PUBLIC_SITE_URL + 当前路径` 拼成
- 生产必须设置 `PUBLIC_SITE_URL`，否则 canonical / OG 链接错
- 路径末尾**统一带 `/`**（与 `seo.pages` key 保持一致）

### Sitemap & Robots
- `src/pages/sitemap.xml.ts` 动态生成
- 新增公开页面必须**同步进 sitemap**
- 后台路径（`/admin/`、`/api/admin/*`）必须在 `robots.txt` 禁止
- 上线后必须验证：
  - `https://域名/sitemap.xml`
  - `https://域名/robots.txt`

### 结构化数据
- 默认已注入 `Organization` + `WebSite`（见 `BaseLayout`）
- 单页如有特殊 schema（如 `Product`），按页扩展，不修改全局默认

---

## 七、API 规则

### 通用规范
- 所有 API 文件必须 `export const prerender = false`
- 请求体格式：`application/json`
- 响应体格式：`{ "message": "..." }` 或 `{ "items": [...] }`
- 出错统一返回 `{ "message": "错误描述" }` + 合适状态码
- **不要泄露**异常堆栈给前端

### 状态码约定
| 场景 | 状态码 |
|---|---|
| 成功 | `200` |
| 参数错误 / 字段缺失 | `400` |
| 未登录 | `401` |
| 权限不足 | `403` |
| 资源不存在 | `404` |
| 方法不允许 | `405` |
| 服务异常 | `500` |

### 接口清单

| 接口 | 方法 | 鉴权 | 说明 |
|---|---|---|---|
| `/api/contact` | POST | 否 | 合作咨询，写入 `leads.csv` |
| `/api/locations` | GET | 否 | 前台旅拍机点位查询（公开只读） |
| `/api/admin/login` | POST | 否 | 登录 |
| `/api/admin/logout` | POST | 是 | 退出 |
| `/api/admin/leads` | GET | 是 | 查看 / 导出线索 |
| `/api/admin/locations` | GET/POST/PUT/DELETE | 是 | 点位增删改、导入导出 |

### 安全要求
- 表单接口必须做**字段校验 + 长度限制**（`sanitize` 限制 120 字）
- 任何写文件操作必须**走 `withFileLock`**
- 不允许前端直接写文件路径或文件名
- 来源 IP 提取顺序：`X-Forwarded-For` → `clientAddress`

---

## 八、内容维护规则

### 谁改什么
| 内容 | 在哪改 |
|---|---|
| 公司信息 / 联系方式 / 备案号 | `src/data/site.ts` |
| 各页面 SEO 文案 | `src/data/site.ts` 的 `seo.pages` |
| 顶部导航 | `src/data/site.ts` 的 `navLinks` |
| 算力市场表格 / 筛选项 | `src/data/compute.ts` |
| 模型列表 | `src/data/compute.ts` 的 `models` |
| 整机租赁机型 | `src/data/rental.ts` |
| 三款终端的页面内容 | `travelPhoto.ts` / `cardMachine.ts` / `aiCat.ts` |
| 旅拍机点位 | 走后台 `/admin/`（自动备份） |
| 合作咨询 | 不允许人工改 |
| 全局样式 | `public/styles/global.css` |
| 全局布局 / 导航 / 页脚 | `src/layouts/BaseLayout.astro` |

### 内容更新工作流
1. 优先在 `src/data/` 改数据
2. 检查所有引用页面是否需要同步
3. 本地 `npm run dev` 验证
4. 影响 SEO 时同步更新 sitemap / 结构化数据
5. 部署前 `npm run build` 通过
6. 在 [CHANGELOG.md](CHANGELOG.md) 追加记录

### 禁止行为
- ❌ 直接在 `.astro` 里粘贴大段产品文案
- ❌ 在多个页面分散维护同一份产品信息
- ❌ 用图片代替可索引的产品标题 / 描述
- ❌ 把后台修改逻辑写在前端 JS 里
- ❌ 把敏感配置写进 `src/data/`
