cms.ui.jqueryMobile.renderExtra = (function(module) {
    module.importjsonrss = importjsonrss;

    function importjsonrss(extraId, cb) {
        cms.data.getContentExtra("import","json","rss",extraId, function(err, content) {
            var title = content.title;
            var description = content.description;
            var pubdate = content.pubdate;
            var dtStr=pubdate.getDate()+"/"+(pubdate.getMonth()+1)+"/"+pubdate.getFullYear();
            var link = content.link;
            var extraId=content._id;
            var uid="importjsonrss_"+extraId;

            var html = '<div data-role="page" id="'+uid+'">' +
                '<div data-role="header" data-position="fixed">' +
                '<h1>Costain News</h1>' +
                '</div>' +
                '<div data-role="content">' +
                '<h3>'+title+'</h3>' +
                '<p style="text-align:right; color:#999;font-size:0.8em">Published: '+dtStr+'</p>' +
                '<div>' +
                description+
                '</div>' +
                '<div data-role="button" onClick="cms.util.webview(\''+link+'\')">Read Original Feed</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });

    }

    return module;
})(cms.ui.jqueryMobile.renderExtra || {});