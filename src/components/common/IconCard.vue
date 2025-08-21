<template>
  <div 
    class="icon-card group"
    :class="[
      cardClasses,
      { 'cursor-pointer': clickable }
    ]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 图标区域 -->
    <div class="icon-container" :class="iconContainerClasses">
      <!-- 支持字符串图标名称 -->
      <component 
        v-if="typeof icon === 'string'" 
        :is="getIconComponent(icon)"
        :class="iconClasses"
      />
      <!-- 支持直接传入图标组件 -->
      <component 
        v-else-if="icon" 
        :is="icon"
        :class="iconClasses"
      />
      <!-- 支持图片图标 -->
      <img 
        v-else-if="iconSrc"
        :src="iconSrc"
        :alt="title"
        :class="iconClasses"
      />
    </div>

    <!-- 内容区域 -->
    <div class="content-container" :class="contentClasses">
      <!-- 标题 -->
      <h3 
        v-if="title"
        class="card-title"
        :class="titleClasses"
      >
        {{ title }}
      </h3>

      <!-- 描述 -->
      <p 
        v-if="description"
        class="card-description"
        :class="descriptionClasses"
      >
        {{ description }}
      </p>

      <!-- 额外内容插槽 -->
      <div v-if="$slots.content" class="card-extra-content">
        <slot name="content"></slot>
      </div>

      <!-- 操作按钮区域 -->
      <div v-if="$slots.actions" class="card-actions mt-4">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 导入常用图标组件（这里使用 Heroicons 作为示例）
import {
  TruckIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'IconCard',
  components: {
    TruckIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    ClipboardDocumentListIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    ChartBarIcon,
    CogIcon
  },
  props: {
    // 图标相关
    icon: {
      type: [String, Object],
      default: null
    },
    iconSrc: {
      type: String,
      default: null
    },
    
    // 内容
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    
    // 样式变体
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'business', 'advantage', 'compact'].includes(value)
    },
    
    // 尺寸
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    
    // 交互
    clickable: {
      type: Boolean,
      default: false
    },
    
    // 自定义样式类
    customClasses: {
      type: String,
      default: ''
    }
  },
  
  emits: ['click', 'mouseenter', 'mouseleave'],
  
  computed: {
    cardClasses() {
      const baseClasses = [
        'flex flex-col items-center text-center',
        'transition-all duration-300 ease-in-out',
        'border border-gray-200 rounded-lg',
        'hover:shadow-lg hover:border-primary-300'
      ]
      
      const variantClasses = {
        default: 'bg-white p-6',
        business: 'bg-gradient-to-br from-white to-gray-50 p-8 hover:from-primary-50 hover:to-primary-100',
        advantage: 'bg-white p-6 hover:bg-primary-50',
        compact: 'bg-white p-4'
      }
      
      const sizeClasses = {
        small: 'min-h-[200px]',
        medium: 'min-h-[250px]',
        large: 'min-h-[300px]'
      }
      
      return [
        ...baseClasses,
        variantClasses[this.variant],
        sizeClasses[this.size],
        this.customClasses
      ]
    },
    
    iconContainerClasses() {
      const sizeClasses = {
        small: 'w-12 h-12 mb-3',
        medium: 'w-16 h-16 mb-4',
        large: 'w-20 h-20 mb-6'
      }
      
      return [
        'flex items-center justify-center',
        'rounded-full bg-primary-100',
        'group-hover:bg-primary-200 transition-colors duration-300',
        sizeClasses[this.size]
      ]
    },
    
    iconClasses() {
      const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-8 h-8',
        large: 'w-10 h-10'
      }
      
      return [
        'text-primary-600 group-hover:text-primary-700',
        'transition-colors duration-300',
        sizeClasses[this.size]
      ]
    },
    
    contentClasses() {
      return 'flex-1 flex flex-col justify-center'
    },
    
    titleClasses() {
      const sizeClasses = {
        small: 'text-lg',
        medium: 'text-xl',
        large: 'text-2xl'
      }
      
      return [
        'font-semibold text-gray-900 mb-2',
        'group-hover:text-primary-700 transition-colors duration-300',
        sizeClasses[this.size]
      ]
    },
    
    descriptionClasses() {
      const sizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
      }
      
      return [
        'text-gray-600 leading-relaxed',
        'group-hover:text-gray-700 transition-colors duration-300',
        sizeClasses[this.size]
      ]
    }
  },
  
  methods: {
    getIconComponent(iconName) {
      const iconMap = {
        'truck': 'TruckIcon',
        'globe': 'GlobeAltIcon',
        'shield': 'ShieldCheckIcon',
        'document': 'ClipboardDocumentListIcon',
        'building': 'BuildingOfficeIcon',
        'users': 'UserGroupIcon',
        'chart': 'ChartBarIcon',
        'cog': 'CogIcon'
      }
      
      return iconMap[iconName] || 'CogIcon'
    },
    
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    },
    
    handleMouseEnter(event) {
      this.$emit('mouseenter', event)
    },
    
    handleMouseLeave(event) {
      this.$emit('mouseleave', event)
    }
  }
}
</script>

<style scoped>
.icon-card {
  /* 确保卡片在不同屏幕尺寸下的响应式表现 */
  @apply w-full max-w-sm mx-auto;
}

/* 悬停时的微妙动画效果 */
.icon-card:hover {
  transform: translateY(-2px);
}

/* 点击时的反馈效果 */
.icon-card.cursor-pointer:active {
  transform: translateY(0);
}

/* 内容区域的平滑过渡 */
.content-container {
  transition: all 0.3s ease-in-out;
}

/* 确保长文本的良好显示 */
.card-description {
  word-wrap: break-word;
  hyphens: auto;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .icon-card {
    @apply max-w-none;
  }
}
</style>