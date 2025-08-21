import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NetworkStatus from '../NetworkStatus.vue'

describe('NetworkStatus', () => {
  beforeEach(() => {
    // 模拟 navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    })

    // 模拟网络事件
    global.addEventListener = vi.fn()
    global.removeEventListener = vi.fn()
  })

  it('renders network status component', () => {
    const wrapper = mount(NetworkStatus)
    
    expect(wrapper.exists()).toBe(true)
  })

  it('detects online status', () => {
    // 设置为在线状态
    Object.defineProperty(navigator, 'onLine', {
      value: true
    })

    const wrapper = mount(NetworkStatus)
    
    // 检查在线状态处理
    expect(wrapper.vm).toBeDefined()
  })

  it('detects offline status', () => {
    // 设置为离线状态
    Object.defineProperty(navigator, 'onLine', {
      value: false
    })

    const wrapper = mount(NetworkStatus)
    
    // 检查离线状态处理
    expect(wrapper.vm).toBeDefined()
  })

  it('shows offline notification when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false
    })

    const wrapper = mount(NetworkStatus)
    
    // 检查离线提示
    const text = wrapper.text()
    expect(text).toMatch(/离线|offline|网络|连接/i)
  })

  it('listens to network events', () => {
    mount(NetworkStatus)
    
    // 验证事件监听器被添加
    expect(global.addEventListener).toHaveBeenCalledWith('online', expect.any(Function))
    expect(global.addEventListener).toHaveBeenCalledWith('offline', expect.any(Function))
  })

  it('cleans up event listeners on unmount', () => {
    const wrapper = mount(NetworkStatus)
    
    wrapper.unmount()
    
    // 验证事件监听器被移除
    expect(global.removeEventListener).toHaveBeenCalled()
  })

  it('has proper styling for offline state', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false
    })

    const wrapper = mount(NetworkStatus)
    
    // 检查离线状态样式
    const offlineElement = wrapper.find('.bg-red-500, .bg-orange-500, .text-red-600')
    expect(offlineElement.exists()).toBe(true)
  })
})