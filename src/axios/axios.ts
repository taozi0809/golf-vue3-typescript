import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import {paramsToData} from "@/api/config/paramsToData";
import Router from "../router"
import {Toast} from "vant";
import {showLoading,hideLoading} from "@/axios/loading";
import store from "@/store";

//定义一个请求拦截器
axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    showLoading()
    return config
},err=>Promise.reject(err))

//定义一个响应拦截器
axios.interceptors.response.use((config:AxiosResponse)=>{
    hideLoading()
    if (typeof config.data !== 'object') {
        Toast.fail('服务端异常！')
        return Promise.reject(config)
    }
    if(config.data.code!=0){
        if(config.data.message){Toast.fail(config.data.message)}
        if(config.data.code==12008){
            store.commit('TOKEN','')
            Router.push({path: '/login'})
        }
        return Promise.reject(config)
    }
    return config
},err=>{
    showLoading()
    return Promise.reject(err)
})

export const post = async (url: string,data:{method: string,data: object})=>(await axios.post(url,paramsToData(data))).data
