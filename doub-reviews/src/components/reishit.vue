<template>
  <div class="hit">
    <div class="hit1">
      <span class="now">最近热门电影</span>
      <div class="list">
        <div class="listsonnow">热门</div>
        <div class="listson">最新</div>
        <div class="listson">豆瓣高分</div>
        <div class="listson">冷门佳片</div>
        <div class="listson">华语</div>
        <div class="listson">欧美</div>
        <div class="listson">韩国</div>
        <div class="listson">日本</div>
      </div>
      <span class="allnow">更多>></span>
    </div>
    <div class="hit2"></div>
    <div class="hit3">
      <div class="hit3son" :style="{left:mymove +'px'}">
        <div
          v-for="(m,index) in movielist"
          :key="index"
          @mouseenter="detailbox(m.id)"
          @mouseleave="disappear"
        >
          <rehitsingle :imgsrc="m.imgsrc" :filmname="m.filmname" :score="m.score"></rehitsingle>
        </div>
      </div>
      <!-- 详情盒子 -->
      <div class="detailbox" v-show="hide" style="left:130px" ref="hello">
        <div class="first">
          <span class="filmname">{{detaildata.filmname}}</span>
          <span class="time">{{detaildata.rels}}</span>
        </div>
        <div class="block">
          <el-rate
            v-model="myscoredetail"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div class="lengthbox">
          <span class="length">{{detaildata.duration}}</span>
          <span class="length1">{{detaildata.region}}</span>
        </div>
        <div class="director">导演：{{detaildata.director}}</div>
        <div class="type">{{detaildata.cates}}/</div>
        <!-- <div class="introduction">{{detaildata.introduction}}/</div> -->
      </div>
    </div>
    <div class="hit3two">
      <div class="hit3son" :style="{left:mymove +'px'}">
        <div
          v-for="(m,index) in movielistreverse"
          :key="index"
          @mouseenter="detailbox1(m.id)"
          @mouseleave="disappear1"
        >
          <rehitsingle :imgsrc="m.imgsrc" :filmname="m.filmname" :score="m.score"></rehitsingle>
        </div>
      </div>
      <!-- 详情盒子 -->
      <div class="detailbox" v-show="hide2" style="left:130px" ref="hello2">
        <div class="first">
          <span class="filmname">{{detaildata.filmname}}</span>
          <span class="time">{{detaildata.rels}}</span>
        </div>
        <div class="block">
          <el-rate
            v-model="myscoredetail"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div class="lengthbox">
          <span class="length">{{detaildata.duration}}</span>
          <span class="length1">{{detaildata.region}}</span>
        </div>
        <div class="director">导演：{{detaildata.director}}</div>
        <div class="type">{{detaildata.cates}}/</div>
        <!-- <div class="introduction">{{detaildata.introduction}}/</div> -->
      </div>
    </div>
    <div class="buttonbox">
      <div class="cirile" @click="moveleft">
        <img src="../assets/leftarrow.png" />
      </div>
      <div class="cirile myright" @click="moveright">
        <img src="../assets/rightarrow.png" />
      </div>
    </div>
  </div>
</template>
<script>
import rehitsingle from "@/components/rehitsingle";
export default {
  data() {
    return {
      mymove: "",
      movielist: [],
      movielistreverse: [],
      detaildata: [],
      hide: false,
      myscoredetail: "",
      hide2: false
    };
  },
  components: {
    rehitsingle
  },
  created() {
    this.axios
      .get("/movie", {
        params: {}
      })
      .then(response => {
        this.movielist = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.axios
      .get("/moviereverse", {
        params: {}
      })
      .then(response => {
        this.movielistreverse = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    moveleft() {
      if (this.mymove == 0) {
        this.mymove = -5920;
        this.a = 9;
      } else {
        this.mymove = this.mymove + 740;
        this.a--;
      }
    },
    moveright() {
      if (this.mymove == -5920) {
        this.mymove = 0;
        this.a = 1;
      } else {
        this.mymove = this.mymove - 740;
        this.a++;
      }
    },
    detailbox(movieid) {
      this.axios
        .get("/moviedetail", {
          params: {
            id: movieid
          }
        })
        .then(response => {
          this.detaildata = response.data;
          this.myscoredetail = parseFloat((response.data.score / 2).toFixed(1));
        })
        .catch(function(error) {
          console.log(error);
        });
      if (movieid > 5) {
        let i = movieid % 5;
        movieid = i;
        if (movieid == 4) {
          this.hide = true;
          this.$refs.hello.style.left = 185 + "px";
        } else if (movieid == 0) {
          this.hide = true;
          this.$refs.hello.style.left = 335 + "px";
        } else if (movieid == 1 || movieid == 2 || movieid == 3) {
          this.hide = true;
          this.$refs.hello.style.left = 130 + 150 * (movieid - 1) + "px";
        }
      } else if (movieid == 4) {
        this.hide = true;
        this.$refs.hello.style.left = 185 + "px";
      } else if (movieid == 5) {
        this.hide = true;
        this.$refs.hello.style.left = 335 + "px";
      } else if (movieid == 1 || movieid == 2 || movieid == 3) {
        this.hide = true;
        this.$refs.hello.style.left = 130 + 150 * (movieid - 1) + "px";
      }
    },
    disappear() {
      this.hide = false;
    },
    detailbox1(movieid) {
      this.axios
        .get("/moviedetail", {
          params: {
            id: movieid
          }
        })
        .then(response => {
          this.detaildata = response.data;
          this.myscoredetail = parseFloat((response.data.score / 2).toFixed(1));
        })
        .catch(function(error) {
          console.log(error);
        });
      if (movieid > 5) {
        let i = movieid % 5;
        movieid = i;
        if (movieid == 0) {
          this.hide2 = true;
          this.$refs.hello2.style.left = 185 + "px";
        } else if (movieid == 4) {
          this.hide2 = true;
          this.$refs.hello2.style.left = 335 + "px";
        } else if (movieid == 2) {
          this.hide2 = true;
          this.$refs.hello2.style.left = 130 + 150 * (movieid - 1) + "px";
        } else if (movieid == 1) {
          this.hide2 = true;
          this.$refs.hello2.style.left = 130 + 150 * 2 + "px";
        } else if (movieid == 3) {
          this.hide2 = true;
          this.$refs.hello2.style.left = 130 + "px";
        }
      } else if (movieid == 0) {
        this.hide2 = true;
        this.$refs.hello2.style.left = 185 + "px";
      } else if (movieid == 4) {
        this.hide2 = true;
        this.$refs.hello2.style.left = 335 + "px";
      } else if (movieid == 2) {
        this.hide2 = true;
        this.$refs.hello2.style.left = 130 + 150 * (movieid - 1) + "px";
      } else if (movieid == 1) {
        this.hide2 = true;
        this.$refs.hello2.style.left = 130 + 150 * 2 + "px";
      } else if (movieid == 3) {
        this.hide2 = true;
        this.$refs.hello2.style.left = 130 + "px";
      }
    },
    disappear1() {
      this.hide2 = false;
    }
  }
};
</script>
<style scoped>
.hit {
  /* 1em=16px */
  width: 45em;
  margin-top: 1em;
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
.list {
  display: flex;
  justify-content: space-between;
}
.listson {
  color: #666699;
  font-size: 0.8em;
  margin-left: 1em;
  margin-top: 0.35em;
}
.listsonnow {
  color: black;
  font-size: 0.8em;
  margin-left: 1em;
  margin-top: 0.35em;
}
.allnow {
  color: #666699;
  font-size: 0.8em;
  margin-left: 17em;
  margin-top: 0.35em;
}
.hit2 {
  width: 100%;
  height: 0.1em;
  background-color: #eaeaea;
  margin-top: 0.7em;
}
.buttonbox {
  display: flex;
  padding-left: 300px;
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
  margin-left: 3em;
}
.cirile img {
  width: 0.7em;
  height: 0.7em;
}
.hit3 {
  height: 13em;
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
}
.hit3son {
  display: flex;
  width: 6345px;
  justify-content: space-between;
  position: absolute;
  top: 0px;
  left: 0px;
}
.hit3two {
  height: 15em;
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
}
.detailbox {
  width: 250px;
  border: 1px solid #9399a7;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 15px;
  background-color: white;
  z-index: 99;
}
.first {
  display: flex;
}
.filmname {
  font-size: 20px;
  text-align: left;
}
.time {
  font-size: 15px;
  color: #67768e;
  margin-left: 3px;
  display: block;
  margin-top: 7px;
}
.block {
  margin-top: 10px;
  margin-left: -18px;
  text-align: left;
}
.lengthbox {
  margin-top: 10px;
  text-align: left;
}
.length {
  color: black;
  font-size: 15px;
}
.length1 {
  color: black;
  font-size: 15px;
  margin-left: 10px;
}
.director {
  margin-top: 10px;
  text-align: left;
}
.type {
  margin-top: 10px;
  text-align: left;
}
/* .introduction {
  margin-top: 10px;
  text-align: left;
} */
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
