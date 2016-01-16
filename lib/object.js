'use strict';
const R = require('ramda');
const objectHelper = {
  ptoo: pathToObject,
  otop: objectToPath
};

function objectToPath(currObj, path) {
  let result = [];
  let obj = currObj || this;
  let currentPath = path || '';
  if (!R.is(Object, obj)) {
    return result;
  }
  R.mapObjIndexed((val, key) => {
    if (val instanceof Object && !(val instanceof Function)) {
      let currPath = currentPath ? `${currentPath}.${key}` : key;
      result = result.concat(objectToPath(val, currPath));
    } else {
      result.push({
        path: currentPath ? `${currentPath}.${key}` : key,
        value: val instanceof Function ? val() : val
      });
    }
  }, obj);
  return result;
}

function pathToObject(obj, path) {
  if (obj instanceof String) {
    path = obj;
    obj = this;
  }
  if (!path) return null;
  let splitPath = path.split('.');
  if (!splitPath || !splitPath.length) {
    return this[path] || null;
  }
  return splitPath.reduce(function (o, i) {
    return (o.hasOwnProperty(i) && o[i]) ? o[i] : null
  }, obj);
}

module.exports = objectHelper;