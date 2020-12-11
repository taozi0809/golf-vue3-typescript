import baseUrl from "@/api/config/base";
import {post} from "@/axios/axios";
/**
 * 登录注册模块
 * */
//login
export const userLogin=(account:string,password:string) =>post(`${baseUrl.login}/client.do`,{
    method:'youxibi.user.login.password',
    data:{account,password}
})
