/**
 * 公共组件管理器
 * 负责加载和渲染导航栏、页脚等公共组件
 */

const Components = {
    /**
     * 渲染导航栏
     * @param {string} currentPage - 当前页面标识
     */
    renderHeader: function(currentPage = '') {
        const header = document.querySelector('header');
        if (!header) return;

        const nav = SITE_CONFIG.navigation.map(item => {
            const activeClass = (currentPage === item.page) ? 'active' : '';
            return `<li><a href="${item.href}" class="${activeClass}">${item.name}</a></li>`;
        }).join('');

        header.innerHTML = `
            <nav>
                <h1>${SITE_CONFIG.siteName}</h1>
                <ul>${nav}</ul>
            </nav>
        `;
    },

    /**
     * 渲染页脚
     */
    renderFooter: function() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const email = SITE_CONFIG.contact.email;
        const copyright = SITE_CONFIG.copyright;

        footer.innerHTML = `
            <div class="footer-content">
                <p>&copy; ${copyright} | 联系我们：<a href="mailto:${email}">${email}</a></p>
                ${this.renderSocialLinks()}
            </div>
        `;
    },

    /**
     * 渲染社交媒体链接
     * @returns {string} 社交媒体链接HTML
     */
    renderSocialLinks: function() {
        const social = SITE_CONFIG.social;
        const links = [];

        if (social.github) {
            links.push(`<a href="${social.github}" target="_blank" rel="noopener" title="GitHub">
                <i class="icon-github"></i>
            </a>`);
        }
        if (social.linkedin) {
            links.push(`<a href="${social.linkedin}" target="_blank" rel="noopener" title="LinkedIn">
                <i class="icon-linkedin"></i>
            </a>`);
        }
        if (social.researchgate) {
            links.push(`<a href="${social.researchgate}" target="_blank" rel="noopener" title="ResearchGate">
                <i class="icon-researchgate"></i>
            </a>`);
        }
        if (social.googleScholar) {
            links.push(`<a href="${social.googleScholar}" target="_blank" rel="noopener" title="Google Scholar">
                <i class="icon-scholar"></i>
            </a>`);
        }

        return links.length > 0 
            ? `<div class="social-links">${links.join('')}</div>` 
            : '';
    },

    /**
     * 初始化所有公共组件
     * @param {string} currentPage - 当前页面标识
     */
    init: function(currentPage = '') {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.renderHeader(currentPage);
                this.renderFooter();
            });
        } else {
            this.renderHeader(currentPage);
            this.renderFooter();
        }
    },

    /**
     * 创建加载动画
     * @returns {Element} 加载动画元素
     */
    createLoader: function() {
        return Utils.createElement('div', {
            className: 'loader',
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px',
                fontSize: '1.2rem',
                color: '#666'
            }
        }, '加载中...');
    },

    /**
     * 创建空状态提示
     * @param {string} message - 提示信息
     * @returns {Element} 空状态元素
     */
    createEmptyState: function(message = '暂无数据') {
        return Utils.createElement('div', {
            className: 'empty-state',
            style: {
                textAlign: 'center',
                padding: '50px',
                color: '#999',
                fontSize: '1.1rem'
            }
        }, message);
    },

    /**
     * 创建面包屑导航
     * @param {Array} items - 面包屑项目 [{name: '首页', href: 'index.html'}]
     * @returns {Element} 面包屑元素
     */
    createBreadcrumb: function(items) {
        const breadcrumb = Utils.createElement('nav', {
            className: 'breadcrumb',
            'aria-label': 'breadcrumb'
        });

        const list = Utils.createElement('ol');
        items.forEach((item, index) => {
            const listItem = Utils.createElement('li');
            if (index === items.length - 1) {
                listItem.textContent = item.name;
                listItem.setAttribute('aria-current', 'page');
            } else {
                const link = Utils.createElement('a', {
                    href: item.href
                }, item.name);
                listItem.appendChild(link);
            }
            list.appendChild(listItem);
        });

        breadcrumb.appendChild(list);
        return breadcrumb;
    }
};

// 冻结Components对象
Object.freeze(Components);

