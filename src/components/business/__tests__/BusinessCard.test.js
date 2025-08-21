import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BusinessCard from '../BusinessCard.vue'

describe('BusinessCard', () => {
  const mockBusiness = {
    name: '铁路整箱',
    content: '提供"一带一路"沿线主要站点的整箱运输代理服务',
    advantages: ['舱位稳定性', '门到门方案'],
    scenarios: ['大宗货物', '整箱运输需求客户'],
    clientTypes: ['生产制造企业', '贸易公司']
  }

  it('renders business information correctly', () => {
    const wrapper = mount(BusinessCard, {
      props: {
        business: mockBusiness
      }
    })
    
    expect(wrapper.text()).toContain('铁路整箱')
    expect(wrapper.text()).toContain('提供"一带一路"沿线主要站点的整箱运输代理服务')
  })

  it('displays advantages list', () => {
    const wrapper = mount(BusinessCard, {
      props: {
        business: mockBusiness
      }
    })
    
    expect(wrapper.text()).toContain('舱位稳定性')
    expect(wrapper.text()).toContain('门到门方案')
  })

  it('displays applicable scenarios', () => {
    const wrapper = mount(BusinessCard, {
      props: {
        business: mockBusiness
      }
    })
    
    expect(wrapper.text()).toContain('大宗货物')
    expect(wrapper.text()).toContain('整箱运输需求客户')
  })

  it('displays client types when provided', () => {
    const wrapper = mount(BusinessCard, {
      props: {
        business: mockBusiness
      }
    })
    
    expect(wrapper.text()).toContain('生产制造企业')
    expect(wrapper.text()).toContain('贸易公司')
  })

  it('has proper card styling', () => {
    const wrapper = mount(BusinessCard, {
      props: {
        business: mockBusiness
      }
    })
    
    // 检查卡片样式
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('rounded-lg')
    expect(wrapper.classes()).toContain('shadow-md')
  })

  it('handles business without advantages', () => {
    const businessWithoutAdvantages = {
      ...mockBusiness,
      advantages: []
    }
    
    const wrapper = mount(BusinessCard, {
      props: {
        business: businessWithoutAdvantages
      }
    })
    
    expect(wrapper.text()).toContain('铁路整箱')
  })

  it('handles business without client types', () => {
    const businessWithoutClientTypes = {
      ...mockBusiness,
      clientTypes: undefined
    }
    
    const wrapper = mount(BusinessCard, {
      props: {
        business: businessWithoutClientTypes
      }
    })
    
    expect(wrapper.text()).toContain('铁路整箱')
  })
})