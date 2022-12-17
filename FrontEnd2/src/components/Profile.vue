<template>
  <div>
    <div class="profile__content">
      <ValidationObserver ref="loginForm" v-slot="{ handleSubmit, invalid, validate }">
        <form @submit.prevent="handleSubmit(patchUserInfo)">
          <div class="profile__box">
            <div><span class="span__dot">*</span> Name</div>
            <ValidationProvider v-slot="v" name="이름" rules="required">
              <input v-model="name" class="profile__input" />
              <div style="font-size: smaller">&nbsp;{{ v.errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="profile__box">
            <div><span class="span__dot">*</span> E-mail</div>
            <ValidationProvider v-slot="v" name="이메일" rules="required|email">
              <input v-model="e_mail" class="profile__input" />
              <div style="font-size: smaller">&nbsp;{{ v.errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="profile__box">
            <div><span class="span__dot">*</span> Phone Number</div>
            <ValidationProvider v-slot="v" name="핸드폰 번호">
              <input v-model="phone" class="profile__input" />
              <div style="font-size: smaller">&nbsp;{{ v.errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div>
            <v-btn color="primary" :disabled="invalid || !validate" @click="patchUserInfo">Submit</v-btn>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Validate from '@/mixins/Validate.vue'
export default {
  mixins: [Validate],
  data() {
    return {
      name: '',
      e_mail: '',
      phone: ''
    }
  },
  computed: {
    ...mapGetters('Auth', ['TokenUser'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions('Auth', ['PATCH_AUTH']),
    getUserInfo() {
      this.name = this.TokenUser.name
      this.e_mail = this.TokenUser.email
      this.phone = this.TokenUser.phone_number
    },
    patchUserInfo() {
      // 유저 정보 수정 API 호출하기
      console.log('회원정보 수정 가즈아')
      console.log(this.TokenUser.id, this.e_mail, this.name, this.phone)
      let patchData = {
        id: this.TokenUser.id,
        email: this.e_mail,
        name: this.name,
        phone_number: this.phone
      }
      this.PATCH_AUTH(patchData)
        .then(() => {
          this.getUserInfo()
          alert('회원 정보 수정 완료')
        })
        .catch(() => {
          this.getUserInfo()
          alert('회원 정보 수정 실패')
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
