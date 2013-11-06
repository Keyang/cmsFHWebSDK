cms.data = (function(module) {
  module.getContent = getContent;
  module.getAppStructure = getAppStructure;
  module.getContentExtra = getContentExtra;
  module.getRSSFeed = getRSSFeed;


  function getContent(contentId, callback) {
    cms.model.read(contentId, function(err, res) {
      if (err || !res) {
        return cms.model.getContent(contentId, function(err, res) {
          if (err) {
            return callback(err, null);
          }
          // Save the content to local storage
          cms.model.create(contentId, res);
          return callback(null, res);
        });
      }

      return callback(null, res);
    });
  }


  function getAppStructure(callback) {
    cms.model.read(cms.model.KEYS.AppStructure, function(err, res) {
      if (err || !res) {
        return cms.model.getAppStructure(function(err, res) {
          if (err) {
            return callback(err, null);
          }

          // Save the content to local storage
          cms.model.create(cms.model.KEYS.AppStructure, res);
          return callback(null, res);
        });
      }

      return callback(null, res);
    });
  }


  function getContentExtra(cat, type, template, extraId, callback) {

    function constructExtraKey(arr) {
      var key = '';
      for (var i = arr.length - 1; i >= 0; i--) {
        key += arr[i];
      };

      return key;
    }

    cms.model.read(constructExtraKey([cat, type, template, extraId]), function(err, res) {
      if (err || !res) {
        cms.model.getContentExtra(cat, type, template, extraId, function(err, res) {
          if (err) {
            return callback(err, null);
          }

          // Save the content to local storage
          cms.model.create(constructExtraKey([cat, type, template, extraId]), res);
          return callback(null, res);
        });
      }

      return callback(null, res);
    });
  }


  function getRSSFeed(feedId, callback) {
    getContentExtra("import", "json", "rss", feedId, callback);
  }


  return module;
})(cms.data || {});