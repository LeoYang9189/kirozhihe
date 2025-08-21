// 智和明远网站 Service Worker
const CACHE_NAME = 'zhihe-mingyuan-v1'
const STATIC_CACHE_NAME = 'zhihe-static-v1'
const DYNAMIC_CACHE_NAME = 'zhihe-dynamic-v1'

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
]

// 需要缓存的 API 路径模式
const CACHE_PATTERNS = [
  /\/assets\//,
  /\/images\//,
  /\/fonts\//,
  /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2)$/
]

// 安装事件
self.addEventListener('install', (event) => {
  console.log('Service Worker 安装中...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('缓存静态资源')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        // 强制激活新的 Service Worker
        return self.skipWaiting()
      })
  )
})

// 激活事件
self.addEventListener('activate', (event) => {
  console.log('Service Worker 激活中...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // 删除旧版本的缓存
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('zhihe-')) {
              console.log('删除旧缓存:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        // 立即控制所有客户端
        return self.clients.claim()
      })
  )
})

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // 只处理同源请求
  if (url.origin !== location.origin) {
    return
  }
  
  // 处理导航请求（页面请求）
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request))
    return
  }
  
  // 处理静态资源请求
  if (shouldCache(request)) {
    event.respondWith(handleResourceRequest(request))
    return
  }
})

// 处理导航请求
async function handleNavigationRequest(request) {
  try {
    // 尝试从网络获取
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // 缓存成功的响应
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }
    
    throw new Error('Network response not ok')
  } catch (error) {
    console.log('网络请求失败，尝试从缓存获取:', request.url)
    
    // 从缓存获取
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // 返回离线页面或首页
    const fallbackResponse = await caches.match('/')
    if (fallbackResponse) {
      return fallbackResponse
    }
    
    // 最后的降级方案
    return new Response('页面暂时无法访问，请检查网络连接。', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }
}

// 处理资源请求
async function handleResourceRequest(request) {
  try {
    // 先检查缓存
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      // 对于静态资源，直接返回缓存
      if (isStaticAsset(request)) {
        return cachedResponse
      }
      
      // 对于动态资源，后台更新缓存
      updateCache(request)
      return cachedResponse
    }
    
    // 从网络获取
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // 缓存响应
      const cache = await caches.open(
        isStaticAsset(request) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME
      )
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('资源请求失败:', request.url)
    
    // 对于图片，返回占位图
    if (request.destination === 'image') {
      return new Response(
        '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">图片加载失败</text></svg>',
        {
          headers: { 'Content-Type': 'image/svg+xml' }
        }
      )
    }
    
    throw error
  }
}

// 后台更新缓存
async function updateCache(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
  } catch (error) {
    console.log('后台缓存更新失败:', request.url)
  }
}

// 判断是否应该缓存
function shouldCache(request) {
  const url = request.url
  return CACHE_PATTERNS.some(pattern => pattern.test(url))
}

// 判断是否为静态资源
function isStaticAsset(request) {
  const url = request.url
  return /\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2|ico)$/.test(url)
}

// 消息处理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ cacheSize: size })
    })
  }
})

// 获取缓存大小
async function getCacheSize() {
  const cacheNames = await caches.keys()
  let totalSize = 0
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const requests = await cache.keys()
    
    for (const request of requests) {
      const response = await cache.match(request)
      if (response) {
        const blob = await response.blob()
        totalSize += blob.size
      }
    }
  }
  
  return Math.round(totalSize / 1024 / 1024 * 100) / 100 // MB
}

// 定期清理过期缓存
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupExpiredCache())
  }
})

// 清理过期缓存
async function cleanupExpiredCache() {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  const requests = await cache.keys()
  const now = Date.now()
  const maxAge = 7 * 24 * 60 * 60 * 1000 // 7天
  
  for (const request of requests) {
    const response = await cache.match(request)
    if (response) {
      const dateHeader = response.headers.get('date')
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime()
        if (now - responseDate > maxAge) {
          await cache.delete(request)
        }
      }
    }
  }
}