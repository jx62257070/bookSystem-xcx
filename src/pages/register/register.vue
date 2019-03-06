<template>
  <div>
    <div style="display: flex;justify-content:center;">
      <div class="title">注册页面</div>
    </div>
    <div class="box">
      <div class="boxInner">
        <form action>
          <div class="userId">
            <span>学号:</span>
            <Input
              prefix="ios-contact"
              placeholder="请输入学号"
              :maxlength="userIdLong"
              class="userIdInput"
              v-model="userId"
            />
          </div>
          <div class="pass">
            <span>密码:</span>
            <Input
              type="password"
              prefix="md-lock"
              placeholder="请输入密码,最多20位"
              class="userIdInput"
              v-model="userPass"
              :maxlength="passLong"
            />
          </div>
          <div class="userName">
            <span>姓名:</span>
            <Input
              placeholder="请输入姓名"
              class="userNameInput"
              :maxlength="userNameLong"
              v-model="userName"
            />
          </div>
          <div class="userSex">
            <span>性别:</span>
            <Select style="width:70px" v-model="checkedUserSex">
              <Option v-for="item in userSex" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="userDept">
            <span>所在系:</span>
            <Select style="width:120px" v-model="checkedUserDept">
              <Option
                v-for="item in userDept"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="register">
            <Button type="info" style="width:360px;font-size:18px" @click.native="register">register</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import LoginServie from "@/apis/login";

export default {
  data() {
    return {
      userSex: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      userDept: [
        {
          value: "基础学部",
          label: "基础学部"
        },
        {
          value: "外语学部",
          label: "外语学部"
        },
        {
          value: "经济管理学部",
          label: "经济管理学部"
        },
        {
          value: "信息科学与技术学部",
          label: "信息科学与技术学部"
        },
        {
          value: "人文社会科学学部",
          label: "人文社会科学学部"
        },
        {
          value: "机械与电气工程学部",
          label: "机械与电气工程学部"
        },
        {
          value: "城市建设工程学部",
          label: "城市建设工程学部"
        }
      ],
      userId: "",
      userName: "",
      userPass: "",
      checkedUserDept: "",
      checkedUserSex: "",
      userIdLong: 12,
      passLong: 20,
      userNameLong: 10
    };
  },
  methods: {
    register: async function() {
      //校验
      if (this.userId == "" || !(/^\d+$/.test(this.userId))) {
        alert("学号只能为纯数字以及不能为空！");
      } else if (this.userId.length != 12) {
        alert("请输入正确学号！");
      } else if (this.userPass == ""||!( /^\S*$/.test(this.userPass))) {
        alert("密码不能为空以及有空格！");
      } else if (this.userName == "") {
        alert("姓名不能为空！");
      } else if (this.checkedUserSex == ""){
        alert("请选择性别");
      } else if (this.checkedUserDept == ""){
        alert("请选择所在系");
      }
      else {
        let data = {
          userId: this.userId,
          userName: this.userName,
          userPass: this.userPass,
          userDept: this.checkedUserDept,
          userSex: this.checkedUserSex
        };
        let result = await LoginServie.register(data);
        console.log(result);
        switch(result.data.data)
          {
            case "success":
              // alert("注册成功")
              var r=confirm("注册成功,是否跳转到登陆页面")
              if (r==true)
                {
                  this.$router.push("/");
                }
              break;
            case "registered":
              alert("该用户已被注册,如有问题请联系管理员")
              break;                                           
          }
      }
    }
  }
};
</script>
<style scoped>
@import "./register.css";
</style>
