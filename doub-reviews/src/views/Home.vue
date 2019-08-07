<template>
  <div class="home">
    <my-Title></my-Title>
    <mynav></mynav>
    <ishit></ishit>
    <div class="homeimage">
      <img src="../assets/img1.jpg" />
    </div>
    <reishit></reishit>
    <teleplay></teleplay>
    <hotrecommended></hotrecommended>
    <div class="hit">
      <div class="hit1">
        <span class="now">最受欢迎的影评</span>
        <span class="allnow">更多热门影评>></span>
        <span class="allnow">新片影评>></span>
      </div>
      <div class="hit2"></div>
    </div>
    <div v-for="p in popular" :key="p.id">
      <reviews :imgsrc="p.imgsrc" :title="p.title" :who="p.who" :name="p.name" :info="p.info"></reviews>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ishit from "@/components/ishit";
import reishit from "@/components/reishit";
import teleplay from "@/components/teleplay";
import reviews from "@/components/reviews";
import hotrecommended from "@/components/hotrecommended";
export default {
  name: "home",
  data: function() {
    return {
      a: "",
      popular: []
    };
  },
  components: {
    ishit,
    reishit,
    teleplay,
    reviews,
    hotrecommended
  },
  created() {
    this.axios
      .get("/polist", {
        params: {}
      })
      .then(response => {
        this.popular = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
.hit {
  width: 45em;
  margin-top: 3em;
  margin-left: 18.8em;
}
.hit1 {
  display: flex;
}
.now {
  color: black;
  font-size: 1em;
  margin-top: 0.2em;
}
.allnow {
  color: #3377aa;
  font-size: 0.8em;
  margin-left: 0.8em;
  margin-top: 0.6em;
}
.homeimage {
  width: 45em;
  height: 6em;
  margin-top: 4em;
  margin-left: 18.8em;
}
.homeimage img {
  width: 45em;
  height: 6em;
}

.hit2 {
  width: 100%;
  height: 0.1em;
  background-color: #eaeaea;
  margin-top: 0.7em;
}
</style>
