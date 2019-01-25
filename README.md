# @hyper-ui/router

> Official router for [`hyper-ui`](https://github.com/hyper-ui/core).

## TOC

- [Introduction](#introduction)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Example](#example)
- [Links](#links)

## Introduction

This is the official router lib for [`@hyper-ui/core`](https://www.npmjs.com/package/@hyper-ui/core) and should be used with that package.

## Usage

### npm

1. Use npm to install it together with `@hyper-ui/core`:

    ```bash
    npm install @hyper-ui/router @hyper-ui/core
    ```

2. Import the exports of this lib:

    ```js
    // es2015+
    import * as HRouter from "@hyper-ui/router";
    // es5
    const HRouter = require("@hyper-ui/router");
    ```

3. Use it to build your app.

### CDN

1. Put one of the following script tags after the one of `@hyper-ui/core` in your HTML file:

    via jsdelivr:

    ```html
    <script type="text/javascript" crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/@hyper-ui/router@latest/dist/hyper-ui.router.umd.min.js"></script>
    ```

    or via unpkg:

    ```html
    <script type="text/javascript" crossorigin="anonymous" src="https://unpkg.com/@hyper-ui/router@latest/dist/hyper-ui.router.umd.min.js"></script>
    ```

2. Access the APIs via the `HRouter` global.

If you want a specified version, just replace `latest` with that in the url. By the way, it is recommended to use a specified version in production.

For more information about these two CDN sites, visit [www.jsdelivr.com](https://www.jsdelivr.com) or [unpkg.com](https://unpkg.com).

## API Reference

### HRouter

If you load the UMD module of this lib, an `HRouter` global will contain all the APIs. Otherwise, you use this package as a dependency and import the APIs from it.

### HRouter.create

```ts
function create(factory: RouterFactory, options?: RouterFactoryOptions): Router;
```

This is a factory function which accepts the router factory and options for it and returns the router. A router factory should receive the options and return a router instance. Built-in router factories are: [`HRouter.History`](#hrouterhistory), [`HRouter.Hash`](#hrouterhash) and [`HRouter.Local`](#hrouterlocal).

### HRouter.Router

This is just an interface, not a value. Each router should have some universal methods:

#### router.push

```ts
function push(path: string): void;
```

This method lets you go to that path.

#### router.pop

```ts
function pop(): void;
```

This method lets you go back to previous path if there is one. (Nothing will happen if there is no such one.)

#### router.getCurrent

```ts
function getCurrent(): string;
```

This method returns current path.

#### router.getHistorySize

```ts
function getHistorySize(): number;
```

This method returns the current size of history.

#### router.addListener

```ts
function addListener(listener: (path:string) => void): void;
```

This method enables you to add a listener to the router. The listener will be invoked with every new path.

#### router.removeListener

```ts
function removeListener(listener: (path:string) => void): void;
```

This method lets you remove the given listener from the router.

#### router.format

```ts
function format(path: string): string;
```

This method receives the original path and returns a formated one.

### HRouter.History

This is a history router factory. A history router uses [History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History) to route.

The only option for a history router is `dropHash` which tells whether to drop the hash while routing. (Default: `false`)

### HRouter.Hash

This is a hash router factory. A hash router uses the hash in url to route. (e.g. `www.example.com/#!/foo/bar`)

### HRouter.Local

This is a local router factory. Each local router has its own state history.

The only option for a local router is `start` which stands for the initial state. (Default: `"/"`)

### HRouter.Link

This is a symbol standing for link components which you can pass to `HUI` as the first argument to create links. A link component is quite like an anchor element except that it uses the specified router in its context to route.

You can use the `router` prop to tell a link the key to the router in its context. (Default: [`HRouter.DEFAULT_NAME`](#hrouterdefault_name))

You can also set `back` prop to `true` to let the link point to previous path.

### HRouter.Route

This is a symbol standing for route components which you can pass to `HUI` as the first argument to create routes. Each route component accepts a `router` prop to specify which router in its context should be used. (Default: [`HRouter.DEFAULT_NAME`](#hrouterdefault_name))

In addition, it requires a matching prop and a rendering prop.

A matching prop tells when the path matches the route. Available matching props: (sorted by priority)

- `pattern` - A regular expression used to test the path.
- `path` - A string used to be compared with the path.

A rendering prop tells what to be rendered according to whether the path matches the route. Available rendering props: (sorted by priority)

- `render` - A function receives a boolean and returns what should be rendered. (The boolean will be `true` when the path matches the route.)
- `component` - A symbol standing for the component which should be rendered when the path matches the route.
- `children` - What you want to render when the path matches the route.

### HRouter.DEFAULT_NAME

This is a value which is the default value of `router` props of link components and route components.

## Example

Here is an example of basic usage:

```js
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
```

## Links

- [Changelog](https://github.com/hyper-ui/router/blob/master/CHANGELOG.md)
- [License (MIT)](https://github.com/hyper-ui/router/blob/master/LICENSE)
