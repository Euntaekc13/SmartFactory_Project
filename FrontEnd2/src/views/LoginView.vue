<template>
  <div class="Container">
    <div class="login__Container">
      <div class="login__box">
        <div class="login__header">
          <span style="font-size: 30px">Smart Factory</span><span style="color: #5bc0de; font-size: 40px">.</span>
        </div>
        <div class="login__content">
          <span style="font-size: 40px; font-weight: 900">Welcome<span style="color: #5bc0de">.</span></span
          ><br />
          <div class="center__content">
            <span style="color: gray">Login to your Account </span>
          </div>

          <ValidationObserver ref="loginForm" v-slot="{ handleSubmit, invalid, validate }">
            <form class="login__form" @submit.prevent="handleSubmit(login)">
              <div class="row">
                <span>
                  <ValidationProvider v-slot="v" name="사번" rules="required|numeric">
                    <input
                      id="class1"
                      v-model="employee_number"
                      class="gate"
                      type="text"
                      label="사번"
                      placeholder="Employee number"
                    /><label for="class">&nbsp;Number&nbsp;</label>
                    <span>&nbsp;{{ v.errors[0] }}</span>
                  </ValidationProvider>
                </span>
              </div>
              <div class="row">
                <span>
                  <ValidationProvider v-slot="v" name="비밀번호" rules="required|min:3">
                    <input
                      id="class2"
                      v-model="password"
                      class="gate"
                      type="password"
                      label="비밀번호"
                      placeholder="Password"
                      autocomplete="off"
                    /><label for="class">Password</label>
                    <span>&nbsp;{{ v.errors[0] }}</span>
                  </ValidationProvider>
                </span>
              </div>
              <div class="createBtn">
                <button type="button" class="raiseBtn" :disabled="invalid || !validate" @click="login">
                  Create account
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'
import Validate from '@/mixins/Validate.vue'

export default {
  mixins: [Validate],
  data() {
    return {
      employee_number: '',
      password: ''
    }
  },
  methods: {
    // 여기서 login 불러와서 사용하기
    // auth.login(this.email , this.password)
    ...mapActions('Auth', ['LOGIN_AUTH']),
    async login() {
      console.log('LoginView page - login - data check : ', this.employee_number, this.password)
      this.LOGIN_AUTH({ employee_number: this.employee_number, password: this.password }).then(() => {
        // api 와 store 작업이 끝나면 아래 주로 화면 전환
        localStorage.getItem('token') !== null ? this.$router.push('/machine') : this.$router.go(0)
      })
      // console.log(this.LOGIN_AUTH(id,password));
    }
  }
}
</script>

<style scoped>
* {
  color: white;
}

.Container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #0b0b10;
}

.login__Container {
  border-radius: 50px;
  width: 95%;
  height: 90vh;
  background-image: linear-gradient(80deg, black 0%, rgba(122, 122, 122, 0.3) 70%, rgba(255, 255, 255, 0.03) 100%),
    url(https://virtualcommissioning.com/wp-content/uploads/2020/07/shutterstock_599147537.png);
  background-size: cover;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8) inset, 0px 0px 5px rgba(200, 200, 200, 0.5);
  box-sizing: border-box;
}

.login__box {
  margin: 3% 5%;
  width: 40%;
  height: 90%;
  box-sizing: border-box;
}

.login__content {
  box-sizing: border-box;
}

.center__content {
  display: inline-block;
  box-sizing: border-box;
  height: 1rem;
}

.loginString {
  color: #1976d2;
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 2s;
  transition-delay: 0.1s;
}

.loginString:hover {
  font-size: 16px;
}

.login__header {
  margin-bottom: 15%;
}

.login__form {
  margin-top: 10%;
  width: 400px;
  height: 100x;
}

.createBtn {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 2rem;
}

.raiseBtn:hover,
.raiseBtn:focus {
  box-shadow: 0 0.5em 0.5em -0.4em #5bc0de;
  transform: translateY(-0.25em);
}

.raiseBtn {
  color: #5bc0de;
  transition: 0.25s;
  font-size: 16px;
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  box-sizing: border-box;
  background-color: #5bc0de;
  color: #fff;
}
.raiseBtn:hover,
.raiseBtn:focus {
  border-color: #5bc0de;
  color: #fff;
}

.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover {
  border-width: 1px;
  border-style: solid;
  border-color: #6fbd44;
}

.gate {
  display: inline-block;
  width: 400px;
  padding: 10px 0 10px 15px;
  font-family: 'Open Sans', sans;
  text-align: center;
  font-weight: 400;
  color: #1b2a4a;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 65px;
  transition: all 0.3s ease-in-out;
}
.gate::-webkit-input-placeholder {
  color: #efefef;
  text-indent: 0;
  font-weight: 300;
}
.gate + label {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 15px;
  text-shadow: 0 1px 0 #1b2a4a;
  background: #1b2a4a;
  transition: all 0.4s ease-in-out;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  transform-origin: left bottom;
  z-index: 99;
}
.gate + label:before,
.gate + label:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 3px;
  background: #1b2a4a;
  transform-origin: left bottom;
  transition: all 0.4s ease-in-out;
  pointer-events: none;
  z-index: -1;
}
.gate + label:before {
  background: rgba(3, 36, 41, 0.2);
  z-index: -2;
  right: 20%;
}

span:nth-child(2) .gate {
  text-indent: 85px;
}

span:nth-child(2) .gate:focus,
span:nth-child(2) .gate:active {
  text-indent: 0;
}

.gate:focus,
.gate:active {
  color: #377d6a;
  text-indent: 0;
  background: #fff;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.gate:focus::-webkit-input-placeholder,
.gate:active::-webkit-input-placeholder {
  color: #aaa;
}
.gate:focus + label,
.gate:active + label {
  transform: rotate(-66deg);
  border-radius: 3px;
}
.gate:focus + label:before,
.gate:active + label:before {
  transform: rotate(10deg);
}

.row {
  margin: 0 auto;
  text-align: center;
}
.row span {
  position: relative;
  display: inline-block;
  margin: 10px 0px 0px 0px;
}
.row .err {
  color: red;
}
</style>
