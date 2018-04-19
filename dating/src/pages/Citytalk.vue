<template>
    <div class="layout">

      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </MenuItem>
              <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                Item 4
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  Item 1
                </template>
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
                <MenuItem name="1-3">Option 3</MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  Item 2
                </template>
                <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '200px', background: '#fff'}">
              暂无消息,赶紧来占个沙发～

              <Mymsg v-if="username==username"></Mymsg>
              <Othermsg v-if="username!==username"></Othermsg>

            </Content>
            <div>
              <Input placeholder="Enter" v-mode="sendInput"/>
              <Button type="primary" @click="submsg">发送</Button>
              <div class="sendimg"></div>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </div>
</template>

<script>
  import Mymsg from '../components/Mymsg'
  import Othermsg from '../components/Othermsg'
  import io from 'socket.io'

    export default {
        name: "citytalk",
      data() {
         return {
           sendInput: ''
         }
      },
      components: {
        Mymsg,
        Othermsg
      },
      methods: {
        beforeMount() {
            // let host = window.location.host
            // host = host.split(':')
            // this.socket = io.connect('ws://' + host[0] + ':8888');
            // this.socket.emit('into',{username,id})
        },
        submsg() {
           if(this.sendInput !== ''){
             console.log("fasong?")
           }else{
             this.$Message.error('输入不能为空！')
           }
        }
      },
      mounted() {
        const obj = {
          name: '12',
          src: '123',
          roomid: 1
        };

        let host = window.location.host
        host = host.split(':')
        this.socket = io.connect('ws://' + host[0] + ':8888');

        this.socket.emit('login', obj);
        this.socket.on('message', function (obj) {
          window.scroll(0, 10000)
        })
        this.socket.on('login', function (obj) {
        })
        this.socket.on('logout', function (obj) {
        })
      }



    }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
