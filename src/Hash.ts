import { RouterFactory, RouteListener } from "./create";
import { dispatchRoute, _location, _window } from "./utils";

const HASHBANG_PREFIX = '#!';

export const hash2path = (hash: string) =>
    hash.startsWith(HASHBANG_PREFIX + '/') ? hash.slice(HASHBANG_PREFIX.length) : '/';

const hashPathHistory = [hash2path(_location.hash)];
let curHashPath = hashPathHistory[hashPathHistory.length - 1];

export const Hash: RouterFactory<{}> = function HashRtFactory() {

    const listeners = new Array<RouteListener>();

    _window.addEventListener('hashchange', function hashRt_onpopstate() {
        const path = hash2path(_location.hash);
        if (path !== curHashPath) {
            hashPathHistory.push(curHashPath = path);
            dispatchRoute(listeners, path);
        }
    });

    return {

        getCurrent: function hashRt_getCur() {
            return curHashPath;
        },

        push: function hashRt_push(path: string) {
            _location.hash = HASHBANG_PREFIX + path;
        },

        pop: function hashRt_pop() {
            if (hashPathHistory.length > 1) {
                hashPathHistory.pop();
                _location.hash = HASHBANG_PREFIX + hashPathHistory.pop();
            }
        },

        getHistorySize: function hashRt_getHistSize() {
            return hashPathHistory.length;
        },

        addListener: function hashRt_addLis(listener) {
            listeners.push(listener);
        },

        removeListener: function hashRt_rmLis(listener) {
            const index = listeners.indexOf(listener);
            if (~index) {
                listeners.splice(index, 1);
            }
        },

        format: function hashRt_fmt(path) {
            return _location.href.split('#')[0] + HASHBANG_PREFIX + path;
        }

    };

};
