<template>
  <div class="business-card bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <!-- 卡片头部 -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-white">{{ business.name }}</h3>
          <span class="inline-block bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full mt-1">
            {{ business.category }}
          </span>
        </div>
        <div class="text-white opacity-80">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="p-6">
      <!-- 服务内容 -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-3">服务内容</h4>
        <p class="text-gray-600 leading-relaxed">{{ business.content }}</p>
      </div>

      <!-- 服务优势 -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          服务优势
        </h4>
        <ul class="space-y-2">
          <li 
            v-for="(advantage, index) in business.advantages" 
            :key="index"
            class="flex items-start text-sm text-gray-600"
          >
            <span class="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {{ advantage }}
          </li>
        </ul>
      </div>

      <!-- 适用场景 -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg class="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          适用场景
        </h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(scenario, index) in business.scenarios" 
            :key="index"
            class="inline-block bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full border border-purple-200"
          >
            {{ scenario }}
          </span>
        </div>
      </div>

      <!-- 客户类型 -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          客户类型
        </h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(customerType, index) in business.customerTypes" 
            :key="index"
            class="inline-block bg-orange-50 text-orange-700 text-xs px-3 py-1 rounded-full border border-orange-200"
          >
            {{ customerType }}
          </span>
        </div>
      </div>

      <!-- 展开/收起按钮 -->
      <div class="border-t border-gray-100 pt-4">
        <button 
          @click="toggleExpanded"
          class="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
        >
          <span>{{ isExpanded ? '收起详情' : '展开详情' }}</span>
          <svg 
            class="w-4 h-4 ml-1 transition-transform duration-200"
            :class="{ 'rotate-180': isExpanded }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      <!-- 展开的详细信息 -->
      <div 
        v-if="isExpanded"
        class="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fade-in"
      >
        <div class="bg-blue-50 rounded-lg p-4">
          <h5 class="font-semibold text-blue-900 mb-2">联系咨询</h5>
          <p class="text-blue-700 text-sm">
            如需了解更多关于{{ business.name }}的详细信息，请联系我们的专业团队获取定制化解决方案。
          </p>
          <button class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
            立即咨询
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessCard',
  props: {
    business: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        category: '',
        content: '',
        advantages: [],
        scenarios: [],
        customerTypes: []
      })
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style scoped>
.business-card {
  @apply max-w-md mx-auto;
}

/* 淡入动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .business-card {
    @apply max-w-full mx-0;
  }
}

/* 悬停效果 */
.business-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>