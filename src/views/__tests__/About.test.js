import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../About.vue'

describe('About', () => {
  it('renders about page content', () => {
    const wrapper = mount(About)
    
    // 检查页面容器
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })

  it('displays company information', () => {
    const wrapper = mount(About)
    
    // 检查公司信息
    expect(wrapper.text()).toContain('重庆智和明远国际物流责任有限公司')
    expect(wrapper.text()).toContain('2022年')
  })

  it('displays company qualifications', () => {
    const wrapper = mount(About)
    
    // 检查资质信息
    expect(wrapper.text()).toContain('NOVCC资质')
  })

  it('displays team experience', () => {
    const wrapper = mount(About)
    
    // 检查团队经验
    expect(wrapper.text()).toContain('近10年国际铁路运输经验')
    expect(wrapper.text()).toContain('第一批中欧班列市场化人员')
  })

  it('has proper page structure', () => {
    const wrapper = mount(About)
    
    // 检查页面结构
    const sections = wrapper.findAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('has responsive layout', () => {
    const wrapper = mount(About)
    
    // 检查响应式布局
    const container = wrapper.find('.px-4')
    expect(container.exists()).toBe(true)
  })

  it('displays business scope information', () => {
    const wrapper = mount(About)
    
    // 检查业务范围信息
    const text = wrapper.text()
    expect(text).toMatch(/业务范围|客户群体|服务/i)
  })
})