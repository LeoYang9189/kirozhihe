<template>
  <div class="business-page">
    <!-- 页面头部 -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">业务介绍</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            专业的国际物流服务，为您提供一带一路沿线全方位运输解决方案
          </p>
        </div>
      </div>
    </div>

    <!-- 服务流程组件 -->
    <section class="bg-gray-50">
      <ServiceFlow :steps="serviceFlow" />
    </section>

    <!-- 业务分类展示 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 核心业务 -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">核心业务</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              基于丰富的班列运营经验，为客户提供专业的铁路运输服务
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BusinessCard 
              v-for="business in coreBusinessList" 
              :key="business.name"
              :business="business" 
            />
          </div>
        </div>

        <!-- 配套业务 -->
        <div>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">配套业务</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              完善的配套服务体系，为客户提供一站式物流解决方案
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BusinessCard 
              v-for="business in supportBusinessList" 
              :key="business.name"
              :business="business" 
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 服务优势总结 -->
    <section class="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">为什么选择智和明远</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            专业团队 · 丰富经验 · 全程服务 · 品质保障
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">NOVCC资质</h3>
            <p class="text-gray-600">正规资质认证，合规运营保障</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">丰富经验</h3>
            <p class="text-gray-600">近10年国际铁路运输经验</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">全球网络</h3>
            <p class="text-gray-600">覆盖一带一路沿线主要国家</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">全客户服务</h3>
            <p class="text-gray-600">服务各类型客户群体</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系咨询区域 -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">需要定制化物流解决方案？</h2>
        <p class="text-lg text-gray-600 mb-8">
          我们的专业团队将根据您的具体需求，为您量身定制最优的运输方案
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            立即咨询
          </button>
          <button class="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
            获取报价
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ServiceFlow from '../components/business/ServiceFlow.vue'
import BusinessCard from '../components/business/BusinessCard.vue'
import { serviceFlow, businessDetails } from '../data/businessData.js'

export default {
  name: 'Business',
  components: {
    ServiceFlow,
    BusinessCard
  },
  data() {
    return {
      serviceFlow,
      // 核心业务列表
      coreBusinessList: [
        businessDetails.railwayFull,
        businessDetails.railwayLCL
      ],
      // 配套业务列表
      supportBusinessList: [
        businessDetails.multimodal,
        businessDetails.crossBorderTruck,
        businessDetails.clearanceDelivery
      ]
    }
  },
  mounted() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
.business-page {
  @apply min-h-screen;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .business-page h1 {
    @apply text-3xl;
  }
  
  .business-page .grid {
    @apply gap-6;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}
</style>