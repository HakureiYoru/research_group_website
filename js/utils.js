/**
 * 工具函数库
 * 包含项目中常用的工具函数
 */

const Utils = {
    /**
     * 安全地获取JSON数据
     * @param {string} url - JSON文件的URL
     * @returns {Promise} 返回Promise对象
     */
    fetchJSON: async function(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            this.showError(`无法加载数据: ${url}`);
            return null;
        }
    },

    /**
     * 显示错误信息
     * @param {string} message - 错误信息
     */
    showError: function(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: #f44336;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(errorDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            errorDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    },

    /**
     * 防抖函数
     * @param {Function} func - 需要防抖的函数
     * @param {number} wait - 等待时间(毫秒)
     * @returns {Function} 防抖后的函数
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 节流函数
     * @param {Function} func - 需要节流的函数
     * @param {number} limit - 时间间隔(毫秒)
     * @returns {Function} 节流后的函数
     */
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 格式化日期
     * @param {Date|string} date - 日期对象或字符串
     * @param {string} format - 格式化模板
     * @returns {string} 格式化后的日期字符串
     */
    formatDate: function(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    },

    /**
     * 平滑滚动到指定元素
     * @param {string|Element} target - 目标元素或选择器
     * @param {number} offset - 偏移量
     */
    scrollTo: function(target, offset = 0) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },

    /**
     * 创建DOM元素
     * @param {string} tag - 标签名
     * @param {Object} attrs - 属性对象
     * @param {string|Element|Array} children - 子元素
     * @returns {Element} 创建的DOM元素
     */
    createElement: function(tag, attrs = {}, children = null) {
        const element = document.createElement(tag);
        
        // 设置属性
        Object.keys(attrs).forEach(key => {
            if (key === 'className') {
                element.className = attrs[key];
            } else if (key === 'style' && typeof attrs[key] === 'object') {
                Object.assign(element.style, attrs[key]);
            } else if (key.startsWith('on') && typeof attrs[key] === 'function') {
                element.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
            } else {
                element.setAttribute(key, attrs[key]);
            }
        });
        
        // 添加子元素
        if (children) {
            if (typeof children === 'string') {
                element.textContent = children;
            } else if (Array.isArray(children)) {
                children.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else {
                        element.appendChild(child);
                    }
                });
            } else {
                element.appendChild(children);
            }
        }
        
        return element;
    },

    /**
     * 获取URL参数
     * @param {string} name - 参数名
     * @returns {string|null} 参数值
     */
    getQueryParam: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    /**
     * 设置当前页面的导航活动状态
     * @param {string} currentPage - 当前页面标识
     */
    setActiveNavigation: function(currentPage) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || href === `./${currentPage}`) {
                link.classList.add('active');
            }
        });
    },

    /**
     * 判断元素是否在视口中
     * @param {Element} element - 目标元素
     * @returns {boolean} 是否在视口中
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// 冻结Utils对象，防止被修改
Object.freeze(Utils);

