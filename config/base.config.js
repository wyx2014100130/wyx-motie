const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");  //引入插件
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const CopyWebpackPlugin=require("copy-webpack-plugin")
//1、配置入口文件和出口文件地址
const PATH={
    //apps是随便起的名字，但是建议叫做app
    app:path.join(__dirname,"../src/main.js"),
    //打包的路径，dist不需要创建，打包的时候会自动创建，生产环境的文件夹--dist
    build:path.join(__dirname,"../dist")
}

//2、配置webpack
module.exports={
    //入口的配置
    entry:{
        //这里的key值决定了出口文件的名字，是自己起的
        app:PATH.app
    },
    //出口配置
    output:{
        path:PATH.build,   
        filename:"[name].js"  //[name]动态的，entry的key值是什么，他就是什么
    },
    //使用插件配置项，是个数组
    plugins:[
        //new一下就可以使用插件
        new HtmlWebpackPlugin({
            //当前的模板文件，必须要指定一个模板文件
            template:"./public/index.html", //插件在找模板文件的时候是基于根目录找的
            //打包完成之后生成的文件夹名称，每次打包完成之后会有一个hash值，这里把每次的hash值当做文件的名称
            filename:"index.html",
            title:"M站开发"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                context:path.join(__dirname,"../public"),
                from:"**/*",
                to:path.join(__dirname,"../dist"),
                ignore:["index.html"]
            }
            
        ])
    ],
    //别名的配置项
    resolve:{
        //文件引入的优先级
        extensions:[".js","scss","art","css","json"],
        //别名的配置：
        alias:{
            "@":path.join(__dirname,"../src"),
            "view":path.join(__dirname,"../src/view"),
            "controller":path.join(__dirname,"../src/controller"),
            "lib":path.join(__dirname,"../src/lib"),
            "router":path.join(__dirname,"../src/router"),
            "api":path.join(__dirname,"../src/api"),
            "styles":path.join(__dirname,"../src/styles"),
            "detail":path.join(__dirname,"../src/detail"),
            "utils":path.join(__dirname,"../src/utils")

        }
    },
    //loader的配置，有些文件浏览器是无法识别的，因此我们需要将浏览器不识别的文件转化成浏览器识别的文件
    module:{
        //规则
        rules:[
            //一个对象代表一个规则
            {   
                //规则，是一个正则表达式，这里代表所有的js文件
                test:/\.js$/,
                loader:"babel-loader"  
            },
            {
                //引入非模块化的插件
                test:require.resolve('zepto'),
                //转换成模块的方式
                loader:'exports-loader?window.Zepto!script-loader'
            },
            {
                test: /\.art$/,
                loader: "art-template-loader",
            },

            //处理图片的loader
            {
                test:/\.(png|jpg|gif|svg)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit:2048,
                        name:"img/[name].[ext]"
                    }
                 

                }
            },
            //处理字体的配置项
            {
                test:/\.(woff|woff2|svg|ttf|eot)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        name:"font/[name].[ext]"
                    }
                }
            }
        ]
    }
}

