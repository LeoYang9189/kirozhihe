import { ref, onMounted, onUnmounted, computed } from 'vue'

/**
 * 响应式断点组合式函数
 */
export function useResponsive() {
  const windowWidth = ref(0)
  
  // Tailwind CSS 断点
  const breakpoints = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
  
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }
  
  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth, { passive: true })
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })
  
  // 计算当前断点
  const currentBreakpoint = computed(() => {
    const width = windowWidth.value
    if (width >= breakpoints['2xl']) return '2xl'
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    if (width >= breakpoints.sm) return 'sm'
    if (width >= breakpoints.xs) return 'xs'
    return 'base'
  })
  
  // 响应式状态
  const isMobile = computed(() => windowWidth.value < breakpoints.md)
  const isTablet = computed(() => windowWidth.value >= breakpoints.md && windowWidth.value < breakpoints.lg)
  const isDesktop = computed(() => windowWidth.value >= breakpoints.lg)
  const isSmallScreen = computed(() => windowWidth.value < breakpoints.sm)
  const isLargeScreen = computed(() => windowWidth.value >= breakpoints.xl)
  
  // 断点检查函数
  const isBreakpoint = (breakpoint) => {
    return computed(() => windowWidth.value >= breakpoints[breakpoint])
  }
  
  // 获取响应式网格列数
  const getGridCols = (mobileCol = 1, tabletCol = 2, desktopCol = 3) => {
    return computed(() => {
      if (isMobile.value) return mobileCol
      if (isTablet.value) return tabletCol
      return desktopCol
    })
  }
  
  // 获取响应式间距
  const getSpacing = (mobileSpacing = 4, tabletSpacing = 6, desktopSpacing = 8) => {
    return computed(() => {
      if (isMobile.value) return mobileSpacing
      if (isTablet.value) return tabletSpacing
      return desktopSpacing
    })
  }
  
  return {
    windowWidth,
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    isBreakpoint,
    getGridCols,
    getSpacing
  }
}

/**
 * 触摸设备检测
 */
export function useTouchDevice() {
  const isTouchDevice = ref(false)
  
  onMounted(() => {
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })
  
  return {
    isTouchDevice
  }
}

/**
 * 设备方向检测
 */
export function useOrientation() {
  const orientation = ref('portrait')
  
  const updateOrientation = () => {
    orientation.value = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  }
  
  onMounted(() => {
    updateOrientation()
    window.addEventListener('resize', updateOrientation, { passive: true })
    window.addEventListener('orientationchange', updateOrientation, { passive: true })
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateOrientation)
    window.removeEventListener('orientationchange', updateOrientation)
  })
  
  const isPortrait = computed(() => orientation.value === 'portrait')
  const isLandscape = computed(() => orientation.value === 'landscape')
  
  return {
    orientation,
    isPortrait,
    isLandscape
  }
}

/**
 * 性能优化：防抖函数
 */
export function useDebounce(fn, delay = 300) {
  let timeoutId = null
  
  const debouncedFn = (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
  
  const cancel = () => {
    clearTimeout(timeoutId)
  }
  
  onUnmounted(() => {
    cancel()
  })
  
  return {
    debouncedFn,
    cancel
  }
}

/**
 * 性能优化：节流函数
 */
export function useThrottle(fn, delay = 100) {
  let lastCall = 0
  
  const throttledFn = (...args) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    }
  }
  
  return {
    throttledFn
  }
}