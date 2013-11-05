cms.model=(function(module){
    module.getContent=getContent;
    module.getAppStructure=getAppStructure;
    module.getContentExtra=getContentExtra;
    module.getRSSFeed=getRSSFeed;

    function getRSSFeed(feedId,cb){
        getContentExtra("import","json","rss",feedId,cb);
    }

    function getContent(contentId,cb){
        var param={
            "contentId":contentId
        }
        _act("getContent",param,cb);
    }

    function getAppStructure(cb){
        var param={
            "alias":cms.alias
        }
        _act("getAppStructure",param,cb);
    }

    function getContentExtra(cat,type,template,extraId,cb){
        var param={
            "cat":cat,
            "type":type,
            "template":template,
            "extraId":extraId
        }
        _act("getContentExtra",param,cb);
    }
    function _act(name,param,cb){
        $fh.act({
            "act":name,
            "req":param
        },cb,function(err){
            console.log(err);
        });
    }

    return module;
})(cms.model||{});