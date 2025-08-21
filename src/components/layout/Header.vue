<template>
  <header class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 safe-top">
    <div class="container-responsive">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex items-center space-x-2 text-lg sm:text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200 touch-target"
          >
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm sm:text-base">智</span>
            </div>
            <span class="hidden xs:inline">智和明远</span>
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <Navigation 
          :items="navigationItems" 
          :is-mobile="false"
          class="hidden lg:flex"
        />
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-200 touch-target"
          :aria-label="showMobileMenu ? '关闭菜单' : '打开菜单'"
          :aria-expanded="showMobileMenu"
        >
          <svg class="w-6 h-6 transition-transform duration-200" :class="{ 'rotate-90': showMobileMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <div 
        v-if="showMobileMenu"
        class="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
      >
        <Navigation 
          :items="navigationItems" 
          :is-mobile="true"
          class="py-4"
          @item-click="closeMobileMenu"
        />
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <div 
      v-if="showMobileMenu"
      class="fixed inset-0 bg-black/20 backdrop-blur-xs z-[-1] lg:hidden"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script>
import { ref } from 'vue'
import Navigation from './Navigation.vue'
import { navigationItems } from '../../data/navigationData.js'

export default {
  name: 'Header',
  components: {
    Navigation
  },
  setup() {
    const showMobileMenu = ref(false)
    
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }
    
    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }
    
    return {
      navigationItems,
      showMobileMenu,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>