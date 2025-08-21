import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BusinessQuickNav from '../BusinessQuickNav.vue'

// 模拟路由
const mockRouter = {
  push: vi.fn()
}

describe('BusinessQuickNav', () => {
  it('renders business navigation cards', () => {
    const wrapper = mount(BusinessQuickNav, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查是否有业务卡片
    const cards = wrapper.findAll('.bg-white')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('displays core business items', () => {
    const wrapper = mount(BusinessQuickNav, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查核心业务文本
    expect(wrapper.text()).toContain('国际铁路运输')
    expect(wrapper.text()).toContain('集装箱租赁买卖')
    expect(wrapper.text()).toContain('跨境卡航')
    expect(wrapper.text()).toContain('多式联运')
  })

  it('has proper grid layout', () => {
    const wrapper = mount(BusinessQuickNav, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查网格布局
    const gridContainer = wrapper.find('.grid')
    expect(gridContainer.exists()).toBe(true)
    expect(gridContainer.classes()).toContain('grid-cols-1')
    expect(gridContainer.classes()).toContain('md:grid-cols-2')
    expect(gridContainer.classes()).toContain('lg:grid-cols-4')
  })

  it('has hover effects on cards', () => {
    const wrapper = mount(BusinessQuickNav, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查悬停效果类
    const cards = wrapper.findAll('.hover\\:shadow-lg')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('displays section title', () => {
    const wrapper = mount(BusinessQuickNav, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查标题
    expect(wrapper.text()).toContain('核心业务')
  })

  it('has clickable business cards', async () => {
    const wrapper = mount(BusinessQuickNav, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查卡片是否可点击
    const firstCard = wrapper.find('.cursor-pointer')
    expect(firstCard.exists()).toBe(true)
  })
})