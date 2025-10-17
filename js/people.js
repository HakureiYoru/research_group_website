/**
 * 团队成员页面模块
 * 可扩展为动态加载团队成员数据
 */

class PeoplePage {
    constructor() {
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 添加图片加载错误处理
        this.handleImageErrors();
        
        // 添加卡片动画
        this.addCardAnimations();
    }

    /**
     * 处理图片加载错误
     */
    handleImageErrors() {
        const images = document.querySelectorAll('.mentor-card img, .student-card img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                // 使用默认头像
                this.src = 'assets/images/default-avatar.jpg';
                this.alt = '默认头像';
            });
        });
    }

    /**
     * 添加卡片动画
     */
    addCardAnimations() {
        const cards = document.querySelectorAll('.student-card, .mentor-card');
        
        // 创建观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // 观察每个卡片
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * 动态加载团队成员（可选功能）
     * 如果将来需要从JSON文件加载成员数据
     */
    async loadTeamMembers() {
        try {
            const data = await Utils.fetchJSON('people.json');
            
            if (data && data.students) {
                this.renderStudents(data.students);
            }
            
            if (data && data.mentor) {
                this.renderMentor(data.mentor);
            }
        } catch (error) {
            console.error('Error loading team members:', error);
        }
    }

    /**
     * 渲染学生网格
     * @param {Array} students - 学生数据数组
     */
    renderStudents(students) {
        const gridContainer = document.querySelector('.student-grid');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        students.forEach(student => {
            const card = this.createStudentCard(student);
            gridContainer.appendChild(card);
        });
    }

    /**
     * 创建学生卡片
     * @param {Object} student - 学生数据
     * @returns {Element} 学生卡片元素
     */
    createStudentCard(student) {
        const card = Utils.createElement('div', {
            className: 'student-card'
        });

        const img = Utils.createElement('img', {
            src: student.photo || 'assets/images/default-avatar.jpg',
            alt: student.name || 'Student'
        });

        const name = Utils.createElement('h3', {}, student.name || 'Unknown');
        
        const research = Utils.createElement('p', {}, 
            `研究方向：${student.research || 'N/A'}`);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(research);

        return card;
    }

    /**
     * 渲染导师信息
     * @param {Object} mentor - 导师数据
     */
    renderMentor(mentor) {
        // 可以在这里实现动态渲染导师信息的逻辑
        console.log('Rendering mentor:', mentor);
    }
}

// 初始化组件
document.addEventListener('DOMContentLoaded', () => {
    // 初始化公共组件
    Components.init('people');
    
    // 初始化团队成员页面
    window.peoplePage = new PeoplePage();
});

