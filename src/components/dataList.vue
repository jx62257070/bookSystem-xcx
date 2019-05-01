<template>
  <div class="dataList">
    <div style="position:relative">
      <div class="searchFromBookList" v-if="ifSearch">
        <Select v-model="searchType" style="width:70px;display:inline-block">
          <Option
            v-for="item in showSearchList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <div style="display:inline-block">
          <Input search placeholder="搜索前请选择搜索对象..." v-model="searchTxt" @on-search="searchBook"/>
        </div>
      </div>
      <Table :style="{margin: '20px'}" :columns="showColumns" :data="showList"></Table>
      <Page
        :total="dataCount"
        :page-size="pageSize"
        show-total
        @on-change="changepage"
        class="bookPage"
      ></Page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataCount: 0, // 总条数
      pageSize: 6, // 每页显示多少条
      showList: [],
      searchType: "",
      searchTxt: "",
      showSearchList: [],
      showColumns: [],
      searchBookList: [
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
      searchUserList: [
        {
          value: "userId",
          label: "学号"
        },
        {
          value: "userName",
          label: "姓名"
        },
        {
          value: "userDept",
          label: "学部"
        }
      ],
      searchAdminList: [
        {
          value: "adminId",
          label: "ID"
        },
        {
          value: "adminName",
          label: "姓名"
        },
        {
          value: "permission",
          label: "权限"
        }
      ],
      columnsBook: [
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
      columnsUser: [
        {
          title: "学号",
          key: "userId"
        },
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "性别",
          key: "userSex",
          sortable: true
        },
        {
          title: "学部",
          key: "userDept"
        },
        {
          title: "备注",
          key: "note"
        }
      ],
      columnsAdmin: [
        {
          title: "工号",
          key: "adminId"
        },
        {
          title: "姓名",
          key: "adminName"
        },
        {
          title: "性别",
          key: "adminSex",
          sortable: true
        },
        {
          title: "电话",
          key: "adminPhone"
        },
        {
          title: "权限",
          key: "permission",
          sortable: true
        },
        {
          title: "备注",
          key: "note"
        }
      ],
      columnsLogList: [
        {
          title: "工号",
          key: "adminId"
        },
        {
          title: "学号",
          key: "userId"
        },
        {
          title: "ISBN",
          key: "ISBN",
        },
        {
          title: "借书日期",
          key: "borrowTime",
          sortable: true
        },
        {
          title: "还书日期",
          key: "returnTime",
          sortable: true
        },
        {
          title: "是否return",
          key: "isReturn"
        },
        {
          title: "是否续借",
          key: "(isReborrow"
        },
        {
          title: "备注",
          key: "note"
        },
      ],
      columnsBRLog: [
        {
          title: "工号",
          key: "adminId"
        },
        {
          title: "学号",
          key: "userId"
        },
        {
          title: "ISBN",
          key: "ISBN",
        },
        {
          title: "借还确认",
          key: "confirm"
        },
        {
          title: "确认时间",
          key: "time",
          sortable: true
        },
        {
          title: "备注",
          key: "note"
        }
      ],
      columnsAddBookLog: [
        {
          title: "工号",
          key: "adminId"
        },
        {
          title: "ISBN",
          key: "ISBN"
        },
        {
          title: "添加时间",
          key: "add_time",
          sortable: true
        }
      ],
      columnsAddAdminLog: [
        {
          title: "操作者",
          key: "adminId"
        },
        {
          title: "新增管理员",
          key: "newadminId"
        },
        {
          title: "添加时间",
          key: "add_time",
          sortable: true
        }
      ],

      
    };
  },
  props: {
    totalList: Array,
    States: String,
    ifSearch: Boolean
  },
  methods: {
    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.showList = this.totalList.slice(_start, _end);
    },
    searchBook() {
      if (this.searchTxt == "") {
        if (this.totalList < this.pageSize) {
          this.showList = this.totalList;
        } else {
          this.showList = this.totalList.slice(0, this.pageSize);
        }
        this.dataCount = this.totalList.length;
      } else {
        this.showList = [];
        let SearchType = this.searchType;
        for (let i = 0; i < this.totalList.length; i++) {
          if (this.totalList[i][SearchType] == this.searchTxt)
            this.showList.push(this.totalList[i]);
        }
        this.dataCount = this.showList.length;
      }
    }
  },
  watch: {
    totalList: function(newList) {
      if (this.totalList < this.pageSize) {
        this.showList = this.totalList;
      } else {
        this.showList = this.totalList.slice(0, this.pageSize);
      }
      this.dataCount = this.totalList.length;
    }
  },
  created() {
    switch (this.States) {
      case "book":
        this.showColumns = this.columnsBook;
        this.showSearchList = this.searchBookList;
        break;
      case "user":
        this.showColumns = this.columnsUser;
        this.showSearchList = this.searchUserList;
        break;
      case "admin":
        this.showColumns = this.columnsAdmin;
        this.showSearchList = this.searchAdminList;
        break;
      case "LogList":
        this.showColumns = this.columnsLogList;
        this.showSearchList = this.searchLogList;
        break;
      case "BRLog":
        this.showColumns = this.columnsBRLog;
        this.showSearchList = this.searchBRLog;
        break;
      case "AddBookLog":
        this.showColumns = this.columnsAddBookLog;
        this.showSearchList = this.searchAddBookLog;
        break;
      case "AddAdminLog":
        this.showColumns = this.columnsAddAdminLog;
        this.showSearchList = this.searchAddAdminLog;
        break;

      default:
        break;
    }
  }
};
</script>
<style scoped>
.bookPage {
  margin-left: 2%;
}
.searchFromBookList {
  position: absolute;
  right: 2%;
  top: -55px;
  z-index: 1;
}
</style>
