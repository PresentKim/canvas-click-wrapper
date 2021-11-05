import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/canvas-click.ts',
        external: [],
        output: [
            {
                file: 'dist/canvas-click.js',
                format: 'umd',
                name: 'canvas-click',
                sourcemap: true,
                globals: {},
            },
        ],
        plugins: [typescript({tsconfig: './tsconfig.json'})],
    }
];