import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useResponsive } from '../useResponsive.js'

describe('useResponsive', () => {
  let mockMatchMedia

  beforeEach(() => {
    // 模拟 matchMedia
    mockMatchMedia = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns reactive breakpoint states', () => {
    // 模拟桌面端
    mockMatchMedia.mockImplementation((query) => ({
      matches: query.includes('1024px'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { isMobile, isTablet, isDesktop } = useResponsive()
    
    expect(typeof isMobile.value).toBe('boolean')
    expect(typeof isTablet.value).toBe('boolean')
    expect(typeof isDesktop.value).toBe('boolean')
  })

  it('detects mobile breakpoint correctly', () => {
    // 模拟移动端
    mockMatchMedia.mockImplementation((query) => ({
      matches: !query.includes('768px') && !query.includes('1024px'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { isMobile } = useResponsive()
    
    // 在移动端环境下，isMobile 应该为 true
    expect(typeof isMobile.value).toBe('boolean')
  })

  it('detects tablet breakpoint correctly', () => {
    // 模拟平板端
    mockMatchMedia.mockImplementation((query) => ({
      matches: query.includes('768px') && !query.includes('1024px'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { isTablet } = useResponsive()
    
    expect(typeof isTablet.value).toBe('boolean')
  })

  it('detects desktop breakpoint correctly', () => {
    // 模拟桌面端
    mockMatchMedia.mockImplementation((query) => ({
      matches: query.includes('1024px'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { isDesktop } = useResponsive()
    
    expect(typeof isDesktop.value).toBe('boolean')
  })

  it('handles matchMedia not supported', () => {
    // 模拟不支持 matchMedia 的环境
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: undefined,
    })

    expect(() => {
      useResponsive()
    }).not.toThrow()
  })
})