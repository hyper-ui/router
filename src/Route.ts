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
}

export interface RouteStoreHandlers {
    render(): unknown;
}

export const Route = HUI.define<RouteProps, HUI.Store<RouteStore, RouteStoreHandlers>>('HRouter.Route', {

    state: ['match'],

    defaultProps: {
        router: DEFAULT_NAME
    },

    effects: [
        function RouteEff(props, store, context) {

            const router = context.get(props.router!) as Router;

            const test: (path: string) => boolean =
                props.pattern ?
                    path => props.pattern!.test(path) :
                    path => path === props.path;

            store.set('match', test(router.getCurrent()));

            const listener: RouteListener = function Route_rtLis(path) {
                store.set('match', test(path));
            };

            router.addListener(listener);

            return function RouteClrEff() {
                router.removeListener(listener);
            };

        }
    ],

    init: function Route_init(props, store) {
        store.handle(
            'render',
            props.render ?
                () => props.render!(store.get('match')!) :
                props.component ?
                    () => store.get('match') && HUI(props.component!) :
                    () => store.get('match') && props.children
        );
    },

    render: function Route_render(props, store) {
        return store.trigger('render');
    }

});
