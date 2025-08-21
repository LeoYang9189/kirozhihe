<template>
  <Transition name="slide-up">
    <div 
      v-if="showStatus"
      :class="[
        'network-status',
        statusClass
      ]"
    >
      <div class="flex items-center space-x-2">
        <!-- 状态图标 -->
        <div class="status-icon">
          <svg v-if="isOnline" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
        
        <!-- 状态文本 -->
        <span class="status-text">{{ statusText }}</span>
        
        <!-- 网络信息 -->
        <span v-if="showNetworkInfo && networkInfo" class="network-info">
          {{ networkInfo }}
        </span>
      </div>
      
      <!-- 关闭按钮 -->
      <button 
        v-if="showCloseButton"
        @click="hideStatus"
        class="ml-2 text-current opacity-70 hover:opacity-100"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { detectNetworkStatus } from '@/utils/performance'

export default {
  name: 'NetworkStatus',
  props: {
    autoHide: {
      type: Boolean,
      default: true
    },
    hideDelay: {
      type: Number,
      default: 3000
    },
    showNetworkInfo: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const isOnline = ref(navigator.onLine)
    const networkStatus = ref(detectNetworkStatus())
    const showStatus = ref(false)
    const userHidden = ref(false)
    
    let hideTimer = null

    // 状态类名
    const statusClass = computed(() => {
      if (!isOnline.value) return 'offline'
      
      const effectiveType = networkStatus.value.effectiveType
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        return 'slow'
      }
      
      return 'online'
    })

    // 状态文本
    const statusText = computed(() => {
      if (!isOnline.value) return '网络已断开'
      
      const effectiveType = networkStatus.value.effectiveType
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          return '网络较慢'
        case '3g':
          return '网络一般'
        case '4g':
          return '网络良好'
        default:
          return '网络已连接'
      }
    })

    // 网络信息
    const networkInfo = computed(() => {
      if (!isOnline.value || !props.showNetworkInfo) return ''
      
      const { effectiveType, downlink } = networkStatus.value
      if (downlink && downlink > 0) {
        return `${effectiveType} (${downlink}Mbps)`
      }
      return effectiveType
    })

    // 更新网络状态
    const updateNetworkStatus = () => {
      const wasOnline = isOnline.value
      isOnline.value = navigator.onLine
      networkStatus.value = detectNetworkStatus()
      
      // 网络状态变化时显示提示
      if (wasOnline !== isOnline.value && !userHidden.value) {
        showStatusTemporarily()
      }
    }

    // 临时显示状态
    const showStatusTemporarily = () => {
      showStatus.value = true
      
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
      
      if (props.autoHide && isOnline.value) {
        hideTimer = setTimeout(() => {
          showStatus.value = false
        }, props.hideDelay)
      }
    }

    // 隐藏状态
    const hideStatus = () => {
      showStatus.value = false
      userHidden.value = true
      
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
      
      // 5分钟后重置用户隐藏状态
      setTimeout(() => {
        userHidden.value = false
      }, 5 * 60 * 1000)
    }

    // 事件监听器
    const handleOnline = () => {
      updateNetworkStatus()
    }

    const handleOffline = () => {
      updateNetworkStatus()
    }

    // 网络变化监听（如果支持）
    const handleConnectionChange = () => {
      updateNetworkStatus()
    }

    onMounted(() => {
      // 初始检查
      updateNetworkStatus()
      
      // 如果离线，立即显示
      if (!isOnline.value) {
        showStatusTemporarily()
      }
      
      // 添加事件监听器
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
      
      // 监听网络连接变化
      if (navigator.connection) {
        navigator.connection.addEventListener('change', handleConnectionChange)
      }
    })

    onUnmounted(() => {
      // 清理事件监听器
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', handleConnectionChange)
      }
      
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
    })

    return {
      isOnline,
      networkStatus,
      showStatus,
      statusClass,
      statusText,
      networkInfo,
      hideStatus
    }
  }
}
</script>

<style scoped>
.network-status {
  @apply fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50;
  @apply flex items-center justify-between min-w-0;
  max-width: 300px;
}

.network-status.online {
  @apply bg-green-500 text-white;
}

.network-status.offline {
  @apply bg-red-500 text-white;
}

.network-status.slow {
  @apply bg-yellow-500 text-white;
}

.status-icon {
  @apply flex-shrink-0;
}

.status-text {
  @apply truncate;
}

.network-info {
  @apply text-xs opacity-80 ml-1;
}

/* 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .network-status {
    @apply bottom-2 right-2 left-2 max-w-none;
  }
  
  .network-info {
    @apply hidden;
  }
}
</style>