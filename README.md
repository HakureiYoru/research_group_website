# 西浦微系统课题组网站

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

西浦微系统课题组官方网站，由宋鹏飞教授领导，致力于微纳米技术、生物传感器、微流控平台和自动化控制技术的前沿研究。

## ✨ 功能特性

- 🏠 **首页轮播**: 展示课题组介绍、最新新闻和研究方向
- 📰 **新闻动态**: 时间轴展示课题组最新动态和成果
- 👥 **团队成员**: 导师和学生信息展示
- 📚 **学术发表**: 支持筛选、排序、分页的发表作品列表
- 📱 **响应式设计**: 完美支持桌面、平板和移动设备
- ⚡ **性能优化**: Next.js App Router + 图片优化 + 代码分割
- 🔍 **SEO 优化**: 结构化数据 + sitemap + meta 标签

## 🚀 快速开始

### 前置要求

- Node.js >= 18.17
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone <repository-url>
cd research_group_website

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
├── app/                 # 页面路由（App Router）
├── components/          # React 组件
├── lib/                 # 工具函数
├── types/               # TypeScript 类型
├── public/              # 静态资源
│   ├── images/         # 图片
│   └── data/           # JSON 数据
└── ...配置文件
```

## 📝 内容管理

### 更新新闻

编辑 `public/data/news.json`

### 更新发表作品

编辑 `public/data/publications.json`

### 更新团队成员

编辑 `components/people/` 下的相关组件

详细说明请查看 [部署指南](./DEPLOYMENT_GUIDE.md)。

## 🚢 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

或使用 Vercel CLI：

```bash
npm i -g vercel
vercel
```

详细部署说明请查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

## 🛠 技术栈

- **框架**: Next.js 15.5.6 (App Router)
- **UI 库**: React 19
- **样式**: Tailwind CSS 3.4
- **语言**: TypeScript 5
- **部署**: Vercel

## 📄 许可证

Copyright © 2024 西浦微系统课题组

## 📞 联系方式

- **邮箱**: Pengfei.Song@xjtlu.edu.cn
- **网站**: [课题组官网](https://your-domain.com)

---

Built with ❤️ by XJTLU Microsystems Research Group
