"use strict";
/// <reference types="../.." />
/// <reference types="@hyper-ui/core" />
const { create: createRouter, Route, Link } = HRouter;
const historyRouter = { name: HRouter.DEFAULT_NAME, router: createRouter(HRouter.History) }, hashRouter = { name: 'hash-router', router: createRouter(HRouter.Hash) }, localRouter0 = { name: 'local-router-0', router: createRouter(HRouter.Local) }, localRouter1 = { name: 'local-router-1', router: createRouter(HRouter.Local, { start: '/1a' }) };
const getPlaceholder = (msg) => HUI.define(`placeholder(${msg})`, { render() { return HUI('p', null, msg); } });
const getMatcher = (path) => ((matched) => (HUI("p", null,
    "path is",
    matched ? ' ' : ' not ',
    "\"",
    path,
    "\"")));
const ShowRoute = HUI.define('ShowRoute', {
    state: ['path'],
    defaultProps: {
        router: HRouter.DEFAULT_NAME
    },
    init(props, store, context) {
        const router = context.get(props.router);
        store.set('router', router);
        router.addListener(store.setter('path'));
    },
    render(props, store) {
        return HUI("p", null,
            "Current path: \"",
            store.get('router').getCurrent(),
            "\"");
    },
    clear(props, store) {
        store.get('router').removeListener(store.setter('path'));
    }
});
const app = (HUI(HUI.Fragment, null,
    HUI("h1", null, "@hyper-ui/router - test"),
    HUI("section", null,
        HUI("h2", null, "history routing"),
        HUI(ShowRoute, null),
        HUI(Route, { pattern: /^\// },
            HUI("p", null, "path starts with \"/\"")),
        HUI(Route, { path: "/", render: getMatcher('/') }),
        HUI(Route, { pattern: /^\/\w+/, component: getPlaceholder('path starts with "/" and a word') }),
        HUI(Link, { href: "/" }, "/"),
        HUI("br", null),
        HUI(Link, { href: "/foo" }, "/foo"),
        HUI("br", null),
        HUI(Link, { href: "/bar" }, "/bar"),
        HUI("br", null),
        HUI(Link, { back: true }, "Back"),
        HUI("br", null)),
    HUI("section", null,
        HUI("h2", null, "hash routing"),
        HUI(ShowRoute, { router: hashRouter.name }),
        HUI(Route, { router: hashRouter.name, pattern: /^\/a/ },
            HUI("p", null, "path starts with \"/a\"")),
        HUI(Route, { router: hashRouter.name, path: "/b", render: getMatcher('/b') }),
        HUI(Route, { router: hashRouter.name, pattern: /^\/\w{2}/, component: getPlaceholder('path starts with "/" and two letters') }),
        HUI(Link, { router: hashRouter.name, href: "/a" }, "/a"),
        HUI("br", null),
        HUI(Link, { router: hashRouter.name, href: "/b" }, "/b"),
        HUI("br", null),
        HUI(Link, { router: hashRouter.name, href: "/ab" }, "/ab"),
        HUI("br", null),
        HUI(Link, { router: hashRouter.name, back: true }, "Back"),
        HUI("br", null)),
    HUI("section", null,
        HUI("h2", null, "local routing 0"),
        HUI(ShowRoute, { router: localRouter0.name }),
        HUI(Route, { router: localRouter0.name, pattern: /^\/0a/ },
            HUI("p", null, "path starts with \"/0a\"")),
        HUI(Route, { router: localRouter0.name, path: "/0b", render: getMatcher('/0b') }),
        HUI(Route, { router: localRouter0.name, pattern: /^\/\w\d/, component: getPlaceholder('path starts with "/", a letter, and a digit') }),
        HUI(Link, { router: localRouter0.name, href: "/0a" }, "/0a"),
        HUI("br", null),
        HUI(Link, { router: localRouter0.name, href: "/0b" }, "/0b"),
        HUI("br", null),
        HUI(Link, { router: localRouter0.name, href: "/0ab" }, "/0ab"),
        HUI("br", null),
        HUI(Link, { router: localRouter0.name, back: true }, "Back"),
        HUI("br", null)),
    HUI("section", null,
        HUI("h2", null, "local routing 1"),
        HUI(ShowRoute, { router: localRouter1.name }),
        HUI(Route, { router: localRouter1.name, pattern: /^\/1a/ },
            HUI("p", null, "path starts with \"/1a\"")),
        HUI(Route, { router: localRouter1.name, path: "/1b", render: getMatcher('/1b') }),
        HUI(Route, { router: localRouter1.name, pattern: /^\/\w\d/, component: getPlaceholder('path starts with "/", a letter, and a digit') }),
        HUI(Link, { router: localRouter1.name, href: "/1a" }, "/1a"),
        HUI("br", null),
        HUI(Link, { router: localRouter1.name, href: "/1b" }, "/1b"),
        HUI("br", null),
        HUI(Link, { router: localRouter1.name, href: "/1ab" }, "/1ab"),
        HUI("br", null),
        HUI(Link, { router: localRouter1.name, back: true }, "Back"),
        HUI("br", null))));
HUI.render(app, {
    defaultContext: Object.assign({}, ...[
        historyRouter, hashRouter, localRouter0, localRouter1
    ].map(r => ({ [r.name]: r.router })))
});
