import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 图片懒加载 Composable
 * @param {Object} options - 配置选项
 * @param {string} options.src - 图片源地址
 * @param {string} options.placeholder - 占位图地址
 * @param {string} options.errorImage - 错误时显示的图片
 * @param {number} options.rootMargin - 提前加载的边距
 * @param {number} options.threshold - 触发加载的阈值
 */
export function useLazyImage(options = {}) {
  const {
    src,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWKoOi9veS4rS4uLjwvdGV4dD48L3N2Zz4=',
    errorImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmYyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2VmNDQ0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=',
    rootMargin = '50px',
    threshold = 0.1
  } = options

  const imageRef = ref(null)
  const currentSrc = ref(placeholder)
  const isLoading = ref(true)
  const hasError = ref(false)
  const isLoaded = ref(false)

  let observer = null

  const loadImage = () => {
    if (!src || isLoaded.value) return

    const img = new Image()
    
    img.onload = () => {
      currentSrc.value = src
      isLoading.value = false
      isLoaded.value = true
      hasError.value = false
    }
    
    img.onerror = () => {
      currentSrc.value = errorImage
      isLoading.value = false
      hasError.value = true
      console.warn(`图片加载失败: ${src}`)
    }
    
    img.src = src
  }

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage()
        if (observer && imageRef.value) {
          observer.unobserve(imageRef.value)
        }
      }
    })
  }

  onMounted(() => {
    if (!imageRef.value) return

    // 检查是否支持 IntersectionObserver
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(handleIntersection, {
        rootMargin,
        threshold
      })
      
      observer.observe(imageRef.value)
    } else {
      // 降级处理：直接加载图片
      loadImage()
    }
  })

  onUnmounted(() => {
    if (observer && imageRef.value) {
      observer.unobserve(imageRef.value)
    }
  })

  // 手动重试加载
  const retry = () => {
    if (hasError.value) {
      hasError.value = false
      isLoading.value = true
      currentSrc.value = placeholder
      loadImage()
    }
  }

  return {
    imageRef,
    currentSrc,
    isLoading,
    hasError,
    isLoaded,
    retry
  }
}

/**
 * 批量图片预加载
 * @param {Array<string>} urls - 图片URL数组
 * @returns {Promise<Array>} 加载结果
 */
export function preloadImages(urls) {
  return Promise.allSettled(
    urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(url)
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
        img.src = url
      })
    })
  )
}

/**
 * 图片格式优化检测
 * @returns {Object} 支持的图片格式
 */
export function detectImageFormats() {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  return {
    webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
    avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
  }
}

/**
 * 获取优化后的图片URL
 * @param {string} originalUrl - 原始图片URL
 * @param {Object} options - 优化选项
 * @returns {string} 优化后的URL
 */
export function getOptimizedImageUrl(originalUrl, options = {}) {
  const { width, height, quality = 80, format } = options
  const formats = detectImageFormats()
  
  // 如果支持现代格式，优先使用
  let targetFormat = format
  if (!targetFormat) {
    if (formats.avif) {
      targetFormat = 'avif'
    } else if (formats.webp) {
      targetFormat = 'webp'
    }
  }
  
  // 这里可以集成图片CDN服务的URL转换逻辑
  // 例如：阿里云OSS、腾讯云COS等
  let optimizedUrl = originalUrl
  
  // 示例：如果使用阿里云OSS
  if (originalUrl.includes('aliyuncs.com')) {
    const params = []
    if (width) params.push(`w_${width}`)
    if (height) params.push(`h_${height}`)
    if (quality) params.push(`q_${quality}`)
    if (targetFormat) params.push(`f_${targetFormat}`)
    
    if (params.length > 0) {
      optimizedUrl = `${originalUrl}?x-oss-process=image/resize,${params.join(',')}`
    }
  }
  
  return optimizedUrl
}