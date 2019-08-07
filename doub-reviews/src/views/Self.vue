<template>
  <div>
    <my-Title></my-Title>
    <mynav></mynav>
    <div class="hello">
      <div class="user-header">
        <input
          type="file"
          name="image"
          accept="image/*"
          @change="onchangeImgFun"
          class="header-upload-btn user-header-com"
          id="imgs"
        />
        <img alt :src="imgStr" class="user-header-img user-header-com" id="imgs" />
        <p class="tip">
          图片限制50kb
          <span class="error">{{errorStr}}</span>
        </p>
      </div>
    </div>
    <div class="username">{{usernum}}</div>
    <div class="signature">(添加签名档)</div>
    <div class="list">
      <div class="listson">我的主页</div>
      <div class="listson">广播</div>
      <div class="listson">相册</div>
      <div class="listson">日记</div>
      <div class="listson">豆列</div>
      <div class="listson">设置</div>
    </div>
    <div class="display">
      {{usernum}},这里是你的主页，用来展示你的生活和发现，也是别人认识你的地方。完善你的个人资料，开始全新的豌豆之旅吧。
      <div class="displayone">
        <div class="displayone1">1</div>
        <span class="displayone2">上传头像</span>
      </div>
      <div class="displaytwo">
        <div class="displayone1">2</div>
        <span class="displayone2">写一段自我介绍</span>
      </div>
      <div class="last">以上选项也可以在页面右上角你的账号中找到</div>
    </div>
    <div class="diary">
      <span class="diary1">我的日记 . . . . . .</span>
      <span class="diary2">( 全部 )</span>
      <div class="diary3">
        <div class="diary3img">
          <img src="../assets/plus.png" />
        </div>
        <span class="diary3span">写日记</span>
      </div>
    </div>
    <div class="diaryson">在豌豆上写日记，记录自己的生活、想法。</div>
    <div class="diary">
      <span class="diary1">我的相册 . . . . . .</span>
      <span class="diary2">( 创建0 - 关注0 )</span>
      <div class="photoalbum">
        <div class="albumimg">
          <img src="../assets/plus.png" />
        </div>
        <span class="album">发照片</span>
      </div>
    </div>
    <div class="diaryson">可以有自己的相册来存放照片了。</div>
    <div class="diary">
      <span class="diary1">留言板 . . . . . .</span>
      <span class="diary2">( 全部 )</span>
    </div>
    <div class="messageboard"></div>
    <button class="leaveword">留言</button>
  </div>
</template>
<script>
export default {
  name: "Self",
  data() {
    return {
      imgStr: require("../assets/upload.png"),
      errorStr: "",
      usernum: "加载中..."
    };
  },
  created: function() {
    this.axios
      .get("/getAccount")
      .then(res => {
        this.usernum = res.data.account;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onchangeImgFun(e) {
      var file = e.target.files[0];
      console.log(file);
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      console.log(imgSize);
      var _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 50 * 1024) {
        // 合格
        _this.errorStr = "";
        console.log("大小合适");
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0])
        // console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息

        // base64方法 2
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          console.log(dataURL);
          _this.imgStr = dataURL;
          // 下面逻辑处理
        };
      } else {
        console.log("大小不合适");
        _this.errorStr = "图片大小超出范围";
      }
    }
  }
};
</script>
<style scoped>
.user-header {
  position: relative;
  display: inline-block;
}
.user-header-com {
  width: 100px;
  height: 100px;
  display: inline-block;
  margin-left: 21rem;
}
.header-upload-btn {
  position: absolute;
  left: 20rem;
  top: 0;
  opacity: 0;
  /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}
.tip {
  font-size: 14px;
  color: #666;
  margin-left: 21.3rem;
}
/* error是用于错误提示 */
.error {
  font-size: 12px;
  color: tomato;
  margin-left: 10px;
}
.username {
  width: 10rem;
  height: 2rem;
  margin-left: 28.2rem;
  margin-top: -7rem;
  text-align: center;
  line-height: 2rem;
  color: #494949;
  font-weight: 700;
}
.signature {
  color: #777777;
  font-size: 0.8rem;
  margin-left: 30rem;
}
.list {
  width: 20rem;
  height: 2.5rem;
  margin-left: 30rem;
  display: flex;
  justify-content: space-between;
}
.listson {
  color: #3377aa;
  font-size: 0.9rem;
  margin-top: 1.6rem;
}
.display {
  width: 42rem;
  height: 14rem;
  background-color: #f8f8f8;
  margin-left: 20.2rem;
  margin-top: 2rem;
  color: #424242;
  font-size: 0.9rem;
  padding-top: 1.8rem;
  padding-left: 1.3rem;
  padding-right: 6rem;
  box-sizing: border-box;
}
.displayone {
  width: 10rem;
  margin-left: 4rem;
  margin-top: 1.5rem;
  display: flex;
}
.displayone1 {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #74bc83;
  color: white;
  text-align: center;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
}
.displayone2 {
  color: #006600;
  font-size: 0.9rem;
  margin-left: 0.3rem;
  margin-top: 0.15rem;
}
.displaytwo {
  width: 10rem;
  margin-left: 4rem;
  margin-top: 1rem;
  display: flex;
}
.last {
  color: #666666;
  font-size: 0.8rem;
  margin-top: 1.5rem;
}
.diary {
  width: 42rem;
  margin-top: 3rem;
  margin-left: 20.2rem;
  display: flex;
}
.diary1 {
  color: #007722;
  font-size: 1rem;
}
.diary2 {
  color: #3377aa;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  margin-left: 0.5rem;
}
.diary3 {
  width: 5rem;
  background-color: #fcf7f3;
  border: 0.1rem solid #edded4;
  height: 1rem;
  margin-left: 26.4rem;
  text-align: center;
  display: flex;
}
.diary3img {
  width: 1rem;
  height: 1rem;
  margin-left: 0.1rem;
  font-weight: 700;
}
.diary3img img {
  width: 1rem;
  height: 1rem;
}
.diary3span {
  color: #777777;
  font-size: 0.88rem;
  margin-left: 0.5rem;
}
.diaryson {
  color: #111111;
  font-size: 0.8rem;
  margin-left: 20.2rem;
  margin-top: 1.5rem;
}
.photoalbum {
  width: 5rem;
  background-color: #fcf7f3;
  border: 0.1rem solid #edded4;
  height: 1rem;
  margin-left: 23rem;
  text-align: center;
  display: flex;
}
.albumimg {
  width: 1rem;
  height: 1rem;
  margin-left: 0.1rem;
  font-weight: 700;
}
.albumimg img {
  width: 1rem;
  height: 1rem;
}
.album {
  color: #777777;
  font-size: 0.88rem;
  margin-left: 0.5rem;
}
.messageboard {
  width: 42rem;
  height: 4rem;
  border: 0.1rem solid #cccccc;
  margin-left: 20.2rem;
  margin-top: 1.5rem;
}
.leaveword {
  margin-left: 20.2rem;
  margin-top: 1rem;
}
</style>
