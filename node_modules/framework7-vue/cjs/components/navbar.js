"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../shared/utils");

var _mixins = require("../shared/mixins");

var _f = require("../shared/f7");

var _useTheme = require("../shared/use-theme");

var _navLeft = _interopRequireDefault(require("./nav-left"));

var _navTitle = _interopRequireDefault(require("./nav-title"));

var _navRight = _interopRequireDefault(require("./nav-right"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _hoisted_1 = /*#__PURE__*/(0, _vue.createVNode)("div", {
  class: "navbar-bg"
}, null, -1);

var _hoisted_2 = {
  key: 3,
  className: "title-large"
};
var _hoisted_3 = {
  className: "title-large-text"
};

function render(_ctx, _cache) {
  var _component_f7_nav_left = (0, _vue.resolveComponent)("f7-nav-left");

  var _component_f7_nav_title = (0, _vue.resolveComponent)("f7-nav-title");

  var _component_f7_nav_right = (0, _vue.resolveComponent)("f7-nav-right");

  return (0, _vue.openBlock)(), (0, _vue.createBlock)("div", {
    ref: "elRef",
    class: _ctx.classes
  }, [_hoisted_1, (0, _vue.renderSlot)(_ctx.$slots, "before-inner"), (0, _vue.createVNode)("div", {
    class: _ctx.innerClasses
  }, [_ctx.hasLeft ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_nav_left, {
    key: 0,
    "back-link": _ctx.backLink,
    "back-link-url": _ctx.backLinkUrl,
    "back-link-force": _ctx.backLinkForce,
    "back-link-show-text": _ctx.backLinkShowText,
    "onBack:click": _ctx.onBackClick
  }, {
    default: (0, _vue.withCtx)(function () {
      return [(0, _vue.renderSlot)(_ctx.$slots, "nav-left"), (0, _vue.renderSlot)(_ctx.$slots, "left")];
    }),
    _: 3
  }, 8, ["back-link", "back-link-url", "back-link-force", "back-link-show-text", "onBack:click"])) : (0, _vue.createCommentVNode)("", true), _ctx.hasTitle ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_nav_title, {
    key: 1,
    title: _ctx.title,
    subtitle: _ctx.subtitle
  }, {
    default: (0, _vue.withCtx)(function () {
      return [(0, _vue.renderSlot)(_ctx.$slots, "title")];
    }),
    _: 3
  }, 8, ["title", "subtitle"])) : (0, _vue.createCommentVNode)("", true), _ctx.hasRight ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_nav_right, {
    key: 2
  }, {
    default: (0, _vue.withCtx)(function () {
      return [(0, _vue.renderSlot)(_ctx.$slots, "nav-right"), (0, _vue.renderSlot)(_ctx.$slots, "right")];
    }),
    _: 3
  })) : (0, _vue.createCommentVNode)("", true), _ctx.hasLargeTitle ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", _hoisted_2, [(0, _vue.createVNode)("div", _hoisted_3, [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(_ctx.largeTitle) + " ", 1), (0, _vue.renderSlot)(_ctx.$slots, "title-large")])])) : (0, _vue.createCommentVNode)("", true), (0, _vue.renderSlot)(_ctx.$slots, "default")], 2), (0, _vue.renderSlot)(_ctx.$slots, "after-inner")], 2);
}

var _default = {
  name: 'f7-navbar',
  render: render,
  components: {
    f7NavLeft: _navLeft.default,
    f7NavTitle: _navTitle.default,
    f7NavRight: _navRight.default
  },
  props: _extends({
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined
    },
    sliding: {
      type: Boolean,
      default: true
    },
    title: String,
    subtitle: String,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    innerClass: String,
    innerClassName: String,
    large: Boolean,
    largeTransparent: Boolean,
    transparent: Boolean,
    titleLarge: String
  }, _mixins.colorProps),
  emits: ['navbar:hide', 'navbar:show', 'navbar:expand', 'navbar:collapse', 'navbar:transparentshow', 'navbar:transparenthide', 'click:back', 'back:click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var routerPositionClass = '';
    var largeCollapsed = false;
    var routerNavbarRole = null;
    var routerNavbarRoleDetailRoot = false;
    var routerNavbarMasterStack = false;
    var transparentVisible = false;
    var elRef = (0, _vue.ref)(null);
    var theme = (0, _useTheme.useTheme)();

    var onHide = function onHide(navbarEl) {
      if (elRef.value !== navbarEl) return;
      emit('navbar:hide');
    };

    var onShow = function onShow(navbarEl) {
      if (elRef.value !== navbarEl) return;
      emit('navbar:show');
    };

    var onExpand = function onExpand(navbarEl) {
      if (elRef.value !== navbarEl) return;
      largeCollapsed = false;
      emit('navbar:expand');
    };

    var onCollapse = function onCollapse(navbarEl) {
      if (elRef.value !== navbarEl) return;
      largeCollapsed = true;
      emit('navbar:collapse');
    };

    var onNavbarTransparentShow = function onNavbarTransparentShow(navbarEl) {
      if (elRef.value !== navbarEl) return;
      transparentVisible = true;
      emit('navbar:transparentshow');
    };

    var onNavbarTransparentHide = function onNavbarTransparentHide(navbarEl) {
      if (elRef.value !== navbarEl) return;
      transparentVisible = false;
      emit('navbar:transparenthide');
    };

    var onNavbarPosition = function onNavbarPosition(navbarEl, position) {
      if (elRef.value !== navbarEl) return;
      routerPositionClass = position ? "navbar-" + position : '';
    };

    var onNavbarRole = function onNavbarRole(navbarEl, rolesData) {
      if (elRef.value !== navbarEl) return;
      routerNavbarRole = rolesData.role;
      routerNavbarRoleDetailRoot = rolesData.detailRoot;
    };

    var onNavbarMasterStack = function onNavbarMasterStack(navbarEl) {
      if (elRef.value !== navbarEl) return;
      routerNavbarMasterStack = true;
    };

    var onNavbarMasterUnstack = function onNavbarMasterUnstack(navbarEl) {
      if (elRef.value !== navbarEl) return;
      routerNavbarMasterStack = false;
    };

    var hide = function hide(animate) {
      if (!_f.f7) return;

      _f.f7.navbar.hide(elRef.value, animate);
    };

    var show = function show(animate) {
      if (!_f.f7) return;

      _f.f7.navbar.show(elRef.value, animate);
    };

    var size = function size() {
      if (!_f.f7) return;

      _f.f7.navbar.size(elRef.value);
    };

    var onBackClick = function onBackClick(event) {
      emit('back:click', event);
      emit('click:back', event);
    };

    (0, _vue.onMounted)(function () {
      if (!elRef.value) return;
      (0, _f.f7ready)(function () {
        _f.f7.navbar.size(elRef.value);

        _f.f7.on('navbarShow', onShow);

        _f.f7.on('navbarHide', onHide);

        _f.f7.on('navbarCollapse', onCollapse);

        _f.f7.on('navbarExpand', onExpand);

        _f.f7.on('navbarPosition', onNavbarPosition);

        _f.f7.on('navbarRole', onNavbarRole);

        _f.f7.on('navbarMasterStack', onNavbarMasterStack);

        _f.f7.on('navbarMasterUnstack', onNavbarMasterUnstack);

        _f.f7.on('navbarTransparentShow', onNavbarTransparentShow);

        _f.f7.on('navbarTransparentHide', onNavbarTransparentHide);
      });
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (!_f.f7) return;

      _f.f7.off('navbarShow', onShow);

      _f.f7.off('navbarHide', onHide);

      _f.f7.off('navbarCollapse', onCollapse);

      _f.f7.off('navbarExpand', onExpand);

      _f.f7.off('navbarPosition', onNavbarPosition);

      _f.f7.off('navbarRole', onNavbarRole);

      _f.f7.off('navbarMasterStack', onNavbarMasterStack);

      _f.f7.off('navbarMasterUnstack', onNavbarMasterUnstack);

      _f.f7.off('navbarTransparentShow', onNavbarTransparentShow);

      _f.f7.off('navbarTransparentHide', onNavbarTransparentHide);
    });
    var addLeftTitleClass = (0, _vue.computed)(function () {
      return theme.value && theme.value.ios && _f.f7 && !_f.f7.params.navbar.iosCenterTitle;
    });
    var addCenterTitleClass = (0, _vue.computed)(function () {
      return theme.value && theme.value.md && _f.f7 && _f.f7.params.navbar.mdCenterTitle || theme.value && theme.value.aurora && _f.f7 && _f.f7.params.navbar.auroraCenterTitle;
    });
    var isLarge = (0, _vue.computed)(function () {
      return props.large || props.largeTransparent;
    });
    var isTransparent = (0, _vue.computed)(function () {
      return props.transparent || isLarge.value && props.largeTransparent;
    });
    var isTransparentVisible = (0, _vue.computed)(function () {
      return isTransparent.value && transparentVisible;
    });
    var classes = (0, _vue.computed)(function () {
      return (0, _utils.classNames)('navbar', routerPositionClass, {
        'navbar-hidden': props.hidden,
        'navbar-large': isLarge.value,
        'navbar-large-collapsed': isLarge.value && largeCollapsed,
        'navbar-transparent': isTransparent.value,
        'navbar-transparent-visible': isTransparentVisible.value,
        'navbar-master': routerNavbarRole === 'master',
        'navbar-master-detail': routerNavbarRole === 'detail',
        'navbar-master-detail-root': routerNavbarRoleDetailRoot === true,
        'navbar-master-stacked': routerNavbarMasterStack === true,
        'no-shadow': props.noShadow,
        'no-hairline': props.noHairline
      }, (0, _mixins.colorClasses)(props));
    });
    var largeTitle = (0, _vue.computed)(function () {
      var largeTitleText = props.titleLarge;
      if (!largeTitleText && props.large && props.title) largeTitleText = props.title;
      return largeTitleText;
    });
    var hasLeft = (0, _vue.computed)(function () {
      return props.backLink || slots['nav-left'] || slots.left;
    });
    var hasTitle = (0, _vue.computed)(function () {
      return props.title || props.subtitle || slots.title;
    });
    var hasRight = (0, _vue.computed)(function () {
      return slots['nav-right'] || slots.right;
    });
    var hasLargeTitle = (0, _vue.computed)(function () {
      return largeTitle.value || slots['title-large'];
    });
    var innerClasses = (0, _vue.computed)(function () {
      return (0, _utils.classNames)('navbar-inner', props.innerClass, props.innerClassName, {
        sliding: props.sliding,
        'navbar-inner-left-title': addLeftTitleClass.value,
        'navbar-inner-centered-title': addCenterTitleClass.value
      });
    });
    return {
      elRef: elRef,
      classes: classes,
      innerClasses: innerClasses,
      hide: hide,
      show: show,
      size: size,
      largeTitle: largeTitle,
      hasLeft: hasLeft,
      hasTitle: hasTitle,
      hasRight: hasRight,
      hasLargeTitle: hasLargeTitle,
      onBackClick: onBackClick
    };
  }
};
exports.default = _default;