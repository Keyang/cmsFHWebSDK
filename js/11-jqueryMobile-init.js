cms.ui.jqueryMobile = (function(module) {
    module.init = init;

    function init() {
        $("li[data-nav]").live("tap",function(){
            var pageId=$(this).data().nav;
            alert(pageId);
        });
    }


    return module;
})(cms.ui.jqueryMobile || {});