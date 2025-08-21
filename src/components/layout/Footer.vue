<template>
  <footer class="bg-gray-800 text-white section-padding-sm safe-bottom">
    <div class="container-responsive">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <!-- Company Info -->
        <div class="sm:col-span-2 lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">智</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold">{{ companyInfo.shortName }}</h3>
          </div>
          <p class="text-gray-300 text-sm mb-4 leading-relaxed max-w-md">
            {{ companyInfo.description }}
          </p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="qualification in companyInfo.qualifications" 
              :key="qualification"
              class="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:bg-primary-700"
            >
              {{ qualification }}
            </span>
          </div>
          <p class="text-gray-400 text-xs max-w-md">
            {{ companyInfo.slogans[1] }}
          </p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-base sm:text-lg font-semibold mb-4">快速导航</h3>
          <ul class="space-y-2 sm:space-y-3">
            <li v-for="item in navigationItems" :key="item.name">
              <router-link 
                :to="item.path" 
                class="text-gray-300 hover:text-primary-400 focus:text-primary-400 transition-colors duration-200 text-sm flex items-center group py-1 touch-target"
              >
                <span class="w-1 h-1 bg-primary-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200"></span>
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div class="sm:col-span-2 lg:col-span-1">
          <h3 class="text-base sm:text-lg font-semibold mb-4">联系方式</h3>
          <div class="text-gray-300 text-sm space-y-3">
            <div class="flex items-start p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
              <svg class="w-4 h-4 mt-0.5 mr-3 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="break-words">{{ contactInfo.address }}</span>
            </div>
            <div class="flex items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
              <svg class="w-4 h-4 mr-3 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="break-all">{{ contactInfo.phone }}</span>
            </div>
            <div class="flex items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
              <svg class="w-4 h-4 mr-3 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="break-all">{{ contactInfo.email }}</span>
            </div>
            <div class="text-xs text-gray-400 mt-4 p-2">
              {{ contactInfo.businessHours }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Section -->
      <div class="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p class="text-gray-400 text-sm text-center sm:text-left">
            © {{ new Date().getFullYear() }} {{ companyInfo.name }}. 保留所有权利.
          </p>
          <div class="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-400">
            <span 
              v-for="lang in contactInfo.languages" 
              :key="lang" 
              class="hover:text-primary-400 focus:text-primary-400 cursor-pointer transition-colors duration-200 py-1 px-2 rounded touch-target"
              tabindex="0"
            >
              {{ lang }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { navigationItems } from '../../data/navigationData.js'
import { companyInfo, contactInfo } from '../../data/companyData.js'

export default {
  name: 'Footer',
  setup() {
    return {
      navigationItems,
      companyInfo,
      contactInfo
    }
  }
}
</script>