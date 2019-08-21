<template>
    <div style="float: left;margin-top: 0">
        <button @click="sel(1)" style="width: 49%;height: 25px; border: 0;">自营</button>
        <button @click="sel(2)" style="width: 49%;height: 25px; border: 0;">严选</button>
        <goodsList v-if="tabData.length!=0" :tablist="tabData" ></goodsList>
    </div>
</template>
<script>
    import goodsList from "@/components/main/show";
    export default {
        data() {
            return {
                goodsList:[
                    {title:"经典",mark:"KSK",list:[]},
                    {title:"女神",mark:"NS",list:[]},
                    {title:"伴手礼",mark:"JZ",list:[]},
                    {title:"乳品",mark:"RP",list:[]}
                ],
                tabData:[]
            };
        },
        mounted() {
          this.pageInit()
        },

        components:{
            goodsList,

        },
        methods: {
            pageInit(){
                this._getNsCakeCenter((res)=>{
                    /*res.map((item,index)=>{
                        item.ImgUrl=this.$global.setUrl(item)
                    });*/
                    this.goodsList.map((item)=>{
                        // console.log(item.mark)
                        res.map((it)=>{
                            if (it.SupplyNo.indexOf(item.mark)!=-1){
                                it.ImgUrl=this.$global.setUrl(it);
                                item.list.push(it)
                            }
                        })
                    })
                    this.sel(1)
                    // console.log(this.goodsList)
                });
            },
            sel(num) {
                if (num==1){
                    this.tabData=this.goodsList.slice(0,3)
                }else{
                    this.tabData=this.goodsList.slice(3)
                }
                // console.log(this.tabData)
            },
            _getNsCakeCenter(callBack){
                this.$apis.getNsCakeCenter().then((res)=>{
                    callBack(res.data.Tag.cakelist);
                })
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
