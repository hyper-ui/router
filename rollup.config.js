import rollupPluginBabel from "rollup-plugin-babel";

const input = 'raw/index.js',
    external = ['@hyper-ui/core'];

export default [
    {
        input,
        external,
        output: {
            format: 'esm',
            file: 'dist/hyper-ui.router.js'
        }
    },
    {
        input,
        external,
        plugins: [
            rollupPluginBabel()
        ],
        output: {
            format: 'umd',
            name: 'HRouter',
            file: 'dist/hyper-ui.router.umd.js',
            globals: {
                '@hyper-ui/core': 'HUI'
            },
            interop: false
        }
    }
];
