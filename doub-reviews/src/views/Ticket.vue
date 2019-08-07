<template>
  <div class="father">
    <my-Title></my-Title>
    <mynav></mynav>
    <div class="son">
      <div class="title">电影票 - 成都</div>
      <div class="choice">[切换城市]</div>
    </div>
    <div class="isnow">正在上映</div>
    <!-- 电影盒子 -->
    <div class="line"></div>
    <div class="moviebox">
      <div
        v-for="(m,index) in movielist"
        :key="index"
        @mouseenter="detailbox(m.id)"
        @mouseleave="disappear"
      >
        <ticketson
          :imgsrc="m.imgsrc"
          :filmname="m.filmname"
          :score="parseFloat((m.score/2).toFixed(1))"
        ></ticketson>
      </div>
    </div>
    <!-- 详情盒子 -->
    <div class="detailbox" v-show="hide" style="{left: 0px, top: 0px}" ref="hello">
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
    </div>
    <div class="all" v-show="hideall">显示全部影片</div>
    <div class="moviebox2">
      <div
        v-for="(m,index) in movielistall"
        :key="index"
        @mouseenter="detailbox1(m.id)"
        @mouseleave="disappear1"
      >
        <ticketson
          :imgsrc="m.imgsrc"
          :filmname="m.filmname"
          :score="parseFloat((m.score/2).toFixed(1))"
        ></ticketson>
      </div>
    </div>
    <!-- 详情盒子 -->
    <div class="detailbox" v-show="hide2" style="{left: 0px, top: 0px}" ref="hello">
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
    </div>
  </div>
</template>
<script>
import ticketson from "@/components/ticketson";
export default {
  data() {
    return {
      movielist: [],
      hide: false,
      myscoredetail: "",
      detaildata: [],
      hideall: false,
      movielistall: [],
      hide2: false
    };
  },
  components: {
    ticketson
  },
  methods: {
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
      if (movieid <= 5) {
        this.hide = true;
        this.$refs.hello.style.left = 440 + 155 * (movieid - 1) + "px";
        this.$refs.hello.style.top = 225 + "px";
      } else if (movieid > 5 && movieid <= 10) {
        movieid = movieid % 5;
        if (movieid == 0) {
          this.hide = true;
          this.$refs.hello.style.left = 440 + 155 * 4 + "px";
          this.$refs.hello.style.top = 500 + "px";
        } else {
          this.hide = true;
          this.$refs.hello.style.left = 440 + 155 * (movieid - 1) + "px";
          this.$refs.hello.style.top = 500 + "px";
        }
      } else if (movieid > 10 && movieid <= 15) {
        movieid = movieid % 5;
        if (movieid == 0) {
          this.hide = true;
          this.$refs.hello.style.left = 440 + 155 * 4 + "px";
          this.$refs.hello.style.top = 770 + "px";
        } else {
          this.hide = true;
          this.$refs.hello.style.left = 440 + 155 * (movieid - 1) + "px";
          this.$refs.hello.style.top = 770 + "px";
        }
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
      
      if (movieid > 15 && movieid <= 20) {
        movieid = movieid % 5;
        if (movieid == 0) {
          this.hide2 = true;
          this.$refs.hello.style.left = 440 + 155 * 4 + "px";
          this.$refs.hello.style.top = 1040 + "px";
        } else {
          this.hide2 = true;
          this.$refs.hello.style.left = 440 + 155 * (movieid - 1) + "px";
          this.$refs.hello.style.top = 1040 + "px";
        }
      }
    },
    disappear1() {
      this.hide2 = false;
    }
    // loadall() {
    //   @click="loadall"
    //   this.hideall = false;
    // }
  },
  created() {
    this.axios
      .get("/movielimit", {
        params: {}
      })
      .then(response => {
        this.movielist = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.axios
      .get("/movieadd", {
        params: {}
      })
      .then(response => {
        this.movielistall = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.son {
  width: 750px;
  margin-left: 18.8rem;
  display: flex;
}
.title {
  color: #494949;
  font-size: 25px;
  font-weight: 700;
  margin-top: 30px;
}
.choice {
  color: #3377b2;
  font-size: 12px;
  margin-top: 45px;
  margin-left: 5px;
}
.isnow {
  margin-left: 18.8rem;
  color: #007722;
  font-size: 15px;
  margin-top: 15px;
}
.line {
  margin-left: 18.8rem;
  background-color: #eeeeee;
  height: 1.5px;
  width: 750px;
  margin-top: 10px;
}
.moviebox {
  display: flex;
  flex-wrap: wrap;
  margin-left: 18.8rem;
  position: relative;
  width: 750px;
  justify-content: space-between;
  align-content: space-between;
}
.detailbox {
  width: 250px;
  border: 1px solid #9399a7;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
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
.all {
  margin-left: 18.8rem;
  text-align: center;
  width: 750px;
  height: 30px;
  background-color: #f0f0f0;
  color: #336699;
  font-size: 12px;
  margin-top: 10px;
  line-height: 30px;
  border: 1px solid #336699;
}
.moviebox2 {
  display: flex;
  flex-wrap: wrap;
  margin-left: 18.8rem;
  position: relative;
  width: 750px;
  justify-content: space-between;
  align-content: space-between;
  background-color: aqua;
}
</style>
