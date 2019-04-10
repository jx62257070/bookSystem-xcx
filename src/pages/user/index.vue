
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <div>
                <Input class="searchTxt" search placeholder="搜索书籍..."/>
              </div>
            </MenuItem>
            <MenuItem name="2">
              <Dropdown trigger="click" style="margin-left: 20px" @on-click="toBookType">
                <p href="javascript:void(0)">
                  分类
                  <Icon type="ios-arrow-down"></Icon>
                </p>
                <DropdownMenu slot="list" class="bookType">
                  <DropdownItem
                    v-for="(item,index) in bookType"
                    :name="item.code"
                    :key="(item,index)"
                    class="bookTypeList"
                  >{{item.type}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <!-- <Icon type="ios-apps-outline"></Icon>
              分类-->
            </MenuItem>
            <MenuItem name="3" @click.native="myBookcase">
              <Icon type="md-contact"></Icon>我的书架
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}"></Breadcrumb>
        <Card>
          <div style="min-height: 400px;">
            <div class="bookList" v-show="userNav[0]">
              <dataList :totalList="showBookList" States="book" :ifSearch="stateTrue"></dataList>
            </div>
            <div v-show="userNav[1]">
              <dataList :totalList="showBookList" States="book" :ifSearch="stateFalse"></dataList>
            </div>
            <!-- <div class="bookType">
                        <div class="bookTypeList" v-for="(item,index) in bookType" :key="(item,index)"><Button type="info" ghost>{{item}}</Button></div>
            </div>-->
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center"></Footer>
    </Layout>
  </div>
</template>
<script>
import bookCode from "@/utils/bookCode";
import dataList from "@/components/dataList";
import UserServie from "@/apis/user";
export default {
  components: {
    dataList
  },
  data() {
    return {
      theme3: "light",
      userId: "",
      userName: "",
      bookType: [],
      userNav:[false,false],
      stateTrue:true,
      stateFalse:false,
      showBookList:[]
    };
  },
  methods: {
    clearList(){
      showBookList=[];
    },
    async toBookType(name) {
      this.showBookList()
      this.changeChildNav(0,'userNav')
      let data={
        type:name
      }
      let result =await UserServie.getBookListByType(data)
      console.log(name);
    },
    changeChildNav(name, nav) {
      for (let i = 0; i < this[nav].length; i++) {
        if (i == name) this.$set(this[nav], i, true);
        //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
        else this.$set(this[nav], i, false);
      }
    },
    myBookcase(){
      this.showBookList()
      this.changeChildNav(1,'userNav')
    },
  },
  created() {
    this.userId=this.$route.params.userId
    // this.userName=this.$route.params.userName
    this.bookType = bookCode;
  },
  mounted() {}
};
</script>
<style scoped>
@import "./index.css";
</style>