"use strict";

exports.__esModule = true;
exports.useTheme = void 0;

var _vue = require("vue");

var _f = require("./f7");

var useTheme = function useTheme() {
  var t = (0, _vue.ref)(_f.f7 ? _f.theme : null);

  if (!_f.f7) {
    (0, _f.f7ready)(function () {
      t.value = _f.theme;
    });
  }

  return t;
};

exports.useTheme = useTheme;