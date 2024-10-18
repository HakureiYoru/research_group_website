let currentPage = 1;  // 当前页码
const itemsPerPage = 15;  // 每页显示的文章数
let totalPages = 1;  // 总页数
let allData = [];  // 存储所有的文章数据

// 读取 JSON 文件并动态生成发表条目，并分页显示
function loadPublications(page = 1, filteredData = null) {
    const data = filteredData || allData; // 如果有筛选后的数据，则使用筛选后的数据，否则使用全部数据

    const publicationsContainer = document.getElementById('publications');
    publicationsContainer.innerHTML = ''; // 清空容器内容

    // 计算总页数
    totalPages = Math.ceil(data.length / itemsPerPage);

    // 根据当前页码提取需要显示的数据
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach(publication => {
        // 创建新的卡片元素
        const card = document.createElement('div');
        card.classList.add('publication-card');
        card.setAttribute('data-year', publication.year);
        card.setAttribute('data-authors', JSON.stringify(publication.authors));  // 存储作者信息

        // 构建卡片的 HTML
        card.innerHTML = `
            <img src="${publication.image}" alt="Publication Image">
            <div class="publication-info">
                <h3><a href="${publication.link}" target="_blank">${publication.title}</a></h3>
                <p class="authors">${publication.authors.join(', ')}</p>  <!-- 显示作者 -->
                <p>${publication.description}</p>
            </div>
        `;

        // 将卡片添加到容器中
        publicationsContainer.appendChild(card);
    });

    // 生成分页按钮
    generatePagination(filteredData);
}

// 生成分页按钮
function generatePagination(filteredData = null) {
    const data = filteredData || allData;
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // 清空现有分页内容

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) {
            pageButton.classList.add('active');  // 当前页高亮
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            loadPublications(currentPage, data);  // 加载选中的页码
        });
        paginationContainer.appendChild(pageButton);
    }
}

// 筛选功能
function filterPublications() {
    const yearFilter = document.getElementById('yearFilter').value;
    const authorFilter = document.getElementById('authorFilter').value;

    // 根据筛选条件过滤数据
    const filteredData = allData.filter(publication => {
        const publicationYear = publication.year;
        const publicationAuthors = publication.authors;

        let matchesYear = yearFilter === 'all' || publicationYear === yearFilter;
        let matchesAuthor = authorFilter === 'all' || publicationAuthors.includes(authorFilter);

        return matchesYear && matchesAuthor;
    });

    // 筛选后重新分页显示
    currentPage = 1;  // 重置到第一页
    loadPublications(1, filteredData);  // 使用筛选后的数据进行分页显示
}

// 生成筛选器选项
function generateFilters() {
    const years = new Set();
    const authors = new Set();

    // 遍历所有文章提取年份和作者
    allData.forEach(publication => {
        years.add(publication.year);
        publication.authors.forEach(author => authors.add(author.trim())); // 遍历每个作者
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

// 页面加载时加载所有数据
window.onload = function() {
    fetch('publications.json')
        .then(response => response.json())
        .then(data => {
            allData = data; // 保存所有数据
            generateFilters(); // 生成筛选项
            loadPublications(1); // 默认加载第一页
        })
        .catch(error => console.error('Error loading publications:', error));
};
