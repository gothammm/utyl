'use strict';
var currentObject = {};
const objectHelper = {
  global: function () {
    Object.prototype.path = objectPath;
  },
  path: objectPath
};

function objectPath(path) {
  let _self = this;
  if (!path) return null;
  let splitPath = path.split('.');
  if (!splitPath || !splitPath.length) {
    return this[path] || null;
  }
  return splitPath.reduce(function(o, i) {
    return (o.hasOwnProperty(i) && o[i]) ? o[i] : null
  }, _self);
}

module.exports = objectHelper;