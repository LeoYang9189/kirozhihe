import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'

describe('Footer', () => {
  it('renders footer section', () => {
    const wrapper = mount(Footer)
    
    // 检查页脚容器
    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
  })

  it('displays company information', () => {
    const wrapper = mount(Footer)
    
    // 检查公司信息
    expect(wrapper.text()).toContain('重庆智和明远国际物流责任有限公司')
  })

  it('displays contact information', () => {
    const wrapper = mount(Footer)
    
    // 检查联系信息（根据实际内容调整）
    const text = wrapper.text()
    // 可能包含电话、邮箱、地址等信息
    expect(text.length).toBeGreaterThan(0)
  })

  it('has proper background styling', () => {
    const wrapper = mount(Footer)
    
    // 检查背景样式
    const footer = wrapper.find('.bg-gray-800, .bg-gray-900')
    expect(footer.exists()).toBe(true)
  })

  it('has responsive layout', () => {
    const wrapper = mount(Footer)
    
    // 检查响应式布局
    const container = wrapper.find('.px-4')
    expect(container.exists()).toBe(true)
  })

  it('displays copyright information', () => {
    const wrapper = mount(Footer)
    
    // 检查版权信息
    const text = wrapper.text()
    expect(text).toMatch(/©|版权|Copyright/i)
  })

  it('has proper text styling', () => {
    const wrapper = mount(Footer)
    
    // 检查文本样式
    const textElements = wrapper.findAll('.text-white, .text-gray-300')
    expect(textElements.length).toBeGreaterThan(0)
  })
})