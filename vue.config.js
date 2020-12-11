const CompressionPlugin = require("compression-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports ={
    publicPath:"/h5",//线上
    outputDir: 'dist',
    productionSourceMap: false,
    lintOnSave: false,
    configureWebpack:config=>{
        return{
            plugins: [
                //开启gzip
                new CompressionPlugin({
                    filename:'[path].gz[query]',
                    algorithm:"gzip",
                    test:new RegExp('\\.(js|css)$'),
                    threshold:10240,
                    minRatio:0.8,
                }),
                // 去除console.log&代码压缩
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        },
                        sourceMap: true,
                    }
                })
            ]
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // 要公用的scss的路径
                    resources: './src/assets/scss/common.scss'
                })
                .end()
        })
    }
};
