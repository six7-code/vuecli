<template>
    <div>
        <form>
            <label>
                <p>
               <span>账号</span>
                <input type="text"/>
                </p>
            </label>
            <label>
                <p>
                <span>密码</span>
                <input type="text"/>
                </p>
            </label>
            <button @click="login">登录</button>
        </form>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import Store from "storejs"
    export default {
        data () {
            return {

            }
        },
        methods:{
            login(){
                this.$apis.login({ username: 'abb', password: '123456'}).then((res)=>{
                  // console.log(res)
                    if (res.data.code==="1000"){
                        this.$router.push("/edit")
                    } else if (res.data.code==="2000"){
                        console.log(res.data.userInfo)
                        Store.set("userInfo",res.data.userInfo)
                        this.$router.push("/my")
                    }else if (res.data.code==="3000"){
                        Toast(res.data.msg);
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
