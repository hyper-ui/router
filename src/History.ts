import { RouterFactory, RouteListener } from "./create";
import { dispatchRoute, _window, _location, _history } from "./utils";

export interface HistoryRouterOptions {
    dropHash?: boolean;
}

export const History: RouterFactory<HistoryRouterOptions> = function HistRtFactory(options = {}) {

    const listeners = new Array<RouteListener>();

    _window.addEventListener('popstate', function histRt_onpopstate() {
        dispatchRoute(listeners, _location.pathname);
    });

    return {

        getCurrent: function histRt_getCur() {
            return _location.pathname;
        },

        push: function histRt_push(path: string) {
            if (!options.dropHash && !path.includes('#')) {
                path += _location.hash;
            }
            _history.pushState(null, '', path);
            dispatchRoute(listeners, path);
        },

        pop: function histRt_pop() {
            _history.back();
        },

        getHistorySize: function histRt_getHistSize() {
            return _history.length;
        },

        addListener: function histRt_addLis(listener) {
            listeners.push(listener);
        },

        removeListener: function histRt_rmLis(listener) {
            const index = listeners.indexOf(listener);
            if (~index) {
                listeners.splice(index, 1);
            }
        },

        format: function histRt_fmt(path) {
            return path;
        }

    };

};
