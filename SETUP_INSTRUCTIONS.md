# 西浦微系统课题组网站 - 设置说明

## 项目已完成内容

✅ Next.js 项目初始化（App Router + TypeScript + Tailwind CSS）
✅ 全局布局、导航栏和页脚组件
✅ 通用 UI 组件（加载器、分页、轮播图等）
✅ 首页及轮播图功能
✅ 新闻页面及时间轴展示
✅ 团队成员页面
✅ 发表作品页面（筛选、排序、分页）
✅ 数据加载逻辑和性能优化
✅ SEO 元数据和结构化数据
✅ 响应式设计和全局样式
✅ 功能和兼容性测试

## 当前状态

🎉 **项目开发完成！** 开发服务器已启动在 http://localhost:3000

## 下一步：部署到 Vercel

### 选项 1: 通过 GitHub + Vercel（推荐新手）

#### 步骤 1: 创建 Git 仓库并推送到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: XJTLU Microsystems Group Website"

# 添加远程仓库（替换为你的 GitHub 仓库 URL）
git remote add origin https://github.com/your-username/your-repo-name.git

# 推送到 GitHub
git push -u origin main
```

#### 步骤 2: 在 Vercel 部署

1. 访问 https://vercel.com
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择你刚创建的 GitHub 仓库
5. Vercel 会自动检测 Next.js 项目
6. 点击 "Deploy"
7. 等待几分钟，部署完成！

### 选项 2: 使用 Vercel CLI（推荐开发者）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署到 Vercel
vercel

# 部署到生产环境
vercel --prod
```

## 环境变量配置（可选）

在 Vercel 项目设置中添加：

- `NEXT_PUBLIC_SITE_URL`: 你的网站完整 URL
  - 示例: `https://your-project.vercel.app`

## 本地测试清单

- [x] 首页轮播图正常显示
- [x] 导航栏链接正常工作
- [x] 新闻页面时间轴展示正常
- [x] 团队成员页面显示正常
- [x] 发表作品页面筛选、排序、分页功能正常
- [x] 移动端响应式布局正常
- [x] 图片加载正常

## 访问页面

开发环境已启动，可以访问：

- 首页: http://localhost:3000
- 新闻: http://localhost:3000/news
- 团队成员: http://localhost:3000/people
- 发表作品: http://localhost:3000/publications

## 自定义配置

### 修改主题颜色

编辑 `tailwind.config.ts` 中的 `colors` 配置。

### 更新导航栏标题

编辑 `components/navigation.tsx`。

### 添加新页面

1. 在 `app/` 目录下创建新文件夹
2. 添加 `page.tsx` 文件
3. 更新导航栏链接

## 数据更新

### 新闻数据
编辑：`public/data/news.json`

### 发表作品数据
编辑：`public/data/publications.json`

### 团队成员
编辑：`components/people/student-grid.tsx` 和 `components/people/mentor-card.tsx`

## 性能监控

部署后，可以在 Vercel 仪表板查看：
- 访问量统计
- 页面加载速度
- 错误日志
- 构建历史

## 常见问题

### Q: 图片不显示？
A: 确保图片放在 `public/images/` 目录，使用路径 `/images/filename.png`

### Q: 数据不更新？
A: 修改 JSON 文件后需重新部署（开发环境刷新即可）

### Q: 移动端样式问题？
A: 检查 Tailwind 响应式类（sm:, md:, lg: 前缀）

## 技术支持

如遇问题，请查看：
1. [部署指南](./DEPLOYMENT_GUIDE.md) - 详细部署说明
2. [Next.js 文档](https://nextjs.org/docs) - 框架文档
3. [Vercel 文档](https://vercel.com/docs) - 部署平台文档

## 后续优化建议

- [ ] 添加 Google Analytics 统计
- [ ] 集成 CMS 系统（如 Contentful）便于内容管理
- [ ] 添加中英文切换功能
- [ ] 集成实时搜索功能
- [ ] 添加邮件订阅功能
- [ ] 优化图片（使用 WebP 格式）
- [ ] 添加深色模式支持

---

🎉 恭喜！您的课题组网站已经准备就绪！

