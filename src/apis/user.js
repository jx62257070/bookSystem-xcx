import request from '@/utils/request'

const UserServie = {}

//获取书籍列表接口
UserServie.getBookListByType=function(data){
    return request.post('/User/getBookListByType',data)
}


export default UserServie
