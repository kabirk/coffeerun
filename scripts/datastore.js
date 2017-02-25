(function (window) {
  'use strict';
  var App = window.App || {};
  var Promise = window.Promise;

  function DataStore() {
    this.data = {};
  }

  function promiseResolvedWith(value) {
    var promise = new Promise(function(resolve, reject) {
      resolve(value);
    });
    return promise;
  }

  DataStore.prototype.add = function(key, val) {
    this.data[key] = val;
    return promiseResolvedWith(null);
  };

  DataStore.prototype.get = function(key) { // Looks up the value based on a given key
    return promiseResolvedWith(this.data[key]);
  };

  DataStore.prototype.getAll = function() { // Looks up all keys and values
    return promiseResolvedWith(this.data);
  };

  DataStore.prototype.remove = function(key) { // Removes information
    delete promiseResolvedWith(this.data[key]);
  }

  App.DataStore = DataStore;
  window.App = App;
}) (window);
