<template>
  <div>
    <div class="profile__content">
      <ValidationObserver ref="loginForm" v-slot="{ handleSubmit, invalid, validate }">
        <form @submit.prevent="handleSubmit(patchUserPassword)">
          <div class="profile__box">
            <div><span class="span__dot">*</span>Current Password</div>
            <ValidationProvider v-slot="v" name="기존 비밀번호" rules="required|min:3">
              <input v-model="pw1" class="profile__input" type="password" autoComplete="off" />
              <div style="font-size: smaller">&nbsp;{{ v.errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="profile__box">
            <div><span class="span__dot">*</span> New Password</div>
            <ValidationProvider v-slot="v" name="새 비밀번호" rules="required|min:3">
              <input v-model="pw2" class="profile__input" type="password" autoComplete="off" />
              <div style="font-size: smaller">&nbsp;{{ v.errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="profile__box">
            <div><span class="span__dot">*</span> Confirm Password</div>
            <ValidationProvider v-slot="v" name="비밀번호 확인" rules="required|min:3">
              <input v-model="pw3" class="profile__input" type="password" autoComplete="off" />
              <div style="font-size: smaller">&nbsp;{{ v.errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div>
            <v-btn color="primary" :disabled="invalid || !validate" @click="patchUserPassword">Submit</v-btn>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { auth } from '../api/auth'
import { mapGetters } from 'vuex'
import Validate from '@/mixins/Validate.vue'

export default {
  mixins: [Validate],
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
      if (this.pw2 != this.pw3) {
        alert('비밀번호 확인이 일치하지 않습니다.')
        this.pw1 = ''
        this.pw2 = ''
        this.pw3 = ''
        return
      }
      auth
        .update_password(this.TokenUser.id, this.pw1, this.pw2)
        .then(res => {
          console.log(res.data.message)
          if (res.data.message == 'same') {
            // 같은 비밀번호라는 알림창 띄우기
            alert('기존의 비밀번호와 일치합니다. 다시 확인해주세요')
          } else if (res.data.message == 'invalid') {
            alert('비밀번호가 틀렸습니다.')
          } else if (res.data.message == 'notenough') {
            alert('잘못된 입력입니다.')
          } else if (res.data.message == 'success') {
            alert('정상 처리되었습니다.')
          } else {
            alert('오류!!')
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
