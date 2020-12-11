import {YXB} from "@/api/config/YXB";

export const paramsToData=(data: {method: string,data: object})=>{
    let data1= YXB.getBaseCtoInfo(data.method,data.data)
    let ret: string = ""
    for (let it in data1) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data1[it]) + '&'
    }
    return ret
}

