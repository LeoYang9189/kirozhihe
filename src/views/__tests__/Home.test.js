import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'

describe('Home', () => {
  it('renders all main sections', () => {
    const wrapper = mount(Home, {
      global: {
        stubs: {
          HeroBanner: true,
          BusinessQuickNav: true,
          AdvantagesOverview: true,
          DataDashboard: true
        }
      }
    })
    
    // 检查是否包含所有主要组件
    expect(wrapper.findComponent({ name: 'HeroBanner' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'BusinessQuickNav' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AdvantagesOverview' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DataDashboard' }).exists()).toBe(true)
  })

  it('has proper page structure', () => {
    const wrapper = mount(Home, {
      global: {
        stubs: {
          HeroBanner: true,
          BusinessQuickNav: true,
          AdvantagesOverview: true,
          DataDashboard: true
        }
      }
    })
    
    // 检查页面结构
    const mainContainer = wrapper.find('main')
    expect(mainContainer.exists()).toBe(true)
  })

  it('renders without errors', () => {
    expect(() => {
      mount(Home, {
        global: {
          stubs: {
            HeroBanner: true,
            BusinessQuickNav: true,
            AdvantagesOverview: true,
            DataDashboard: true
          }
        }
      })
    }).not.toThrow()
  })
})