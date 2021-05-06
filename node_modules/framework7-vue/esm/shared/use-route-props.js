import { onMounted, onUpdated } from 'vue';
export var useRouteProps = function useRouteProps(elRef, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      routeProps = _ref.routeProps;

  onMounted(function () {
    if (elRef.value && routeProps) {
      elRef.value.f7RouteProps = routeProps;
    }
  });
  onUpdated(function () {
    if (elRef.value && routeProps) {
      elRef.value.f7RouteProps = routeProps;
    } else if (elRef.value && elRef.value.f7RouteProps) {
      delete elRef.value.f7RouteProps;
    }
  });
};