import {Md5} from "md5-typescript";
import {isResObj} from "@/utils/empty";

interface YXBInterface{
    readonly device :string,
    readonly deviceId :string,
             lang: string,
             method :string,
             params? :string,
    readonly partnerKey: string,
    readonly secretKey: string,
    readonly sendTime : number,
    readonly signType : string,
    readonly versionCode: number,
    readonly versionName: string,
    getBaseCtoInfo(method:string,data:object):object,
}

export let YXB: YXBInterface= {
    device : "WEB",
    deviceId : "none",
    lang: "ZH",
    method : "",
    params :"",
    partnerKey: "youxibi_shenzhouxing_golf",
    secretKey: "64130B4DB565F48F6426A5AFC462194B",
    sendTime : new Date().getTime(),
    signType : "NORMAL",
    versionCode: 100,
    versionName: "1.0",
    getBaseCtoInfo:(method: string, data: object):object=>{
        let obj:any={...YXB}
        obj.method=method
        isResObj(data)?obj.params=JSON.stringify(data):delete obj.params
        delete obj.getBaseCtoInfo
        let content: string = "";
        for ( let o in obj) {
            content = content + o + "=" +obj[o]+ "&";
        }
        obj.sign = Md5.init(content.substring(0, content.length - 1));
        return obj;
    }
}

