<template>
  <section class="hero-banner relative min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden">
    <!-- 背景蒙版 -->
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div class="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-indigo-200/20 rounded-full blur-xl animate-bounce-slow"></div>
    </div>

    <div class="relative z-10 container-responsive section-padding">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- 左侧：品牌信息 -->
        <div class="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in">
          <!-- 公司LOGO区域 -->
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-medium">
                <span class="text-white font-bold text-lg sm:text-xl">智和</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                这里是logo
              </h1>
            </div>
          </div>

          <!-- 品牌标语 -->
          <div class="space-y-4">
            <div class="space-y-2 bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400 leading-tight max-w-3xl mx-auto lg:mx-0">
                {{ companyInfo.slogans[0] }}
              </h2>
              <p class="text-lg sm:text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto lg:mx-0">
                {{ companyInfo.slogans[1] }}
              </p>
            </div>
          </div>

          <!-- 公司描述 -->
          <div class="space-y-4">
            <p class="text-base sm:text-lg text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {{ companyInfo.description }}
            </p>
            <div class="flex flex-wrap justify-center lg:justify-start gap-2">
              <span 
                v-for="qualification in companyInfo.qualifications" 
                :key="qualification"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 transition-all duration-200 hover:bg-blue-200"
              >
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {{ qualification }}
              </span>
            </div>
          </div>

          <!-- CTA按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <router-link 
              to="/business" 
              class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 touch-target group"
            >
              了解业务服务
              <svg class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <router-link 
              to="/contact" 
              class="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200 touch-target"
            >
              联系我们
            </router-link>
          </div>
        </div>

        <!-- 右侧：二维码和联系信息 -->
        <div class="flex flex-col items-center space-y-6 sm:space-y-8 animate-slide-up">
          <!-- 公众号二维码 -->
          <div class="bg-white rounded-2xl shadow-strong p-6 sm:p-8 text-center w-full max-w-xs sm:max-w-sm">
            <div class="space-y-4">
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900">关注我们</h3>
              <div class="flex justify-center">
                <div class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 transition-all duration-200 hover:border-blue-300">
                  <img 
                    v-if="contactInfo.wechat.qrCode" 
                    :src="contactInfo.wechat.qrCode" 
                    :alt="contactInfo.wechat.description"
                    class="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                    @error="handleImageError"
                  >
                  <div v-else class="text-center text-gray-500">
                    <svg class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-sm">二维码</p>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-600">{{ contactInfo.wechat.description }}</p>
            </div>
          </div>

          <!-- 联系信息卡片 -->
          <div class="bg-white rounded-xl shadow-medium p-4 sm:p-6 w-full max-w-xs sm:max-w-sm">
            <h4 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">联系方式</h4>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span class="text-sm text-gray-600 break-all">{{ contactInfo.phone }}</span>
              </div>
              <div class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span class="text-sm text-gray-600 break-all">{{ contactInfo.email }}</span>
              </div>
              <div class="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-gray-600">{{ contactInfo.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
      <div class="flex flex-col items-center space-y-2">
        <span class="text-sm text-white">了解更多</span>
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import { companyInfo, contactInfo } from '@/data/companyData.js'

export default {
  name: 'HeroBanner',
  data() {
    return {
      companyInfo,
      contactInfo
    }
  },
  methods: {
    handleImageError(event) {
      // 图片加载失败时的处理
      console.warn('二维码图片加载失败:', event.target.src)
    }
  }
}
</script>

<style scoped>
.hero-banner {
  background-image: url('/banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .hero-banner {
    min-height: 100vh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .hero-banner {
    min-height: 80vh;
  }
}

/* 性能优化 */
.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  will-change: transform;
  transform: translateZ(0);
}

/* 减少动画对性能的影响 */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-slow,
  .animate-bounce-slow,
  .animate-fade-in,
  .animate-slide-up {
    animation: none;
  }
}
</style>