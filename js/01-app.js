var cms=(function(module){
    module.init=init;
    /**
     * init cms sdk
     * app={
     *     "alias":""
     * 
     * }
     * @param  {[type]} app [description]
     * @return {[type]}     [description]
     */
    function init(app){
        cms.ui.setRenderer(cms.ui.jqueryMobile);
        module.app=app;
    }
    return module;
})(cms ||{});
