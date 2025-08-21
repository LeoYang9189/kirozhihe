import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroBanner from '../HeroBanner.vue'

describe('HeroBanner', () => {
  it('renders company logo section', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查是否有LOGO容器
    const logoSection = wrapper.find('.text-center')
    expect(logoSection.exists()).toBe(true)
  })

  it('displays company slogans', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查品牌标语
    expect(wrapper.text()).toContain('志同道合｜明智致远')
    expect(wrapper.text()).toContain('智和明远｜轨道链接')
    expect(wrapper.text()).toContain('一带一路钢铁驼队，门到门跨境物流专家')
  })

  it('has QR code section', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查二维码相关文本
    expect(wrapper.text()).toContain('扫码关注公众号')
  })

  it('has proper responsive layout classes', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查响应式容器
    const container = wrapper.find('.min-h-screen')
    expect(container.exists()).toBe(true)
    
    // 检查网格布局
    const gridContainer = wrapper.find('.grid')
    expect(gridContainer.exists()).toBe(true)
  })

  it('has correct background styling', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查背景渐变
    const bgElement = wrapper.find('.bg-gradient-to-br')
    expect(bgElement.exists()).toBe(true)
  })

  it('displays main heading with correct styling', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查主标题
    const mainHeading = wrapper.find('h1')
    expect(mainHeading.exists()).toBe(true)
    expect(mainHeading.classes()).toContain('text-4xl')
    expect(mainHeading.classes()).toContain('font-bold')
  })

  it('displays subtitle with correct styling', () => {
    const wrapper = mount(HeroBanner)
    
    // 检查副标题
    const subtitle = wrapper.find('h2')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.classes()).toContain('text-xl')
  })
})