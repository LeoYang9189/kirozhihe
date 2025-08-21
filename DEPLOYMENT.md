# 智和明远国际物流网站 - 部署说明

## 项目概述
这是智和明远国际物流有限公司的官方网站，使用Vue.js + Vite + Tailwind CSS构建。

## 技术栈
- **前端框架**: Vue.js 3
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由**: Vue Router
- **图标**: Heroicons
- **动画**: VueUse Motion
- **测试**: Vitest + Vue Test Utils

## 项目结构
```
kirozhihe/
├── src/
│   ├── components/     # 组件
│   ├── views/         # 页面
│   ├── data/          # 数据配置
│   ├── composables/   # 组合式函数
│   ├── utils/         # 工具函数
│   └── router/        # 路由配置
├── public/            # 静态资源
├── dist/              # 构建输出
└── tests/             # 测试文件
```

## 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

### 运行测试
```bash
npm run test
```

## 部署选项

### 1. Vercel 部署
1. 连接GitHub仓库到Vercel
2. 自动检测Vue.js项目
3. 构建命令: `npm run build`
4. 输出目录: `dist`

### 2. Netlify 部署
1. 连接GitHub仓库到Netlify
2. 构建命令: `npm run build`
3. 发布目录: `dist`

### 3. GitHub Pages 部署
1. 在仓库设置中启用GitHub Pages
2. 选择GitHub Actions作为源
3. 使用提供的workflow文件

### 4. 传统服务器部署
1. 运行 `npm run build`
2. 将 `dist` 目录内容上传到服务器
3. 配置Web服务器指向index.html

## 环境变量
项目目前不需要特殊的环境变量配置。

## 浏览器支持
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 性能优化
- 代码分割和懒加载
- 图片懒加载
- CSS优化和压缩
- JavaScript压缩
- 响应式图片

## 联系信息
如有技术问题，请联系开发团队。