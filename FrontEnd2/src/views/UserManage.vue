<template>
  <div>
    <Navbar></Navbar>
    <v-main style="box-sizing: border-box; heigth: 100vh; max-height: 100vh">
      <div class="line__container">
        <div class="line__header">
          <h1>User Management</h1>
          <v-divider></v-divider>
        </div>
        <div class="userList">
          <div class="userList_subheader">
            <v-spacer></v-spacer>
            <div v-if="statusModal == false" class="addUser_btn">
              <button type="button" style="display: flex" @click.prevent="addUser">
                <div class="addUser_btn_text">
                  <h4>신규등록</h4>
                </div>
              </button>
            </div>
          </div>
          <v-card v-if="statusModal == false" class="list_container">
            <v-simple-table class="list_table">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="Name" style="text-align: center">Name</th>
                    <th class="employee_number" style="text-align: center">employee_number</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in alluser" :key="item.name">
                    <td class="Name">{{ item.name }}</td>
                    <td class="employee_number">{{ item.employee_number }}</td>
                    <td style="padding-left: 17%">
                      <v-btn type="buttom" @click.prevent="deleteUser(item.id)">삭제</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <CreateModal v-if="statusModal" @closeDialog="closeAddUser"></CreateModal>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
// import Item from '../components/Item.vue'
import Navbar from '@/components/Navbar.vue'
import { mapActions, mapGetters } from 'vuex'
import CreateModal from '@/components/CreateModal.vue'
export default {
  name: 'Machine',
  components: {
    Navbar,
    CreateModal
  },
  data() {
    return {
      tab: true,
      statusModal: false
    }
  },
  computed: {
    ...mapGetters('User', {
      alluser: 'AllUser'
    })
  },
  async created() {
    await this.allUser()
  },

  methods: {
    ...mapActions('User', ['FETCH_ALL', 'DELETE_USER']),
    goProfile() {
      this.tab = true
    },
    goPassword() {
      this.tab = false
    },
    async allUser() {
      await this.FETCH_ALL()
        .then(() => {
          console.log('vue: get user data')
        })
        .catch(err => {
          console.log('vue: get user data err', err)
        })
    },
    addUser() {
      this.statusModal = true
    },
    closeAddUser() {
      this.statusModal = false
    },
    deleteUser(id) {
      this.DELETE_USER(id).then().catch()
    }
  }
}
</script>

<style>
.line__container {
  width: 96%;
  height: 93%;
  margin: 2% auto;
  /* border: 1px solid black; */
  /* border-radius: 30px; */
  box-sizing: border-box;
  background-color: white;
}

.line__header > h1 {
  display: inline-block;
  margin: 2% 0px 0.5% 50px;
}

.userList {
  width: 100%;
  height: 80%;
  min-height: 80vh;
  max-height: 80vh;
  overflow: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
}
.list_container {
  width: 70%;
  margin-left: 15%;
}
.userList::-webkit-scrollbar {
  display: none;
}

.userList_subheader {
  margin-left: 3vw;
  display: flex;
}

.addUser_btn {
  box-sizing: border-box;
  margin: 2% 19% 0 0;
}
.addUser_btn_text {
  display: flex;
  width: 100%;
  padding: 0 0 30% 0;
  color: #3b5998;
}

.icon-button {
  background-color: white;
  border-radius: 3.6rem;
  cursor: pointer;
  display: inline-block;
  font-size: 2rem;
  height: 3.6rem;
  line-height: 3.6rem;
  margin: 0 5px;
  position: relative;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 3.6rem;
}

/* Circle */
.icon-button span {
  /* background-color: #1e6f43; */
  /* background-color: red; */
  border-radius: 0;
  display: block;
  height: 0;
  left: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  width: 0;
}
.icon-button:hover span {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3.6rem;
  margin: -1.8rem;
}

.plus span {
  background-color: #3b5998;
}

/* Icons */
.icon-button i {
  background: none;
  color: white;
  height: 3.6rem;
  left: 0;
  line-height: 3.6rem;
  position: absolute;
  top: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  width: 3.6rem;
  z-index: 10;
}
.icon-button .icon-plus {
  color: #3b5998;
}

.icon-button .icon-plus {
  color: #3b5998;
}

.list_table {
  width: 98%;
  margin-left: 1%;
}
.Name {
  text-align: center;
}
.employee_number {
  padding-left: 10%;
  text-align: center;
}
</style>
