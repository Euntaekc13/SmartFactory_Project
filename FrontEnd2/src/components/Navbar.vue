<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :mini-variant.sync="sideBarOpen"
    permanent
    dark
    position:absolute
    height="100vh"
  >
    <!-- Once User information is set, this part will be rerendered based on the information -->
    <div class="UserInfo">
      <v-list-item-avatar v-if="sideBarOpen" size="42">
        <v-btn size="42" icon @click.stop="sideBarOpen = !sideBarOpen">
          <v-img src="https://randomuser.me/api/portraits/women/25.jpg"> </v-img>
        </v-btn>
      </v-list-item-avatar>

      <v-list-item-avatar v-else size="96">
        <v-btn size="80" icon @click.stop="sideBarOpen = !sideBarOpen">
          <v-img src="https://randomuser.me/api/portraits/women/25.jpg"> </v-img>
        </v-btn>
      </v-list-item-avatar>
    </div>

    <v-list v-show="!sideBarOpen">
      <v-list-item class="UserInfo">
        <span>{{ TokenUser.name }}</span>
      </v-list-item>
      <v-list-item class="UserInfo"
        ><span>{{ TokenUser.employee_number }}</span>
      </v-list-item>
    </v-list>

    <div v-show="!sideBarOpen" class="controlBar" dense>
      <router-link to="/mypage">
        <button class="iconButton">
          <i class="fa-solid fa-user fa-xl" color="gray"></i>
        </button>
      </router-link>
      <router-link to="/login">
        <button class="iconButton" @click="logout()">
          <i class="fa-solid fa-right-to-bracket fa-xl"></i>
        </button>
      </router-link>
      <router-link to="/configuration">
        <button class="iconButton">
          <i class="fa-solid fa-gear fa-xl"></i>
        </button>
      </router-link>
    </div>

    <v-divider></v-divider>

    <div v-show="!sideBarOpen" class="navBarList" dense rounded>
      <div class="innerList">
        <button class="spanButton" @click="routingToLine">
          <i class="fa-sharp fa-solid fa-industry fa-xl"></i>
          Line Management
        </button>
      </div>

      <div class="innerList">
        <button class="spanButton" @click="routingToProcess">
          <i class="fa-solid fa-desktop fa-xl"></i>
          Process Management
        </button>
      </div>

      <div class="innerList">
        <button class="spanButton" @click="routingToHistory">
          <i class="fa-sharp fa-solid fa-list fa-xl"></i>
          History Management
        </button>
      </div>
    </div>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: true,
      src: 'https://randomuser.me/api/portraits/women/25.jpg',
      contentsList: [
        { title: 'Line Management', icon: `${(<i class="fa-solid fa-industry-windows"></i>)}`, route: 'line' },
        {
          title: 'Process Management',
          icon: 'mdi-view-dashboard',
          route: 'machine'
        },
        {
          title: 'Production History',
          icon: 'mdi-clipboard-text',
          route: 'history'
        }
      ],
      sideBarOpen: true
    }
  },
  computed: {
    ...mapGetters(`Auth`, {
      TokenUser: 'TokenUser'
    })
  },
  mounted() {},
  methods: {
    ...mapActions('Auth', ['LOGOUT_AUTH']),
    async logout() {
      console.log('로그 아웃 버튼')
      console.log('초기화 해야하는 대상 : ', this.TokenUser)
      await this.LOGOUT_AUTH({ state: this.TokenUser }).then(() => {
        // api 와 store 작업이 끝나면 아래 주로 화면 전환
        // this.$router.push('/login')
      })
    },
    routingToLine() {
      this.$router.push('/line')
    },
    routingToProcess() {
      this.$router.push('/machine')
    },
    routingToHistory() {
      this.$router.push('/history')
    }
  }
}
</script>

<style scoped>
.UserInfo {
  display: flex;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  align-items: center;
}
.SideBarList {
  font-family: 'Raleway', sans-serif;
}
.controlBar {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
  font-family: 'Raleway', sans-serif;
}
.iconButton {
  color: darkgray;
  /* margin-bottom: 5px; */
}
.navBarList {
  display: flex;
  flex-direction: column;
  padding: 10px 0px 10px 0px;
  justify-content: center;
  align-content: center;
  vertical-align: middle;
  font-family: 'Raleway', sans-serif;
}
.spanButton {
  padding: 10px 0px 10px 0px;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: darkgray;
  font-family: 'Raleway', sans-serif;
}
.innerList {
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  vertical-align: middle;
  margin: 5px 5px 5px 30px;
  font-family: 'Raleway', sans-serif;
}
</style>
