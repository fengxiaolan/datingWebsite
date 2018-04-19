<template>
    <div class="head clearfix">
      <div class="hleft">在这里，遇见你</div>
      <div class="hright">
        <Icon type="headphone"></Icon>
        <span>热线电话: 028-8888-8888</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "headtop"
    }
</script>

<style scoped>
.head{
  height: 22px;
  width: 100%;
  background: #e9e9e9;
}
  .hleft{
    float: left;
    margin-left: 5px;
    line-height: 22px;
  }

  .hright{
    float: right;
    color: #ed3f14;
    margin-right: 20px;
    line-height: 22px;
  }
</style>
