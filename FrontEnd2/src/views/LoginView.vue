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
      console.log('로그인 버튼')
      console.log(this.employee_number, this.password)

      // await axios.post(process.env.VUE_APP_API_DOMAIN + '/login',{
      //   employee_number : this.employee_number,
      //   password : this.password
      // }).then(res=>console.log(res))

      this.LOGIN_AUTH({ employee_number: this.employee_number, password: this.password }).then(() => {
        // api 와 store 작업이 끝나면 아래 주로 화면 전환
        this.$router.push('/')
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
  background-image: linear-gradient(
      80deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(122, 122, 122, 0.3) 70%,
      rgba(255, 255, 255, 0.03) 100%
    ),
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
.row {
  margin: 0 auto;
  text-align: center;
}
.row > span {
  position: relative;
  display: inline-block;
  margin: 10px 0px 0px 0px;
}

.row > .err {
  color: red;
}
</style>
