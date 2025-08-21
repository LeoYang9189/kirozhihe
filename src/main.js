import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router'
import { 
  optimizeImageLoading, 
  preloadCriticalResources, 
  optimizeThirdPartyScripts,
  trackPagePerformance,
  setupErrorHandling,
  optimizeCodeSplitting,
  preventMemoryLeaks
} from './utils/performance.js'

// 性能优化初始化
if (typeof window !== 'undefined') {
  // 设置错误处理
  setupErrorHandling()
  
  // 内存泄漏防护
  const memoryManager = preventMemoryLeaks()
  
  // 预加载关键资源
  preloadCriticalResources()
  
  // 代码分割优化
  optimizeCodeSplitting()
  
  // 优化图片加载
  document.addEventListener('DOMContentLoaded', () => {
    optimizeImageLoading()
  })
  
  // 优化第三方脚本
  optimizeThirdPartyScripts()
  
  // 性能监控（仅在开发环境）
  if (import.meta.env.DEV) {
    trackPagePerformance().then(metrics => {
      console.log('页面性能指标:', metrics)
    })
  }
  
  // 注册 Service Worker
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
  
  // 清理函数注册
  memoryManager.addCleanup(() => {
    console.log('应用清理完成')
  })
}

// Create and mount app
const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')