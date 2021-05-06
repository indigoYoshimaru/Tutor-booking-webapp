function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { createVNode as _createVNode, renderSlot as _renderSlot, resolveComponent as _resolveComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode } from "vue";

var _hoisted_1 = /*#__PURE__*/_createVNode("div", {
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
  var _component_f7_nav_left = _resolveComponent("f7-nav-left");

  var _component_f7_nav_title = _resolveComponent("f7-nav-title");

  var _component_f7_nav_right = _resolveComponent("f7-nav-right");

  return _openBlock(), _createBlock("div", {
    ref: "elRef",
    class: _ctx.classes
  }, [_hoisted_1, _renderSlot(_ctx.$slots, "before-inner"), _createVNode("div", {
    class: _ctx.innerClasses
  }, [_ctx.hasLeft ? (_openBlock(), _createBlock(_component_f7_nav_left, {
    key: 0,
    "back-link": _ctx.backLink,
    "back-link-url": _ctx.backLinkUrl,
    "back-link-force": _ctx.backLinkForce,
    "back-link-show-text": _ctx.backLinkShowText,
    "onBack:click": _ctx.onBackClick
  }, {
    default: _withCtx(function () {
      return [_renderSlot(_ctx.$slots, "nav-left"), _renderSlot(_ctx.$slots, "left")];
    }),
    _: 3
  }, 8, ["back-link", "back-link-url", "back-link-force", "back-link-show-text", "onBack:click"])) : _createCommentVNode("", true), _ctx.hasTitle ? (_openBlock(), _createBlock(_component_f7_nav_title, {
    key: 1,
    title: _ctx.title,
    subtitle: _ctx.subtitle
  }, {
    default: _withCtx(function () {
      return [_renderSlot(_ctx.$slots, "title")];
    }),
    _: 3
  }, 8, ["title", "subtitle"])) : _createCommentVNode("", true), _ctx.hasRight ? (_openBlock(), _createBlock(_component_f7_nav_right, {
    key: 2
  }, {
    default: _withCtx(function () {
      return [_renderSlot(_ctx.$slots, "nav-right"), _renderSlot(_ctx.$slots, "right")];
    }),
    _: 3
  })) : _createCommentVNode("", true), _ctx.hasLargeTitle ? (_openBlock(), _createBlock("div", _hoisted_2, [_createVNode("div", _hoisted_3, [_createTextVNode(_toDisplayString(_ctx.largeTitle) + " ", 1), _renderSlot(_ctx.$slots, "title-large")])])) : _createCommentVNode("", true), _renderSlot(_ctx.$slots, "default")], 2), _renderSlot(_ctx.$slots, "after-inner")], 2);
}

import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';
import { useTheme } from '../shared/use-theme';
import f7NavLeft from './nav-left';
import f7NavTitle from './nav-title';
import f7NavRight from './nav-right';
export default {
  name: 'f7-navbar',
  render: render,
  components: {
    f7NavLeft: f7NavLeft,
    f7NavTitle: f7NavTitle,
    f7NavRight: f7NavRight
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
  }, colorProps),
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
    var elRef = ref(null);
    var theme = useTheme();

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
      if (!f7) return;
      f7.navbar.hide(elRef.value, animate);
    };

    var show = function show(animate) {
      if (!f7) return;
      f7.navbar.show(elRef.value, animate);
    };

    var size = function size() {
      if (!f7) return;
      f7.navbar.size(elRef.value);
    };

    var onBackClick = function onBackClick(event) {
      emit('back:click', event);
      emit('click:back', event);
    };

    onMounted(function () {
      if (!elRef.value) return;
      f7ready(function () {
        f7.navbar.size(elRef.value);
        f7.on('navbarShow', onShow);
        f7.on('navbarHide', onHide);
        f7.on('navbarCollapse', onCollapse);
        f7.on('navbarExpand', onExpand);
        f7.on('navbarPosition', onNavbarPosition);
        f7.on('navbarRole', onNavbarRole);
        f7.on('navbarMasterStack', onNavbarMasterStack);
        f7.on('navbarMasterUnstack', onNavbarMasterUnstack);
        f7.on('navbarTransparentShow', onNavbarTransparentShow);
        f7.on('navbarTransparentHide', onNavbarTransparentHide);
      });
    });
    onBeforeUnmount(function () {
      if (!f7) return;
      f7.off('navbarShow', onShow);
      f7.off('navbarHide', onHide);
      f7.off('navbarCollapse', onCollapse);
      f7.off('navbarExpand', onExpand);
      f7.off('navbarPosition', onNavbarPosition);
      f7.off('navbarRole', onNavbarRole);
      f7.off('navbarMasterStack', onNavbarMasterStack);
      f7.off('navbarMasterUnstack', onNavbarMasterUnstack);
      f7.off('navbarTransparentShow', onNavbarTransparentShow);
      f7.off('navbarTransparentHide', onNavbarTransparentHide);
    });
    var addLeftTitleClass = computed(function () {
      return theme.value && theme.value.ios && f7 && !f7.params.navbar.iosCenterTitle;
    });
    var addCenterTitleClass = computed(function () {
      return theme.value && theme.value.md && f7 && f7.params.navbar.mdCenterTitle || theme.value && theme.value.aurora && f7 && f7.params.navbar.auroraCenterTitle;
    });
    var isLarge = computed(function () {
      return props.large || props.largeTransparent;
    });
    var isTransparent = computed(function () {
      return props.transparent || isLarge.value && props.largeTransparent;
    });
    var isTransparentVisible = computed(function () {
      return isTransparent.value && transparentVisible;
    });
    var classes = computed(function () {
      return classNames('navbar', routerPositionClass, {
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
      }, colorClasses(props));
    });
    var largeTitle = computed(function () {
      var largeTitleText = props.titleLarge;
      if (!largeTitleText && props.large && props.title) largeTitleText = props.title;
      return largeTitleText;
    });
    var hasLeft = computed(function () {
      return props.backLink || slots['nav-left'] || slots.left;
    });
    var hasTitle = computed(function () {
      return props.title || props.subtitle || slots.title;
    });
    var hasRight = computed(function () {
      return slots['nav-right'] || slots.right;
    });
    var hasLargeTitle = computed(function () {
      return largeTitle.value || slots['title-large'];
    });
    var innerClasses = computed(function () {
      return classNames('navbar-inner', props.innerClass, props.innerClassName, {
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