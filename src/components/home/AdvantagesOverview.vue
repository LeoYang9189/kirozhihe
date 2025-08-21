<template>
  <section class="advantages-overview py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- 标题区域 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          优势速览
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          凭借专业资质、全球网络和丰富经验，为客户提供可靠的物流服务保障
        </p>
      </div>

      <!-- 优势卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(advantage, index) in advantages" 
          :key="advantage.id"
          class="advantage-card"
          :class="{ 'animate-fade-in-up': isVisible }"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center h-full border border-gray-100 hover:border-blue-200 group">
            <!-- 图标区域 -->
            <div class="flex justify-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-110">
                <component :is="getAdvantageIcon(advantage.icon)" class="w-10 h-10 text-white" />
              </div>
            </div>

            <!-- 内容区域 -->
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {{ advantage.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ advantage.description }}
              </p>
            </div>

            <!-- 详情列表 -->
            <div class="mt-6 space-y-2">
              <div 
                v-for="detail in advantage.details" 
                :key="detail"
                class="flex items-center justify-center text-sm text-gray-500"
              >
                <svg class="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ detail }}</span>
              </div>
            </div>

            <!-- 悬停效果指示器 -->
            <div class="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部行动号召 -->
      <div class="text-center mt-12">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            选择智和明远的理由
          </h3>
          <p class="text-gray-600 mb-6">
            专业的团队、完善的网络、丰富的经验，让您的货物安全、快速到达目的地
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/about" 
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              了解更多优势
            </router-link>
            <router-link 
              to="/contact" 
              class="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
            >
              立即咨询
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { advantages } from '@/data/companyData.js'

export default {
  name: 'AdvantagesOverview',
  data() {
    return {
      advantages,
      isVisible: false
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  methods: {
    getAdvantageIcon(iconName) {
      // 根据图标名称返回对应的SVG组件
      const icons = {
        certificate: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          `
        },
        globe: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          `
        },
        users: {
          template: `
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 16.98 7c-.8 0-1.54.37-2.01.97L12.5 11.5 9.98 7.97A3.01 3.01 0 0 0 7 7c-.8 0-1.54.37-2.01.97L2.46 15.5H5v6.5h2V16h1.5l1.75-5.25L12.5 16H14v6h2zm-11.5-2.5H7V16H5.5v3.5zm6-6L12.5 9 15 13.5h-2.5z"/>
            </svg>
          `
        }
      }
      
      return icons[iconName] || icons.certificate
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
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      observer.observe(this.$el)
    }
  }
}
</script>

<style scoped>
/* 进入视窗动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* 卡片悬停效果 */
.advantage-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.advantage-card:hover {
  transform: translateY(-4px);
}

/* 图标容器动画 */
.advantage-card .group:hover .transform {
  transform: scale(1.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .advantage-card {
    margin-bottom: 2rem;
  }
  
  .advantage-card .space-y-2 {
    text-align: left;
  }
  
  .advantage-card .flex.items-center.justify-center {
    justify-content: flex-start;
  }
}

/* 渐变背景效果 */
.advantages-overview {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* 卡片阴影动画 */
.advantage-card .shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.advantage-card:hover .shadow-xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 图标容器阴影 */
.advantage-card .shadow-lg.group-hover\:shadow-xl {
  transition: all 0.3s ease;
}
</style>