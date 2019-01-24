import { RouterFactory, RouteListener } from "./create";
import { dispatchRoute, FAKE_HREF } from "./utils";

export interface LocalRouterOptions {
    start?: string;
}

export const Local: RouterFactory<LocalRouterOptions> = function LocalRtFactory(options = {}) {

    const listeners = new Array<RouteListener>(),
        localPathHistory = [options.start || '/'];
    let curPath = localPathHistory[0];

    return {

        getCurrent: function localRt_getCur() {
            return curPath;
        },

        push: function localRt_push(path: string) {
            if (path !== curPath) {
                localPathHistory.push(curPath = path);
                dispatchRoute(listeners, path);
            }
        },

        pop: function localRt_pop() {
            const historySize = localPathHistory.length;
            if (historySize > 1) {
                localPathHistory.pop();
                dispatchRoute(listeners, curPath = localPathHistory[historySize - 2]);
            }
        },

        getHistorySize: function localRt_getHistSize() {
            return localPathHistory.length;
        },

        addListener: function localRt_addLis(listener) {
            listeners.push(listener);
        },

        removeListener: function localRt_rmLis(listener) {
            const index = listeners.indexOf(listener);
            if (~index) {
                listeners.splice(index, 1);
            }
        },

        format: function localRt_fmt(path) {
            return FAKE_HREF;
        }

    };

};
