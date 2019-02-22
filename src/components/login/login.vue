<template>
     <div class="box">
        <div class="boxInner">
            <form action="">
                <div class="userId">
                <Input prefix="ios-contact" placeholder="请输入学号" class="name" v-model="userName" :maxlength="userIdLong"/>
                 </div>
                <div class="pass">
                <Input type="password" prefix="md-lock" placeholder="请输入密码,最多20位" class="name" v-model="userPass" :maxlength="passLong"/>
                </div>
                <div class="ifAdmin">
                    <RadioGroup >
                        <Radio label="用户" @click.native="changeRadioU" v-model="isUser"></Radio>
                        <Radio label="管理员" @click.native="changeRadioA" v-model="isAdmin"></Radio>
                    </RadioGroup>
                </div>
                <div class="login">
                    <Button type="info" style="width:360px;font-size:18px" @click.native="login">login</Button>
                </div>
                <div class="register">
                    <p class="inline color1 fon1" style="display: inline-block">还没有账号？去</p>
                    <a href="javascript:" class="fr font2 clearfix" style="display: inline-block" @click="toRegister" >注册>></a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import LoginServie from "@/apis/login"
    export default {
        data () {
            return {
                userName:"",
                userPass:"",
                isAdmin:false,
                isUser:false,
                passLong:20,
                userIdLong:12
            }
        },
        methods:{
            changeRadioU:function(){
                if(!this.isUser){
                this.isUser=true;
                this.isAdmin=false
                }
            },
            changeRadioA:function(){
                if(!this.isAdmin){
                this.isUser=false;
                this.isAdmin=true
                }
            },
            login:async function(){
                var user={
                    name:this.userName.replace(/\s*/g,""),
                    pass:this.userPass.replace(/\s*/g,""),
                    isAdmin:this.isAdmin
                }
                //判断是否未填信息
                if(user.name==""){
                    alert("用户名不能为空！");
                }else if(user.pass==""){
                    alert("密码不能为空！");
                }else if(this.isUser==false&&this.isAdmin==false)
                    alert("请选择用户或者管理员！");
                else{
                let data={
                      num:1,
                      name:this.userName,
                      pass:this.userPass,
                      isAdmin:this.isAdmin
                }
                let result =await LoginServie.login(data)
                let state=result.data.data.state
                console.log(result.data.data)
                 switch(state)
                    {
                        case "wrong id":
                            alert("用户名错误")
                            break;
                        case "wrong pass":
                            alert("密码错误")
                            break;                     
                        case "right pass":
                            if(this.isAdmin==true)
                                this.$router.push({name:"admin",params:{userId:this.userName}})
                            else   this.$router.push({name:"user",params:{userId:this.userName,userName:result.data.data.data}});     
                            break;                      
                    }
                console.log(result);
                
                }
            },
            toRegister:function () {
                // this.$router.push({name: "register"});    
                this.$router.push("/register");    
            }
        }
    }
</script>
<style scoped>
@import "./login.css";
</style>
