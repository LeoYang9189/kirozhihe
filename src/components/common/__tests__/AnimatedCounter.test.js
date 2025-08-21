import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AnimatedCounter from '../AnimatedCounter.vue'

describe('AnimatedCounter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with initial value of 0', () => {
    const wrapper = mount(AnimatedCounter, {
      props: {
        target: 100,
        duration: 1000
      }
    })
    
    expect(wrapper.text()).toContain('0')
  })

  it('accepts target and suffix props', () => {
    const wrapper = mount(AnimatedCounter, {
      props: {
        target: 150,
        suffix: '万吨',
        duration: 1000
      }
    })
    
    expect(wrapper.props('target')).toBe(150)
    expect(wrapper.props('suffix')).toBe('万吨')
  })

  it('displays suffix when provided', () => {
    const wrapper = mount(AnimatedCounter, {
      props: {
        target: 100,
        suffix: '%',
        duration: 1000
      }
    })
    
    expect(wrapper.text()).toContain('%')
  })

  it('has correct CSS classes for styling', () => {
    const wrapper = mount(AnimatedCounter, {
      props: {
        target: 100,
        duration: 1000
      }
    })
    
    const numberElement = wrapper.find('.text-3xl')
    expect(numberElement.exists()).toBe(true)
  })

  it('handles zero target value', () => {
    const wrapper = mount(AnimatedCounter, {
      props: {
        target: 0,
        duration: 1000
      }
    })
    
    expect(wrapper.text()).toContain('0')
  })

  it('handles decimal target values', () => {
    const wrapper = mount(AnimatedCounter, {
      props: {
        target: 99.5,
        suffix: '%',
        duration: 1000
      }
    })
    
    expect(wrapper.props('target')).toBe(99.5)
  })
})