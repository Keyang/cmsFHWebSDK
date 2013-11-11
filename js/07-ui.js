cms.ui = (function(module) {
    module.setRenderer = setRenderer;
    module.render = render;
    module.registerType = registerType;
    module.getHtml = getHtml;
    module.initUi = initUi;
    module.loadExtra=loadExtra;
    
    var renderer = null;
    var registeredType = {};
    var uis = {};
    cms.events.on("synced",function(){
        initUi(function(){
            console.log("UI synced with CMS");
        });
    });

    function getHtml(alias) {
        return uis[alias];
    }

    function setRenderer(_renderer) {
        renderer = _renderer;
    }

    function render(element, cb) {
        var alias = element.alias;

        if (registeredType[alias]) {
            return registeredType[alias](element, cb);
        }
        if (element.children) { //list
            var children=[];
            for (var key in element.children){ //flat children
              children.push(element.children[key]);
            }
            if (children.length ==1){//placeholder
              var child=children[0];
              return render(child,cb);
            }else{ //render as a list
              return renderer.renderList(element, cb);
            }
        } else {
            var cat=element.cat;
            var type=element.type;
            var template=element.template;
            if (cat == "core") {
                if (type == "html" && template=="html") {
                    return renderer.renderHtml(element, cb);
                }
            } else if (cat == "template") {

            } else if (cat == "import") {
                if (template=="rss"){
                    return renderer.renderRSS(element,cb);
                }
            }
        }
        return renderer.defaultRender(element, cb);
    }

    function registerType(alias, renderFunc) {
        registeredType[alias] = renderFunc;
    }

    function initUi(cb) {
        renderer.init();
        cms.data.getAppStructure(function(err, appStructure) {
            var root = appStructure.content;
            _recursiveParseApp(root, cb);
        });

    }
    function loadExtra(cat,type,template,extraId,cb){
        var key=(cat+type+template).toLowerCase();
        var uid=key+"_"+extraId;
        if (uis[uid]){
            cb(null,uis[uid]);
        }else{
            renderer.renderExtra[key](extraId,function(err,html){
                uis[uid]=html;

                cb(null,uid);
            });    
        }
        
    }

    function _recursiveParseApp(element, cb) {
        var alias = element.alias;
        render(element, function(err, html) {
            if (typeof html =="string"){
                html= html.replace("%{id}%",alias);
            }
            uis[alias] =html;
            if (element.children) {
                var elementCount = 0;
                for (var key in element.children) {
                    elementCount++;
                    var nextElement = element.children[key];
                    _recursiveParseApp(nextElement, function() {
                        setTimeout(function() {
                            elementCount--;
                            if (elementCount == 0) {
                                cb();
                            }
                        }, 0);

                    });
                }
                if (elementCount == 0) {
                    cb();
                }
            } else {
                cb();
            }
        });

    }
    return module;
})(cms.ui || {});