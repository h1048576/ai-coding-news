# AI Coding 每日新闻 🤖

自动聚合 AI 编程领域的最新动态，每日更新。

## 🌐 在线访问

[https://h1048576.github.io/ai-coding-news](https://h1048576.github.io/ai-coding-news)

## ✨ 功能特点

- 🔄 **每日自动更新** - GitHub Actions 每天北京时间 08:00 自动抓取最新新闻
- 📱 **响应式设计** - 完美适配手机、平板和桌面
- 🎨 **现代 UI** - 简洁美观的卡片式布局
- 🚀 **快速加载** - 本地缓存支持，离线也能看
- 🔍 **多源聚合** - 整合 DuckDuckGo、Brave、Yahoo 搜索结果

## 🚀 部署到 GitHub Pages

### 方法一：使用 GitHub CLI

```bash
# 1. 创建新仓库
gh repo create ai-coding-news --public --source=. --remote=origin --push

# 2. 启用 GitHub Pages
gh api repos/h1048576/ai-coding-news/pages \
  --method POST \
  -f source='{"branch":"main","path":"/"}'
```

### 方法二：手动部署

1. **创建 GitHub 仓库**
   ```bash
   cd ~/chris/web/ai-coding-news
   git init
   git add .
   git commit -m "Initial commit: AI Coding News website"
   git branch -M main
   git remote add origin https://github.com/h1048576/ai-coding-news.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main`，文件夹选择 `/ (root)`
   - 点击 Save

3. **访问网站**
   - 等待 1-2 分钟部署完成
   - 访问 `https://h1048576.github.io/ai-coding-news`

## ⚙️ GitHub Actions 配置

工作流文件位于 `.github/workflows/fetch-news.yml`，配置说明：

- **触发时间**: 每天 UTC 00:00 (北京时间 08:00)
- **手动触发**: 支持在 Actions 页面手动运行
- **数据来源**: DuckDuckGo、Brave、Yahoo 搜索
- **输出文件**: `news.json`

### 手动触发更新

1. 进入仓库的 Actions 标签
2. 选择 "Fetch AI Coding News" 工作流
3. 点击 "Run workflow"
4. 选择分支后点击 "Run workflow"

## 📁 项目结构

```
ai-coding-news/
├── index.html              # 主页面
├── styles.css              # 样式文件
├── app.js                  # 前端逻辑
├── news.json               # 新闻数据 (自动生成)
├── README.md               # 说明文档
└── .github/
    └── workflows/
        └── fetch-news.yml  # GitHub Actions 工作流
```

## 🔧 自定义配置

### 修改搜索关键词

编辑 `.github/workflows/fetch-news.yml`，找到：

```yaml
python -m scripts.union_search.union_search "AI coding news" \
```

修改引号内的搜索词即可。

### 修改更新频率

编辑 `.github/workflows/fetch-news.yml` 中的 cron 表达式：

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00
```

常用 cron 表达式：
- `0 */6 * * *` - 每 6 小时
- `0 0,12 * * *` - 每天 00:00 和 12:00
- `0 0 * * 1-5` - 工作日每天 00:00

### 添加更多数据源

编辑 `.github/workflows/fetch-news.yml` 中的 `--platforms` 参数：

```yaml
--platforms duckduckgo brave yahoo google bing
```

可用平台：`duckduckgo`, `brave`, `yahoo`, `google`, `bing`, `wikipedia`, `tavily`, `metaso` 等

## 📊 数据格式

`news.json` 文件格式：

```json
{
  "timestamp": "2026-03-08T02:14:00+00:00",
  "generated_at": "2026-03-08 02:14:00 UTC",
  "total_count": 9,
  "news": [
    {
      "title": "新闻标题",
      "url": "https://example.com/article",
      "snippet": "新闻摘要...",
      "platform": "brave",
      "timestamp": "2026-03-08T02:14:00+00:00"
    }
  ]
}
```

## 🛠️ 本地开发

```bash
# 克隆项目
git clone https://github.com/h1048576/ai-coding-news.git
cd ai-coding-news

# 使用任意 HTTP 服务器预览
python -m http.server 8000
# 或使用 npx
npx serve
```

访问 `http://localhost:8000` 预览网站。

## 📝 许可证

MIT License

## 🙏 致谢

- 新闻数据由 [union-search-skill](https://github.com/runningZ1/union-search-skill) 提供
- 图标来自 emoji

---

**Made with ❤️ for AI Coding Enthusiasts**
