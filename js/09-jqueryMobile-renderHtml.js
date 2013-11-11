cms.ui.jqueryMobile=(function(module){
    module.renderHtml=renderHtml;

    function renderHtml(element,cb){
        var contentId=element._id;
        var title=element.name;
        var alias=element.alias;
        cms.data.getContent(contentId,function(err,content){
            var html = '<div class="renderHtml" data-role="page" id="%{id}%">' +
            '<div data-role="header" data-position="fixed"><h2>' + title + '</h2></div>' +
            '<div data-role="content">' +
            content.content+
            '</div>' +
            '</div>';
            cb(null,html);
        });
    }


    return module;
})(cms.ui.jqueryMobile ||{});