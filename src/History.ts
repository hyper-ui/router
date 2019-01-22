import { RouterFactory, RouteListener } from "./create";
import { dispatchRoute, _window, _location, _history } from "./utils";

export interface HistoryRouterOptions {
    dropHash?: boolean;
}

export const History: RouterFactory<HistoryRouterOptions> = function HistoryRouterFactory(options = {}) {

    const listeners = new Array<RouteListener>();

    _window.addEventListener('popstate', function historyRouter_popstateListener() {
        dispatchRoute(listeners, _location.pathname);
    });

    return {

        getCurrent: function historyRouter_getCurrent() {
            return _location.pathname;
        },

        push: function historyRouter_push(path: string) {
            if (!options.dropHash && !path.includes('#')) {
                path += _location.hash;
            }
            _history.pushState(null, '', path);
            dispatchRoute(listeners, path);
        },

        pop: function historyRouter_pop() {
            _history.back();
        },

        getHistorySize: function historyRouter_getHistorySize() {
            return _history.length;
        },

        addListener: function historyRouter_addListener(listener) {
            listeners.push(listener);
        },

        removeListener: function historyRouter_addListener(listener) {
            const index = listeners.indexOf(listener);
            if (~index) {
                listeners.splice(index, 1);
            }
        }

    };

};
