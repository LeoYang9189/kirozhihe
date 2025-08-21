import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceFlow from '../ServiceFlow.vue'

describe('ServiceFlow', () => {
  it('renders service flow section', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查服务流程容器
    const container = wrapper.find('.py-12')
    expect(container.exists()).toBe(true)
  })

  it('displays section title', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查标题
    expect(wrapper.text()).toContain('服务流程')
  })

  it('displays all flow steps', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查流程步骤
    expect(wrapper.text()).toContain('询价')
    expect(wrapper.text()).toContain('订舱')
    expect(wrapper.text()).toContain('装箱')
    expect(wrapper.text()).toContain('报关')
    expect(wrapper.text()).toContain('班列发运')
    expect(wrapper.text()).toContain('境外清关')
    expect(wrapper.text()).toContain('尾程派送')
  })

  it('has proper responsive layout', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查响应式布局
    const flowContainer = wrapper.find('.grid')
    expect(flowContainer.exists()).toBe(true)
    expect(flowContainer.classes()).toContain('grid-cols-1')
    expect(flowContainer.classes()).toContain('md:grid-cols-7')
  })

  it('displays step numbers', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查步骤编号
    const stepNumbers = wrapper.findAll('.w-8.h-8')
    expect(stepNumbers.length).toBeGreaterThan(0)
  })

  it('has connecting arrows between steps', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查连接箭头
    const arrows = wrapper.findAll('.text-blue-500')
    expect(arrows.length).toBeGreaterThan(0)
  })

  it('has proper step styling', () => {
    const wrapper = mount(ServiceFlow)
    
    // 检查步骤样式
    const steps = wrapper.findAll('.text-center')
    expect(steps.length).toBeGreaterThan(0)
  })
})