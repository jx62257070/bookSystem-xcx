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


export default AdminServie