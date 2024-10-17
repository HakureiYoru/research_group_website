function filterPublications() {
    const yearFilter = document.getElementById('yearFilter').value;
    const authorFilter = document.getElementById('authorFilter').value;

    const publications = document.querySelectorAll('.publication-card');

    publications.forEach(card => {
        const publicationYear = card.getAttribute('data-year');
        const publicationAuthors = card.getAttribute('data-authors');

        let showCard = true;

        // 筛选年份
        if (yearFilter !== 'all' && publicationYear !== yearFilter) {
            showCard = false;
        }

        // 筛选作者：检查作者列表是否包含所选作者
        if (authorFilter !== 'all' && !publicationAuthors.includes(authorFilter)) {
            showCard = false;
        }

        // 根据条件显示或隐藏卡片
        card.style.display = showCard ? 'flex' : 'none';
    });
}


// 生成筛选器选项
function generateFilters() {
    const publications = document.querySelectorAll('.publication-card');

    const years = new Set();
    const authors = new Set();

    // 遍历所有 publication-card 提取年份和作者
    publications.forEach(card => {
        const year = card.getAttribute('data-year');
        const authorsList = card.getAttribute('data-authors').split(', ');

        years.add(year); // 添加年份
        authorsList.forEach(author => authors.add(author)); // 添加每个作者
    });

    // 生成年份筛选选项
    const yearFilter = document.getElementById('yearFilter');
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    // 生成作者筛选选项
    const authorFilter = document.getElementById('authorFilter');
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        authorFilter.appendChild(option);
    });
}

// 调用 generateFilters 在页面加载时生成筛选项
window.onload = function() {
    generateFilters();
};
