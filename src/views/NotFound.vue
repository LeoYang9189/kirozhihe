<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- 404 图标 -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
          <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.674-2.64"/>
          </svg>
        </div>
        <h1 class="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">页面未找到</h2>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <p class="text-gray-500 mb-4">
          抱歉，您访问的页面不存在或已被移动。
        </p>
        <p class="text-sm text-gray-400">
          请检查网址是否正确，或返回首页继续浏览。
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="space-y-4">
        <button 
          @click="goHome"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          返回首页
        </button>
        
        <button 
          @click="goBack"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          返回上一页
        </button>
      </div>

      <!-- 快速导航 -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">您可能在寻找：</p>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <router-link 
            to="/about" 
            class="text-blue-600 hover:text-blue-800 hover:underline"
          >
            公司介绍
          </router-link>
          <router-link 
            to="/business" 
            class="text-blue-600 hover:text-blue-800 hover:underline"
          >
            业务介绍
          </router-link>
          <router-link 
            to="/advantages" 
            class="text-blue-600 hover:text-blue-800 hover:underline"
          >
            班列优势
          </router-link>
          <router-link 
            to="/contact" 
            class="text-blue-600 hover:text-blue-800 hover:underline"
          >
            联系我们
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push('/')
    }

    const goBack = () => {
      if (window.history.length > 1) {
        router.go(-1)
      } else {
        router.push('/')
      }
    }

    return {
      goHome,
      goBack
    }
  }
}
</script>