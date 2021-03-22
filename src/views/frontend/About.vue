<template>
  <div class="container my-5 d-flex flex-xl-row justify-content-xl-around
  flex-column align-items-center">
    <div class="about">
      <img src="https://i1.achangpro.com/img.hannah.tw/20181013150958_58.jpg" alt="">
    </div>

    <div class="aboutContent">
      <p>
        「 Bonjour」<br>
        在巴黎街角的22號咖啡座<br>
        和愛人一起品嚐濃郁的咖啡<br>
        慵懶的享受午後的陽光<br>
        看著人群踩著從容的步伐走過街道<br>
        隨意率性的撥弄頭髮<br>
        帶著不經意的自信笑容<br>
        穿衣風格各自不同卻充滿著自信<br>
        散發出一種獨特的魅力<br>
        構成一幅美麗的風景
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
    };
  },
};
</script>

<style>
.about {
  max-width: 666px;
}

.about img {
  width: 100%;
  object-fit: contain;
}

.aboutContent {
  max-width: 444px;
  line-height: 50px; letter-spacing: 3px;
}

@media (max-width: 1199.98px) {
  .aboutContent {
    font-size: 20px;
    margin-top: 20px;
  }
}
</style>
