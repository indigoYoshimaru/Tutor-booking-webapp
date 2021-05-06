"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../shared/utils");

var _mixins = require("../shared/mixins");

var _f = require("../shared/f7");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function render(_ctx, _cache) {
  return (0, _vue.openBlock)(), (0, _vue.createBlock)("div", {
    ref: "elRef",
    class: _ctx.classes
  }, [(0, _vue.renderSlot)(_ctx.$slots, "default")], 2);
}

var _default = {
  name: 'f7-accordion-item',
  render: render,
  props: _extends({
    opened: Boolean
  }, _mixins.colorProps),
  emits: ['accordion:beforeopen', 'accordion:open', 'accordion:opened', 'accordion:beforeclose', 'accordion:close', 'accordion:closed'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var elRef = (0, _vue.ref)(null);

    var onBeforeOpen = function onBeforeOpen(el, prevent) {
      if (elRef.value !== el) return;
      emit('accordion:beforeopen', prevent);
    };

    var onOpen = function onOpen(el) {
      if (elRef.value !== el) return;
      emit('accordion:open');
    };

    var onOpened = function onOpened(el) {
      if (elRef.value !== el) return;
      emit('accordion:opened');
    };

    var onBeforeClose = function onBeforeClose(el, prevent) {
      if (elRef.value !== el) return;
      emit('accordion:beforeclose', prevent);
    };

    var onClose = function onClose(el) {
      if (elRef.value !== el) return;
      emit('accordion:close');
    };

    var onClosed = function onClosed(el) {
      if (elRef.value !== el) return;
      emit('accordion:closed');
    };

    var attachEvents = function attachEvents() {
      (0, _f.f7ready)(function () {
        _f.f7.on('accordionBeforeOpen', onBeforeOpen);

        _f.f7.on('accordionOpen', onOpen);

        _f.f7.on('accordionOpened', onOpened);

        _f.f7.on('accordionBeforeClose', onBeforeClose);

        _f.f7.on('accordionClose', onClose);

        _f.f7.on('accordionClosed', onClosed);
      });
    };

    var detachEvents = function detachEvents() {
      _f.f7.off('accordionBeforeOpen', onBeforeOpen);

      _f.f7.off('accordionOpen', onOpen);

      _f.f7.off('accordionOpened', onOpened);

      _f.f7.off('accordionBeforeClose', onBeforeClose);

      _f.f7.off('accordionClose', onClose);

      _f.f7.off('accordionClosed', onClosed);
    };

    (0, _vue.onMounted)(function () {
      return attachEvents();
    });
    (0, _vue.onBeforeUnmount)(function () {
      return detachEvents();
    });
    var classes = (0, _vue.computed)(function () {
      return (0, _utils.classNames)('accordion-item', {
        'accordion-item-opened': props.opened
      }, (0, _mixins.colorClasses)(props));
    });
    return {
      elRef: elRef,
      classes: classes
    };
  }
};
exports.default = _default;