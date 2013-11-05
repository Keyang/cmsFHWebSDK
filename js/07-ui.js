com.ui=(function(module){
    module.setRenderer=setRenderer;
    module.render=render;
    module.registerType=registeredType;
    
    var renderer=null;
    var registeredType={};
    function setRenderer(_renderer){
        renderer=_renderer;
    }
    function render(element){
        var alias=element.alias;
        if (registeredType[alias]){
            return registeredType[alias](element);
        }
        if (element.children){ //list
            return renderer.renderList(element);
        }else if (element.cat =="core"){
            if (element.cat=="html"){
                return renderer.renderHtml(element);
            }
        }else if (element.cat=="template"){

        }else if(element.cat=="import"){

        }
    }
    function registerType(alias,renderFunc){
        registeredType[alias]=renderFunc;
    }

    return module;
})(com.ui ||{});