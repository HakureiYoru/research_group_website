# 部署指南

本文档提供详细的部署步骤和最佳实践。

## 部署前检查清单

- [ ] 所有JSON数据文件格式正确
- [ ] 所有图片已优化并上传
- [ ] 测试所有页面链接
- [ ] 检查移动端响应式效果
- [ ] 验证浏览器兼容性
- [ ] 更新网站配置信息（config.js）

## 方法1：GitHub Pages部署

### 步骤

1. **准备代码仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **创建GitHub仓库**
   - 登录GitHub
   - 创建新仓库（如：`research-group-website`）
   - 不要初始化README、.gitignore或LICENSE

3. **推送代码**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/research-group-website.git
   git branch -M main
   git push -u origin main
   ```

4. **启用GitHub Pages**
   - 进入仓库的Settings
   - 找到Pages选项
   - Source选择`main`分支
   - 点击Save

5. **访问网站**
   - 等待几分钟
   - 访问 `https://YOUR_USERNAME.github.io/research-group-website/`

### 自定义域名（可选）

1. 在项目根目录创建`CNAME`文件：
   ```
   www.yourdomain.com
   ```

2. 在DNS提供商处添加记录：
   - 类型：CNAME
   - 名称：www
   - 值：YOUR_USERNAME.github.io

## 方法2：Netlify部署

### 步骤

1. **注册Netlify账号**
   访问 https://www.netlify.com/

2. **连接GitHub仓库**
   - 点击"New site from Git"
   - 选择GitHub
   - 授权并选择仓库

3. **配置构建设置**
   - Build command: 留空
   - Publish directory: `/`
   - 点击"Deploy site"

4. **自定义域名（可选）**
   - 在Site settings中找到Domain management
   - 添加自定义域名
   - 按照指引配置DNS

### netlify.toml配置

创建 `netlify.toml` 文件：

```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## 方法3：Vercel部署

### 步骤

1. **安装Vercel CLI（可选）**
   ```bash
   npm install -g vercel
   ```

2. **使用CLI部署**
   ```bash
   cd research_group_website
   vercel
   ```
   
   或者：

3. **使用Web界面**
   - 访问 https://vercel.com/
   - 导入GitHub仓库
   - 自动检测并部署

### vercel.json配置

创建 `vercel.json` 文件：

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|jpg|png|gif|svg|woff|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 方法4：传统服务器部署

### 使用FTP/SFTP

1. **准备文件**
   - 压缩整个项目文件夹

2. **上传到服务器**
   - 使用FTP客户端（如FileZilla）
   - 连接到服务器
   - 上传所有文件到网站根目录（通常是`public_html`或`www`）

3. **配置服务器**
   - 确保服务器支持静态文件服务
   - 配置index.html作为默认文档

### Apache服务器 (.htaccess)

创建 `.htaccess` 文件：

```apache
# 启用gzip压缩
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# 浏览器缓存
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# 安全头
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# 错误页面
ErrorDocument 404 /index.html
```

### Nginx配置

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/research_group_website;
    index index.html;

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # 缓存设置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # 单页应用路由
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 性能优化

### 1. 图片优化

```bash
# 使用工具压缩图片
# 推荐工具：TinyPNG, ImageOptim, Squoosh

# 或使用命令行工具
npm install -g imagemin-cli
imagemin assets/images/* --out-dir=assets/images/optimized
```

### 2. 代码压缩

```bash
# CSS压缩
npm install -g cssnano-cli
cssnano css/styles.css css/styles.min.css

# JS压缩
npm install -g terser
terser js/app.js -o js/app.min.js -c -m
```

### 3. 使用CDN

考虑使用CDN加速静态资源：
- Cloudflare
- jsDelivr
- UNPKG

## 监控和分析

### Google Analytics

在每个HTML页面的`<head>`中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 百度统计

```html
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?YOUR_SITE_ID";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

## 持续集成/持续部署 (CI/CD)

### GitHub Actions

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 维护和更新

### 更新流程

1. 在本地修改文件
2. 测试所有更改
3. 提交到Git
4. 推送到远程仓库
5. 自动部署（如果配置了CI/CD）

### 备份策略

- 定期备份JSON数据文件
- 使用Git版本控制
- 定期导出完整网站副本

## 故障排除

### 问题：页面404错误

**解决方案**：
- 检查文件路径是否正确
- 确保所有HTML文件都已上传
- 检查服务器配置

### 问题：JSON加载失败

**解决方案**：
- 确保CORS配置正确
- 检查JSON文件格式
- 验证文件权限

### 问题：样式不生效

**解决方案**：
- 清除浏览器缓存
- 检查CSS文件路径
- 验证CSS文件已上传

## 安全建议

1. **使用HTTPS**
   - 所有现代托管平台都提供免费SSL证书

2. **设置安全头**
   - 参考上述服务器配置

3. **定期更新**
   - 保持依赖项最新
   - 定期检查安全漏洞

4. **访问控制**
   - 不要在代码中硬编码敏感信息
   - 使用环境变量管理配置

## 支持

如有问题，请联系：
- Email: Pengfei.Song@xjtlu.edu.cn

---

**最后更新**: 2024年10月

