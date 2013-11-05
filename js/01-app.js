var cms=(function(module){
    module.setApplicationAlias=setApplicationAlias;

    function setApplicationAlias(alias){
        module.alias=alias;
    }

    function setApplication(app){
        module.app=app;
    }

    return module;
})(cms ||{});
