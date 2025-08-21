/**
 * 性能监控工具
 */

/**
 * 监控页面加载性能
 */
export function trackPagePerformance() {
  if (typeof window === 'undefined' || !window.performance) {
    return null
  }

  return new Promise((resolve) => {
    // 等待页面完全加载
    if (document.readyState === 'complete') {
      collectMetrics(resolve)
    } else {
      window.addEventListener('load', () => {
        // 延迟一点时间确保所有资源都加载完成
        setTimeout(() => collectMetrics(resolve), 100)
      })
    }
  })
}

/**
 * 收集性能指标
 */
function collectMetrics(callback) {
  const navigation = performance.getEntriesByType('navigation')[0]
  const paint = performance.getEntriesByType('paint')
  
  const metrics = {
    // 页面加载时间
    loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 0,
    
    // DOM 内容加载时间
    domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : 0,
    
    // 首次内容绘制时间
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    
    // 首次绘制时间
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    
    // DNS 查询时间
    dnsTime: navigation ? Math.round(navigation.domainLookupEnd - navigation.domainLookupStart) : 0,
    
    // TCP 连接时间
    tcpTime: navigation ? Math.round(navigation.connectEnd - navigation.connectStart) : 0,
    
    // 请求响应时间
    responseTime: navigation ? Math.round(navigation.responseEnd - navigation.requestStart) : 0,
    
    // 资源数量
    resourceCount: performance.getEntriesByType('resource').length
  }
  
  callback(metrics)
}

/**
 * 监控资源加载性能
 */
export function trackResourcePerformance() {
  if (typeof window === 'undefined' || !window.performance) {
    return []
  }

  const resources = performance.getEntriesByType('resource')
  
  return resources.map(resource => ({
    name: resource.name,
    type: getResourceType(resource),
    size: resource.transferSize || 0,
    duration: Math.round(resource.duration),
    startTime: Math.round(resource.startTime)
  })).filter(resource => resource.duration > 0)
}

/**
 * 获取资源类型
 */
function getResourceType(resource) {
  if (resource.initiatorType) {
    return resource.initiatorType
  }
  
  const url = resource.name
  if (url.includes('.css')) return 'css'
  if (url.includes('.js')) return 'script'
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'img'
  if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font'
  
  return 'other'
}

/**
 * 图片懒加载性能优化
 */
export function optimizeImageLoading() {
  // 预加载关键图片
  const criticalImages = document.querySelectorAll('img[data-critical]')
  criticalImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src
      img.removeAttribute('data-src')
    }
  })
  
  // 懒加载非关键图片
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px'
    })
    
    lazyImages.forEach(img => imageObserver.observe(img))
  }
}

/**
 * 预加载关键资源
 */
export function preloadCriticalResources() {
  const criticalResources = [
    // 关键CSS
    { href: '/assets/styles/main.css', as: 'style' },
    // 关键字体
    { href: '/assets/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ]
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    Object.assign(link, resource)
    document.head.appendChild(link)
  })
}

/**
 * 优化第三方脚本加载
 */
export function optimizeThirdPartyScripts() {
  // 延迟加载非关键第三方脚本
  const deferredScripts = [
    // 分析脚本
    'https://www.googletagmanager.com/gtag/js',
    // 其他第三方脚本
  ]
  
  // 页面加载完成后再加载这些脚本
  window.addEventListener('load', () => {
    setTimeout(() => {
      deferredScripts.forEach(src => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        document.head.appendChild(script)
      })
    }, 2000) // 延迟2秒加载
  })
}

/**
 * 内存使用监控
 */
export function trackMemoryUsage() {
  if (!performance.memory) {
    return null
  }
  
  return {
    used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024), // MB
    total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024), // MB
    limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) // MB
  }
}

/**
 * 网络状态监控
 */
export function trackNetworkStatus() {
  if (!navigator.connection) {
    return null
  }
  
  return {
    effectiveType: navigator.connection.effectiveType,
    downlink: navigator.connection.downlink,
    rtt: navigator.connection.rtt,
    saveData: navigator.connection.saveData
  }
}

/**
 * 设备信息收集
 */
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenWidth: screen.width,
    screenHeight: screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1
  }
}

/**
 * 性能报告生成
 */
export async function generatePerformanceReport() {
  const [pageMetrics] = await Promise.all([
    trackPagePerformance()
  ])
  
  const report = {
    timestamp: new Date().toISOString(),
    page: {
      url: window.location.href,
      title: document.title,
      ...pageMetrics
    },
    resources: trackResourcePerformance(),
    memory: trackMemoryUsage(),
    network: trackNetworkStatus(),
    device: getDeviceInfo()
  }
  
  return report
}

/**
 * 性能优化建议
 */
export function getPerformanceRecommendations(metrics) {
  const recommendations = []
  
  if (metrics.loadTime > 3000) {
    recommendations.push('页面加载时间超过3秒，建议优化资源加载')
  }
  
  if (metrics.firstContentfulPaint > 2500) {
    recommendations.push('首次内容绘制时间较长，建议优化关键渲染路径')
  }
  
  if (metrics.resourceCount > 100) {
    recommendations.push('资源数量较多，建议合并和压缩资源')
  }
  
  const memory = trackMemoryUsage()
  if (memory && memory.used > 50) {
    recommendations.push('内存使用较高，建议检查内存泄漏')
  }
  
  return recommendations
}/**
 * 代
码分割和懒加载优化
 */
export function optimizeCodeSplitting() {
  // 预加载下一个可能访问的路由
  const prefetchRoutes = ['/about', '/business', '/contact']
  
  // 在空闲时间预加载
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      prefetchRoutes.forEach(route => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      })
    })
  }
}

/**
 * 错误边界处理
 */
export function setupErrorHandling() {
  // 全局错误处理
  window.addEventListener('error', (event) => {
    console.error('全局错误:', event.error)
    
    // 发送错误报告（生产环境）
    if (import.meta.env.PROD) {
      // sendErrorReport(event.error)
    }
  })
  
  // Promise 错误处理
  window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的 Promise 错误:', event.reason)
    
    // 防止错误显示在控制台
    event.preventDefault()
  })
  
  // 资源加载错误处理
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      console.error('资源加载错误:', event.target.src || event.target.href)
      
      // 图片加载失败时的处理
      if (event.target.tagName === 'IMG') {
        event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmYyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2VmNDQ0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWKoOi9veWksei0pTwvdGV4dD48L3N2Zz4='
      }
    }
  }, true)
}

/**
 * 内存泄漏防护
 */
export function preventMemoryLeaks() {
  // 清理全局事件监听器
  const cleanup = []
  
  // 页面卸载时清理
  window.addEventListener('beforeunload', () => {
    cleanup.forEach(fn => fn())
  })
  
  return {
    addCleanup: (fn) => cleanup.push(fn)
  }
}

/**
 * 检测网络状态
 */
export function detectNetworkStatus() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  
  return {
    isOnline: navigator.onLine,
    effectiveType: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || 0,
    rtt: connection?.rtt || 0
  }
}

/**
 * 自适应加载策略
 */
export function adaptiveLoading() {
  const networkStatus = detectNetworkStatus()
  
  // 根据网络状况调整加载策略
  if (networkStatus.effectiveType === 'slow-2g' || networkStatus.effectiveType === '2g') {
    return {
      imageQuality: 60,
      enableLazyLoading: true,
      prefetchDisabled: true
    }
  } else if (networkStatus.effectiveType === '3g') {
    return {
      imageQuality: 75,
      enableLazyLoading: true,
      prefetchDisabled: false
    }
  } else {
    return {
      imageQuality: 90,
      enableLazyLoading: false,
      prefetchDisabled: false
    }
  }
}

/**
 * 防抖函数
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

/**
 * 节流函数
 */
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}