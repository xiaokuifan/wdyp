<template>
  <div class="father">
    <div class="faimg">
      <img :src="imgsrc" />
    </div>
    <span class="span1">{{title}}</span>
    <span class="span2">{{who}} 评论 {{name}}</span>
    <span class="span3">{{info}}</span>
    <div class="hit3"></div>
  </div>
</template>
<script>
export default {
  props: ["imgsrc", "who", "title", "name", "info"]
};
</script>

<style scoped>
.father {
  width: 45em;
  margin-left: 18.8em;
  position: relative;
  left: 0em;
  top: 0em;
}
.faimg {
  width: 4.8em;
  height: 7em;
  margin-top: 1em;
}
.faimg img {
  width: 100%;
  height: 100%;
}
.span1 {
  color: #3377aa;
  font-size: 1em;
  position: absolute;
  margin-left: 6em;
  margin-top: -6.8em;
}
.span2 {
  color: #666666;
  font-size: 0.8em;
  position: absolute;
  margin-left: 7.5em;
  margin-top: -6em;
}
.span3 {
  color: black;
  font-size: 0.8em;
  position: absolute;
  margin-left: 7.5em;
  margin-top: -4em;
}
.hit3 {
  width: 45em;
  height: 0.1em;
  background-color: #eaeaea;
  margin-top: 0.7em;
  margin-left: 18.8em;
}
</style>
