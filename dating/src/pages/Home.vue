<template>
  <div id="Home">
      <Headtop></Headtop>
    <ul class="nav">
      <li><router-link to="/home" exact>爱园</router-link></li>
      <li><router-link to="/home/search">搜索</router-link></li>
      <li><router-link to="/home/activity">活动</router-link></li>
      <li><router-link to="/home/story">他她故事</router-link></li>
      <li><router-link to="/home/activity">会员</router-link></li>
      <li><router-link to="/home/activity">门店</router-link></li>
      <li><router-link to="/home/citytalk">同城聊</router-link></li>
      <li><router-link to="/home/activity">关于我们<Icon type="chevron-down"></Icon></router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
  import Headtop from '../components/Head'

import {indexApi} from '../common/api.js'
// import io from 'socket.io'
export default {
  name: 'login',
  data () {
    return {
      socket:null,
    }
  },
  components: {
    Headtop
  },
  methods: {},
    // beforeMount(){
    //     let useMsg = JSON.parse(localStorage.getItem('useMsg'))
    //     let {id,username} = useMsg
    //     let host = window.location.host
    //     host = host.split(':')
    //     this.socket = io.connect('ws://' + host[0] + ':8888');
    //     this.socket.emit('into',{username,id})
    // },

}
</script>
<style scoped>
   .nav{
     width: 100%;
     height: 30px;
     background: peachpuff;
   }
   .nav li{
     padding: 0 5px;
     float: left;
     height: 30px;
   }
  .nav li a{
    color:white;
    line-height: 30px;
  }
  .router-link-exact-active{
    height:30px;
    display: block;
    background:darkred;
  }



</style>
