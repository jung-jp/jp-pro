module.exports = {
    /*
    entry : [
        'babel-polyfill',
        __dirname + '/smart_editor_basic_0729/js_src'
    ],
    */
    context: __dirname + '/smart_editor_basic_0729/js_src', // 모듈 파일 폴더
    entry: { // 엔트리 파일 목록
        all : '*.js'
    },
    output : {
        path : __dirname + '/smart_editor_basic_0729/dist',
        filename : "js_src.bundle.js"
    },
    module:{
        loaders : [{
            test:/\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader : 'babel',
            // query: {
            //   presets: ['react', 'es2015']
            // }
        }]
    }
    /*
    ,
    devServer: {
        contentBase: __dirname +"/public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
*/
};
