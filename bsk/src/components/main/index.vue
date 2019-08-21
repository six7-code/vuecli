<template>
    <div id="index">
        <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in SwiperBannerList" :key="index">
                    <img :src="item.ImgUrl" alt="">
                </mt-swipe-item>

            </mt-swipe>
        </div>
        <div>
            <img src="https://res.bestcake.com/images/newIndex/title.png?v=1" style="width: 100%;height: auto">
        </div>
        <div>
            <a href="#">
                <img style="height: 86px;width:100%;" src="https://res.bestcake.com/images/newindex/tusi.gif" alt="">
            </a>
        </div>
        <div class="iconList">
            <div class="count">
                <ul>
                    <li v-for="(item,index) in TopIconList" :key="index">
                        <img style="width: 100%;height: auto" :src="item.ImgUrl" alt="">
                        <span v-text="item.ActName"></span>
                    </li>
                </ul>
            </div>
        </div>
        <div style="width: 100%;height: 56px">
            <span style="margin-left: 6px; font-size: 16px;border:1px solid #29b8f8;background:#29b8f8;color: #fff;border-radius: 5px;line-height: 56px;text-align: center ">通知</span>
            <marquee derction="left" style="width: 294px;;color:#29b8f8;margin-left: 5px;text-align: center;font-size: 16px  ">请问获取当前价位的去青蛙地区去 看看期刊论文卡拉</marquee>
        </div>
        <br>
        <div class="contentList">
            <ul>
                <li v-for="(item,index) in CenterContentList" :key="index">
                    <img :src="item.ImgUrl" style="width:100%;height:auto">
                </li>
            </ul>
        </div>

        <div>
            <a href="#">
                <img style="width: 100%;height: auto"
                     src="https://res.bestcake.com/m-images/HotRecommend/571060506020139900.jpg">
            </a>
            <swiper_t v-if="SaleList.length!=0">
                <div class="swiper-slide swiper-slide-active" style="width: 156px;height: 170px;margin-bottom: 20px;margin-top: 10px;
             margin-right: 30px;border: 1px solid #ccc"
                     v-for="(item,index) in SaleList[0]" :key="index" @click="topath(item)">
                    <img :src="item.imgUrl" style="width: 120px;height:120px; ">
                    <div>{{item.Name}}</div>
                    <div style=" margin-top: 10px;margin-bottom: 10px"><span style="color: red">￥{{item.Price}}</span>/{{item.Size}}
                    </div>
                </div>
            </swiper_t>
        </div>
        <div>
            <a href="#">
                <img style="width: 100%;height: auto"
                     src="https://res.bestcake.com/m-images/HotRecommend/427276281583982800.jpg">
            </a>
            <swiper_t v-if="SaleList.length!=0">
                <div class="swiper-slide swiper-slide-active" style="width: 156px;height: 170px;margin-bottom: 20px;margin-top: 10px;
             margin-right: 30px;border: 1px solid #ccc"
                     v-for="(item,index) in SaleList[1]" :key="index" @click="topath(item)">
                    <img :src="item.imgUrl" style="width: 120px;height:120px; ">
                    <div>{{item.Name}}</div>
                    <div style=" margin-top: 10px;margin-bottom: 10px"><span style="color: red">￥{{item.Price}}</span>/{{item.Size}}
                    </div>
                </div>
            </swiper_t>
        </div>
        <div>
            <a href="#">
                <img style="width: 100%;height: auto"
                     src="https://res.bestcake.com/m-images/HotRecommend/497197919096789000.jpg">
            </a>
            <swiper_t v-if="SaleList.length!=0">
                <div class="swiper-slide swiper-slide-active" style="width: 156px;height: 170px;margin-bottom: 20px;margin-top: 10px;
             margin-right: 30px;border: 1px solid #ccc"
                     v-for="(item,index) in SaleList[2]" :key="index" @click="topath(item)">
                    <img :src="item.imgUrl" style="width: 120px;height:120px; ">
                    <div>{{item.Name}}</div>
                    <div style=" margin-top: 10px;margin-bottom: 10px"><span style="color: red">￥{{item.Price}}</span>/{{item.Size}}
                    </div>
                </div>
            </swiper_t>
        </div>
        <div style="width: 100%;height: 60px"></div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                topic: [],
                SwiperBannerList: [],
                TopIconList: [],
                CenterContentList: [],
                SaleList: []
            };
        },
        computed: {
            isTopic() {
                return this.$store.state.isTopic;
            }
        },
        mounted() {
            this.pageInit()
        },
        methods: {
            pageInit() {
                this._getIndexData((res) => {
                    // console.log(res)
                    this.SwiperBannerList = res.SwiperBannerList
                    this.TopIconList = res.TopIconList
                    this.CenterContentList = res.CenterContentList
                    res.SaleList.map((item) => {
                        this.SaleList.push(JSON.parse(item.CakeList))
                    })
                    this.SaleList.map((item) => {
                        item.map((item) => {
                            item.imgUrl = this.$global.setUrl(item)
                        })

                    })
                    // console.log(  JSON.parse(res.SaleList[0].CakeList))
                    // console.log(this.SaleList)
                });
            },
            topath(item) {
                // console.log(item)
                this.$router.push({
                    path: "/xq",
                    query: {
                        City: this.$store.state.city,
                        SupplyNo: item.SupplyNo,
                        Name: item.Name,
                        id: item.Id
                    }
                })
            },
            _getIndexData(callback) {
                this.$apis.getIndexData().then((res) => {
                    callback(res.data.Tag.mainresult)
                })
            }
        },
        watch: {
            // isTopic(){
            //   // console.log(this.$store.state.topic);
            // }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #index {
        .banner {
            overflow: hidden;
            height: 180px;
            /*border: 1px solid red;*/
            img {
                width: 100%;
                height: auto;
            }
        }
    }

    .iconList {
        width: 100%;
        height: r(216);
        overflow: hidden;
        .count {
            width: 100%;
            height: 100%;
            ul {
                height: 100%;
                padding-inline-start: 5px;
                li {
                    width: r(50);
                    height: r(52);
                    list-style: none;
                    /*border: 1px solid red;*/
                    float: left;
                    margin: r(16) r(20)

                }
            }
        }
    }

    .contentList {
        overflow: hidden;
        width: 100%;
        height: r(241);
        ul {
            height: 100%;
            padding-inline-start: 5px;
            li {
                width: r(173);
                height: r(100);
                float: left;
                list-style: none;
                margin: r(5) r(5);
            }

        }
    }

</style>
