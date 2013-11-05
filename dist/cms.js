var cms=(function(module){
    module.setApplication=setApplication;
    function setApplication(app){
        module.app=app;
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
            "alias":cms.app.alias
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
        },function(res){
            cb(null,res);
        },function(err){
            console.log(err);
            cb(err, null);
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
cms.model = (function(module) {

  // Public functions
  module.create = _create;
  module.read = _read;
  module.KEYS = {
    AppStructure: 'AppStructure'
  };


  /**
   * Parse JSON to string
   * @return
   */

  function stringifyJson(data, callback) {
    try {
      return callback(null, JSON.stringify(data))
    } catch (e) {
      return callback(e, null);
    }
  }

  /**
   * Parse string to JSON Object
   */

  function parseToJson(str, callback) {
    try {
      return callback(null, JSON.parse(str))
    } catch (e) {
      return callback(e, null);
    }
  }


  /**
   * Read entry from local storage
   */

  function _read(key, callback) {
    $fh.data({
      act: 'load',
      key: key
    }, function(res) {
      return parseToJson(res.val, callback);
    }, function(msg, err) {
      return callback(err, null);
    });
  }


  /**
   * Create entry in local storage
   */

  function _create(key, data, callback) {
    stringifyJson(data, function(err, json) {
      if (err) {
        return callback(err, null);
      }

      $fh.data({
        act: 'save',
        key: key,
        data: json
      }, function(res) {
        return callback(null, res);
      }, function(msg, err) {
        return callback(err, null);
      })
    });
  }

  return module;
})(cms.model || {});
cms.service = (function(module) {
  module.sync = sync; // sync content
  module.startPoll = startPoll; //seconds as parameter
  module.stopPoll = stopPoll;

  // Time when the app should check for an update
  var timerId = null;

  /**
   * Get content from CMS and save to localstorage.
   */

  function sync() {
    cms.model.getAppStructure(function(err, res) {
      if(err) {
        console.log('Failed to get CMS updated content');
      }
      console.log('Got updated CMS content');

      cms.model.create(cms.model.KEYS.AppStructure, res, function(err, res) {
        if(!err) {
          console.log('Saved CMS content to localstorage');
        }
      });
    });
  }

  // TODO Handle device events, 'resume' etc
  function startPoll(seconds) {
    // Clear old timers
    stopPoll();

    // New timer
    timerId = setInterval(function() {
      sync();
    }, seconds * 1000);
  }

  function stopPoll() {
    clearInterval(timerId);
  }


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

    function renderList(category){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
cms.ui.jqueryMobile=(function(module){
    module.renderHtml=renderHtml;

    function renderHtml(category){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
cms.ui.jqueryMobile=(function(module){
    module.renderRSS=renderRSS;

    function renderRSS(category){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
cms.ui.jqueryMobile=(function(module){
    module.renderRSSFeed=renderRSSFeed;

    function renderRSSFeed(category){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
