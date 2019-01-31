import HUI from "@hyper-ui/core";
import { Router, DEFAULT_NAME } from "./create";
import { _assign, FAKE_HREF } from "./utils";

export type ClickLinkListener = (event: MouseEvent) => unknown;

export type LinkProps = HUI.EleProps<HTMLAnchorElement> & {
    router?: string;
    onclick?: ClickLinkListener;
    back?: boolean;
    href?: string;
};

export interface LinkStore {
    router: Router;
    props: object;
}

export const Link = HUI.define<LinkProps, HUI.Store<LinkStore>, HUI.Store<any>>('HRouter.Link', {

    defaultProps: {
        router: DEFAULT_NAME
    },

    init: function Link_init(props, store, context) {

        const router = context.get(props.router!) as Router;

        store.set('router', router);

        const anchorProps = _assign({}, props);
        store.set('props', anchorProps);

        delete anchorProps.children;
        delete anchorProps.router;
        delete anchorProps.back;

        anchorProps.href = props.back ? FAKE_HREF : router.format(props.href!);

        anchorProps.onclick = function Link_onclick(event) {

            let returnValue: unknown;

            if (props.onclick) {
                returnValue = props.onclick.call(this, event);
            }

            if (!event.defaultPrevented) {
                event.preventDefault();
                if (props.back) {
                    router.pop();
                } else if (props.href) {
                    router.push(props.href);
                }
            }

            return returnValue;

        };

    },

    render: function Link_render(props, store) {
        return HUI('a', store.get('props'), props.children);
    }

});
