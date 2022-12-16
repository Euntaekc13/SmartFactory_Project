<template>
  <div>
    <div class="profile__content">
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
        <v-btn color="primary" @click="updateUserInfo">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    getUserInfo() {
      this.name = this.TokenUser.name
      this.e_mail = this.TokenUser.email
      this.phone = this.TokenUser.phone_number
    },
    updateUserInfo() {
      // 유저 정보 수정 API 호출하기
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
