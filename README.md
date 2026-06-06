# 🦞 龙虾出行 · 学习课程网站

> 面向龙虾出行团队的内部学习平台，也对外开放。聚焦出行行业认知、商业策略、供应链实战与技术通识。

---

## 📖 项目简介

本项目是 **龙虾出行（RideClaw）** 团队的学习课程网站，沉淀团队在出行行业的研究、培训与方法论。网站采用纯静态架构，零后端依赖，部署在 **Vercel**，支持 PC 与移动端自适应访问。

**核心定位**：
- 🎯 **对内**：团队成员的系统化学习入口
- 🌐 **对外**：向行业展示龙虾出行的认知深度与专业积累
- 📚 **内容**：行业分析、商业策略、供应链、技术通识四大板块

---

## 🚀 在线访问

| 环境 | 地址 |
|------|------|
| 生产环境 | `https://courses.rideclaw.com` （示例，部署后替换） |
| Vercel Preview | 每次 PR 自动生成 |

---

## 📚 课程目录

### 一、行业分享 · Industry Insights

深入剖析全球及中国出行行业的标杆企业、竞争格局与趋势变化。

| 课程 | 形式 | 简介 |
|------|------|------|
| [携程集团20年商业演进深度分析](./courses/ctrip_analysis.html) | HTML 报告 | 从 1999 到 2025，全面复盘携程的财务数据、商业模式三次跃迁、竞争格局与护城河 |
| [Booking Holdings 20年商业演进深度分析](./courses/booking_analysis.html) | HTML 报告 | 全球 OTA 巨头 Booking Holdings 的商业演进与战略启示 |
| [酒店机票去中心化趋势与战略启发](./courses/decentralization_trends_training.html) | HTML 课件 | 拆解酒店与机票分销领域的去中心化趋势，以及对龙虾出行的战略启发 |

### 二、商业策略 · Business Strategy

从 0 到 1 的创业方法论，聚焦 MVP 设计与增长执行。

| 课程 | 形式 | 简介 |
|------|------|------|
| [MVP战略与商业模式设计](./courses/mvp_course_01_strategy.html) | HTML 课件 | 如何定义 MVP 边界、设计商业模式、验证核心价值假设 |
| [MVP增长与运营执行](./courses/mvp_course_02_growth.html) | HTML 课件 | MVP 上线后的增长策略、运营节奏与数据驱动迭代 |

### 三、供应链 · Supply Chain

出行行业核心基础设施——机票与酒店供应链的系统认知与实战方法。

| 课程 | 形式 | 简介 |
|------|------|------|
| [第1期：机票酒店供应链入门](./courses/training_01_supply_chain_intro.html) | HTML 课件 | 供应链基本概念、行业角色、GDS/CRS 体系、API 连接方式 |
| [第2期：供应链开拓实战](./courses/training_02_supply_chain_sales.html) | HTML 课件 | 供应商 BD 方法、谈判策略、合同要点、接入流程 |
| [第3期：供应链管理进阶 + AI应用](./courses/training_03_supply_chain_management.html) | HTML 课件 | 供应商评级、动态库存管理、AI 在供应链优化中的应用 |

### 四、技术通识 · Tech Literacy

出行行业技术从业者需要了解的基础设施、工具与行业资源。

| 课程 | 形式 | 简介 |
|------|------|------|
| [全球出行行业 API / B2B 平台大全](./courses/travel_api_directory.html) | HTML 目录 | 整理全球主流的 Travel API、B2B 平台、GDS、聚合商等资源 |

---

## 🏗️ 技术架构

```
┌─────────────────────────────────────────┐
│            用户（PC / Mobile）            │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│           Vercel Edge Network           │
│      （全球 CDN + 自动 HTTPS）            │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│         纯静态站点（HTML + CSS）          │
│    无后端 · 无数据库 · 无账号体系          │
└─────────────────────────────────────────┘
```

**设计原则**：
- **无账号体系**：开箱即用，无需登录注册，降低访问门槛
- **无数据库**：所有内容以静态文件（HTML / Markdown）形式存在
- **纯前端渲染**：课程页面均为自包含的 HTML 文件，内嵌样式与脚本
- **响应式设计**：基于 Tailwind CSS 或原生 Media Query，完美适配 PC 与手机
- **Git 驱动内容**：课程更新通过 Git 提交 + Vercel 自动部署完成

---

## 🛠️ 本地开发

### 环境要求

- Node.js ≥ 18
- Git

### 安装与启动

```bash
# 克隆仓库
git clone https://github.com/rideclaw/courses.git
cd courses

# 安装依赖（如需使用构建工具）
npm install

# 本地预览
npm run dev
# 或直接用任意静态服务器
npx serve .
```

### 项目结构

```
courses/
├── courses/                    # 课程文件目录
│   ├── ctrip_analysis.html
│   ├── booking_analysis.html
│   ├── mvp_course_01_strategy.html
│   ├── mvp_course_02_growth.html
│   ├── training_01_supply_chain_intro.html
│   ├── training_02_supply_chain_sales.html
│   ├── training_03_supply_chain_management.html
│   ├── decentralization_trends_training.html
│   └── travel_api_directory.html
├── assets/                     # 静态资源（图片、字体、CSS）
│   ├── css/
│   ├── images/
│   └── js/
├── index.html                  # 首页：课程导航与概览
├── vercel.json                 # Vercel 部署配置
├── package.json
└── README.md                   # 本文件
```

---

## 🚀 部署

### 方式一：Vercel 自动部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel Dashboard](https://vercel.com) 导入该仓库
3. Vercel 自动检测为静态站点，每次 `git push` 自动触发部署

### 方式二：Vercel CLI 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel --prod
```

### Vercel 配置

`vercel.json` 示例：

```json
{
  "version": 2,
  "name": "rideclaw-courses",
  "routes": [
    { "src": "/courses/(.*)", "dest": "/courses/$1" },
    { "src": "/(.*)", "dest": "/$1" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ]
}
```

---

## ✍️ 内容贡献

### 新增课程

1. 在 `courses/` 目录下创建新的 `.html` 或 `.md` 文件
2. 遵循现有课程的文件命名规范：`{category}_{sequence}_{topic}.html`
3. 在 `index.html` 的课程导航中添加入口
4. 提交 PR，合并后自动部署

### 命名规范

| 前缀 | 含义 | 示例 |
|------|------|------|
| `ctrip_` / `booking_` | 行业分析类 | `ctrip_analysis.html` |
| `mvp_course_` | 商业策略类 | `mvp_course_01_strategy.html` |
| `training_` | 供应链培训类 | `training_01_supply_chain_intro.html` |
| `_directory` | 工具/目录类 | `travel_api_directory.html` |

### 内容格式

- 课程正文使用语义化 HTML（`<article>`, `<section>`, `<h1~h3>`）
- 样式优先使用内嵌 `<style>` 或引入 `assets/css/courses.css`
- 图表建议使用 SVG 或内嵌 Base64，避免外部依赖
- 所有页面必须包含响应式 Meta 标签：`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

## 📜 协议与声明

- **使用范围**：本网站内容面向龙虾出行团队成员及外部公开访问者
- **版权声明**：课程内容由龙虾出行团队原创整理，转载请注明出处
- **免责声明**：行业分析报告中的数据均来自公开资料，仅供研究参考，不构成投资建议

---

## 🦞 关于龙虾出行

**龙虾出行（RideClaw）** 是一家专注于 AI 驱动的出行科技公司，致力于通过技术创新重塑酒店与机票分销体验。

> "像龙虾一样，在行业的浪潮中不断进化。"

---

<p align="center">
  Built with ❤️ by RideClaw Team · Powered by Vercel
</p>
