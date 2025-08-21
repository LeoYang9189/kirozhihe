import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroBanner from '../components/home/HeroBanner.vue'
import BusinessQuickNav from '../components/home/BusinessQuickNav.vue'
import DataDashboard from '../components/home/DataDashboard.vue'

describe('Responsive Layout Tests', () => {
  let mockMatchMedia

  beforeEach(() => {
    mockMatchMedia = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  describe('Mobile Layout (< 768px)', () => {
    beforeEach(() => {
      // 模拟移动端
      mockMatchMedia.mockImplementation((query) => ({
        matches: !query.includes('768px') && !query.includes('1024px'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    })

    it('HeroBanner adapts to mobile layout', () => {
      const wrapper = mount(HeroBanner)
      
      // 检查移动端适配的类
      const container = wrapper.find('.min-h-screen')
      expect(container.exists()).toBe(true)
      
      // 检查网格布局在移动端的表现
      const gridContainer = wrapper.find('.grid')
      expect(gridContainer.exists()).toBe(true)
    })

    it('BusinessQuickNav uses single column on mobile', () => {
      const wrapper = mount(BusinessQuickNav, {
        global: {
          mocks: {
            $router: { push: vi.fn() }
          }
        }
      })
      
      // 检查移动端单列布局
      const grid = wrapper.find('.grid-cols-1')
      expect(grid.exists()).toBe(true)
    })

    it('DataDashboard stacks vertically on mobile', () => {
      const wrapper = mount(DataDashboard)
      
      // 检查移动端垂直堆叠
      const grid = wrapper.find('.grid-cols-1')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('Tablet Layout (768px - 1024px)', () => {
    beforeEach(() => {
      // 模拟平板端
      mockMatchMedia.mockImplementation((query) => ({
        matches: query.includes('768px') && !query.includes('1024px'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    })

    it('BusinessQuickNav uses two columns on tablet', () => {
      const wrapper = mount(BusinessQuickNav, {
        global: {
          mocks: {
            $router: { push: vi.fn() }
          }
        }
      })
      
      // 检查平板端双列布局
      const grid = wrapper.find('.md\\:grid-cols-2')
      expect(grid.exists()).toBe(true)
    })

    it('DataDashboard uses appropriate columns on tablet', () => {
      const wrapper = mount(DataDashboard)
      
      // 检查平板端布局
      const grid = wrapper.find('.md\\:grid-cols-3')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('Desktop Layout (>= 1024px)', () => {
    beforeEach(() => {
      // 模拟桌面端
      mockMatchMedia.mockImplementation((query) => ({
        matches: query.includes('1024px'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    })

    it('BusinessQuickNav uses four columns on desktop', () => {
      const wrapper = mount(BusinessQuickNav, {
        global: {
          mocks: {
            $router: { push: vi.fn() }
          }
        }
      })
      
      // 检查桌面端四列布局
      const grid = wrapper.find('.lg\\:grid-cols-4')
      expect(grid.exists()).toBe(true)
    })

    it('components have proper spacing on desktop', () => {
      const wrapper = mount(HeroBanner)
      
      // 检查桌面端间距
      const container = wrapper.find('.px-4')
      expect(container.exists()).toBe(true)
    })
  })

  describe('Cross-device Compatibility', () => {
    it('components render consistently across breakpoints', () => {
      const breakpoints = [
        { name: 'mobile', query: '(max-width: 767px)' },
        { name: 'tablet', query: '(min-width: 768px) and (max-width: 1023px)' },
        { name: 'desktop', query: '(min-width: 1024px)' }
      ]

      breakpoints.forEach(({ name, query }) => {
        mockMatchMedia.mockImplementation((q) => ({
          matches: q === query,
          media: q,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }))

        const wrapper = mount(HeroBanner)
        expect(wrapper.exists()).toBe(true)
        
        // 确保在所有断点下都能正常渲染
        expect(wrapper.find('.min-h-screen').exists()).toBe(true)
      })
    })

    it('text remains readable at all screen sizes', () => {
      const wrapper = mount(HeroBanner)
      
      // 检查文本大小类
      const heading = wrapper.find('h1')
      expect(heading.exists()).toBe(true)
      
      // 检查响应式文本类
      const responsiveText = wrapper.find('.text-4xl, .md\\:text-5xl, .lg\\:text-6xl')
      expect(responsiveText.exists()).toBe(true)
    })
  })
})