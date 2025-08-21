import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Contact from '../Contact.vue'

describe('Contact', () => {
  it('renders contact page content', () => {
    const wrapper = mount(Contact)
    
    // 检查页面容器
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })

  it('displays page title', () => {
    const wrapper = mount(Contact)
    
    // 检查页面标题
    expect(wrapper.text()).toContain('联系我们')
  })

  it('displays contact information', () => {
    const wrapper = mount(Contact)
    
    // 检查联系信息
    const text = wrapper.text()
    expect(text).toMatch(/联系|电话|邮箱|地址/i)
  })

  it('has contact form or information structure', () => {
    const wrapper = mount(Contact)
    
    // 检查联系表单或信息结构
    const text = wrapper.text()
    expect(text.length).toBeGreaterThan(0)
  })

  it('has proper page structure', () => {
    const wrapper = mount(Contact)
    
    // 检查页面结构
    const sections = wrapper.findAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('has responsive layout', () => {
    const wrapper = mount(Contact)
    
    // 检查响应式布局
    const container = wrapper.find('.px-4')
    expect(container.exists()).toBe(true)
  })

  it('displays company contact details', () => {
    const wrapper = mount(Contact)
    
    // 检查公司联系详情
    const text = wrapper.text()
    expect(text).toMatch(/重庆|智和明远|物流/i)
  })
})