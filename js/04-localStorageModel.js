cms.model = (function(module) {

  // Public functions
  module.create = _create;
  module.read = _read;


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
      return parseToJson(res, callback);
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