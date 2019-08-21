<template>
    <div>
        <mt-tabbar v-model="selected" :fixed="true" style="z-index: 999">
            <mt-tab-item style="box-sizing:border-box;"
                    :id="'box'+index"
                    v-for="(item,index) in routerList"
                    :key="index"
                    @click.native="sel(index)"
                    :class="{'is-selected':cindex==index}">
                <i :class="item.className"></i><br>
                <br>
                {{item.name}}
            </mt-tab-item>

        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: "",
                routerList: [
                    {path: "/index", name: "首页", className: ' fa fa-home fa-lg'},
                    {path: "/news", name: "分类", className: 'fa fa-qrcode fa-lg'},
                    {path: "/cart", name: "购物车", className: 'fa fa-shopping-cart fa-lg'},
                    {path: "/my", name: "我的", className: 'fa fa-user-o fa-lg'}
                ],
                cindex:0
            };
        },
        methods:{

            sel(index){
                this.cindex=index;
                this.$router.push(this.routerList[index].path)
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        overflow: hidden;
    }

    li {
        list-style: none;
        float: left;
        margin-left: 20px;
    }

    .mint-tabbar > .mint-tab-item.is-selected {
        background-color: red;
        color: violet;
    }
</style>
