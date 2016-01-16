'use strict';
const R = require('ramda');
const objectHelper = require('./object');
function json(data) {
  data = data || this;
  function fill(filler) {
    filler = R.is(Object, filler) ? filler : {};

    if (!data) return null;

    let stringified = JSON.stringify(data);
    let paths = objectHelper.otop(filler);
    for (var i = 0; i < paths.length; i++) {
      stringified = stringified.replace(new RegExp(`@{${paths[i].path}}`, 'g'), paths[i].value);
    }
    return JSON.parse(stringified);
  }

  return {
    fill: fill
  };
}
module.exports = json;