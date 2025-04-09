// ---------------------------< ↓↓↓ 主函数和调用 ↓↓↓ >--------------------------------- //

// 异步函数用于读取外部 JSON 文件
fetch('../sources/github_stars.json')
    .then(response => response.json())
    .then(datas => {

        // 获取表格主体
        const tbody = document.getElementById('dataBody');

        // 遍历数据并创建行
        datas.forEach((item, index) => {
            const row = document.createElement('tr');

            // 创建序号单元格
            const indexCell = document.createElement('td');
            indexCell.textContent = index + 1;

            // 创建网址单元格（包含<a>标签）
            const linkCell = document.createElement('td');

            const linkElement = document.createElement('a');
            linkElement.href = item[0];
            linkElement.textContent = item[0];
            linkElement.setAttribute("target", "black");
            linkCell.appendChild(linkElement);

            // 创建说明单元格
            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = item[1];

            row.appendChild(indexCell);
            row.appendChild(linkCell);
            row.appendChild(descriptionCell);

            tbody.appendChild(row);
        });
    })
    .catch(error => console.error(error));

// 右下角按钮滚动到页面顶部函数
toTop();

// ---------------------------< ↓↓↓ 函数实现 ↓↓↓ >--------------------------------- //


// 页面右下角滚动到页面顶部按钮 实现
function toTop() {
    const scrollToTopBtn = document.getElementById("scrollToTop");

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
            scrollToTopBtn.style.transition = "opacity 0.5s ease";
        }
    }

    function backToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    scrollToTopBtn.addEventListener("click", backToTop);

    let timeout;

    window.addEventListener('scroll', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            scrollToTopBtn.style.display = 'none';
        }, 2500);
    });
}
