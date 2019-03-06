
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
                            我的书架
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                </Breadcrumb>
                <Card>
                    <div style="min-height: 400px;">
                        <div class="classify"></div>
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme3: 'light',
                userId:'',
                userName:''
            }
        },
        methods:{
            // changeSearch:function(){  
            //         this.ifshow=!this.ifshow                 
            // }
        },
        created(){
            this.userId=this.$route.params.userId
            this.userName=this.$route.params.userName
        }
    }
</script>
<style scoped>
@import "./index.css";
</style>