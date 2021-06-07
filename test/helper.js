var q = require('q');

module.exports = {

  repeatText: function (text) {
    return text + ', ' + text;
  },

  capitalize: function (text) {
    return text[0].toUpperCase() + text.substring(1).toLowerCase();
  },

  exclaim: function (text) {
    return text + '!';
  },

  capitalizeAsync: function (text) {
    var deferred = q.defer();
    deferred.resolve(text[0].toUpperCase() + text.substring(1));
    return deferred.promise;
  },

  repeatTextAsync: function (text) {
    var deferred = q.defer();
    deferred.resolve(text + ', ' + text);
    return deferred.promise;
  },

  exclaimAsync: function (text) {
    var deferred = q.defer();
    deferred.resolve(text + '!');
    return deferred.promise;
  }
};