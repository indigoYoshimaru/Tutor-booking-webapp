"use strict";

exports.__esModule = true;
exports.useIcon = void 0;

var useIcon = function useIcon(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      icon = _props.icon,
      iconMaterial = _props.iconMaterial,
      iconF7 = _props.iconF7,
      iconMd = _props.iconMd,
      iconIos = _props.iconIos,
      iconAurora = _props.iconAurora,
      iconColor = _props.iconColor,
      iconSize = _props.iconSize,
      iconBadge = _props.iconBadge,
      badgeColor = _props.badgeColor,
      iconBadgeColor = _props.iconBadgeColor;

  if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
    return {
      props: {
        material: iconMaterial,
        f7: iconF7,
        icon: icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize
      },
      badge: iconBadge || iconBadge === 0 ? {
        props: {
          color: badgeColor || iconBadgeColor
        },
        content: iconBadge
      } : null
    };
  }

  return null;
};

exports.useIcon = useIcon;