# Pantry Press · 餐桌印务所

## 打开工作台

解压整个目录，Windows 双击 Start-Windows.cmd，或在目录运行 `node preview.mjs`，访问 http://127.0.0.1:4179。预构建版本在 out，可直接试用。需要 Node.js 22 或以上。上传一至六张同一道菜的照片，第一张为菜品主参考。每张照片对应一张拍立得。排版栏可以编辑中英文标题、收展贴图、重置位置。主图与食材支持鼠标及触控拖动。PNG 为 4000 × 2200。浏览器草稿需要手动保存，再次保存会替换本机的上一份草稿。

## 云端生成和项目库

1. 在 Supabase 项目执行 supabase/schema.sql 一次，启用邮箱登录，将站点 URL 和 redirect allowlist 设置为前端域名。
2. 复制 .env.example 为 .env.local，填写项目 URL 和公开 anon key。服务器密钥仅放在 Edge Function 的 secrets 中。
3. 用 Supabase CLI 连接自己的项目，执行 `supabase secrets set OPENAI_API_KEY=你的密钥 PRESS_ALLOWED_USERS=允许调用的用户UUID`（多位用逗号分开），然后运行 `supabase functions deploy press --no-verify-jwt`。函数内部通过官方 SDK 验证 bearer token，并核对调用者名单。登录一次后可从 Supabase Authentication 找到用户 UUID。模型可通过 VISION_MODEL 与 IMAGE_MODEL 配置。
4. 运行 `npm install` 和 `npm run build`。NEXT_PUBLIC 环境变量会写入构建，修改后需重新构建。开发用 `npm run dev`。登录后上传照片，在图层栏点击生成。分析、流程图和每张独立贴图都调用远程模型，可能计费。默认离线构建不发起这些调用。
5. 分析照片推断食材与动作 → 生成双语完整流程图 → 以流程图和原照生成主图、各食材、各动作和专属印章 → 统一纸色、印刷混合、字体、图章题名与留白。原照片保留为拍立得。模型生成可能需要几分钟。若请求中断，原画布保留，可重试。重试会重新生成并可能产生费用。三个本地 skill 的视觉指导已整理在函数中，线上使用模型接口执行。
6. 底部「保存云端版本」新增一条私有记录，菜单可切换历史版本。示例数据来自 projects.ts。示例中肉末辣汤面为完整六层版，其他两页为食材研究。大体积作品受所选 Supabase 套餐请求与容量限制。

## 静态发布

Cloudflare Pages 可直接上传 out 目录的内容，也可连接源码，构建命令 npm run build，输出目录 out。GitHub Pages 项目站在构建前设置 NEXT_PUBLIC_BASE_PATH=/仓库名，把 out 内容及 .nojekyll 一起发布。已知作品路径预渲染，直接打开和刷新均可用。

## 文件职责

| 文件 | 作用 |
| --- | --- |
| app/layout.tsx | 页面语言、标题、全局样式 |
| app/page.tsx | 首页工作台入口 |
| app/projects/[slug]/page.tsx | 读取本地项目 slug，生成独立项目页面 |
| app/globals.css | Tailwind、印刷室主题、手机布局与交互样式 |
| components/Navbar.tsx | 首页、工作台、档案导航 |
| components/HeroSection.tsx | 首页题头和上传入口 |
| components/Studio.tsx | 上传、工作台控制、导出、分类和灯箱画廊 |
| components/Board.tsx | 印刷画布、贴图绘制、拖动与悬停 |
| components/ContactSection.tsx | 邮箱登录、云端保存与项目选择 |
| components/ui/button.tsx | shadcn/ui 风格的 Radix Slot 和 CVA 按钮 |
| lib/projects.ts | 本地项目、贴图名称、版式数据结构 |
| lib/local.ts | 图片缩放与 IndexedDB 草稿 |
| lib/cloud.ts | 官方 Supabase Client 实例 |
| lib/generate.ts | 完整生成流程、状态反馈和错误处理 |
| supabase/functions/press/index.ts | 认证、模型访问、视觉分析和图片生成 |
| supabase/functions/press/guides.ts | 三种 skill 的视觉系统、参考与印章处理说明 |
| supabase/schema.sql | 项目表及仅本人读写的行级权限 |
| public/art/*.webp | 食物原照、步骤、食材、印章及示例流程图 |
| public/.nojekyll | GitHub Pages 静态资源支持 |
| .env.example | 浏览器端配置模板 |
| next.config.mjs | 静态导出和托管子路径 |
| postcss.config.mjs | Tailwind 编译 |
| tsconfig.json、next-env.d.ts | TypeScript 检查和 Next.js 类型 |
| package.json | 依赖与脚本 |
| .gitignore | 忽略构建缓存与本地凭据 |
| preview.mjs、Start-Windows.cmd | 静态预览服务与 Windows 启动器 |
| out/ | 可直接预览、部署的 HTML 和编译资源 |
