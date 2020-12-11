import baseUrl from "@/api/config/base";
import {post} from "../axios/axios";
/**
 * 首页模块
 * */
/**
 * 首页模块
 * */
//主页数据
export const indexPage=() =>post(`${baseUrl.bet}/client.do`,{
    method:'index.page',
    data:{}
})
//页块详情
export const blockDetails=(skipId: number,label: number) =>post(`${baseUrl.bet}/client.do`,{
    method:'page.block.details',
    data:{skipId,label}
})
//比赛下玩法列表
export const typeList=(matchId: number,label: number) =>post(`${baseUrl.bet}/client.do`,{
    method:'bet.type.list',
    data:{matchId,label}
})
//玩法下竞猜列表
export const selectionList=(betTypeId: number,label: number,page: number,pageSize: number) =>post(`${baseUrl.bet}/client.do`,{
    method:'bet.selection.list',
    data:{betTypeId,label,page,pageSize}
})

//比赛的赔率列表
export const betOdds=(skipId: number,page: number,pageSize: number) =>post(`${baseUrl.bet}/client.do`,{
    method:'match.bet.odds',
    data:{skipId,page,pageSize}
})

