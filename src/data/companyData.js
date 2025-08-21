// 公司信息数据配置

// 公司基本信息
export const companyInfo = {
  name: '重庆智和明远国际物流责任有限公司',
  shortName: '智和明远',
  established: '2022年',
  qualifications: ['NOVCC资质'],
  slogans: [
    '志同道合｜明智致远 智和明远｜轨道链接',
    '一带一路钢铁驼队，门到门跨境物流专家'
  ],
  description: '智和明远成立于2022年，拥有NOVCC资质，专注于"一带一路"沿线国际物流服务。',
  background: '公司由近10年国际铁路运输经验的第一批中欧班列市场化人员创立，致力于为客户提供专业、高效的跨境物流解决方案。',
  businessScope: [
    '国际铁路运输代理',
    '集装箱租赁买卖',
    '跨境公路运输',
    '多式联运服务',
    '境外清关派送'
  ],
  customerGroups: [
    '制造企业',
    '贸易公司',
    '跨境电商',
    '物流企业',
    '项目货物客户'
  ],
  teamAdvantages: [
    '近10年国际铁路运输经验',
    '第一批中欧班列市场化运营人员',
    '深度了解"一带一路"沿线市场',
    '丰富的跨境物流操作经验',
    '专业的客户服务团队'
  ]
}

// 公司核心优势
export const advantages = [
  {
    id: 'qualification',
    icon: 'certificate',
    title: 'NOVCC合规资质',
    description: '拥有NOVCC专业资质认证，确保合规运营，为客户提供可靠保障',
    details: [
      '国家认可的专业资质',
      '严格的合规运营标准',
      '完善的风险控制体系',
      '专业的法务支持团队'
    ]
  },
  {
    id: 'network',
    icon: 'globe',
    title: '全球箱源网络',
    description: '建立了覆盖全球的集装箱资源网络，确保舱位供应稳定可靠',
    details: [
      '覆盖"一带一路"沿线主要节点',
      '与多家船公司建立合作关系',
      '灵活的箱源调配能力',
      '24小时全球服务网络'
    ]
  },
  {
    id: 'experience',
    icon: 'users',
    title: '全客户类型服务经验',
    description: '服务各类型客户，从大型企业到中小贸易商，积累了丰富的服务经验',
    details: [
      '服务大型制造企业',
      '支持中小贸易商发展',
      '专业的跨境电商物流',
      '定制化项目物流方案'
    ]
  }
]

// 数据统计信息
export const statistics = {
  cargoVolume: { 
    value: 150, 
    unit: '万吨', 
    label: '累计运输货量',
    description: '自成立以来累计运输各类货物总量'
  },
  countries: { 
    value: 25, 
    unit: '个', 
    label: '覆盖国家',
    description: '服务网络覆盖的国家和地区数量'
  },
  satisfaction: { 
    value: 99.5, 
    unit: '%', 
    label: '客户满意度',
    description: '客户服务满意度调查结果'
  },
  routes: {
    value: 15,
    unit: '条',
    label: '运营线路',
    description: '目前运营的国际物流线路数量'
  }
}

// 联系信息
export const contactInfo = {
  address: '重庆市渝北区',
  phone: '+86-023-XXXXXXXX',
  email: 'info@zhihe-mingyuan.com',
  website: 'www.zhihe-mingyuan.com',
  wechat: {
    qrCode: '/images/qr-code.png',
    description: '扫码关注智和明远公众号'
  },
  businessHours: '周一至周五 9:00-18:00',
  languages: ['中文', 'English', 'Русский']
}

// 公司资质和认证
export const certifications = [
  {
    name: 'NOVCC资质',
    description: '国际铁路运输代理资质',
    issuer: '中国对外承包工程商会',
    validUntil: '长期有效'
  },
  {
    name: '国际货运代理资质',
    description: '国际货物运输代理企业备案',
    issuer: '商务部',
    validUntil: '长期有效'
  }
]