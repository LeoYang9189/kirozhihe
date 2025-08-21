import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

/**
 * 交叉观察器组合式函数
 * 用于实现懒加载和进入视窗动画
 */
export function useIntersectionObserver(options = {}) {
  const target = ref(null)
  const isIntersecting = ref(false)
  const hasIntersected = ref(false)
  
  let observer = null
  
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }
  
  onMounted(() => {
    if (!target.value) return
    
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting
        
        if (entry.isIntersecting && !hasIntersected.value) {
          hasIntersected.value = true
        }
      })
    }, defaultOptions)
    
    observer.observe(target.value)
  })
  
  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
    }
  })
  
  return {
    target,
    isIntersecting,
    hasIntersected
  }
}

/**
 * 懒加载图片组合式函数
 */
export function useLazyImage(src, placeholder = '') {
  const imageRef = ref(null)
  const isLoaded = ref(false)
  const isError = ref(false)
  const currentSrc = ref(placeholder)
  
  const { target, hasIntersected } = useIntersectionObserver({
    rootMargin: '100px'
  })
  
  const loadImage = () => {
    if (!src || isLoaded.value) return
    
    const img = new Image()
    img.onload = () => {
      currentSrc.value = src
      isLoaded.value = true
      isError.value = false
    }
    img.onerror = () => {
      isError.value = true
      isLoaded.value = false
    }
    img.src = src
  }
  
  // 当元素进入视窗时开始加载图片
  onMounted(() => {
    const unwatch = watch(hasIntersected, (newValue) => {
      if (newValue) {
        loadImage()
        unwatch() // 只需要监听一次
      }
    }, { immediate: true })
  })
  
  return {
    imageRef: target,
    currentSrc,
    isLoaded,
    isError,
    loadImage
  }
}

/**
 * 动画触发组合式函数
 */
export function useAnimationTrigger(animationClass = 'animate-fade-in') {
  const { target, hasIntersected } = useIntersectionObserver({
    threshold: 0.2
  })
  
  const animationClasses = computed(() => {
    return hasIntersected.value ? animationClass : 'opacity-0'
  })
  
  return {
    target,
    animationClasses,
    hasIntersected
  }
}