import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconCard from '../IconCard.vue'

describe('IconCard', () => {
  const defaultProps = {
    icon: 'certificate',
    title: '测试标题',
    description: '测试描述内容'
  }

  it('renders with all props correctly', () => {
    const wrapper = mount(IconCard, {
      props: defaultProps
    })
    
    expect(wrapper.text()).toContain('测试标题')
    expect(wrapper.text()).toContain('测试描述内容')
  })

  it('displays the correct icon', () => {
    const wrapper = mount(IconCard, {
      props: defaultProps
    })
    
    // 检查是否有图标容器
    const iconContainer = wrapper.find('.w-12.h-12')
    expect(iconContainer.exists()).toBe(true)
  })

  it('has proper structure and styling', () => {
    const wrapper = mount(IconCard, {
      props: defaultProps
    })
    
    // 检查卡片容器
    expect(wrapper.classes()).toContain('text-center')
    
    // 检查标题样式
    const title = wrapper.find('h3')
    expect(title.exists()).toBe(true)
    expect(title.classes()).toContain('text-lg')
    expect(title.classes()).toContain('font-semibold')
    
    // 检查描述样式
    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.classes()).toContain('text-gray-600')
  })

  it('handles empty description', () => {
    const wrapper = mount(IconCard, {
      props: {
        ...defaultProps,
        description: ''
      }
    })
    
    expect(wrapper.text()).toContain('测试标题')
    expect(wrapper.find('p').text()).toBe('')
  })

  it('handles different icon types', () => {
    const icons = ['certificate', 'globe', 'users']
    
    icons.forEach(icon => {
      const wrapper = mount(IconCard, {
        props: {
          ...defaultProps,
          icon
        }
      })
      
      expect(wrapper.props('icon')).toBe(icon)
    })
  })
})