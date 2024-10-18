document.addEventListener('DOMContentLoaded', function () {
    loadNews();
});

function loadNews() {
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            const timelineContainer = document.querySelector('.timeline');
            timelineContainer.innerHTML = ''; // 清空内容

            // 遍历每一年
            data.forEach(yearData => {
                // 创建每年的容器
                const yearContainer = document.createElement('div');
                yearContainer.classList.add('year-container');

                // 创建年份框
                const yearBox = document.createElement('div');
                yearBox.classList.add('year-box');
                yearBox.textContent = yearData.year;
                yearContainer.appendChild(yearBox);

                // 遍历每年的事件
                yearData.items.forEach(item => {
                    const timelineItem = document.createElement('div');
                    timelineItem.classList.add('timeline-item');

                    // 月份
                    const month = document.createElement('div');
                    month.classList.add('month');
                    month.textContent = item.month;
                    timelineItem.appendChild(month);

                    // 分类标签
                    const category = document.createElement('span');
                    category.classList.add('event-category', item.category);
                    category.textContent = item.title;
                    timelineItem.appendChild(category);

                    // 事件描述
                    const description = document.createElement('p');
                    description.textContent = item.description;
                    timelineItem.appendChild(description);

                    yearContainer.appendChild(timelineItem);
                });

                // 将年份容器添加到时间轴
                timelineContainer.appendChild(yearContainer);
            });
        })
        .catch(error => console.error('Error loading news:', error));
}
