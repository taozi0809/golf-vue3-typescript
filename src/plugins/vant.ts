import {NavBar,Icon,Loading} from "vant";

const vant= {
    install:function(Vue: any){
        Vue.use(NavBar)
            .use(Icon)
            .use(Loading)
    }
}
export default vant
