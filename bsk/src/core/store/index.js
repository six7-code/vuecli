import Vuex from "vuex";
import Vue from "vue";
import apis from "@/core/api"
import {Indicator} from 'mint-ui';

Vue.use(Vuex);
// Vuex作用是什么? 全局状态管理

//理解为 组件内部  data 属性
const state = {
    city: "上海",
    cartList: []
}
//定义  methods 同步方法   视图调用     this.$store.commit("xxxx",val)
const mutations = {
    // 没有第三个参数
    add(state, data) {
        // 在函数内部去  statet
        let bool = true;

            state.cartList.map((item) => {
                if (item.id == data.id) {
                    if (data.mark=="xq"){
                        item.num=item.num+data.num;
                        bool=false
                        return;
                    }
                    bool = false;
                    item.num++;
                }
            })

        if (bool) {
            data.num = data.num || 1;
            state.cartList.push(data);
        }
// console.log(state.cartList)
    },
    del(item,data,index){
        state.cartList.map((item) => {
            if (item.id == data.id) {
                item.num--;
            }
            if (item.num==0){
              state.cartList.splice(index,1)
            }
        })


    }

}
// 定义 compunted  属性计算
const getters = {
    count(state) {
        return state.num * state.price;
    }
}
// --------------
//定义 异步方法 通用接口调用    视图调用     this.$store.dispatch("xxxx",val)
const actions = {
    test(context, data) {
        console.log(context)  //可以调用  mutations 方法    actions调actions自己的方法,也可以使用 getters,也可以使用state
        // apis.getItem().then((res)=>{
        // console.log(res)
        // })
    },
    test2(context, data) {
        console.log("run");
        Indicator.open("加载中...")
        setTimeout(() => {
            Indicator.close()
            context.state.isTopic = true;
        }, 5000)
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})