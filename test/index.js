"use strict";
/// <reference types="../.." />
/// <reference types="@hyper-ui/core" />
const { create: createRouter, Route, Link } = HRouter;
const historyRouter = { name: HRouter.DEFAULT_NAME, router: createRouter(HRouter.History) }, hashRouter = { name: 'hash-router', router: createRouter(HRouter.Hash) }, localRouter0 = { name: 'local-router-0', router: createRouter(HRouter.Local) }, localRouter1 = { name: 'local-router-1', router: createRouter(HRouter.Local, { start: '/a' }) };
const getPlaceholder = (msg) => HUI.define(`placeholder(${msg})`, { render() { return HUI('p', null, msg); } });
const app = (HUI(HUI.Fragment, null,
    HUI("h1", null, "@hyper-ui/router - test"),
    HUI("section", null,
        HUI("h2", null, "history routing"),
        HUI(Route, { pattern: /^\// },
            HUI("p", null, "path starts with \"/\"")),
        HUI(Route, { path: "/", render: matched => matched && HUI("p", null, "'path is \"/\"'") }),
        HUI(Route, { pattern: /^\/\w+/, component: getPlaceholder('path starts with "/" and a word') }),
        HUI(Link, { href: "/" }, "/"),
        HUI("br", null),
        HUI(Link, { href: "/foo" }, "/foo"),
        HUI("br", null),
        HUI(Link, { href: "/bar" }, "/bar"),
        HUI("br", null),
        HUI(Link, { back: true }, "Back"),
        HUI("br", null))));
HUI.render(app, {
    defaultContext: Object.assign({}, ...[
        historyRouter, hashRouter, localRouter0, localRouter1
    ].map(r => ({ [r.name]: r.router })))
});
