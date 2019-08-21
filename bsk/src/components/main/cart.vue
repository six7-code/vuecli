<template>
    <div>
        <ul style="">
            <li style=" width: 100%;height: 186px; background:#fff" v-for="(item,index) in cartList"
                :key="index">
                <div class="app"  >
                    <div style="margin-left: 10px;margin-top: 50px; ">
                        <input style="width: 20px;height: 20px;" type="checkbox" v-model="item.bool" @change="count">
                    </div>
                    <div style="margin-left: 10px">
                        <img  style="width: 114px;height: 106px" :src="item.ImgUrl">
                    </div>
                    <div style="margin-left: 10px">
                        <h1 style="font-size: 16px;margin-top: 15px">{{item.Name}}</h1>
                        <h6 style="color: #ccc;margin-top: 15px">{{item.Size}}</h6>
                        <h1 style="font-size: 16px;margin-top: 15px">{{item.CurrentPrice}}</h1>
                    </div>
                    <div style="float: right;margin-right: 10px;line-height: 122px">
                        <button @click="del(item)">-</button>
                        {{item.num}}
                        <button @click="add(item)">+</button>
                    </div>
                </div>
                <div  style="width: 100%;height: 48px;font-size: 16px">
                    <span style="color: #f2495e; margin-left: 30px">优惠方式</span>
                    <span>不参与活动</span>

                </div>
                <div style="width: 100%;height: 100px">

                </div>
            </li>
        </ul>
        <div class="abb">
        <div>
            <input style="width: 20px;height: 20px; margin-left: 10px" type="checkbox" v-model="isAllsel">
            <button @click="allsel" style="border: 0;background: #fff; font-size: 16px">全选</button>
            <span @click="rem()">清空</span>
        </div>
        <div style="margin-left: 30px"> 合计：{{allPrice}}</div>
        <div style="height: 56px;width: 114px;float: right;background: #29b8f8;line-height: 56px;text-align: center;font-size: 16px;color: #fff">结算</div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                cartList: [],
                allPrice: 0,
                isAllsel: false,
                isArr: []

            };
        },
        created() {
            // console.log(this.$store.state.cartList)
            this.cartList = this.$store.state.cartList;
            this.cartList.map((item) => {
                item.bool = false;
            })

        },
        methods: {
            add(item) {
                this.$store.commit("add", item);
                this.count();

            },
            del(item) {
                if (item.num<=1){
                    MessageBox.confirm('确认删除吗').then(action => {
                        this.cartList.map((el, index) => {
                            if (el.id == item.id) {
                                this.cartList.splice(index, 1);                        return;

                            }
                        });
                    })
                }
                item.num--;
                this.count()
            },
            rem(){
                this.cartList.splice(0,this.cartList.length)
                this.allPrice=0
            },
            count() {
                this.allPrice = 0;
                this.isArr = [];
                this.cartList.map((item) => {
                    if (item.bool) {
                        this.allPrice += item.num * item.CurrentPrice;
                        this.isArr.push(item)
                    }
                });
                /*console.log(isArr)
                return;*/
                if (this.isArr.length == this.cartList.length) {
                    this.isAllsel = true;
                } else {
                    this.isAllsel = false;
                }

            },
            allsel() {
                this.isAllsel = !this.isAllsel;
                this.cartList.map((item) => {
                    item.bool = this.isAllsel
                })
                this.count()
            }
        },
        watch: {
            carList() {

            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    body{
        background: #ccc;
    }
    .app{
        width: 100%;
        height:122px;

    }
    .app>div{
        float: left;
    }
.abb{
    width: 100%;
    height: 56px;
    position: fixed;left: 0;bottom:50px;
    background: #fff;
    z-index: 999;


}
    .abb>div{
        float: left;
        font-size: 16px;
        line-height: 56px;

    }
</style>
