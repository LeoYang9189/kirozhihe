<template>
  <div 
    ref="imageRef"
    class="lazy-image-container"
    :class="containerClass"
  >
    <img
      :src="currentSrc"
      :alt="alt"
      :class="[
        'lazy-image',
        imageClass,
        {
          'loading': isLoading,
          'error': hasError,
          'loaded': isLoaded
        }
      ]"
      @load="handleLoad"
      @error="handleError"
    />
    
    <!-- 加载状态 -->
    <div 
      v-if="isLoading && showLoadingState"
      class="lazy-image-loading"
    >
      <div class="loading-spinner">
        <svg class="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
    
    <!-- 错误状态 -->
    <div 
      v-if="hasError && showErrorState"
      class="lazy-image-error"
    >
      <div class="error-content">
        <svg class="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <p class="text-sm text-gray-500 mb-2">图片加载失败</p>
        <button 
          @click="retry"
          class="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          重试
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useLazyImage } from '@/composables/useLazyImage'

export default {
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: undefined
    },
    errorImage: {
      type: String,
      default: undefined
    },
    containerClass: {
      type: [String, Array, Object],
      default: ''
    },
    imageClass: {
      type: [String, Array, Object],
      default: ''
    },
    showLoadingState: {
      type: Boolean,
      default: true
    },
    showErrorState: {
      type: Boolean,
      default: true
    },
    rootMargin: {
      type: String,
      default: '50px'
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    // 图片优化选项
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    quality: {
      type: Number,
      default: 80
    }
  },
  setup(props) {
    const {
      imageRef,
      currentSrc,
      isLoading,
      hasError,
      isLoaded,
      retry
    } = useLazyImage({
      src: props.src,
      placeholder: props.placeholder,
      errorImage: props.errorImage,
      rootMargin: props.rootMargin,
      threshold: props.threshold
    })

    const handleLoad = () => {
      // 图片加载完成的额外处理
    }

    const handleError = () => {
      // 图片加载错误的额外处理
    }

    return {
      imageRef,
      currentSrc,
      isLoading,
      hasError,
      isLoaded,
      retry,
      handleLoad,
      handleError
    }
  }
}
</script>

<style scoped>
.lazy-image-container {
  @apply relative overflow-hidden;
}

.lazy-image {
  @apply w-full h-full object-cover transition-opacity duration-300;
}

.lazy-image.loading {
  @apply opacity-70;
}

.lazy-image.error {
  @apply opacity-50;
}

.lazy-image.loaded {
  @apply opacity-100;
}

.lazy-image-loading {
  @apply absolute inset-0 flex items-center justify-center bg-gray-100;
}

.lazy-image-error {
  @apply absolute inset-0 flex items-center justify-center bg-gray-50;
}

.error-content {
  @apply text-center p-4;
}

.loading-spinner {
  @apply flex items-center justify-center;
}

/* 骨架屏效果 */
.lazy-image-container::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200;
  animation: shimmer 2s infinite;
}

.lazy-image.loaded + .lazy-image-container::before {
  @apply hidden;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>