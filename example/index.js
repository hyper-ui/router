/// <reference types=".." />
// Get the APIs
const { create, Route, Link } = HRouter;

// Create routers
const historyRouter = {
    name: HRouter.DEFAULT_NAME,
    router: create(HRouter.History)
};
const hashRouter = {
    name: 'hash-router',
    router: create(HRouter.Hash)
};
const localRouter = {
    name: 'local-router',
    router: create(HRouter.Local, {
        start: 'foo'
    })
};

// Define the test component
const TestComponent = HUI.define('TestComponent', {
    render() {
        return HUI('p', null, 'Here is the test component.');
    }
});

// Render the app
HUI.render(
    [

        HUI('section', null, [

            HUI('h1', null, 'History Routing'),

            /**
             * This route doesn't need a `router` prop
             * because the history router is stored
             * in the context using the default name.
             */
            HUI(Route, {
                path: '/',
                render: matched => HUI('p', null, [
                    matched ?
                        'The path is "/" now.' :
                        'The path is not "/" now.'
                ])
            })

        ]),

        HUI('section', null, [

            HUI('h1', null, 'Hash Routing'),

            /**
             * The routes and the links in this
             * section do need `router` props
             * because the hash router is stored
             * in the context using a custom name.
             */

            HUI(Route, {
                router: hashRouter.name,
                pattern: /^\/test/,
                component: TestComponent
            }),

            HUI(Link, {
                router: hashRouter.name,
                href: '/',
                onclick: function (event) {
                    console.log('click event:', event);
                }
            }, 'Goto "#!/"'),

            HUI('br'),

            HUI(Link, {
                router: hashRouter.name,
                href: '/test',
                ref: function (a) {
                    console.log('anchor element reference:', a);
                }
            }, 'Goto "#!/test"'),

            HUI('br'),

            HUI(Link, {
                router: hashRouter.name,
                back: true
            }, 'Go back')

        ]),

        HUI('section', null, [

            HUI('h1', null, 'Local Routing'),

            HUI(Route, {
                router: localRouter.name,
                path: 'foo',
                render: matched => HUI('p', null, [
                    `Current path is "${matched ? 'foo' : 'bar'}".`
                ])
            }),

            HUI(Link, {
                router: localRouter.name,
                href: 'foo'
            }, 'foo'),

            HUI('br'),

            HUI(Link, {
                router: localRouter.name,
                href: 'bar'
            }, 'bar')

        ])

    ], {
        defaultContext: {
            [historyRouter.name]: historyRouter.router,
            [hashRouter.name]: hashRouter.router,
            [localRouter.name]: localRouter.router
        }
    }
);
