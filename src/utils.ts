import { RouteListener } from "./create";

export const _window = window,
    { history: _history, location: _location } = _window,
    { assign: _assign } = Object;

export const dispatchRoute = function (listeners: RouteListener[], path: string) {
    listeners.forEach(listener => {
        listener(path);
    });
};
