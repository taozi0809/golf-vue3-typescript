const Mock = require('mockjs')
import baseUrl from "@/api/config/base";
import {userLogin} from "@/mock/data/login";
import {indexPage,blockDetails,typeList,selectionList,betOdds} from "@/mock/data/home";

Mock.setup({
    timeout: '200 - 400'
})


Mock.mock(`${baseUrl.login}/client.do`, (options:object)=>{
    const account=JSON.parse(decodeURIComponent((parseStrObjByRegExp((options as any).body) as  any).params)).account
    const password=JSON.parse(decodeURIComponent((parseStrObjByRegExp((options as any).body) as  any).params)).password
    if(account==18702509240&&password=='123456'){
        return userLogin.suc
    }else {
        return userLogin.err
    }
})
Mock.mock(`${baseUrl.bet}/client.do`,(options:object)=>{
    switch ((parseStrObjByRegExp((options as any).body) as  any).method){
        case "index.page":
            return indexPage
            break;
        case "page.block.details":
            const skipId = JSON.parse(decodeURIComponent((parseStrObjByRegExp((options as any).body) as  any).params)).skipId
            if(skipId==2060){
                return blockDetails['2060']
            }else if(skipId==3058){
                return blockDetails['3058']
            }else if(skipId==3054){
                return blockDetails['3054']
            }else if(skipId==10001){
                return blockDetails['10001']
            }
            break;
        case "bet.type.list":
            return typeList
            break;
        case "bet.selection.list":
            const betTypeId = JSON.parse(decodeURIComponent((parseStrObjByRegExp((options as any).body) as  any).params)).betTypeId
            const label = JSON.parse(decodeURIComponent((parseStrObjByRegExp((options as any).body) as  any).params)).label
            if(betTypeId==54){
               return  label==1?selectionList['541']:selectionList['542']
            }else if(betTypeId==58){
                return  label==1?selectionList['581']:selectionList['582']
            }
            break;
        case "match.bet.odds":
            return betOdds
            break;
        default:
            break;
    }
})
function parseStrObjByRegExp(strDes:string){
    let obj = {};
    strDes.replace(/(\w+)(?:=([^&]*))?/g,(str, key, value)=> obj[key] = value);
    return obj;
}
