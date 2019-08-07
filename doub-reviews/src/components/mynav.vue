<template>
  <div class="nav">
    <div class="content">
      <div class="every">
        <router-link to="/">我看</router-link>
      </div>
      <div class="every">
        <router-link to="/Ticket">影讯&购票</router-link>
      </div>
      <div class="every">选电影</div>
      <div class="every">电视剧</div>
      <div class="every">排行榜</div>
      <div class="every">分类</div>
      <div class="every">影评</div>
      <div class="every">2018年度榜单</div>
      <div class="every">2018书影音报告</div>
    </div>
    <div class="reg" v-if="!hide">
      <el-button round @click="dialogFormVisible = true" class="login">登录</el-button>
      <el-dialog title="登录" :visible.sync="dialogFormVisible" center>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账  号" prop="num">
            <el-input v-model.number="ruleForm2.num"></el-input>
          </el-form-item>

          <el-form-item label="密   码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="记住密码" prop="delivery">
            <el-switch v-model="ruleForm2.delivery"></el-switch>
          </el-form-item>
          <span>
            <router-link to="/forget" class="forget">忘记密码？</router-link>
          </span>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false; resetForm('ruleForm2')">取 消</el-button>
          <el-button type="primary" @click="submitForm1('ruleForm2')">登 录</el-button>
        </div>
      </el-dialog>
      <el-button round class="login" @click="dialogFormVisible1 = true">注册</el-button>
      <el-dialog title="注册" :visible.sync="dialogFormVisible1" center>
        <el-form
          :model="ruleForm3"
          status-icon
          :rules="rules3"
          ref="ruleForm3"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="num">
            <el-input v-model.number="ruleForm3.num"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm3.pass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false; resetForm('ruleForm3')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm3')">注 册</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-else class="myself">
      <img src="../assets/mine.png" class="mine" />
      <router-link to="/Self">个人中心</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginPower: false,
      /*插入form方法*/
      /*设定规则指向*/
      ruleForm2: {
        pass: "",
        num: "",
        delivery: false
      },
      ruleForm3: {
        pass: "",
        num: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],

        num: [{ validator: checkNum, trigger: "blur" }]
      },
      rules3: {
        pass: [{ validator: validatePass, trigger: "blur" }],

        num: [{ validator: checkNum, trigger: "blur" }]
      },

      /*插入form方法*/

      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogTableVisible1: false,
      dialogFormVisible1: false,
      form: {
        name: "",
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/reg", this.ruleForm3)
            .then(response => {
              if (response.data.msg == "account_already_exist") {
                this.$alert("账号已存在", "用户注册", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else if (response.data.msg == "reg_success") {
                const h = this.$createElement;

                this.$notify({
                  title: "用户注册",
                  message: h("i", { style: "color: teal" }, "恭喜您，注册成功")
                });
                this.dialogFormVisible1 = false;
                this.$router.push({ path: "/" });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/login", this.ruleForm2)
            .then(response => {
              if (response.data.msg == "account_no_exist") {
                this.$alert("账号不存在", "请您先注册", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else if (response.data.msg == "false password") {
                this.$alert("密码错误", "请您重新输入密码", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else if (response.data.msg == "login_success") {
                const h = this.$createElement;

                this.$store.commit("ADD_LOGIN_USER");

                this.$notify({
                  title: "用户登录",
                  message: h("i", { style: "color: teal" }, "恭喜您，登录成功")
                });
                this.dialogFormVisible = false;
                this.$router.push({ path: "/" });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    hide() {
      return this.$store.getters.isLogin;
    }
  }
};
</script>
<style scoped>
.nav {
  min-width: 80em;
  height: 2.5rem;
  background-color: #f0f3f5;
  display: flex;
}
.content {
  min-width: 47em;
  height: 2.5rem;
  margin-left: 18.8rem;
  display: flex;
  justify-content: space-between;
}
.every {
  color: #2277aa;
  font-size: 0.9rem;
  margin-top: 0.6rem;
}
.reg {
  height: 1.5rem;
  min-width: 4.5rem;
  margin-left: 5rem;
}
.el-button.is-round {
  border-radius: 20px;
  padding: 0rem;
}
.el-button {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #2277aa;
  -webkit-appearance: none;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
}
.login {
  height: 1.5rem;
  min-width: 4.5rem;
  margin-top: 0.6rem;
}
.forget {
  margin-left: 39.5rem;
}

.el-form-item__label {
  text-align: center;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.mine {
  height: 1.5rem;
}
.myself {
  min-width: 4.5rem;
  height: 1.5rem;
  margin-left: 5rem;
  font-size: 0.9rem;
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
}
a {
  text-decoration: none;
  color: #2277aa;
  padding: 0rem;
}
</style>
