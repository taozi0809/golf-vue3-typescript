export const resArr=(arr:any)=>{
    if(arr instanceof Array){
        return  arr
    }else{
        return []
    }
}

export const resObj=(obj:any)=>{
    if(obj instanceof Object){
        return  obj
    }else{
        return {}
    }
}

export const isResObj = (obj:any)=>{
    if(obj instanceof Object){
        return true
    }else{
        return false
    }
}
