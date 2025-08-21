import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DataDashboard from '../DataDashboard.vue'

describe('DataDashboard', () => {
  it('renders statistics section', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查统计数据容器
    const statsContainer = wrapper.find('.grid')
    expect(statsContainer.exists()).toBe(true)
  })

  it('displays key statistics', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查统计数据标签
    expect(wrapper.text()).toContain('累计运输货量')
    expect(wrapper.text()).toContain('覆盖国家')
    expect(wrapper.text()).toContain('客户满意度')
  })

  it('has AnimatedCounter components', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查是否包含动画计数器组件
    const counters = wrapper.findAllComponents({ name: 'AnimatedCounter' })
    expect(counters.length).toBeGreaterThan(0)
  })

  it('has proper responsive grid layout', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查响应式网格
    const grid = wrapper.find('.grid')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-3')
  })

  it('displays section title', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查标题
    expect(wrapper.text()).toContain('数据看板')
  })

  it('has proper background styling', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查背景样式
    const bgElement = wrapper.find('.bg-gray-50')
    expect(bgElement.exists()).toBe(true)
  })

  it('has correct padding and spacing', () => {
    const wrapper = mount(DataDashboard)
    
    // 检查间距类
    const container = wrapper.find('.py-16')
    expect(container.exists()).toBe(true)
  })
})