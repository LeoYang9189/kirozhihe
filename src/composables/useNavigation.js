import { useRouter } from 'vue-router'
import { navigationItems } from '../data/navigationData.js'

export function useNavigation() {
  const router = useRouter()

  // 导航到指定路径，支持锚点
  const navigateTo = (path, anchor = null) => {
    if (anchor) {
      // 如果有锚点，先导航到页面再滚动到锚点
      router.push(path).then(() => {
        setTimeout(() => {
          scrollToAnchor(anchor)
        }, 100)
      })
    } else {
      router.push(path)
    }
  }

  // 平滑滚动到锚点
  const scrollToAnchor = (anchor) => {
    const element = document.querySelector(anchor)
    if (element) {
      const headerHeight = 80 // 固定头部高度
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // 处理导航项点击
  const handleNavigation = (navItem) => {
    if (navItem.anchor) {
      // 如果当前页面就是目标页面，直接滚动到锚点
      if (router.currentRoute.value.path === navItem.path) {
        scrollToAnchor(navItem.anchor)
      } else {
        // 否则先导航到页面再滚动
        navigateTo(navItem.path, navItem.anchor)
      }
    } else {
      // 普通页面导航
      router.push(navItem.path)
    }
  }

  // 检查当前路由是否匹配导航项
  const isActiveRoute = (navItem) => {
    const currentPath = router.currentRoute.value.path
    return currentPath === navItem.path
  }

  // 获取导航项
  const getNavigationItems = () => {
    return navigationItems
  }

  return {
    navigateTo,
    scrollToAnchor,
    handleNavigation,
    isActiveRoute,
    getNavigationItems
  }
}