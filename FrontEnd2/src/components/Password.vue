<template>
  <div>
    <div class="profile__content">
      <form>
        <div class="profile__box">
          <div><span class="span__dot">*</span>Current Password</div>
          <input v-model="pw1" class="profile__input" type="password" autoComplete="off" />
        </div>
        <div class="profile__box">
          <div><span class="span__dot">*</span> New Password</div>
          <input v-model="pw2" class="profile__input" type="password" autoComplete="off" />
        </div>
        <div class="profile__box">
          <div><span class="span__dot">*</span> Confirm Password</div>
          <input v-model="pw3" class="profile__input" type="password" autoComplete="off" />
        </div>
        <div>
          <v-btn color="primary" @click="patchUserPassword">Submit</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '../api/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      pw1: '',
      pw2: '',
      pw3: ''
    }
  },
  computed: {
    ...mapGetters('Auth', ['TokenUser'])
  },
  methods: {
    patchUserPassword() {
      // 유저 정보 수정 API 호출하기
      console.log(this.TokenUser.id, this.pw1, this.pw2, this.pw3)
      auth
        .update_password(this.TokenUser.id, this.pw1, this.pw2)
        .then(res => {
          console.log(res.data.message)
          if (res.data.message == 'same') {
            // 같은 비밀번호라는 알림창 띄우기
          }
        })
        .catch(err => {
          console.log('patch password err : ', err)
        })
        .finally(() => {
          ;(this.pw1 = ''), (this.pw2 = ''), (this.pw3 = '')
        })
    }
  }
}
</script>

<style scoped>
.profile__content {
  display: flex;
  flex-direction: column;
  margin-left: 10%;
}
.profile__box {
  font-size: 20px;
  margin: 2% 0%;
}
.span__dot {
  color: red;
}
.profile__input {
  border: 1px solid #cfd8dc;
  padding: 10px;
  width: 80%;
}
input:focus {
  outline: 2px solid #03a9f4;
}
input:hover {
  outline: 2px solid #03a9f4;
}
</style>
