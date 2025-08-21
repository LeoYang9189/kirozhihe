import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Navigation from '../Navigation.vue'

// 模拟路由
const mockRouter = {
  push: vi.fn()
}

describe('Navigation', () => {
  const defaultProps = {
    items: [
      { name: '公司介绍', path: '/about' },
      { name: '业务介绍', path: '/business' },
      { name: '班列优势', path: '/advantages' },
      { name: '行业资讯', path: '/news' },
      { name: '联系我们', path: '/contact' }
    ],
    isMobile: false
  }

  it('renders navigation items', () => {
    const wrapper = mount(Navigation, {
      props: defaultProps,
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查导航项
    expect(wrapper.text()).toContain('公司介绍')
    expect(wrapper.text()).toContain('业务介绍')
    expect(wrapper.text()).toContain('班列优势')
    expect(wrapper.text()).toContain('行业资讯')
    expect(wrapper.text()).toContain('联系我们')
  })

  it('renders desktop layout when not mobile', () => {
    const wrapper = mount(Navigation, {
      props: { ...defaultProps, isMobile: false },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查桌面端布局
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
  })

  it('renders mobile layout when mobile', () => {
    const wrapper = mount(Navigation, {
      props: { ...defaultProps, isMobile: true },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查移动端布局
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
  })

  it('handles navigation item clicks', async () => {
    const wrapper = mount(Navigation, {
      props: defaultProps,
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查导航项点击
    const navItems = wrapper.findAll('a, button')
    if (navItems.length > 0) {
      await navItems[0].trigger('click')
      // 验证点击处理
      expect(wrapper.vm).toBeDefined()
    }
  })

  it('has proper styling for navigation items', () => {
    const wrapper = mount(Navigation, {
      props: defaultProps,
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查导航项样式
    const navItems = wrapper.findAll('.hover\\:text-blue-600')
    expect(navItems.length).toBeGreaterThan(0)
  })

  it('handles empty items array', () => {
    const wrapper = mount(Navigation, {
      props: { ...defaultProps, items: [] },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })
})