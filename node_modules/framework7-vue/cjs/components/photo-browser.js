"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../shared/utils");

var _f = require("../shared/f7");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  name: 'f7-photo-browser',
  props: {
    init: {
      type: Boolean,
      default: true
    },
    params: Object,
    photos: Array,
    exposition: {
      type: Boolean,
      default: true
    },
    expositionHideCaptions: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    navbar: {
      type: Boolean,
      default: true
    },
    toolbar: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String
    },
    captionsTheme: {
      type: String
    },
    iconsColor: {
      type: String
    },
    swipeToClose: {
      type: Boolean,
      default: true
    },
    pageBackLinkText: {
      type: String,
      default: undefined
    },
    popupCloseLinkText: {
      type: String,
      default: undefined
    },
    navbarOfText: {
      type: String,
      default: undefined
    },
    navbarShowCount: {
      type: Boolean,
      default: undefined
    },
    swiper: {
      type: Object
    },
    url: {
      type: String
    },
    routableModals: {
      type: Boolean,
      default: false
    },
    virtualSlides: {
      type: Boolean,
      default: true
    },
    view: [String, Object],
    renderNavbar: Function,
    renderToolbar: Function,
    renderCaption: Function,
    renderObject: Function,
    renderLazyPhoto: Function,
    renderPhoto: Function,
    renderPage: Function,
    renderPopup: Function,
    renderStandalone: Function
  },
  emits: ['photobrowser:open', 'photobrowser:close', 'photobrowser:opened', 'photobrowser:closed', 'photobrowser:swipetoclose'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var f7PhotoBrowser = null;

    var open = function open(index) {
      return f7PhotoBrowser.open(index);
    };

    var close = function close() {
      return f7PhotoBrowser.close();
    };

    var expositionToggle = function expositionToggle() {
      return f7PhotoBrowser.expositionToggle();
    };

    var expositionEnable = function expositionEnable() {
      return f7PhotoBrowser.expositionEnable();
    };

    var expositionDisable = function expositionDisable() {
      return f7PhotoBrowser.expositionDisable();
    };

    (0, _vue.watch)(function () {
      return props.photos;
    }, function (value) {
      var pb = f7PhotoBrowser;
      if (!pb) return;
      pb.params.photos = value;

      if (pb.opened && pb.swiper) {
        pb.swiper.update();
      }
    });
    (0, _vue.onMounted)(function () {
      if (!props.init) return;
      (0, _f.f7ready)(function () {
        var paramsComputed;

        if (typeof props.params !== 'undefined') {
          paramsComputed = props.params;
        } else {
          paramsComputed = _extends({}, props);
          delete paramsComputed.params;
        }

        Object.keys(paramsComputed).forEach(function (param) {
          if (typeof paramsComputed[param] === 'undefined' || paramsComputed[param] === '') delete paramsComputed[param];
        });
        paramsComputed = (0, _utils.extend)({}, paramsComputed, {
          on: {
            open: function open() {
              emit('photobrowser:open');
            },
            close: function close() {
              emit('photobrowser:close');
            },
            opened: function opened() {
              emit('photobrowser:opened');
            },
            closed: function closed() {
              emit('photobrowser:closed');
            },
            swipeToClose: function swipeToClose() {
              emit('photobrowser:swipetoclose');
            }
          }
        });
        f7PhotoBrowser = _f.f7.photoBrowser.create(paramsComputed);
      });
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (f7PhotoBrowser && f7PhotoBrowser.destroy) f7PhotoBrowser.destroy();
      f7PhotoBrowser = null;
    });
    return {
      open: open,
      close: close,
      expositionToggle: expositionToggle,
      expositionEnable: expositionEnable,
      expositionDisable: expositionDisable
    };
  },
  render: function render() {
    return null;
  }
};
exports.default = _default;