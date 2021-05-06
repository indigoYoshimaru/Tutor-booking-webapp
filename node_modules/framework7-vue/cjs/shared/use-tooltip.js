"use strict";

exports.__esModule = true;
exports.useTooltip = void 0;

var _vue = require("vue");

var _f = require("./f7");

var useTooltip = function useTooltip(elRef, props) {
  var f7Tooltip = null;
  var tooltip = props.tooltip,
      tooltipTrigger = props.tooltipTrigger;
  (0, _vue.onMounted)(function () {
    if (!elRef.value) return;
    if (!tooltip) return;
    (0, _f.f7ready)(function () {
      f7Tooltip = _f.f7.tooltip.create({
        targetEl: elRef.value,
        text: tooltip,
        trigger: tooltipTrigger
      });
    });
  });
  (0, _vue.onBeforeUnmount)(function () {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });
  (0, _vue.watch)(function () {
    return props.tooltip;
  }, function (value) {
    if (!value && f7Tooltip) {
      f7Tooltip.destroy();
      f7Tooltip = null;
      return;
    }

    if (value && !f7Tooltip && _f.f7) {
      f7Tooltip = _f.f7.tooltip.create({
        targetEl: elRef.value,
        text: value,
        trigger: tooltipTrigger
      });
      return;
    }

    if (!value || !f7Tooltip) return;
    f7Tooltip.setText(value);
  });
};

exports.useTooltip = useTooltip;