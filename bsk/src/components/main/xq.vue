<template>
    <div id="xq">
        <div class="banner">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item,index) in [1,2,3,4]" :key="index">
                    <img :src="xqData.bannerImg+item+'.jpg'">
                    <div>{{ }}</div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="content" v-if="isShowData">
            <div style="font-size: 16px;text-align: center; font-weight: bold;">{{this.showInfo.Name}}</div>
        </div>
        <div style="margin-top: 40px;font-size: 16px" v-if="isShowData">
            <div style="margin-top: 10px"><span style="color: #9A9A9A">甜度：</span>
                <!--https://res.bestcake.com/m-images/ww/jz/tiandu_2.png-->
                <img :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${showInfo.Sweet||showInfo.CakeType[0].Sweet}.png`"/>
            </div>
            <div style="margin-top: 10px"><span style="color: #9A9A9A">口味：</span> {{this.showInfo.CategoryName}}</div>
            <div style="margin-top: 10px"><span style="color: #9A9A9A">原材料：</span>
                {{this.showInfo.Resourse}}{{this.showInfo.Resource}}
            </div>
            <div style="margin-top: 10px"><span style="color: #9A9A9A">适合人群：</span> 所有人群</div>
            <div style="margin-top: 10px"><span style="color: #9A9A9A">保鲜条件：</span>
                {{this.showInfo.KeepFresh}}{{this.showTypes.KeepFresh}}
            </div>
        </div>
        <div style="margin-top: 20px">
            <button v-for="(item,index) in showTypes" :key="index" @click="selSize(item,index)">
                {{item.Size}}
            </button>
        </div>

        <div>
            <div style="margin-top: 30px">
                <span>购买数量</span>
                <div style="float: right">
                    <button @click="num--">-</button>
                    {{num}}
                    <button @click="num++">+</button>
                </div>


            </div>

        </div>
        <div style="margin-top: 30px ;width: 100%;height: 55px;background: #fff;position: fixed;left: 0;bottom: 0;" >
            <ul class="uul">
                <li style="color: #f2495e;font-size: 16px;">{{num*(showSize.CurrentPrice||0)}}</li>
                <li style="margin-left: 100px"  @click="addCart">加入购物车</li>
                <li style=" width:115px;height: 55px;float: right;background: #29b8f8">立即购买</li>
            </ul>

        </div>
        <div style="width: 100%;height: 100px">

        </div>

    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                xqData: {},
                routeData: {},
                initData: "",
                showInfo: {},
                showTypes: [],
                isShowData: false,
                showSize: {},
                num: 1,
                sizeNum:0
            }
        },
        created() {
            // console.log(this.$route.query)
            this.routeData = this.$route.query;
            // console.log(this.routeData)
            this.pageInit()
        },
        methods: {
            pageInit() {
                //banner图片设置
                this.xqData.bannerImg = this.setImg(this.routeData.SupplyNo)
            },
            setImg(No) {
                let path = "https://res.bestcake.com/m-images";
                //https://res.bestcake.com/m-images/ns-detail/洛可可甜心/洛可可甜心-1.jpg?v=20170525?v=1
                //https://res.bestcake.com/m-images/ns-detail/玫瑰女王/玫瑰女王-1.jpg?
                if (No.indexOf("KSK") != -1) {
                    let data = {
                        City: this.routeData.City,
                        ProName: this.routeData.Name,
                        c: "Product",
                        m: "GetCakeByName",
                        v: new Date().getTime()
                    };
                    this._getGoodsData(data, (res) => {
                        this.initData = res;
                        // console.log(res)
                    })

                    return path + `/jd-detail/${this.routeData.Name}/${this.routeData.Name}-`;//1.jpg?
                } else if (No.indexOf("NS") != -1) {
                    let data = {
                        Name: this.routeData.Name,
                        c: "NsCakeCenter",
                        m: "GetNSCakeByName",
                        v: new Date().getTime()
                    };
                    this._getGoodsData(data, (res) => {
                        this.initData = res;
                    })
                    return path + `/ns-detail/${this.routeData.Name}/${this.routeData.Name}-`;//1.jpg?
                } else if (No.indexOf("JZ") != -1) {
                    let data = {
                        City: this.routeData.City,
                        ProName: this.routeData.Name,
                        c: "IndexCenter",
                        m: "GetjzCakeInfo",
                        v: new Date().getTime()
                    };
                    this._getGoodsData(data, (res) => {
                        this.initData = res;
                    })
                    return path + `/jz-detail/${this.routeData.Name}/${this.routeData.Name}-`;//1.jpg?
                } else if (No.indexOf("RP") != -1) {
                    let data = {
                        Name: this.routeData.Name,
                        c: "NsCakeCenter",
                        m: "GetRuPCakeByName",
                        v: new Date().getTime()
                    };
                    this._getGoodsData(data, (res) => {
                        this.initData = res;
                    })
                    return path + `/rp-detail/${this.routeData.Name}/${this.routeData.Name}-`;//1.jpg?
                }
            },
            selSize(item,num) {
                this.showSize = item;
                this.sizeNum=num;
            },
            addCart(){
                MessageBox.confirm('确认加入购物车').then(action => {
                    let temp={
                        City:this.$store.state.city,
                        SupplyNo:this.$route.query.SupplyNo,
                        Name:this.$route.query.Name,
                        id: this.showSize.Id,
                        CurrentPrice: this.showSize.CurrentPrice,
                        Size: this.showSize.Size,
                        num:this.num,
                        mark:"xq"

                    };
                    this.$store.commit("add",temp)
                    this.$router.push("/cart")
                }).catch(()=>{

                });
                console.log( this.showTypes[this.sizeNum])


            },
            _getGoodsData(data, callback) {
                this.$apis.getGoodsData(data).then((res) => {
                    callback(res.data.Tag);
                })
            },

        },
        watch: {
            initData() {
                if (this.initData.length) {
                    //如果是数组 直接this.initData.map 遍历出城市
                    // console.log(this.initData)
                    this.initData.map((item) => {
                        // console.log(item)
                        if (this.routeData.City == item.City) {
                            this.showTypes.push(item);
                        }
                    })
                    if (this.showTypes.length == 0) {
                        this.showTypes[0] = this.initData[0]
                    }
                    this.showInfo = this.showTypes[0]
                    this.isShowData = true


                } else {
                    //如果是对象 往CakeType下面Size
                    this.showTypes = this.initData.infos.CakeType;
                    this.showInfo = this.initData.infos;
                    this.isShowData = true

                }
                this.selSize(this.showTypes[0],0)
            },

        }
        /*
        _getGoodsData(data,callback){
            this.$apis.getGoodsData(data).then((res)=>{
                //取到所有的数据 数据类型有两种 KSK{}  NS[]
                callback(res.data.Tag)
            })
        },*/

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #xq {
        .banner {
            height: r(445);
            img {
                width: 100%;
                height: auto;
            }
        }
    }
    .uul{
        li{
            float: left;
            font-size: 16px;
            text-align: center;
            line-height: 55px;

        }
    }
</style>
