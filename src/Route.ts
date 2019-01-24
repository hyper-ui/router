import HUI from "@hyper-ui/core";
import { RouteListener, DEFAULT_NAME, Router } from "./create";

export type RouteRenderCallback = (matched: boolean) => unknown;

type HTypeOrSymbol = Parameters<typeof HUI>[0];

export interface RouteProps {
    router?: string;
    pattern?: RegExp;
    path?: string;
    render?: RouteRenderCallback;
    component?: HTypeOrSymbol;
    children?: unknown;
}

export interface RouteStore {
    match: boolean;
    router: Router;
    listener: RouteListener;
}

export type RouteStoreHandlers = {
    render(): unknown;
};

export const Route = HUI.define<RouteProps, RouteStore, any, RouteStoreHandlers, {}>('HRouter.Route', {

    state: ['match'],

    defaultProps: {
        router: DEFAULT_NAME
    },

    init: function Route_init(props, store, context) {

        const test: (path: string) => boolean =
            props.pattern ?
                path => props.pattern!.test(path) :
                path => path === props.path;

        const listener: RouteListener = function Route_rtLis(path) {
            store.set('match', test(path));
        };

        store.set('listener', listener);

        const router = context.get(props.router!) as Router;
        store.set('router', router);

        router.addListener(listener);

        store.set('match', test(router.getCurrent()));

        store.handle(
            'render',
            props.render ?
                function Route_renderer() { return props.render!(store.get('match')!); } :
                props.component ?
                    function Route_renderer() { return HUI(props.component!); } :
                    function Route_renderer() { return props.children; }
        );

    },

    render: function Route_render(props, store) {
        return store.get('match') && store.trigger('render');
    },

    clear: function Route_clear(props, store) {
        store.get('router')!.removeListener(store.get('listener')!);
    }

});
