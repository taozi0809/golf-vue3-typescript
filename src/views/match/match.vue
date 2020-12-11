<template>
    <div class="match">
        <van-nav-bar left-text="首页" fixed placeholder safe-area-inset-top @click-right="$router.push({path:'/h5/info'})">
            <template #right>
                <van-icon name="user-circle-o"/>
            </template>
        </van-nav-bar>
        <div class="banner" @click="goNext(res.index0)">
            <img :src="res.index0.imgUrl" alt="" class="banner-img">
            <div class="title">{{res.index0.title }}</div>
        </div>
        <div class="match-list">
            <div class="item" v-for="(item,index) in res.indexPages" :key="item.blockId" @click="goNext(item)"
                 :class="index==0||index==3||index==6||index==7||index==8||index==11||index==12?'long':'short'">
                <img :src="item.imgUrl" alt="">
                <div class="title">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, reactive, toRefs,} from 'vue'
    import {blockDetails, indexPage} from "@/api/home";
    import {useRouter} from "vue-router"
    import {resArr} from "@/utils/empty";
    import {SkipId,DataType} from "@/utils/enum";


    export default defineComponent({
        name:"match",
        setup(){

            const router = useRouter()

            const data = reactive({
                res:{
                    index0:{},
                    indexPages:[{},{},{},{}]
                }
            })
            const goNext = async (i: {skipId:SkipId,dataType:string}) =>{
                switch (i.skipId){
                    case SkipId.GO_TO_PERSONAL:
                        router.push({path: '/h5/info'})
                        break;
                    case SkipId.GO_TO_EXCHANGE_GOODS:
                        router.push({path: '/h5/shop'})
                        break;
                    case SkipId.GO_TO_BUY_GOODS:
                        router.push({path: '/h5/convert'})
                        break;
                    default:
                        const res = await blockDetails(i.skipId,1)
                        console.log("跳转",res)
                        switch (res.data.dataType){
                            case DataType.MATCH:
                                router.push({name: 'Overview', params: {skipId: i.skipId}})
                                break;
                            case DataType.BET_TYPE:
                                router.push({name: 'Guess', params: {matchId: res.data.matchId}})
                                break;
                            case DataType.NORMAL_BET_TYPE_SELECTION:
                                router.push({name: 'Bet', params: {betTypeId: res.data.betTypeId}})
                                break;
                            case DataType.SPECIAL_BET_TYPE_SELECTION:
                                router.push({name: 'Bet', params: {betTypeId: res.data.betTypeId}})
                                break;
                            default:
                                break;
                        }
                        break;
                }
            }

            onMounted(async ()=>{
                const res = await indexPage()
                console.log("首页列表",res)
                const l = resArr(res.data.indexPages).length
                if(l==0){
                    data.res.index0={}
                    data.res.indexPages=[]
                }else{
                    data.res.index0=res.data.indexPages.splice(0,1)[0]
                    data.res.indexPages=res.data.indexPages
                }
            })
            return{
                ...toRefs(data),
                goNext,
            }
        }
    })
</script>

<style lang="scss" scoped>
  .match{
    .banner{
      width: 100%;
      height: 360px;
      margin-bottom: 10px;
      @include flex;
      @include relative;
      background: $ff;
      img{
        width: 100%;
      }
      .title {
        @include font36;
        color: $ff;
        position: absolute;
        bottom: 70px;
      }
    }
    .match-list {
      @include flex(normal,space-between);
      flex-wrap: wrap;
      .item {
        width: 370px;
        margin-bottom: 10px;
        background: $ff;
        @include relative;
        img {
          width: 100%;
        }
        .title {
          @include font36;
          color: $fc;
          position: absolute;
        }
      }
      .long {
        height: 468px;
        .title {
          bottom: 140px;
        }
      }
      .short {
        height: 358px;
        .title {
          bottom: 100px;
        }
      }
      $top:-110px;
      $length: 5;
      @for $n from 1 to $length {
        .item:nth-child(#{$n*4}),.item:nth-child(#{$n*4+1}),.item:nth-child(#{$n*4+2}),.item:nth-child(#{$n*4+3}){
          top:$top * $n;
        }
      }

    }
  }
</style>
