/// <reference types="../.." />
/// <reference types="@hyper-ui/core" />

const { create: createRouter, Route, Link } = HRouter;

const historyRouter = { name: HRouter.DEFAULT_NAME, router: createRouter(HRouter.History) },
    hashRouter = { name: 'hash-router', router: createRouter(HRouter.Hash) },
    localRouter0 = { name: 'local-router-0', router: createRouter(HRouter.Local) },
    localRouter1 = { name: 'local-router-1', router: createRouter(HRouter.Local, { start: '/a' }) };

const getPlaceholder = (msg: string) =>
    HUI.define(`placeholder(${msg})`, { render() { return HUI('p', null, msg); } });

const app = (
    <HUI.Fragment>

        <h1>@hyper-ui/router - test</h1>

        <section>

            <h2>history routing</h2>

            <Route pattern={/^\//}>
                <p>path starts with "/"</p>
            </Route>
            <Route path="/" render={matched => matched && <p>'path is "/"'</p>} />
            <Route pattern={/^\/\w+/} component={getPlaceholder('path starts with "/" and a word')} />

            <Link href="/">/</Link>
            <br />

            <Link href="/foo">/foo</Link>
            <br />

            <Link href="/bar">/bar</Link>
            <br />

            <Link back>Back</Link>
            <br />

        </section>

    </HUI.Fragment>
);

HUI.render(app, {
    defaultContext: Object.assign({}, ...[
        historyRouter, hashRouter, localRouter0, localRouter1
    ].map(r => ({ [r.name]: r.router })))
});
