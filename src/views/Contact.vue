<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container-responsive section-padding">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">联系我们</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            我们随时为您提供专业的物流咨询服务，期待与您的合作
          </p>
        </div>
      </div>
    </div>

    <div class="container-responsive section-padding">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- 左侧：联系信息 -->
        <div class="space-y-8">
          <!-- 公司信息卡片 -->
          <div class="bg-white rounded-xl shadow-medium p-6 sm:p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">公司信息</h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">公司地址</h3>
                  <p class="text-gray-600">{{ contactInfo.address }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">联系电话</h3>
                  <p class="text-gray-600">{{ contactInfo.phone }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">电子邮箱</h3>
                  <p class="text-gray-600">{{ contactInfo.email }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">营业时间</h3>
                  <p class="text-gray-600">{{ contactInfo.businessHours }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 微信二维码 -->
          <div class="bg-white rounded-xl shadow-medium p-6 sm:p-8 text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">关注我们</h2>
            <div class="flex justify-center mb-4">
              <div class="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <img 
                  v-if="contactInfo.wechat.qrCode" 
                  :src="contactInfo.wechat.qrCode" 
                  :alt="contactInfo.wechat.description"
                  class="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                  @error="handleImageError"
                >
                <div v-else class="text-center text-gray-500">
                  <svg class="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm">微信二维码</p>
                </div>
              </div>
            </div>
            <p class="text-gray-600">{{ contactInfo.wechat.description }}</p>
          </div>
        </div>

        <!-- 右侧：联系表单 -->
        <div class="bg-white rounded-xl shadow-medium p-6 sm:p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">在线咨询</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="请输入您的姓名"
                >
              </div>
              <div>
                <label for="company" class="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                <input 
                  type="text" 
                  id="company" 
                  v-model="form.company"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="请输入公司名称"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">联系电话 *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="请输入联系电话"
                >
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">电子邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="请输入电子邮箱"
                >
              </div>
            </div>

            <div>
              <label for="service" class="block text-sm font-medium text-gray-700 mb-2">咨询服务</label>
              <select 
                id="service" 
                v-model="form.service"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">请选择咨询的服务类型</option>
                <option value="railway">国际铁路运输</option>
                <option value="container">集装箱租赁</option>
                <option value="road">跨境公路运输</option>
                <option value="multimodal">多式联运</option>
                <option value="customs">境外清关派送</option>
                <option value="other">其他服务</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">详细需求 *</label>
              <textarea 
                id="message" 
                v-model="form.message"
                required
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="请详细描述您的物流需求，我们将为您提供专业的解决方案"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">提交中...</span>
              <span v-else>提交咨询</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contactInfo } from '@/data/companyData.js'

export default {
  name: 'Contact',
  data() {
    return {
      contactInfo,
      isSubmitting: false,
      form: {
        name: '',
        company: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      }
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      try {
        // 模拟表单提交
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 显示成功消息
        alert('咨询信息已提交成功！我们将在24小时内与您联系。')
        
        // 重置表单
        this.form = {
          name: '',
          company: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        }
      } catch (error) {
        alert('提交失败，请稍后重试。')
      } finally {
        this.isSubmitting = false
      }
    },
    
    handleImageError(event) {
      console.warn('二维码图片加载失败:', event.target.src)
    }
  }
}
</script>