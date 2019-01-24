import { RouteListener } from "./create";

export const _window = window,
    { history: _history, location: _location } = _window,
    { assign: _assign } = Object;

export const dispatchRoute = function dispatchRt(listeners: RouteListener[], path: string) {
    listeners.forEach(listener => {
        listener(path);
    });
};

export const FAKE_HREF = 'javascript:;';
