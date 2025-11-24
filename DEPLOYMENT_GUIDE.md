# 西浦微系统课题组网站部署指南

## 项目概述

这是一个基于 Next.js 14+ (App Router) 构建的学术课题组网站，包含首页、新闻、团队成员和发表作品四个核心页面。

## 技术栈

- **前端框架**: Next.js 15.5.6 (App Router)
- **UI 框架**: React 19
- **样式**: Tailwind CSS 3.4
- **语言**: TypeScript 5
- **部署平台**: Vercel

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 启动生产服务器

```bash
npm start
```

## 部署到 Vercel

### 方式一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**

```bash
npm i -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **部署项目**

在项目根目录运行：

```bash
vercel
```

首次部署时会询问一些配置问题：
- Set up and deploy? `Y`
- Which scope? 选择你的账户
- Link to existing project? `N`
- What's your project's name? `xjtlu-microsystems-group`
- In which directory is your code located? `./`

4. **部署到生产环境**

```bash
vercel --prod
```

### 方式二：通过 Vercel 网站部署

1. **推送代码到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

2. **连接到 Vercel**

- 访问 [vercel.com](https://vercel.com)
- 点击 "New Project"
- 导入你的 GitHub 仓库
- Vercel 会自动检测 Next.js 项目并配置构建设置
- 点击 "Deploy"

3. **配置环境变量**（可选）

在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_SITE_URL`: 你的网站 URL（如 https://your-domain.vercel.app）

## 项目结构

```
.
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── news/              # 新闻页面
│   ├── people/            # 团队成员页面
│   ├── publications/      # 发表作品页面
│   ├── globals.css        # 全局样式
│   ├── loading.tsx        # 加载状态
│   ├── error.tsx          # 错误页面
│   └── not-found.tsx      # 404 页面
├── components/            # React 组件
│   ├── navigation.tsx     # 导航栏
│   ├── footer.tsx         # 页脚
│   ├── ui/                # 通用 UI 组件
│   ├── news/              # 新闻相关组件
│   ├── people/            # 团队成员相关组件
│   └── publications/      # 发表作品相关组件
├── lib/                   # 工具函数
│   ├── data-loader.ts     # 数据加载器
│   └── structured-data.ts # SEO 结构化数据
├── types/                 # TypeScript 类型定义
│   ├── index.ts           # 主类型定义
│   └── json.d.ts          # JSON 模块声明
├── public/                # 静态资源
│   ├── images/            # 图片资源
│   ├── data/              # JSON 数据文件
│   └── robots.txt         # SEO 配置
├── next.config.ts         # Next.js 配置
├── tailwind.config.ts     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

## 数据管理

### 更新新闻

编辑 `public/data/news.json` 文件：

```json
[
  {
    "year": "2024",
    "items": [
      {
        "month": "10月",
        "category": "research",
        "title": "研究成果",
        "description": "团队在《Advanced Materials》上发表..."
      }
    ]
  }
]
```

分类类型：
- `research`: 研究成果
- `award`: 资助与奖项
- `activity`: 活动与演讲

### 更新发表作品

编辑 `public/data/publications.json` 文件：

```json
[
  {
    "title": "论文标题",
    "year": "2021",
    "link": "https://...",
    "description": "论文描述...",
    "authors": ["Author1", "Author2"]
  }
]
```

### 更新团队成员

编辑 `components/people/student-grid.tsx` 文件中的 `students` 数组。

### 更新导师信息

编辑 `components/people/mentor-card.tsx` 文件。

## 性能优化

网站已实现以下优化：

1. **图片优化**: 使用 Next.js Image 组件自动优化图片
2. **代码分割**: 自动按路由分割代码
3. **SEO 优化**: 
   - 每页独立 metadata
   - 结构化数据（JSON-LD）
   - sitemap.xml
   - robots.txt
4. **响应式设计**: 移动端优先，支持所有设备
5. **加载状态**: loading.tsx 提供更好的用户体验

## 常见问题

### 1. 图片不显示

确保图片文件放在 `public/images/` 目录下，并使用正确的路径（如 `/images/hero-image1.png`）。

### 2. 数据不更新

修改 JSON 文件后需要：
- 开发环境：刷新浏览器
- 生产环境：重新部署

### 3. 构建失败

检查：
- Node.js 版本 >= 18.17
- 所有依赖都已安装（`npm install`）
- TypeScript 类型错误（`npm run build`）

## 维护建议

1. **定期更新依赖**

```bash
npm update
npm audit fix
```

2. **备份数据文件**

定期备份 `public/data/` 目录下的 JSON 文件。

3. **监控性能**

使用 Vercel Analytics 监控网站性能和访问数据。

## 联系方式

如有技术问题，请联系：
- 邮箱: Pengfei.Song@xjtlu.edu.cn

## 许可证

版权所有 © 2024 西浦微系统课题组

