"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../shared/utils");

var _mixins = require("../shared/mixins");

var _f = require("../shared/f7");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function render(_ctx, _cache) {
  return (0, _vue.openBlock)(), (0, _vue.createBlock)("span", {
    ref: "elRef",
    class: _ctx.classes,
    "data-progress": _ctx.progress
  }, [(0, _vue.createVNode)("span", {
    style: _ctx.transformStyle
  }, null, 4)], 10, ["data-progress"]);
}

var _default = {
  name: 'f7-progressbar',
  render: render,
  props: _extends({
    progress: Number,
    infinite: Boolean
  }, _mixins.colorProps),
  setup: function setup(props) {
    var elRef = (0, _vue.ref)(null);

    var set = function set(newProgress, speed) {
      if (!_f.f7) return;

      _f.f7.progressbar.set(elRef.value, newProgress, speed);
    };

    var transformStyle = (0, _vue.computed)(function () {
      return {
        transform: props.progress ? "translate3d(" + (-100 + props.progress) + "%, 0, 0)" : '',
        WebkitTransform: props.progress ? "translate3d(" + (-100 + props.progress) + "%, 0, 0)" : ''
      };
    });
    var classes = (0, _vue.computed)(function () {
      return (0, _utils.classNames)('progressbar', {
        'progressbar-infinite': props.infinite
      }, (0, _mixins.colorClasses)(props));
    });
    return {
      classes: classes,
      set: set,
      transformStyle: transformStyle,
      elRef: elRef
    };
  }
};
exports.default = _default;