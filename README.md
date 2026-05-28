# Pei Zheng · 鄭沛 · Guqin Studio

个人古琴艺术家网站。基于 Astro 构建，部署在 GitHub Pages。

---

## 1. 本地开发环境

### 前置条件
- 安装 [Node.js](https://nodejs.org/) 20 或以上版本
- 安装 Git

### 第一次运行

```bash
# 进入项目目录
cd peizheng-guqin

# 安装依赖（首次需要几分钟）
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:4321` 即可看到网站。改任何文件保存后，浏览器会自动刷新。

### 常用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动开发服务器（本地预览，热刷新） |
| `npm run build` | 构建生产版本到 `dist/` 目录 |
| `npm run preview` | 预览构建后的生产版本 |

---

## 2. 项目结构

```
peizheng-guqin/
├── src/
│   ├── components/        # 可复用组件
│   │   ├── GuqinSymbol.astro    # 首页古琴 SVG 符号
│   │   ├── Nav.astro            # 顶部导航 + 印章
│   │   └── Footer.astro         # 页脚 + 社交图标
│   ├── content/           # 内容数据（Markdown）
│   │   ├── config.ts            # 数据模式定义
│   │   ├── works/               # 作品（一个 .md 一首曲子）
│   │   └── performances/        # 演出（一个 .md 一场演出）
│   ├── layouts/
│   │   └── Base.astro           # 基础 HTML 框架
│   ├── pages/
│   │   ├── index.astro          # 英文首页 (/)
│   │   └── zh/index.astro       # 中文首页 (/zh/)
│   └── styles/
│       └── global.css           # 全站样式
├── public/
│   └── favicon.svg              # 网站图标
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions 自动部署
├── astro.config.mjs       # Astro 配置
└── package.json
```

---

## 3. 如何添加内容

所有内容都是 Markdown 文件，**不需要改代码**。

### 添加一首新作品

在 `src/content/works/` 下新建一个 `.md` 文件，比如 `guangling-san.md`：

```markdown
---
title: "Guangling San"
titleZh: "广陵散"
year: 2026
youtubeId: "abc12345xyz"
order: 4
featured: true
---

可选的作品简介文字。
```

字段说明：
- `title` / `titleZh`：英文名 / 中文名
- `year`：年份
- `youtubeId`：YouTube 视频 ID（URL 中 `v=` 后面那串）
- `order`：排序，数字小的靠前
- `featured: true`：是否在首页"Selected Works"展示（首页只显示前 3 个）

### 添加一场演出

在 `src/content/performances/` 下新建一个 `.md` 文件：

```markdown
---
title: "Concert Title"
titleZh: "演出标题"
date: 2026-10-15
venue: "Venue Name"
venueZh: "场地名称"
rsvpUrl: "https://example.com/tickets"
status: "upcoming"
---
```

`status` 三种值：
- `upcoming`：会显示 RSVP 链接
- `tba`：会显示 "TBA"
- `past`：不会显示在首页

### 更新引文 / About / 联系邮箱

这些目前**写在 `src/pages/index.astro` 和 `src/pages/zh/index.astro` 里**。
直接编辑这两个文件即可。后续如果改动频繁，可以把它们也抽到 Markdown 数据里。

---

## 4. 部署到 GitHub Pages

### 第一次部署

**Step 1**：在 GitHub 创建一个仓库（比如 `peizheng-guqin`）。

**Step 2**：修改 `astro.config.mjs`：

```js
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/peizheng-guqin/',  // 仓库名前后都要带斜杠
  // ...
});
```

如果之后绑定自定义域名（如 `peizheng.com`），把 `base` 改回 `/`。

**Step 3**：把代码推送到 GitHub：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/peizheng-guqin.git
git push -u origin main
```

**Step 4**：在 GitHub 仓库页面打开 **Settings → Pages**，
在 "Build and deployment" 下，**Source 选择 "GitHub Actions"**。

**Step 5**：每次 `git push` 到 main 分支，Actions 会自动构建并部署。
等 2-3 分钟后访问 `https://YOUR-USERNAME.github.io/peizheng-guqin/`。

### 日常更新流程

```bash
# 改完文件后
git add .
git commit -m "Add new work: Guangling San"
git push

# Actions 自动跑，等 2-3 分钟即上线
```

---

## 5. 绑定自定义域名（可选）

1. 在域名服务商（推荐 Cloudflare Registrar 或 Namecheap）买域名
2. 在 GitHub 仓库 Settings → Pages → Custom domain 填入域名
3. 在域名 DNS 配置加 A 记录指向 GitHub Pages IP（GitHub 文档会给具体地址）
4. 改 `astro.config.mjs` 的 `site` 为新域名，`base` 改为 `/`

---

## 6. 国内访问加速（可选）

GitHub Pages 在国内访问偶尔不稳定。三个备选方案：

**方案 A：Cloudflare Pages（推荐）**
- 把同一个 GitHub 仓库连到 Cloudflare Pages，免费、构建快、国内可访问
- 步骤：登录 [pages.cloudflare.com](https://pages.cloudflare.com) → Connect to Git → 选仓库 → 自动构建

**方案 B：Vercel**
- 同上，免费，速度好

**方案 C：双部署**
- GitHub Pages（海外受众）+ Cloudflare/Vercel（国内受众），用不同域名分流

---

## 7. 设计系统简述

如果你想自己调样式，关键 token 在 `src/styles/global.css` 顶部：

```css
:root {
  --color-bg: #FBF9F3;        /* 宣纸米白 */
  --color-text: #2C2C2A;      /* 墨黑 */
  --color-accent: #993C1D;    /* 朱砂红（用于所有引导链接） */
  --font-serif-en: 'EB Garamond', ...
  --font-serif-zh: 'Noto Serif SC', ...
}
```

朱砂红原则上**只用在"可点击的引导动作"和"印章标识"**。不要扩展到其他装饰用途，否则会破坏极简感。

---

## 8. 后续可以做的事

按优先级：

1. **写真实的 About 文案**（中英文各一段，目前是占位）
2. **填真实的 YouTube 视频 ID** 到作品 markdown
3. **更新真实演出信息**
4. **加 Writings / Blog 板块**（再建一个 `content/writings/` 即可）
5. **加 Works 详情页**（点击作品进入单独页面）
6. **加联系表单**（用 Formspree.io 嵌入，免费）
7. **绑定自定义域名**

---

## 问题排查

**Q: `npm install` 报错**
A: 确认 Node.js 版本 ≥ 20。运行 `node --version` 检查。

**Q: 构建后样式丢失**
A: 检查 `astro.config.mjs` 里的 `base` 是否和实际部署路径一致。

**Q: 中文字体加载慢**
A: Noto Serif SC 从 Google Fonts 加载，国内可换成 [中文网字计划](https://chinese-font.netlify.app/) 提供的 CDN，或本地子集化。

**Q: 改了 markdown 但本地没更新**
A: 重启 `npm run dev`。Astro 对 content collections 的改动偶尔需要重启。
