<template>
  <nav :class="navigationClass">
    <a
      v-for="item in items"
      :key="item.name"
      href="#"
      :class="[linkClass, { 'text-primary-600 font-semibold after:w-full': isActiveRoute(item) && !isMobile, 'text-primary-600 font-semibold bg-primary-50': isActiveRoute(item) && isMobile }]"
      @click.prevent="handleNavClick(item)"
    >
      {{ item.name }}
    </a>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useNavigation } from '../../composables/useNavigation.js'

export default {
  name: 'Navigation',
  props: {
    items: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['item-click'],
  setup(props, { emit }) {
    const { handleNavigation, isActiveRoute } = useNavigation()
    
    const navigationClass = computed(() => {
      return props.isMobile 
        ? 'flex flex-col space-y-2' 
        : 'flex items-center space-x-8'
    })
    
    const linkClass = computed(() => {
      const baseClass = 'text-gray-700 hover:text-primary-600 focus:text-primary-600 transition-colors duration-200 cursor-pointer'
      return props.isMobile 
        ? `${baseClass} py-3 px-4 block border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-gray-50 touch-target`
        : `${baseClass} font-medium relative px-3 py-2 rounded-md hover:bg-primary-50 focus:bg-primary-50 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary-600 after:transition-all after:duration-200 hover:after:w-3/4`
    })
    
    const handleNavClick = (item) => {
      handleNavigation(item)
      
      if (props.isMobile) {
        emit('item-click')
      }
    }
    
    return {
      navigationClass,
      linkClass,
      handleNavClick,
      isActiveRoute
    }
  }
}
</script>