module.exports = {
    entry : './src/index.js',
    // entry : './index_without_redux.js',
    output: {
        path : __dirname,
        filename : 'app.js'
    },
    devServer: {
        inline:true,
        port:7788
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }

}
