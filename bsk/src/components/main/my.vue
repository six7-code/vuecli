<template>
    <div>
        <ul>
            <li v-for="(item,index) in this.userInfo" :key="index">

            </li>
            <span>用户名</span>:
        </ul>

    </div>
</template>

<script>
    import Store from "storejs"
    export default {

        data () {
            return {
            userInfo:{}
            }
        },
        created(){
       if (Store.get("userInfo")){
           this.userInfo=Store.get("userInfo");
           console.log(this.userInfo)

       } else {
           this.$router.push("/login")
       }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
