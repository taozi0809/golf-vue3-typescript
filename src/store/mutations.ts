import {USER,TOKEN} from "@/store/mutations_type";

interface State{
    token:string,
    user:object,
}

export default {
    // 记录用户信息
    [TOKEN](state:State, token:string) {
        state.token = token;
    },
    [USER](state:State, user:object) {
        state.user = user
    },
}
