<template>
  <div class="hit">
    <div class="hit1">
      <span class="now">正在热映</span>
      <span class="page">{{a}}/8</span>
      <div class="cirile" @click="moveleft">
        <img src="../assets/leftarrow.png" />
      </div>
      <div class="cirile myright" @click="moveright">
        <img src="../assets/rightarrow.png" />
      </div>
    </div>
    <div class="hit2"></div>
    <div class="hit3">
      <div class="hit3son" :style="{left:mymove +'px'}">
        <div v-for="h in hotrecom" :key="h.id">
          <rehot :index="h.index" :imgsrc="h.imgsrc" :info="h.info"></rehot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rehot from "@/components/rehot";
export default {
  data() {
    return {
      a: "1",
      hotrecom: [],
      mymove: ""
    };
  },
  components: {
    rehot
  },
  methods: {
    moveleft() {
      if (this.mymove == 0) {
        this.mymove = -5040;
        this.a = 8;
      } else {
        this.mymove = this.mymove + 720;
        this.a--;
      }
    },
    moveright() {
      if (this.mymove == -5040) {
        this.mymove = 0;
        this.a = 1;
      } else {
        this.mymove = this.mymove - 720;
        this.a++;
      }
    }
  },
  created() {
    this.axios
      .get("/hotrec", {
        params: {}
      })
      .then(response => {
        this.hotrecom = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.hit {
  /* 1em=16px */
  width: 45em;
  height: 19em;
  margin-top: 5em;
  margin-left: 18.8em;
}
.hit1 {
  display: flex;
}
.now {
  color: black;
  font-size: 1em;
}
.page {
  color: #666699;
  font-size: 0.8em;
  margin-left: 45em;
  margin-top: 0.35em;
}
.cirile {
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  background-color: #6d98d2;
  text-align: center;
  line-height: 1.2em;
  margin-left: 0.8em;
  margin-top: 0.2em;
}
.myright {
  margin-left: 0.3em;
}
.cirile img {
  width: 0.7em;
  height: 0.7em;
}
.hit2 {
  width: 100%;
  height: 0.1em;
  background-color: #eaeaea;
  margin-top: 0.7em;
}
.hit3 {
  height: 15em;
  position: relative;
  overflow: hidden;
}
.hit3son {
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>

