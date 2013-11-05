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