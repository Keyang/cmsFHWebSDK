cms.ui.jqueryMobile=(function(module){
    module.renderList=renderList;

    function renderList(category){
        var title=category.name;
        var alias=category.alias;
        var children=category.children;
    }


    return module;
})(cms.ui.jqueryMobile ||{});