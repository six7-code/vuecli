<template>
    <div>
        <ul style="width: 100%;height: 50px">
            <li v-for="(item,index) in tablist" :key="index"
                style="float: left;padding-left: 60px;margin-top: 30px;overflow: hidden">
                <!--<h1>{{item.title}}</h1>-->
                <h1 @click="sel(index)" style="font-size: 14px;overflow: hidden;width: 100%">
                    {{item.title}}
                </h1>
            </li>
        </ul>
        <div style="width: 100%;height: auto">
            <ul>
                <li v-for="(item,index) in goodList" :key="index"
                    style="width: 165px;height: 231px; float: left;margin: 10px 10px">
                    <img :src="item.ImgUrl" style="width: 165px;height: 165px" @click=" topath(item)">
                    <span style="float: left;color: #333">{{item.Name}}</span>
                    <br>
                    <br>
                    <span style="float: left;color: #999; width:150px;white-space:nowrap;overflow:hidden;text-overflow :ellipsis;padding-top: 5px">
                        {{item.Means}}</span>
                    <br>
                    <br>
                    <span style="float: left"><span style="color: red">￥{{item.CurrentPrice}}</span>/{{item.Size}}</span>
                    <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1"
                         style="float: right;width: 20px;height: 20px" @click="add(item)">
                </li>
                <div style="padding-top: 50px">
                    <div style="">
                        <h1  style="font-size: 16px;display:block">划线价格</h1>

                        <h4 style="color: #777">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</h4>
                    </div>
                    <div >
                        <h1 style="font-size: 16px">未划线价格</h1>
                        <h4 style="color: #777">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</h4>
                    </div>
                </div>
            </ul>
            <div style="width: 100%; height:150px">

            </div>

        </div>
        <br>
        <br>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                goodList: []
            }
        },
        props: ["tablist"],
        created() {
            this.sel(0)
        },
        methods: {
            sel(index) {
                this.goodList = this.tablist[index].list;
            },
            topath(item) {
                // console.log(item)
                // return
                this.$router.push({
                    path: "/xq",
                    query: {
                        City: this.$store.state.city,
                        SupplyNo: item.SupplyNo,
                        Name: item.Name,
                        id: item.ID
                    }
                })
            },
            add(item){
                let temp={
                    City:this.$store.state.city,
                    SupplyNo:item.SupplyNo,
                    Name:item.Name,
                    id:item.Id||item.ID,
                    CurrentPrice:item.CurrentPrice,
                    ImgUrl:item.ImgUrl,
                    Size:item.Size

                };
                this.$store.commit("add",temp)
                console.log(temp)

            },

        },

        watch: {
            tablist() {
                this.sel(0)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .current {
        color: #1db0b8;
    }
</style>
