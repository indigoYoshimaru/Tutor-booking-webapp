"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _icon = _interopRequireDefault(require("./icon"));

var _badge = _interopRequireDefault(require("./badge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(_ctx, _cache) {
  var _component_f7_badge = (0, _vue.resolveComponent)("f7-badge");

  var _component_f7_icon = (0, _vue.resolveComponent)("f7-icon");

  return (0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_icon, _ctx.icon.props, {
    default: (0, _vue.withCtx)(function () {
      return [_ctx.icon.badge ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_component_f7_badge, (0, _vue.mergeProps)({
        key: 0
      }, _ctx.icon.badge.props), {
        default: (0, _vue.withCtx)(function () {
          return [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(_ctx.icon.badge.content), 1)];
        }),
        _: 1
      }, 16)) : (0, _vue.createCommentVNode)("", true)];
    }),
    _: 1
  }, 16);
}

var _default = {
  name: 'f7-use-icon',
  render: render,
  components: {
    f7Icon: _icon.default,
    f7Badge: _badge.default
  },
  props: {
    icon: Object
  }
};
exports.default = _default;