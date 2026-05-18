# ai-docs · 项目 AI 上下文规则集

> 这个文件夹是写给 **AI（Cursor / Claude / 任何代码助手）** 看的项目上下文。
> 新开对话时让 AI 按顺序读完即可进入项目状态，无需重复解释。

## 推荐阅读顺序

| 顺序 | 文件 | 作用 |
|---|---|---|
| 1 | [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | 项目背景、业务结构、技术栈、目录、设计原则 |
| 2 | [FEATURE_LIST.md](FEATURE_LIST.md) | 当前所有模块与功能清单 |
| 3 | [BUSINESS_RULES.md](BUSINESS_RULES.md) | 产品口径、数据维护、后台权限、CSV、SEO、API |
| 4 | [UI_RULES.md](UI_RULES.md) | 页面布局、卡片、表格、标签、响应式、风格统一 |
| 5 | [CHANGELOG.md](CHANGELOG.md) | 最近做了什么 |

## 使用建议

- AI 协作时**优先沿用现有结构**，不要引入新框架
- 修改任何「数据 / 字段 / 文案」都需对照 [BUSINESS_RULES.md](BUSINESS_RULES.md) 检查口径
- 修改任何「样式 / 布局 / 组件」都需对照 [UI_RULES.md](UI_RULES.md)
- 每次有意义的变更追加到 [CHANGELOG.md](CHANGELOG.md)
- 新增功能模块同步更新 [FEATURE_LIST.md](FEATURE_LIST.md)
