'use strict';
const R = require('ramda');
const objectHelper = {
  path: pathToObject,
  otop: objectToPath,
  deepExtend: deepExtend
};

function setValueByPath(obj, path, value) {
  if (!path) throw new Error('Invalid path value');
  let paths = path.split('.');
  if (!paths.length) throw new Error('Invalid path value');
  let baseProp = paths[0];
  let props = {};
  for (var i = paths.length - 1; i >= 0; i--) {
    if (i === paths.length - 1) {
      props[paths[i]] = value;
    } else {
      let tmp = {};
      tmp[paths[i]] = props;
      props = tmp;
    }
  }
  obj[baseProp] = props[baseProp];
  return obj;
}

function deepExtend(target, source) {
  if (!R.is(Object, target) || !R.is(Object, source)) {
    throw new Error('Invalid Target/Source object');
  }
  let result = R.clone(target);
  R.mapObjIndexed((val, key) => {
    if (R.is(Object, val)) {
      result[key] = deepExtend(result[key], val);
    } else {
      result[key] = val;
    }
  }, source);
  return result;
}

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

function pathToObject(obj, path, value) {
  if (obj instanceof String) {
    path = obj;
    obj = this;
  }
  if (value) {
    return setValueByPath(obj, path, value);
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