<template>
  <div class="little">
    <div class="imgdiv">
      <img :src="imgsrc" class="myimgdiv" />
    </div>
    <div class="last">
      <div class="index">{{index}}</div>
      <div class="info">{{info}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["imgsrc", "index", "info"]
};
</script>
<style scoped>
.little {
  width: 45em;
  height: 22em;
  background-color: #f9f9f9;
  margin-top: 15px;
  display: flex;
  box-sizing: border-box;
  padding-right: 40px;
}
.imgdiv {
  width: 55%;
  height: 100%;
}
.myimgdiv {
  width: 100%;
  height: 100%;
}
.last {
  width: 45%;
  height: 20em;
}
.index {
  color: #111111;
  font-size: 20px;
  margin-top: 50px;
  margin-left: 40px;
  text-align: left;
}
.info {
  color: #999999;
  font-size: 15px;
  margin-top: 25px;
  margin-left: 40px;
  text-align: left;
}
</style>
