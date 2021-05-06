import { watch, onMounted, onBeforeUnmount } from 'vue';
import { f7, f7ready } from './f7';
export var useTooltip = function useTooltip(elRef, props) {
  var f7Tooltip = null;
  var tooltip = props.tooltip,
      tooltipTrigger = props.tooltipTrigger;
  onMounted(function () {
    if (!elRef.value) return;
    if (!tooltip) return;
    f7ready(function () {
      f7Tooltip = f7.tooltip.create({
        targetEl: elRef.value,
        text: tooltip,
        trigger: tooltipTrigger
      });
    });
  });
  onBeforeUnmount(function () {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });
  watch(function () {
    return props.tooltip;
  }, function (value) {
    if (!value && f7Tooltip) {
      f7Tooltip.destroy();
      f7Tooltip = null;
      return;
    }

    if (value && !f7Tooltip && f7) {
      f7Tooltip = f7.tooltip.create({
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