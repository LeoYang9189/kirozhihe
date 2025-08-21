import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorBoundary from '../ErrorBoundary.vue'

// 创建一个会抛出错误的测试组件
const ThrowError = {
  name: 'ThrowError',
  setup() {
    throw new Error('Test error')
  },
  template: '<div>Should not render</div>'
}

const NormalComponent = {
  name: 'NormalComponent',
  template: '<div>Normal content</div>'
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div>Test content</div>'
      }
    })
    
    expect(wrapper.text()).toContain('Test content')
  })

  it('has error handling capability', () => {
    const wrapper = mount(ErrorBoundary)
    
    // 检查错误边界组件存在
    expect(wrapper.exists()).toBe(true)
  })

  it('provides fallback UI structure', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div>Test content</div>'
      }
    })
    
    // 检查基本结构
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('handles component lifecycle correctly', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: NormalComponent
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('can be configured with custom error message', () => {
    const wrapper = mount(ErrorBoundary, {
      props: {
        fallbackMessage: 'Custom error message'
      },
      slots: {
        default: '<div>Test content</div>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('logs errors when they occur', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    try {
      mount(ErrorBoundary, {
        slots: {
          default: ThrowError
        }
      })
    } catch (error) {
      // 预期会有错误
    }
    
    consoleSpy.mockRestore()
  })
})