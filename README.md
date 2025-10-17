# 西浦微系统课题组网站

## 项目简介

这是西浦微系统课题组的官方网站，展示课题组的研究方向、团队成员、最新新闻和学术发表。网站采用纯静态HTML/CSS/JavaScript构建，无需后端服务器，易于部署和维护。

## 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 模块化样式设计，使用CSS变量
- **JavaScript (ES6+)** - 组件化开发，无需框架
- **JSON** - 数据存储和管理

## 项目结构

```
research_group_website/
├── assets/                 # 静态资源
│   └── images/            # 图片资源
├── css/                   # 样式文件
│   ├── variables.css      # CSS变量定义
│   ├── base.css          # 基础样式
│   ├── carousel.css      # 轮播组件样式
│   ├── people.css        # 团队成员页面样式
│   ├── research.css      # 发表页面样式
│   └── styles.css        # 旧版样式（待移除）
├── js/                    # JavaScript文件
│   ├── config.js         # 网站配置
│   ├── utils.js          # 工具函数
│   ├── components.js     # 公共组件
│   ├── carousel.js       # 轮播组件
│   ├── news.js          # 新闻页面
│   ├── research.js      # 发表页面
│   └── people.js        # 团队成员页面
├── index.html            # 首页
├── news.html            # 新闻页面
├── research.html        # 发表页面
├── people.html          # 团队成员页面
├── news.json            # 新闻数据
├── publications.json    # 发表数据
└── README.md            # 项目文档

```

## 功能特性

### 1. 首页轮播
- 三个主题幻灯片展示课题组信息
- 自动播放和手动控制
- 支持键盘和触摸操作
- 响应式设计

### 2. 新闻时间轴
- 按年份和月份组织的新闻展示
- 分类标签（研究成果、奖项、活动）
- 从JSON文件动态加载
- 优雅的时间轴视觉效果

### 3. 发表列表
- 分页显示学术发表
- 按年份和作者筛选
- 动态生成筛选选项
- 响应式卡片布局

### 4. 团队成员
- 导师详细介绍
- 学生网格展示
- 图片加载错误处理
- 可扩展为动态加载

## 快速开始

### 本地运行

1. **克隆或下载项目**
   ```bash
   git clone <repository-url>
   cd research_group_website
   ```

2. **启动本地服务器**
   
   使用Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   或使用Node.js:
   ```bash
   npx http-server -p 8000
   ```

3. **访问网站**
   
   在浏览器中打开 `http://localhost:8000`

### 直接打开

由于是静态网站，也可以直接在浏览器中打开 `index.html` 文件。但建议使用本地服务器以避免CORS问题。

## 配置和定制

### 修改网站配置

编辑 `js/config.js` 文件来修改网站的全局配置：

```javascript
const SITE_CONFIG = {
    siteName: '西浦微系统课题组',
    contact: {
        email: 'Pengfei.Song@xjtlu.edu.cn',
        // ... 其他配置
    },
    // ...
};
```

### 更新新闻

编辑 `news.json` 文件添加或修改新闻：

```json
[
    {
        "year": "2024",
        "items": [
            {
                "month": "10月",
                "category": "research",
                "title": "研究成果",
                "description": "新闻描述..."
            }
        ]
    }
]
```

### 更新发表

编辑 `publications.json` 文件添加或修改学术发表：

```json
[
    {
        "title": "论文标题",
        "authors": ["作者1", "作者2"],
        "year": "2024",
        "image": "assets/images/publication.jpg",
        "link": "https://...",
        "description": "论文描述"
    }
]
```

### 自定义样式

1. **修改颜色主题**
   
   编辑 `css/variables.css` 中的CSS变量：
   ```css
   :root {
       --primary-color: #5e0053;
       --secondary-color: #3c8ce7;
       /* ... */
   }
   ```

2. **调整布局**
   
   编辑各个页面对应的CSS文件。

## 部署

### GitHub Pages

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择分支（通常是`main`或`master`）
4. 网站将在 `https://<username>.github.io/<repository>/` 可访问

### Netlify

1. 连接GitHub仓库到Netlify
2. 无需构建命令
3. 发布目录设置为 `/`（根目录）
4. 自动部署

### 其他静态托管服务

- Vercel
- Cloudflare Pages
- GitLab Pages
- 任何支持静态网站的主机

## 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari
- Opera

建议使用现代浏览器以获得最佳体验。

## 开发指南

### 代码规范

- 使用2空格缩进
- 使用语义化的HTML标签
- CSS类名使用kebab-case
- JavaScript变量使用camelCase
- 常量使用UPPER_SNAKE_CASE

### 添加新页面

1. 创建HTML文件（例如：`contact.html`）
2. 在 `js/config.js` 中添加导航配置
3. 创建对应的CSS和JS文件（如需要）
4. 在页面中引入必要的脚本

### 组件开发

使用 `Utils.createElement()` 方法创建DOM元素：

```javascript
const card = Utils.createElement('div', {
    className: 'card',
    onClick: () => console.log('clicked')
}, '卡片内容');
```

## 性能优化建议

1. **图片优化**
   - 使用WebP格式
   - 压缩图片大小
   - 使用适当的尺寸

2. **代码压缩**
   - 生产环境使用压缩后的CSS和JS

3. **缓存策略**
   - 设置适当的缓存头

4. **懒加载**
   - 对图片实现懒加载

## 维护和更新

### 定期任务

- [ ] 更新新闻内容
- [ ] 添加最新发表
- [ ] 更新团队成员信息
- [ ] 检查并修复失效链接
- [ ] 备份数据文件

### 版本控制

使用Git进行版本控制，定期提交更改：

```bash
git add .
git commit -m "描述更改内容"
git push origin main
```

## 故障排除

### JSON加载失败

**问题**: 控制台显示"无法加载数据"

**解决方案**:
- 确保使用本地服务器而不是直接打开HTML文件
- 检查JSON文件格式是否正确
- 检查文件路径是否正确

### 图片不显示

**问题**: 图片无法加载

**解决方案**:
- 检查图片路径是否正确
- 确保图片文件存在
- 检查文件名大小写

### 样式不生效

**问题**: CSS样式没有应用

**解决方案**:
- 清除浏览器缓存
- 检查CSS文件引入顺序
- 检查CSS选择器是否正确

## 贡献

欢迎提交问题和改进建议！

## 许可证

[MIT License](LICENSE)

## 联系方式

- **Email**: Pengfei.Song@xjtlu.edu.cn
- **地址**: 苏州工业园区仁爱路111号

---

**最后更新**: 2024年10月

**维护者**: 西浦微系统课题组

