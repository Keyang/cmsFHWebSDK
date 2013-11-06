cms.service = (function(module) {
  module.sync = sync; // sync content
  module.startPoll = startPoll; //seconds as parameter
  module.stopPoll = stopPoll;

  // Time when the app should check for an update
  var timerId = null;

  /**
   * Get content from CMS and save to localstorage.
   */

  function sync(callback) {
    cms.model.getAppStructure(function(err, res) {
      if (err) {
        return callback(err, null);
      }

      cms.model.create(cms.model.KEYS.AppStructure, res, function(err, localRes) {
        if (!err) {
          return callback(null, res);
        } else {
          return callback(err, null);
        }
      });
    });
  }

  // TODO Handle device events, 'resume' etc
  function startPoll(seconds, callback) {
    // Default callback if one isn't provided
    callback = callback || function(err, res) {
      if (err) {
        console.log('Failed to get updated app App Structure via sync: ' + JSON.stringify(err));
      } else {
        console.log('Sync success!');
      }
    };

    // Clear old timers
    stopPoll();

    timerId = setTimeout(function() {
      // Callback will fire user callback and next sync...
      sync(function(err, res) {
        callback(err, res);
        startPoll(seconds, callback);
      });
    }, seconds * 1000);
  }

  function stopPoll() {
    clearInterval(timerId);
  }


  return module;
})(cms.service || {});