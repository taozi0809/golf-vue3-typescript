<template>
    <div class="bet">
        <van-nav-bar
                left-arrow
                :left-text="betTypeName"
                @click-left="$router.go(-1)">
            <div slot="right" @click="$router.push({path:'/userinfo'})"></div>
        </van-nav-bar>
        <div class="item-box">
            <div class="item-box-1" v-for="(item,index) in customizeInfos">
                <div class="item-box-1-top" @click="showClick(customizeInfos,index,item)">
                    <div class="t0">{{ item.customize }}</div>
                    <div class="r golfjiantoushang" :class="!item.show?'zk':'sq'"></div>
                </div>
                <el-collapse-transition>
                    <div class="item-box-2" v-show="item.show">
                        <div class="item" v-for="item1 in item.betSelections">
                            <div class="l">
                                <div class="t1">{{ item1.selectionName }}</div>
                                <div class="t1">{{ item1.selectionEnName }}</div>
                            </div>
                            <div class="r">{{ item1.odds }} 倍</div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
    import {defineComponent,onMounted,reactive,toRefs} from 'vue'
    import {useRoute} from "vue-router"
    import ElCollapseTransition from "../../utils/collapse-transition"
    import {selectionList} from "@/api/home";

    export default defineComponent({
        components:{ElCollapseTransition},
        setup(){
            interface Data{
                betTypeName:string,
                afterBetTypeId:any,
                label:number,
                page:number,
                pageSize:number,
                customizeInfos:[],
            }
            const route = useRoute()

            const data:Data = reactive({
                betTypeName:"",
                afterBetTypeId:route.params.betTypeId,
                label:1,
                page:1,
                pageSize:5,
                customizeInfos:[],
            })

            const showClick =(l:any, i:any, s:any)=>{
                s.show = !s.show
            }
            onMounted(async ()=>{
                const res = await selectionList(data.afterBetTypeId, data.label, data.page,data.pageSize)
                console.log("竞猜项列表",res)
                data.betTypeName = res.data.betTypeName
                let arr=res.data.customizeInfos
                for(let i in arr){
                    arr[i].show=true
                }
                data.customizeInfos = arr

            })
            return{
                ...toRefs(data),
                selectionList,
                showClick,
            }
        },


    })
</script>

<style lang="scss" scoped>
  .item-box {
    width: 690px;
    margin: 0 auto;
    .item-box-1 {
      width: 690px;
      overflow: hidden;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      box-shadow: 0px 0px 20px 0px rgba(39, 52, 125, 0.15);
      margin-bottom: 40px;

      .item-box-1-top {
        background: #63cda0;
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 28px;
        position: relative;

        .t0 {
          color: #fff;
          font-size: 26px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .t1 {
          color: #fff;
          font-size: 26px;
          flex-shrink: 0;
        }

        .r {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 100px;
          height: 60px;
          box-sizing: border-box;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }

        .zk {
          transition: transform 0.3s, -webkit-transform 0.3s;
          transform: rotate(180deg);
        }

        .sq {
          transition: transform 0.3s, -webkit-transform 0.3s;
          transform: rotate(0deg);
        }
      }

      .item-box-2 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 40px;

        .item {
          width: 290px;
          border: 2px solid #D0D3DC;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          margin-bottom: 30px;
          padding: 20px 0;

          .l {
            width: 190px;
            box-sizing: border-box;
            padding-left: 20px;
            position: relative;
            top: 3px;

            .t1 {
              color: #5E7D70;
              font-size: 22px;
              overflow: hidden; //超出部分隐藏
              text-overflow: ellipsis; //超出部分显示...
              white-space: nowrap; //文本强制一行显示
            }

            .t1:nth-child(2) {
              margin-top: 6px;
            }
          }

          .r {
            padding-right: 20px;
            width: 100px;
            text-align: right;
            flex-shrink: 0;
            box-sizing: border-box;
            color: #323437;
            font-size: 24px;
          }
        }

        .item:nth-child(1), .item:nth-child(2) {
          margin-top: 40px;
        }
      }

    }
  }
</style>
