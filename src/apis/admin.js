import request from '@/utils/request'

const AdminServie = {}

//获取书籍列表接口
AdminServie.getBookList=function(){
    return request.post('/Admin/getBookList')
}
//添加书籍接口
AdminServie.addBook=function(data){
    return request.post('/Admin/addBook',data)
}
//搜索书籍接口
AdminServie.searchBook=function(data){
    return request.post('/Admin/searchBook',data)
}
//删除书籍接口
AdminServie.delBook=function(data){
    return request.post('/Admin/delBook',data)
}
//更新书籍接口
AdminServie.updateBook=function(data){
    return request.post('/Admin/updateBook',data)
}
//获取用户列表接口
AdminServie.getUserList=function(){
    return request.post('/Admin/getUserList')
}
//搜索用户接口
AdminServie.searchUser=function(data){
    return request.post('/Admin/searchUser',data)
}
//更新用户接口
AdminServie.updateUser=function(data){
    return request.post('/Admin/updateUser',data)
}
//获取管理员列表接口
AdminServie.getAdminList=function(){
    return request.post('/Admin/getAdminList')
}
//搜索管理员接口
AdminServie.searchAdmin=function(data){
    return request.post('/Admin/searchAdmin',data)
}
//更新管理员接口
AdminServie.updateAdmin=function(data){
    return request.post('/Admin/updateAdmin',data)
}
//借书接口
AdminServie.borrowBook=function(data){
    return request.post('/Admin/borrowBook',data)
}
//还书接口
AdminServie.returnBook=function(data){
    return request.post('/Admin/returnBook',data)
}
export default AdminServie