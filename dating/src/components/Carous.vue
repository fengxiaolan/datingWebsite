<template>
  <Carousel v-model="value2" autoplay loop radius-dot :autoplay-speed="4000" :height="200">
    <CarouselItem v-for="(banner, index) in carousImg" :key="index">
      <div class="demo-carousel" >
        <img :src="banner.img" alt="banner" class="banimg"/>
      </div>
    </CarouselItem>
  </Carousel>
</template>

<script>
    export default {
      name: "carous",
      data () {
        return {
          value2: 0,
          carousImg:[
            {"img": './static/images/banner1.jpg', "url": "http://www.baidu.com"},
            {"img": './static/images/banner2.jpg', "url": "http://www.baidu.com"},
            {"img": './static/images/banner3.jpg', "url": "http://www.baidu.com"},
            {"img": './static/images/banner4.jpg', "url": "http://www.baidu.com"}
          ]
        }
      }
    }
</script>

<style scoped>
.banimg{
  width:100%;
  height: 200px;
}
</style>
