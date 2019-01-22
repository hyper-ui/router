import { RouterFactory, RouteListener } from "./create";
import { dispatchRoute } from "./utils";

export interface LocalRouterOptions {
    start?: string;
}

export const Local: RouterFactory<LocalRouterOptions> = function LocalRouterFactory(options = {}) {

    const listeners = new Array<RouteListener>(),
        localPathHistory = [options.start || '/'];
    let curPath = localPathHistory[0];

    return {

        getCurrent: function localRouter_getCurrent() {
            return curPath;
        },

        push: function localRouter_push(path: string) {
            if (path !== curPath) {
                localPathHistory.push(curPath = path);
                dispatchRoute(listeners, path);
            }
        },

        pop: function localRouter_pop() {
            const historySize = localPathHistory.length;
            if (historySize > 1) {
                localPathHistory.pop();
                dispatchRoute(listeners, curPath = localPathHistory[historySize - 1]);
            }
        },

        getHistorySize: function localRouter_getHistorySize() {
            return localPathHistory.length;
        },

        addListener: function localRouter_addListener(listener) {
            listeners.push(listener);
        },

        removeListener: function localRouter_addListener(listener) {
            const index = listeners.indexOf(listener);
            if (~index) {
                listeners.splice(index, 1);
            }
        }

    };

};
