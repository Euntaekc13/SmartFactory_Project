<template>
  <div>
    <div class="profile__content">
      <div class="profile__box">
        <div><span class="span__dot">*</span>Current Password</div>
        <input v-mode="pw1" class="profile__input" />
      </div>
      <div class="profile__box">
        <div><span class="span__dot">*</span> New Password</div>
        <input v-mode="pw2" class="profile__input" />
      </div>
      <div class="profile__box">
        <div><span class="span__dot">*</span> Confirm Password</div>
        <input v-mode="pw3" class="profile__input" />
      </div>
      <div>
        <v-btn color="primary" @click="updateUserPassword">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pw1: '',
      pw2: '',
      pw3: ''
    }
  },
  methods: {
    updateUserPassword() {
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
