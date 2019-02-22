import request from '@/utils/request'

const AdminServie = {}

// //登陆接口
AdminServie.getBookList=function(){
    return request.post('/Admin/getBookList')
}



export default AdminServie