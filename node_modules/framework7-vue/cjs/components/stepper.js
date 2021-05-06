"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../shared/utils");

var _mixins = require("../shared/mixins");

var _f = require("../shared/f7");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _hoisted_1 = {
  key: 0,
  class: "stepper-input-wrap"
};
var _hoisted_2 = {
  key: 1,
  class: "stepper-value"
};

function render(_ctx, _cache) {
  return (0, _vue.openBlock)(), (0, _vue.createBlock)("div", {
    ref: "elRef",
    class: _ctx.classes
  }, [(0, _vue.createVNode)("div", {
    class: "stepper-button-minus",
    onClick: _cache[1] || (_cache[1] = function () {
      return _ctx.onMinusClick && _ctx.onMinusClick.apply(_ctx, arguments);
    })
  }), _ctx.input && !_ctx.buttonsOnly ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", _hoisted_1, [(0, _vue.createVNode)("input", {
    id: _ctx.inputId,
    name: _ctx.name,
    type: _ctx.inputType,
    min: _ctx.inputType === 'number' ? _ctx.min : undefined,
    max: _ctx.inputType === 'number' ? _ctx.max : undefined,
    step: _ctx.inputType === 'number' ? _ctx.step : undefined,
    value: _ctx.value,
    readonly: _ctx.inputReadonly,
    onInput: _cache[2] || (_cache[2] = function () {
      return _ctx.onInput && _ctx.onInput.apply(_ctx, arguments);
    }),
    onChange: _cache[3] || (_cache[3] = function () {
      return _ctx.onChange && _ctx.onChange.apply(_ctx, arguments);
    })
  }, null, 40, ["id", "name", "type", "min", "max", "step", "value", "readonly"])])) : (0, _vue.createCommentVNode)("", true), !_ctx.input && !_ctx.buttonsOnly ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", _hoisted_2, (0, _vue.toDisplayString)(_ctx.value), 1)) : (0, _vue.createCommentVNode)("", true), (0, _vue.createVNode)("div", {
    class: "stepper-button-plus",
    onClick: _cache[4] || (_cache[4] = function () {
      return _ctx.onPlusClick && _ctx.onPlusClick.apply(_ctx, arguments);
    })
  })], 2);
}

var _default = {
  name: 'f7-stepper',
  render: render,
  props: _extends({
    init: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    formatValue: Function,
    name: String,
    inputId: String,
    input: {
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    inputReadonly: {
      type: Boolean,
      default: false
    },
    autorepeat: {
      type: Boolean,
      default: false
    },
    autorepeatDynamic: {
      type: Boolean,
      default: false
    },
    wraps: {
      type: Boolean,
      default: false
    },
    manualInputMode: {
      type: Boolean,
      default: false
    },
    decimalPoint: {
      type: Number,
      default: 4
    },
    buttonsEndInputMode: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    buttonsOnly: Boolean,
    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    roundAurora: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    fillAurora: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    largeAurora: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    smallAurora: Boolean,
    raised: Boolean,
    raisedMd: Boolean,
    raisedIos: Boolean,
    raisedAurora: Boolean
  }, _mixins.colorProps),
  emits: ['input', 'change', 'stepper:minusclick', 'stepper:plusclick', 'stepper:change', 'update:value'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var f7Stepper = null;
    var elRef = (0, _vue.ref)(null);

    var increment = function increment() {
      if (!f7Stepper) return;
      f7Stepper.increment();
    };

    var decrement = function decrement() {
      if (!f7Stepper) return;
      f7Stepper.decrement();
    };

    var setValue = function setValue(newValue) {
      if (f7Stepper && f7Stepper.setValue) f7Stepper.setValue(newValue);
    };

    var getValue = function getValue() {
      if (f7Stepper && f7Stepper.getValue) {
        return f7Stepper.getValue();
      }

      return undefined;
    };

    var onInput = function onInput(event) {
      emit('input', event, f7Stepper);
    };

    var onChange = function onChange(event) {
      emit('change', event, f7Stepper);
    };

    var onMinusClick = function onMinusClick(event) {
      emit('stepper:minusclick', event, f7Stepper);
    };

    var onPlusClick = function onPlusClick(event) {
      emit('stepper:plusclick', event, f7Stepper);
    };

    (0, _vue.watch)(function () {
      return props.value;
    }, function (newValue) {
      if (!f7Stepper) return;
      f7Stepper.setValue(newValue);
    });
    (0, _vue.onMounted)(function () {
      (0, _f.f7ready)(function () {
        if (!props.init || !elRef.value) return;
        f7Stepper = _f.f7.stepper.create((0, _utils.noUndefinedProps)({
          el: elRef.value,
          min: props.min,
          max: props.max,
          value: props.value,
          step: props.step,
          formatValue: props.formatValue,
          autorepeat: props.autorepeat,
          autorepeatDynamic: props.autorepeatDynamic,
          wraps: props.wraps,
          manualInputMode: props.manualInputMode,
          decimalPoint: props.decimalPoint,
          buttonsEndInputMode: props.buttonsEndInputMode,
          on: {
            change: function change(stepper, newValue) {
              emit('stepper:change', newValue);
              emit('update:value', newValue);
            }
          }
        }));
      });
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (f7Stepper && f7Stepper.destroy) {
        f7Stepper.destroy();
      }

      f7Stepper = null;
    });
    var classes = (0, _vue.computed)(function () {
      return (0, _utils.classNames)('stepper', {
        disabled: props.disabled,
        'stepper-round': props.round,
        'stepper-round-ios': props.roundIos,
        'stepper-round-md': props.roundMd,
        'stepper-round-aurora': props.roundAurora,
        'stepper-fill': props.fill,
        'stepper-fill-ios': props.fillIos,
        'stepper-fill-md': props.fillMd,
        'stepper-fill-aurora': props.fillAurora,
        'stepper-large': props.large,
        'stepper-large-ios': props.largeIos,
        'stepper-large-md': props.largeMd,
        'stepper-large-aurora': props.largeAurora,
        'stepper-small': props.small,
        'stepper-small-ios': props.smallIos,
        'stepper-small-md': props.smallMd,
        'stepper-small-aurora': props.smallAurora,
        'stepper-raised': props.raised,
        'stepper-raised-ios': props.raisedIos,
        'stepper-raised-md': props.raisedMd,
        'stepper-raised-aurora': props.raisedAurora
      }, (0, _mixins.colorClasses)(props));
    });
    return {
      elRef: elRef,
      classes: classes,
      increment: increment,
      decrement: decrement,
      setValue: setValue,
      getValue: getValue,
      onInput: onInput,
      onChange: onChange,
      onMinusClick: onMinusClick,
      onPlusClick: onPlusClick
    };
  }
};
exports.default = _default;