# 智和明远公司介绍网站

基于Vue3 + Vite + Tailwind CSS开发的智和明远国际物流有限公司官方网站。

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 4.x
- **样式框架**: Tailwind CSS 3.x
- **路由管理**: Vue Router 4
- **动画库**: @vueuse/motion

## 项目结构

```
zhihe-mingyuan-website/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 组件
│   │   └── layout/        # 布局组件
│   ├── views/             # 页面组件
│   ├── data/              # 数据配置
│   ├── assets/            # 资源文件
│   │   └── styles/        # 样式文件
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 开发指南

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

### 预览生产版本

```bash
npm run preview
```

## 功能特性

- ✅ 响应式设计，支持桌面端和移动端
- ✅ Vue Router路由管理
- ✅ Tailwind CSS样式系统
- ✅ 组件化架构
- ✅ 数据配置化管理
- 🚧 动画效果 (待实现)
- 🚧 业务组件 (待实现)

## 页面结构

- **首页** (`/`) - 品牌展示、核心业务、优势速览、数据看板
- **公司介绍** (`/about`) - 公司背景、资质、团队优势
- **业务介绍** (`/business`) - 服务流程、业务详情
- **班列优势** (`/advantages`) - 班列运输优势
- **行业资讯** (`/news`) - 行业动态和资讯
- **联系我们** (`/contact`) - 联系方式和表单

## 开发状态

当前已完成项目初始化和基础配置，包括：
- ✅ Vue3 + Vite项目结构
- ✅ Tailwind CSS配置
- ✅ 路由系统设置
- ✅ 基础布局组件
- ✅ 数据配置文件
- ✅ 基础页面结构

后续将按照任务列表逐步实现各个功能模块。