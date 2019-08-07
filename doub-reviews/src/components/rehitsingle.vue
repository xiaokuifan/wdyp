<template>
  <div class="every">
    <div class="singleimg">
      <img :src="imgsrc" />
    </div>
    <div class="last">
      <span class="moviename">{{filmname}}</span>
      <span class="score">{{score}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["imgsrc", "filmname", "score"],
  methods: {}
};
</script>
<style scoped>
.every {
  width: 8em;
  height: 12em;
  margin-top: 1em;
  box-sizing: border-box;
}
.singleimg {
  width: 100%;
  height: 10em;
}
.singleimg img {
  width: 100%;
  height: 10em;
}
.last {
  text-align: center;
  margin-top: 5px;
}
.moviename {
  color: #3377aa;
  font-size: 0.9em;
}
.score {
  color: #e09015;
  font-size: 0.9em;
}
</style>


