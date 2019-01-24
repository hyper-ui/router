/// <reference types="../.." />
/// <reference types="@hyper-ui/core" />

const { create: createRouter, Route, Link } = HRouter;

const historyRouter = { name: HRouter.DEFAULT_NAME, router: createRouter(HRouter.History) },
    hashRouter = { name: 'hash-router', router: createRouter(HRouter.Hash) },
    localRouter0 = { name: 'local-router-0', router: createRouter(HRouter.Local) },
    localRouter1 = { name: 'local-router-1', router: createRouter(HRouter.Local, { start: '/1a' }) };

const getPlaceholder = (msg: string) =>
    HUI.define(`placeholder(${msg})`, { render() { return HUI('p', null, msg); } });

const getMatcher = (path: string) => (
    (matched: boolean) => (
        <p>
            path is
            {matched ? ' ' : ' not '}
            "{path}"
        </p>
    )
);

interface ShowRouteProps {
    router?: string;
}
interface ShowRouteStore {
    router: HRouter.Router;
    path: string
}
const ShowRoute = HUI.define<ShowRouteProps, ShowRouteStore>('ShowRoute', {

    state: ['path'],

    defaultProps: {
        router: HRouter.DEFAULT_NAME
    },

    init(props, store, context) {

        const router = context.get(props.router!) as HRouter.Router;
        store.set('router', router);

        router.addListener(store.setter('path'));

    },

    render(props, store) {
        return <p>Current path: "{store.get('router')!.getCurrent()}"</p>;
    },

    clear(props, store) {
        store.get('router')!.removeListener(store.setter('path'));
    }


});

const app = (
    <HUI.Fragment>

        <h1>@hyper-ui/router - test</h1>

        <section>

            <h2>history routing</h2>

            <ShowRoute />

            <Route pattern={/^\//}>
                <p>path starts with "/"</p>
            </Route>
            <Route path="/" render={getMatcher('/')} />
            <Route pattern={/^\/\w+/} component={
                getPlaceholder('path starts with "/" and a word')
            } />

            <Link href="/">/</Link>
            <br />
            <Link href="/foo">/foo</Link>
            <br />
            <Link href="/bar">/bar</Link>
            <br />
            <Link back>Back</Link>
            <br />

        </section>

        <section>

            <h2>hash routing</h2>

            <ShowRoute router={hashRouter.name} />

            <Route router={hashRouter.name} pattern={/^\/a/}>
                <p>path starts with "/a"</p>
            </Route>
            <Route router={hashRouter.name} path="/b" render={getMatcher('/b')} />
            <Route router={hashRouter.name} pattern={/^\/\w{2}/} component={
                getPlaceholder('path starts with "/" and two letters')
            } />

            <Link router={hashRouter.name} href="/a">/a</Link>
            <br />
            <Link router={hashRouter.name} href="/b">/b</Link>
            <br />
            <Link router={hashRouter.name} href="/ab">/ab</Link>
            <br />
            <Link router={hashRouter.name} back>Back</Link>
            <br />

        </section>

        <section>

            <h2>local routing 0</h2>

            <ShowRoute router={localRouter0.name} />

            <Route router={localRouter0.name} pattern={/^\/0a/}>
                <p>path starts with "/0a"</p>
            </Route>
            <Route router={localRouter0.name} path="/0b" render={getMatcher('/0b')} />
            <Route router={localRouter0.name} pattern={/^\/\w\d/} component={
                getPlaceholder('path starts with "/", a letter, and a digit')
            } />

            <Link router={localRouter0.name} href="/0a">/0a</Link>
            <br />
            <Link router={localRouter0.name} href="/0b">/0b</Link>
            <br />
            <Link router={localRouter0.name} href="/0ab">/0ab</Link>
            <br />
            <Link router={localRouter0.name} back>Back</Link>
            <br />

        </section>

        <section>

            <h2>local routing 1</h2>

            <ShowRoute router={localRouter1.name} />

            <Route router={localRouter1.name} pattern={/^\/1a/}>
                <p>path starts with "/1a"</p>
            </Route>
            <Route router={localRouter1.name} path="/1b" render={getMatcher('/1b')} />
            <Route router={localRouter1.name} pattern={/^\/\w\d/} component={
                getPlaceholder('path starts with "/", a letter, and a digit')
            } />

            <Link router={localRouter1.name} href="/1a">/1a</Link>
            <br />
            <Link router={localRouter1.name} href="/1b">/1b</Link>
            <br />
            <Link router={localRouter1.name} href="/1ab">/1ab</Link>
            <br />
            <Link router={localRouter1.name} back>Back</Link>
            <br />

        </section>

    </HUI.Fragment>
);

HUI.render(app, {
    defaultContext: Object.assign({}, ...[
        historyRouter, hashRouter, localRouter0, localRouter1
    ].map(r => ({ [r.name]: r.router })))
});
