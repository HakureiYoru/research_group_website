/**
 * 新闻页面模块
 * 负责加载和渲染新闻时间轴
 */

class NewsPage {
    constructor() {
        this.container = document.querySelector('.timeline');
        this.newsData = [];
        this.init();
    }

    /**
     * 初始化
     */
    async init() {
        if (!this.container) {
            console.warn('NewsPage: Timeline container not found');
            return;
        }

        await this.loadNews();
    }

    /**
     * 加载新闻数据
     */
    async loadNews() {
        try {
            // 显示加载状态
            this.container.appendChild(Components.createLoader());

            // 获取新闻数据
            const data = await Utils.fetchJSON(SITE_CONFIG.dataFiles.news);
            
            if (!data || data.length === 0) {
                this.container.innerHTML = '';
                this.container.appendChild(Components.createEmptyState('暂无新闻'));
                return;
            }

            this.newsData = data;
            this.render();
        } catch (error) {
            console.error('Error loading news:', error);
            this.container.innerHTML = '';
            this.container.appendChild(
                Components.createEmptyState('加载新闻失败，请稍后重试')
            );
        }
    }

    /**
     * 渲染新闻时间轴
     */
    render() {
        this.container.innerHTML = '';

        this.newsData.forEach(yearData => {
            const yearContainer = this.createYearContainer(yearData);
            this.container.appendChild(yearContainer);
        });
    }

    /**
     * 创建年份容器
     * @param {Object} yearData - 年份数据
     * @returns {Element} 年份容器元素
     */
    createYearContainer(yearData) {
        const yearContainer = Utils.createElement('div', {
            className: 'year-container'
        });

        // 创建年份标题
        const yearBox = Utils.createElement('div', {
            className: 'year-box'
        }, yearData.year);

        yearContainer.appendChild(yearBox);

        // 创建该年的新闻条目
        yearData.items.forEach(item => {
            const timelineItem = this.createTimelineItem(item);
            yearContainer.appendChild(timelineItem);
        });

        return yearContainer;
    }

    /**
     * 创建时间轴条目
     * @param {Object} item - 新闻条目数据
     * @returns {Element} 时间轴条目元素
     */
    createTimelineItem(item) {
        const timelineItem = Utils.createElement('div', {
            className: 'timeline-item'
        });

        // 月份
        const month = Utils.createElement('div', {
            className: 'month'
        }, item.month);

        // 分类标签
        const category = Utils.createElement('span', {
            className: `event-category ${item.category}`
        }, item.title);

        // 描述
        const description = Utils.createElement('p', {}, item.description);

        timelineItem.appendChild(month);
        timelineItem.appendChild(category);
        timelineItem.appendChild(description);

        return timelineItem;
    }

    /**
     * 按类别筛选
     * @param {string} category - 类别
     */
    filterByCategory(category) {
        if (category === 'all') {
            this.render();
            return;
        }

        this.container.innerHTML = '';

        this.newsData.forEach(yearData => {
            const filteredItems = yearData.items.filter(item => item.category === category);
            
            if (filteredItems.length > 0) {
                const yearContainer = this.createYearContainer({
                    year: yearData.year,
                    items: filteredItems
                });
                this.container.appendChild(yearContainer);
            }
        });
    }
}

// 初始化组件
document.addEventListener('DOMContentLoaded', () => {
    // 初始化公共组件
    Components.init('news');
    
    // 初始化新闻页面
    if (document.querySelector('.timeline')) {
        window.newsPage = new NewsPage();
    }
});
