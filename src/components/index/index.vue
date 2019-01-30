
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" >
                            <div>
                                <Input class="searchTxt" search placeholder="搜索书籍..." />
                            </div>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-apps-outline"></Icon>
                            分类
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="md-contact"></Icon>
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    我的
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>书架</DropdownItem>
                                    <!-- <DropdownItem>炸酱面</DropdownItem>
                                    <DropdownItem disabled>豆汁儿</DropdownItem>
                                    <DropdownItem>冰糖葫芦</DropdownItem>
                                    <DropdownItem divided>北京烤鸭</DropdownItem> -->
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="min-height: 400px;">
                        Content
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme3: 'light',

            }
        },
        methods:{
            // changeSearch:function(){  
            //         this.ifshow=!this.ifshow                 
            // }
        }
    }
</script>
<style scoped>
@import "./index.css";
</style>