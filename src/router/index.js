import { createRouter, createWebHistory } from 'vue-router'

// Lazy load views for better performance
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Business = () => import('../views/Business.vue')
const Advantages = () => import('../views/Advantages.vue')
const News = () => import('../views/News.vue')
const Contact = () => import('../views/Contact.vue')
const NotFound = () => import('../views/NotFound.vue')

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '智和明远 - 首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '公司介绍 - 智和明远'
    }
  },
  {
    path: '/business',
    name: 'Business',
    component: Business,
    meta: {
      title: '业务介绍 - 智和明远'
    }
  },
  {
    path: '/advantages',
    name: 'Advantages',
    component: Advantages,
    meta: {
      title: '班列优势 - 智和明远'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: {
      title: '行业资讯 - 智和明远'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: '联系我们 - 智和明远'
    }
  },
  {
    // 404 页面处理
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到 - 智和明远'
    }
  }
]

// Create router with scroll behavior for anchor navigation
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的滚动位置（浏览器前进后退）
    if (savedPosition) {
      return savedPosition
    }
    
    // 如果有锚点，滚动到锚点位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // 考虑固定头部导航的高度
      }
    }
    
    // 默认滚动到页面顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 路由守卫：更新页面标题和处理加载状态
router.beforeEach((to, from, next) => {
  // 显示加载状态
  if (typeof window !== 'undefined') {
    document.body.classList.add('page-loading')
  }
  
  // 更新页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

// 路由加载完成后的处理
router.afterEach((to, from) => {
  // 隐藏加载状态
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      document.body.classList.remove('page-loading')
    }, 100)
  }
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
  
  // 如果是组件加载失败，重定向到首页
  if (error.message.includes('Loading chunk')) {
    window.location.href = '/'
  }
})

// 导航辅助函数
export const navigateToSection = (path, anchor = null) => {
  if (anchor) {
    // 如果有锚点，先导航到页面再滚动到锚点
    router.push(path).then(() => {
      setTimeout(() => {
        const element = document.querySelector(anchor)
        if (element) {
          const headerHeight = 80 // 固定头部高度
          const elementPosition = element.offsetTop - headerHeight
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    })
  } else {
    router.push(path)
  }
}

// 平滑滚动到锚点的辅助函数
export const scrollToAnchor = (anchor) => {
  const element = document.querySelector(anchor)
  if (element) {
    const headerHeight = 80 // 固定头部高度
    const elementPosition = element.offsetTop - headerHeight
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

export default router