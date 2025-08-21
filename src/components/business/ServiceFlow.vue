<template>
  <div class="service-flow-container">
    <!-- 标题区域 -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">服务流程</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        专业的国际铁路运输服务流程，为您提供从询价到派送的全程无忧服务
      </p>
    </div>

    <!-- 流程步骤 -->
    <div class="relative">
      <!-- 桌面端流程线 -->
      <div class="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200"></div>
      
      <!-- 流程步骤网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-4">
        <div 
          v-for="(step, index) in steps" 
          :key="step.step"
          class="flex flex-col items-center relative"
          :class="{ 'lg:col-span-1': true }"
        >
          <!-- 移动端连接线 -->
          <div 
            v-if="index < steps.length - 1"
            class="lg:hidden absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-blue-300"
          ></div>
          
          <!-- 步骤圆圈 -->
          <div class="relative z-10 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
            {{ step.step }}
          </div>
          
          <!-- 步骤内容卡片 -->
          <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-xs text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 class="font-bold text-lg text-gray-900 mb-2">{{ step.name }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务承诺 -->
    <div class="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">服务承诺</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">全程跟踪</h4>
            <p class="text-sm text-gray-600 text-center">实时货物状态更新</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">时效保障</h4>
            <p class="text-sm text-gray-600 text-center">准时到达承诺</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">专业服务</h4>
            <p class="text-sm text-gray-600 text-center">10年行业经验</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceFlow',
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.service-flow-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .service-flow-container {
    @apply py-12;
  }
}

@media (max-width: 768px) {
  .service-flow-container {
    @apply py-8 px-4;
  }
}

/* 悬停效果增强 */
.service-flow-container .bg-white:hover {
  transform: translateY(-2px);
}
</style>