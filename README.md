# 天翔睿翼官网项目

北京天翔睿翼科技有限公司官网，基于 `Astro` 开发。网站围绕两条业务线组织内容：

- AI 算力服务：算力市场、模型市场、整机租赁。
- 智能终端落地：AI 旅拍机、AI 潮玩卡牌机、AI 机器猫。

项目当前不是纯静态站。由于包含合作咨询表单、后台登录、CSV 数据读写等能力，生产环境需要通过 Node 服务运行。

## 技术栈

- `Astro 4`
- `@astrojs/node`
- 原生 `TypeScript`
- 原生 CSS：`public/styles/global.css`
- CSV 文件存储：合作咨询、AI 旅拍机点位数据
- 部署模式：`output: "hybrid"` + Node standalone server

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

`npm run preview` 实际执行的是：

```bash
node ./dist/server/entry.mjs
```

默认端口通常是 `4321`。

## 环境变量

参考 `.env.example`：

```env
CONTACT_LEADS_FILE=data/leads.csv
PUBLIC_SITE_URL=https://www.example.com
TRAVEL_PHOTO_LOCATIONS_FILE=public/data/travel-photo-locations.csv
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
ADMIN_SESSION_SECRET=change-this-session-secret
```

字段说明：

- `CONTACT_LEADS_FILE`：合作咨询提交数据保存位置。
- `PUBLIC_SITE_URL`：正式官网域名，用于 SEO、canonical、sitemap、OG 分享地址。
- `TRAVEL_PHOTO_LOCATIONS_FILE`：AI 旅拍机点位 CSV 数据位置。
- `ADMIN_USERNAME`：后台登录账号。
- `ADMIN_PASSWORD`：后台登录密码，生产环境必须修改。
- `ADMIN_SESSION_SECRET`：后台登录会话签名密钥，生产环境必须使用随机长字符串。

生产环境必须配置：

```env
PUBLIC_SITE_URL=https://你的正式域名
ADMIN_USERNAME=你的后台账号
ADMIN_PASSWORD=强密码
ADMIN_SESSION_SECRET=随机长密钥
```

## 项目结构

```text
.
├─ public/
│  ├─ assets/                         # 图片、Logo、产品素材
│  ├─ data/
│  │  └─ travel-photo-locations.csv   # AI 旅拍机点位数据
│  └─ styles/
│     └─ global.css                   # 全局样式
├─ src/
│  ├─ components/                     # 通用组件
│  ├─ data/                           # 页面内容、SEO、导航、产品数据
│  ├─ layouts/
│  │  └─ BaseLayout.astro             # 公共布局、导航、页脚、SEO 注入
│  ├─ lib/                            # CSV、后台登录、后台数据工具
│  └─ pages/                          # 页面路由与 API
│     ├─ admin/                       # 后台页面
│     ├─ api/                         # 表单与后台 API
│     ├─ compute/                     # 算力服务
│     ├─ models/                      # 模型市场
│     ├─ rental/                      # 整机租赁
│     └─ terminals/                   # AI 终端页面
├─ data/
│  └─ leads.csv                       # 合作咨询数据，运行时生成
├─ astro.config.mjs
├─ package.json
└─ README.md
```

## 页面路由

主要公开页面：

- `/`：首页
- `/compute/market/`：算力市场
- `/models/`：模型市场
- `/rental/`：整机租赁
- `/rental/[slug]/`：整机详情
- `/terminals/travel-photo/`：AI 旅拍机
- `/terminals/card-machine/`：AI 潮玩卡牌机
- `/terminals/ai-cat/`：AI 机器猫
- `/about/`：关于我们与合作咨询表单

后台页面：

- `/admin/login/`：后台登录
- `/admin/`：后台管理

API：

- `/api/contact`：合作咨询提交
- `/api/admin/login`：后台登录
- `/api/admin/logout`：退出登录
- `/api/admin/leads`：合作咨询查看/导出
- `/api/admin/locations`：AI 旅拍机点位查看、增删改、导入导出

## 内容维护

优先维护数据文件，避免直接把大量内容写死在页面里。

常用数据文件：

- `src/data/site.ts`：公司信息、导航、SEO 配置。
- `src/data/compute.ts`：算力服务数据。
- `src/data/rental.ts`：整机租赁型号数据。
- `src/data/travelPhoto.ts`：AI 旅拍机页面内容。
- `src/data/cardMachine.ts`：AI 潮玩卡牌机页面内容。
- `src/data/aiCat.ts`：AI 机器猫页面内容。
- `public/data/travel-photo-locations.csv`：AI 旅拍机点位查询数据。

后台可维护的内容：

- 合作咨询：只读查看、导出 CSV，不允许后台修改。
- AI 旅拍机点位：新增、修改、删除、搜索、导入 CSV、导出 CSV。

AI 旅拍机点位 CSV 字段：

```text
城市,点位名称,场景类型,设备类型,状态,说明,关键词
```

## 编码规范

### 文件与命名

- 页面文件放在 `src/pages/`，按路由目录组织。
- 公共组件放在 `src/components/`。
- 配置型内容放在 `src/data/`。
- 服务端工具放在 `src/lib/`。
- 静态资源放在 `public/assets/`。
- 建议新增图片文件名使用英文、拼音或数字，避免中文路径导致部署或 CDN 兼容问题。

### Astro 页面

- 每个页面应使用 `BaseLayout`，保证导航、页脚、SEO 统一。
- 页面顶部通过 `BaseLayout` 传入必要的 `title`、`description`。
- 页面结构尽量清晰分区，不把多个大模块压缩到一行。
- 交互脚本只放当前页面需要的逻辑，避免影响其他页面。

### TypeScript / 数据

- 列表、卡片、型号、案例等内容优先写成数据数组。
- 新增字段时注意同步页面渲染逻辑。
- 不要在数据文件里混入页面样式。

### CSS

- 全局样式集中在 `public/styles/global.css`。
- 新增样式尽量使用明确的模块 class，避免影响其他页面。
- 修改通用 class 前先确认是否被多个页面复用。
- 移动端样式放入现有媒体查询区域。

### CSV 数据

- 合作咨询 CSV 属于用户提交数据，不手工编辑，避免破坏格式。
- 点位 CSV 可通过后台维护，保存时会自动备份。
- CSV 需要保持 UTF-8 编码。
- 字段顺序不要随意改，否则后台导入和前台查询可能失效。

## 后台管理

后台用于轻量维护数据，不是完整 CRM。

访问：

```text
/admin/
```

登录账号来自环境变量：

```env
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

后台安全要求：

- 生产环境必须修改默认账号密码。
- `ADMIN_SESSION_SECRET` 必须设置为随机长字符串。
- 不要把 `.env` 提交到 Git。
- 后台路径已在 `robots.txt` 中禁止搜索引擎抓取。
- 建议服务器层面进一步限制后台访问来源 IP，或至少开启 HTTPS。

## SEO

SEO 相关文件：

- `src/layouts/BaseLayout.astro`：统一输出 title、description、canonical、OG、结构化数据。
- `src/data/site.ts`：维护各页面 SEO 标题、描述、关键词。
- `src/pages/sitemap.xml.ts`：生成站点地图。
- `src/pages/robots.txt.ts`：生成 robots 规则。

上线后确认：

```text
https://你的域名/sitemap.xml
https://你的域名/robots.txt
```

然后提交到搜索平台：

- 百度搜索资源平台
- Google Search Console
- Bing Webmaster Tools

## 上线部署要求

由于项目包含 API 和 CSV 写入，不能只部署到静态空间。需要 Node 服务。

推荐服务器：

- Ubuntu 22.04 / 24.04
- Node.js 20+
- 2 核 2G 起步
- Nginx 反向代理
- PM2 守护进程
- HTTPS 证书

不建议仅部署到：

- 阿里云 OSS 静态网站
- GitHub Pages
- 纯静态虚拟主机

原因：这些环境无法运行 `/api/contact` 和后台 API。

## 上线部署流程

### 1. 服务器准备

安装 Node.js、Git、PM2、Nginx。

示例：

```bash
node -v
npm -v
pm2 -v
nginx -v
```

建议 Node.js 使用 20 或更高版本。

### 2. 上传代码

可以使用 Git 拉取，也可以上传项目压缩包。

进入项目目录：

```bash
cd /path/to/tianxiang-website
```

安装依赖：

```bash
npm install
```

### 3. 配置环境变量

在服务器上创建 `.env`：

```env
CONTACT_LEADS_FILE=data/leads.csv
PUBLIC_SITE_URL=https://你的正式域名
TRAVEL_PHOTO_LOCATIONS_FILE=public/data/travel-photo-locations.csv
ADMIN_USERNAME=你的后台账号
ADMIN_PASSWORD=强密码
ADMIN_SESSION_SECRET=随机长密钥
```

确保数据目录可写：

```bash
mkdir -p data
```

### 4. 构建

```bash
npm run build
```

### 5. 使用 PM2 启动

```bash
pm2 start "npm run preview" --name tianxiang-website
pm2 save
```

查看状态：

```bash
pm2 status
pm2 logs tianxiang-website
```

### 6. 配置 Nginx

Nginx 反向代理到 Node 服务端口，例如 `4321`：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

生产环境必须配置 HTTPS。

### 7. 验证

上线后检查：

- 首页是否正常打开。
- `/about/` 表单是否能提交。
- `data/leads.csv` 是否能写入。
- `/admin/` 是否能登录。
- 后台是否能查看合作咨询。
- 后台是否能新增 AI 旅拍机点位。
- 前台 AI 旅拍机点位搜索是否能搜到新增点位。
- `/sitemap.xml` 是否正常。
- `/robots.txt` 是否正常。

## 数据与备份

运行时重要数据：

- `data/leads.csv`
- `public/data/travel-photo-locations.csv`
- `public/data/*.bak`

其中：

- `data/leads.csv` 是合作咨询线索，不应提交到 Git。
- `travel-photo-locations.csv` 是点位配置数据，可由后台维护。
- 后台修改点位时会生成 `.bak` 备份。

建议服务器定期备份：

```text
data/
public/data/
```

## 更新与发布

如果只是在后台新增或修改 AI 旅拍机点位：

- 不需要重新部署。
- 前台查询刷新后即可读取新的 CSV。
- 如果使用 CDN，需要避免 `/data/travel-photo-locations.csv` 被长时间缓存。

如果改了代码、样式、页面结构或数据文件：

```bash
git pull
npm install
npm run build
pm2 restart tianxiang-website
```

如果只是改 `src/data/` 或页面代码，也需要重新构建并重启。

## 注意事项

- 不要直接在服务器上随意编辑 `data/leads.csv`。
- 不要把 `.env`、`data/leads.csv`、备份文件提交到 Git。
- 后台账号密码不要使用默认值。
- `PUBLIC_SITE_URL` 上线后必须改成真实域名。
- 如接入 CDN，避免缓存后台接口和动态 CSV。
- 表单和后台功能依赖 Node 服务，静态部署会导致这些功能失效。
