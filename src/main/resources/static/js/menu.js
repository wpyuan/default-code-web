const menuHelp = {
    menuData: [],
    menuHtml: '',
    init: function (menuData) {
        this.menuData = menuData;
    },
    /**
     * 加载菜单
     * @param target 目标id
     */
    loadMenu: function (target) {
        this.menuData.forEach(function (menu, index) {
            deep(menu);
        });
        var menu = document.getElementById(target);
        menu.innerHTML = this.menuHtml;
    },
    find: function (menuId) {
        const menus = flat(this.menuData);
        return menus.find(m => m.id === menuId);
    }
};

function flat(arr) {
    if (arr && arr.length > 0) {
        return [].concat(...arr.map(item => [].concat(item, ...flat(item.children))));
    }
    return [];
}

function deep(menu) {
    if (!menu.children || menu.children.length == 0) {
        menuHelp.menuHtml += '<el-menu-item index="' + menu.id + '"';
        if (menu.url) {
            menuHelp.menuHtml += ' @click.native="handleMenuClick(\'' + menu.id + '\', \'' + menu.url + '\')"';
        }
        menuHelp.menuHtml += '>\n';
        if (menu.icon) {
            menuHelp.menuHtml += '<i class="' + menu.icon + '"></i>\n';
        }
        menuHelp.menuHtml += '<span slot="title">' + menu.title + '</span>\n' +
            '</el-menu-item>\n';
        return;
    }

    menuHelp.menuHtml += '<el-submenu index="' + menu.id + '">\n' +
        '<template slot="title">\n';
    if (menu.icon) {
        menuHelp.menuHtml += '<i class="' + menu.icon + '"></i>\n';
    }
    menuHelp.menuHtml += '<span>\n' + menu.title + '</span>\n' +
        '</template>\n';

    menu.children.forEach(function (item, index) {
        deep(item);
    })
    menuHelp.menuHtml += '</el-submenu>\n';
}
