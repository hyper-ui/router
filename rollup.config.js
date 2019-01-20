import rollupPluginBabel from "rollup-plugin-babel";

const input = 'raw/index.js',
    global = { '@hyper-ui/core': HUI };

export default [
    {
        input,
        output: {
            format: 'esm',
            file: 'dist/hyper-ui.router.js',
            global
        }
    },
    {
        input,
        plugins: [
            rollupPluginBabel()
        ],
        output: {
            format: 'umd',
            name: 'HRouter',
            file: 'dist/hyper-ui.router.umd.js',
            global
        }
    }
];
