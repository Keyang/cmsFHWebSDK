cms.ui.jqueryMobile = (function(module) {
    module.renderList = renderList;

    function renderList(category, cb) {
        var title = category.name;
        var alias = category.alias;
        var children = category.children;
        var innerHtml = "";
        for (var key in children) {
            var ele = children[key];
            var eleName = ele.name;
            innerHtml += "<li><a href='#" + key + "'>" + eleName + "</a></li>";
        }
        var html = '<div data-role="page" id="' + alias + '">' +
            '<div data-role="header"><h2>' + title + '</h2></div>' +
            '<div data-role="content">' +
            '<ul data-role="listview" data-inset="true">' +
            innerHtml '</ul>' +
            '</div>' +
            '</div>';
        cb(null,html);
    }


    return module;
})(cms.ui.jqueryMobile || {});