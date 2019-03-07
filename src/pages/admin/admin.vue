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
            <div style="width:300px">
              <Select
                v-model="searchType"
                style="width:70px;display:inline-block"
                v-show="bookNav[0]"
              >
                <Option
                  v-for="item in searchList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <div style="display:inline-block" v-show="bookNav[0]">
                <Input
                  search
                  placeholder="搜索前请选择搜索对象..."
                  v-model="searchTxt"
                  @on-search="searchBook"
                />
              </div>
            </div>
          </div>
          <div class="bookList" v-show="bookNav[0]">
            <Table :style="{margin: '20px'}" :columns="columns1" :data="showList"></Table>
            <Page
              :total="dataCount"
              :page-size="pageSize"
              show-total
              @on-change="changepage"
              class="bookPage"
            ></Page>
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
                <Button type="info" @click.native="clearAddBook">清空</Button>
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
              style="width:500px"
            />
            <div style="height:20px"></div>
            <Table :columns="columns1" :data="searchDelBook"></Table>
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
                style="width:500px"
              />
              <div style="height:20px"></div>
              <Table :columns="columns1" :data="searchDelBook"></Table>
              <div style="margin-top:20px">
                <div v-for="item in updateBook" class="addBookContent" style="display:inline-block">
                  <div
                    style="width:52px;display:inline-flex;justify-content:center;align-items:center"
                  >
                    <span>{{item.label}}:</span>
                  </div>
                  <span v-if="item.label =='ISBN'">{{item.data}}</span>
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
        >manageUser</Content>
        <Content
          :style="{margin: '20px', background: '#fff', minHeight: '260px'}"
          v-show="navData[2]"
        >manageAdmin</Content>
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
export default {
  components: {},
  data() {
    return {
      isCollapsed: false,
      searchTxt: "",
      showList: [], // 显示的表格
      dataCount: 0, // 总条数
      pageSize: 6, // 每页显示多少条
      navData: [true, false, false, false],
      bookNav: [false, false, false, false],
      searchType: "",
      addBook: [
        {
          value: "ISBN",
          label: "ISBN",
          data: "",
          checked: "必填.."
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
          checked: "必填.."
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
      searchList: [
        {
          value: "ISBN",
          label: "ISBN"
        },
        {
          value: "bookName",
          label: "书名"
        },
        {
          value: "author",
          label: "作者"
        },
        {
          value: "type",
          label: "类型"
        },
        {
          value: "press",
          label: "出版社"
        }
      ],
      columns1: [
        {
          title: "ISBN",
          key: "ISBN"
        },
        {
          title: "书名",
          key: "bookName"
        },
        {
          title: "作者",
          key: "author"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "出版社",
          key: "press"
        },
        {
          title: "出版时间",
          key: "pressTime"
        },
        {
          title: "单价",
          key: "price",
          sortable: true
        },
        {
          title: "库存",
          key: "stock",
          sortable: true
        },
        {
          title: "位置",
          key: "position"
        },
        {
          title: "备注",
          key: "bookNote"
        }
      ],
      bookList: [],
      delTxt: "",
      searchDelBook: [],
      searchCheBook: [],
      sureCheBook: [],
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
  created() {},
  methods: {
    clearAddBook() {
      this.addBook.map(item => {
        item.data = "";
      });
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    searchBook() {
      if (this.searchTxt == "") {
        if (this.bookList < this.pageSize) {
          this.showList = this.bookList;
        } else {
          this.showList = this.bookList.slice(0, this.pageSize);
        }
        this.dataCount = this.bookList.length;
      } else {
        this.showList = [];
        let SearchType = this.searchType;
        for (let i = 0; i < this.bookList.length; i++) {
          if (this.bookList[i][SearchType] == this.searchTxt)
            this.showList.push(this.bookList[i]);
        }
        this.dataCount = this.showList.length;
      }
    },
    changeNav(name) {
      for (let i = 0; i < 4; i++) {
        if (i == name) this.$set(this.navData, i, true);
        //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
        else this.$set(this.navData, i, false);
      }
    },
    changeBookNav(name) {
      for (let i = 0; i < 4; i++) {
        if (i == name) this.$set(this.bookNav, i, true);
        //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
        else this.$set(this.bookNav, i, false);
      }
    },
    async getBookList() {
      this.changeBookNav(0);
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
      this.changeBookNav(1);
      this.clearAddBook();
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
        note: this.addBook[9].data
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
          if(result.data.data=="success") alert("添加成功")
          else if(result.data.data=="added") alert("已添加过的书籍!")
        }
      }
    },
    delBook() {
      this.changeBookNav(2);
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
        let data = {
          ISBN: this.searchDelBook[0].ISBN
        };
        let result = await AdminServie.delBook(data);
      }
    },
    cheBook() {
      this.changeBookNav(3);
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
    }
  }
};
</script>
<style scoped>
@import "./admin.css";
</style>
