<template>
  <div>
      <div style="display: flex;justify-content:center;">
          <div class="title">注册页面</div>
        </div>
    <div class="box">
      <div class="boxInner">
        <form action>
          <div class="nei1">
            <Input prefix="ios-contact" placeholder="请输入用户名" class="name" v-model="userName"/>
          </div>
          <div class="nei2">
            <Input
              type="password"
              prefix="md-lock"
              placeholder="请输入密码"
              class="name"
              v-model="userPass"
            />
          </div>
          <div class="nei4">
            <Button type="info" style="width:360px;font-size:18px" @click.native="register">register</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import LoginServie from "@/apis/login"

export default {
  data() {
    return {
      userName: "",
      userPass: "",
    };
  },
  methods: {
      register:async function () {
          let data={
              userName:this.userName,
              userPass:this.userPass,
          }
          let result =await LoginServie.register(data)
          console.log(result);
          
      }
  }
};
</script>
<style scoped>
@import "./register.css";
</style>
