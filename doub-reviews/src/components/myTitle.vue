<template>
  <div class="mytitle">
    <div class="title">豌豆电影</div>
    <input type="text" class="myinput" placeholder="搜索电影、影人、主演" />
    <div class="sousuo">
      <img src="../assets/sousuo.png" />
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.mytitle {
  min-width: 80em;
  height: 4rem;
  background-color: #f0f3f5;
  padding: 0.8rem;
  box-sizing: border-box;
  display: flex;
  border-bottom: 0.1rem solid #e3ebec;
}
.title {
  min-width: 5.2em;
  color: #258dcd;
  font-size: 1.8rem;
  font-weight: 550;
  margin-left: 18rem;
}
.myinput {
  min-width: 25rem;
  height: 1.6rem;
  border-radius: 0.1rem 0 0 0.1rem;
  outline: none;
  margin-left: 3rem;
  margin-top: 0.45rem;
  padding-left: 1rem;
}
.sousuo {
  min-width: 2rem;
  height: 1.7rem;
  background-color: #8b969e;
  margin-top: 0.45rem;
  text-align: center;
  line-height: 1.6rem;
  margin-left: -0.5rem;
}
.sousuo img {
  min-width: 40%;
  height: 40%;
}
</style>
