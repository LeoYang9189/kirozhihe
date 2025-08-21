<template>
  <section class="business-quick-nav section-padding bg-white">
    <div class="container-responsive">
      <!-- 标题区域 -->
      <div class="text-center mb-8 sm:mb-12 animate-fade-in">
        <h2 class="text-responsive-lg font-bold text-gray-900 mb-4">
          核心业务
        </h2>
        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          专注"一带一路"沿线国际物流服务，为客户提供专业、高效的跨境物流解决方案
        </p>
      </div>

      <!-- 业务卡片网格 -->
      <div class="grid-responsive-4">
        <div 
          v-for="(business, index) in coreBusinesses" 
          :key="business.id"
          class="business-card group cursor-pointer animate-slide-up"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="navigateToBusiness(business)"
          @keydown.enter="navigateToBusiness(business)"
          @keydown.space.prevent="navigateToBusiness(business)"
          tabindex="0"
          role="button"
          :aria-label="`了解${business.name}详情`"
        >
          <div class="bg-white rounded-xl shadow-medium hover:shadow-strong focus-within:shadow-strong transition-all duration-300 transform hover:-translate-y-2 focus:-translate-y-2 p-4 sm:p-6 h-full border border-gray-100 hover:border-blue-200 focus:border-blue-200 gpu-accelerated">
            <!-- 图标区域 -->
            <div class="flex justify-center mb-4 sm:mb-6">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 group-focus:from-blue-600 group-focus:to-blue-700 transition-all duration-300 shadow-lg">
                <component :is="getBusinessIcon(business.icon)" class="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>

            <!-- 内容区域 -->
            <div class="text-center space-y-3 sm:space-y-4">
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 group-focus:text-blue-600 transition-colors duration-300">
                {{ business.name }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed text-truncate-3">
                {{ business.description }}
              </p>
            </div>

            <!-- 箭头指示器 -->
            <div class="flex justify-center mt-4 sm:mt-6">
              <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 group-focus:bg-blue-100 transition-colors duration-300 touch-target">
                <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-focus:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="text-center mt-8 sm:mt-12 animate-fade-in">
        <p class="text-gray-500 text-sm mb-4">
          点击了解各项业务详情
        </p>
        <router-link 
          to="/business" 
          class="btn-primary inline-flex items-center px-6 py-3 touch-target group"
        >
          查看全部业务
          <svg class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { coreBusinesses } from '@/data/businessData.js'

export default {
  name: 'BusinessQuickNav',
  data() {
    return {
      coreBusinesses
    }
  },
  methods: {
    getBusinessIcon(iconName) {
      // 根据图标名称返回对应的SVG组件
      const icons = {
        train: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7H6V6h12v4z"/>
            </svg>
          `
        },
        cube: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7L12 2zm0 2.18L18.18 7 12 9.82 5.82 7 12 4.18zm7 12.82c0 4.45-2.55 8-7 8s-7-3.55-7-8V8.82l7 3.18 7-3.18V17z"/>
            </svg>
          `
        },
        truck: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          `
        },
        globe: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          `
        }
      }
      
      return icons[iconName] || icons.globe
    },
    navigateToBusiness(business) {
      // 跳转到业务详情页面
      if (business.path) {
        this.$router.push(business.path)
      } else {
        // 如果没有指定路径，跳转到业务页面并滚动到对应锚点
        this.$router.push(`/business#${business.id}`)
      }
    }
  }
}
</script>

<style scoped>
.business-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.business-card:hover,
.business-card:focus {
  transform: translateY(-8px);
}

.business-card:active {
  transform: translateY(-4px);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .business-card:hover,
  .business-card:focus {
    transform: translateY(-4px);
  }
}

/* 性能优化 */
.business-card .gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 减少动画对性能的影响 */
@media (prefers-reduced-motion: reduce) {
  .business-card {
    transition: none;
  }
  
  .business-card:hover,
  .business-card:focus {
    transform: none;
  }
  
  .animate-slide-up {
    animation: none;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .business-card:hover {
    transform: none;
  }
  
  .business-card:active {
    transform: scale(0.98);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .business-card {
    border-width: 2px;
  }
}
</style>