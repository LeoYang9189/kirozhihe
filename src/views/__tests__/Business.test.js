import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Business from '../Business.vue'

describe('Business', () => {
  it('renders business page content', () => {
    const wrapper = mount(Business, {
      global: {
        stubs: {
          ServiceFlow: true,
          BusinessCard: true
        }
      }
    })
    
    // 检查页面容器
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })

  it('includes ServiceFlow component', () => {
    const wrapper = mount(Business, {
      global: {
        stubs: {
          ServiceFlow: true,
          BusinessCard: true
        }
      }
    })
    
    // 检查服务流程组件
    const serviceFlow = wrapper.findComponent({ name: 'ServiceFlow' })
    expect(serviceFlow.exists()).toBe(true)
  })

  it('includes BusinessCard components', () => {
    const wrapper = mount(Business, {
      global: {
        stubs: {
          ServiceFlow: true,
          BusinessCard: true
        }
      }
    })
    
    // 检查业务卡片组件
    const businessCards = wrapper.findAllComponents({ name: 'BusinessCard' })
    expect(businessCards.length).toBeGreaterThan(0)
  })

  it('displays business categories', () => {
    const wrapper = mount(Business, {
      global: {
        stubs: {
          ServiceFlow: true,
          BusinessCard: true
        }
      }
    })
    
    // 检查业务分类
    const text = wrapper.text()
    expect(text).toMatch(/核心业务|配套业务|铁路|海运|空运/i)
  })

  it('has proper page structure', () => {
    const wrapper = mount(Business, {
      global: {
        stubs: {
          ServiceFlow: true,
          BusinessCard: true
        }
      }
    })
    
    // 检查页面结构
    const sections = wrapper.findAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('has responsive layout', () => {
    const wrapper = mount(Business, {
      global: {
        stubs: {
          ServiceFlow: true,
          BusinessCard: true
        }
      }
    })
    
    // 检查响应式布局
    const container = wrapper.find('.px-4')
    expect(container.exists()).toBe(true)
  })
})