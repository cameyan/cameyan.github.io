
// ---------------------------< ↓↓↓ 主函数和调用 ↓↓↓ >--------------------------------- //

// 在该函数中使用异步函数 fetch(), 使代码通俗易懂
parseJsonAndProcess().then(() => {
    console.log("数据读取成功");
});

// 右下角按钮滚动到页面顶部函数
toTop();


// ---------------------------< ↓↓↓ 函数实现 ↓↓↓ >--------------------------------- //

// 给定一个 url，返回其 域名
function getDomain(url) {
    // 创建一个URL对象
    const urlObj = new URL(url);

    // 返回 域名
    return urlObj.hostname;
}

// 在该函数中使用异步函数 fetch()，，抛弃直接使用 fetch()
async function parseJsonAndProcess(){
    // 在线工具数据文件路径
    const jsonDataPath = "./sources/tools_datas.json";
    try {
        // 获取 json 数据内容，并转为 JSON 格式
        const response = await fetch(jsonDataPath);
        const datasRoot = await response.json();

        // 动态生成左侧菜单栏函数
        createLeftMenu(datasRoot);

        // 动态生成右侧 url 显示 + 右侧页脚 urls 统计信息
        createRightShow(datasRoot);

        // 搜索按钮
        buttonSearch(datasRoot);
    } catch (error) {
        console.log('数据读取和处理失败, 请检查数据文件路径、内容...', error);
    }
}

// 动态生成左侧菜单栏函数
function createLeftMenu(datas) {
    const classNames = datas['classNames'];
    const dataTitle = datas['dataTitle'];

    for (let i = 0; i < classNames.length; i++) {
        const leftMenus = document.querySelector(".container-left");

        const leftMenu = document.createElement('div');

        const leftMenuUrl = document.createElement('a');
        leftMenuUrl.setAttribute('href', `#${classNames[i]}`);
        leftMenuUrl.textContent = dataTitle[i];

        leftMenu.appendChild(leftMenuUrl);
        leftMenus.appendChild(leftMenu);
    }
}


function createRightShow(datas) {
    const classNames = datas['classNames'];
    const dataTitle = datas['dataTitle'];

    // 获取所有键名，这是分类后的 Url 链接的分类键名
    const allUrlsKeys = Object.keys(datas["dataAllUrls"]);
    // 获取Url网址的所有数据
    const allUrls = datas["dataAllUrls"];

    // 获取右侧显示网址的整个区域组件
    const rightShowDivRoot = document.querySelector(".right-show");

    for (let i = 0; i < allUrlsKeys.length; i++) {
        // 动态创建右侧网址显示区域标题
        const h3 = document.createElement('h3');
        h3.textContent = dataTitle[i];
        h3.setAttribute('id', classNames[i]);

        // 此处的 div 用于保存网址，里面只包含若干网址显示框
        const rightShowDiv = document.createElement('div');
        rightShowDiv.classList.add(classNames[i]);

        // 当前遍历内，当前 url 信息
        const curUrls = allUrls[allUrlsKeys[i]];

        // 遍历所有urls中的一个分类数据，其中包含若干具体的单个url信息
        curUrls.forEach(item => {
            const div = document.createElement('div');

            // 这里设置所有添加的网址块类名都为 right-show-url，利于样式统一
            div.classList.add('right-show-url');

            // 如果网站的 ico 为空，则使用默认的
            if (item[1] === "") {
                item[1] = "./imgs/default/default-url.png";
            }

            div.innerHTML = `
            <a href="${item[0]}" target="_blank" title="${item[3]}">
                <img width="48" height="48" src="${item[1]}" alt="">
                ${item[2]}
                <br>
                <span>${item[3]}</span>
            </a>`;

            rightShowDiv.appendChild(div);
        });
        // 把 h3、一个类别的网址汇总框 加入右侧整个框的子节点中
        rightShowDivRoot.appendChild(h3);
        rightShowDivRoot.appendChild(rightShowDiv)
    }

    // 页脚统计工具数量的逻辑实现
    const footer = document.createElement('span');
    let urlCounts = 0
    // 遍历分类keys
    allUrlsKeys.forEach(item => {
        // 通过key获取每个分类下的url数量，然后加起来
        urlCounts += allUrls[item].length;
    });
    footer.textContent = "当前共收录了 " + urlCounts + " 个工具";
    footer.setAttribute('class', 'footer');
    rightShowDivRoot.appendChild(footer);
}


function buttonSearch(datas) {
    // 获取所有键名，这是分类后的 Url 链接的分类键名
    const allUrlsKeys = Object.keys(datas["dataAllUrls"]);
    // 获取Url网址的所有数据
    const allUrls = datas["dataAllUrls"];
    console.log(allUrls);

    // 搜索框逻辑实现
    function search() {
        // 执行搜索函数之前，清除该 div 显示框的所有内容，防止点击按钮重复创建组件
        const clearSearchResult = document.getElementsByClassName("search-result");
        // 遍历所有匹配到的元素并清空它们
        for (let i = 0; i < clearSearchResult.length; i++) {
            clearSearchResult[i].innerHTML = "";
        }
        // 同时清除 未搜索到的结果展示
        const clearNoSearchResult = document.getElementsByClassName("search-no-result");
        for (let i = 0; i < clearNoSearchResult.length; i++) {
            clearNoSearchResult[i].innerHTML = "";
        }

        // 获取 input 输入框的关键字
        const keyword = document.getElementById("search-input").value;
        // 若输入框为空，则不执行任何操作。否则会把所有网址都匹配出来
        if (keyword === "") {
            return;
        }

        // 初始化一个数组，用于保存匹配到的urls数据
        const searchYesUrls = [];

        // 遍历所有分类键名
        allUrlsKeys.forEach(allUrlKey => {
            // 通过键名获取一个分类数据所有urls数组
            const curUrls = allUrls[allUrlKey];

            // 遍历一个分类下的所有urls
            curUrls.forEach(url => {
                if (url[2].toLowerCase().includes(keyword.toLowerCase()) || url[2].toLowerCase().includes(keyword.toLowerCase())) {
                    // 匹配到一个url包含关键字，则把这个url加入到匹配数组中
                    searchYesUrls.push(url)
                }
            });
        });

        // 如果未匹配到任何网址信息，则提示一下
        if (searchYesUrls.length === 0) {
            const searchNoResult = document.querySelector('.search-no-result');
            const div = document.createElement('div');
            div.classList.add('right-show-no-search');
            div.innerHTML = `
            <span>没找到哦~</span>`;
            searchNoResult.appendChild(div);

            // 退出
            return;
        }

        // 把搜索结果填充到 搜索框
        searchYesUrls.forEach(item => {
            const searchResult = document.querySelector('.search-result');
            const div = document.createElement('div');

            div.classList.add('right-show-url');

            // 如果网站的 ico 为空，则使用默认的
            if (item[1] === "") {
                item[1] = "./imgs/default/default-url.png";
            }

            div.innerHTML = `
            <a href="${item[0]}" target="_blank" title="${item[3]}">
                <img width="48" height="48" src="${item[1]}" alt="">
                ${item[2]}
                <br>
                <span>${item[3]}</span>
            </a>`;

            searchResult.appendChild(div);
        });
    }

    // 搜素按钮点击事件
    const searchButton = document.getElementById('search-button');
    // 添加点击事件监听器
    searchButton.addEventListener('click', function () {
        // 调用自定义函数
        search();
    });
}


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
