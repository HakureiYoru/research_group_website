# 快速开始指南

欢迎使用重构后的西浦微系统课题组网站！本指南将帮助你快速了解项目结构和如何进行常见操作。

## 🚀 5分钟快速上手

### 1. 本地运行

```bash
# 在项目目录下运行
python -m http.server 8000

# 然后在浏览器中访问
# http://localhost:8000
```

### 2. 查看效果

打开浏览器访问以下页面：
- 首页: `http://localhost:8000/index.html`
- 新闻: `http://localhost:8000/news.html`
- 发表: `http://localhost:8000/research.html`
- 团队: `http://localhost:8000/people.html`

## 📝 常见任务

### 更新新闻

编辑 `news.json` 文件：

```json
{
  "year": "2024",
  "items": [
    {
      "month": "10月",
      "category": "research",  // 类型：research/award/activity
      "title": "研究成果",
      "description": "新闻内容描述..."
    }
  ]
}
```

刷新浏览器即可看到更新！

### 添加发表

编辑 `publications.json` 文件：

```json
{
  "title": "论文标题",
  "authors": ["作者1", "作者2", "作者3"],
  "year": "2024",
  "image": "assets/images/pub-image.jpg",
  "link": "https://doi.org/...",
  "description": "论文简介..."
}
```

### 修改网站配置

编辑 `js/config.js` 文件：

```javascript
const SITE_CONFIG = {
    siteName: '你的课题组名称',
    contact: {
        email: 'your-email@xjtlu.edu.cn'
    },
    // 其他配置...
};
```

### 更改颜色主题

编辑 `css/variables.css` 文件：

```css
:root {
    --primary-color: #你的主色;
    --secondary-color: #你的辅色;
}
```

### 添加图片

1. 将图片放入 `assets/images/` 目录
2. 在HTML或JSON中引用：`assets/images/your-image.jpg`

## 🎨 自定义样式

### 修改首页轮播

编辑 `index.html` 中的 `.carousel-slide` 部分：

```html
<div class="carousel-slide">
    <div class="hero-image" style="background-image: url('你的图片.jpg');"></div>
    <div class="hero-text">
        <h2>标题</h2>
        <p>内容...</p>
    </div>
</div>
```

### 调整轮播速度

编辑 `js/config.js`：

```javascript
carousel: {
    autoPlayInterval: 30000,  // 30秒，单位：毫秒
}
```

### 修改分页数量

编辑 `js/config.js`：

```javascript
pagination: {
    itemsPerPage: 15,  // 每页显示15条
}
```

## 📁 项目结构速览

```
├── assets/images/     # 放图片这里
├── css/              # 样式文件
│   ├── variables.css # 改颜色在这里
│   ├── base.css      # 基础样式
│   └── *.css         # 各页面样式
├── js/               # JavaScript文件
│   ├── config.js     # 配置在这里 ⭐
│   ├── utils.js      # 工具函数
│   ├── components.js # 公共组件
│   └── *.js          # 各页面脚本
├── *.html            # 各个页面
├── news.json         # 新闻数据 ⭐
└── publications.json # 发表数据 ⭐
```

## 🔧 解决常见问题

### 问题1: JSON文件修改后没反应

**原因**: 浏览器缓存

**解决**: 
- 按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
- 或者在浏览器开发者工具中禁用缓存

### 问题2: 图片不显示

**检查**:
1. 图片路径是否正确？
2. 图片文件是否存在？
3. 文件名大小写是否匹配？

### 问题3: 样式没生效

**解决**:
1. 检查CSS文件引入顺序
2. 清除浏览器缓存
3. 检查CSS选择器是否正确

## 🚢 部署到网上

### 最简单：GitHub Pages

```bash
# 1. 初始化Git仓库
git init
git add .
git commit -m "Initial commit"

# 2. 推送到GitHub
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main

# 3. 在GitHub仓库设置中启用Pages
# Settings -> Pages -> Source: main branch
```

几分钟后，你的网站就在 `https://你的用户名.github.io/你的仓库名/` 上线了！

### 更简单：Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽整个项目文件夹到Netlify
3. 完成！立即获得一个 `https://随机名称.netlify.app` 网址

详细部署指南请查看 `DEPLOYMENT.md`

## 📚 下一步

- 🔍 查看 `README.md` 了解完整功能
- 🚀 查看 `DEPLOYMENT.md` 学习专业部署
- 📝 查看 `CHANGELOG.md` 了解所有改进

## 💡 小贴士

### 开发技巧

1. **使用浏览器开发者工具**
   - 按 `F12` 打开
   - 可以实时修改样式查看效果
   - 可以查看控制台错误信息

2. **JSON格式验证**
   - 使用 [jsonlint.com](https://jsonlint.com) 验证JSON格式
   - 确保没有多余的逗号

3. **图片优化**
   - 使用 [tinypng.com](https://tinypng.com) 压缩图片
   - 建议图片不超过500KB

### 内容管理建议

1. **定期备份**
   ```bash
   # 提交更改到Git
   git add .
   git commit -m "更新内容"
   git push
   ```

2. **团队协作**
   - 使用Git分支功能
   - 先在本地测试再发布

3. **内容规范**
   - 新闻按时间倒序排列
   - 发表信息保持格式一致
   - 图片命名规范化

## 🆘 需要帮助？

- 📧 Email: Pengfei.Song@xjtlu.edu.cn
- 📖 查看 `README.md` 获取详细文档
- 🐛 遇到Bug？检查浏览器控制台的错误信息

## ✅ 检查清单

发布前确认：

- [ ] 所有JSON文件格式正确
- [ ] 图片已优化并上传
- [ ] 联系信息已更新
- [ ] 在不同浏览器测试
- [ ] 在手机上测试
- [ ] 所有链接可以正常访问

---

**祝你使用愉快！** 🎉

有任何问题或建议，欢迎反馈！

