<template>
     <div class="box">
        <div class="boxInner">
            <form action="">
                <div class="nei1">
                <Input prefix="ios-contact" placeholder="请输入用户名" class="name" v-model="userName"/>
                 </div>
                <div class="nei2">
                <Input type="password" prefix="md-lock" placeholder="请输入密码" class="name" v-model="userPass"/>
                </div>
                <div class="nei3">
                    <RadioGroup >
                        <Radio label="用户" @click.native="changeRadioU" v-model="isUser"></Radio>
                        <Radio label="管理员" @click.native="changeRadioA" v-model="isAdmin"></Radio>
                    </RadioGroup>
                </div>
                <div class="nei4">
                    <Button type="info" style="width:360px;font-size:18px" @click.native="login">login</Button>
                </div>
                <div class="nei5">
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
                isUser:false
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
                 switch(result.data.data)
                    {
                        case "wrong name":
                            alert("用户名错误")
                            break;
                        case "wrong pass":
                            alert("密码错误")
                            break;
                        case "unknow admin":
                            alert("非管理员账号")
                            break;
                        case "unknow user":
                            alert("非用户账号")
                            break;                      
                        case "right pass":
                            if(this.isAdmin==true)
                                console.log("跳转至管理员页面");
                            else   console.log("跳转至用户页面");     
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
