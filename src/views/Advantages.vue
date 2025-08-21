<template>
  <div class="pt-16">
    <!-- 页面标题区域 -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">班列运输优势</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            智和明远凭借专业资质和丰富经验，为您提供高效、安全、经济的国际铁路运输服务
          </p>
        </div>
      </div>
    </div>

    <!-- 核心优势展示 -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">三大核心优势</h2>
        <p class="text-lg text-gray-600">专业资质 · 全球网络 · 丰富经验</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 mb-20">
        <div 
          v-for="advantage in advantages" 
          :key="advantage.id"
          class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="getIcon(advantage.icon)" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ advantage.title }}</h3>
            <p class="text-gray-600">{{ advantage.description }}</p>
          </div>
          <ul class="space-y-2">
            <li 
              v-for="detail in advantage.details" 
              :key="detail"
              class="flex items-start"
            >
              <CheckIcon class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700">{{ detail }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 班列运输对比优势 -->
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">班列运输 VS 传统运输</h2>
          <p class="text-lg text-gray-600">全方位对比分析，助您做出最佳选择</p>
        </div>

        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="grid md:grid-cols-4 gap-0">
              <!-- 对比项目标题 -->
              <div class="bg-blue-600 text-white p-6">
                <h3 class="text-lg font-bold">对比项目</h3>
              </div>
              <div class="bg-blue-500 text-white p-6 text-center">
                <h3 class="text-lg font-bold">中欧班列</h3>
              </div>
              <div class="bg-gray-600 text-white p-6 text-center">
                <h3 class="text-lg font-bold">海运</h3>
              </div>
              <div class="bg-gray-700 text-white p-6 text-center">
                <h3 class="text-lg font-bold">空运</h3>
              </div>

              <!-- 运输时效 -->
              <div class="bg-gray-50 p-6 font-semibold border-b">运输时效</div>
              <div class="p-6 text-center border-b bg-green-50">
                <span class="text-green-600 font-bold">15-20天</span>
              </div>
              <div class="p-6 text-center border-b">35-45天</div>
              <div class="p-6 text-center border-b">3-7天</div>

              <!-- 运输成本 -->
              <div class="bg-gray-50 p-6 font-semibold border-b">运输成本</div>
              <div class="p-6 text-center border-b bg-green-50">
                <span class="text-green-600 font-bold">中等</span>
              </div>
              <div class="p-6 text-center border-b">较低</div>
              <div class="p-6 text-center border-b">较高</div>

              <!-- 运输稳定性 -->
              <div class="bg-gray-50 p-6 font-semibold border-b">运输稳定性</div>
              <div class="p-6 text-center border-b bg-green-50">
                <span class="text-green-600 font-bold">很高</span>
              </div>
              <div class="p-6 text-center border-b">中等</div>
              <div class="p-6 text-center border-b">高</div>

              <!-- 环保程度 -->
              <div class="bg-gray-50 p-6 font-semibold border-b">环保程度</div>
              <div class="p-6 text-center border-b bg-green-50">
                <span class="text-green-600 font-bold">很高</span>
              </div>
              <div class="p-6 text-center border-b">高</div>
              <div class="p-6 text-center border-b">中等</div>

              <!-- 适用货物 -->
              <div class="bg-gray-50 p-6 font-semibold">适用货物</div>
              <div class="p-6 text-center bg-green-50">
                <span class="text-green-600 font-bold">通用性强</span>
              </div>
              <div class="p-6 text-center">大宗货物</div>
              <div class="p-6 text-center">高价值货物</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 班列线路优势 -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">班列线路优势</h2>
        <p class="text-lg text-gray-600">覆盖"一带一路"沿线主要节点，构建高效物流网络</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="route in railwayRoutes" 
          :key="route.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <MapPinIcon class="w-6 h-6 text-blue-600 mr-2" />
            <h3 class="text-lg font-bold text-gray-900">{{ route.name }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ route.description }}</p>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">运输时效:</span>
              <span class="font-semibold text-blue-600">{{ route.duration }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">发车频次:</span>
              <span class="font-semibold">{{ route.frequency }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">主要货物:</span>
              <span class="font-semibold">{{ route.mainCargo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务保障 -->
    <div class="bg-blue-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">服务保障体系</h2>
          <p class="text-lg text-gray-600">全程专业服务，确保货物安全准时到达</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="guarantee in serviceGuarantees" 
            :key="guarantee.id"
            class="text-center"
          >
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="getIcon(guarantee.icon)" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ guarantee.title }}</h3>
            <p class="text-gray-600">{{ guarantee.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 客户案例统计 -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">服务成果展示</h2>
        <p class="text-lg text-gray-600">用数据说话，用实力证明</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="stat in statistics" 
          :key="stat.label"
          class="text-center bg-white rounded-lg shadow-md p-8"
        >
          <div class="text-4xl font-bold text-blue-600 mb-2">
            {{ stat.value }}{{ stat.unit }}
          </div>
          <div class="text-lg font-semibold text-gray-900 mb-2">{{ stat.label }}</div>
          <div class="text-gray-600">{{ stat.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  CheckIcon, 
  MapPinIcon,
  ShieldCheckIcon,
  ClockIcon,
  TruckIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'
import { 
  ShieldCheckIcon as ShieldCheckSolidIcon,
  GlobeAltIcon,
  UsersIcon
} from '@heroicons/vue/24/solid'
import { advantages, statistics } from '@/data/companyData.js'

export default {
  name: 'Advantages',
  components: {
    CheckIcon,
    MapPinIcon,
    ShieldCheckIcon,
    ClockIcon,
    TruckIcon,
    PhoneIcon,
    ShieldCheckSolidIcon,
    GlobeAltIcon,
    UsersIcon
  },
  data() {
    return {
      advantages,
      statistics: [
        statistics.cargoVolume,
        statistics.countries,
        statistics.satisfaction,
        statistics.routes
      ],
      railwayRoutes: [
        {
          id: 'china-europe',
          name: '中欧班列',
          description: '连接中国与欧洲主要城市的铁路运输线路',
          duration: '15-18天',
          frequency: '每周3-5班',
          mainCargo: '机械设备、电子产品'
        },
        {
          id: 'china-central-asia',
          name: '中亚班列',
          description: '覆盖哈萨克斯坦、乌兹别克斯坦等中亚国家',
          duration: '8-12天',
          frequency: '每周2-3班',
          mainCargo: '纺织品、建材'
        },
        {
          id: 'china-russia',
          name: '中俄班列',
          description: '直达俄罗斯主要工业城市的快速通道',
          duration: '10-15天',
          frequency: '每周4-6班',
          mainCargo: '汽车配件、化工产品'
        },
        {
          id: 'china-mongolia',
          name: '中蒙班列',
          description: '服务蒙古国及过境运输的重要线路',
          duration: '5-8天',
          frequency: '每周1-2班',
          mainCargo: '矿产品、农产品'
        },
        {
          id: 'china-southeast-asia',
          name: '中南半岛班列',
          description: '连接东南亚国家的新兴运输通道',
          duration: '3-7天',
          frequency: '每周2-4班',
          mainCargo: '电子产品、日用品'
        },
        {
          id: 'china-middle-east',
          name: '中东班列',
          description: '通过中亚转运至中东地区的综合线路',
          duration: '20-25天',
          frequency: '每月2-3班',
          mainCargo: '机械设备、钢材'
        }
      ],
      serviceGuarantees: [
        {
          id: 'professional',
          icon: 'shield',
          title: '专业保障',
          description: 'NOVCC资质认证，专业团队全程服务'
        },
        {
          id: 'timely',
          icon: 'clock',
          title: '时效保障',
          description: '准点发车，全程跟踪，确保按时到达'
        },
        {
          id: 'safe',
          icon: 'truck',
          title: '安全保障',
          description: '专业包装，安全运输，货物保险全覆盖'
        },
        {
          id: 'service',
          icon: 'phone',
          title: '服务保障',
          description: '24小时客服支持，问题快速响应处理'
        }
      ]
    }
  },
  methods: {
    getIcon(iconName) {
      const iconMap = {
        certificate: 'ShieldCheckSolidIcon',
        globe: 'GlobeAltIcon',
        users: 'UsersIcon',
        shield: 'ShieldCheckIcon',
        clock: 'ClockIcon',
        truck: 'TruckIcon',
        phone: 'PhoneIcon'
      }
      return iconMap[iconName] || 'CheckIcon'
    }
  }
}
</script>