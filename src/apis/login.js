import request from '@/utils/request'

const LoginServie = {}

LoginServie.login=function(data){
    return request.post('/Login/login',data)
}


export default LoginServie
