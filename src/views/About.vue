<template>
  <div class="pt-16 bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">公司介绍</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ companyInfo.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- 公司成立背景和资质 -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- 公司背景 -->
            <div class="space-y-6">
              <h2 class="text-3xl font-bold text-gray-900">公司背景</h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-lg font-semibold text-gray-800">
                    {{ companyInfo.name }}
                  </span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-600">
                    成立于{{ companyInfo.established }}
                  </span>
                </div>
                <p class="text-gray-700 leading-relaxed">
                  {{ companyInfo.background }}
                </p>
              </div>
            </div>

            <!-- 资质认证 -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">资质认证</h3>
              <div class="space-y-4">
                <div 
                  v-for="cert in certifications" 
                  :key="cert.name"
                  class="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <h4 class="font-semibold text-gray-900">{{ cert.name }}</h4>
                  <p class="text-gray-600 text-sm">{{ cert.description }}</p>
                  <p class="text-gray-500 text-xs">颁发机构：{{ cert.issuer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 业务范围和客户群体 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">业务范围与客户群体</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              我们为不同类型的客户提供全方位的国际物流服务解决方案
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12">
            <!-- 业务范围 -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                核心业务范围
              </h3>
              <div class="space-y-3">
                <div 
                  v-for="business in companyInfo.businessScope" 
                  :key="business"
                  class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-800">{{ business }}</span>
                </div>
              </div>
            </div>

            <!-- 客户群体 -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg class="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                服务客户群体
              </h3>
              <div class="space-y-3">
                <div 
                  v-for="customer in companyInfo.customerGroups" 
                  :key="customer"
                  class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-gray-800">{{ customer }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队优势和经验 -->
    <section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">团队优势</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              专业的团队，丰富的经验，为您提供最优质的物流服务
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(advantage, index) in companyInfo.teamAdvantages" 
              :key="index"
              class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ index + 1 }}
                </div>
                <div class="ml-4">
                  <div class="w-8 h-1 bg-blue-500 rounded"></div>
                </div>
              </div>
              <p class="text-gray-800 font-medium leading-relaxed">
                {{ advantage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势详细展示 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">核心竞争优势</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              三大核心优势，确保为客户提供专业、可靠的物流服务
            </p>
          </div>

          <div class="grid lg:grid-cols-3 gap-8">
            <div 
              v-for="advantage in advantages" 
              :key="advantage.id"
              class="bg-gray-50 rounded-lg p-8 hover:bg-blue-50 transition-colors group"
            >
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="advantage.icon === 'certificate'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    <path v-else-if="advantage.icon === 'globe'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ advantage.title }}</h3>
                <p class="text-gray-600">{{ advantage.description }}</p>
              </div>
              
              <div class="space-y-2">
                <div 
                  v-for="detail in advantage.details" 
                  :key="detail"
                  class="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>{{ detail }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">发展成果</h2>
            <p class="text-gray-300 max-w-2xl mx-auto">
              用数据说话，展现我们的专业实力和服务成果
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="(stat, key) in statistics" 
              :key="key"
              class="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div class="text-4xl font-bold text-blue-400 mb-2">
                {{ stat.value }}{{ stat.unit }}
              </div>
              <div class="text-xl font-semibold mb-2">{{ stat.label }}</div>
              <div class="text-gray-400 text-sm">{{ stat.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { companyInfo, advantages, statistics, certifications } from '../data/companyData.js'

export default {
  name: 'About',
  data() {
    return {
      companyInfo,
      advantages,
      statistics,
      certifications
    }
  }
}
</script>