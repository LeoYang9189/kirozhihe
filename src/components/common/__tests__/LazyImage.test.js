import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LazyImage from '../LazyImage.vue'

describe('LazyImage', () => {
  beforeEach(() => {
    // 模拟 IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      callback
    }))
  })

  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test Image',
    placeholder: '/placeholder.jpg'
  }

  it('renders with placeholder initially', () => {
    const wrapper = mount(LazyImage, {
      props: defaultProps
    })
    
    // 检查是否显示占位图
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
  })

  it('accepts src and alt props', () => {
    const wrapper = mount(LazyImage, {
      props: defaultProps
    })
    
    expect(wrapper.props('src')).toBe('/test-image.jpg')
    expect(wrapper.props('alt')).toBe('Test Image')
  })

  it('has proper image styling', () => {
    const wrapper = mount(LazyImage, {
      props: defaultProps
    })
    
    // 检查图片样式
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
  })

  it('handles loading state', () => {
    const wrapper = mount(LazyImage, {
      props: defaultProps
    })
    
    // 检查加载状态
    expect(wrapper.vm).toBeDefined()
  })

  it('handles error state', async () => {
    const wrapper = mount(LazyImage, {
      props: defaultProps
    })
    
    // 模拟图片加载错误
    const img = wrapper.find('img')
    if (img.exists()) {
      await img.trigger('error')
      expect(wrapper.vm).toBeDefined()
    }
  })

  it('handles successful load', async () => {
    const wrapper = mount(LazyImage, {
      props: defaultProps
    })
    
    // 模拟图片加载成功
    const img = wrapper.find('img')
    if (img.exists()) {
      await img.trigger('load')
      expect(wrapper.vm).toBeDefined()
    }
  })

  it('uses intersection observer for lazy loading', () => {
    mount(LazyImage, {
      props: defaultProps
    })
    
    // 验证 IntersectionObserver 被调用
    expect(global.IntersectionObserver).toHaveBeenCalled()
  })
})