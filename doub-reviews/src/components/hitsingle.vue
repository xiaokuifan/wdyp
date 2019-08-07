<template>
  <div class="every">
    <div class="singleimg">
      <img :src="imgsrc" />
    </div>
    <div class="moviename">{{filmname}}</div>
    <div class="grade">
      <el-rate v-model="score" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
    </div>
    <div></div>
    <div class="chticket">选座购票</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["imgsrc", "filmname", "score"]
};
</script>
<style scoped>
.every {
  width: 8em;
  height: 16em;
  margin-top: 1em;
  box-sizing: border-box;
  position: relative;
}
.singleimg {
  width: 100%;
  height: 10em;
}
.singleimg img {
  width: 100%;
  height: 10em;
}
.moviename {
  color: #333333;
  font-size: 0.9em;
  margin-top: 1em;
  width: 8.9em;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chticket {
  width: 7em;
  height: 2em;
  border-radius: 0.1em;
  background-color: #268dcd;
  color: white;
  font-size: 0.8em;
  text-align: center;
  line-height: 2em;
  margin-top: 0.5em;
  margin-left: 1.5em;
}
</style>
<style>
.el-rate__item {
  width: 15px;
  font-size: 0;
  vertical-align: middle;
}
.el-rate__text {
  margin-left: 6px;
  font-size: 8px;
  vertical-align: middle;
}
.el-rate {
  margin-left: 15px;
}
</style>

