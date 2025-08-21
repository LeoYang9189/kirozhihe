<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container-responsive section-padding">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">行业资讯</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            关注物流行业最新动态，掌握"一带一路"沿线市场信息
          </p>
        </div>
      </div>
    </div>

    <div class="container-responsive section-padding">
      <!-- 分类筛选 -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2 justify-center">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === category.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- 资讯列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="bg-white rounded-xl shadow-medium overflow-hidden hover:shadow-strong transition-shadow duration-300"
        >
          <!-- 文章图片 -->
          <div class="aspect-video bg-gray-200 relative overflow-hidden">
            <img 
              v-if="article.image" 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover"
              loading="lazy"
            >
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- 分类标签 -->
            <div class="absolute top-3 left-3">
              <span class="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                {{ getCategoryName(article.category) }}
              </span>
            </div>
          </div>

          <!-- 文章内容 -->
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {{ article.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ article.summary }}
            </p>
            
            <!-- 文章元信息 -->
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ formatDate(article.publishDate) }}</span>
              <span>{{ article.readTime }}分钟阅读</span>
            </div>
          </div>
        </article>
      </div>

      <!-- 加载更多 -->
      <div class="text-center mt-12">
        <button 
          v-if="hasMore"
          @click="loadMore"
          :disabled="isLoading"
          class="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">加载中...</span>
          <span v-else>加载更多</span>
        </button>
        <p v-else class="text-gray-500">已显示全部资讯</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      activeCategory: 'all',
      isLoading: false,
      hasMore: true,
      categories: [
        { id: 'all', name: '全部' },
        { id: 'policy', name: '政策法规' },
        { id: 'market', name: '市场动态' },
        { id: 'technology', name: '技术创新' },
        { id: 'company', name: '企业动态' }
      ],
      articles: [
        {
          id: 1,
          title: '中欧班列运行质量持续提升，为"一带一路"建设注入新动力',
          summary: '2024年中欧班列累计开行量再创新高，运输货物品类不断丰富，服务质量显著提升，为沿线国家经贸合作提供了重要支撑。',
          category: 'market',
          publishDate: '2024-02-15',
          readTime: 3,
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop&crop=center'
        },
        {
          id: 2,
          title: '国际铁路运输新规发布，进一步规范跨境物流服务',
          summary: '交通运输部发布新的国际铁路运输管理办法，对跨境铁路运输的安全、效率和服务质量提出了更高要求。',
          category: 'policy',
          publishDate: '2024-02-10',
          readTime: 5,
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=450&fit=crop&crop=center'
        },
        {
          id: 3,
          title: '数字化技术助力物流行业转型升级',
          summary: '人工智能、物联网、区块链等新技术在物流行业的应用日益广泛，推动传统物流向智慧物流转型。',
          category: 'technology',
          publishDate: '2024-02-08',
          readTime: 4,
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop&crop=center'
        },
        {
          id: 4,
          title: '"一带一路"沿线国家贸易往来持续增长',
          summary: '最新数据显示，中国与"一带一路"沿线国家的贸易额持续增长，为国际物流行业带来新的发展机遇。',
          category: 'market',
          publishDate: '2024-02-05',
          readTime: 3,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&crop=center'
        },
        {
          id: 5,
          title: '绿色物流成为行业发展新趋势',
          summary: '随着环保意识的提升，绿色物流、低碳运输成为物流企业关注的重点，新能源运输工具应用加速。',
          category: 'technology',
          publishDate: '2024-02-01',
          readTime: 4,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&crop=center'
        },
        {
          id: 6,
          title: '智和明远荣获NOVCC优秀会员企业称号',
          summary: '凭借在国际铁路运输领域的专业服务和突出表现，智和明远获得中国对外承包工程商会颁发的优秀会员企业称号。',
          category: 'company',
          publishDate: '2024-01-28',
          readTime: 2,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&crop=center'
        }
      ]
    }
  },
  computed: {
    filteredArticles() {
      if (this.activeCategory === 'all') {
        return this.articles
      }
      return this.articles.filter(article => article.category === this.activeCategory)
    }
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      return category ? category.name : '其他'
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    async loadMore() {
      this.isLoading = true
      
      try {
        // 模拟加载更多数据
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 这里可以添加更多文章数据
        // 暂时设置为没有更多数据
        this.hasMore = false
      } catch (error) {
        console.error('加载失败:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>