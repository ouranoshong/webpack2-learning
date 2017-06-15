module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    // extends: 'eslint:recommended',

    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',

    // parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,

        // Enable JSX
        ecmaFeatures: {
            jsx: true,
        },

    },

    plugins: [
        'react',
    ],


    // parserOptions: {
    //     sourceType: 'module',
    // },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['warn'],
        'no-console': 0,
    },

    globals: {
        __: true,
    },
};