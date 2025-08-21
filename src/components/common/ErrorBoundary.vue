<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <!-- 错误图标 -->
      <div class="error-icon mb-4">
        <svg class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      
      <!-- 错误标题 -->
      <h2 class="text-2xl font-bold text-red-600 mb-4">
        {{ errorTitle }}
      </h2>
      
      <!-- 错误描述 -->
      <p class="text-gray-600 mb-6">
        {{ errorMessage }}
      </p>
      
      <!-- 错误详情（开发环境） -->
      <details v-if="showDetails && errorDetails" class="mb-6 text-left">
        <summary class="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
          查看错误详情
        </summary>
        <pre class="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">{{ errorDetails }}</pre>
      </details>
      
      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          @click="retry"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          重试
        </button>
        
        <button 
          @click="goHome"
          class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          返回首页
        </button>
        
        <button 
          v-if="showReportButton"
          @click="reportError"
          class="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          报告问题
        </button>
      </div>
    </div>
  </div>
  
  <slot v-else />
</template>

<script>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ErrorBoundary',
  props: {
    fallbackTitle: {
      type: String,
      default: '出现了一些问题'
    },
    fallbackMessage: {
      type: String,
      default: '抱歉，页面遇到了错误。请尝试刷新页面或返回首页。'
    },
    showDetails: {
      type: Boolean,
      default: false
    },
    showReportButton: {
      type: Boolean,
      default: false
    },
    onError: {
      type: Function,
      default: null
    }
  },
  emits: ['error', 'retry'],
  setup(props, { emit }) {
    const router = useRouter()
    
    const hasError = ref(false)
    const errorTitle = ref(props.fallbackTitle)
    const errorMessage = ref(props.fallbackMessage)
    const errorDetails = ref('')
    const errorInfo = ref(null)

    // 捕获子组件错误
    onErrorCaptured((error, instance, info) => {
      console.error('ErrorBoundary 捕获到错误:', error)
      
      hasError.value = true
      errorInfo.value = { error, instance, info }
      
      // 设置错误信息
      if (error.message) {
        errorMessage.value = `错误信息: ${error.message}`
      }
      
      if (props.showDetails) {
        errorDetails.value = `${error.stack}\n\n组件信息: ${info}`
      }
      
      // 调用自定义错误处理函数
      if (props.onError) {
        props.onError(error, instance, info)
      }
      
      // 发出错误事件
      emit('error', { error, instance, info })
      
      // 阻止错误继续向上传播
      return false
    })

    // 重试函数
    const retry = () => {
      hasError.value = false
      errorTitle.value = props.fallbackTitle
      errorMessage.value = props.fallbackMessage
      errorDetails.value = ''
      errorInfo.value = null
      
      emit('retry')
      
      // 强制重新渲染
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }

    // 返回首页
    const goHome = () => {
      router.push('/')
    }

    // 报告错误
    const reportError = () => {
      if (errorInfo.value) {
        const { error, info } = errorInfo.value
        
        // 这里可以集成错误报告服务
        const errorReport = {
          message: error.message,
          stack: error.stack,
          componentInfo: info,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
        
        console.log('错误报告:', errorReport)
        
        // 示例：发送到错误监控服务
        // sendErrorReport(errorReport)
        
        alert('错误报告已发送，感谢您的反馈！')
      }
    }

    // 手动设置错误状态（供外部调用）
    const setError = (title, message, details = '') => {
      hasError.value = true
      errorTitle.value = title
      errorMessage.value = message
      errorDetails.value = details
    }

    // 清除错误状态
    const clearError = () => {
      hasError.value = false
      errorTitle.value = props.fallbackTitle
      errorMessage.value = props.fallbackMessage
      errorDetails.value = ''
      errorInfo.value = null
    }

    return {
      hasError,
      errorTitle,
      errorMessage,
      errorDetails,
      retry,
      goHome,
      reportError,
      setError,
      clearError
    }
  }
}
</script>

<style scoped>
.error-boundary {
  @apply min-h-screen flex items-center justify-center p-4;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
}

.error-content {
  @apply max-w-md w-full text-center bg-white rounded-lg shadow-lg p-8;
}

.error-icon {
  @apply flex justify-center;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .error-content {
    @apply p-6;
  }
  
  .error-icon svg {
    @apply w-12 h-12;
  }
}
</style>