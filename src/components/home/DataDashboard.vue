<template>
  <section class="data-dashboard section-padding bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-transparent"></div>
      <div class="absolute top-5 sm:top-10 right-5 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-white/5 rounded-full blur-xl animate-pulse-slow"></div>
      <div class="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-24 sm:w-40 h-24 sm:h-40 bg-white/5 rounded-full blur-xl animate-bounce-slow"></div>
    </div>

    <div class="container-responsive relative z-10">
      <!-- 标题区域 -->
      <div class="text-center mb-8 sm:mb-12 animate-fade-in">
        <h2 class="text-responsive-lg font-bold mb-4">
          数据看板
        </h2>
        <p class="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
          用数据说话，见证我们的专业实力和服务品质
        </p>
      </div>

      <!-- 数据统计卡片 -->
      <div class="grid-responsive-4">
        <div 
          v-for="(stat, index) in statisticsArray" 
          :key="stat.key"
          class="stat-card"
          :class="{ 'animate-slide-up': isVisible }"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-white/20 hover:bg-white/15 focus-within:bg-white/15 transition-all duration-300 group gpu-accelerated">
            <!-- 图标 -->
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 group-focus:bg-white/30 transition-all duration-300">
                <component :is="getStatIcon(stat.key)" class="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>

            <!-- 数值 -->
            <div class="space-y-2">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold tabular-nums">
                <AnimatedCounter 
                  v-if="isVisible"
                  :target="stat.value" 
                  :suffix="stat.unit"
                  :duration="2000"
                  :delay="index * 150"
                />
                <span v-else>0{{ stat.unit }}</span>
              </div>
              <h3 class="text-base sm:text-lg font-semibold text-blue-100">
                {{ stat.label }}
              </h3>
              <p class="text-sm text-blue-200 leading-relaxed text-truncate-2">
                {{ stat.description }}
              </p>
            </div>

            <!-- 进度指示器 -->
            <div class="mt-4">
              <div class="w-full bg-white/20 rounded-full h-1">
                <div 
                  class="bg-white rounded-full h-1 transition-all duration-1000 ease-out"
                  :class="{ 'animate-progress': isVisible }"
                  :style="{ 
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${index * 150 + 500}ms`
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="text-center mt-8 sm:mt-12 animate-fade-in">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-3xl mx-auto border border-white/20">
          <h3 class="text-xl sm:text-2xl font-bold mb-4">
            持续增长的业务数据
          </h3>
          <p class="text-blue-100 mb-6 leading-relaxed text-sm sm:text-base">
            自成立以来，我们始终坚持以客户为中心，不断提升服务质量。这些数据见证了我们的成长历程，也是客户信任的最好证明。
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/about" 
              class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 touch-target"
            >
              了解公司历程
            </router-link>
            <router-link 
              to="/business" 
              class="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 focus:bg-white/10 transition-colors duration-200 touch-target"
            >
              查看服务案例
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { statistics } from '@/data/companyData.js'
import AnimatedCounter from '@/components/common/AnimatedCounter.vue'

export default {
  name: 'DataDashboard',
  components: {
    AnimatedCounter
  },
  data() {
    return {
      statistics,
      isVisible: false
    }
  },
  computed: {
    statisticsArray() {
      // 将统计数据对象转换为数组，便于遍历
      return Object.keys(this.statistics).map(key => ({
        key,
        ...this.statistics[key]
      }))
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  methods: {
    getStatIcon(statKey) {
      // 根据统计项返回对应的图标
      const icons = {
        cargoVolume: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
            </svg>
          `
        },
        countries: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          `
        },
        satisfaction: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          `
        },
        routes: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          `
        }
      }
      
      return icons[statKey] || icons.cargoVolume
    },
    setupIntersectionObserver() {
      // 设置交叉观察器，当组件进入视窗时触发动画
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible = true
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      )

      observer.observe(this.$el)
    }
  }
}
</script>

<style scoped>
/* 滑入动画 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
}

/* 进度条动画 */
@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 1s ease-out forwards;
}

/* 卡片悬停效果 */
.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
}

/* 背景渐变动画 */
.data-dashboard {
  background: linear-gradient(135deg, #2563eb 0%, #3730a3 50%, #1e40af 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 毛玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .stat-card {
    margin-bottom: 1rem;
  }
  
  .stat-card:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .data-dashboard .text-3xl {
    font-size: 2rem;
  }
  
  .data-dashboard .sm\:text-4xl {
    font-size: 2.5rem;
  }
  
  .data-dashboard .lg\:text-5xl {
    font-size: 3rem;
  }
}

/* 数字动画效果 */
.tabular-nums {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

/* 图标容器动画 */
.stat-card .group:hover .transition-all {
  transform: scale(1.1);
}

/* 性能优化 */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

/* 减少动画对性能的影响 */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up,
  .animate-progress,
  .animate-pulse-slow,
  .animate-bounce-slow {
    animation: none;
  }
  
  .stat-card:hover {
    transform: none;
  }
  
  .data-dashboard {
    animation: none;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .stat-card:hover {
    transform: none;
  }
  
  .stat-card:active {
    transform: scale(0.98);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .stat-card .border {
    border-width: 2px;
  }
  
  .bg-white\/10 {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>