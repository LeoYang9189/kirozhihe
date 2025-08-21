<template>
  <div id="app">
    <ErrorBoundary
      :show-details="isDev"
      :show-report-button="!isDev"
      @error="handleGlobalError"
    >
      <Header />
      <main>
        <router-view v-slot="{ Component }">
          <ErrorBoundary
            fallback-title="页面加载失败"
            fallback-message="该页面暂时无法显示，请稍后重试。"
          >
            <component :is="Component" />
          </ErrorBoundary>
        </router-view>
      </main>
      <Footer />
    </ErrorBoundary>
    
    <!-- 网络状态指示器 -->
    <NetworkStatus />
  </div>
</template>

<script>
import { computed } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import ErrorBoundary from './components/common/ErrorBoundary.vue'
import NetworkStatus from './components/common/NetworkStatus.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ErrorBoundary,
    NetworkStatus
  },
  setup() {
    const isDev = computed(() => import.meta.env.DEV)

    const handleGlobalError = (errorInfo) => {
      console.error('全局错误处理:', errorInfo)
      
      // 在生产环境中发送错误报告
      if (!isDev.value) {
        // sendErrorReport(errorInfo)
      }
    }

    return {
      isDev,
      handleGlobalError
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  /* 确保主内容区域在移动端有足够的最小高度 */
  min-height: calc(100vh - 64px); /* 减去header高度 */
}

/* 性能优化 */
* {
  box-sizing: border-box;
}

/* 移动端优化 */
@media (max-width: 640px) {
  main {
    min-height: calc(100vh - 56px); /* 移动端header较小 */
  }
}

/* 减少重绘和回流 */
img, video {
  max-width: 100%;
  height: auto;
}

/* 优化滚动性能 */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>