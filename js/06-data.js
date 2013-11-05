cms.data = (function(module) {
  module.getContent = getContent;
  module.getAppStructure = getAppStructure;
  module.getContentExtra = getContentExtra;
  module.getRSSFeed = getRSSFeed;


  function getContent(contentId, callback) {
    cms.model.getContent(contentId, function(err, res) {
      if (err) {
        return cms.model.read(contentId, callback);
      }

      // Save the content to local storage
      cms.model.create(contentId, res);

      return callback(null, res);
    });
  }


  function getAppStructure(callback) {
    cms.model.getAppStructure(function(err, res) {
      if (err) {
        return cms.model.read(cms.model.KEYS.AppStructure, callback);
      }

      // Save the content to local storage
      cms.model.create(cms.model.KEYS.AppStructure, res);

      return callback(null, res);
    });
  }


  function getContentExtra(cat, type, template, extraId, cb) {

    function constructExtraKey(arr) {
      var key = '';
      for (var i = arr.length - 1; i >= 0; i--) {
        key += arr[i];
      };

      return key;
    }

    cms.model.getContentExtra(cat, type, template, extraId, function(err, res) {
      if (err) {
        return cms.model.read(constructExtraKey([cat, type, template, extraId]), callback);
      }

      // Save the content to local storage
      cms.model.create(constructExtraKey([cat, type, template, extraId]), res);

      return callback(null, res);
    });
  }


  function getRSSFeed(feedId, callback) {

    function constructRssKey(feedId) {
      return 'rss_' + feedId;
    }

    cms.model.getRSSFeed(extraId, function(err, res) {
      if (err) {
        return cms.model.read(constructRssKey(feedId), callback);
      }

      // Save the content to local storage
      cms.model.create(constructRssKey(feedId), res);

      return callback(null, res);
    });
  }

  return module;
})(cms.data || {});