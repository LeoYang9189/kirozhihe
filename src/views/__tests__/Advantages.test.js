import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Advantages from '../Advantages.vue'

describe('Advantages', () => {
  it('renders advantages page content', () => {
    const wrapper = mount(Advantages)
    
    // 检查页面容器
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })

  it('displays page title', () => {
    const wrapper = mount(Advantages)
    
    // 检查页面标题
    expect(wrapper.text()).toContain('班列优势')
  })

  it('displays railway advantages', () => {
    const wrapper = mount(Advantages)
    
    // 检查班列优势内容
    const text = wrapper.text()
    expect(text).toMatch(/班列|铁路|运输|优势/i)
  })

  it('has proper page structure', () => {
    const wrapper = mount(Advantages)
    
    // 检查页面结构
    const sections = wrapper.findAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('has responsive layout', () => {
    const wrapper = mount(Advantages)
    
    // 检查响应式布局
    const container = wrapper.find('.px-4')
    expect(container.exists()).toBe(true)
  })

  it('displays advantage comparisons', () => {
    const wrapper = mount(Advantages)
    
    // 检查优势对比内容
    const text = wrapper.text()
    expect(text.length).toBeGreaterThan(0)
  })
})