/**
 * 轮播组件
 * 负责首页轮播图的功能
 */

class Carousel {
    constructor(options = {}) {
        this.container = options.container || document.getElementById('hero-carousel');
        this.slides = this.container ? this.container.querySelectorAll('.carousel-slide') : [];
        this.currentSlide = 0;
        this.autoPlayInterval = options.autoPlayInterval || SITE_CONFIG.carousel.autoPlayInterval;
        this.autoSlideTimer = null;
        
        this.init();
    }

    /**
     * 初始化轮播
     */
    init() {
        if (!this.container || this.slides.length === 0) {
            console.warn('Carousel: No carousel container or slides found');
            return;
        }

        this.createIndicators();
        this.createControls();
        this.startAutoPlay();
        this.bindEvents();
    }

    /**
     * 创建指示器
     */
    createIndicators() {
        const indicatorsContainer = Utils.createElement('div', {
            className: 'carousel-indicators'
        });

        for (let i = 0; i < this.slides.length; i++) {
            const indicator = Utils.createElement('div', {
                className: i === 0 ? 'indicator active' : 'indicator',
                'data-index': i,
                onClick: () => this.goToSlide(i)
            });
            indicatorsContainer.appendChild(indicator);
        }

        this.container.appendChild(indicatorsContainer);
        this.indicators = indicatorsContainer.querySelectorAll('.indicator');
    }

    /**
     * 创建控制按钮
     */
    createControls() {
        const prevBtn = Utils.createElement('a', {
            className: 'carousel-control prev',
            innerHTML: '&#10094;',
            onClick: () => this.changeSlide(-1)
        });

        const nextBtn = Utils.createElement('a', {
            className: 'carousel-control next',
            innerHTML: '&#10095;',
            onClick: () => this.changeSlide(1)
        });

        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 鼠标悬停时暂停自动播放
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                this.changeSlide(1);
            }
        });

        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    /**
     * 处理滑动手势
     */
    handleSwipe(startX, endX) {
        const threshold = 50;
        if (startX - endX > threshold) {
            this.changeSlide(1);
        } else if (endX - startX > threshold) {
            this.changeSlide(-1);
        }
    }

    /**
     * 切换幻灯片
     * @param {number} n - 偏移量
     */
    changeSlide(n) {
        this.goToSlide((this.currentSlide + n + this.slides.length) % this.slides.length);
    }

    /**
     * 跳转到指定幻灯片
     * @param {number} index - 幻灯片索引
     */
    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators) {
            this.indicators[this.currentSlide].classList.remove('active');
        }

        // 设置新的活动幻灯片
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators) {
            this.indicators[this.currentSlide].classList.add('active');
        }

        // 重置自动播放定时器
        this.resetAutoPlay();
    }

    /**
     * 开始自动播放
     */
    startAutoPlay() {
        if (!this.autoSlideTimer && this.autoPlayInterval > 0) {
            this.autoSlideTimer = setInterval(() => {
                this.changeSlide(1);
            }, this.autoPlayInterval);
        }
    }

    /**
     * 停止自动播放
     */
    stopAutoPlay() {
        if (this.autoSlideTimer) {
            clearInterval(this.autoSlideTimer);
            this.autoSlideTimer = null;
        }
    }

    /**
     * 重置自动播放
     */
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    /**
     * 销毁轮播
     */
    destroy() {
        this.stopAutoPlay();
        // 可以在这里清理其他资源
    }
}

// 页面加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hero-carousel')) {
        window.carousel = new Carousel();
    }
});
