
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
              <Dropdown trigger="click" style="margin-left: 20px">
                <p href="javascript:void(0)">
                  分类
                  <Icon type="ios-arrow-down"></Icon>
                </p>
                <DropdownMenu slot="list" class="bookType">
                  <DropdownItem
                    v-for="(item,index) in bookType"
                    :key="(item,index)"
                    class="bookTypeList"
                    @on-click="toBookType(item.code)"
                  >{{item.type}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <!-- <Icon type="ios-apps-outline"></Icon>
              分类-->
            </MenuItem>
            <MenuItem name="3">
              <Icon type="md-contact"></Icon>我的书架
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}"></Breadcrumb>
        <Card>
          <div style="min-height: 400px;">
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
export default {
  comments: {
    dataList
  },
  data() {
    return {
      theme3: "light",
      userId: "",
      userName: "",
      // bookType:['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','V','X','Z'],
      bookType: []
    };
  },
  methods: {
    toBookType() {}
  },
  created() {
    // this.userId=this.$route.params.userId
    // this.userName=this.$route.params.userName
    this.bookType = bookCode;
  },
  mounted() {}
};
</script>
<style scoped>
@import "./index.css";
</style>