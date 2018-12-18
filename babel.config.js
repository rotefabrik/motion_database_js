module.exports = function (api) {

    api.cache(false);

    const presets = [
        [
            'es2015',
            'react',
            'stage-0'
        ]
    ];
    const plugins = [
        'syntax-dynamic-import',
        'transform-class-properties',
        'transform-object-assign',
        'react-loadable/babel'
    ];

    return {
        presets,
        plugins
    };
};
