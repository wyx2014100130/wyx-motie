const path=require("path");
const baseConfig=require("./base.config");
const webpackMerge=require("webpack-merge");
const ExtractTextwebpackplugin=require("extract-text-webpack-plugin");
const config=webpackMerge(baseConfig,{
    mode:"production",
    module:{
        rules:[
            {
            test:/\.(css|scss)$/,
            //css抽离
            use:ExtractTextwebpackplugin.extract({
                //解析css,sass,postcss 用来加浏览器的前缀
                use:[
                    {loader:"css-loader"},
                    {loader:"postcss-loader"},
                    {loader:"sass-loader"}
                ],
                fallback:"style-loader",
            }),
            exclude:path.join(__dirname,"../node_modules")
            }
        ]
    },
    plugins:[
        new ExtractTextwebpackplugin({
                //处理过后的文件名字
                filename:"css/[name].[hash:8].css"
            })
    ]
    
})

module.exports=config;