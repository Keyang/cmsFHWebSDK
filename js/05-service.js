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