"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../shared/utils");

var _mixins = require("../shared/mixins");

var _preloader = _interopRequireDefault(require("./preloader"));

var _useTab = require("../shared/use-tab");

var _f = require("../shared/f7");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _hoisted_1 = {
  key: 0,
  class: "ptr-preloader"
};

var _hoisted_2 = /*#__PURE__*/(0, _vue.createVNode)("div", {
  class: "ptr-arrow"
}, null, -1);

var _hoisted_3 = {
  key: 3,
  class: "ptr-preloader"
};

var _hoisted_4 = /*#__PURE__*/(0, _vue.createVNode)("div", {
  class: "ptr-arrow"
}, null, -1);

function render(_ctx, _cache) {
  var _component_f7_preloader = (0, _vue.resolveComponent)("f7-preloader");

  return (0, _vue.openBlock)(), (0, _vue.createBlock)("div", {
    ref: "elRef",
    class: _ctx.classes,
    "data-ptr-distance": _ctx.ptrDistance || undefined,
    "data-ptr-mousewheel": _ctx.ptrMousewheel || undefined,
    "data-infinite-distance": _ctx.infiniteDistance || undefined
  }, [_ctx.ptr && _ctx.ptrPreloader && !_ctx.ptrBottom ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", _hoisted_1, [(0, _vue.createVNode)(_component_f7_preloader), _hoisted_2])) : (0, _vue.createCommentVNode)("", true), _ctx.infinite && _ctx.infinitePreloader && _ctx.infiniteTop ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_preloader, {
    key: 1,
    class: "infinite-scroll-preloader"
  })) : (0, _vue.createCommentVNode)("", true), (0, _vue.renderSlot)(_ctx.$slots, "default"), _ctx.infinite && _ctx.infinitePreloader && !_ctx.infiniteTop ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_preloader, {
    key: 2,
    class: "infinite-scroll-preloader"
  })) : (0, _vue.createCommentVNode)("", true), _ctx.ptr && _ctx.ptrPreloader && _ctx.ptrBottom ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", _hoisted_3, [(0, _vue.createVNode)(_component_f7_preloader), _hoisted_4])) : (0, _vue.createCommentVNode)("", true)], 10, ["data-ptr-distance", "data-ptr-mousewheel", "data-infinite-distance"]);
}

var _default = {
  name: 'f7-page-content',
  render: render,
  components: {
    f7Preloader: _preloader.default
  },
  props: _extends({
    tab: Boolean,
    tabActive: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true
    },
    ptrBottom: Boolean,
    ptrMousewheel: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean
  }, _mixins.colorProps),
  emits: ['ptr:pullstart', 'ptr:pullmove', 'ptr:pullend', 'ptr:refresh', 'ptr:done', 'infinite', 'ptrPullStart', 'ptrPullMove', 'ptrPullEnd', 'ptrRefresh', 'ptrDone', 'tab:hide', 'tab:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var elRef = (0, _vue.ref)(null);

    var onPtrPullStart = function onPtrPullStart(el) {
      if (elRef.value !== el) return;
      emit('ptr:pullstart');
      emit('ptrPullStart');
    };

    var onPtrPullMove = function onPtrPullMove(el) {
      if (elRef.value !== el) return;
      emit('ptr:pullmove');
      emit('ptrPullMove');
    };

    var onPtrPullEnd = function onPtrPullEnd(el) {
      if (elRef.value !== el) return;
      emit('ptr:pullend');
      emit('ptrPullEnd');
    };

    var onPtrRefresh = function onPtrRefresh(el, done) {
      if (elRef.value !== el) return;
      emit('ptr:refresh', done);
      emit('ptrRefresh', done);
    };

    var onPtrDone = function onPtrDone(el) {
      if (elRef.value !== el) return;
      emit('ptr:done');
      emit('ptrDone');
    };

    var onInfinite = function onInfinite(el) {
      if (elRef.value !== el) return;
      emit('infinite');
    };

    (0, _useTab.useTab)(elRef, emit);
    (0, _vue.onMounted)(function () {
      (0, _f.f7ready)(function () {
        if (props.ptr) {
          _f.f7.on('ptrPullStart', onPtrPullStart);

          _f.f7.on('ptrPullMove', onPtrPullMove);

          _f.f7.on('ptrPullEnd', onPtrPullEnd);

          _f.f7.on('ptrRefresh', onPtrRefresh);

          _f.f7.on('ptrDone', onPtrDone);
        }

        if (props.infinite) {
          _f.f7.on('infinite', onInfinite);
        }
      });
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (!_f.f7) return;

      _f.f7.off('ptrPullStart', onPtrPullStart);

      _f.f7.off('ptrPullMove', onPtrPullMove);

      _f.f7.off('ptrPullEnd', onPtrPullEnd);

      _f.f7.off('ptrRefresh', onPtrRefresh);

      _f.f7.off('ptrDone', onPtrDone);

      _f.f7.off('infinite', onInfinite);
    });
    var classes = (0, _vue.computed)(function () {
      return (0, _utils.classNames)('page-content', {
        tab: props.tab,
        'tab-active': props.tabActive,
        'ptr-content': props.ptr,
        'ptr-bottom': props.ptrBottom,
        'infinite-scroll-content': props.infinite,
        'infinite-scroll-top': props.infiniteTop,
        'hide-bars-on-scroll': props.hideBarsOnScroll,
        'hide-navbar-on-scroll': props.hideNavbarOnScroll,
        'hide-toolbar-on-scroll': props.hideToolbarOnScroll,
        'messages-content': props.messagesContent,
        'login-screen-content': props.loginScreen
      }, (0, _mixins.colorClasses)(props));
    });
    return {
      elRef: elRef,
      classes: classes
    };
  }
};
exports.default = _default;