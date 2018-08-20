var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

//express 提供了一个方法叫做res.json
var router = express.Router()

router.get('/',function(req,res){
    res.render('index.html',{
        user:req.session.user
    })
    
})

router.get('/login',function(req,res){
    res.render('login.html',{
        user:req.session.user
    })
})
router.post('/login',function(req,res){
    User.findOne({
        email:req.body.email,
        password:md5(req.body.password)
    },function(err,user){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }else if(!user){
            return res.status(200).json({
                err_code:1,
                message:'email or password is invalid'
            })
        }else{
            req.session.user=user
            res.status(200).json({
                err_code:0,
                message:'ok'
            })
        }
    })
})

router.get('/register',function(req,res){
    res.render('register.html')
})
router.post('/register',function(req,res){
    //获取表单，判断存在，注册
    //err_code自定义json发送状态码 0没问题 1存在邮箱相同 2昵称相同 3
    //保存密码用blueimp hash password to MD5
    //npm install blueimp-md5
    User.findOne({
        $or:[
            {nickname:req.body.nickname},{email:req.body.email}
        ]
    },function(err,data){
        if(err){
        return res.status(500).json({err_code:500,message:'服务端错误'})
        }else if(data){
            //已存在
            return res.status(200).json({err_code:1,message:'邮箱或昵称存在'})
        }else{
            req.body.password = md5(req.body.password)//不安全的话可以md5两次
            new User(req.body).save(function(err,user){
                if(err){
                    return res.status(500).json({err_code:500,message:'服务端错误'})
                }else{
                    //注册成功，使用session对象添加属性 来记录状态
                    req.session.user=user

                    //.json 就是 JSON.stringify 对象转位字串发送浏览器
                    res.status(200).json({err_code:0,message:'ok'})
                }
            })
        }
    })
})
router.get('/settings/admin',function(req,res){
    res.session.user = user
    res.render('admin.html')
})
router.get('/settings/profile',function(req,res){
    res.session.user = user
    res.render('profile.html')
})

router.get('/logout',function(req,res){
    req.session.user = null
    res.redirect('/')
})
module.exports = router