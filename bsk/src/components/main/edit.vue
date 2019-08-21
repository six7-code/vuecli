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
            <button @click="edit">注册</button>
        </form>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods:{
            edit(){
             var temp=  {
                    id: 101,
                    username: 'abb',
                    password: '123456',
                    avatar: 'https://avatars0.githubusercontent.com/u/22588905?v=4&s=120',
                    name: '阿西吧'
                };
             this.$apis.edit(temp).then((res)=>{
                 // console.log(res)
                 if (res.data.code==4000){
                     this.$router.push("/login");
                 }
             })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
