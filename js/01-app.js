var cms=(function(module){
    module.setApplicationAlias=setApplicationAlias;

    function setApplicationAlias(alias){
        module.alias=alias;
    }

    return module;
})(cms ||{});
