// 业务信息数据配置

// 核心业务快速导航数据
export const coreBusinesses = [
  {
    id: 'railway-transport',
    name: '国际铁路运输',
    icon: 'train',
    description: '一带一路沿线铁路运输服务',
    path: '/business#railway'
  },
  {
    id: 'container-rental',
    name: '集装箱租赁买卖',
    icon: 'cube',
    description: '专业集装箱租赁和买卖服务',
    path: '/business#container'
  },
  {
    id: 'cross-border-truck',
    name: '跨境卡航',
    icon: 'truck',
    description: '跨境公路运输解决方案',
    path: '/business#truck'
  },
  {
    id: 'multimodal-transport',
    name: '多式联运',
    icon: 'globe',
    description: '海陆空多式联运综合服务',
    path: '/business#multimodal'
  }
]

// 服务流程数据
export const serviceFlow = [
  { 
    step: 1, 
    name: '询价', 
    description: '客户咨询报价，提供货物信息' 
  },
  { 
    step: 2, 
    name: '订舱', 
    description: '确认舱位预订，签署运输合同' 
  },
  { 
    step: 3, 
    name: '装箱', 
    description: '货物装箱，完成装箱单据' 
  },
  { 
    step: 4, 
    name: '报关', 
    description: '出口报关，办理相关手续' 
  },
  { 
    step: 5, 
    name: '班列发运', 
    description: '货物装载班列，开始运输' 
  },
  { 
    step: 6, 
    name: '境外清关', 
    description: '目的地清关，办理进口手续' 
  },
  { 
    step: 7, 
    name: '尾程派送', 
    description: '最后一公里配送到客户指定地点' 
  }
]

// 业务详细信息
export const businessDetails = {
  railwayFull: {
    name: '铁路整箱',
    category: '核心业务',
    content: '提供"一带一路"沿线主要站点的整箱运输代理服务，包括中欧班列、中亚班列等线路。',
    advantages: [
      '舱位稳定性强，运输时效有保障',
      '门到门全程服务方案',
      '专业的班列运营经验',
      '完善的境外清关网络'
    ],
    scenarios: [
      '大宗货物运输需求',
      '整箱运输需求客户',
      '对时效有要求的货物',
      '需要稳定舱位的客户'
    ],
    customerTypes: ['制造企业', '贸易公司', '电商平台']
  },
  railwayLCL: {
    name: '铁路拼箱',
    category: '核心业务',
    content: '为小批量货物提供拼箱服务，降低客户运输成本，提高运输效率。',
    advantages: [
      '降低小批量货物运输成本',
      '灵活的发货频次',
      '专业的货物配载服务',
      '安全的货物包装和运输'
    ],
    scenarios: [
      '小批量货物运输',
      '试单或样品运输',
      '成本敏感型客户',
      '不定期发货需求'
    ],
    customerTypes: ['中小企业', '个人贸易商', '电商卖家']
  },
  multimodal: {
    name: '海运空运多式联运',
    category: '配套业务',
    content: '整合海运、空运、铁路运输资源，为客户提供最优的运输解决方案。',
    advantages: [
      '多种运输方式灵活组合',
      '成本与时效的最佳平衡',
      '全球运输网络覆盖',
      '一站式物流服务'
    ],
    scenarios: [
      '全球贸易运输需求',
      '成本与时效平衡需求',
      '复杂运输路线',
      '大型项目物流'
    ],
    customerTypes: ['跨国企业', '大型贸易商', '项目货物客户']
  },
  crossBorderTruck: {
    name: '跨境卡航',
    category: '配套业务',
    content: '提供中国与周边国家的跨境公路运输服务，灵活快捷的运输解决方案。',
    advantages: [
      '门到门直达服务',
      '运输时效快速',
      '适合高价值货物',
      '灵活的运输安排'
    ],
    scenarios: [
      '紧急货物运输',
      '高价值小件货物',
      '边境贸易运输',
      '时效要求极高的货物'
    ],
    customerTypes: ['高端制造企业', '精密设备商', '紧急物资客户']
  },
  clearanceDelivery: {
    name: '境外清关派送',
    category: '配套业务',
    content: '在目的地国家提供专业的清关服务和最后一公里配送服务。',
    advantages: [
      '专业的清关团队',
      '熟悉各国海关政策',
      '完善的配送网络',
      '全程跟踪服务'
    ],
    scenarios: [
      '复杂清关手续',
      '特殊商品清关',
      '偏远地区配送',
      '需要专业清关服务'
    ],
    customerTypes: ['进出口企业', '跨境电商', '特殊商品贸易商']
  }
}