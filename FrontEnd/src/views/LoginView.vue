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
          <v-form ref="form" class="login__form">
            <div class="row">
              <span>
                <input
                  id="class1"
                  v-model="employee_number"
                  class="gate"
                  type="text"
                  placeholder="Employee number"
                /><label for="class">&nbsp;Number&nbsp;</label>
              </span>
            </div>
            <div class="row">
              <span>
                <input
                  id="class2"
                  v-model="password"
                  class="gate"
                  type="password"
                  placeholder="Password"
                  autocomplete="off"
                /><label for="class">Password</label>
              </span>
            </div>

            <div class="createBtn">
              <button type="button" class="raiseBtn" @click="login">Create account</button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
    login() {
      console.log('로그인 버튼')
      console.log(this.employee_number, this.password)

      this.LOGIN_AUTH({ employee_number: this.employee_number, password: this.password })
      // console.log(this.LOGIN_AUTH(id,password));
    }
  }
}
</script>

<style lang="scss" scoped>
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
  // background: url(https://virtualcommissioning.com/wp-content/uploads/2020/07/shutterstock_599147537.png) 50% 25% /
  //   cover no-repeat;
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

  &:hover,
  &:focus {
    border-color: #5bc0de;
    color: #fff;
  }
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
  // color: #377d6a;
  color: #1b2a4a;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 65px; // Arbitrary.
  transition: all 0.3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    // text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
    text-shadow: 0 1px 0 #1b2a4a;
    // background: #7ab893;
    background: #1b2a4a;
    transition: all 0.4s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform-origin: left bottom;
    z-index: 99;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 3px;
      // background: #377d6a;
      background: #1b2a4a;
      transform-origin: left bottom;
      transition: all 0.4s ease-in-out;
      pointer-events: none;
      z-index: -1;
    }
    &:before {
      background: rgba(3, 36, 41, 0.2);
      z-index: -2;
      right: 20%;
    }
  }
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

  &::-webkit-input-placeholder {
    color: #aaa;
  }
  + label {
    transform: rotate(-66deg);
    border-radius: 3px;

    &:before {
      transform: rotate(10deg);
    }
  }
}
.row {
  margin: 0 auto;
  // padding: 60px 30px;
  // background: #032429;

  text-align: center;

  &:first-child {
    // padding: 40px 30px;
  }

  span {
    position: relative;
    display: inline-block;
    margin: 10px 0px 15px 0px;
  }
}
</style>
