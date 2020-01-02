const baseConfig=require("./base.config");
const webpackMerge=require("webpack-merge");

const path=require("path");
//合并
const config=webpackMerge(baseConfig,{
    //当前的环境
    mode:"development",
    //开发环境的css与生产环境的css不一样，所以只能单独配，不能写在base的公共环境中
    module:{
        rules:[
            {
                test:/\.(css|scss)$/,
                //cssloader的执行顺序，从右到左，从下到上
                //style-loader可以将js引入的css样式放在style标签中
                use:["style-loader","css-loader","sass-loader"],
                exclude:path.join(__dirname,"../node_modules")
            }
        ]
    },
    //服务器的配置项
    devServer:{
        open:true,   //开启服务的时候浏览器会自动打开
        port:9010,   //设置端口号
         historyApiFallback: {
            rewrites: [{
                from: /.*/g,
                to: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
            }]
        },
    }

})

module.exports=config;