//import * as postcss from 'rollup-plugin-postcss';
import * as sass from 'rollup-plugin-sass';
import * as string from 'rollup-plugin-string';

export default {
    entry: 'build_tmp/src/index.js',
    external: [
        "@angular/core",
        "complog",
        "tslib",
        "t-count",
    ],
    plugins: [
        sass({
            output: true,
            insert: true,
        }),
        string({
            include: '**/*.html',
        })
        // postcss({
        //     extensions: [ '.css' ]
        // })
    ]
};
