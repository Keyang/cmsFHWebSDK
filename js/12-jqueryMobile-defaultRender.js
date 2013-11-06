cms.ui.jqueryMobile=(function(module){
    module.defaultRender=defaultRender;

    function defaultRender(element,cb){
        var name=element.name;
        var alias=element.alias;
        var _id=element._id;
        var html='<div class="defaultRender" data-role="page" id="' + alias + '" data-position="fixed">' +
            '<div data-role="header"><h2>' + name + '</h2></div>' +
            '<div data-role="content">' +
            _id+
            '</div>' +
            '</div>';

        cb(null,html);
    }


    return module;
})(cms.ui.jqueryMobile ||{});