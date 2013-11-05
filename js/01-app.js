var cms=(function(module){
    module.setApplication=setApplication;
    function setApplication(app){
        module.app=app;
    }

    return module;
})(cms ||{});
