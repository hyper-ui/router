import { RouterFactory, RouteListener } from "./create";
import { dispatchRoute, _location, _window } from "./utils";

export const getPathFromHash = (hash: string) => hash.startsWith('#/') ? hash.slice(1) : '/';

const hashPathHistory = [getPathFromHash(_location.hash)];
let curHashPath = hashPathHistory[hashPathHistory.length - 1];

export const Hash: RouterFactory<{}> = function HashRouterFactory() {

    const listeners = new Array<RouteListener>();

    _window.addEventListener('hashchange', function hashRouter_popstateListener() {
        const path = getPathFromHash(_location.hash);
        if (path !== curHashPath) {
            hashPathHistory.push(curHashPath = path);
            dispatchRoute(listeners, path);
        }
    });

    return {

        getCurrent: function hashRouter_getCurrent() {
            return curHashPath;
        },

        push: function hashRouter_push(path: string) {
            _location.hash = path;
        },

        pop: function hashRouter_pop() {
            const historySize = hashPathHistory.length;
            if (historySize > 1) {
                _location.hash = hashPathHistory.pop()!;
                curHashPath = hashPathHistory[historySize - 1];
            }
        },

        getHistorySize: function hashRouter_getHistorySize() {
            return hashPathHistory.length;
        },

        addListener: function hashRouter_addListener(listener) {
            listeners.push(listener);
        },

        removeListener: function hashRouter_addListener(listener) {
            const index = listeners.indexOf(listener);
            if (~index) {
                listeners.splice(index, 1);
            }
        }

    };

};
