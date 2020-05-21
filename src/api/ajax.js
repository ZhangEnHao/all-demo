import axios from 'axios';
import { message } from 'antd';
// import TopProgress from '../components/ScrollToTop';

export default function ajax(url, data = {}, method = 'GET') {
  // axios.interceptors.request.use(config=>{ // 请求之前加loading
  //   TopProgress.start();
  //   return config
  // },error=>{
  //   return Promise.reject(error)
  // })
  // axios.interceptors.response.use(config=>{ // 响应成功关闭loading
  //   TopProgress.done();
  //   return config
  // },error=>{
  //   TopProgress.done();
  //   return Promise.reject(error)
  // })
  
  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else if (method === 'POST') {
      promise = axios.post(url, data)
    } else if (method === 'PUT') {
      promise = axios.put(url, data)
    } else if (method === 'DELETE') {
      promise = axios.delete(url, {data})
    }

    // 2. 如果成功了, 调用 resolve(value)
    promise.then(response => {
      resolve(response.data)
      // 3. 如果失败了 不调用 reject(reason) 而是提示异常信息
    }).catch(error => {
      message.error(`请求出错了：${error.message}`)
    })
  })
}