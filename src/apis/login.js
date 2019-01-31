import request from '@/utils/request'

const LoginServie = {}

//登陆接口
LoginServie.login=function(data){
    return request.post('/Login/login',data)
}
//注册接口
LoginServie.register=function(data){
    return request.post('/Login/register',data)
}


export default LoginServie
