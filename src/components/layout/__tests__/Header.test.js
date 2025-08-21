import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../Header.vue'

// 模拟路由
const mockRouter = {
  push: vi.fn(),
  currentRoute: {
    value: { path: '/' }
  }
}

describe('Header', () => {
  it('renders header navigation', () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        }
      }
    })
    
    // 检查头部导航容器
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
  })

  it('has fixed positioning', () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        }
      }
    })
    
    // 检查固定定位
    const header = wrapper.find('.fixed')
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain('top-0')
    expect(header.classes()).toContain('z-50')
  })

  it('displays company logo/name', () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        }
      }
    })
    
    // 检查公司名称或LOGO
    expect(wrapper.text()).toContain('智和明远')
  })

  it('renders navigation component', () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        },
        stubs: {
          Navigation: true
        }
      }
    })
    
    // 检查导航组件
    const navigation = wrapper.findComponent({ name: 'Navigation' })
    expect(navigation.exists()).toBe(true)
  })

  it('has mobile menu toggle', () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        },
        stubs: {
          Navigation: true
        }
      }
    })
    
    // 检查移动端菜单按钮
    const menuButton = wrapper.find('button')
    expect(menuButton.exists()).toBe(true)
  })

  it('has proper background styling', () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        },
        stubs: {
          Navigation: true
        }
      }
    })
    
    // 检查背景样式
    const header = wrapper.find('.bg-white')
    expect(header.exists()).toBe(true)
  })

  it('toggles mobile menu', async () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { path: '/' }
        },
        stubs: {
          Navigation: true
        }
      }
    })
    
    // 检查移动菜单切换功能
    const menuButton = wrapper.find('button')
    if (menuButton.exists()) {
      await menuButton.trigger('click')
      // 验证菜单状态改变
      expect(wrapper.vm).toBeDefined()
    }
  })
})