"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _prismicJavascript = _interopRequireDefault(require("prismic-javascript"));

var _pathToRegexp = require("path-to-regexp");

var _utils = require("../utils");

var _parseQueryString = require("../utils/parseQueryString");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PreviewPage = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(PreviewPage, _React$Component);

  var _super = _createSuper(PreviewPage);

  function PreviewPage() {
    var _this;

    (0, _classCallCheck2.default)(this, PreviewPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "redirect", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(doc) {
        var link, pathWithQS, pageExists, newUrl;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (doc) {
                  _context.next = 3;
                  break;
                }

                window.location = '/';
                return _context.abrupt("return");

              case 3:
                link = (0, _utils.linkResolver)(doc);
                pathWithQS = (_this.config.pages || []).map(function (page) {
                  var keys = [];
                  var re = (0, _pathToRegexp.pathToRegexp)(page.match, keys);
                  var match = re.exec(link);

                  var delimiter = function delimiter(str) {
                    return str.indexOf('?') === -1 ? '?' : '&';
                  };

                  if (match) {
                    return match.slice(1).reduce(function (acc, value, i) {
                      if (keys[i] && value !== undefined) return acc + "".concat(delimiter(acc)).concat(keys[i].name, "=").concat(value);else return acc;
                    }, (0, _utils.getPagePreviewPath)(page));
                  }

                  return null;
                }).find(function (n) {
                  return !!n;
                });
                pageExists = _this.props.pageContext.prismicAllPagePaths.indexOf(link) !== -1;

                if (!pageExists && pathWithQS) {
                  newUrl = "".concat(window.location.protocol, "//").concat(window.location.host).concat(pathWithQS);
                  window.location.replace(newUrl);
                } else {
                  window.location.replace(link);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(PreviewPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.preview();
    }
  }, {
    key: "preview",
    value: function () {
      var _preview = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var location, qs, token, experiment, documentId, now, api, doc, runningVariations, matchedVariation, cookies, _doc, _preview2;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                location = this.props.location;
                qs = (0, _parseQueryString.parseQueryString)(String(location.search).substr(1));
                token = qs.get('token');
                experiment = qs.get('experiment');
                documentId = qs.get('documentId'); // Expiration date of cookie

                now = new Date();
                now.setHours(now.getHours() + 1);
                _context2.next = 9;
                return _prismicJavascript.default.getApi("https://".concat(this.config.repositoryName, ".cdn.prismic.io/api/v2"));

              case 9:
                api = _context2.sent;

                if (!token) {
                  _context2.next = 22;
                  break;
                }

                _context2.next = 13;
                return api.getPreviewResolver(token, documentId).resolve(_utils.linkResolver, '/');

              case 13:
                document.cookie = "".concat(_prismicJavascript.default.previewCookie, "=").concat(token, "; expires=").concat(now.toUTCString(), "; path=/");

                if (documentId) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", this.redirect());

              case 16:
                _context2.next = 18;
                return api.getByID(documentId);

              case 18:
                doc = _context2.sent;
                return _context2.abrupt("return", this.redirect(doc));

              case 22:
                if (!experiment) {
                  _context2.next = 28;
                  break;
                }

                runningVariations = [];

                if (api.experiments.running && api.experiments.running.length) {
                  runningVariations.concat.apply(runningVariations, (0, _toConsumableArray2.default)(api.experiments.running.map(function (experiment) {
                    return experiment.data.variations;
                  })));
                }

                if (experiment && runningVariations.length) {
                  matchedVariation = runningVariations.find(function (variation) {
                    return variation.label.toLowerCase().replace(' ', '-') === experiment;
                  });

                  if (matchedVariation) {
                    document.cookie = "".concat(_prismicJavascript.default.experimentCookie, "=").concat(matchedVariation.ref, "; expires=").concat(now.toUTCString(), "; path=/");
                    this.redirect();
                  }
                }

                _context2.next = 35;
                break;

              case 28:
                if (!documentId) {
                  _context2.next = 35;
                  break;
                }

                cookies = (0, _utils.getCookies)();
                _context2.next = 32;
                return api.getByID(documentId);

              case 32:
                _doc = _context2.sent;
                _preview2 = cookies.has(_prismicJavascript.default.previewCookie) || cookies.has(_prismicJavascript.default.experimentCookie);
                this.redirect(_preview2 && _doc);

              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function preview() {
        return _preview.apply(this, arguments);
      }

      return preview;
    }()
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "config",
    get: function get() {
      return this.props.prismic.options;
    }
  }]);
  return PreviewPage;
}(_react.default.Component);

exports.default = PreviewPage;