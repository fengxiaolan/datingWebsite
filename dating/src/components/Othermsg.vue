<template>
  <div class="clear">
    <div class="item">
      <div class="name">
        <span >{{getdate}}</span> &nbsp;&nbsp;
        {{name}}
      </div>
      <!--<img :src="head" alt="" class="head">-->
      <!--<div v-if="img">-->
        <!--<img :src="img" alt="" class="img">-->
      <!--</div>-->
      <!--<span v-if="msg">-->
                <!--{{msg}}-->
      <!--</span>-->
    </div>
  </div>
</template>

<script>
  import dateFormat from '../common/date'
  export default {
    name: "mymsg",
    computed: {
      getdate() {
        return dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
      }
    }
  }
</script>

<style scoped>

</style>
