<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="nav">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" @on-select="changeNav">
                    <MenuItem name="0" >
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
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}" v-show="navData[0]" class="manageBook">
                    <div class="operation">
                        <Button type="primary" @click.native="getBookList">获取书籍列表</Button>
                        <Button type="info" @click.native="addBookF">添加书籍</Button>
                        <Button type="info">删除书籍</Button>
                        <Button type="info">修改书籍</Button>
                        <div>
                            <Select v-model="searchType" style="width:70px;display:inline-block">
                                <Option v-for="item in searchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <div style="display:inline-block"><Input search placeholder="搜索前请选择搜索对象..." v-model="searchTxt" @on-search='searchBook'/></div>
                        </div>
                    </div>
                    <div class="bookList" v-show="bookNav[0]">
                        <Table :style="{margin: '20px'}" :columns="columns1" :data="showList"></Table>
                        <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage" class="bookPage"></Page>    
                    </div>
                    <div v-show="bookNav[1]">
                        <div >
                            <div v-for="item in addBook"class="addBookContent">
                                <div style="width:52px;display:inline-flex;justify-content:center;align-items:center"><span>{{item.label}}:</span></div>
                                <Input v-model="item.data" placeholder="请输入..." style="width: 150px;display:inline-block" />
                            </div>
                        </div>
                    </div>
                    <div v-show="bookNav[2]"></div>
                    <div v-show="bookNav[3]"></div>
                    
                </Content>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}" v-show="navData[1]">
                    manageUser
                </Content>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}" v-show="navData[2]">
                    manageAdmin
                </Content>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}" v-show="navData[3]">
                    borrowReturn
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import AdminServie from "@/apis/admin"
export default {
data () {
            return {
                isCollapsed: false,
                searchTxt:'',
                showList:[],                        // 显示的表格              
                dataCount:0,                        // 总条数
                pageSize:6,                         // 每页显示多少条
                navData:[true,false,false,false],
                bookNav:[false,false,false,false],
                searchType:'',
                addBook:[
                    {
                        value: 'ISBN',
                        label: 'ISBN',
                        data:'',
                    },
                    {
                        value: 'bookName',
                        label: '书名',
                        data:'',
                    },
                    {
                        value: 'author',
                        label: '作者',
                        data:'',
                    },
                    {
                        value: 'type',
                        label: '类型',
                        data:'',
                    },
                    {
                        value: 'press',
                        label: '出版社',
                        data:'',
                    },
                    {
                        value: 'pressTime',
                        label: '出版时间',
                        data:'',
                    },
                    {
                        value: 'stock',
                        label: '价格',
                        data:'',
                    },
                    {
                        value: 'position',
                        label: '位置',
                        data:'',
                    },
                    {
                        value: 'note',
                        label: '备注',
                        data:'',
                    },
                ],
                searchList:[
                    {
                        value: 'ISBN',
                        label: 'ISBN'
                    },
                    {
                        value: 'bookName',
                        label: '书名'
                    },
                    {
                        value: 'author',
                        label: '作者'
                    },
                    {
                        value: 'type',
                        label: '类型'
                    },
                    {
                        value: 'press',
                        label: '出版社'
                    },
                    
                ],
                columns1: [
                    {
                        title: 'ISBN',
                        key: 'ISBN'
                    },
                    {
                        title: '书名',
                        key: 'bookName'
                    },
                    {
                        title: '作者',
                        key: 'author'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '出版社',
                        key: 'press'
                    },
                    {
                        title: '出版时间',
                        key: 'pressTime'
                    },
                    {
                        title: '单价',
                        key: 'price',
                        sortable: true
                    },
                    {
                        title: '库存',
                        key: 'stock',
                        sortable: true
                    },
                    {
                        title: '位置',
                        key: 'position'
                    },
                    {
                        title: '备注',
                        key: 'bookNote'
                    },
                    
                ],
                bookList: [],
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        created(){
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            searchBook(){
                if(this.searchTxt==''){
                    if(this.bookList < this.pageSize){
                        this.showList = this.bookList;
                    }else{
                        this.showList = this.bookList.slice(0,this.pageSize);
                    }
                    this.dataCount=this.bookList.length
                }else{
                    this.showList=[];
                    let SearchType=this.searchType
                    for(let i=0;i<this.bookList.length;i++){
                        if(this.bookList[i][SearchType]==this.searchTxt)                          
                                this.showList.push(this.bookList[i])
                    }
                    this.dataCount=this.showList.length
                }
            },
            changeNav(name){
                for(let i=0;i<4;i++){
                    if(i==name) this.$set(this.navData,i,true);                 //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
                    else this.$set(this.navData,i,false)
                }
            },
            changeBookNav(name){
                for(let i=0;i<4;i++){
                    if(i==name) this.$set(this.bookNav,i,true);                 //vue检测不到直接索引设置元素，用vue.$set(this.$set)来更新数组或者对象
                    else this.$set(this.bookNav,i,false)
                }
            },     
            async getBookList(){
                this.changeBookNav(0)
                //获取数据 start
                let result =await AdminServie.getBookList()
                this.bookList=result.data.data
                //获取数据 end
                if(this.bookList < this.pageSize){
                    this.showList = this.bookList;
                }else{
                    this.showList = this.bookList.slice(0,this.pageSize);
                }
                this.dataCount=this.bookList.length
            },
            async addBookF(){
                this.changeBookNav(1)
            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.showList = this.bookList.slice(_start,_end);
            }
        }
}
</script>
<style scoped>
@import "./admin.css";
</style>
