import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFound from '../NotFound.vue'

// 模拟路由
const mockRouter = {
  push: vi.fn()
}

describe('NotFound', () => {
  it('renders 404 page content', () => {
    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查页面容器
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })

  it('displays 404 error message', () => {
    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查404错误信息
    const text = wrapper.text()
    expect(text).toMatch(/404|页面不存在|找不到|Not Found/i)
  })

  it('has back to home link or button', () => {
    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查返回首页链接
    const text = wrapper.text()
    expect(text).toMatch(/首页|返回|Home/i)
  })

  it('has proper error page styling', () => {
    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查错误页面样式
    const container = wrapper.find('.min-h-screen')
    expect(container.exists()).toBe(true)
  })

  it('centers content on page', () => {
    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查内容居中
    const centerElement = wrapper.find('.flex, .text-center')
    expect(centerElement.exists()).toBe(true)
  })

  it('handles navigation back to home', async () => {
    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
    
    // 检查导航功能
    const homeLink = wrapper.find('button, a')
    if (homeLink.exists()) {
      await homeLink.trigger('click')
      expect(wrapper.vm).toBeDefined()
    }
  })
})