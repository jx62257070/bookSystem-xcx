<template>
  <div class="layout">
    <Layout>
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        class="nav"
      >
        <Menu
          active-name="1-2"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          @on-select="changeNav"
        >
          <MenuItem name="0">
            <Icon type="ios-paper"></Icon>
            <span>管理书籍</span>
          </MenuItem>
          <MenuItem name="1">
            <Icon type="ios-contact-outline"></Icon>
            <span>管理用户</span>
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-nuclear-outline"></Icon>
            <span>管理admin</span>
          </MenuItem>
          <MenuItem name="3">
            <Icon type="md-paper-plane"></Icon>
            <span>借/还书</span>
          </MenuItem>
          <MenuItem name="4">
            <Icon type="md-book"></Icon>
            <span>操作记录</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
          <span>你好,{{adminName}}</span>
        </Header>
        <Content
          :style="{margin: '20px', background: '#fff', minHeight: '260px'}"
          v-show="navData[0]"
          class="manageBook"
        >
          <div class="operation">
            <Button type="primary" @click.native="getBookList">获取书籍列表</Button>
            <Button type="info" @click.native="addBookF">添加书籍</Button>
            <Button type="info" @click.native="delBook">删除书籍</Button>
            <Button type="info" @click.native="cheBook">修改书籍</Button>
          </div>
          <div class="bookList" v-show="bookNav[0]">
            <dataList :totalList="bookList" States="book" :ifSearch="stateTrue"></dataList>
          </div>
          <div class="addBook" v-show="bookNav[1]">
            <div style="position: relative">
              <div v-for="item in addBook" class="addBookContent">
                <div
                  style="width:52px;display:inline-flex;justify-content:center;align-items:center"
                >
                  <span>{{item.label}}:</span>
                </div>
                <Input
                  v-model="item.data"
                  :placeholder="item.checked"
                  style="width: 150px;display:inline-block"
                  v-if="item.label!='出版时间'"
                  :maxlength="addBookLong"
                />
                <DatePicker
                  format="yyyy年MM月dd日"
                  type="date"
                  :placeholder="item.checked"
                  style="width: 150px;display:inline-block"
                  v-model="item.data"
                  v-else
                ></DatePicker>
              </div>
              <div style="position: absolute;bottom: -40px;">
                <Button type="info" @click.native="clearAdd">清空</Button>
              </div>
              <div class="addBookBtn">
                <Button type="info" @click.native="addBookSQL">添加书籍</Button>
              </div>
            </div>
          </div>
          <div style="margin: 2%;margin-top:0;" v-show="bookNav[2]">
            <Input
              search
              placeholder="输入需要删除书籍的ISBN"
              v-model="delTxt"
              @on-search="searchDel"
              style="width:500px;margin-left:2%"
            />
            <dataList v-bind:totalList="searchDelBook" States="book" :ifSearch="stateFalse"></dataList>
            <div style="margin-top:20px">
              <Button type="info" style="margin-right:10px" @click.native="sureDel">确认删除</Button>
            </div>
          </div>
          <div v-show="bookNav[3]">
            <div style="margin: 2%;margin-top:0;">
              <Input
                search
                placeholder="输入需要修改书籍的ISBN"
                v-model="delTxt"
                @on-search="searchDel"
                style="width:500px;margin-left:2%"
              />
              <dataList :totalList="searchDelBook" States="book" :ifSearch="stateFalse"></dataList>
              <div style="margin-top:20px">
                <div v-for="item in updateBook" class="addBookContent" style="display:inline-block">
                  <div
                    style="width:52px;display:inline-flex;justify-content:center;align-items:center"
                  >
                    <span>{{item.label}}:</span>
                  </div>
                  <span v-if="item.value =='ISBN'">{{item.data}}</span>
                  <Input
                    v-model="item.data"
                    style="width: 150px;display:inline-block"
                    v-else-if="item.label!='出版时间'"
                  />
                  <DatePicker
                    format="yyyy年MM月dd日"
                    type="date"
                    style="width: 150px;display:inline-block"
                    v-model="item.data"
                    v-else-if="item.label !='ISBN'"
                  ></DatePicker>
                </div>
                <div style="margin-top:10px">
                  <Button type="info" style="margin-right:10px" @click.native="toCheBook">进行修改</Button>
                  <Button type="info" style="margin-right:10px" @click.native="sureche">确认修改</Button>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Content
          :style="{margin: '20px', background: '#fff', minHeight: '260px'}"
          v-show="navData[1]"
        >
          <div style="margin: 2%;">
            <Button type="primary" @click.native="getUserList">获取用户列表</Button>
            <Button type="info" @click.native="cheUser">修改用户信息</Button>
          </div>
          <dataList :totalList="userList" States="user" :ifSearch="stateTrue" v-if="userNav[0]"></dataList>
          <div class="cheUser" v-if="userNav[1]">
            <div style="margin: 2%;margin-top:0;">
              <Input
                search
                placeholder="输入需要修改用户学号"
                v-model="delTxt"
                @on-search="searchUser"
                style="width:500px;margin-left:2%"
                :maxlength="userIdLong"
              />
              <dataList :totalList="searchCheUser" States="user" :ifSearch="stateFalse"></dataList>
              <div style="margin-top:20px">
                <div v-for="item in updateUser" class="addBookContent" style="display:inline-block">
                  <div
                    style="width:52px;display:inline-flex;justify-content:center;align-items:center"
                  >
                    <span>{{item.label}}:</span>
                  </div>
                  <span v-if="item.value =='userId'">{{item.data}}</span>
                  <Input v-else v-model="item.data" style="width: 150px;display:inline-block"/>
                </div>
                <div style="margin-top:10px">
                  <Button type="info" style="margin-right:10px" @click.native="toCheAdmin">进行修改</Button>
                  <Button type="info" style="margin-right:10px" @click.native="sureChe">确认修改</Button>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Content
          :style="{margin: '20px', background: '#fff', minHeight: '260px'}"
          v-show="navData[2]"
        >
          <div style="margin: 2%;">
            <Button type="primary" @click.native="getAdminList">获取管理员列表</Button>
            <Button type="info" @click.native="addAdminF" v-show="permission<=2">添加管理员</Button>
            <Button type="info" @click.native="cheAdmin" v-show="permission<=2">修改管理员信息</Button>
          </div>
          <dataList :totalList="adminList" States="admin" :ifSearch="stateTrue" v-if="adminNav[0]"></dataList>
          <div class="cheUser" v-if="adminNav[1]">
            <div style="margin: 2%;margin-top:0;">
              <Input
                search
                placeholder="输入需要修改管理员ID"
                v-model="delTxt"
                @on-search="searchAdmin"
                style="width:500px;margin-left:2%"
              />
              <dataList :totalList="searchCheAdmin" States="admin" :ifSearch="stateFalse"></dataList>
              <div style="margin-top:20px">
                <div
                  v-for="item in updateAdmin"
                  class="addBookContent"
                  style="display:inline-block"
                >
                  <div
                    style="width:52px;display:inline-flex;justify-content:center;align-items:center"
                  >
                    <span>{{item.label}}:</span>
                  </div>
                  <span v-if="item.value =='adminId'">{{item.data}}</span>
                  <Input v-else v-model="item.data" style="width: 150px;display:inline-block"/>
                </div>
                <div style="margin-top:10px">
                  <Button type="info" style="margin-right:10px" @click.native="toCheAdmin">进行修改</Button>
                  <Button type="info" style="margin-right:10px" @click.native="sureCheAdmin">确认修改</Button>
                </div>
              </div>
            </div>
          </div>
          <div class="addBook" v-show="adminNav[2]">
            <div style="position: relative">
              <div v-for="item in addAdmin" class="addBookContent">
                <div
                  style="width:52px;display:inline-flex;justify-content:center;align-items:center"
                >
                  <span>{{item.label}}:</span>
                </div>
                <Input
                  v-model="item.data"
                  :placeholder="item.checked"
                  style="width: 150px;display:inline-block"
                  v-if="item.label!='出版时间'"
                />
                <div style="position: absolute;bottom: -40px;">
                  <Button type="info" @click.native="clearAdd">清空</Button>
                </div>
                <div class="addBookBtn">
                  <Button type="info" @click.native="addAdminSQL">添加管理员</Button>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Content
          :style="{margin: '20px', background: '#fff', minHeight: '260px'}"
          v-show="navData[3]"
        >borrowReturn</Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import AdminServie from "@/apis/admin";
import dataList from "@/components/dataList";
export default {
  components: {
    dataList
  },
  data() {
    return {
      adminId: "",
      adminName: "",
      permission: 3,
      userIdLong: 12,
      stateTrue: true,
      stateFalse: false,
      isCollapsed: false,
      navData: [false, false, false, false, false],
      bookNav: [false, false, false, false],
      userNav: [false, false],
      adminNav: [false, false,false],
      addBookLong: 13,
      addBook: [
        {
          value: "ISBN",
          label: "ISBN",
          data: "",
          checked: "必填+数字.."
        },
        {
          value: "bookName",
          label: "书名",
          data: "",
          checked: "必填.."
        },
        {
          value: "author",
          label: "作者",
          data: "",
          checked: "必填.."
        },
        {
          value: "type",
          label: "类型",
          data: "",
          checked: "必填+大写字母.."
        },
        {
          value: "press",
          label: "出版社",
          data: "",
          checked: "选填.."
        },
        {
          value: "pressTime",
          label: "出版时间",
          data: "",
          checked: "选填.."
        },
        {
          value: "stock",
          label: "库存",
          data: "",
          checked: "必填.."
        },
        {
          value: "position",
          label: "位置",
          data: "",
          checked: "必填.."
        },
        {
          value: "price",
          label: "单价",
          data: "",
          checked: "选填.."
        },
        {
          value: "note",
          label: "备注",
          data: "",
          checked: "选填.."
        }
      ],
      bookList: [],
      userList: [],
      adminList: [],
      delTxt: "",
      searchDelBook: [],
      searchCheBook: [],
      searchCheAdmin: [],
      sureCheBook: [],
      searchCheUser: [],
      searchCheAdmin: [],
      updateBook: [
        {
          value: "ISBN",
          label: "ISBN",
          data: ""
        },
        {
          value: "bookName",
          label: "书名",
          data: ""
        },
        {
          value: "author",
          label: "作者",
          data: ""
        },
        {
          value: "type",
          label: "类型",
          data: ""
        },
        {
          value: "press",
          label: "出版社",
          data: ""
        },
        {
          value: "pressTime",
          label: "出版时间",
          data: ""
        },
        {
          value: "stock",
          label: "库存",
          data: ""
        },
        {
          value: "position",
          label: "位置",
          data: ""
        },
        {
          value: "price",
          label: "单价",
          data: ""
        },
        {
          value: "note",
          label: "备注",
          data: ""
        }
      ],
      updateUser: [
        {
          value: "userId",
          label: "学号",
          data: ""
        },
        {
          value: "userName",
          label: "姓名",
          data: ""
        },
        {
          value: "password",
          label: "密码",
          data: ""
        },
        {
          value: "userSex",
          label: "性别",
          data: ""
        },
        {
          value: "userDept",
          label: "学部",
          data: ""
        },
        {
          value: "note",
          label: "备注",
          data: ""
        }
      ],
      updateAdmin: [
        {
          value: "adminId",
          label: "ID",
          data: ""
        },
        {
          value: "adminName",
          label: "姓名",
          data: ""
        },
        {
          value: "password",
          label: "密码",
          data: ""
        },
        {
          value: "adminSex",
          label: "性别",
          data: ""
        },
        {
          value: "adminPhone",
          label: "电话",
          data: ""
        },
        {
          value: "permission",
          label: "权限",
          data: ""
        },
        {
          value: "note",
          label: "备注",
          data: ""
        }
      ],
      addAdmin: [
        {
          value: "admin",
          label: "工号",
          data: "",
          checked: "必填+数字.."
        },
        {
          value: "adminName",
          label: "姓名",
          data: "",
          checked: "必填.."
        },
        {
          value: "pessword",
          label: "密码",
          data: "",
          checked: "必填.."
        },
        {
          value: "adminSex",
          label: "性别",
          data: "",
          checked: "必填"
        },
        {
          value: "adminPhone",
          label: "电话",
          data: "",
          checked: "必填"
        },
        {
          value: "permission",
          label: "权限",
          data: "",
          checked: "必填"
        },
        {
          value: "note",
          label: "备注",
          data: "",
          checked: "选填.."
        }
      ]
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  async created() {
    if (this.$route.params.userId == undefined) {
      alert("请登录！");
      this.$router.push({ name: "login" });
    } else {
      this.adminId = this.$route.params.userId;
      let data = {
        adminId: this.adminId
      };
      let result = await AdminServie.searchAdmin(data);
      this.permission = result.data.data.permission;
      this.adminName = result.data.data.adminName;
    }
  },
  methods: {
    clearAdd() {
      this.addBook.map(item => {
        item.data = "";
      });
      this.addAdmin.map(item => {
        item.data = "";
      });
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    changeNav(name) {
      for (let i = 0; i < this.navData.length; i++) {
        if (i == name) this.$set(this.navData, i, true);
        //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
        else this.$set(this.navData, i, false);
      }
    },
    changeChildNav(name, nav) {
      for (let i = 0; i < this[nav].length; i++) {
        if (i == name) this.$set(this[nav], i, true);
        //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
        else this.$set(this[nav], i, false);
      }
    },
    async getBookList() {
      this.changeChildNav(0, "bookNav");
      //获取数据 start
      let result = await AdminServie.getBookList();
      this.bookList = result.data.data;
      //获取数据 end
      if (this.bookList < this.pageSize) {
        this.showList = this.bookList;
      } else {
        this.showList = this.bookList.slice(0, this.pageSize);
      }
      this.dataCount = this.bookList.length;
    },
    async addBookF() {
      this.changeChildNav(1, "bookNav");
      this.clearAdd();
    },
    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.showList = this.bookList.slice(_start, _end);
    },
    changeTime(data) {
      var year = new Date(data).getFullYear(); //获取完整的年份(4位,1970-????)
      var month = new Date(data).getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var day = new Date(data).getDate(); //获取当前日(1-31)
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      let newData = year + "-" + month + "-" + day;
      return newData;
    },
    async addBookSQL() {
      let addBookData = {
        ISBN: this.addBook[0].data,
        bookName: this.addBook[1].data,
        author: this.addBook[2].data,
        type: this.addBook[3].data,
        press: this.addBook[4].data,
        pressTime: this.addBook[5].data,
        stock: this.addBook[6].data,
        position: this.addBook[7].data,
        price: this.addBook[8].data,
        note: this.addBook[9].data,
        adminId: this.adminId
      };
      addBookData.pressTime = this.changeTime(addBookData.pressTime);
      if (addBookData.ISBN == "") {
        alert("ISBN不能为空！");
      } else if (addBookData.bookName == "") {
        alert("书名不能为空！");
      } else if (addBookData.author == "") {
        alert("作者不能为空！");
      } else if (addBookData.type == "") {
        alert("类型不能为空！");
      } else if (addBookData.stock == "") {
        alert("库存不能为空！");
      } else if (addBookData.position == "") {
        alert("位置不能为空！");
      } else {
        let sureData = confirm(`确认添加《${addBookData.bookName}》吗？`);
        if (sureData == true) {
          let result = await AdminServie.addBook(addBookData);
          if (result.data.data == "success") alert("添加成功");
          else if (result.data.data == "added") alert("已添加过的书籍!");
        }
      }
    },
    delBook() {
      this.changeChildNav(2, "bookNav");
      this.delTxt = "";
      this.searchDelBook = [];
    },
    async searchDel() {
      let data = {
        ISBN: this.delTxt
      };
      let result = await AdminServie.searchBook(data);
      if (result.data.data == "no book") {
        alert("未存入的书籍!!!");
      } else {
        let delBook = result.data.data;
        this.$set(this.searchDelBook, 0, delBook);
      }
    },
    async sureDel() {
      if (this.searchDelBook[0] == undefined) {
        alert("未确定删除的书籍!!!");
      } else {
        let sureData = confirm(
          `确认删除《${this.searchDelBook[0].bookName}》吗？`
        );
        if (sureData == true) {
          let data = {
            ISBN: this.searchDelBook[0].ISBN
          };
          let result = await AdminServie.delBook(data);
        }
      }
    },
    cheBook() {
      this.changeChildNav(3, "bookNav");
      this.delTxt = "";
      this.searchDelBook = [];
      for (let i = 0; i < 10; i++) {
        this.updateBook[i].data = "";
      }
    },
    toCheBook() {
      if (this.searchDelBook[0] == undefined) {
        alert("未搜索到修改的书籍!!!");
      } else {
        //方法1
        for (let i = 0; i < 10; i++) {
          this.updateBook[i].data = this.searchDelBook[0][
            this.updateBook[i].value
          ];
        }
        //方法2
        // this.updateBook[0].data=this.searchDelBook[0].ISBN,
        // this.updateBook[1].data=this.searchDelBook[0].bookName,
        // this.updateBook[2].data=this.searchDelBook[0].author,
        // this.updateBook[3].data=this.searchDelBook[0].type,
        // this.updateBook[4].data=this.searchDelBook[0].press,
        // this.updateBook[5].data=this.searchDelBook[0].pressTime,
        // this.updateBook[6].data=this.searchDelBook[0].stock,
        // this.updateBook[7].data=this.searchDelBook[0].position,
        // this.updateBook[8].data=this.searchDelBook[0].price,
        // this.updateBook[9].data=this.searchDelBook[0].note
      }
    },
    async sureche() {
      if (this.updateBook[0].data == "") alert("请确认修改内容!!!");
      else {
        let update = {};
        for (let i = 0; i < 10; i++) {
          update[this.updateBook[i].value] = this.updateBook[i].data;
        }
        if (update.pressTime == "") update.pressTime = "0000-00-00";
        else update.pressTime = this.changeTime(update.pressTime);
        let result = await AdminServie.updateBook(update);
        if (result.data.data == "success") alert("修改成功");
        else alert("修改失败,请重试");
      }
    },
    async getUserList() {
      this.changeChildNav(0, "userNav");
      let result = await AdminServie.getUserList();
      this.userList = result.data.data;
    },
    cheUser() {
      this.changeChildNav(1, "userNav");
      this.delTxt = "";
      this.searchCheUser = [];
      for (let i = 0; i < this.updateUser.length; i++) {
        this.updateUser[i].data = "";
      }
    },
    async searchUser() {
      let data = {
        userId: this.delTxt
      };
      let result = await AdminServie.searchUser(data);
      if (result.data.data == "no user") {
        alert("未注册的用户!!!");
      } else {
        let user = result.data.data;
        this.$set(this.searchCheUser, 0, user);
      }
    },
    toCheUser() {
      if (this.searchCheUser[0] == undefined) {
        alert("未搜索到用户!!!");
      } else {
        for (let i = 0; i < this.updateUser.length; i++) {
          this.updateUser[i].data = this.searchCheUser[0][
            this.updateUser[i].value
          ];
        }
      }
    },
    async sureChe() {
      if (this.updateUser[0].data == "") alert("请确认修改内容!!!");
      else {
        let update = {};
        for (let i = 0; i < this.updateUser.length; i++) {
          if (this.updateUser[i].data == null)
            update[this.updateUser[i].value] = "";
          else update[this.updateUser[i].value] = this.updateUser[i].data;
        }
        let result = await AdminServie.updateUser(update);
        if (result.data.data == "success") alert("修改成功");
        else alert("修改失败,请重试");
      }
    },
    async getAdminList() {
      this.changeChildNav(0, "adminNav");
      let result = await AdminServie.getAdminList();
      this.adminList = result.data.data;
    },
    async searchAdmin() {
      let data = {
        adminId: this.delTxt
      };
      let result = await AdminServie.searchAdmin(data);
      if (result.data.data == "no admin") {
        alert("未注册的管理员!!!");
      } else {
        let user = result.data.data;
        this.$set(this.searchCheAdmin, 0, user);
      }
    },
    cheAdmin() {
      this.changeChildNav(1, "adminNav");
      this.delTxt = "";
      this.searchCheUser = [];
      for (let i = 0; i < this.updateAdmin.length; i++) {
        this.updateAdmin[i].data = "";
      }
    },
    toCheAdmin() {
      if (this.searchCheAdmin[0] == undefined) {
        alert("未搜索到管理员!!!");
      } else {
        for (let i = 0; i < this.updateAdmin.length; i++) {
          this.updateAdmin[i].data = this.searchCheAdmin[0][
            this.updateAdmin[i].value
          ];
        }
      }
    },
    async sureCheAdmin() {
      if (this.updateAdmin[0].data == "") alert("请确认修改内容!!!");
      else {
        let update = {};
        for (let i = 0; i < this.updateAdmin.length; i++) {
          if (this.updateAdmin[i].data == null)
            update[this.updateAdmin[i].value] = "";
          else update[this.updateAdmin[i].value] = this.updateAdmin[i].data;
        }
        let result = await AdminServie.updateAdmin(update);
        if (result.data.data == "success") alert("修改成功");
        else alert("修改失败,请重试");
      }
    },
    async addAdminF() {
      this.changeChildNav(2, "adminNav");
      this.clearAdd();
    }
  }
};
</script>
<style scoped>
@import "./admin.css";
</style>
