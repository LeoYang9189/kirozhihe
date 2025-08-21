import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import News from '../News.vue'

describe('News', () => {
  it('renders news page content', () => {
    const wrapper = mount(News)
    
    // 检查页面容器
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })

  it('displays page title', () => {
    const wrapper = mount(News)
    
    // 检查页面标题
    expect(wrapper.text()).toContain('行业资讯')
  })

  it('has news list structure', () => {
    const wrapper = mount(News)
    
    // 检查资讯列表结构
    const text = wrapper.text()
    expect(text).toMatch(/资讯|新闻|行业|物流/i)
  })

  it('has proper page structure', () => {
    const wrapper = mount(News)
    
    // 检查页面结构
    const sections = wrapper.findAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('has responsive layout', () => {
    const wrapper = mount(News)
    
    // 检查响应式布局
    const container = wrapper.find('.px-4')
    expect(container.exists()).toBe(true)
  })

  it('displays news content', () => {
    const wrapper = mount(News)
    
    // 检查资讯内容
    const text = wrapper.text()
    expect(text.length).toBeGreaterThan(0)
  })
})