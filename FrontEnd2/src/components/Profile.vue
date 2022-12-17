<template>
  <div>
    <div class="profile__content">
      <form>
        <div class="profile__box">
          <div><span class="span__dot">*</span> Name</div>
          <input v-model="name" class="profile__input" />
        </div>
        <div class="profile__box">
          <div><span class="span__dot">*</span> E-mail</div>
          <input v-model="e_mail" class="profile__input" />
        </div>
        <div class="profile__box">
          <div><span class="span__dot">*</span> Phone Number</div>
          <input v-model="phone" class="profile__input" />
        </div>
        <div>
          <v-btn color="primary" @click="patchUserInfo">Submit</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
      this.PATCH_AUTH(patchData).then(() => {
        this.getUserInfo()
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
