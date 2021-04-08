<template>
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>注 册</h1>
        <input type v-model="form.username" placeholder="账号" style="outline:none" />
        <input type="password" v-model="form.password" placeholder="密码" style="outline:none" />
        <input
          type="password"
          v-model="form.confirmPassword"
          placeholder="确认密码"
          style="outline:none"
        />
        <button @click.prevent="signup">注册</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>登 录</h1>
        <input type v-model="form.username" placeholder="账号" style="outline:none" />
        <input type="password" v-model="form.password" placeholder="密码" style="outline:none" />
        <a href="#">忘记密码？</a>
        <button @click="signin">登录</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有账号？</h1>
          <p>请使用您的账号进行登录</p>
          <button class="ghost" id="signIn">登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有账号？</h1>
          <p>立即注册加入我们，和我们一起开始旅程吧。</p>
          <button class="ghost" id="signUp">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    return {
      form: {},
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");
      signUpButton.addEventListener("click", () =>
        container.classList.add("right-panel-active")
      );
      signInButton.addEventListener("click", () =>
        container.classList.remove("right-panel-active")
      );
    },
    async signup() {
      if (this.form.password != this.form.confirmPassword)
        return this.$notify.info("密码输入不一致,请重新输入");
      const { code} = await this.http.signup(this.form);
      code == 200
        ? this.$notify.success("注册成功")
        : this.$notify.error("注册失败");
    },
    async signin() {
      const { code} = await this.http.signin(this.form);
      code == 200
        ? this.$router.push({ path: "inventory/inventory" })
        : this.$notify.error("登录失败");
    },
  },
};
</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container h1 {
  font-weight: bold;
  margin: 0;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

/* container */
.container {
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.social-container {
  margin: 10px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 5px 0;
  width: 100%;
}

.container button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

.container button:active {
  transform: scale(0.95);
}

.container button:focus {
  outline: none;
}

.container button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-out;
}

/* sign in */
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

/* sign up */
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

/* overlay-container */
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #ff416c;
  background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
  color: #fff;
  height: 100%;
  width: 200%;
  position: relative;
  left: -100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 0 40px;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.overlay-left {
  transform: translateX(-20%);
}

/* animation */
/* move sign in to the right */
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

/* move overlay to left */
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* bring sign up over sign in */
.container.right-panel-active .sign-up-container {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
}

/* move overlay back to right */
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>
