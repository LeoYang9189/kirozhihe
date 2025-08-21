import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { useIntersectionObserver } from '../useIntersectionObserver.js'

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver
  let mockObserve
  let mockUnobserve
  let mockDisconnect

  beforeEach(() => {
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()
    mockDisconnect = vi.fn()

    mockIntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      callback
    }))

    global.IntersectionObserver = mockIntersectionObserver
  })

  it('returns isIntersecting ref', () => {
    const target = ref(null)
    const { isIntersecting } = useIntersectionObserver(target)
    
    expect(isIntersecting.value).toBe(false)
  })

  it('creates IntersectionObserver with default options', () => {
    const target = ref(null)
    useIntersectionObserver(target)
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 }
    )
  })

  it('creates IntersectionObserver with custom options', () => {
    const target = ref(null)
    const options = { threshold: 0.5, rootMargin: '10px' }
    
    useIntersectionObserver(target, options)
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      options
    )
  })

  it('observes target element when provided', () => {
    const mockElement = document.createElement('div')
    const target = ref(mockElement)
    
    useIntersectionObserver(target)
    
    expect(mockObserve).toHaveBeenCalledWith(mockElement)
  })

  it('does not observe when target is null', () => {
    const target = ref(null)
    
    useIntersectionObserver(target)
    
    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('handles callback function parameter', () => {
    const target = ref(null)
    const callback = vi.fn()
    
    useIntersectionObserver(target, {}, callback)
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 }
    )
  })

  it('disconnects observer on unmount', () => {
    const target = ref(document.createElement('div'))
    const { stop } = useIntersectionObserver(target)
    
    stop()
    
    expect(mockDisconnect).toHaveBeenCalled()
  })
})