var express = require('express')
var path = require('path')
var router = require('./router')
var artTemplate = require('express-art-template')
var bodyParser = require('body-parser')
var session = require('express-session')
//req.session 解禁，可以设置session数据和成员/访问 session 就是一个对象


var app = express()

app.engine('html',artTemplate)
//默认，这里写出为了方便以后更改视图方便
app.set('views',path.join(__dirname,'./views'))
//post请求
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//session
app.use(session({
    /**
     * 1配置加密字符串，他会在原有加密的基础上和这个字符串拼起来去加密，防止客户端伪造
     * 2
     * 3无论是否session 都会分配钥匙
     */
    secret:'hqy',
    resave:false,
    saveUninitialized:true
}))

app.use('/node_modules',express.static(path.join(__dirname,'./node_modules')))
app.use('/public',express.static(path.join(__dirname,'./public')))

app.use(router);

app.get('/',function(req,res){
    res.render('index.html',{
        name:"黄卿怡"
    })

})

app.listen(8000,function(){
    console.log("8000 is runnig")
})