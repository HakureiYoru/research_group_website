/**
 * 发表页面模块
 * 负责加载和渲染发表列表，支持筛选和分页
 */

class ResearchPage {
    constructor() {
        this.container = document.getElementById('publications');
        this.paginationContainer = document.getElementById('pagination');
        this.yearFilter = document.getElementById('yearFilter');
        this.authorFilter = document.getElementById('authorFilter');
        
        this.allData = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.itemsPerPage = SITE_CONFIG.pagination.itemsPerPage;
        this.totalPages = 1;
        
        this.init();
    }

    /**
     * 初始化
     */
    async init() {
        if (!this.container) {
            console.warn('ResearchPage: Publications container not found');
            return;
        }

        await this.loadPublications();
        this.bindEvents();
    }

    /**
     * 加载发表数据
     */
    async loadPublications() {
        try {
            // 显示加载状态
            this.container.appendChild(Components.createLoader());

            // 获取发表数据
            const data = await Utils.fetchJSON(SITE_CONFIG.dataFiles.publications);
            
            if (!data || data.length === 0) {
                this.container.innerHTML = '';
                this.container.appendChild(Components.createEmptyState('暂无发表记录'));
                return;
            }

            this.allData = data;
            this.filteredData = data;
            this.generateFilters();
            this.render();
        } catch (error) {
            console.error('Error loading publications:', error);
            this.container.innerHTML = '';
            this.container.appendChild(
                Components.createEmptyState('加载发表记录失败，请稍后重试')
            );
        }
    }

    /**
     * 生成筛选器选项
     */
    generateFilters() {
        if (!this.yearFilter || !this.authorFilter) return;

        const years = new Set();
        const authors = new Set();

        this.allData.forEach(publication => {
            years.add(publication.year);
            if (publication.authors) {
                publication.authors.forEach(author => authors.add(author.trim()));
            }
        });

        // 生成年份选项（按年份降序排列）
        const sortedYears = Array.from(years).sort((a, b) => b.localeCompare(a));
        sortedYears.forEach(year => {
            const option = Utils.createElement('option', {
                value: year
            }, year);
            this.yearFilter.appendChild(option);
        });

        // 生成作者选项（按字母顺序）
        const sortedAuthors = Array.from(authors).sort();
        sortedAuthors.forEach(author => {
            const option = Utils.createElement('option', {
                value: author
            }, author);
            this.authorFilter.appendChild(option);
        });
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        if (this.yearFilter) {
            this.yearFilter.addEventListener('change', () => this.filterPublications());
        }
        
        if (this.authorFilter) {
            this.authorFilter.addEventListener('change', () => this.filterPublications());
        }
    }

    /**
     * 筛选发表
     */
    filterPublications() {
        const yearValue = this.yearFilter?.value || 'all';
        const authorValue = this.authorFilter?.value || 'all';

        this.filteredData = this.allData.filter(publication => {
            const matchesYear = yearValue === 'all' || publication.year === yearValue;
            const matchesAuthor = authorValue === 'all' || 
                (publication.authors && publication.authors.includes(authorValue));
            
            return matchesYear && matchesAuthor;
        });

        this.currentPage = 1;
        this.render();
    }

    /**
     * 渲染发表列表
     */
    render() {
        this.container.innerHTML = '';
        
        if (this.filteredData.length === 0) {
            this.container.appendChild(
                Components.createEmptyState('没有符合条件的发表记录')
            );
            this.paginationContainer.innerHTML = '';
            return;
        }

        // 计算分页
        this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredData.length);
        const pageData = this.filteredData.slice(startIndex, endIndex);

        // 渲染当前页的发表
        pageData.forEach(publication => {
            const card = this.createPublicationCard(publication);
            this.container.appendChild(card);
        });

        // 渲染分页
        this.renderPagination();
    }

    /**
     * 创建发表卡片
     * @param {Object} publication - 发表数据
     * @returns {Element} 发表卡片元素
     */
    createPublicationCard(publication) {
        const card = Utils.createElement('div', {
            className: 'publication-card',
            'data-year': publication.year
        });

        // 图片
        const img = Utils.createElement('img', {
            src: publication.image || 'assets/images/default-publication.jpg',
            alt: 'Publication Image',
            onerror: function() {
                this.src = 'assets/images/default-publication.jpg';
            }
        });

        // 信息容器
        const info = Utils.createElement('div', {
            className: 'publication-info'
        });

        // 标题
        const title = Utils.createElement('h3');
        const titleLink = Utils.createElement('a', {
            href: publication.link || '#',
            target: '_blank',
            rel: 'noopener'
        }, publication.title || 'Untitled');
        title.appendChild(titleLink);

        // 作者
        const authors = Utils.createElement('p', {
            className: 'authors'
        }, (publication.authors || []).join(', '));

        // 描述
        const description = Utils.createElement('p', {}, 
            publication.description || '');

        // 年份标签
        const yearBadge = Utils.createElement('span', {
            className: 'year-badge'
        }, publication.year);

        info.appendChild(title);
        info.appendChild(authors);
        info.appendChild(description);
        info.appendChild(yearBadge);

        card.appendChild(img);
        card.appendChild(info);

        return card;
    }

    /**
     * 渲染分页
     */
    renderPagination() {
        if (!this.paginationContainer) return;
        
        this.paginationContainer.innerHTML = '';

        if (this.totalPages <= 1) return;

        // 上一页按钮
        if (this.currentPage > 1) {
            const prevBtn = Utils.createElement('button', {
                className: 'page-btn',
                onClick: () => this.goToPage(this.currentPage - 1)
            }, '上一页');
            this.paginationContainer.appendChild(prevBtn);
        }

        // 页码按钮
        const maxVisible = SITE_CONFIG.pagination.maxVisiblePages;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            const firstBtn = Utils.createElement('button', {
                className: 'page-btn',
                onClick: () => this.goToPage(1)
            }, '1');
            this.paginationContainer.appendChild(firstBtn);

            if (startPage > 2) {
                const ellipsis = Utils.createElement('span', {
                    className: 'pagination-ellipsis'
                }, '...');
                this.paginationContainer.appendChild(ellipsis);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = Utils.createElement('button', {
                className: i === this.currentPage ? 'page-btn active' : 'page-btn',
                onClick: () => this.goToPage(i)
            }, i.toString());
            this.paginationContainer.appendChild(pageBtn);
        }

        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                const ellipsis = Utils.createElement('span', {
                    className: 'pagination-ellipsis'
                }, '...');
                this.paginationContainer.appendChild(ellipsis);
            }

            const lastBtn = Utils.createElement('button', {
                className: 'page-btn',
                onClick: () => this.goToPage(this.totalPages)
            }, this.totalPages.toString());
            this.paginationContainer.appendChild(lastBtn);
        }

        // 下一页按钮
        if (this.currentPage < this.totalPages) {
            const nextBtn = Utils.createElement('button', {
                className: 'page-btn',
                onClick: () => this.goToPage(this.currentPage + 1)
            }, '下一页');
            this.paginationContainer.appendChild(nextBtn);
        }
    }

    /**
     * 跳转到指定页
     * @param {number} page - 页码
     */
    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        
        this.currentPage = page;
        this.render();
        
        // 滚动到顶部
        Utils.scrollTo(this.container, 100);
    }
}

// 初始化组件
document.addEventListener('DOMContentLoaded', () => {
    // 初始化公共组件
    Components.init('research');
    
    // 初始化发表页面
    if (document.getElementById('publications')) {
        window.researchPage = new ResearchPage();
    }
});
