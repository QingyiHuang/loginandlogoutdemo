var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hqy')

var Schema = mongoose.Schema
var userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_time:{
        type:Date,
        default:Date.now//default实例的时候调用这个方法
    },
    last_modified_time:{
        type:Date,
        default:Date.now
    },
    avatar:{//头像 afanda
        type:String,
        default:'/public/img/avatar-default.png'
    },
    bio:{//jieshao
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    birthday:{
        type:Date,
        default:''
    },
    pow:{ //管理员用户
        type:Number,
        enum:[1,2],
        default:1
    },
    status:{//用户帐号状态
        type:Number,
        /**
         * 0所有权限解禁，1不可评论，2不可以登录
         */
        enum:[0,1,2],
        default:0
    }
})

module.exports = mongoose.model('User',userSchema)