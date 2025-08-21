import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdvantagesOverview from '../AdvantagesOverview.vue'

describe('AdvantagesOverview', () => {
  it('renders advantages section', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查优势展示容器
    const container = wrapper.find('.py-16')
    expect(container.exists()).toBe(true)
  })

  it('displays section title', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查标题
    expect(wrapper.text()).toContain('优势速览')
  })

  it('displays three core advantages', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查三大核心优势
    expect(wrapper.text()).toContain('NOVCC合规资质')
    expect(wrapper.text()).toContain('全球箱源网络')
    expect(wrapper.text()).toContain('全客户类型服务经验')
  })

  it('has proper grid layout', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查网格布局
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-3')
  })

  it('renders IconCard components', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查是否包含IconCard组件
    const iconCards = wrapper.findAllComponents({ name: 'IconCard' })
    expect(iconCards.length).toBe(3)
  })

  it('has correct background styling', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查背景样式
    const container = wrapper.find('.bg-white')
    expect(container.exists()).toBe(true)
  })

  it('has proper spacing and padding', () => {
    const wrapper = mount(AdvantagesOverview)
    
    // 检查间距
    const container = wrapper.find('.py-16')
    expect(container.exists()).toBe(true)
    
    const innerContainer = wrapper.find('.px-4')
    expect(innerContainer.exists()).toBe(true)
  })
})