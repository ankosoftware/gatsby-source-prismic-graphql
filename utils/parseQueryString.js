"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryString = parseQueryString;
exports.parseQueryStringAsJson = parseQueryStringAsJson;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

function parseQueryString(qs) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';
  if (!qs || qs.length == 0) return new Map();
  return new Map(qs.split(delimiter).map(function (item) {
    var _item$split$map = item.split('=').map(function (part) {
      return decodeURIComponent(part.trim());
    }),
        _item$split$map2 = (0, _toArray2.default)(_item$split$map),
        key = _item$split$map2[0],
        value = _item$split$map2.slice(1);

    return [key, value.join('=')];
  }));
}

function parseQueryStringAsJson() {
  var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';
  var qsMap = parseQueryString(qs, delimiter);
  var qsMapIterator = qsMap[Symbol.iterator]();
  var qsJSON = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = qsMapIterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var keyJSON = item[0];
      var value = item[1];
      qsJSON[keyJSON] = value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return qsJSON;
}