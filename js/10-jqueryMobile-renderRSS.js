cms.ui.jqueryMobile=(function(module){
    module.renderRSS=renderRSS;

    function renderRSS(element,cb){
        var _id=element._id;
        
        var alias=element.alias;
        cms.data.getContent(_id,function(err,content){
            var innerHtml="";
            var html="";
            content=content.content;
            if (!err && content ){
                for (var i=0;i<content.length;i++){
                    var title=content[i].title;
                    var extraId=content[i]._id;
                    innerHtml+="<li><a href='#' data-extraId='"+extraId+"'>" + title + "</a></li>";
                }
            }
            var title=element.name;
            html = '<div class="renderRSS" data-role="page" id="' + alias + '" data-position="fixed">' +
            '<div data-role="header"><h2>' + title + '</h2></div>' +
            '<div data-role="content">' +
            '<ul data-role="listview" data-inset="true">' +
            innerHtml+'</ul>' +
            '</div>' +
            '</div>';
            cb(null,html);
        });
    }


    return module;
})(cms.ui.jqueryMobile ||{});