<template>
    <div class="wrap">
      <Carous></Carous>
    </div>
</template>

<script>
  import Carous from '../components/Carous'
    export default {
      name: "show",
      components: {
          Carous
      }
    }
</script>

<style scoped>
.wrap{
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>
