/**
 * 网站配置文件
 * 统一管理网站的全局配置信息
 */

const SITE_CONFIG = {
    // 网站基本信息
    siteName: '西浦微系统课题组',
    siteNameEn: 'XJTLU Microsystems Research Group',
    
    // 联系信息
    contact: {
        email: 'Pengfei.Song@xjtlu.edu.cn',
        phone: '',
        address: '苏州工业园区仁爱路111号'
    },
    
    // 导航菜单配置
    navigation: [
        { name: '首页', nameEn: 'Home', href: 'index.html', page: 'index' },
        { name: '新闻', nameEn: 'News', href: 'news.html', page: 'news' },
        { name: '发表', nameEn: 'Publications', href: 'research.html', page: 'research' },
        { name: '团队成员', nameEn: 'Team', href: 'people.html', page: 'people' }
    ],
    
    // 首页轮播配置
    carousel: {
        autoPlayInterval: 30000, // 自动轮播间隔(毫秒)
        transitionDuration: 1000, // 过渡动画时长(毫秒)
    },
    
    // 分页配置
    pagination: {
        itemsPerPage: 15, // 每页显示条目数
        maxVisiblePages: 5 // 最多显示页码数
    },
    
    // 社交媒体链接（可选）
    social: {
        github: '',
        linkedin: '',
        researchgate: '',
        googleScholar: ''
    },
    
    // 版权信息
    copyright: '2024 西浦微系统课题组',
    
    // 数据文件路径
    dataFiles: {
        news: 'news.json',
        publications: 'publications.json'
    }
};

// 冻结配置对象，防止被修改
Object.freeze(SITE_CONFIG);

