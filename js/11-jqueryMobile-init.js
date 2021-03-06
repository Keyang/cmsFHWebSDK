cms.ui.jqueryMobile = (function(module) {
    module.init = init;

    var inited = false;

    function init() {
        if (inited == false) {
            inited = true;

            $("[data-nav]").live("click", function() {
                var pageId = $(this).data().nav;
                if (cms.app.onNav) {
                    cms.app.onNav(pageId);
                }
            });
            $("[data-extraId]").live("click", function() {
                if (cms.app.onNav) {
                    var data = $(this).data();
                    var cat = data.cmscat;
                    var type = data.cmstype;
                    var template = data.cmstemplate;
                    var extraId = data.extraid;
                    var uid = (cat + type + template).toLowerCase() + "_" + extraId;
                    if ($("#" + uid).length > 0) {
                        cms.app.onNav(uid);
                    } else {
                        cms.ui.loadExtra(cat, type, template, extraId, function(err, uid) {
                            cms.app.onNav(uid);
                        });
                    }
                }

            });

        }



    }


    return module;
})(cms.ui.jqueryMobile || {});