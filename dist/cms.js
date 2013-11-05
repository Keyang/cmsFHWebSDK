var cms=(function(module){
    module.setApplicationAlias=setApplicationAlias;

    function setApplicationAlias(alias){
        module.alias=alias;
    }

    return module;
})(cms ||{});

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
cms.events=(function(module){
    module.on=on;
    module.off=off;
    module.emit=emit;

    var events={};

    function on(e,cb){
        _registerEvent(e,cb);
    }
    function off(e,cb){
        _unregisterEvent(e,cb);
    }
    function emit(){
        var args=Array.prototype.slice.call(arguments,0);
        var e=args.shift();
        var funcs=events[e];
        if (funcs && funcs.length>0){
            for (var i=0;i<funcs.length;i++){
                var func=funcs[i];
                func.apply(this,args);
            }
        }
    }
    function _unregisterEvent(name,func){
        if (events[name]){
            if (events[name].indexOf(func)>=0){
                events[name].splice(events[name].indexOf(func),1);
            }
        }
    }
    function _registerEvent(name,func){
        if (!events[name]){
            events[name]=[]
        }
        if (events[name].indexOf(func)<0){
            events[name].push(func);
        }
    }
    return module;
})(cms.events || {});
cms.model=(function(module){
    
    
    return module;
})(cms.model ||{});
cms.service=(function(module){
    module.sync=sync;// sync content
    module.startPoll=startPoll; //seconds as parameter
    module.stopPoll=stopPoll;




    return module;
})(cms.service || {});
cms.data=(function(module){
    module.getContent=getContent;
    module.getAppStructure=getAppStructure;
    module.getContentExtra=getContentExtra;
    module.getRSSFeed=getRSSFeed;

    

    return module;
})(cms.data || {});
com.ui=(function(module){
    
    return module;
})(com.ui ||{});
cms.ui.jqueryMobile=(function(module){
    module.renderList=renderList;
    module.renderHtml=renderHtml;
    module.renderRSS=renderRSS;
    module.renderRSSFeed=renderRSSFeed;


    return module;
})(cms.ui.jqueryMobile ||{});
