<template>
    <div class="login">
        <div class="form">
            <div class="item">
                <input type="tel" placeholder="手机号" v-model="phoneNumber">
            </div>
            <div class="item">
                <input type="password" placeholder="密码" v-model="password">
            </div>
            <div class="item1" @click="login">登 录</div>
            <div class="item1" @click="$router.push({path:'/h5/register'})">注 册</div>
            <div class="item2" @click="$router.push({path:'/h5/forget'})">忘记密码?</div>
        </div>
    </div>
</template>

<script lang="ts">
import {reactive,toRefs,computed,defineComponent} from "vue"
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {userLogin} from "@/api/login";


export default defineComponent({

    setup(){
        interface store{
            state:{
                token:string
            }
        }
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const token = computed(()=>store.state.token)
        if(!!token.value){router.push({ path: "/h5" })}


        const data = reactive({
            phoneNumber:"",
            password:"",
        })
        const login=async ()=>{
            const res = await userLogin(data.phoneNumber,data.password)
            console.log("登录成功",res)
            store.commit("TOKEN", res.data.token)
            store.commit("USER", res.data)

            let path = '/';
            if (!!route.query.redirect) { //跳到之前的页面
                path = route.query.redirect as string
            }
            router.push({ path: path })
        }
        return{
            ...toRefs(data),
            login
        }
    }
})

</script>

<style lang="scss" scoped>
  .form{
    width: 610px;
    height: 610px;
    background: $ff;
    border-radius: 30px;
    box-shadow: 1px 11px 19px 4px rgba(2, 29, 66, 0.17);
    padding-top: 60px;
    @include cc(45%);
    .item{
      width: 500px;
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid $dz;
      margin: 0 auto;
      margin-bottom: 20px;
      border-radius: 5px;
      @include relative;
      input{
        font-size: 28px;
        box-sizing: border-box;
        padding: 0 20px;
        color: $sf;
        width: 500px;
      }
      input::-webkit-input-placeholder{
        color: $ns;
      }
    }
    .item1{
      width: 500px;
      height: 80px;
      background: $primary;
      margin: 0 auto;
      margin-bottom: 35px;
      @include relative;
      @include flex;
      color: $ff;
      font-size: 30px;
    }
    .item1:nth-child(3){
      margin-top:60px;
    }
    .item2{
      width: 100%;
      text-align: center;
      color: $primary;
      font-size: 26px;
    }
  }
</style>
