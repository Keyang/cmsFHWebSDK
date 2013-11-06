cms.ui = (function(module) {
    module.setRenderer = setRenderer;
    module.render = render;
    module.registerType = registerType;
    module.getHtml=getHtml;
    module.initUI=initUI;
    var renderer = null;
    var registeredType = {};
    var uis = {};
    function getHtml(alias){
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
            return renderer.renderList(element, cb);
        } else if (element.cat == "core") {
            if (element.cat == "html") {
                return renderer.renderHtml(element, cb);
            }
        } else if (element.cat == "template") {

        } else if (element.cat == "import") {

        }
        return renderer.defaultRender(element, cb);
    }

    function registerType(alias, renderFunc) {
        registeredType[alias] = renderFunc;
    }

    function initUi(cb) {
        cms.data.getAppStructure(function(err, appStructure) {
            var root = appStructure.content;
            _recursiveParseApp(root,cb);
        });
    }

    function _recursiveParseApp(element, cb) {
        var alias = element.alias;
        render(element, function(err, html) {
            uis[alias] = html;
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
            } else {
                cb();
            }
        });

    }
    return module;
})(cms.ui || {});