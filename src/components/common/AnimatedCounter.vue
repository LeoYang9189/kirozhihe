<template>
  <span ref="counter" class="animated-counter">{{ displayValue }}{{ suffix }}</span>
</template>

<script>
export default {
  name: 'AnimatedCounter',
  props: {
    target: {
      type: Number,
      required: true
    },
    suffix: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 2000
    },
    delay: {
      type: Number,
      default: 0
    },
    decimals: {
      type: Number,
      default: 0
    },
    // 是否在进入视窗时触发动画
    triggerOnVisible: {
      type: Boolean,
      default: true
    },
    // 视窗触发的阈值
    threshold: {
      type: Number,
      default: 0.3
    }
  },
  data() {
    return {
      displayValue: 0,
      animationId: null,
      observer: null,
      hasAnimated: false
    }
  },
  mounted() {
    if (this.triggerOnVisible) {
      this.setupIntersectionObserver()
    } else {
      // 如果不需要视窗触发，直接启动动画
      setTimeout(() => {
        this.startAnimation()
      }, this.delay)
    }
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true
              setTimeout(() => {
                this.startAnimation()
              }, this.delay)
            }
          })
        },
        {
          threshold: this.threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      if (this.$refs.counter) {
        this.observer.observe(this.$refs.counter)
      }
    },

    startAnimation() {
      const startTime = Date.now()
      const startValue = 0
      const endValue = this.target
      const duration = this.duration

      const animate = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用缓动函数 (easeOutCubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        const currentValue = startValue + (endValue - startValue) * easeProgress
        
        // 根据小数位数格式化显示值
        if (this.decimals > 0) {
          this.displayValue = parseFloat(currentValue.toFixed(this.decimals))
        } else {
          this.displayValue = Math.floor(currentValue)
        }

        if (progress < 1) {
          this.animationId = requestAnimationFrame(animate)
        } else {
          // 确保最终值准确
          this.displayValue = this.decimals > 0 ? 
            parseFloat(this.target.toFixed(this.decimals)) : 
            this.target
        }
      }

      this.animationId = requestAnimationFrame(animate)
    },

    // 手动触发动画的方法
    triggerAnimation() {
      if (!this.hasAnimated) {
        this.hasAnimated = true
        this.startAnimation()
      }
    },

    // 重置动画状态
    resetAnimation() {
      this.hasAnimated = false
      this.displayValue = 0
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
    }
  }
}
</script>

<style scoped>
.animated-counter {
  font-variant-numeric: tabular-nums;
  display: inline-block;
  min-width: 1ch;
}
</style>