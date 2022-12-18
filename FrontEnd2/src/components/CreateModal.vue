<template>
  <v-app>
    <v-card class="input_container">
      <ValidationObserver ref="signUpForm" v-slot="{ handleSubmit, invalid, validate }">
        <form action="" @submit.prevent="handleSubmit(createUser)">
          <div class="input_header">
            <v-spacer></v-spacer>
            <h2>신규등록</h2>
          </div>
          <v-divider></v-divider>
          <div class="input_item">
            <ValidationProvider v-slot="{ errors }" name="상세설명" rules="required|min:2">
              <v-text-field
                v-model="name"
                label="Name"
                placeholder="Placeholder"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="상세설명" rules="required|numeric">
              <v-text-field
                v-model="employee_number"
                label="Employee Number"
                placeholder="Placeholder"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="상세설명" rules="required|email">
              <v-text-field
                v-model="Email"
                label="E-mail"
                placeholder="Placeholder"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="상세설명" rules="required|phone">
              <v-text-field
                v-model="phone_number"
                label="Phone"
                placeholder="Placeholder"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </div>
          <div class="input_file">
            <v-file-input
              ref="image"
              v-model="user_image"
              type="file"
              show-size
              :multiple="false"
              accept="image/*"
              label="User Img"
              @change="upload"
            ></v-file-input>
          </div>
          <v-spacer></v-spacer>
          <div class="btn_box">
            <div class="add_btn">
              <v-btn :disabled="invalid || !validate" type="submit" icon text>add</v-btn>
            </div>
            <div class="cancle_btn">
              <v-btn icon text @click="closeModal">cancle</v-btn>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Validate from '../mixins/Validate.vue'
export default {
  name: 'CreateModal',
  mixins: [Validate],
  data() {
    return {
      name: '',
      Email: '',
      employee_number: '',
      phone_number: '',
      user_image: null,
      authorization: 'user',
      password: '1234',
      imgFolder: '/img'
    }
  },
  methods: {
    ...mapActions('User', ['CREATE_USER']),
    closeModal() {
      this.$emit('closeDialog')
    },
    createUser() {
      this.CREATE_USER({
        name: this.name,
        employee_number: this.employee_number,
        phone_number: this.phone_number,
        password: '1234',
        authorization: 'user',
        email: this.email,
        user_image: this.user_image.name
      })
      console.log(this.name, this.user_image.name, this.Email, this.phone_number)
    },
    upload() {
      let file = this.user_image
      let reader = new FileReader()

      console.log(file)
      reader.readAsDataURL(file)
      reader.onload = e => {
        console.log(e.target.result)
        this.imgFolder = e.target.result
      }
    }
  }
}
</script>

<style scoped>
.input_container {
  width: 60%;
  margin: 5% 0 0 20%;
}
.input_header {
  margin: 1% auto;
  padding: 2% 2% 2% 9%;
}

.input_item {
  width: 80%;
  margin: 3% 0 0 10%;
}
.input_file {
  width: 40%;
  margin-left: 50%;
}
.btn_box {
  display: flex;
  margin: 2% 0 3% 0;
}

.add_btn {
  margin: 0 5% 0 76%;
}
/* .cancle_btn {
  margin: 0 0 0 5%;
} */
</style>
