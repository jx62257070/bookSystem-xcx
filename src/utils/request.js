import axios from 'axios'
var instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/Api',
    timeout: 100000,
    headers: {'X-Custom-Header': 'foobar'}
})

const request = {
    post:async function (url,data){
        let result=await instance.post(url,data)
        return result
    },
};


export default request;
