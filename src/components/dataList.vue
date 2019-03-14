<template>
  <div class="dataList">
    <div style="position:relative">
      <div class="searchFromBookList" v-if="ifSearch">
        <Select v-model="searchType" style="width:70px;display:inline-block">
          <Option v-for="item in searchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="display:inline-block">
          <Input search placeholder="搜索前请选择搜索对象..." v-model="searchTxt" @on-search="searchBook"/>
        </div>
      </div>
      <Table
        :style="{margin: '20px'}"
        :columns="(States=='book') ? columns1:columns2"
        :data="showList"
      ></Table>
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
      columns2: [
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
          key: "userSex"
        },
        {
          title: "学部",
          key: "userDept"
        },
        {
          title: "备注",
          key: "note"
        }
      ]
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
  created() {}
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
