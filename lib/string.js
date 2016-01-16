'use strict';
const R = require('ramda');

const stringHelper = {
  replaceAll: (replace, to, stringValue) => stringValue.replace(new RegExp(`${replace}`, 'g'), to || '')   
};

module.exports = stringHelper;
